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
  preorderPrice: string; // z.B. '4.99' (rein informativ, Preis wird auf Bandcamp gepflegt)
  bandcampUrl: string; // Link zum Bandcamp-Track/Album (leer, bis konfiguriert)
  premiereVideoUrl: string; // YouTube-Premiere-Link; wird öffentlich erst ab premiereRevealHours vor videoReleaseDate ausgeliefert
  premiereRevealHours: string; // Stunden vor videoReleaseDate, ab denen premiereVideoUrl öffentlich sichtbar wird (Default 48, siehe api/singles)
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const BLOB_PATHNAME = 'data/singles.json';
const BACKUP_BLOB_PATHNAME = 'data/singles.backup.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'singles.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

// Wichtig: Nur ein "Datei existiert nicht" darf als leere Liste gewertet werden.
// Jeder andere Fehler (Netzwerk, Parsing, …) muss durchgereicht werden – sonst
// interpretiert ein Aufrufer einen vorübergehenden Lesefehler fälschlich als
// "keine Singles vorhanden" und ein nachfolgender Schreibvorgang würde die
// echten Daten dauerhaft mit einer leeren Liste überschreiben.
async function readFromBlob(): Promise<SingleConfig[]> {
  let blob;
  try {
    blob = await head(BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[singlesStore] head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[singlesStore] Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as SingleConfig[];
}

async function writeToBlob(entries: SingleConfig[]): Promise<void> {
  // Vor jedem Schreiben den bisherigen Stand als Backup sichern, damit sich
  // Datenverlust im Notfall manuell rückgängig machen lässt.
  try {
    const previous = await readFromBlob();
    if (previous.length > 0) {
      await put(BACKUP_BLOB_PATHNAME, JSON.stringify(previous, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    }
  } catch (e) {
    console.error('[singlesStore] Backup vor dem Schreiben fehlgeschlagen:', e);
  }

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
