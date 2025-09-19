import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true });
}
