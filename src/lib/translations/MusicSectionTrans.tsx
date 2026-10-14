export type LangKey = 'de' | 'en' | 'pl';

const MusicTranslations: Record<LangKey, {
  title: string;
  appNote: string;
  exclusiveTitle: string;
  exclusiveDesc: string;
  webappButton: string;
  videoOpen: string;
  videoClose: string;
  preorderButton: string;
  songs?: Record<string, { title?: string; description?: string }>;
}> = {
  de: {
    title: 'Musik Vorschau',
    appNote: 'Alle Songs auf Spotify, Apple Music & überall sonst erhältlich',
    exclusiveTitle: 'Du willst mich live sehen?',
    exclusiveDesc: 'Ich trete regelmäßig live auf – für Konzerte, Events oder private Feiern. Schick mir einfach eine Buchungsanfrage, ich melde mich zeitnah zurück.',
    webappButton: 'Jetzt buchen',
    videoOpen: 'Video ansehen',
    videoClose: 'Video schließen',
    preorderButton: 'Jetzt anhören'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Der erste Song der Release Kampagne'
      },
      znikla: {
        title: 'Znikła',
        description: 'Die polnische Version - eine intensive Reise durch Verlust, Sehnsucht und die Suche nach dem was verschwunden ist'
      },
      maria: {
        title: 'Maria',
        description: 'Eine herzzerreißende Ballade über Einsamkeit, verlorene Liebe und die schmerzhafte Erkenntnis des Alleinseins'
      },
      'niebianski-groove': {
        title: 'Niebiański Groove',
        description: 'Ein weiterer Track aus der Release Kampagne'
      },
      jupiter: {
        title: 'Jupiter',
        description: 'Der fünfte Song der Release Kampagne'
      }
    }
  },
  en: {
    title: 'Music Preview',
    appNote: 'All songs available on Spotify, Apple Music & everywhere else',
    exclusiveTitle: 'Want to see me live?',
    exclusiveDesc: 'I regularly perform live – for concerts, events or private celebrations. Just send me a booking request and I\'ll get back to you shortly.',
    webappButton: 'Book now',
    videoOpen: 'Watch video',
    videoClose: 'Close video',
    preorderButton: 'Listen now'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'The first song of the Release Campaign'
      },
      znikla: {
        title: 'Znikła',
        description: 'The Polish version - an intense journey through loss, longing and the search for what has disappeared'
      },
      maria: {
        title: 'Maria',
        description: 'A heart-wrenching ballad about loneliness, lost love and the painful realization of being alone'
      },
      'niebianski-groove': {
        title: 'Niebiański Groove',
        description: 'Another track from the Release Campaign'
      },
      jupiter: {
        title: 'Jupiter',
        description: 'The fifth song of the Release Campaign'
      }
    }
  },
  pl: {
    title: 'Podgląd muzyki',
    appNote: 'Wszystkie utwory dostępne na Spotify, Apple Music i wszędzie indziej',
    exclusiveTitle: 'Chcesz zobaczyć mnie na żywo?',
    exclusiveDesc: 'Regularnie występuję na żywo – na koncertach, eventach czy prywatnych uroczystościach. Wyślij mi po prostu zapytanie o rezerwację, odpowiem wkrótce.',
    webappButton: 'Zarezerwuj teraz',
    videoOpen: 'Obejrzyj wideo',
    videoClose: 'Zamknij wideo',
    preorderButton: 'Posłuchaj teraz'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Pierwszy utwór Kampanii Release'
      },
      znikla: {
        title: 'Znikła',
        description: 'Polska wersja - intensywna podróż przez stratę, tęsknotę i poszukiwanie tego, co zniknęło'
      },
      maria: {
        title: 'Maria',
        description: 'Rozdzierająca serce ballada o samotności, utraconej miłości i bolesnym uświadomieniu sobie bycia samemu'
      },
      'niebianski-groove': {
        title: 'Niebiański Groove',
        description: 'Kolejny utwór z Kampanii Release'
      },
      jupiter: {
        title: 'Jupiter',
        description: 'Piąty utwór Kampanii Release'
      }
    }
  }
};

export default MusicTranslations;
