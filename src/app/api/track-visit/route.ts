import { NextRequest, NextResponse } from 'next/server';
import { recordClick } from '@/lib/platformClicksStore';

export const dynamic = 'force-dynamic';

// Wird von der Pre-Order-Seite selbst aufgerufen (fire-and-forget), wenn ein
// Besucher ohne Plattform-Tracking-Link ankommt – also direkt über die Website.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { songId } = body;

  if (!songId || typeof songId !== 'string' || !/^[\w-]+$/.test(songId)) {
    return NextResponse.json({ error: 'Ungültige Song-ID.' }, { status: 400 });
  }

  try {
    await recordClick(songId, 'website');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[track-visit]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
