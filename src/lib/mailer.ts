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

// ── Giveaway / Presave-Mail ─────────────────────────────────────────────────

const giveawayTranslations: Record<MailLang, {
  tagline: string;
  subject: (songTitle: string) => string;
  heading: string;
  body: (songTitle: string) => string;
  button: string;
  personalNote: string;
  closing: string;
  unsubscribeQuestion: string;
  unsubscribeLink: string;
}> = {
  de: {
    tagline: 'Presave & Gewinnspiel',
    subject: (songTitle) => `Dein Presave-Link für „${songTitle}" – Gewinnspiel-Teilnahme`,
    heading: 'Dein persönlicher Presave-Link',
    body: (songTitle) =>
      `Danke für dein Interesse an „${songTitle}"! Klick auf den Button unten, um den Song zu presaven — damit nimmst du automatisch am Gewinnspiel teil.`,
    button: '🎵 Jetzt presaven & teilnehmen',
    personalNote: 'Dieser Link ist persönlich für dich – bitte nicht weitergeben.',
    closing: 'Herzliche Grüße,',
    unsubscribeQuestion: 'Keine weiteren Update-Mails erhalten?',
    unsubscribeLink: 'Hier abmelden',
  },
  en: {
    tagline: 'Presave & Giveaway',
    subject: (songTitle) => `Your presave link for "${songTitle}" – giveaway entry`,
    heading: 'Your personal presave link',
    body: (songTitle) =>
      `Thanks for your interest in "${songTitle}"! Click the button below to presave the song — that automatically enters you into the giveaway.`,
    button: '🎵 Presave now & enter',
    personalNote: 'This link is personal to you – please don’t share it.',
    closing: 'Best regards,',
    unsubscribeQuestion: 'Don’t want any more update emails?',
    unsubscribeLink: 'Unsubscribe here',
  },
  pl: {
    tagline: 'Presave i konkurs',
    subject: (songTitle) => `Twój link presave dla „${songTitle}" – udział w konkursie`,
    heading: 'Twój osobisty link presave',
    body: (songTitle) =>
      `Dzięki za zainteresowanie „${songTitle}"! Kliknij poniższy przycisk, aby dodać utwór do presave — automatycznie bierzesz udział w konkursie.`,
    button: '🎵 Presave i weź udział',
    personalNote: 'Ten link jest przypisany tylko do Ciebie – prosimy nim się nie dzielić.',
    closing: 'Pozdrawiam serdecznie,',
    unsubscribeQuestion: 'Nie chcesz więcej otrzymywać e-maili z aktualnościami?',
    unsubscribeLink: 'Wypisz się tutaj',
  },
};

export async function sendGiveawayEmail(
  email: string,
  songTitle: string,
  giveawayLink: string,
  origin: string,
  lang?: string
): Promise<void> {
  const t = giveawayTranslations[normalizeMailLang(lang)];
  const unsubscribeLink = `${origin}/abmelden`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
        <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
        <p style="margin: 5px 0 0; color: #888; font-size: 14px;">${t.tagline}</p>
      </div>
      <div style="padding: 30px 0;">
        <h2 style="color: #111; margin-top: 0;">${t.heading}</h2>
        <p style="line-height: 1.6; color: #555;">
          ${t.body(songTitle)}
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${giveawayLink}" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; padding: 14px 28px; border-radius: 999px; text-decoration: none;">
            ${t.button}
          </a>
        </div>
        <p style="line-height: 1.6; color: #555; font-size: 13px;">
          ${t.personalNote}
        </p>
        <p style="line-height: 1.6; color: #555;">
          ${t.closing}<br/>
          <strong>Dawid Faith</strong>
        </p>
      </div>
      <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
        <p style="margin: 0 0 6px;">© ${new Date().getFullYear()} Dawid Faith</p>
        <p style="margin: 0;">
          ${t.unsubscribeQuestion}
          <a href="${unsubscribeLink}" style="color: #aaa; text-decoration: underline;">${t.unsubscribeLink}</a>
        </p>
      </div>
    </div>
  `;

  const text = `${t.body(songTitle)}\n\n${giveawayLink}\n\n${t.personalNote}\n\n${t.closing}\nDawid Faith\n\n---\n${t.unsubscribeQuestion} ${t.unsubscribeLink}: ${unsubscribeLink}`;

  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: t.subject(songTitle),
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeLink}>, <mailto:${NOTIFY_TO}?subject=Abmelden>`,
    },
  });
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
