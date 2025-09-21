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
  }
};

export default MusicTranslations;
