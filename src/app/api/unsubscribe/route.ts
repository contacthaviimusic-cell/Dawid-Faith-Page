import { NextRequest, NextResponse } from 'next/server';
import { deleteSubscriberByEmail } from '@/lib/newsletterStore';
import { unsubscribeByEmail as unsubscribeGiveawayByEmail } from '@/lib/giveawayStore';
import { logUnsubscribe } from '@/lib/unsubscribeLogStore';

export const dynamic = 'force-dynamic';

// Öffentlicher Self-Service-Endpunkt: nimmt eine E-Mail-Adresse entgegen und
// entfernt sie aus dem Newsletter sowie aus künftigen Update-Mails des
// Presave-Gewinnspiels. Kein Login nötig – das ist bewusst so, damit sich
// jeder ohne Hürden abmelden kann.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }

  try {
    const removedFromNewsletter = await deleteSubscriberByEmail(email);
    const unsubscribedGiveawayCount = await unsubscribeGiveawayByEmail(email);

    // Jede Anfrage protokollieren – auch wenn die Mail in keiner unserer Listen
    // steht (z. B. Fanbuch-Adressen, die nur manuell/außerhalb des Systems
    // gepflegt werden), damit sie manuell abgeglichen werden kann. Ein Fehler
    // hier darf die eigentliche Abmeldung nicht als fehlgeschlagen erscheinen lassen.
    try {
      await logUnsubscribe(email, removedFromNewsletter, unsubscribedGiveawayCount);
    } catch (logErr) {
      console.error('[unsubscribe] Protokollierung fehlgeschlagen:', logErr);
    }

    return NextResponse.json({
      success: true,
      removedFromNewsletter,
      unsubscribedGiveawayCount,
    });
  } catch (err) {
    console.error('[unsubscribe]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
