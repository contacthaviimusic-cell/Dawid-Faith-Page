import { Resend } from 'resend';

export type MailLang = 'de' | 'en' | 'pl';

const FROM_ADDRESS = 'Dawid Faith <noreply@dawidfaith.de>';
// Postfach, in dem Antworten & interne Benachrichtigungen landen sollen.
const NOTIFY_TO = process.env.GMAIL_USER || 'dawid.faith@gmail.com';

function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

function normalizeMailLang(lang: string | undefined | null): MailLang {
  return lang === 'en' || lang === 'pl' ? lang : 'de';
}

// ── Booking-Mails ────────────────────────────────────────────────────────────

const bookingTranslations: Record<MailLang, {
  tagline: string;
  subject: string;
  greeting: (name: string) => string;
  intro: string;
  overviewLabel: string;
  eventLabel: string;
  dateLabel: string;
  dateFallback: string;
  venueLabel: string;
  venueFallback: string;
  outro: string;
  closing: string;
}> = {
  de: {
    tagline: 'Singer-Songwriter',
    subject: 'Ihre Booking-Anfrage bei Dawid Faith – Bestätigung',
    greeting: (name) => `Hallo ${name},`,
    intro: 'vielen Dank für Ihre Booking-Anfrage! Ich habe Ihre Nachricht erhalten und melde mich schnellstmöglich bei Ihnen.',
    overviewLabel: 'Ihre Anfrage im Überblick:',
    eventLabel: 'Veranstaltung:',
    dateLabel: 'Datum:',
    dateFallback: 'Noch offen',
    venueLabel: 'Ort:',
    venueFallback: 'Noch offen',
    outro: 'Falls Sie in der Zwischenzeit Fragen haben, können Sie mich jederzeit per E-Mail oder telefonisch erreichen.',
    closing: 'Herzliche Grüße,',
  },
  en: {
    tagline: 'Singer-Songwriter',
    subject: 'Your booking request with Dawid Faith – confirmation',
    greeting: (name) => `Hello ${name},`,
    intro: 'thank you for your booking request! I’ve received your message and will get back to you as soon as possible.',
    overviewLabel: 'Your request at a glance:',
    eventLabel: 'Event:',
    dateLabel: 'Date:',
    dateFallback: 'Still open',
    venueLabel: 'Venue:',
    venueFallback: 'Still open',
    outro: 'If you have any questions in the meantime, feel free to reach me by email or phone anytime.',
    closing: 'Best regards,',
  },
  pl: {
    tagline: 'Singer-Songwriter',
    subject: 'Twoje zapytanie o rezerwację u Dawid Faith – potwierdzenie',
    greeting: (name) => `Cześć ${name},`,
    intro: 'dziękuję za zapytanie o rezerwację! Otrzymałem Twoją wiadomość i odezwę się najszybciej jak to możliwe.',
    overviewLabel: 'Podsumowanie Twojego zapytania:',
    eventLabel: 'Wydarzenie:',
    dateLabel: 'Data:',
    dateFallback: 'Jeszcze nieustalona',
    venueLabel: 'Miejsce:',
    venueFallback: 'Jeszcze nieustalone',
    outro: 'Jeśli w międzyczasie masz pytania, możesz się ze mną skontaktować mailowo lub telefonicznie.',
    closing: 'Pozdrawiam serdecznie,',
  },
};

export async function sendBookingConfirmationEmail(
  name: string,
  email: string,
  eventType: string,
  date: string,
  location: string,
  lang?: string
): Promise<void> {
  const t = bookingTranslations[normalizeMailLang(lang)];

  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
        <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
        <p style="margin: 5px 0 0; color: #888; font-size: 14px;">${t.tagline}</p>
      </div>
      <div style="padding: 30px 0;">
        <h2 style="color: #111; margin-top: 0;">${t.greeting(name)}</h2>
        <p style="line-height: 1.6; color: #555;">
          ${t.intro}
        </p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="font-weight: bold; color: #666; margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">${t.overviewLabel}</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #888; width: 140px;">${t.eventLabel}</td>
              <td style="padding: 6px 0; color: #333; font-weight: bold;">${eventType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888;">${t.dateLabel}</td>
              <td style="padding: 6px 0; color: #333;">${date || t.dateFallback}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888;">${t.venueLabel}</td>
              <td style="padding: 6px 0; color: #333;">${location || t.venueFallback}</td>
            </tr>
          </table>
        </div>
        <p style="line-height: 1.6; color: #555;">
          ${t.outro}
        </p>
        <p style="line-height: 1.6; color: #555;">
          ${t.closing}<br/>
          <strong>Dawid Faith</strong>
        </p>
      </div>
      <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
        <p style="margin: 0;">dawid.faith@gmail.com · +49 152 3767 3661</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Dawid Faith</p>
      </div>
    </div>
  `;

  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: email,
    replyTo: NOTIFY_TO,
    subject: t.subject,
    html: confirmationHtml,
  });
}

export async function sendBookingNotificationEmail(
  name: string,
  email: string,
  eventType: string,
  date: string,
  location: string,
  message: string
): Promise<void> {
  const html = `
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

  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_TO,
    replyTo: email,
    subject: `Booking Anfrage: ${eventType} – ${name}`,
    html,
  });
}

// ── Newsletter-Broadcast ─────────────────────────────────────────────────────

// Für Updates an die Newsletter-Liste (z. B. Release-Ankündigungen). bodyHtml
// ist der bereits fertig formatierte innere Inhalt (Absätze, Links, Listen),
// wird nur noch in den Marken-Rahmen inkl. Abmelde-Footer eingebettet.
export async function sendNewsletterBroadcast(
  email: string,
  subject: string,
  bodyHtml: string,
  bodyText: string,
  origin: string
): Promise<void> {
  const unsubscribeLink = `${origin}/abmelden`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
        <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
      </div>
      <div style="padding: 30px 0; line-height: 1.6; color: #333;">
        ${bodyHtml}
      </div>
      <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
        <p style="margin: 0 0 6px;">© ${new Date().getFullYear()} Dawid Faith</p>
        <p style="margin: 0;">
          Keine weiteren Update-Mails erhalten?
          <a href="${unsubscribeLink}" style="color: #aaa; text-decoration: underline;">Hier abmelden</a>
        </p>
      </div>
    </div>
  `;

  const text = `${bodyText}\n\n---\nKeine weiteren Update-Mails erhalten? Hier abmelden: ${unsubscribeLink}`;

  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject,
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeLink}>, <mailto:${NOTIFY_TO}?subject=Abmelden>`,
    },
  });
}
