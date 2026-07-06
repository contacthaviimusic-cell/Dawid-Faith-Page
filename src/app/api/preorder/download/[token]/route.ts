import { NextRequest, NextResponse } from 'next/server';
import { findOrderByToken } from '@/lib/ordersStore';
import { getSingle } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!/^[a-f0-9]{48}$/.test(token)) {
    return NextResponse.json({ error: 'Ungültiger Download-Link.' }, { status: 400 });
  }

  try {
    const order = await findOrderByToken(token);
    if (!order) {
      return NextResponse.json({ error: 'Download-Link nicht gefunden.' }, { status: 404 });
    }

    const song = await getSingle(order.songId);
    if (!song) {
      return NextResponse.json({ error: 'Song nicht gefunden.' }, { status: 404 });
    }

    const file = new URL(request.url).searchParams.get('file');
    const target = file === 'video' ? song.privateVideoPath : song.privateMp3Path;
    if (!target) {
      return NextResponse.json(
        { error: 'Datei noch nicht verfügbar. Bitte später erneut versuchen.' },
        { status: 404 }
      );
    }

    return NextResponse.redirect(target);
  } catch (err) {
    console.error('[preorder download]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
