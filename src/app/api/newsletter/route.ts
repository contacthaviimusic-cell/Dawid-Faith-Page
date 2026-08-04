import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { getNewsletterSubscribers, createSubscriber, deleteSubscriberByEmail } from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const subscribers = await getNewsletterSubscribers();
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, location, lang } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    if (!location || typeof location !== 'string' || !location.trim()) {
      return NextResponse.json(
        { error: 'Wohnort ist erforderlich' },
        { status: 400 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const subscriberLang = lang === 'en' || lang === 'pl' ? lang : 'de';

    const { subscriber, error } = await createSubscriber(email, location, ipAddress, userAgent, subscriberLang);
    if (!subscriber) {
      return NextResponse.json({ error: error ?? 'Fehler bei der Anmeldung' }, { status: 409 });
    }

    return NextResponse.json(
      {
        message: 'Erfolgreich für den Newsletter angemeldet!',
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/newsletter:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Newsletter-Anmeldung', debug: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    const ok = await deleteSubscriberByEmail(email);
    if (!ok) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Newsletter-Abonnement erfolgreich entfernt' }
    );
  } catch (error) {
    console.error('Error removing newsletter subscriber:', error);
    return NextResponse.json(
      { error: 'Fehler beim Entfernen des Newsletter-Abonnements' },
      { status: 500 }
    );
  }
}
