import fs from 'node:fs/promises';
import path from 'node:path';
import { put, head, BlobNotFoundError } from '@vercel/blob';

// Tracked, welchen der drei Wege ("Wähle deinen Weg") Besucher auf der
// Pre-Order-Seite tatsächlich anklicken – unabhängig davon, über welche
// Plattform sie überhaupt auf die Seite gekommen sind (siehe platformClicksStore
// für die Traffic-Quelle).
export type Action = 'presave' | 'preorder' | 'engagement';
export const ACTIONS: Action[] = ['presave', 'preorder', 'engagement'];

export interface ActionClick {
  id: string;
  songId: string;
  action: Action;
  clickedAt: string;
}

const BLOB_PATHNAME = 'data/action-clicks.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'action-clicks.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// Nur "Datei existiert nicht" gilt als leere Liste – jeder andere Lesefehler
// wird durchgereicht, damit er nicht fälschlich als "keine Klicks" gilt und ein
// nachfolgender Schreibvorgang die echten Daten überschreibt.
async function readFromBlob(): Promise<ActionClick[]> {
  let blob;
  try {
    blob = await head(BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[actionClicksStore] head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[actionClicksStore] Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as ActionClick[];
}

async function writeToBlob(entries: ActionClick[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readFromFile(): Promise<ActionClick[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as ActionClick[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: ActionClick[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

async function readAll(): Promise<ActionClick[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: ActionClick[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

export async function getClicksForSong(songId: string): Promise<ActionClick[]> {
  const entries = await readAll();
  return entries.filter((e) => e.songId === songId);
}

export async function recordClick(songId: string, action: Action): Promise<void> {
  const entries = await readAll();
  entries.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    action,
    clickedAt: new Date().toISOString(),
  });
  await writeAll(entries);
}
