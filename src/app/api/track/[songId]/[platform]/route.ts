import { NextRequest, NextResponse } from 'next/server';
import { recordClick, PLATFORMS, type Platform } from '@/lib/platformClicksStore';

export const dynamic = 'force-dynamic';

// Öffentlicher Redirect-Link zum Posten auf Social Media, z. B.
// https://dawidfaith.de/api/track/katze/instagram – zählt den Klick und
// leitet zur Pre-Order-Seite der jeweiligen Single weiter.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ songId: string; platform: string }> }
) {
  const { songId, platform } = await params;

  if (!songId || !/^[\w-]+$/.test(songId)) {
    return NextResponse.json({ error: 'Ungültige Song-ID.' }, { status: 400 });
  }
  if (!PLATFORMS.includes(platform as Platform)) {
    return NextResponse.json({ error: 'Ungültige Plattform.' }, { status: 400 });
  }

  try {
    await recordClick(songId, platform as Platform);
  } catch (err) {
    // Tracking-Fehler dürfen den Fan nicht aufhalten – trotzdem weiterleiten.
    console.error('[track]', err);
  }

  const origin = new URL(request.url).origin;
  // "ref" markiert, dass dieser Aufruf bereits als Plattform-Klick gezählt
  // wurde – die Pre-Order-Seite zählt ihn dann nicht zusätzlich als Website-Besuch.
  return NextResponse.redirect(`${origin}/pre-order/${songId}?ref=${platform}`);
}
