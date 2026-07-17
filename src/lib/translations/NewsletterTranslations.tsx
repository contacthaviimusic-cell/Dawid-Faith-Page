export type LangKey = 'de' | 'en' | 'pl';

export const NewsletterTranslations: Record<LangKey, {
  newsletterTitle: string;
  newsletterDesc: string;
  subscribeSuccess: string;
  subscribeError: string;
  alreadySubscribed: string;
  emailPlaceholder: string;
  locationPlaceholder: string;
  locationHint: string;
  subscribeLabel: string;
  subscribingLabel: string;
  ticketButtonScroll: string;
}> = {
  de: {
    newsletterTitle: 'Newsletter abonnieren',
    newsletterDesc: 'Erhalte Updates zu neuen Konzerten, Songs und besonderen Events direkt in dein Postfach.',
    subscribeSuccess: '✅ Erfolgreich angemeldet! Danke für dein Interesse.',
    subscribeError: '❌ Fehler bei der Anmeldung. Bitte versuche es erneut.',
    alreadySubscribed: 'ℹ️ Diese E-Mail-Adresse ist bereits angemeldet.',
    emailPlaceholder: 'deine@email.de',
    locationPlaceholder: 'Dein Wohnort',
    locationHint: 'Damit ich weiß, in welchen Städten ich als Nächstes Konzerte spielen sollte.',
    subscribeLabel: 'Anmelden',
    subscribingLabel: 'Anmelden...',
    ticketButtonScroll: 'D.FAITH Token erhalten',
  },
  en: {
    newsletterTitle: 'Subscribe to newsletter',
    newsletterDesc: 'Get updates about new concerts, songs and special events directly to your inbox.',
    subscribeSuccess: '✅ Successfully subscribed! Thanks for your interest.',
    subscribeError: '❌ Error during subscription. Please try again.',
    alreadySubscribed: 'ℹ️ This email address is already subscribed.',
    emailPlaceholder: 'your@email.com',
    locationPlaceholder: 'Your city',
    locationHint: "So I know which cities to play concerts in next.",
    subscribeLabel: 'Subscribe',
    subscribingLabel: 'Subscribing...',
    ticketButtonScroll: 'Get D.FAITH tokens',
  },
  pl: {
    newsletterTitle: 'Subskrybuj newsletter',
    newsletterDesc: 'Otrzymuj aktualizacje o nowych koncertach, utworach i specjalnych wydarzeniach bezpośrednio na swoją skrzynkę.',
    subscribeSuccess: '✅ Pomyślnie zapisano! Dziękujemy za zainteresowanie.',
    subscribeError: '❌ Błąd podczas zapisu. Proszę spróbuj ponownie.',
    alreadySubscribed: 'ℹ️ Ten adres email jest już zapisany.',
    emailPlaceholder: 'twój@email.pl',
    locationPlaceholder: 'Twoja miejscowość',
    locationHint: 'Dzięki temu wiem, w jakich miastach zagrać kolejne koncerty.',
    subscribeLabel: 'Zapisz się',
    subscribingLabel: 'Zapisywanie...',
    ticketButtonScroll: 'Otrzymaj tokeny D.FAITH',
  }
};

export default NewsletterTranslations;