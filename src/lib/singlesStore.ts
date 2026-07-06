import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface SingleConfig {
  id: string; // Song-ID, z.B. 'katze' (muss zu den Song-IDs der Musik-Sektion passen)
  title: string;
  coverImage: string;
  teaserVideo: string;
  audioReleaseDate: string; // ISO-Datum: bis dahin läuft der Countdown / Presave
  videoReleaseDate: string; // ISO-Datum: bis dahin ist Pre-Order möglich
  presaveUrl: string;
  discountCode: string;
  preorderPrice: string; // z.B. '4.99'
  checkoutUrl: string; // Lemon-Squeezy-Checkout-Link (leer, bis konfiguriert)
  privateMp3Path: string; // nicht öffentlich – nur über Download-Token erreichbar
  privateVideoPath: string; // nicht öffentlich – nur über Download-Token erreichbar
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PublicSingle = Omit<SingleConfig, 'privateMp3Path' | 'privateVideoPath'>;

export function toPublicSingle(s: SingleConfig): PublicSingle {
  const { privateMp3Path: _mp3, privateVideoPath: _video, ...pub } = s;
  return pub;
}

const BLOB_PATHNAME = 'data/singles.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'singles.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

async function readFromBlob(): Promise<SingleConfig[]> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as SingleConfig[];
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    return [];
  }
}

async function writeToBlob(entries: SingleConfig[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// ── Local file-system helpers ────────────────────────────────────────────────

async function readFromFile(): Promise<SingleConfig[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as SingleConfig[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: SingleConfig[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── Unified read / write ─────────────────────────────────────────────────────

async function readAll(): Promise<SingleConfig[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: SingleConfig[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

// ── CRUD ─────────────────────────────────────────────────────────────────────

export async function getAllSingles(): Promise<SingleConfig[]> {
  return readAll();
}

export async function getSingle(id: string): Promise<SingleConfig | null> {
  const entries = await readAll();
  return entries.find((s) => s.id === id) ?? null;
}

export type SingleInput = Omit<SingleConfig, 'createdAt' | 'updatedAt'>;

export async function createSingle(input: SingleInput): Promise<{ single: SingleConfig | null; error?: string }> {
  const entries = await readAll();
  if (entries.some((s) => s.id === input.id)) {
    return { single: null, error: 'Eine Single mit dieser ID existiert bereits.' };
  }
  const now = new Date().toISOString();
  const single: SingleConfig = { ...input, createdAt: now, updatedAt: now };
  entries.unshift(single);
  await writeAll(entries);
  return { single };
}

export async function updateSingle(
  id: string,
  patch: Partial<Omit<SingleConfig, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SingleConfig | null> {
  const entries = await readAll();
  const idx = entries.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  entries[idx] = { ...entries[idx], ...patch, id, updatedAt: new Date().toISOString() };
  await writeAll(entries);
  return entries[idx];
}

export async function deleteSingle(id: string): Promise<boolean> {
  const entries = await readAll();
  const filtered = entries.filter((s) => s.id !== id);
  if (filtered.length === entries.length) return false;
  await writeAll(filtered);
  return true;
}
