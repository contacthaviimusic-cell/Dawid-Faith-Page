import { NextRequest, NextResponse } from 'next/server';
import { getSingle } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

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
    return NextResponse.json(single);
  } catch (err) {
    console.error('[singles GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
