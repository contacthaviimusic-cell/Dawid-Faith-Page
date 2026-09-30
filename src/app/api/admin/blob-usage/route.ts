import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { isAdminAuthenticated } from '@/lib/adminSession';

// Listet alle Dateien im Vercel-Blob-Store mit Größe auf, damit sich bei
// Speicherplatz-Problemen (z.B. Hobby-Plan-Limit überschritten) erkennen
// lässt, was den Speicher füllt – v.a. verwaiste alte Uploads (jeder
// Datei-Upload erzeugt einen neuen Pfad mit Zeitstempel, alte Versionen
// werden nie automatisch gelöscht) und Backup-JSONs.
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const all: { pathname: string; url: string; size: number; uploadedAt: string }[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ cursor, limit: 1000 });
      for (const b of page.blobs) {
        all.push({ pathname: b.pathname, url: b.url, size: b.size, uploadedAt: b.uploadedAt.toString() });
      }
      cursor = page.cursor;
    } while (cursor);

    all.sort((a, b) => b.size - a.size);
    const totalBytes = all.reduce((sum, b) => sum + b.size, 0);

    return NextResponse.json({
      count: all.length,
      totalBytes,
      totalMB: Math.round((totalBytes / 1024 / 1024) * 100) / 100,
      files: all,
    });
  } catch (err) {
    console.error('[admin blob-usage]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Interner Fehler.' },
      { status: 500 }
    );
  }
}
