import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { expectedAdminCookie } from '@/lib/adminSession';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));
  const ok = password && process.env.ADMIN_SECRET && password === process.env.ADMIN_SECRET;
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cookieStore = await cookies();
  cookieStore.set('df_admin', expectedAdminCookie(), {
    httpOnly: true,
    sameSite: 'lax',
    // In Entwicklung (http://localhost) darf secure nicht true sein, sonst wird das Cookie nicht gesetzt
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return NextResponse.json({ success: true });
}
