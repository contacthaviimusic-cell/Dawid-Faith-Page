import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllRecipients, addRecipients } from '@/lib/campaignStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const recipients = await getAllRecipients();
    return NextResponse.json(recipients);
  } catch (err) {
    console.error('[admin campaign recipients GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { emails, source, note } = body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json({ error: 'Keine E-Mail-Adressen angegeben.' }, { status: 400 });
  }
  if (!source || typeof source !== 'string') {
    return NextResponse.json({ error: 'Quelle fehlt.' }, { status: 400 });
  }

  try {
    const { added, skipped } = await addRecipients(emails, source, note ?? '');
    return NextResponse.json({ added, skipped });
  } catch (err) {
    console.error('[admin campaign recipients POST]', err);
    return NextResponse.json({ error: 'Interner Fehler beim Speichern.' }, { status: 500 });
  }
}
