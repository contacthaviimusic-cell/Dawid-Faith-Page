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

export type PrizeType = 'mythic' | 'song-nft';

// Pro Song gibt es 1 Mythic-NFT-Gewinner und bis zu SONG_NFT_SLOTS separate
// Song-NFT-Gewinner – niemand gewinnt zwei Preise für denselben Song.
export const SONG_NFT_SLOTS = 5;

export interface GiveawayWinner {
  id: string;
  songId: string;
  prizeType: PrizeType;
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

export async function getWinnersForSong(songId: string): Promise<GiveawayWinner[]> {
  const winners = await readAllWinners();
  return winners.filter((w) => w.songId === songId);
}

function pickRandom<T>(pool: T[]): T {
  return pool[crypto.randomInt(pool.length)];
}

// Zieht den nächsten freien Preis-Slot für diesen Song (den Mythic-NFT, falls
// noch nicht vergeben, oder den nächsten von bis zu SONG_NFT_SLOTS Song-NFTs).
// Wer für diesen Song bereits einen anderen Preis gewonnen hat, ist von der
// Ziehung ausgeschlossen – niemand gewinnt zwei Preise für denselben Song.
export async function drawWinner(
  songId: string,
  prizeType: PrizeType
): Promise<{ winner: GiveawayWinner | null; error?: string }> {
  const winners = await readAllWinners();
  const songWinners = winners.filter((w) => w.songId === songId);

  if (prizeType === 'mythic' && songWinners.some((w) => w.prizeType === 'mythic')) {
    return { winner: null, error: 'Der Mythic-NFT wurde für diesen Song bereits vergeben.' };
  }
  if (
    prizeType === 'song-nft' &&
    songWinners.filter((w) => w.prizeType === 'song-nft').length >= SONG_NFT_SLOTS
  ) {
    return { winner: null, error: `Alle ${SONG_NFT_SLOTS} Song-NFT-Plätze sind bereits vergeben.` };
  }

  const entries = await getEntriesForSong(songId);
  const alreadyWonEntryIds = new Set(songWinners.map((w) => w.entryId));
  const eligible = entries.filter((e) => !!e.clickedAt && !alreadyWonEntryIds.has(e.id));
  if (eligible.length === 0) {
    return { winner: null, error: 'Keine weiteren bestätigten Teilnahmen für diesen Song verfügbar.' };
  }

  const picked = pickRandom(eligible);
  const winner: GiveawayWinner = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    prizeType,
    entryId: picked.id,
    email: picked.email,
    drawnAt: new Date().toISOString(),
  };

  winners.push(winner);
  await writeAllWinners(winners);
  return { winner };
}

// Ersetzt einen bestehenden Gewinner (z. B. weil er sich nicht gemeldet hat)
// durch eine frische Ziehung für denselben Preis-Slot.
export async function redrawWinner(
  songId: string,
  winnerId: string
): Promise<{ winner: GiveawayWinner | null; error?: string }> {
  const winners = await readAllWinners();
  const target = winners.find((w) => w.id === winnerId && w.songId === songId);
  if (!target) {
    return { winner: null, error: 'Gewinner nicht gefunden.' };
  }

  const otherSongWinners = winners.filter((w) => w.songId === songId && w.id !== winnerId);
  const entries = await getEntriesForSong(songId);
  const alreadyWonEntryIds = new Set(otherSongWinners.map((w) => w.entryId));
  const eligible = entries.filter((e) => !!e.clickedAt && !alreadyWonEntryIds.has(e.id));
  if (eligible.length === 0) {
    return { winner: null, error: 'Keine weiteren bestätigten Teilnahmen für diesen Song verfügbar.' };
  }

  const picked = pickRandom(eligible);
  const newWinner: GiveawayWinner = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    prizeType: target.prizeType,
    entryId: picked.id,
    email: picked.email,
    drawnAt: new Date().toISOString(),
  };

  const remaining = winners.filter((w) => w.id !== winnerId);
  remaining.push(newWinner);
  await writeAllWinners(remaining);
  return { winner: newWinner };
}
