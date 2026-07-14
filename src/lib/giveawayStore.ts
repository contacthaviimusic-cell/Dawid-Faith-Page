import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface GiveawayEntry {
  id: string;
  songId: string;
  email: string;
  token: string;
  clickedAt: string | null;
  createdAt: string;
}

const BLOB_PATHNAME = 'data/giveaway.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'giveaway.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

async function readFromBlob(): Promise<GiveawayEntry[]> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as GiveawayEntry[];
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    return [];
  }
}

async function writeToBlob(entries: GiveawayEntry[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// ── Local file-system helpers ────────────────────────────────────────────────

async function readFromFile(): Promise<GiveawayEntry[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as GiveawayEntry[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: GiveawayEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── Unified read / write ─────────────────────────────────────────────────────

async function readAll(): Promise<GiveawayEntry[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: GiveawayEntry[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

// ── API ──────────────────────────────────────────────────────────────────────

export async function getAllEntries(): Promise<GiveawayEntry[]> {
  return readAll();
}

export async function getEntriesForSong(songId: string): Promise<GiveawayEntry[]> {
  const entries = await readAll();
  return entries.filter((e) => e.songId === songId);
}

export async function findEntryByToken(token: string): Promise<GiveawayEntry | null> {
  const entries = await readAll();
  return entries.find((e) => e.token === token) ?? null;
}

export async function createEntry(
  songId: string,
  email: string
): Promise<{ entry: GiveawayEntry | null; error?: string }> {
  const entries = await readAll();
  const normalizedEmail = email.trim().toLowerCase();
  const exists = entries.some((e) => e.songId === songId && e.email.toLowerCase() === normalizedEmail);
  if (exists) {
    return { entry: null, error: 'Diese E-Mail-Adresse nimmt bereits teil.' };
  }

  const entry: GiveawayEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    email: normalizedEmail,
    token: crypto.randomBytes(24).toString('hex'),
    clickedAt: null,
    createdAt: new Date().toISOString(),
  };
  entries.unshift(entry);
  await writeAll(entries);
  return { entry };
}

export async function markClicked(id: string): Promise<void> {
  const entries = await readAll();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return;
  if (!entries[idx].clickedAt) {
    entries[idx].clickedAt = new Date().toISOString();
    await writeAll(entries);
  }
}
