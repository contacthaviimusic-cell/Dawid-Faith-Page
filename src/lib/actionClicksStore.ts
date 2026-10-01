import { sql } from './db';
import { ACTIONS, type Action } from './actionSources';

// Tracked, welchen der drei Wege ("Wähle deinen Weg") Besucher auf der
// Pre-Order-Seite tatsächlich anklicken – unabhängig davon, über welche
// Plattform sie überhaupt auf die Seite gekommen sind (siehe platformClicksStore
// für die Traffic-Quelle). Action/ACTIONS liegen in actionSources.ts, damit
// Client Components sie importieren können, ohne dieses DB-Modul mitzuziehen.
export { ACTIONS, type Action };

export interface ActionClick {
  id: string;
  songId: string;
  action: Action;
  clickedAt: string;
}

export async function getClicksForSong(songId: string): Promise<ActionClick[]> {
  const rows = await sql`SELECT * FROM site_action_clicks WHERE song_id = ${songId}`;
  return rows.map((r) => ({
    id: r.id as string,
    songId: r.song_id as string,
    action: r.action as Action,
    clickedAt: new Date(r.clicked_at as string).toISOString(),
  }));
}

export async function recordClick(songId: string, action: Action): Promise<void> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await sql`INSERT INTO site_action_clicks (id, song_id, action) VALUES (${id}, ${songId}, ${action})`;
}
