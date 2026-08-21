import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { sendNewsletterBroadcast } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

// Versendet die Broadcast-Mail an EINEN Empfänger pro Aufruf. Der Versand an
// die ganze Liste läuft als Schleife von außen (Admin-UI oder Skript), damit
// ein einzelner Serverless-Request nicht bei vielen Empfängern ins Timeout
// läuft und der Fortschritt jederzeit sichtbar/steuerbar bleibt.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { to, subject, bodyHtml, bodyText } = body;

  if (!to || typeof to !== 'string') {
    return NextResponse.json({ error: 'to fehlt.' }, { status: 400 });
  }
  if (!subject || !bodyHtml || !bodyText) {
    return NextResponse.json({ error: 'subject, bodyHtml und bodyText sind erforderlich.' }, { status: 400 });
  }

  const origin = new URL(request.url).origin;

  try {
    await sendNewsletterBroadcast(to, subject, bodyHtml, bodyText, origin);
    return NextResponse.json({ success: true, to });
  } catch (err) {
    console.error('[admin newsletter send]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Versand fehlgeschlagen.' },
      { status: 500 }
    );
  }
}
