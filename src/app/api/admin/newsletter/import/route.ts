import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { sql } from '@/lib/db';
import { getNewsletterSubscribers, type SubscriberLang } from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Admin-Bulk-Import für bestehende Kontaktlisten (z. B. aus dem Fanbuch), die
// nicht über das öffentliche Formular (mit Pflichtfeld Wohnort) angemeldet
// wurden. Jede neue E-Mail wird einzeln per INSERT geschrieben – anders als
// bei der alten Blob-Variante sind einzelne, schnell aufeinanderfolgende
// Schreibvorgänge in Postgres unproblematisch (keine Race Condition, da jede
// Zeile atomar eingefügt wird statt die ganze Datei neu zu schreiben).
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

  const existingSubscribers = await getNewsletterSubscribers();
  const existingEmails = new Set(existingSubscribers.map((s) => s.email.toLowerCase()));

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
    const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO site_newsletter_subscribers (id, email, location, language, subscribed_at, ip_address, user_agent)
      VALUES (${id}, ${email}, '', ${lang}, ${now}, 'admin-import', 'admin-import')
    `;
    added.push(email);
  }

  return NextResponse.json({
    version: 'atomic-v2',
    added,
    skipped,
    addedCount: added.length,
    skippedCount: skipped.length,
    totalAfter: existingSubscribers.length + added.length,
  });
}
