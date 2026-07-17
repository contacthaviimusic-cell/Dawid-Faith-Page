import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface UnsubscribeLogEntry {
  id: string;
  email: string;
  matchedNewsletter: boolean;
  matchedGiveawayCount: number;
  requestedAt: string;
}

const BLOB_PATHNAME = 'data/unsubscribe-log.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'unsubscribe-log.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readFromBlob(): Promise<UnsubscribeLogEntry[]> {
  let blob;
  try {
    blob = await head(BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[unsubscribeLogStore] head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[unsubscribeLogStore] Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as UnsubscribeLogEntry[];
}

async function writeToBlob(entries: UnsubscribeLogEntry[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readFromFile(): Promise<UnsubscribeLogEntry[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as UnsubscribeLogEntry[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: UnsubscribeLogEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

async function readAll(): Promise<UnsubscribeLogEntry[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: UnsubscribeLogEntry[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

export async function getAllUnsubscribeLog(): Promise<UnsubscribeLogEntry[]> {
  return readAll();
}

export async function logUnsubscribe(
  email: string,
  matchedNewsletter: boolean,
  matchedGiveawayCount: number
): Promise<void> {
  const entries = await readAll();
  entries.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: email.trim().toLowerCase(),
    matchedNewsletter,
    matchedGiveawayCount,
    requestedAt: new Date().toISOString(),
  });
  await writeAll(entries);
}
