import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { sendCampaignEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

const BATCH_SIZE = 5;
const DELAY_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Versendet eine Kampagnen-Mail in kleinen Batches, damit eine einzelne Anfrage
// nicht am Vercel-Function-Timeout scheitert. Der Client ruft diese Route
// wiederholt mit steigendem 'offset' auf, bis 'done: true' zurückkommt.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { subject, text, emails, offset } = body;

  if (!subject || typeof subject !== 'string') {
    return NextResponse.json({ error: 'Betreff fehlt.' }, { status: 400 });
  }
  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Text fehlt.' }, { status: 400 });
  }
  if (!Array.isArray(emails)) {
    return NextResponse.json({ error: 'Empfängerliste fehlt.' }, { status: 400 });
  }

  const start = typeof offset === 'number' && offset >= 0 ? offset : 0;
  const batch = emails.slice(start, start + BATCH_SIZE);

  const failed: string[] = [];
  for (let i = 0; i < batch.length; i++) {
    try {
      await sendCampaignEmail(batch[i], subject, text);
    } catch (err) {
      console.error('[campaign send]', batch[i], err);
      failed.push(batch[i]);
    }
    if (i < batch.length - 1) await sleep(DELAY_MS);
  }

  const nextOffset = start + batch.length;
  const done = nextOffset >= emails.length;

  return NextResponse.json({
    sent: batch.length - failed.length,
    failed,
    nextOffset,
    total: emails.length,
    done,
  });
}
