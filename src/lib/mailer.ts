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

// ── Giveaway / Presave-Bestätigungsmail ─────────────────────────────────────
// Die Teilnahme wird jetzt direkt beim Absenden des Formulars auf der Seite
// bestätigt (kein Klick auf einen zugeschickten Link mehr nötig) – diese Mail
// ist daher nur noch eine reine Bestätigung, ohne Action-Button.

const giveawayTranslations: Record<MailLang, {
  tagline: string;
  subject: (songTitle: string) => string;
  heading: string;
  body: (songTitle: string) => string;
  closing: string;
  unsubscribeQuestion: string;
  unsubscribeLink: string;
}> = {
  de: {
    tagline: 'Presave & Gewinnspiel',
    subject: (songTitle) => `Du bist dabei! Gewinnspiel-Teilnahme für „${songTitle}" bestätigt`,
    heading: 'Deine Teilnahme ist bestätigt',
    body: (songTitle) =>
      `Danke für dein Interesse an „${songTitle}"! Du nimmst jetzt automatisch am Gewinnspiel teil. Falls du gewinnst, melden wir uns per E-Mail bei dir.`,
    closing: 'Herzliche Grüße,',
    unsubscribeQuestion: 'Keine weiteren Update-Mails erhalten?',
    unsubscribeLink: 'Hier abmelden',
  },
  en: {
    tagline: 'Presave & Giveaway',
    subject: (songTitle) => `You're in! Giveaway entry for "${songTitle}" confirmed`,
    heading: 'Your entry is confirmed',
    body: (songTitle) =>
      `Thanks for your interest in "${songTitle}"! You're now automatically entered into the giveaway. If you win, we'll reach out by email.`,
    closing: 'Best regards,',
    unsubscribeQuestion: 'Don’t want any more update emails?',
    unsubscribeLink: 'Unsubscribe here',
  },
  pl: {
    tagline: 'Presave i konkurs',
    subject: (songTitle) => `Jesteś w grze! Udział w konkursie dla „${songTitle}" potwierdzony`,
    heading: 'Twój udział jest potwierdzony',
    body: (songTitle) =>
      `Dzięki za zainteresowanie „${songTitle}"! Automatycznie bierzesz teraz udział w konkursie. Jeśli wygrasz, odezwiemy się mailowo.`,
    closing: 'Pozdrawiam serdecznie,',
    unsubscribeQuestion: 'Nie chcesz więcej otrzymywać e-maili z aktualnościami?',
    unsubscribeLink: 'Wypisz się tutaj',
  },
};

