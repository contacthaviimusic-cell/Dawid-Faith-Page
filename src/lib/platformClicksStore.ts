import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';
import { PLATFORMS, ALL_SOURCES, type Platform, type Source } from './platformSources';

export { PLATFORMS, ALL_SOURCES, type Platform, type Source };

export interface PlatformClick {
  id: string;
  songId: string;
  platform: Source;
  clickedAt: string;
}

const BLOB_PATHNAME = 'data/platform-clicks.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'platform-clicks.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// Nur "Datei existiert nicht" gilt als leere Liste – jeder andere Lesefehler
// wird durchgereicht, damit er nicht fälschlich als "keine Klicks" gilt und ein
// nachfolgender Schreibvorgang die echten Daten überschreibt.
async function readFromBlob(): Promise<PlatformClick[]> {
  let blob;
  try {
    blob = await head(BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[platformClicksStore] head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[platformClicksStore] Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as PlatformClick[];
}

async function writeToBlob(entries: PlatformClick[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readFromFile(): Promise<PlatformClick[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as PlatformClick[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: PlatformClick[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

async function readAll(): Promise<PlatformClick[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: PlatformClick[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

export async function getClicksForSong(songId: string): Promise<PlatformClick[]> {
  const entries = await readAll();
  return entries.filter((e) => e.songId === songId);
}

export async function recordClick(songId: string, platform: Source): Promise<void> {
  const entries = await readAll();
  entries.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    platform,
    clickedAt: new Date().toISOString(),
  });
  await writeAll(entries);
}
