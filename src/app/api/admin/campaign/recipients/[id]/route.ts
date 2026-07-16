import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { deleteRecipient } from '@/lib/campaignStore';

export const dynamic = 'force-dynamic';

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
    const ok = await deleteRecipient(id);
    if (!ok) {
      return NextResponse.json({ error: 'Nicht gefunden.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin campaign recipients DELETE]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
