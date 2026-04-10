export type LangKey = 'de' | 'en' | 'pl';

const MusicTranslations: Record<LangKey, {
  title: string;
  subtitle: string;
  appNote: string;
  exclusiveTitle: string;
  exclusiveDesc: string;
  webappButton: string;
  videoOpen: string;
  videoClose: string;
  songs?: Record<string, { title?: string; description?: string }>;
}> = {
  de: {
    title: 'Musik Vorschau',
    subtitle: 'Schaue dir die Video-Vorschauen an und besuche die D.FAITH Webapp für exklusive Songs vor dem Release.',
    appNote: 'Songs verfügbar in der D.FAITH Webapp',
    exclusiveTitle: 'Exklusive Songs vor Release',
    exclusiveDesc: 'Besuche die D.FAITH Webapp und höre die kompletten Songs bereits vor dem offiziellen Release. Verdiene Tokens durch deine Interaktionen und unterstütze Dawid Faith direkt.',
    webappButton: 'D.FAITH Webapp besuchen',
    videoOpen: 'Video ansehen',
    videoClose: 'Video schließen'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Der erste Song der Waterfall Release Kampagne - ab 18. September 2026'
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
        description: 'Ein weiterer Track aus der exklusiven Waterfall Release Serie'
      }
    }
  },
  en: {
    title: 'Music Preview',
    subtitle: 'Watch the video previews and visit the D.FAITH webapp for exclusive songs before release.',
    appNote: 'Songs available in the D.FAITH webapp',
    exclusiveTitle: 'Exclusive songs before release',
    exclusiveDesc: 'Visit the D.FAITH webapp and listen to full songs before the official release. Earn tokens through your interactions and support Dawid Faith directly.',
    webappButton: 'Visit D.FAITH Webapp',
    videoOpen: 'Watch video',
    videoClose: 'Close video'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'The first song of the Waterfall Release campaign - from September 18th, 2026'
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
        description: 'Another track from the exclusive Waterfall Release series'
      }
    }
  },
  pl: {
    title: 'Podgląd muzyki',
    subtitle: 'Obejrzyj podglądy wideo i odwiedź aplikację D.FAITH, aby odsłuchać ekskluzywne utwory przed premierą.',
    appNote: 'Utwory dostępne w aplikacji D.FAITH',
    exclusiveTitle: 'Ekskluzywne utwory przed premierą',
    exclusiveDesc: 'Odwiedź aplikację D.FAITH i posłuchaj pełnych utworów przed oficjalną premierą. Zdobywaj tokeny poprzez swoje interakcje i wspieraj Dawida Faith bezpośrednio.',
    webappButton: 'Odwiedź aplikację D.FAITH',
    videoOpen: 'Obejrzyj wideo',
    videoClose: 'Zamknij wideo'
    ,
    songs: {
      katze: {
        title: 'Katze',
        description: 'Pierwszy utwór kampanii Waterfall Release - od 18 września 2026'
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
        description: 'Kolejny utwór z exclusywnej serii Waterfall Release'
      }
    }
  }
};

export default MusicTranslations;
