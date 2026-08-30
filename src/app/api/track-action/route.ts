import { NextRequest, NextResponse } from 'next/server';
import { recordClick, ACTIONS, type Action } from '@/lib/actionClicksStore';

export const dynamic = 'force-dynamic';

// Wird von der Pre-Order-Seite selbst aufgerufen (fire-and-forget), wenn ein
// Besucher auf einen der drei "Wähle deinen Weg"-Buttons klickt (Presave,
// Pre-Order, Engagement).
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { songId, action } = body;

  if (!songId || typeof songId !== 'string' || !/^[\w-]+$/.test(songId)) {
    return NextResponse.json({ error: 'Ungültige Song-ID.' }, { status: 400 });
  }
  if (!ACTIONS.includes(action)) {
    return NextResponse.json({ error: 'Ungültige Aktion.' }, { status: 400 });
  }

  try {
    await recordClick(songId, action as Action);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[track-action]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
