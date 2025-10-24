export type LangKey = 'de' | 'en' | 'pl';

export const KonzerteEventsTranslations: Record<LangKey, {
  title: string;
  subtitle: string;
  releaseBadge: string;
  vipBadge: string;
  timeSuffix?: string;
  variousDates?: string;
  status: {
    upcoming: string;
    soldOut: string;
    vipOnly: string;
  };
  releaseAlert: string;
  moreInfo: string;
  register: string;
  noEvents: string;
  noEventsDesc: string;
  events?: Record<string, {
    title?: string;
    subtitle?: string;
    description?: string;
    capacity?: string;
    price?: string;
    venue?: string;
    location?: string;
  }>;
}> = {
  de: {
    title: 'Konzerte & Events',
    subtitle: 'Erlebe Dawid Faith live! Hier findest du alle kommenden Konzerte, Events und exklusive Live-Performances.',
    releaseBadge: 'Release Event',
    vipBadge: 'VIP',
    status: { upcoming: 'Verfügbar', soldOut: 'Ausverkauft', vipOnly: 'VIP Only' },
    timeSuffix: 'Uhr',
    variousDates: 'Verschiedene Termine',
    releaseAlert: '🎵 Das Single Release-Konzert in Katys Garage (Dresden Neustadt) hat freien Eintritt! Komm einfach vorbei.',
    moreInfo: 'Mehr erfahren',
    register: 'Jetzt buchen',
    noEvents: 'Derzeit keine Events geplant',
    noEventsDesc: 'Neue Konzerte und Events werden bald angekündigt. Bleib dran!',
    events: {
      'wohnzimmer-konzert': {
        title: 'Private Wohnzimmerkonzerte',
        subtitle: 'Exklusives Konzert in deinem Wohnzimmer',
        description: 'Erlebe ein intimes Konzert in deinem eigenen Wohnzimmer. Ein einzigartiges musikalisches Erlebnis für dich und deine Gäste. Kontaktiere mich per Mail oder Telefon für weitere Details und Buchung.',
        capacity: '10-20 Personen',
        price: 'Auf Anfrage',
        venue: 'Dein Wohnzimmer',
        location: 'Überall möglich'
      },
      'release-konzert-2025': {
        title: '🎵 Single Release-Konzert 2025',
        subtitle: 'Exklusives Single Release Event',
        description: 'Ein gemütlicher Abend mit neuen Songs und guter Musik. Komm vorbei und lass uns zusammen feiern!',
        capacity: 'Begrenzte Plätze',
        price: 'Freier Eintritt',
        venue: "Katys Garage",
        location: 'Dresden Neustadt'
      }
    }
  },
  en: {
    title: 'Concerts & Events',
    subtitle: 'Experience Dawid Faith live! Here you find upcoming concerts, events and exclusive live performances.',
    releaseBadge: 'Release Event',
    vipBadge: 'VIP',
    status: { upcoming: 'Available', soldOut: 'Sold out', vipOnly: 'VIP Only' },
    timeSuffix: '',
    variousDates: 'Various dates',
    releaseAlert: '🎵 The single release concert at Katy\'s Garage (Dresden Neustadt) has free entry! Just drop by.',
    moreInfo: 'Learn more',
    register: 'Book now',
    noEvents: 'No events currently planned',
    noEventsDesc: 'New concerts and events will be announced soon. Stay tuned!',
    events: {
      'wohnzimmer-konzert': {
        title: '🏡 Private Living Room Concerts',
        subtitle: 'Exclusive concert in your living room',
        description: 'Experience an intimate concert in your own living room. A unique musical experience for you and your guests. Contact me by mail or phone for more details and booking.',
        capacity: '10-20 people',
        price: 'On request',
        venue: 'Your living room',
        location: 'Anywhere possible'
      },
      'release-konzert-2025': {
        title: '🎵 Single Release Concert 2025',
        subtitle: 'Exclusive single release event',
        description: 'A cozy evening with new songs and good music. Come by and celebrate with us!',
        capacity: 'Limited seats',
        price: 'Free entry',
        venue: "Katy's Garage",
        location: 'Dresden Neustadt'
      }
    }
  },
  pl: {
    title: 'Koncerty i wydarzenia',
    subtitle: 'Doświadcz Dawida Faith na żywo! Tutaj znajdziesz nadchodzące koncerty, wydarzenia i ekskluzywne występy na żywo.',
    releaseBadge: 'Wydarzenie premierowe',
    vipBadge: 'VIP',
    status: { upcoming: 'Dostępne', soldOut: 'Wyprzedane', vipOnly: 'Tylko VIP' },
    timeSuffix: '',
    variousDates: 'Różne terminy',
    releaseAlert: '🎵 Koncert premierowy singla w Katy\'s Garage (Drezno Neustadt) ma darmowe wejście! Po prostu wpadnij.',
    moreInfo: 'Dowiedz się więcej',
    register: 'Zarezerwuj teraz',
    noEvents: 'Obecnie brak zaplanowanych wydarzeń',
    noEventsDesc: 'Nowe koncerty i wydarzenia zostaną wkrótce ogłoszone. Bądź na bieżąco!',
    events: {
      'wohnzimmer-konzert': {
        title: '🏡 Prywatne koncerty w salonie',
        subtitle: 'Ekskluzywny koncert w Twoim salonie',
        description: 'Doświadcz kameralnego koncertu we własnym salonie. Wyjątkowe muzyczne przeżycie dla Ciebie i Twoich gości. Skontaktuj się ze mną mailowo lub telefonicznie, aby uzyskać więcej szczegółów i dokonać rezerwacji.',
        capacity: '10-20 osób',
        price: 'Do uzgodnienia',
        venue: 'Twój salon',
        location: 'Wszędzie możliwe'
      },
      'release-konzert-2025': {
        title: '🎵 Koncert premierowy singla 2025',
        subtitle: 'Ekskluzywne wydarzenie premierowe singla',
        description: 'Przyjemny wieczór z nowymi piosenkami i dobrą muzyką. Wpadnij i świętuj z nami!',
        capacity: 'Ograniczona liczba miejsc',
        price: 'Wstęp wolny',
        venue: "Katy's Garage",
        location: 'Drezno Neustadt'
      }
    }
  }
};

export default KonzerteEventsTranslations;