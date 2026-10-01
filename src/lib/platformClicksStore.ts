import { sql } from './db';
import { PLATFORMS, ALL_SOURCES, type Platform, type Source } from './platformSources';

export { PLATFORMS, ALL_SOURCES, type Platform, type Source };

export interface PlatformClick {
  id: string;
  songId: string;
  platform: Source;
  clickedAt: string;
}

export async function getClicksForSong(songId: string): Promise<PlatformClick[]> {
  const rows = await sql`SELECT * FROM site_platform_clicks WHERE song_id = ${songId}`;
  return rows.map((r) => ({
    id: r.id as string,
    songId: r.song_id as string,
    platform: r.platform as Source,
    clickedAt: new Date(r.clicked_at as string).toISOString(),
  }));
}

export async function recordClick(songId: string, platform: Source): Promise<void> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await sql`INSERT INTO site_platform_clicks (id, song_id, platform) VALUES (${id}, ${songId}, ${platform})`;
}
