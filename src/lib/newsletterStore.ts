import { sql } from './db';

export type SubscriberLang = 'de' | 'en' | 'pl';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  location?: string;
  language?: SubscriberLang;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToSubscriber(r: any): NewsletterSubscriber {
  return {
    id: r.id,
    email: r.email,
    location: r.location,
    language: r.language,
    subscribedAt: new Date(r.subscribed_at).toISOString(),
    ipAddress: r.ip_address,
    userAgent: r.user_agent,
  };
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const rows = await sql`SELECT * FROM site_newsletter_subscribers ORDER BY subscribed_at DESC`;
  return rows.map(rowToSubscriber);
}

export async function createSubscriber(
  email: string,
  location: string,
  ipAddress: string,
  userAgent: string,
  language: SubscriberLang = 'de'
): Promise<{ subscriber: NewsletterSubscriber | null; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await sql`SELECT id FROM site_newsletter_subscribers WHERE lower(email) = ${normalizedEmail}`;
  if (existing.length > 0) {
    return { subscriber: null, error: 'Diese E-Mail-Adresse ist bereits angemeldet' };
  }

  const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const rows = await sql`
    INSERT INTO site_newsletter_subscribers (id, email, location, language, ip_address, user_agent)
    VALUES (${id}, ${normalizedEmail}, ${location.trim()}, ${language}, ${ipAddress}, ${userAgent})
    RETURNING *
  `;
  return { subscriber: rowToSubscriber(rows[0]) };
}

export async function deleteSubscriberByEmail(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const rows = await sql`DELETE FROM site_newsletter_subscribers WHERE lower(email) = ${normalizedEmail} RETURNING id`;
  return rows.length > 0;
}

export async function deleteSubscribersByEmails(emails: string[]): Promise<{ removed: string[]; notFound: string[] }> {
  const normalized = emails.map((e) => e.toLowerCase().trim());
  const existingRows = await sql`SELECT email FROM site_newsletter_subscribers WHERE lower(email) = ANY(${normalized})`;
  const existingSet = new Set(existingRows.map((r) => (r as { email: string }).email.toLowerCase()));

  const removed: string[] = [];
  const notFound: string[] = [];
  for (const email of normalized) {
    if (existingSet.has(email)) removed.push(email);
    else notFound.push(email);
  }

  if (removed.length > 0) {
    await sql`DELETE FROM site_newsletter_subscribers WHERE lower(email) = ANY(${removed})`;
  }
  return { removed, notFound };
}
