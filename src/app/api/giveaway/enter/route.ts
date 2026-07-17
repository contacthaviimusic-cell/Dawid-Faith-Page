import { NextRequest, NextResponse } from 'next/server';
import { getSingle } from '@/lib/singlesStore';
import { createEntry } from '@/lib/giveawayStore';
import { sendGiveawayEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { songId, email, location } = body;

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

  try {
    const single = await getSingle(songId);
    if (!single || !single.active || !single.presaveUrl) {
      return NextResponse.json({ error: 'Für diese Single läuft kein Gewinnspiel.' }, { status: 404 });
    }

    const { entry, error } = await createEntry(songId, email, location);
    if (!entry) {
      return NextResponse.json({ error: error ?? 'Konnte nicht eintragen.' }, { status: 409 });
    }

    const origin = new URL(request.url).origin;
    const giveawayLink = `${origin}/api/giveaway/click/${entry.token}`;
    await sendGiveawayEmail(entry.email, single.title, giveawayLink);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[giveaway enter]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
