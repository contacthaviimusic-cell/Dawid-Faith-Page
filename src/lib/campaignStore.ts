import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface CampaignRecipient {
  id: string;
  email: string;
  source: string; // z.B. 'buch' (Konzert-Anmeldebuch), 'manuell'
  note: string;
  createdAt: string;
}

const BLOB_PATHNAME = 'data/campaign-recipients.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'campaign-recipients.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

async function readFromBlob(): Promise<CampaignRecipient[]> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as CampaignRecipient[];
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    return [];
  }
}

async function writeToBlob(entries: CampaignRecipient[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// ── Local file-system helpers ────────────────────────────────────────────────

async function readFromFile(): Promise<CampaignRecipient[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as CampaignRecipient[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: CampaignRecipient[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── Unified read / write ─────────────────────────────────────────────────────

async function readAll(): Promise<CampaignRecipient[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: CampaignRecipient[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

// ── API ──────────────────────────────────────────────────────────────────────

export async function getAllRecipients(): Promise<CampaignRecipient[]> {
  return readAll();
}

export async function addRecipients(
  emails: string[],
  source: string,
  note = ''
): Promise<{ added: number; skipped: number }> {
  const entries = await readAll();
  const existing = new Set(entries.map((e) => e.email.toLowerCase()));
  let added = 0;
  let skipped = 0;

  for (const raw of emails) {
    const email = raw.trim().toLowerCase();
    if (!email) continue;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || existing.has(email)) {
      skipped++;
      continue;
    }
    entries.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      email,
      source,
      note,
      createdAt: new Date().toISOString(),
    });
    existing.add(email);
    added++;
  }

  await writeAll(entries);
  return { added, skipped };
}

export async function deleteRecipient(id: string): Promise<boolean> {
  const entries = await readAll();
  const filtered = entries.filter((e) => e.id !== id);
  if (filtered.length === entries.length) return false;
  await writeAll(filtered);
  return true;
}
