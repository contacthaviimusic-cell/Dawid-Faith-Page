import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { recordClick, deleteOutreach } from '@/lib/outreachStore';

// Called from booking page when ?ref= is present – no auth required
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Validate id format to prevent path traversal
  if (!/^[\w-]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  try {
    await recordClick(id);
  } catch (err) {
    console.error('[outreach click]', err);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const { ok, allEntries } = await deleteOutreach(id);
    if (!ok) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
    return NextResponse.json({ ok: true, entries: allEntries });
  } catch (err) {
    console.error('[outreach DELETE]', err);
    return NextResponse.json({ error: 'Interner Fehler beim Löschen.' }, { status: 500 });
  }
}
