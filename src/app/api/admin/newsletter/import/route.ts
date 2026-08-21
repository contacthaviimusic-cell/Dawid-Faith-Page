import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { createSubscriber, type SubscriberLang } from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Admin-Bulk-Import für bestehende Kontaktlisten (z. B. aus dem Fanbuch), die
// nicht über das öffentliche Formular (mit Pflichtfeld Wohnort) angemeldet
// wurden.
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

  const added: string[] = [];
  const skipped: { email: string; reason: string }[] = [];

  for (const raw of emails) {
    const email = typeof raw === 'string' ? raw.trim() : '';
    if (!email || !EMAIL_REGEX.test(email)) {
      skipped.push({ email: String(raw), reason: 'ungültiges Format' });
      continue;
    }
    const { subscriber, error } = await createSubscriber(email, '', 'admin-import', 'admin-import', lang);
    if (!subscriber) {
      skipped.push({ email, reason: error ?? 'unbekannter Fehler' });
    } else {
      added.push(subscriber.email);
    }
  }

  return NextResponse.json({ added, skipped, addedCount: added.length, skippedCount: skipped.length });
}
