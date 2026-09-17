import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getWinnersForSong, getEntriesForSong, type PrizeType } from '@/lib/giveawayStore';
import { getSingle } from '@/lib/singlesStore';
import { renderGiveawayWinnerEmail, sendGiveawayWinnerEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

// Gruppiert die Gewinner-Datensätze eines Songs nach entryId, damit eine
// Person, die zwei Preise gewonnen hat (Song-NFT + Mythic-NFT), nur einmal
// auftaucht statt zweimal.
function groupByEntryId(winners: { entryId: string; prizeType: PrizeType; email: string }[]) {
  const map = new Map<string, { prizeTypes: PrizeType[]; email: string }>();
  for (const w of winners) {
    const existing = map.get(w.entryId);
    if (existing) {
      existing.prizeTypes.push(w.prizeType);
    } else {
      map.set(w.entryId, { prizeTypes: [w.prizeType], email: w.email });
    }
  }
  return map;
}

// Liefert eine Vorschau aller Gewinner-Mails für einen Song, ohne etwas zu
// versenden – zum Anzeigen im Admin-Panel vor dem eigentlichen Versand.
export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const songId = new URL(request.url).searchParams.get('songId');
  if (!songId) {
    return NextResponse.json({ error: 'Song-ID fehlt.' }, { status: 400 });
  }

  try {
    const [winners, entries, single] = await Promise.all([
      getWinnersForSong(songId),
      getEntriesForSong(songId),
      getSingle(songId),
    ]);
    if (!single) {
      return NextResponse.json({ error: 'Single nicht gefunden.' }, { status: 404 });
    }
    const entryById = new Map(entries.map((e) => [e.id, e]));

    const grouped = groupByEntryId(winners);
    const previews = Array.from(grouped.entries()).map(([entryId, { prizeTypes, email }]) => {
      const entry = entryById.get(entryId);
      const lang = entry?.language ?? 'de';
      const rendered = renderGiveawayWinnerEmail(single.title, prizeTypes, lang);
      return { entryId, email, prizeTypes, lang, ...rendered };
    });

    return NextResponse.json({ previews });
  } catch (err) {
    console.error('[admin giveaway notify GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}

// Verschickt die Gewinner-Mail für genau eine Person (entryId) eines Songs.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { songId, entryId, testEmail } = body;
  if (!songId || typeof songId !== 'string' || !entryId || typeof entryId !== 'string') {
    return NextResponse.json({ error: 'songId/entryId fehlt.' }, { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (testEmail !== undefined && (typeof testEmail !== 'string' || !emailRegex.test(testEmail))) {
    return NextResponse.json({ error: 'Ungültige Test-E-Mail-Adresse.' }, { status: 400 });
  }

  try {
    const [winners, entries, single] = await Promise.all([
      getWinnersForSong(songId),
      getEntriesForSong(songId),
      getSingle(songId),
    ]);
    if (!single) {
      return NextResponse.json({ error: 'Single nicht gefunden.' }, { status: 404 });
    }

    const prizeTypes = winners.filter((w) => w.entryId === entryId).map((w) => w.prizeType);
    if (prizeTypes.length === 0) {
      return NextResponse.json({ error: 'Kein Gewinn für diese Teilnahme gefunden.' }, { status: 404 });
    }

    const entry = entries.find((e) => e.id === entryId);
    // Bei testEmail geht der reale Inhalt (Preise, Sprache) an eine
    // Test-Adresse statt an den echten Gewinner – zum Gegenchecken vor dem
    // eigentlichen Versand.
    const email = testEmail || entry?.email || winners.find((w) => w.entryId === entryId)!.email;
    const lang = entry?.language;

    await sendGiveawayWinnerEmail(email, single.title, prizeTypes, lang);
    return NextResponse.json({ success: true, sentTo: email, isTest: !!testEmail });
  } catch (err) {
    console.error('[admin giveaway notify POST]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
