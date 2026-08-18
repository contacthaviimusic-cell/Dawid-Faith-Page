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
    appNote: 'Songs verfügbar in der D.FAITH Webapp als limitierte NFT-Edition',
    exclusiveTitle: 'Exklusive Songs als NFT',
    exclusiveDesc: 'In der D.FAITH Webapp gibt es jeden Song als nummerierte NFT-Edition, die nur bis zum Release des jeweiligen Musikvideos verfügbar ist. Sichere dir deine Edition mit Tokens aus dem D.FAITH Ecosystem und unterstütze Dawid Faith direkt.',
    webappButton: 'D.FAITH Webapp besuchen',
    videoOpen: 'Video ansehen',
    videoClose: 'Video schließen',
    preorderButton: 'Jetzt vorbestellen'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Der erste Song der Release Kampagne - ab 18. September 2026'
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
        title: 'Niebianski Groove',
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
    appNote: 'Songs available in the D.FAITH webapp as a limited NFT edition',
    exclusiveTitle: 'Exclusive songs as NFTs',
    exclusiveDesc: 'In the D.FAITH webapp, every song is available as a numbered NFT edition that\'s only available until that song\'s music video release. Secure your edition with Tokens from the D.FAITH Ecosystem and support Dawid Faith directly.',
    webappButton: 'Visit D.FAITH Webapp',
    videoOpen: 'Watch video',
    videoClose: 'Close video',
    preorderButton: 'Pre-order now'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'The first song of the Release Campaign - from September 18th, 2026'
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
        title: 'Niebianski Groove',
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
    appNote: 'Utwory dostępne w aplikacji D.FAITH jako limitowana edycja NFT',
    exclusiveTitle: 'Ekskluzywne utwory jako NFT',
    exclusiveDesc: 'W aplikacji D.FAITH każdy utwór dostępny jest jako numerowana edycja NFT, dostępna tylko do premiery danego teledysku. Zdobądź swoją edycję za Tokeny z D.FAITH Ecosystem i wspieraj Dawida Faith bezpośrednio.',
    webappButton: 'Odwiedź aplikację D.FAITH',
    videoOpen: 'Obejrzyj wideo',
    videoClose: 'Zamknij wideo',
    preorderButton: 'Zamów już teraz'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Pierwszy utwór Kampanii Release - od 18 września 2026'
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
        title: 'Niebianski Groove',
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
