// Testet die Lemon-Squeezy-Webhook-Route lokal mit einem manuell signierten Payload.
// Nutzung:
//   1. Dev-Server starten mit gesetztem Secret:
//        LEMONSQUEEZY_WEBHOOK_SECRET=test-secret npm run dev
//   2. In zweitem Terminal:
//        node scripts/test-preorder-webhook.mjs
// Optional: WEBHOOK_URL / WEBHOOK_SECRET / EVENT_NAME als Env-Vars überschreiben.

import crypto from 'node:crypto';

const url = process.env.WEBHOOK_URL ?? 'http://localhost:3000/api/preorder/webhook';
const secret = process.env.WEBHOOK_SECRET ?? 'test-secret';
const eventName = process.env.EVENT_NAME ?? 'order_created';

const payload = JSON.stringify({
  meta: {
    event_name: eventName,
    custom_data: { songId: process.env.SONG_ID ?? 'katze' },
  },
  data: {
    id: `test-${Date.now()}`,
    attributes: { user_email: process.env.TEST_EMAIL ?? 'test@example.com' },
  },
});

const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

// 1) Gültige Signatur
const okRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Signature': signature },
  body: payload,
});
console.log(`[gültige Signatur]   Status ${okRes.status}:`, await okRes.text());

// 2) Ungültige Signatur → muss 401 sein
const badRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Signature': 'deadbeef'.repeat(8) },
  body: payload,
});
console.log(`[ungültige Signatur] Status ${badRes.status}:`, await badRes.text());

// 3) Fehlende Signatur → muss 401 sein
const noSigRes = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: payload,
});
console.log(`[ohne Signatur]      Status ${noSigRes.status}:`, await noSigRes.text());
