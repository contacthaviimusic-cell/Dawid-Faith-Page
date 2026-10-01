import { sql } from './db';

export interface OutreachEntry {
  id: string;
  label: string;
  sentTo: string;
  note: string;
  createdAt: string;
  clicks: number;
  firstClickAt: string | null;
  lastClickAt: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToEntry(r: any): OutreachEntry {
  return {
    id: r.id,
    label: r.label,
    sentTo: r.sent_to,
    note: r.note,
    createdAt: new Date(r.created_at).toISOString(),
    clicks: r.clicks,
    firstClickAt: r.first_click_at ? new Date(r.first_click_at).toISOString() : null,
    lastClickAt: r.last_click_at ? new Date(r.last_click_at).toISOString() : null,
  };
}

export async function getAllOutreach(): Promise<OutreachEntry[]> {
  const rows = await sql`SELECT * FROM site_outreach ORDER BY created_at DESC`;
  return rows.map(rowToEntry);
}

export async function createOutreach(
  label: string,
  sentTo: string,
  note: string
): Promise<{ entry: OutreachEntry; allEntries: OutreachEntry[] }> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const rows = await sql`
    INSERT INTO site_outreach (id, label, sent_to, note)
    VALUES (${id}, ${label}, ${sentTo}, ${note})
    RETURNING *
  `;
  const entry = rowToEntry(rows[0]);
  const allEntries = await getAllOutreach();
  return { entry, allEntries };
}

export async function recordClick(id: string): Promise<boolean> {
  const rows = await sql`
    UPDATE site_outreach SET
      clicks = clicks + 1,
      first_click_at = COALESCE(first_click_at, now()),
      last_click_at = now()
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

export async function deleteOutreach(id: string): Promise<{ ok: boolean; allEntries: OutreachEntry[] }> {
  const rows = await sql`DELETE FROM site_outreach WHERE id = ${id} RETURNING id`;
  const allEntries = await getAllOutreach();
  return { ok: rows.length > 0, allEntries };
}
