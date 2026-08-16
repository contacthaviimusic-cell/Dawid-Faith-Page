import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { updateSingle, deleteSingle } from '@/lib/singlesStore';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!/^[\w-]+$/.test(id)) {
    return NextResponse.json({ error: 'Ungültige ID.' }, { status: 400 });
  }

  const body = await request.json();
  const patch: Record<string, unknown> = {};
  const stringFields = [
    'title',
    'coverImage',
    'teaserVideo',
    'audioReleaseDate',
    'videoReleaseDate',
    'presaveUrl',
    'discountCode',
    'preorderPrice',
    'bandcampUrl',
    'premiereVideoUrl',
    'premiereRevealHours',
  ] as const;
  for (const field of stringFields) {
    if (typeof body[field] === 'string') patch[field] = body[field];
  }
  if (typeof body.active === 'boolean') patch.active = body.active;

  try {
    const updated = await updateSingle(id, patch);
    if (!updated) {
      return NextResponse.json({ error: 'Single nicht gefunden.' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error('[admin singles PUT]', err);
    return NextResponse.json({ error: 'Interner Fehler beim Speichern.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!/^[\w-]+$/.test(id)) {
    return NextResponse.json({ error: 'Ungültige ID.' }, { status: 400 });
  }

  try {
    const ok = await deleteSingle(id);
    if (!ok) {
      return NextResponse.json({ error: 'Single nicht gefunden.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin singles DELETE]', err);
    return NextResponse.json({ error: 'Interner Fehler beim Löschen.' }, { status: 500 });
  }
}
