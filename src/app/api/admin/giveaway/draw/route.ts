import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { drawWinner, getWinner } from '@/lib/giveawayStore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const songId = new URL(request.url).searchParams.get('songId');
  if (!songId) {
    return NextResponse.json({ error: 'Song-ID fehlt.' }, { status: 400 });
  }

  try {
    const winner = await getWinner(songId);
    return NextResponse.json({ winner });
  } catch (err) {
    console.error('[admin giveaway draw GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { songId, redraw } = body;

  if (!songId || typeof songId !== 'string') {
    return NextResponse.json({ error: 'Song-ID fehlt.' }, { status: 400 });
  }

  try {
    const { winner, error } = await drawWinner(songId, !!redraw);
    if (!winner) {
      return NextResponse.json({ error: error ?? 'Konnte nicht auslosen.' }, { status: 409 });
    }
    return NextResponse.json(winner);
  } catch (err) {
    console.error('[admin giveaway draw]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
