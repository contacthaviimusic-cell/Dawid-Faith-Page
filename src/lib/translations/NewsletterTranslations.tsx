export type LangKey = 'de' | 'en' | 'pl';

export const NewsletterTranslations: Record<LangKey, {
  newsletterTitle: string;
  newsletterDesc: string;
  subscribeSuccess: string;
  subscribeError: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  subscribingLabel: string;
  ticketButtonScroll: string;
}> = {
  de: {
    newsletterTitle: 'Newsletter abonnieren',
    newsletterDesc: 'Erhalte Updates zu neuen Konzerten, Songs und besonderen Events direkt in dein Postfach.',
    subscribeSuccess: '✅ Erfolgreich angemeldet! Danke für dein Interesse.',
    subscribeError: '❌ Fehler bei der Anmeldung. Bitte versuche es erneut.',
    emailPlaceholder: 'deine@email.de',
    subscribeLabel: 'Anmelden',
    subscribingLabel: 'Anmelden...',
    ticketButtonScroll: 'D.FAITH Token erhalten',
  },
  en: {
    newsletterTitle: 'Subscribe to newsletter',
    newsletterDesc: 'Get updates about new concerts, songs and special events directly to your inbox.',
    subscribeSuccess: '✅ Successfully subscribed! Thanks for your interest.',
    subscribeError: '❌ Error during subscription. Please try again.',
    emailPlaceholder: 'your@email.com',
    subscribeLabel: 'Subscribe',
    subscribingLabel: 'Subscribing...',
    ticketButtonScroll: 'Get D.FAITH tokens',
  },
  pl: {
    newsletterTitle: 'Subskrybuj newsletter',
    newsletterDesc: 'Otrzymuj aktualizacje o nowych koncertach, utworach i specjalnych wydarzeniach bezpośrednio na swoją skrzynkę.',
    subscribeSuccess: '✅ Pomyślnie zapisano! Dziękujemy za zainteresowanie.',
    subscribeError: '❌ Błąd podczas zapisu. Proszę spróbuj ponownie.',
    emailPlaceholder: 'twój@email.pl',
    subscribeLabel: 'Zapisz się',
    subscribingLabel: 'Zapisywanie...',
    ticketButtonScroll: 'Otrzymaj tokeny D.FAITH',
  }
};

export default NewsletterTranslations;