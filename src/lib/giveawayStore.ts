import crypto from 'node:crypto';
import { sql } from './db';

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
export const SONG_NFT_SLOTS = 10;

export interface GiveawayWinner {
  id: string;
  songId: string;
  prizeType: PrizeType;
  entryId: string;
  email: string;
  drawnAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToEntry(r: any): GiveawayEntry {
  return {
    id: r.id,
    songId: r.song_id,
    email: r.email,
    location: r.location,
    language: r.language,
    deviceFingerprint: r.device_fingerprint,
    token: r.token,
    clickedAt: r.clicked_at ? new Date(r.clicked_at).toISOString() : null,
    unsubscribed: r.unsubscribed,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToWinner(r: any): GiveawayWinner {
  return {
    id: r.id,
    songId: r.song_id,
    prizeType: r.prize_type,
    entryId: r.entry_id,
    email: r.email,
    drawnAt: new Date(r.drawn_at).toISOString(),
  };
}

// ── API ──────────────────────────────────────────────────────────────────────

export async function getAllEntries(): Promise<GiveawayEntry[]> {
  const rows = await sql`SELECT * FROM site_giveaway_entries ORDER BY created_at DESC`;
  return rows.map(rowToEntry);
}

export async function getEntriesForSong(songId: string): Promise<GiveawayEntry[]> {
  const rows = await sql`SELECT * FROM site_giveaway_entries WHERE song_id = ${songId} ORDER BY created_at DESC`;
  return rows.map(rowToEntry);
}

export async function findEntryByToken(token: string): Promise<GiveawayEntry | null> {
  const rows = await sql`SELECT * FROM site_giveaway_entries WHERE token = ${token}`;
  return rows.length > 0 ? rowToEntry(rows[0]) : null;
}

export async function createEntry(
  songId: string,
  email: string,
  location = '',
  language: EntryLang = 'de',
  deviceFingerprint = ''
): Promise<{ entry: GiveawayEntry | null; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await sql`
    SELECT id FROM site_giveaway_entries WHERE song_id = ${songId} AND lower(email) = ${normalizedEmail}
  `;
  if (existing.length > 0) {
    return { entry: null, error: 'Diese E-Mail-Adresse nimmt bereits teil.' };
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const token = crypto.randomBytes(24).toString('hex');
  const rows = await sql`
    INSERT INTO site_giveaway_entries (id, song_id, email, location, language, device_fingerprint, token, clicked_at, unsubscribed)
    VALUES (${id}, ${songId}, ${normalizedEmail}, ${location.trim()}, ${language}, ${deviceFingerprint.slice(0, 64)}, ${token}, NULL, false)
    RETURNING *
  `;
  return { entry: rowToEntry(rows[0]) };
}

// Markiert alle Einträge dieser E-Mail-Adresse (über alle Songs hinweg) als
// abgemeldet – die Gewinnspiel-Teilnahme selbst bleibt für die Auslosung
// erhalten, nur künftige Update-Mails werden dann nicht mehr verschickt.
export async function unsubscribeByEmail(email: string): Promise<number> {
  const normalizedEmail = email.trim().toLowerCase();
  const rows = await sql`
    UPDATE site_giveaway_entries SET unsubscribed = true
    WHERE lower(email) = ${normalizedEmail} AND unsubscribed = false
    RETURNING id
  `;
  return rows.length;
}

export async function deleteEntry(id: string): Promise<boolean> {
  const rows = await sql`DELETE FROM site_giveaway_entries WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

export async function markClicked(id: string): Promise<void> {
  await sql`UPDATE site_giveaway_entries SET clicked_at = now() WHERE id = ${id} AND clicked_at IS NULL`;
}

export async function getWinnersForSong(songId: string): Promise<GiveawayWinner[]> {
  const rows = await sql`SELECT * FROM site_giveaway_winners WHERE song_id = ${songId}`;
  return rows.map(rowToWinner);
}

function pickRandom<T>(pool: T[]): T {
  return pool[crypto.randomInt(pool.length)];
}

// Baut aus den bisherigen Gewinnern dieses Songs die Menge der bereits
// "verbrauchten" entryId + deviceFingerprint auf – so kann dieselbe Person
// nicht über eine zweite E-Mail-Adresse (gleiches Gerät) einen zweiten
// Song-NFT-Platz gewinnen.
function buildExclusion(
  songWinners: GiveawayWinner[],
  entryById: Map<string, GiveawayEntry>
): { entryIds: Set<string>; fingerprints: Set<string> } {
  const entryIds = new Set(songWinners.map((w) => w.entryId));
  const fingerprints = new Set(
    songWinners
      .map((w) => entryById.get(w.entryId)?.deviceFingerprint)
      .filter((fp): fp is string => !!fp)
  );
  return { entryIds, fingerprints };
}

function eligibleEntries(
  entries: GiveawayEntry[],
  exclude: { entryIds: Set<string>; fingerprints: Set<string> }
): GiveawayEntry[] {
  return entries.filter(
    (e) =>
      !!e.clickedAt &&
      !exclude.entryIds.has(e.id) &&
      !(e.deviceFingerprint && exclude.fingerprints.has(e.deviceFingerprint))
  );
}

// Zieht den nächsten freien Preis-Slot für diesen Song.
// - Song-NFT: normale Ziehung unter allen bestätigten Teilnahmen, die weder
//   selbst noch über ein zweites Gerät-gleiches Konto bereits einen Preis für
//   diesen Song gewonnen haben – jede Person gewinnt höchstens einen Song-NFT.
// - Mythic-NFT: wird bewusst NUR unter den bereits gezogenen Song-NFT-Gewinnern
//   verlost. Die Person gewinnt dadurch zusätzlich zum Song-NFT auch den
//   Mythic-NFT (die einzige Ausnahme, bei der jemand zwei Preise bekommt).
export async function drawWinner(
  songId: string,
  prizeType: PrizeType
): Promise<{ winner: GiveawayWinner | null; error?: string }> {
  const songWinners = await getWinnersForSong(songId);
  const entries = await getEntriesForSong(songId);
  const entryById = new Map(entries.map((e) => [e.id, e]));

  if (prizeType === 'mythic') {
    if (songWinners.some((w) => w.prizeType === 'mythic')) {
      return { winner: null, error: 'Der Mythic-NFT wurde für diesen Song bereits vergeben.' };
    }
    const songNftWinners = songWinners.filter((w) => w.prizeType === 'song-nft');
    if (songNftWinners.length === 0) {
      return {
        winner: null,
        error: 'Bitte zuerst mindestens einen Song-NFT-Gewinner auslosen – der Mythic-NFT geht an eine(n) davon.',
      };
    }
    const picked = pickRandom(songNftWinners);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const rows = await sql`
      INSERT INTO site_giveaway_winners (id, song_id, prize_type, entry_id, email)
      VALUES (${id}, ${songId}, 'mythic', ${picked.entryId}, ${picked.email})
      RETURNING *
    `;
    return { winner: rowToWinner(rows[0]) };
  }

  const existingSongNftWinners = songWinners.filter((w) => w.prizeType === 'song-nft');
  if (existingSongNftWinners.length >= SONG_NFT_SLOTS) {
    return { winner: null, error: `Alle ${SONG_NFT_SLOTS} Song-NFT-Plätze sind bereits vergeben.` };
  }

  // Nur bereits vergebene Song-NFTs schließen von der Song-NFT-Ziehung aus –
  // wer (z. B. aus einer älteren Ziehung) nur den Mythic-NFT hält, ohne
  // dazugehöriges Song-NFT, darf trotzdem noch eins gewinnen.
  const eligible = eligibleEntries(entries, buildExclusion(existingSongNftWinners, entryById));
  if (eligible.length === 0) {
    return { winner: null, error: 'Keine weiteren bestätigten Teilnahmen für diesen Song verfügbar.' };
  }

  const picked = pickRandom(eligible);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const rows = await sql`
    INSERT INTO site_giveaway_winners (id, song_id, prize_type, entry_id, email)
    VALUES (${id}, ${songId}, 'song-nft', ${picked.id}, ${picked.email})
    RETURNING *
  `;
  return { winner: rowToWinner(rows[0]) };
}

// Ersetzt einen bestehenden Gewinner (z. B. weil er sich nicht gemeldet hat)
// durch eine frische Ziehung für denselben Preis-Slot.
export async function redrawWinner(
  songId: string,
  winnerId: string
): Promise<{ winner: GiveawayWinner | null; error?: string }> {
  const songWinners = await getWinnersForSong(songId);
  const target = songWinners.find((w) => w.id === winnerId);
  if (!target) {
    return { winner: null, error: 'Gewinner nicht gefunden.' };
  }

  const entries = await getEntriesForSong(songId);
  const entryById = new Map(entries.map((e) => [e.id, e]));

  if (target.prizeType === 'mythic') {
    // Neu ziehen unter den übrigen Song-NFT-Gewinnern (der bisherige
    // Mythic-Gewinner selbst kommt nicht nochmal dran).
    const candidates = songWinners.filter(
      (w) => w.prizeType === 'song-nft' && w.entryId !== target.entryId
    );
    if (candidates.length === 0) {
      return {
        winner: null,
        error: 'Kein anderer Song-NFT-Gewinner verfügbar, an den der Mythic-NFT stattdessen gehen könnte.',
      };
    }
    const picked = pickRandom(candidates);
    await sql`DELETE FROM site_giveaway_winners WHERE id = ${winnerId}`;
    const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const rows = await sql`
      INSERT INTO site_giveaway_winners (id, song_id, prize_type, entry_id, email)
      VALUES (${newId}, ${songId}, 'mythic', ${picked.entryId}, ${picked.email})
      RETURNING *
    `;
    return { winner: rowToWinner(rows[0]) };
  }

  // target.prizeType === 'song-nft'
  const holdsMythicToo = songWinners.some(
    (w) => w.prizeType === 'mythic' && w.entryId === target.entryId
  );
  if (holdsMythicToo) {
    return {
      winner: null,
      error: 'Diese Person hat für diesen Song auch den Mythic-NFT gewonnen. Bitte zuerst den Mythic-NFT neu auslosen.',
    };
  }

  const otherSongNftWinners = songWinners.filter((w) => w.id !== winnerId && w.prizeType === 'song-nft');
  const eligible = eligibleEntries(entries, buildExclusion(otherSongNftWinners, entryById));
  if (eligible.length === 0) {
    return { winner: null, error: 'Keine weiteren bestätigten Teilnahmen für diesen Song verfügbar.' };
  }

  const picked = pickRandom(eligible);
  await sql`DELETE FROM site_giveaway_winners WHERE id = ${winnerId}`;
  const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const rows = await sql`
    INSERT INTO site_giveaway_winners (id, song_id, prize_type, entry_id, email)
    VALUES (${newId}, ${songId}, 'song-nft', ${picked.id}, ${picked.email})
    RETURNING *
  `;
  return { winner: rowToWinner(rows[0]) };
}
