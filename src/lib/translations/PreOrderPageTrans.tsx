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
    giveawayDesc: string;
    giveawayEmailPlaceholder: string;
    giveawayEmailInvalid: string;
    giveawayConsent: string;
    giveawayButton: string;
    giveawaySending: string;
    giveawaySuccess: string;
    giveawayError: string;
  };
  preorder: {
    title: string;
    desc: string;
    button: string;
    comingSoon: string;
    availableUntil: string;
  };
  engagement: {
    title: string;
    desc: string;
    button: string;
    nftLabel: string;
    nftSupply: string;
  };
  released: {
    title: string;
    desc: string;
    appButton: string;
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
      desc: 'Speichere den Song schon jetzt in deiner Musik-Bibliothek vor – als Dankeschön bekommst du einen Rabattcode für die Pre-Order.',
      button: 'Jetzt presaven',
      checkbox: 'Ich habe presaved',
      codeLabel: 'Dein Rabattcode',
      codeHint: 'Gib den Code beim Pre-Order-Checkout ein.',
      giveawayDesc: 'Trag deine E-Mail ein und presave direkt darüber, um automatisch am Gewinnspiel teilzunehmen.',
      giveawayEmailPlaceholder: 'Deine E-Mail-Adresse',
      giveawayEmailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      giveawayConsent: 'Ich bin einverstanden, dass meine E-Mail für die Gewinnspiel-Teilnahme genutzt und mir der Presave-Link zugeschickt wird.',
      giveawayButton: 'Mail senden & teilnehmen',
      giveawaySending: 'Wird gesendet…',
      giveawaySuccess: '✔ Check deine Mails! Wir haben dir deinen persönlichen Presave-Link geschickt.',
      giveawayError: 'Etwas ist schiefgelaufen. Bitte versuch es erneut.',
    },
    preorder: {
      title: 'Pre-Order',
      desc: 'Sichere dir den Song als MP3 plus das noch unveröffentlichte Musikvideo – über Bandcamp, ohne Registrierung.',
      button: 'Jetzt auf Bandcamp kaufen',
      comingSoon: 'Bald verfügbar',
      availableUntil: 'Verfügbar bis zum Musikvideo-Release',
    },
    engagement: {
      title: 'Zahle mit Engagement',
      desc: 'Kein Geld nötig: Verdiene Tokens durch Quests in der D.FAITH Webapp und sichere dir damit die limitierte NFT-Edition des Songs (nur 100 Stück).',
      button: 'Zur D.FAITH Webapp',
      nftLabel: 'D.FAITH Token',
      nftSupply: 'Limitierte NFT-Edition · 100 Stück',
    },
    released: {
      title: 'Jetzt überall verfügbar',
      desc: 'Der Song und das Musikvideo sind offiziell erschienen – streame sie auf deiner Lieblingsplattform oder hol dir die limitierte NFT-Edition in der D.FAITH Webapp.',
      appButton: 'D.FAITH Webapp besuchen',
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
      desc: 'Pre-save the song to your music library now – as a thank-you, you get a discount code for the pre-order.',
      button: 'Presave now',
      checkbox: 'I have presaved',
      codeLabel: 'Your discount code',
      codeHint: 'Enter the code at the pre-order checkout.',
      giveawayDesc: 'Enter your email and presave through it to automatically enter the giveaway.',
      giveawayEmailPlaceholder: 'Your email address',
      giveawayEmailInvalid: 'Please enter a valid email address.',
      giveawayConsent: 'I agree that my email will be used for the giveaway entry and to send me the presave link.',
      giveawayButton: 'Send email & enter',
      giveawaySending: 'Sending…',
      giveawaySuccess: '✔ Check your inbox! We sent you your personal presave link.',
      giveawayError: 'Something went wrong. Please try again.',
    },
    preorder: {
      title: 'Pre-Order',
      desc: 'Get the song as MP3 plus the unreleased music video – via Bandcamp, no registration needed.',
      button: 'Buy now on Bandcamp',
      comingSoon: 'Coming soon',
      availableUntil: 'Available until the music video release',
    },
    engagement: {
      title: 'Pay with engagement',
      desc: 'No money needed: earn tokens through quests in the D.FAITH webapp and get the limited NFT edition of the song (only 100 copies).',
      button: 'Go to D.FAITH Webapp',
      nftLabel: 'D.FAITH Token',
      nftSupply: 'Limited NFT edition · 100 copies',
    },
    released: {
      title: 'Now available everywhere',
      desc: 'The song and music video are officially out – stream them on your favorite platform or get the limited NFT edition in the D.FAITH webapp.',
      appButton: 'Visit D.FAITH Webapp',
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
      desc: 'Zapisz utwór już teraz w swojej bibliotece muzycznej – w podziękowaniu otrzymasz kod rabatowy na pre-order.',
      button: 'Presave teraz',
      checkbox: 'Zrobiłem/am presave',
      codeLabel: 'Twój kod rabatowy',
      codeHint: 'Wpisz kod przy zakupie pre-order.',
      giveawayDesc: 'Podaj swój e-mail i zrób presave przez ten link, aby automatycznie wziąć udział w konkursie.',
      giveawayEmailPlaceholder: 'Twój adres e-mail',
      giveawayEmailInvalid: 'Podaj prawidłowy adres e-mail.',
      giveawayConsent: 'Zgadzam się na wykorzystanie mojego e-maila do udziału w konkursie i przesłanie mi linku presave.',
      giveawayButton: 'Wyślij e-mail i weź udział',
      giveawaySending: 'Wysyłanie…',
      giveawaySuccess: '✔ Sprawdź skrzynkę! Wysłaliśmy Ci Twój osobisty link presave.',
      giveawayError: 'Coś poszło nie tak. Spróbuj ponownie.',
    },
    preorder: {
      title: 'Pre-Order',
      desc: 'Zdobądź utwór jako MP3 plus niepublikowany teledysk – przez Bandcamp, bez rejestracji.',
      button: 'Kup teraz na Bandcamp',
      comingSoon: 'Wkrótce dostępne',
      availableUntil: 'Dostępne do premiery teledysku',
    },
    engagement: {
      title: 'Zapłać zaangażowaniem',
      desc: 'Bez pieniędzy: zdobywaj tokeny poprzez questy w aplikacji D.FAITH i odbierz limitowaną edycję NFT utworu (tylko 100 sztuk).',
      button: 'Do aplikacji D.FAITH',
      nftLabel: 'Token D.FAITH',
      nftSupply: 'Limitowana edycja NFT · 100 sztuk',
    },
    released: {
      title: 'Teraz dostępne wszędzie',
      desc: 'Utwór i teledysk zostały oficjalnie wydane – streamuj je na ulubionej platformie lub zdobądź limitowaną edycję NFT w aplikacji D.FAITH.',
      appButton: 'Odwiedź aplikację D.FAITH',
    },
  },
};

export default PreOrderTranslations;
