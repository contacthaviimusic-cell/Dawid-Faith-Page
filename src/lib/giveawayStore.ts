import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export type EntryLang = 'de' | 'en' | 'pl';

export interface GiveawayEntry {
  id: string;
  songId: string;
  email: string;
  location: string;
  language: EntryLang;
  deviceFingerprint: string;
  token: string;
  clickedAt: string | null;
  unsubscribed: boolean;
  createdAt: string;
}

export interface GiveawayWinner {
  songId: string;
  entryId: string;
  email: string;
  drawnAt: string;
}

const BLOB_PATHNAME = 'data/giveaway.json';
const BACKUP_BLOB_PATHNAME = 'data/giveaway.backup.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'giveaway.json');

const WINNERS_BLOB_PATHNAME = 'data/giveaway-winners.json';
const WINNERS_LOCAL_FILE = path.join(process.cwd(), 'data', 'giveaway-winners.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

// Nur ein "Datei existiert nicht" darf als leere Liste gewertet werden – jeder
// andere Fehler muss durchgereicht werden, sonst würde ein vorübergehender
// Lesefehler bei einem nachfolgenden Schreibvorgang die echten Daten löschen.
async function readFromBlob(): Promise<GiveawayEntry[]> {
  let blob;
  try {
    blob = await head(BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[giveawayStore] head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[giveawayStore] Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as GiveawayEntry[];
}

async function writeToBlob(entries: GiveawayEntry[]): Promise<void> {
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
    console.error('[giveawayStore] Backup vor dem Schreiben fehlgeschlagen:', e);
  }

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

// ── Winners: Blob helpers ────────────────────────────────────────────────────

async function readWinnersFromBlob(): Promise<GiveawayWinner[]> {
  let blob;
  try {
    blob = await head(WINNERS_BLOB_PATHNAME);
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    console.error('[giveawayStore] Winner head() fehlgeschlagen:', e);
    throw e;
  }
  const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[giveawayStore] Winner-Blob-Fetch fehlgeschlagen: HTTP ${res.status}`);
  }
  return (await res.json()) as GiveawayWinner[];
}

async function writeWinnersToBlob(winners: GiveawayWinner[]): Promise<void> {
  await put(WINNERS_BLOB_PATHNAME, JSON.stringify(winners, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readWinnersFromFile(): Promise<GiveawayWinner[]> {
  try {
    const raw = await fs.readFile(WINNERS_LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as GiveawayWinner[];
  } catch {
    return [];
  }
}

async function writeWinnersToFile(winners: GiveawayWinner[]): Promise<void> {
  await fs.mkdir(path.dirname(WINNERS_LOCAL_FILE), { recursive: true });
  await fs.writeFile(WINNERS_LOCAL_FILE, JSON.stringify(winners, null, 2), 'utf8');
}

async function readAllWinners(): Promise<GiveawayWinner[]> {
  return isBlob() ? await readWinnersFromBlob() : await readWinnersFromFile();
}

async function writeAllWinners(winners: GiveawayWinner[]): Promise<void> {
  if (isBlob()) {
    await writeWinnersToBlob(winners);
  } else {
    await writeWinnersToFile(winners);
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
  email: string,
  location = '',
  language: EntryLang = 'de',
  deviceFingerprint = ''
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
    location: location.trim(),
    language,
    deviceFingerprint: deviceFingerprint.slice(0, 64),
    token: crypto.randomBytes(24).toString('hex'),
    clickedAt: null,
    unsubscribed: false,
    createdAt: new Date().toISOString(),
  };
  entries.unshift(entry);
  await writeAll(entries);
  return { entry };
}

// Markiert alle Einträge dieser E-Mail-Adresse (über alle Songs hinweg) als
// abgemeldet – die Gewinnspiel-Teilnahme selbst bleibt für die Auslosung
// erhalten, nur künftige Update-Mails werden dann nicht mehr verschickt.
export async function unsubscribeByEmail(email: string): Promise<number> {
  const entries = await readAll();
  const normalizedEmail = email.trim().toLowerCase();
  let count = 0;
  for (const entry of entries) {
    if (entry.email.toLowerCase() === normalizedEmail && !entry.unsubscribed) {
      entry.unsubscribed = true;
      count++;
    }
  }
  if (count > 0) await writeAll(entries);
  return count;
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

export async function getWinner(songId: string): Promise<GiveawayWinner | null> {
  const winners = await readAllWinners();
  return winners.find((w) => w.songId === songId) ?? null;
}

export async function drawWinner(
  songId: string,
  redraw = false
): Promise<{ winner: GiveawayWinner | null; error?: string }> {
  const winners = await readAllWinners();
  const existing = winners.find((w) => w.songId === songId);
  if (existing && !redraw) {
    return { winner: existing };
  }

  const entries = await getEntriesForSong(songId);
  const eligible = entries.filter((e) => !!e.clickedAt);
  if (eligible.length === 0) {
    return { winner: null, error: 'Keine bestätigten (geklickten) Teilnahmen für diesen Song.' };
  }

  const picked = eligible[crypto.randomInt(eligible.length)];
  const winner: GiveawayWinner = {
    songId,
    entryId: picked.id,
    email: picked.email,
    drawnAt: new Date().toISOString(),
  };

  const remaining = winners.filter((w) => w.songId !== songId);
  remaining.unshift(winner);
  await writeAllWinners(remaining);

  return { winner };
}
