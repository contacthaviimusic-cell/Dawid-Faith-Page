export type LangKey = 'de' | 'en' | 'pl';

const PreOrderTranslations: Record<LangKey, {
  loading: string;
  notFound: string;
  backHome: string;
  releaseIn: string;
  videoReleaseIn: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  chooseYourWay: string;
  presave: {
    title: string;
    desc: string;
    button: string;
    checkbox: string;
    codeLabel: string;
    codeHint: string;
  };
  preorder: {
    title: string;
    desc: string;
    button: string;
    comingSoon: string;
    availableUntil: string;
  };
  listen: {
    title: string;
    desc: string;
    button: string;
    comingSoon: string;
  };
  released: {
    title: string;
    desc: string;
    streamButton: string;
    watchButton: string;
  };
  premiere: {
    cardTitle: string;
    cardDesc: string;
    button: string;
    countdownLabel: string;
    comingSoon: string;
  };
}> = {
  de: {
    loading: 'Lade…',
    notFound: 'Diese Single ist aktuell nicht verfügbar.',
    backHome: 'Zur Startseite',
    releaseIn: 'Release in',
    videoReleaseIn: 'Musikvideo-Release in',
    days: 'Tage',
    hours: 'Std',
    minutes: 'Min',
    seconds: 'Sek',
    chooseYourWay: 'Wähle deinen Weg',
    presave: {
      title: 'Presave',
      desc: 'Speichere den Song jetzt in deiner Musik-Bibliothek vor, damit er sofort erscheint, sobald er released wird.',
      button: 'Jetzt presaven',
      checkbox: 'Ich habe presaved',
      codeLabel: 'Dein Rabattcode',
      codeHint: 'Gib den Code beim Pre-Order-Checkout ein.',
    },
    preorder: {
      title: 'Pre-Order',
      desc: 'Sichere dir den Song als MP3 plus das noch unveröffentlichte Musikvideo – über Bandcamp, ohne Registrierung.',
      button: 'Jetzt auf Bandcamp kaufen',
      comingSoon: 'Bald verfügbar',
      availableUntil: 'Verfügbar bis zum Musikvideo-Release',
    },
    listen: {
      title: 'Jetzt überall hören',
      desc: 'Der Song ist da! Streame ihn auf deiner Lieblingsplattform – Spotify, Apple Music, YouTube Music und mehr.',
      button: 'Jetzt anhören',
      comingSoon: 'Bald verfügbar',
    },
    released: {
      title: 'Jetzt überall verfügbar',
      desc: 'Der Song und das Musikvideo sind offiziell erschienen – streame sie jetzt auf deiner Lieblingsplattform.',
      streamButton: 'Jetzt überall hören',
      watchButton: 'Video jetzt ansehen',
    },
    premiere: {
      cardTitle: 'Premiere',
      cardDesc: 'Sei live dabei, wenn Song und Musikvideo Premiere feiern.',
      button: 'Zur Premiere',
      countdownLabel: 'Premiere-Link erscheint in',
      comingSoon: 'Termin wird bald bekanntgegeben',
    },
  },
  en: {
    loading: 'Loading…',
    notFound: 'This single is currently not available.',
    backHome: 'Back to homepage',
    releaseIn: 'Release in',
    videoReleaseIn: 'Music video release in',
    days: 'Days',
    hours: 'Hrs',
    minutes: 'Min',
    seconds: 'Sec',
    chooseYourWay: 'Choose your way',
    presave: {
      title: 'Presave',
      desc: 'Presave the song to your music library now so it shows up right away as soon as it releases.',
      button: 'Presave now',
      checkbox: 'I have presaved',
      codeLabel: 'Your discount code',
      codeHint: 'Enter the code at the pre-order checkout.',
    },
    preorder: {
      title: 'Pre-Order',
      desc: 'Get the song as MP3 plus the unreleased music video – via Bandcamp, no registration needed.',
      button: 'Buy now on Bandcamp',
      comingSoon: 'Coming soon',
      availableUntil: 'Available until the music video release',
    },
    listen: {
      title: 'Listen everywhere now',
      desc: 'The song is out! Stream it on your favorite platform – Spotify, Apple Music, YouTube Music and more.',
      button: 'Listen now',
      comingSoon: 'Coming soon',
    },
    released: {
      title: 'Now available everywhere',
      desc: 'The song and music video are officially out – stream them now on your favorite platform.',
      streamButton: 'Listen everywhere now',
      watchButton: 'Watch the video now',
    },
    premiere: {
      cardTitle: 'Premiere',
      cardDesc: 'Be there live when the song and music video premiere.',
      button: 'Go to premiere',
      countdownLabel: 'Premiere link appears in',
      comingSoon: 'Date to be announced soon',
    },
  },
  pl: {
    loading: 'Ładowanie…',
    notFound: 'Ten singiel jest obecnie niedostępny.',
    backHome: 'Wróć na stronę główną',
    releaseIn: 'Premiera za',
    videoReleaseIn: 'Premiera teledysku za',
    days: 'Dni',
    hours: 'Godz',
    minutes: 'Min',
    seconds: 'Sek',
    chooseYourWay: 'Wybierz swoją drogę',
    presave: {
      title: 'Presave',
      desc: 'Zrób presave utworu już teraz, aby pojawił się od razu po premierze.',
      button: 'Presave teraz',
      checkbox: 'Zrobiłem/am presave',
      codeLabel: 'Twój kod rabatowy',
      codeHint: 'Wpisz kod przy zakupie pre-order.',
    },
    preorder: {
      title: 'Przedsprzedaż',
      desc: 'Zdobądź utwór jako MP3 plus niepublikowany teledysk – przez Bandcamp, bez rejestracji.',
      button: 'Kup teraz na Bandcamp',
      comingSoon: 'Wkrótce dostępne',
      availableUntil: 'Dostępne do premiery teledysku',
    },
    listen: {
      title: 'Słuchaj już wszędzie',
      desc: 'Utwór jest już dostępny! Odtwarzaj go na ulubionej platformie – Spotify, Apple Music, YouTube Music i innych.',
      button: 'Posłuchaj teraz',
      comingSoon: 'Wkrótce dostępne',
    },
    released: {
      title: 'Teraz dostępne wszędzie',
      desc: 'Utwór i teledysk zostały oficjalnie wydane – streamuj je już teraz na ulubionej platformie.',
      streamButton: 'Posłuchaj już wszędzie',
      watchButton: 'Obejrzyj teledysk teraz',
    },
    premiere: {
      cardTitle: 'Premiera',
      cardDesc: 'Bądź na żywo, gdy utwór i teledysk będą miały premierę.',
      button: 'Przejdź do premiery',
      countdownLabel: 'Link do premiery pojawi się za',
      comingSoon: 'Termin zostanie wkrótce ogłoszony',
    },
  },
};

export default PreOrderTranslations;
