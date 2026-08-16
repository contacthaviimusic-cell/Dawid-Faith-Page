import { NextRequest, NextResponse } from 'next/server';
import { getSingle } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

const DEFAULT_PREMIERE_REVEAL_HOURS = 48;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ songId: string }> }
) {
  const { songId } = await params;
  if (!/^[\w-]+$/.test(songId)) {
    return NextResponse.json({ error: 'Ungültige Song-ID.' }, { status: 400 });
  }

  try {
    const single = await getSingle(songId);
    if (!single || !single.active) {
      return NextResponse.json({ error: 'Single nicht gefunden.' }, { status: 404 });
    }

    // Der Premiere-Link wird erst kurz vor dem Video-Release öffentlich ausgeliefert,
    // damit Pre-Order-Käufer und App-Nutzer ihren zeitlichen Vorsprung behalten – auch
    // wenn er im Admin schon länger im Voraus hinterlegt wurde.
    const videoReleaseMs = single.videoReleaseDate ? new Date(single.videoReleaseDate).getTime() : NaN;
    const revealHours = Number(single.premiereRevealHours) || DEFAULT_PREMIERE_REVEAL_HOURS;
    const revealAtMs = Number.isNaN(videoReleaseMs) ? null : videoReleaseMs - revealHours * 3_600_000;
    const revealed = revealAtMs !== null && Date.now() >= revealAtMs;

    return NextResponse.json({
      ...single,
      premiereVideoUrl: revealed ? single.premiereVideoUrl : '',
    });
  } catch (err) {
    console.error('[singles GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