export async function sendGiveawayConfirmationEmail(
  email: string,
  songTitle: string,
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

  const text = `${t.body(songTitle)}\n\n${t.closing}\nDawid Faith\n\n---\n${t.unsubscribeQuestion} ${t.unsubscribeLink}: ${unsubscribeLink}`;

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

// ── Gewinner-Mail ────────────────────────────────────────────────────────────
// Manuell im Admin-Panel ausgelöst (mit Vorschau vor dem Versand), nicht
// automatisch. Eine Person kann pro Song bis zu zwei Preise gewinnen
// (Song-NFT + zusätzlich Mythic-NFT), bekommt dafür aber nur eine
// gemeinsame Mail statt mehrerer.

export type WinnerPrizeType = 'mythic' | 'song-nft';

const APP_URL = 'https://app.dawidfaith.de';

const winnerTranslations: Record<MailLang, {
  tagline: string;
  subject: (songTitle: string) => string;
  heading: string;
  intro: (songTitle: string) => string;
  prizeMythic: string;
  prizeSongNft: string;
  mythicFact: string;
  marketplaceNote: string;
  claimInstructions: string;
  ctaButton: string;
  closing: string;
}> = {
  de: {
    tagline: 'Presave & Gewinnspiel',
    subject: (songTitle) => `🎉 Du hast beim „${songTitle}"-Gewinnspiel gewonnen!`,
    heading: 'Herzlichen Glückwunsch!',
    intro: (songTitle) => `Du hast beim Presave-Gewinnspiel zu „${songTitle}" gewonnen:`,
    prizeMythic: '🏆 1× Mythic-NFT aus den D.FAITH Collectibles',
    prizeSongNft: '🎵 1× limitiertes Song-NFT',
    mythicFact:
      '🏆 Wusstest du schon? Der Mythic-NFT ist die höchste und seltenste Stufe der D.FAITH Collectibles – er erhöht die Belohnungen, die du beim Erfüllen von Social-Media-Quests in der D.FAITH Webapp erhältst.',
    marketplaceNote:
      '💡 Gut zu wissen: Deine NFTs sind nicht nur Sammlerstücke – du kannst sie jederzeit auf allen gängigen NFT-Marktplätzen weiterverkaufen. Gleichzeitig dienen sie dir als Schlüssel für exklusiven Zugang und Vergünstigungen, die es künftig in der D.FAITH Webapp geben wird.',
    claimInstructions:
      'Dein Gewinn wird automatisch deiner Wallet gutgeschrieben, sobald du dich mit dieser E-Mail-Adresse in der D.FAITH-Webapp registrierst – eine Antwort auf diese E-Mail ist nicht nötig. Registrierst du dich nicht innerhalb von 14 Tagen, verfällt der Gewinnanspruch leider gemäß unseren Teilnahmebedingungen.',
    ctaButton: 'Jetzt registrieren',
    closing: 'Herzliche Glückwünsche,',
  },
  en: {
    tagline: 'Presave & Giveaway',
    subject: (songTitle) => `🎉 You won the "${songTitle}" giveaway!`,
    heading: 'Congratulations!',
    intro: (songTitle) => `You won the following in the presave giveaway for "${songTitle}":`,
    prizeMythic: '🏆 1× Mythic NFT from the D.FAITH Collectibles',
    prizeSongNft: '🎵 1× limited Song NFT',
    mythicFact:
      '🏆 Did you know? The Mythic NFT is the highest and rarest tier of the D.FAITH Collectibles – it increases the rewards you get for completing social media quests in the D.FAITH webapp.',
    marketplaceNote:
      '💡 Good to know: Your NFTs aren’t just collectibles – you can resell them anytime on all major NFT marketplaces. At the same time, they’re your key to exclusive access and perks that will be introduced in the D.FAITH webapp in the future.',
    claimInstructions:
      'Your prize is credited to your wallet automatically as soon as you register in the D.FAITH webapp with this email address – no reply to this email is needed. If you don’t register within 14 days, the prize will unfortunately be forfeited per our terms & conditions.',
    ctaButton: 'Register now',
    closing: 'Congratulations again,',
  },
  pl: {
    tagline: 'Presave i konkurs',
    subject: (songTitle) => `🎉 Wygrałeś/aś konkurs „${songTitle}"!`,
    heading: 'Gratulacje!',
    intro: (songTitle) => `Wygrałeś/aś w konkursie presave dla „${songTitle}":`,
    prizeMythic: '🏆 1× Mythic NFT z kolekcji D.FAITH Collectibles',
    prizeSongNft: '🎵 1× limitowane Song NFT',
    mythicFact:
      '🏆 Czy wiesz, że? Mythic NFT to najwyższy i najrzadszy poziom kolekcji D.FAITH Collectibles – zwiększa nagrody, które otrzymujesz za wykonywanie questów w mediach społecznościowych w aplikacji D.FAITH.',
    marketplaceNote:
      '💡 Warto wiedzieć: Twoje NFT to nie tylko przedmioty kolekcjonerskie – możesz je w każdej chwili odsprzedać na wszystkich popularnych rynkach NFT. Jednocześnie stanowią Twój klucz do ekskluzywnego dostępu i korzyści, które pojawią się w przyszłości w aplikacji D.FAITH.',
    claimInstructions:
      'Twoja nagroda zostanie automatycznie przypisana do Twojego portfela, gdy tylko zarejestrujesz się w aplikacji D.FAITH przy użyciu tego adresu e-mail – nie musisz odpowiadać na tego maila. Jeśli nie zarejestrujesz się w ciągu 14 dni, nagroda niestety przepadnie zgodnie z regulaminem konkursu.',
    ctaButton: 'Zarejestruj się teraz',
    closing: 'Jeszcze raz gratulacje,',
  },
};

export function renderGiveawayWinnerEmail(
  songTitle: string,
  prizeTypes: WinnerPrizeType[],
  lang?: string
): { subject: string; html: string; text: string } {
  const t = winnerTranslations[normalizeMailLang(lang)];
  const prizeLines = prizeTypes.map((p) => (p === 'mythic' ? t.prizeMythic : t.prizeSongNft));
  const hasMythic = prizeTypes.includes('mythic');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
        <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
        <p style="margin: 5px 0 0; color: #888; font-size: 14px;">${t.tagline}</p>
      </div>
      <div style="padding: 30px 0;">
        <h2 style="color: #111; margin-top: 0;">${t.heading}</h2>
        <p style="line-height: 1.6; color: #555;">${t.intro(songTitle)}</p>
        <ul style="line-height: 1.8; color: #333; font-weight: bold; padding-left: 20px;">
          ${prizeLines.map((line) => `<li>${line}</li>`).join('')}
        </ul>
        ${hasMythic ? `
        <div style="background: #fff8ec; border: 1px solid #f5d9a8; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="line-height: 1.5; color: #7a4e00; margin: 0; font-size: 14px;">${t.mythicFact}</p>
        </div>` : ''}
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="line-height: 1.5; color: #555; margin: 0; font-size: 14px;">${t.marketplaceNote}</p>
        </div>
        <p style="line-height: 1.6; color: #555; margin-top: 20px;">
          ${t.claimInstructions}
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${APP_URL}" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; padding: 14px 28px; border-radius: 999px; text-decoration: none;">
            ${t.ctaButton}
          </a>
        </div>
        <p style="line-height: 1.6; color: #555;">
          ${t.closing}<br/>
          <strong>Dawid Faith</strong>
        </p>
      </div>
      <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Dawid Faith</p>
      </div>
    </div>
  `;

  const text = [
    t.intro(songTitle),
    '',
    prizeLines.map((l) => `- ${l}`).join('\n'),
    '',
    ...(hasMythic ? [t.mythicFact, ''] : []),
    t.marketplaceNote,
    '',
    t.claimInstructions,
    '',
    `${t.ctaButton}: ${APP_URL}`,
    '',
    t.closing,
    'Dawid Faith',
  ].join('\n');

  return { subject: t.subject(songTitle), html, text };
}

export async function sendGiveawayWinnerEmail(
  email: string,
  songTitle: string,
  prizeTypes: WinnerPrizeType[],
  lang?: string
): Promise<void> {
  const { subject, html, text } = renderGiveawayWinnerEmail(songTitle, prizeTypes, lang);
  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject,
    html,
    text,
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
