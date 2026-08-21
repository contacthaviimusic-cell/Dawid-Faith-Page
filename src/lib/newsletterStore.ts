import { put, list } from '@vercel/blob';

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

const BLOB_FILENAME = 'newsletter-subscribers.json';

// Nur "kein Blob vorhanden" (leere Liste von list()) gilt als echte Leere.
// Jeder andere Fehler wird durchgereicht, damit ein vorübergehender Lesefehler
// nicht fälschlich als "keine Abonnenten" gilt und echte Daten überschrieben werden.
export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const { blobs } = await list({ prefix: BLOB_FILENAME });

  if (blobs.length === 0) {
    return [];
  }

  const latestBlob = blobs[0];
  const response = await fetch(`${latestBlob.url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`[newsletterStore] Blob-Fetch fehlgeschlagen: HTTP ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function saveNewsletterSubscribers(subscribers: NewsletterSubscriber[]): Promise<void> {
  await put(BLOB_FILENAME, JSON.stringify(subscribers, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function createSubscriber(
  email: string,
  location: string,
  ipAddress: string,
  userAgent: string,
  language: SubscriberLang = 'de'
): Promise<{ subscriber: NewsletterSubscriber | null; error?: string }> {
  const subscribers = await getNewsletterSubscribers();
  const normalizedEmail = email.toLowerCase().trim();

  if (subscribers.some((s) => s.email.toLowerCase() === normalizedEmail)) {
    return { subscriber: null, error: 'Diese E-Mail-Adresse ist bereits angemeldet' };
  }

  const subscriber: NewsletterSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: normalizedEmail,
    location: location.trim(),
    language,
    subscribedAt: new Date().toISOString(),
    ipAddress,
    userAgent,
  };

  subscribers.push(subscriber);
  await saveNewsletterSubscribers(subscribers);
  return { subscriber };
}

export async function deleteSubscriberByEmail(email: string): Promise<boolean> {
  const subscribers = await getNewsletterSubscribers();
  const normalizedEmail = email.toLowerCase().trim();
  const remaining = subscribers.filter((s) => s.email.toLowerCase() !== normalizedEmail);
  if (remaining.length === subscribers.length) return false;
  await saveNewsletterSubscribers(remaining);
  return true;
}
