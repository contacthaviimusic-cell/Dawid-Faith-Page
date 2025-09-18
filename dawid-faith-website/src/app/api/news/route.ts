import { NextResponse } from 'next/server';
import { createNews, getAllNews } from '@/lib/newsStore';
import { isAdminAuthenticated } from '@/lib/adminSession';

export async function GET() {
  const items = await getAllNews();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const item = await createNews(body);
  return NextResponse.json(item, { status: 201 });
}
