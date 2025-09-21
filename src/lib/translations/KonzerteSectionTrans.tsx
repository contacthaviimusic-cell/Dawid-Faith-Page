export type LangKey = 'de' | 'en' | 'pl';

export const KonzerteTranslations: Record<LangKey, {
  title: string;
  subtitle: string;
  releaseBadge: string;
  vipBadge: string;
  status: {
    upcoming: string;
    soldOut: string;
    vipOnly: string;
  };
  releaseAlert: string;
  moreInfo: string;
  register: string;
  newsletterTitle: string;
  newsletterDesc: string;
  subscribeSuccess: string;
  subscribeError: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  subscribingLabel: string;
  ticketButtonScroll: string;
} > = {
  de: {
    title: 'Konzerte & Events',
    subtitle: 'Erlebe Dawid Faith live! Hier findest du alle kommenden Konzerte, Events und exklusive Live-Performances.',
    releaseBadge: 'Release Event',
    vipBadge: 'VIP',
    status: { upcoming: 'Verfügbar', soldOut: 'Ausverkauft', vipOnly: 'VIP Only' },
    releaseAlert: '🎵 Das Single Release-Konzert in Katys Garage (Dresden Neustadt) hat freien Eintritt! Komm einfach vorbei.',
    moreInfo: 'Mehr erfahren',
    register: 'Anmeldung',
    newsletterTitle: 'Newsletter abonnieren',
    newsletterDesc: 'Erhalte Updates zu neuen Konzerten, Songs und besonderen Events direkt in dein Postfach.',
    subscribeSuccess: '✅ Erfolgreich angemeldet! Danke für dein Interesse.',
    subscribeError: '❌ Fehler bei der Anmeldung. Bitte versuche es erneut.',
    emailPlaceholder: 'deine@email.de',
    subscribeLabel: 'Anmelden',
    subscribingLabel: 'Anmelden...',
    ticketButtonScroll: 'D.FAITH Token erhalten'
  },
  en: {
    title: 'Concerts & Events',
    subtitle: 'Experience Dawid Faith live! Here you find upcoming concerts, events and exclusive live performances.',
    releaseBadge: 'Release Event',
    vipBadge: 'VIP',
    status: { upcoming: 'Available', soldOut: 'Sold out', vipOnly: 'VIP Only' },
    releaseAlert: '🎵 The single release concert at Katy\'s Garage (Dresden Neustadt) has free entry! Just drop by.',
    moreInfo: 'Learn more',
    register: 'Register',
    newsletterTitle: 'Subscribe to newsletter',
    newsletterDesc: 'Get updates about new concerts, songs and special events directly to your inbox.',
    subscribeSuccess: '✅ Successfully subscribed! Thanks for your interest.',
    subscribeError: '❌ Error during subscription. Please try again.',
    emailPlaceholder: 'your@email.com',
    subscribeLabel: 'Subscribe',
    subscribingLabel: 'Subscribing...',
    ticketButtonScroll: 'Get D.FAITH tokens'
  },
  pl: {
    title: 'Koncerty i wydarzenia',
    subtitle: 'Doświadcz Dawida Faith na żywo! Tutaj znajdziesz nadchodzące koncerty, wydarzenia i ekskluzywne występy na żywo.',
    releaseBadge: 'Wydarzenie premierowe',
    vipBadge: 'VIP',
    status: { upcoming: 'Dostępne', soldOut: 'Wyprzedane', vipOnly: 'Tylko VIP' },
    releaseAlert: '🎵 Koncert premierowy singla w Katy\'s Garage (Drezno Neustadt) ma darmowe wejście! Po prostu wpadnij.',
    moreInfo: 'Dowiedz się więcej',
    register: 'Zarejestruj się',
    newsletterTitle: 'Subskrybuj newsletter',
    newsletterDesc: 'Otrzymuj aktualizacje o nowych koncertach, utworach i specjalnych wydarzeniach bezpośrednio na swoją skrzynkę.',
    subscribeSuccess: '✅ Pomyślnie zapisano! Dziękujemy za zainteresowanie.',
    subscribeError: '❌ Błąd podczas zapisu. Proszę spróbuj ponownie.',
    emailPlaceholder: 'twój@email.pl',
    subscribeLabel: 'Zapisz się',
    subscribingLabel: 'Zapisywanie...',
    ticketButtonScroll: 'Otrzymaj tokeny D.FAITH'
  }
};

export default KonzerteTranslations;
