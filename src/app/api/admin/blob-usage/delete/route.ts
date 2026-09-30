import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { isAdminAuthenticated } from '@/lib/adminSession';

// Löscht gezielt einzelne Blob-Dateien (per URL), um Speicherplatz
// freizugeben – z.B. verwaiste alte Upload-Versionen oder Backup-JSONs.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const urls: unknown = body.urls;
  if (!Array.isArray(urls) || urls.length === 0 || !urls.every((u) => typeof u === 'string')) {
    return NextResponse.json({ error: 'urls (string[]) ist erforderlich.' }, { status: 400 });
  }

  try {
    await del(urls as string[]);
    return NextResponse.json({ success: true, deleted: urls.length });
  } catch (err) {
    console.error('[admin blob-usage delete]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Interner Fehler.' },
      { status: 500 }
    );
  }
}
