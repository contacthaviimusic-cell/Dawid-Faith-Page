import { NextRequest, NextResponse } from 'next/server';
import { createMailTransporter } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, eventType, date, location, message } = body;

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

    // Bestätigungsmail an den Absender
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
          <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
          <p style="margin: 5px 0 0; color: #888; font-size: 14px;">Singer-Songwriter</p>
        </div>
        <div style="padding: 30px 0;">
          <h2 style="color: #111; margin-top: 0;">Hallo ${name},</h2>
          <p style="line-height: 1.6; color: #555;">
            vielen Dank für Ihre Booking-Anfrage! Ich habe Ihre Nachricht erhalten und melde mich schnellstmöglich bei Ihnen.
          </p>
          <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-weight: bold; color: #666; margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Ihre Anfrage im Überblick:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #888; width: 140px;">Veranstaltung:</td>
                <td style="padding: 6px 0; color: #333; font-weight: bold;">${eventType}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #888;">Datum:</td>
                <td style="padding: 6px 0; color: #333;">${date || 'Noch offen'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #888;">Ort:</td>
                <td style="padding: 6px 0; color: #333;">${location || 'Noch offen'}</td>
              </tr>
            </table>
          </div>
          <p style="line-height: 1.6; color: #555;">
            Falls Sie in der Zwischenzeit Fragen haben, können Sie mich jederzeit per E-Mail oder telefonisch erreichen.
          </p>
          <p style="line-height: 1.6; color: #555;">
            Herzliche Grüße,<br/>
            <strong>Dawid Faith</strong>
          </p>
        </div>
        <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
          <p style="margin: 0;">dawid.faith@gmail.com · +49 152 3767 3661</p>
          <p style="margin: 5px 0 0;">© 2026 Dawid Faith</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Dawid Faith" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Ihre Booking-Anfrage bei Dawid Faith – Bestätigung`,
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json(
      { error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
