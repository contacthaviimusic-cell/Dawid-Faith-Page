import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllEntries, getEntriesForSong, markClicked, deleteEntry } from '@/lib/giveawayStore';

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

// Manuelles Bestätigen für Alt-Einträge von vor der Modal-Umstellung, die nie
// auf den zugeschickten Link geklickt haben und sonst für immer unbestätigt
// blieben (dieser Link wird seitdem nicht mehr verschickt).
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { entryId } = body;
  if (!entryId || typeof entryId !== 'string') {
    return NextResponse.json({ error: 'entryId fehlt.' }, { status: 400 });
  }

  try {
    await markClicked(entryId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin giveaway POST]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}

// Entfernt einen einzelnen Teilnahme-Eintrag, z. B. eigene Test-Einträge des
// Admins selbst. Löscht nur den Eintrag – ein bereits gezogener Gewinner-Datensatz
// bleibt davon unberührt.
export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const entryId = new URL(request.url).searchParams.get('entryId');
  if (!entryId) {
    return NextResponse.json({ error: 'entryId fehlt.' }, { status: 400 });
  }

  try {
    const deleted = await deleteEntry(entryId);
    if (!deleted) {
      return NextResponse.json({ error: 'Eintrag nicht gefunden.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin giveaway DELETE]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
