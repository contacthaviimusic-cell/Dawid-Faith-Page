// Testet die Stripe-Webhook-Route lokal mit einem manuell signierten Payload
// (Header 'Stripe-Signature': t=<timestamp>,v1=<hex-HMAC-SHA256 über "t.body">).
// Nutzung:
//   1. Dev-Server starten mit gesetztem Secret:
//        STRIPE_WEBHOOK_SECRET=test-secret npm run dev
//   2. In zweitem Terminal:
//        node scripts/test-preorder-webhook.mjs
// Optional: WEBHOOK_URL / WEBHOOK_SECRET / EVENT_TYPE als Env-Vars überschreiben.

import crypto from 'node:crypto';

const url = process.env.WEBHOOK_URL ?? 'http://127.0.0.1:3000/api/preorder/webhook';
const secret = process.env.WEBHOOK_SECRET ?? 'test-secret';
const eventType = process.env.EVENT_TYPE ?? 'checkout.session.completed';

const payload = JSON.stringify({
  type: eventType,
  data: {
    object: {
      id: `cs_test_${Date.now()}`,
      client_reference_id: process.env.SONG_ID ?? 'katze',
      payment_status: 'paid',
      customer_details: { email: process.env.TEST_EMAIL ?? 'test@example.com' },
    },
  },
});

function stripeSignature(body, whSecret, timestamp = Math.floor(Date.now() / 1000)) {
  const sig = crypto
    .createHmac('sha256', whSecret)
    .update(`${timestamp}.${body}`)
    .digest('hex');
  return `t=${timestamp},v1=${sig}`;
}

// 1) Gültige Signatur
const okRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Stripe-Signature': stripeSignature(payload, secret) },
  body: payload,
});
console.log(`[gültige Signatur]    Status ${okRes.status}:`, await okRes.text());

// 2) Falsches Secret → muss 401 sein
const badRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Stripe-Signature': stripeSignature(payload, 'falsches-secret') },
  body: payload,
});
console.log(`[falsches Secret]     Status ${badRes.status}:`, await badRes.text());

// 3) Abgelaufener Timestamp (Replay) → muss 401 sein
const oldRes = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Stripe-Signature': stripeSignature(payload, secret, Math.floor(Date.now() / 1000) - 3600),
  },
  body: payload,
});
console.log(`[alter Timestamp]     Status ${oldRes.status}:`, await oldRes.text());

// 4) Fehlender Header → muss 401 sein
const noSigRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: payload,
});
console.log(`[ohne Signatur]       Status ${noSigRes.status}:`, await noSigRes.text());
