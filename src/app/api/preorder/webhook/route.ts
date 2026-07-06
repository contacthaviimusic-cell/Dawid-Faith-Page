import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getSingle } from '@/lib/singlesStore';
import { createOrder, findOrderByLemonId, markDelivered } from '@/lib/ordersStore';
import { sendPreorderEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

// Lemon-Squeezy-Webhook: Signatur = HMAC-SHA256 über den rohen Body,
// Header 'X-Signature', Secret aus dem LS-Dashboard.
function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const digestBuf = Buffer.from(digest, 'utf8');
  const signatureBuf = Buffer.from(signature, 'utf8');
  if (digestBuf.length !== signatureBuf.length) return false;
  return crypto.timingSafeEqual(digestBuf, signatureBuf);
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook nicht konfiguriert.' }, { status: 503 });
  }

  // Roher Body wird für die Signaturprüfung benötigt – erst danach parsen.
  const rawBody = await request.text();
  const signature = request.headers.get('x-signature') ?? '';
  if (!signature || !verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Ungültige Signatur.' }, { status: 401 });
  }

  let payload: {
    meta?: { event_name?: string; custom_data?: { songId?: string } };
    data?: { id?: string | number; attributes?: { user_email?: string } };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Ungültiger Payload.' }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  if (eventName !== 'order_created') {
    // Andere Events bestätigen, damit Lemon Squeezy nicht erneut zustellt.
    return NextResponse.json({ ok: true, skipped: eventName ?? 'unknown' });
  }

  const songId = payload.meta?.custom_data?.songId;
  const email = payload.data?.attributes?.user_email;
  const lemonOrderId = String(payload.data?.id ?? '');

  if (!songId || !email || !lemonOrderId) {
    console.error('[preorder webhook] Fehlende Daten:', { songId, email, lemonOrderId });
    return NextResponse.json({ error: 'Fehlende Bestelldaten.' }, { status: 400 });
  }

  try {
    // Idempotenz: Lemon Squeezy kann Webhooks mehrfach zustellen.
    const existing = await findOrderByLemonId(lemonOrderId);
    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const song = await getSingle(songId);
    if (!song) {
      // Konfigurationsfehler – loggen, aber 200 zurückgeben, damit LS nicht endlos retried.
      console.error(`[preorder webhook] Unbekannte Song-ID: ${songId} (Order ${lemonOrderId})`);
      return NextResponse.json({ ok: false, error: 'Unbekannte Song-ID.' });
    }

    const order = await createOrder(songId, email, lemonOrderId);

    const origin = new URL(request.url).origin;
    const mp3Url = `${origin}/api/preorder/download/${order.downloadToken}?file=mp3`;
    const videoUrl = `${origin}/api/preorder/download/${order.downloadToken}?file=video`;

    await sendPreorderEmail(email, song, mp3Url, videoUrl);
    await markDelivered(order.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[preorder webhook]', err);
    // 500 → Lemon Squeezy versucht die Zustellung erneut.
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
