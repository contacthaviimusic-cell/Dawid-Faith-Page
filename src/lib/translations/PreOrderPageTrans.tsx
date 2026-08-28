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
    prizeLabel: string;
    button: string;
    checkbox: string;
    codeLabel: string;
    codeHint: string;
    giveawayModalTitle: string;
    giveawayDesc: string;
    giveawayEmailPlaceholder: string;
    giveawayEmailInvalid: string;
    giveawayLocationPlaceholder: string;
    giveawayLocationInvalid: string;
    giveawayLocationHint: string;
    giveawayConsent: string;
    giveawayTermsLink: string;
    giveawayButton: string;
    giveawayCancel: string;
    giveawaySending: string;
    giveawaySuccess: string;
    giveawayClose: string;
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
      desc: 'Speichere den Song jetzt in deiner Musik-Bibliothek vor und sichere dir automatisch die Chance auf ein exklusives Mythic-NFT aus den D.FAITH Collectibles – eine der seltensten Song-Karten überhaupt. Die Song-NFTs sind nur bis zum Release des Musikvideos verfügbar.',
      prizeLabel: 'Zu gewinnen: Mythic-NFT + 5 limitierte Song NFTs',
      button: 'Jetzt presaven',
      checkbox: 'Ich habe presaved',
      codeLabel: 'Dein Rabattcode',
      codeHint: 'Gib den Code beim Pre-Order-Checkout ein.',
      giveawayModalTitle: 'Am Gewinnspiel teilnehmen',
      giveawayDesc: 'Trag deinen Wohnort und deine E-Mail ein, um automatisch am Gewinnspiel teilzunehmen. Danach geht’s direkt weiter zum Presave.',
      giveawayEmailPlaceholder: 'Deine E-Mail-Adresse',
      giveawayEmailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      giveawayLocationPlaceholder: 'Dein Wohnort',
      giveawayLocationInvalid: 'Bitte gib deinen Wohnort an.',
      giveawayLocationHint: 'Damit ich weiß, in welchen Städten ich als Nächstes Konzerte spielen sollte.',
      giveawayConsent: 'Ich bin einverstanden, dass meine E-Mail für die Gewinnspiel-Teilnahme genutzt wird und ich künftig weitere Updates zu Musik-Releases und Events von Dawid Faith per E-Mail erhalte, und akzeptiere die',
      giveawayTermsLink: 'Teilnahmebedingungen',
      giveawayButton: 'Teilnehmen & presaven',
      giveawayCancel: 'Abbrechen',
      giveawaySending: 'Wird gesendet…',
      giveawaySuccess: '✔ Du nimmst jetzt am Gewinnspiel teil! Presave öffnet sich in einem neuen Tab.',
      giveawayClose: 'Schließen',
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
      desc: 'Kein Geld nötig: Verdiene Tokens durch Quests in der D.FAITH Webapp und sichere dir damit die NFT-Edition des Songs – verfügbar nur bis zum Release des Musikvideos.',
      button: 'Zur D.FAITH Webapp',
      nftLabel: 'D.FAITH Token',
      nftSupply: 'Nur verfügbar bis zum Musikvideo-Release',
    },
    released: {
      title: 'Jetzt überall verfügbar',
      desc: 'Der Song und das Musikvideo sind offiziell erschienen – streame sie auf deiner Lieblingsplattform oder entdecke mehr in der D.FAITH Webapp.',
      appButton: 'D.FAITH Webapp besuchen',
      watchButton: 'Video jetzt ansehen',
    },
    premiere: {
      cardTitle: 'Premiere',
      cardDesc: 'Sei live dabei, wenn Song und Musikvideo Premiere feiern, und sichere dir exklusive Belohnungen für alle, die im Chat mit dabei sind.',
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
      desc: 'Presave the song to your music library now and automatically get a chance to win an exclusive Mythic NFT from the D.FAITH Collectibles – one of the rarest song cards there is. The Song NFTs are only available until the music video release.',
      prizeLabel: 'To win: Mythic NFT + 5 limited Song NFTs',
      button: 'Presave now',
      checkbox: 'I have presaved',
      codeLabel: 'Your discount code',
      codeHint: 'Enter the code at the pre-order checkout.',
      giveawayModalTitle: 'Enter the giveaway',
      giveawayDesc: 'Enter your city and email to automatically enter the giveaway. You’ll then continue straight to presave.',
      giveawayEmailPlaceholder: 'Your email address',
      giveawayEmailInvalid: 'Please enter a valid email address.',
      giveawayLocationPlaceholder: 'Your city',
      giveawayLocationInvalid: 'Please enter your city.',
      giveawayLocationHint: 'So I know which cities to play concerts in next.',
      giveawayConsent: 'I agree that my email will be used for the giveaway entry and to receive future updates about music releases and events from Dawid Faith, and I accept the',
      giveawayTermsLink: 'terms & conditions',
      giveawayButton: 'Enter & presave',
      giveawayCancel: 'Cancel',
      giveawaySending: 'Sending…',
      giveawaySuccess: '✔ You’re now entered in the giveaway! Presave is opening in a new tab.',
      giveawayClose: 'Close',
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
      desc: 'No money needed: earn tokens through quests in the D.FAITH webapp and secure the song\'s NFT edition – available only until the music video release.',
      button: 'Go to D.FAITH Webapp',
      nftLabel: 'D.FAITH Token',
      nftSupply: 'Only available until the music video release',
    },
    released: {
      title: 'Now available everywhere',
      desc: 'The song and music video are officially out – stream them on your favorite platform or discover more on the D.FAITH webapp.',
      appButton: 'Visit D.FAITH Webapp',
      watchButton: 'Watch the video now',
    },
    premiere: {
      cardTitle: 'Premiere',
      cardDesc: 'Be there live when the song and music video premiere, and unlock exclusive rewards for being in the chat.',
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
      desc: 'Zrób presave utworu już teraz i automatycznie zyskaj szansę na wygranie ekskluzywnego Mythic NFT z kolekcji D.FAITH Collectibles – jednej z najrzadszych kart utworów. Song NFT są dostępne tylko do premiery teledysku.',
      prizeLabel: 'Do wygrania: Mythic NFT + 5 limitowanych Song NFT',
      button: 'Presave teraz',
      checkbox: 'Zrobiłem/am presave',
      codeLabel: 'Twój kod rabatowy',
      codeHint: 'Wpisz kod przy zakupie pre-order.',
      giveawayModalTitle: 'Weź udział w konkursie',
      giveawayDesc: 'Podaj swoją miejscowość i e-mail, aby automatycznie wziąć udział w konkursie. Następnie przejdziesz od razu do presave.',
      giveawayEmailPlaceholder: 'Twój adres e-mail',
      giveawayEmailInvalid: 'Podaj prawidłowy adres e-mail.',
      giveawayLocationPlaceholder: 'Twoja miejscowość',
      giveawayLocationInvalid: 'Podaj swoją miejscowość.',
      giveawayLocationHint: 'Dzięki temu wiem, w jakich miastach zagrać kolejne koncerty.',
      giveawayConsent: 'Zgadzam się na wykorzystanie mojego e-maila do udziału w konkursie oraz na otrzymywanie przyszłych aktualizacji o wydaniach muzycznych i wydarzeniach Dawida Faith, oraz akceptuję',
      giveawayTermsLink: 'regulamin konkursu',
      giveawayButton: 'Weź udział i zrób presave',
      giveawayCancel: 'Anuluj',
      giveawaySending: 'Wysyłanie…',
      giveawaySuccess: '✔ Bierzesz teraz udział w konkursie! Presave otworzy się w nowej karcie.',
      giveawayClose: 'Zamknij',
      giveawayError: 'Coś poszło nie tak. Spróbuj ponownie.',
    },
    preorder: {
      title: 'Przedsprzedaż',
      desc: 'Zdobądź utwór jako MP3 plus niepublikowany teledysk – przez Bandcamp, bez rejestracji.',
      button: 'Kup teraz na Bandcamp',
      comingSoon: 'Wkrótce dostępne',
      availableUntil: 'Dostępne do premiery teledysku',
    },
    engagement: {
      title: 'Zapłać zaangażowaniem',
      desc: 'Bez pieniędzy: zdobywaj tokeny poprzez questy w aplikacji D.FAITH i zdobądź edycję NFT utworu – dostępną tylko do premiery teledysku.',
      button: 'Do aplikacji D.FAITH',
      nftLabel: 'Token D.FAITH',
      nftSupply: 'Dostępne tylko do premiery teledysku',
    },
    released: {
      title: 'Teraz dostępne wszędzie',
      desc: 'Utwór i teledysk zostały oficjalnie wydane – streamuj je na ulubionej platformie lub odkryj więcej w aplikacji D.FAITH.',
      appButton: 'Odwiedź aplikację D.FAITH',
      watchButton: 'Obejrzyj teledysk teraz',
    },
    premiere: {
      cardTitle: 'Premiera',
      cardDesc: 'Bądź na żywo, gdy utwór i teledysk będą miały premierę, i zdobądź ekskluzywne nagrody za bycie na czacie.',
      button: 'Przejdź do premiery',
      countdownLabel: 'Link do premiery pojawi się za',
      comingSoon: 'Termin zostanie wkrótce ogłoszony',
    },
  },
};

export default PreOrderTranslations;
