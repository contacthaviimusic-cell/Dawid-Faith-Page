import { sql } from './db';

export interface UnsubscribeLogEntry {
  id: string;
  email: string;
  matchedNewsletter: boolean;
  matchedGiveawayCount: number;
  requestedAt: string;
}

export async function getAllUnsubscribeLog(): Promise<UnsubscribeLogEntry[]> {
  const rows = await sql`SELECT * FROM site_unsubscribe_log ORDER BY requested_at DESC`;
  return rows.map((r) => ({
    id: r.id as string,
    email: r.email as string,
    matchedNewsletter: r.matched_newsletter as boolean,
    matchedGiveawayCount: r.matched_giveaway_count as number,
    requestedAt: new Date(r.requested_at as string).toISOString(),
  }));
}

export async function logUnsubscribe(
  email: string,
  matchedNewsletter: boolean,
  matchedGiveawayCount: number
): Promise<void> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await sql`
    INSERT INTO site_unsubscribe_log (id, email, matched_newsletter, matched_giveaway_count)
    VALUES (${id}, ${email.trim().toLowerCase()}, ${matchedNewsletter}, ${matchedGiveawayCount})
  `;
}
