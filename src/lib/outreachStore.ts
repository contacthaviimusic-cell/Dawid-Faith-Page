import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface OutreachEntry {
  id: string;
  label: string;
  sentTo: string;
  note: string;
  createdAt: string;
  clicks: number;
  firstClickAt: string | null;
  lastClickAt: string | null;
}

const BLOB_PATHNAME = 'data/outreach.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'outreach.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

async function readFromBlob(): Promise<OutreachEntry[]> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as OutreachEntry[];
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    return [];
  }
}

async function writeToBlob(entries: OutreachEntry[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// ── Local file-system helpers ────────────────────────────────────────────────

async function readFromFile(): Promise<OutreachEntry[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as OutreachEntry[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: OutreachEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── Unified read / write ─────────────────────────────────────────────────────

async function readAll(): Promise<OutreachEntry[]> {
  return isBlob() ? readFromBlob() : readFromFile();
}

async function writeAll(entries: OutreachEntry[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

export async function getAllOutreach(): Promise<OutreachEntry[]> {
  return readAll();
}

export async function createOutreach(
  label: string,
  sentTo: string,
  note: string
): Promise<OutreachEntry> {
  const entries = await readAll();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const entry: OutreachEntry = {
    id,
    label,
    sentTo,
    note,
    createdAt: new Date().toISOString(),
    clicks: 0,
    firstClickAt: null,
    lastClickAt: null,
  };
  entries.unshift(entry);
  await writeAll(entries);
  return entry;
}

export async function recordClick(id: string): Promise<boolean> {
  const entries = await readAll();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  const now = new Date().toISOString();
  entries[idx].clicks += 1;
  if (!entries[idx].firstClickAt) entries[idx].firstClickAt = now;
  entries[idx].lastClickAt = now;
  await writeAll(entries);
  return true;
}

export async function deleteOutreach(id: string): Promise<boolean> {
  const entries = await readAll();
  const filtered = entries.filter((e) => e.id !== id);
  if (filtered.length === entries.length) return false;
  await writeAll(filtered);
  return true;
}
