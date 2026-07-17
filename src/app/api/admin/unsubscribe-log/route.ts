import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllUnsubscribeLog } from '@/lib/unsubscribeLogStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const entries = await getAllUnsubscribeLog();
    return NextResponse.json(entries);
  } catch (err) {
    console.error('[admin unsubscribe-log GET]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
