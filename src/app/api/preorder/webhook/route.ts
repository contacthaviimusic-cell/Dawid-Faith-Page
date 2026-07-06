import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getSingle } from '@/lib/singlesStore';
import { createOrder, findOrderByProviderId, markDelivered } from '@/lib/ordersStore';
import { sendPreorderEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

const SIGNATURE_TOLERANCE_SECONDS = 300;

// Stripe-Webhook: Header 'Stripe-Signature' = "t=<timestamp>,v1=<hex-hmac>[,v1=…]",
// Signatur = HMAC-SHA256 über "<timestamp>.<roher Body>" mit STRIPE_WEBHOOK_SECRET.
function verifyStripeSignature(rawBody: string, header: string, secret: string): boolean {
  let timestamp = '';
  const signatures: string[] = [];
  for (const part of header.split(',')) {
    const [key, value] = part.split('=', 2);
    if (key === 't') timestamp = value ?? '';
    if (key === 'v1' && value) signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;

  // Replay-Schutz: zu alte Signaturen ablehnen.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');
  const expectedBuf = Buffer.from(expected, 'utf8');

  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8');
    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(expectedBuf, sigBuf);
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook nicht konfiguriert.' }, { status: 503 });
  }

  // Roher Body wird für die Signaturprüfung benötigt – erst danach parsen.
  const rawBody = await request.text();
  const signatureHeader = request.headers.get('stripe-signature') ?? '';
  if (!signatureHeader || !verifyStripeSignature(rawBody, signatureHeader, secret)) {
    return NextResponse.json({ error: 'Ungültige Signatur.' }, { status: 401 });
  }

  let event: {
    type?: string;
    data?: {
      object?: {
        id?: string;
        client_reference_id?: string | null;
        payment_status?: string;
        customer_details?: { email?: string | null } | null;
      };
    };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Ungültiger Payload.' }, { status: 400 });
  }

  const session = event.data?.object;
  const isPaidNow =
    (event.type === 'checkout.session.completed' && session?.payment_status === 'paid') ||
    event.type === 'checkout.session.async_payment_succeeded';

  if (!isPaidNow) {
    // Andere Events bestätigen, damit Stripe nicht erneut zustellt.
    return NextResponse.json({ ok: true, skipped: event.type ?? 'unknown' });
  }

  // songId kommt über den Payment-Link-Query-Parameter client_reference_id.
  const songId = session?.client_reference_id ?? '';
  const email = session?.customer_details?.email ?? '';
  const sessionId = String(session?.id ?? '');

  if (!songId || !email || !sessionId) {
    console.error('[preorder webhook] Fehlende Daten:', { songId, email, sessionId });
    return NextResponse.json({ error: 'Fehlende Bestelldaten.' }, { status: 400 });
  }

  try {
    // Idempotenz: Stripe kann Webhooks mehrfach zustellen.
    const existing = await findOrderByProviderId(sessionId);
    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const song = await getSingle(songId);
    if (!song) {
      // Konfigurationsfehler – loggen, aber 200 zurückgeben, damit Stripe nicht endlos retried.
      console.error(`[preorder webhook] Unbekannte Song-ID: ${songId} (Session ${sessionId})`);
      return NextResponse.json({ ok: false, error: 'Unbekannte Song-ID.' });
    }

    const order = await createOrder(songId, email, sessionId);

    const origin = new URL(request.url).origin;
    const mp3Url = `${origin}/api/preorder/download/${order.downloadToken}?file=mp3`;
    const videoUrl = `${origin}/api/preorder/download/${order.downloadToken}?file=video`;

    await sendPreorderEmail(email, song, mp3Url, videoUrl);
    await markDelivered(order.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[preorder webhook]', err);
    // 500 → Stripe versucht die Zustellung erneut.
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
