import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import {
  getNewsletterSubscribers,
  saveNewsletterSubscribers,
  type NewsletterSubscriber,
  type SubscriberLang,
} from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Admin-Bulk-Import für bestehende Kontaktlisten (z. B. aus dem Fanbuch), die
// nicht über das öffentliche Formular (mit Pflichtfeld Wohnort) angemeldet
// wurden. Liest den aktuellen Stand EINMAL, fügt alle neuen E-Mails im
// Speicher zusammen und schreibt EINMAL zurück – viele schnelle einzelne
// Lese-Ändere-Schreibe-Zyklen hintereinander (wie zuvor über createSubscriber
// pro E-Mail) laufen sonst in eine Race Condition, weil die Blob-Propagation
// nicht mit der Schreibgeschwindigkeit mithält und spätere Schreibvorgänge
// eine veraltete Version überschreiben.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { emails, language } = body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json({ error: 'emails muss ein nicht-leeres Array sein.' }, { status: 400 });
  }
  const lang: SubscriberLang = language === 'en' || language === 'pl' ? language : 'de';

  const subscribers = await getNewsletterSubscribers();
  const existingEmails = new Set(subscribers.map((s) => s.email.toLowerCase()));

  const added: string[] = [];
  const skipped: { email: string; reason: string }[] = [];
  const now = new Date().toISOString();

  for (const raw of emails) {
    const email = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
    if (!email || !EMAIL_REGEX.test(email)) {
      skipped.push({ email: String(raw), reason: 'ungültiges Format' });
      continue;
    }
    if (existingEmails.has(email)) {
      skipped.push({ email, reason: 'bereits vorhanden' });
      continue;
    }
    existingEmails.add(email);
    const subscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      location: '',
      language: lang,
      subscribedAt: now,
      ipAddress: 'admin-import',
      userAgent: 'admin-import',
    };
    subscribers.push(subscriber);
    added.push(email);
  }

  if (added.length > 0) {
    await saveNewsletterSubscribers(subscribers);
  }

  return NextResponse.json({ added, skipped, addedCount: added.length, skippedCount: skipped.length });
}
