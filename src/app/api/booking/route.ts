import { NextRequest, NextResponse } from 'next/server';
import { createMailTransporter, sendBookingConfirmationEmail } from '@/lib/mailer';

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

    const transporter = createMailTransporter();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          Neue Booking Anfrage
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #666; width: 160px;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #666;">E-Mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #666;">Veranstaltung:</td>
            <td style="padding: 8px 0;">${eventType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #666;">Datum:</td>
            <td style="padding: 8px 0;">${date || 'Nicht angegeben'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #666;">Ort / Venue:</td>
            <td style="padding: 8px 0;">${location || 'Nicht angegeben'}</td>
          </tr>
        </table>
        ${message ? `
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-left: 3px solid #f59e0b;">
            <p style="font-weight: bold; color: #666; margin: 0 0 8px 0;">Nachricht:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        ` : ''}
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
          Gesendet über die Dawid Faith Booking-Seite
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Dawid Faith Booking" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Booking Anfrage: ${eventType} – ${name}`,
      html: htmlContent,
    });

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
