import { NextRequest, NextResponse } from 'next/server';
import { findEntryByToken, markClicked } from '@/lib/giveawayStore';
import { getSingle } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!/^[a-f0-9]{48}$/.test(token)) {
    return NextResponse.json({ error: 'Ungültiger Link.' }, { status: 400 });
  }

  try {
    const entry = await findEntryByToken(token);
    if (!entry) {
      return NextResponse.json({ error: 'Link nicht gefunden.' }, { status: 404 });
    }

    const single = await getSingle(entry.songId);
    if (!single || !single.presaveUrl) {
      return NextResponse.json({ error: 'Presave-Link nicht mehr verfügbar.' }, { status: 404 });
    }

    await markClicked(entry.id);

    return NextResponse.redirect(single.presaveUrl);
  } catch (err) {
    console.error('[giveaway click]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
