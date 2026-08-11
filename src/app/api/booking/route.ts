import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmationEmail, sendBookingNotificationEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, eventType, date, location, message, lang } = body;

    if (!name || !email || !eventType) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Veranstaltungstyp sind Pflichtfelder.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    // Interne Benachrichtigung an Dawid
    await sendBookingNotificationEmail(name, email, eventType, date, location, message);

    // Bestätigungsmail an den Absender, in der Sprache, in der die Anfrage gestellt wurde
    await sendBookingConfirmationEmail(name, email, eventType, date, location, lang);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json(
      { error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
