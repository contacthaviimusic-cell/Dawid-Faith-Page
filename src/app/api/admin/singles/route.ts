import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllSingles, createSingle, type SingleInput } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const singles = await getAllSingles();
    return NextResponse.json(singles);
  } catch (err) {
    console.error('[admin singles GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, title } = body;

  if (!id || !title) {
    return NextResponse.json(
      { error: 'ID und Titel sind Pflichtfelder.' },
      { status: 400 }
    );
  }
  if (!/^[\w-]+$/.test(id)) {
    return NextResponse.json(
      { error: 'ID darf nur Buchstaben, Zahlen, - und _ enthalten.' },
      { status: 400 }
    );
  }

  const input: SingleInput = {
    id,
    title,
    coverImage: body.coverImage ?? '',
    teaserVideo: body.teaserVideo ?? '',
    audioReleaseDate: body.audioReleaseDate ?? '',
    videoReleaseDate: body.videoReleaseDate ?? '',
    presaveUrl: body.presaveUrl ?? '',
    discountCode: body.discountCode ?? '',
    preorderPrice: body.preorderPrice ?? '',
    checkoutUrl: body.checkoutUrl ?? '',
    privateMp3Path: body.privateMp3Path ?? '',
    privateVideoPath: body.privateVideoPath ?? '',
    active: !!body.active,
  };

  try {
    const { single, error } = await createSingle(input);
    if (!single) {
      return NextResponse.json({ error: error ?? 'Konnte nicht anlegen.' }, { status: 409 });
    }
    return NextResponse.json(single, { status: 201 });
  } catch (err) {
    console.error('[admin singles POST]', err);
    return NextResponse.json({ error: 'Interner Fehler beim Speichern.' }, { status: 500 });
  }
}
