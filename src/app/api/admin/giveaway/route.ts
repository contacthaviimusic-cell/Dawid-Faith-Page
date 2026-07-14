import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllEntries, getEntriesForSong } from '@/lib/giveawayStore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const songId = new URL(request.url).searchParams.get('songId');
    const entries = songId ? await getEntriesForSong(songId) : await getAllEntries();
    return NextResponse.json(entries);
  } catch (err) {
    console.error('[admin giveaway GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
