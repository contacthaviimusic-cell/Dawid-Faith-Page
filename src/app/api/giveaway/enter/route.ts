import { NextRequest, NextResponse } from 'next/server';
import { getSingle } from '@/lib/singlesStore';
import { createEntry, markClicked } from '@/lib/giveawayStore';
import { sendGiveawayConfirmationEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { songId, email, location, lang, fingerprint } = body;

  if (!songId || typeof songId !== 'string' || !/^[\w-]+$/.test(songId)) {
    return NextResponse.json({ error: 'Ungültige Song-ID.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }
  if (!location || typeof location !== 'string' || !location.trim()) {
    return NextResponse.json({ error: 'Bitte gib deinen Wohnort an.' }, { status: 400 });
  }
  const entryLang = lang === 'en' || lang === 'pl' ? lang : 'de';
  const entryFingerprint = typeof fingerprint === 'string' ? fingerprint : '';

  try {
    const single = await getSingle(songId);
    if (!single || !single.active || !single.presaveUrl) {
      return NextResponse.json({ error: 'Für diese Single läuft kein Gewinnspiel.' }, { status: 404 });
    }

    const { entry, error } = await createEntry(songId, email, location, entryLang, entryFingerprint);
    if (!entry) {
      return NextResponse.json({ error: error ?? 'Konnte nicht eintragen.' }, { status: 409 });
    }

    // Die Teilnahme wird direkt mit dem Absenden des Formulars bestätigt –
    // der Fan wird im Anschluss unmittelbar zum Presave weitergeleitet, ein
    // zusätzlicher Klick auf einen zugeschickten Link ist nicht mehr nötig.
    await markClicked(entry.id);

    const origin = new URL(request.url).origin;
    await sendGiveawayConfirmationEmail(entry.email, single.title, origin, entry.language);

    return NextResponse.json({ success: true, presaveUrl: single.presaveUrl });
  } catch (err) {
    console.error('[giveaway enter]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
