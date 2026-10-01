import { sql } from './db';

export interface SingleConfig {
  id: string; // Song-ID, z.B. 'katze' (muss zu den Song-IDs der Musik-Sektion passen)
  title: string;
  coverImage: string;
  teaserVideo: string;
  audioReleaseDate: string; // ISO-Datum: bis dahin läuft der Countdown / Presave
  videoReleaseDate: string; // ISO-Datum: bis dahin ist Pre-Order möglich
  presaveUrl: string;
  skipPresave: boolean; // true = keine externe Presave-Verlinkung; Karte 01 sammelt Mail+Wohnort direkt und verlinkt intern auf die Gewinnspiel-Seite
  giveawayDeadline: string; // ISO-Datum: bis dahin bleibt die NFT-Gewinnspiel-Karte sichtbar (auch nach dem Musikvideo-Release). Leer = Karte folgt der alten Logik (nur während der Zwischenphase vor dem Video-Release)
  discountCode: string;
  preorderPrice: string; // z.B. '4.99' (rein informativ, Preis wird auf Bandcamp gepflegt)
  bandcampUrl: string; // Link zum Bandcamp-Track/Album (leer, bis konfiguriert)
  streamingUrl: string; // "Jetzt überall hören"-Link (z.B. Ditto/Songwhip-Smartlink), ersetzt die Pre-Order-Karte, sobald der Song veröffentlicht ist
  audioFileUrl: string; // MP3-Datei des Songs; wenn gesetzt, bekommt jede Gewinnspiel-Teilnahme direkt einen Download-Link zum Song per Mail
  premiereVideoUrl: string;
  premiereRevealHours: string; // Stunden vor videoReleaseDate, ab denen premiereVideoUrl öffentlich sichtbar wird (Default 48, siehe api/singles)
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToSingle(r: any): SingleConfig {
  return {
    id: r.id,
    title: r.title,
    coverImage: r.cover_image,
    teaserVideo: r.teaser_video,
    audioReleaseDate: r.audio_release_date,
    videoReleaseDate: r.video_release_date,
    presaveUrl: r.presave_url,
    skipPresave: r.skip_presave,
    giveawayDeadline: r.giveaway_deadline,
    discountCode: r.discount_code,
    preorderPrice: r.preorder_price,
    bandcampUrl: r.bandcamp_url,
    streamingUrl: r.streaming_url,
    audioFileUrl: r.audio_file_url,
    premiereVideoUrl: r.premiere_video_url,
    premiereRevealHours: r.premiere_reveal_hours,
    active: r.active,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  };
}

export async function getAllSingles(): Promise<SingleConfig[]> {
  const rows = await sql`SELECT * FROM site_singles ORDER BY created_at DESC`;
  return rows.map(rowToSingle);
}

export async function getSingle(id: string): Promise<SingleConfig | null> {
  const rows = await sql`SELECT * FROM site_singles WHERE id = ${id}`;
  return rows.length > 0 ? rowToSingle(rows[0]) : null;
}

export type SingleInput = Omit<SingleConfig, 'createdAt' | 'updatedAt'>;

export async function createSingle(input: SingleInput): Promise<{ single: SingleConfig | null; error?: string }> {
  const existing = await sql`SELECT id FROM site_singles WHERE id = ${input.id}`;
  if (existing.length > 0) {
    return { single: null, error: 'Eine Single mit dieser ID existiert bereits.' };
  }

  const rows = await sql`
    INSERT INTO site_singles (
      id, title, cover_image, teaser_video, audio_release_date, video_release_date,
      presave_url, skip_presave, giveaway_deadline, discount_code, preorder_price, bandcamp_url,
      streaming_url, audio_file_url, premiere_video_url, premiere_reveal_hours, active
    ) VALUES (
      ${input.id}, ${input.title}, ${input.coverImage}, ${input.teaserVideo},
      ${input.audioReleaseDate}, ${input.videoReleaseDate}, ${input.presaveUrl},
      ${input.skipPresave}, ${input.giveawayDeadline}, ${input.discountCode}, ${input.preorderPrice},
      ${input.bandcampUrl}, ${input.streamingUrl}, ${input.audioFileUrl},
      ${input.premiereVideoUrl}, ${input.premiereRevealHours}, ${input.active}
    )
    RETURNING *
  `;
  return { single: rowToSingle(rows[0]) };
}

export async function updateSingle(
  id: string,
  patch: Partial<Omit<SingleConfig, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SingleConfig | null> {
  const existing = await getSingle(id);
  if (!existing) return null;

  const merged: Record<string, unknown> = { ...existing, ...patch };
  const rows = await sql`
    UPDATE site_singles SET
      title = ${merged.title as string},
      cover_image = ${merged.coverImage as string},
      teaser_video = ${merged.teaserVideo as string},
      audio_release_date = ${merged.audioReleaseDate as string},
      video_release_date = ${merged.videoReleaseDate as string},
      presave_url = ${merged.presaveUrl as string},
      skip_presave = ${merged.skipPresave as boolean},
      giveaway_deadline = ${merged.giveawayDeadline as string},
      discount_code = ${merged.discountCode as string},
      preorder_price = ${merged.preorderPrice as string},
      bandcamp_url = ${merged.bandcampUrl as string},
      streaming_url = ${merged.streamingUrl as string},
      audio_file_url = ${merged.audioFileUrl as string},
      premiere_video_url = ${merged.premiereVideoUrl as string},
      premiere_reveal_hours = ${merged.premiereRevealHours as string},
      active = ${merged.active as boolean},
      updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows.length > 0 ? rowToSingle(rows[0]) : null;
}

export async function deleteSingle(id: string): Promise<boolean> {
  const rows = await sql`DELETE FROM site_singles WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
