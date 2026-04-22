import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getAllOutreach, createOutreach } from '@/lib/outreachStore';

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const entries = await getAllOutreach();
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { label, sentTo, note } = body;

  if (!label || !sentTo) {
    return NextResponse.json(
      { error: 'Label und E-Mail sind Pflichtfelder.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sentTo)) {
    return NextResponse.json(
      { error: 'Ungültige E-Mail-Adresse.' },
      { status: 400 }
    );
  }

  const entry = await createOutreach(label, sentTo, note ?? '');
  return NextResponse.json(entry, { status: 201 });
}
