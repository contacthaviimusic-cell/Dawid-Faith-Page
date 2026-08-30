import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getClicksForSong } from '@/lib/actionClicksStore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const songId = new URL(request.url).searchParams.get('songId');
  if (!songId) {
    return NextResponse.json({ error: 'Song-ID fehlt.' }, { status: 400 });
  }

  try {
    const clicks = await getClicksForSong(songId);
    return NextResponse.json(clicks);
  } catch (err) {
    console.error('[admin action-clicks GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
