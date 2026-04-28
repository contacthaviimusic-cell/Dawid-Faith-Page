type LangKey = 'de' | 'en' | 'pl';

const BookingPageTrans: Record<LangKey, {
  // Nav
  navAbout: string;
  navMusic: string;
  navLive: string;
  navReferences: string;
  navServices: string;
  navPhotos: string;
  navBooking: string;
  menuAriaLabel: string;

  // Hero
  heroBadge: string;
  heroSubtitle: string;
  heroCtaBook: string;
  heroCtaListen: string;
  heroLanguages: string;
  heroGuitar: string;
  heroRepertoire: string;
  heroScroll: string;

  // About
  aboutLabel: string;
  aboutTitle1: string;
  aboutTitle2: string;
  aboutP1: string;
  aboutP2: string;
  aboutQuote: string;

  // USP
  uspLabel: string;
  uspTitle1: string;
  uspTitle2: string;
  uspDesc: string;
  uspTag1: string;
  uspTag2: string;
  uspTag3: string;
  uspTag4: string;

  // Music
  musicLabel: string;
  musicTitle: string;
  musicSubtitle: string;
  musicNowPlaying: string;
  musicVideoOpen: string;
  musicVideoClose: string;

  // Videos
  videosLabel: string;
  videosTitle: string;
  videosSubtitle: string;

  // References
  refLabel: string;
  refTitle: string;
  refSubtitle: string;
  refQuote: string;
  refQuoteCite: string;
  refCardLiveLabel: string;
  refCardLive: string;
  refCardLiveLocation: string;
  refCardStreetLabel: string;
  refCardStreet: string;
  refCardStreetLocation: string;
  refCardEventsLabel: string;
  refCardEvents: string;
  refCardEventsLocation: string;
  refCardGastroLabel: string;
  refCardGastro: string;
  refCardGastroLocation: string;

  // Services
  svcLabel: string;
  svcTitle: string;
  svcSubtitle: string;
  svcMostChosen: string;
  svc30Title: string;
  svc30Item1: string;
  svc30Item2: string;
  svc30Item3: string;
  svc30Item4: string;
  svc60Title: string;
  svc60Item1: string;
  svc60Item2: string;
  svc60Item3: string;
  svc60Item4: string;
  svc60Item5: string;
  svc120Title: string;
  svc120Item1: string;
  svc120Item2: string;
  svc120Item3: string;
  svc120Item4: string;
  svc120Item5: string;
  svcPriceOnRequest: string;
  svcCustomOffer: string;

  // Extra services tags
  svcExtraTravel: string;
  svcExtraPA: string;
  svcExtraSpecial: string;
  svcExtraEncore: string;

  // Tech & Setup
  techTitle: string;
  techSubtitle: string;
  techPlugPlay: string;
  techPlugPlayDesc: string;
  techInEar: string;
  techInEarDesc: string;
  techAutark: string;
  techAutarkDesc: string;
  techRiderDownload: string;

  // Repertoire
  repTitle: string;
  repSubtitle: string;
  repOriginals: string;
  repOriginalCount: string;
  repBallads: string;
  repUptempo: string;
  repCovers: string;
  repCoverCount: string;
  repGerman: string;
  repEnglish: string;
  repPolish: string;
  repNote: string;

  // Gallery
  galLabel: string;
  galTitle: string;
  galSubtitle: string;
  galDownloadHint: string;

  // Booking Form
  formLabel: string;
  formTitle: string;
  formSubtitle: string;
  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formEventType: string;
  formEventTypeDefault: string;
  formEventWedding: string;
  formEventBar: string;
  formEventPrivate: string;
  formEventCorporate: string;
  formEventFestival: string;
  formEventOther: string;
  formDate: string;
  formLocation: string;
  formLocationPlaceholder: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSending: string;
  formCallDirect: string;
  formSuccessTitle: string;
  formSuccessText: string;
  formSuccessAnother: string;
  formErrorDefault: string;
  formErrorConnection: string;

  // Footer
  footerBackToTop: string;

  // Mobile CTA
  mobileCtaBook: string;
  mobileCtaCallLabel: string;
}> = {
  de: {
    // Nav
    navAbout: 'Über mich',
    navMusic: 'Musik',
    navLive: 'Live',
    navReferences: 'Referenzen',
    navServices: 'Leistungen',
    navPhotos: 'Fotos',
    navBooking: 'Booking',
    menuAriaLabel: 'Menü öffnen',

    // Hero
    heroBadge: 'Booking & EPK',
    heroSubtitle: 'Slavischer Pop-Rock mit Akustik-Gitarre.\nLeidenschaftlich, ehrlich, unvergesslich.',
    heroCtaBook: 'Jetzt buchen',
    heroCtaListen: 'Musik anhören',
    heroLanguages: 'Deutsch · Polnisch · Englisch',
    heroGuitar: 'Solo Akustik-Gitarre',
    heroRepertoire: '28 Songs Repertoire',
    heroScroll: 'Scroll',

    // About
    aboutLabel: 'Über mich',
    aboutTitle1: 'Wer ist',
    aboutTitle2: 'Dawid Faith?',
    aboutP1: 'Ein Musiker, der die Kulturgrenzen zwischen Deutschland und Polen überbrückt. Mit Songs in Deutsch und Polnisch schaffe ich emotionale Verbindungen, die lange nachwirken.',
    aboutP2: 'Mein Sound: Slavischer Pop-Rock mit authentischer Akustik-Gitarre. Balladen mit Gefühl, eingängige Pop-Rock-Songs – immer live gespielt, immer vom Herzen.',
    aboutQuote: 'Echte Live-Performance ohne Kompromisse. Nur Gitarre, Stimme und eine Menge Leidenschaft für gute Musik.',

    // USP
    uspLabel: 'Alleinstellungsmerkmal',
    uspTitle1: 'Die Melancholie Polens',
    uspTitle2: 'trifft auf moderne Pop-Rock-Einflüsse',
    uspDesc: 'Nicht noch ein Singer-Songwriter mit Akustikgitarre. Slavischer Pop-Rock vereint emotionale polnische Balladen mit deutschem Pop-Rock und englischen Klassikern – ein Sound, den es so kein zweites Mal gibt.',
    uspTag1: 'Polnische Melancholie',
    uspTag2: 'Deutscher Pop-Rock',
    uspTag3: 'Englische Klassiker',
    uspTag4: 'Authentische Akustik',

    // Music
    musicLabel: 'Musik',
    musicTitle: 'Meine Songs',
    musicSubtitle: 'Videovorschau meiner Original-Kompositionen',
    musicNowPlaying: 'Jetzt spielen',
    musicVideoOpen: 'Video ansehen',
    musicVideoClose: 'Video schließen',

    // Videos
    videosLabel: 'Live Performance',
    videosTitle: 'Live Auftritte',
    videosSubtitle: 'Authentische Live-Aufführungen in voller Länge',

    // References
    refLabel: 'Referenzen',
    refTitle: 'Bisherige Auftritte',
    refSubtitle: 'Erfahrungen von der Straße bis zur Bühne',
    refQuote: 'Dawid hat mit seiner Stimme und Gitarre alle in den Bann gezogen. Authentisch, leidenschaftlich und unglaublich mitreißend.',
    refQuoteCite: '— Feedback nach einem Private Event in Rostock',
    refCardLiveLabel: 'Live',
    refCardLive: 'Private Events',
    refCardLiveLocation: 'Rostock & Umgebung',
    refCardStreetLabel: 'Straße',
    refCardStreet: 'Straßenmusik-Sessions',
    refCardStreetLocation: 'Innenstädte & Fußgängerzonen',
    refCardEventsLabel: 'Events',
    refCardEvents: 'Private Veranstaltungen',
    refCardEventsLocation: 'Feiern & Gartenpartys',
    refCardGastroLabel: 'Gastro',
    refCardGastro: 'Kneipen & Bars',
    refCardGastroLocation: 'Lokale Live-Musik-Abende',

    // Services
    svcLabel: 'Leistungen',
    svcTitle: 'Was ich anbiete',
    svcSubtitle: 'Flexible Sets für jede Veranstaltung',
    svcMostChosen: 'Meistgewählt',
    svc30Title: 'Opener',
    svc30Item1: '5–6 Songs',
    svc30Item2: 'Perfekt für Apéros, Empfänge & Einlass',
    svc30Item3: 'Mix aus Original & Cover',
    svc30Item4: 'Soundcheck inklusive',
    svc60Title: 'Full Set',
    svc60Item1: '12–14 Songs',
    svc60Item2: 'Club-Abend, Kulturhaus, Open Air',
    svc60Item3: 'Durchgängiger Flow mit Stimmungsbogen',
    svc60Item4: 'Soundcheck + Auf-/Abbau inklusive',
    svc60Item5: 'Wunschsong nach Absprache möglich',
    svc120Title: 'Abendfüllend',
    svc120Item1: '28 Songs (2 Sets mit Pause)',
    svc120Item2: 'Festivals, Kneipen, volle Events',
    svc120Item3: 'Flexible Setlist je nach Stimmung',
    svc120Item4: 'Soundcheck + Auf-/Abbau inklusive',
    svc120Item5: 'Wunschsongs möglich',
    svcPriceOnRequest: 'Preis auf Anfrage',
    svcCustomOffer: 'Individuelles Angebot',

    svcExtraTravel: 'Weite Anfahrt? Kein Problem',
    svcExtraPA: 'Open Air mit eigener PA möglich',
    svcExtraSpecial: 'Sonderwünsche auf Anfrage',
    svcExtraEncore: 'Zugabe möglich',

    // Tech
    techTitle: 'Technik & Setup',
    techSubtitle: 'Plug & Play – stressfrei für jeden Veranstalter',
    techPlugPlay: 'Plug & Play',
    techPlugPlayDesc: 'Ich liefere ein fertig abgemischtes Stereo-Signal (Vocals & Gitarre) aus meinem TC Helicon direkt an euer Mischpult. Kein aufwendiger Soundcheck nötig.',
    techInEar: 'In-Ear Monitoring',
    techInEarDesc: 'Mache ich selbst. Ich benötige keine Monitore auf der Bühne – weniger Technik, weniger Aufwand für euch.',
    techAutark: 'Komplett Autark',
    techAutarkDesc: 'Keine PA vor Ort? Kein Problem. Ich bringe auf Wunsch meinen eigenen Verstärker mit und brauche nur eine Steckdose.',
    techRiderDownload: 'Technical Rider herunterladen',

    // Repertoire
    repTitle: 'Repertoire',
    repSubtitle: 'Aktuell 28 Songs – Repertoire wird stetig erweitert',
    repOriginals: 'Original-Kompositionen',
    repOriginalCount: '15 Songs',
    repBallads: 'Balladen & Emotionale Songs',
    repUptempo: 'Uptempo & Pop-Rock',
    repCovers: 'Sorgfältig Ausgewählte Covers',
    repCoverCount: '13 Songs',
    repGerman: 'Deutsch',
    repEnglish: 'Englisch',
    repPolish: 'Polnisch',
    repNote: 'Ich wechsle flexibel zwischen Original-Songs und Covers – je nach Publikum, Stimmung und Veranstaltungstyp. Repertoire wird laufend erweitert.',

    // Gallery
    galLabel: 'Galerie',
    galTitle: 'Pressefotos',
    galSubtitle: 'Hochauflösend & einsatzbereit für Ihre Promotion',
    galDownloadHint: 'Klicken Sie auf ein Foto zum Herunterladen.',

    // Booking Form
    formLabel: 'Kontakt',
    formTitle: 'Booking Anfrage',
    formSubtitle: 'Senden Sie mir eine kurze Nachricht. Ich melde mich schnellstmöglich.',
    formName: 'Ihr Name',
    formNamePlaceholder: 'Vorname Nachname',
    formEmail: 'E-Mail',
    formEmailPlaceholder: 'ihre@email.de',
    formEventType: 'Veranstaltungstyp',
    formEventTypeDefault: 'Bitte wählen...',
    formEventWedding: 'Hochzeit',
    formEventBar: 'Kneipe / Bar',
    formEventPrivate: 'Privatanlass',
    formEventCorporate: 'Corporate Event',
    formEventFestival: 'Festival',
    formEventOther: 'Sonstiges',
    formDate: 'Gewünschtes Datum',
    formLocation: 'Ort / Venue',
    formLocationPlaceholder: 'Stadt, Venue-Name',
    formMessage: 'Nachricht',
    formMessagePlaceholder: 'Erzählen Sie mir mehr über Ihre Veranstaltung...',
    formSubmit: 'Anfrage senden',
    formSending: 'Wird gesendet...',
    formCallDirect: 'Oder direkt anrufen',
    formSuccessTitle: 'Anfrage gesendet!',
    formSuccessText: 'Vielen Dank für Ihre Nachricht. Ich melde mich schnellstmöglich bei Ihnen.',
    formSuccessAnother: 'Weitere Anfrage senden',
    formErrorDefault: 'Etwas ist schiefgelaufen.',
    formErrorConnection: 'Verbindungsfehler. Bitte versuchen Sie es später.',

    // Footer
    footerBackToTop: 'Nach oben ↑',

    // Mobile CTA
    mobileCtaBook: 'Jetzt buchen',
    mobileCtaCallLabel: 'Anrufen',
  },

  en: {
    // Nav
    navAbout: 'About',
    navMusic: 'Music',
    navLive: 'Live',
    navReferences: 'References',
    navServices: 'Services',
    navPhotos: 'Photos',
    navBooking: 'Booking',
    menuAriaLabel: 'Open menu',

    // Hero
    heroBadge: 'Booking & EPK',
    heroSubtitle: 'Slavic Pop-Rock with acoustic guitar.\nPassionate, honest, unforgettable.',
    heroCtaBook: 'Book now',
    heroCtaListen: 'Listen to music',
    heroLanguages: 'German · Polish · English',
    heroGuitar: 'Solo Acoustic Guitar',
    heroRepertoire: '28 Songs Repertoire',
    heroScroll: 'Scroll',

    // About
    aboutLabel: 'About me',
    aboutTitle1: 'Who is',
    aboutTitle2: 'Dawid Faith?',
    aboutP1: 'A musician who bridges the cultural gap between Germany and Poland. With songs in German and Polish, I create emotional connections that resonate long after the last chord.',
    aboutP2: 'My sound: Slavic Pop-Rock with authentic acoustic guitar. Heartfelt ballads, catchy pop-rock songs – always played live, always from the heart.',
    aboutQuote: 'Authentic live performance without compromise. Just guitar, voice and a whole lot of passion for great music.',

    // USP
    uspLabel: 'Unique Selling Point',
    uspTitle1: 'The Melancholy of Poland',
    uspTitle2: 'meets modern Pop-Rock influences',
    uspDesc: 'Not just another singer-songwriter with an acoustic guitar. Slavic Pop-Rock combines emotional Polish ballads with German pop-rock and English classics – a sound that is truly one of a kind.',
    uspTag1: 'Polish Melancholy',
    uspTag2: 'German Pop-Rock',
    uspTag3: 'English Classics',
    uspTag4: 'Authentic Acoustic',

    // Music
    musicLabel: 'Music',
    musicTitle: 'My Songs',
    musicSubtitle: 'Video preview of my original compositions',
    musicNowPlaying: 'Now playing',
    musicVideoOpen: 'Watch video',
    musicVideoClose: 'Close video',

    // Videos
    videosLabel: 'Live Performance',
    videosTitle: 'Live Performances',
    videosSubtitle: 'Authentic full-length live performances',

    // References
    refLabel: 'References',
    refTitle: 'Previous Performances',
    refSubtitle: 'Experience from street to stage',
    refQuote: 'Dawid captivated everyone with his voice and guitar. Authentic, passionate and incredibly electrifying.',
    refQuoteCite: '— Feedback from a private event in Rostock',
    refCardLiveLabel: 'Live',
    refCardLive: 'Private Events',
    refCardLiveLocation: 'Rostock & Area',
    refCardStreetLabel: 'Street',
    refCardStreet: 'Street Music Sessions',
    refCardStreetLocation: 'City Centers & Pedestrian Zones',
    refCardEventsLabel: 'Events',
    refCardEvents: 'Private Functions',
    refCardEventsLocation: 'Celebrations & Garden Parties',
    refCardGastroLabel: 'Gastro',
    refCardGastro: 'Pubs & Bars',
    refCardGastroLocation: 'Local Live Music Nights',

    // Services
    svcLabel: 'Services',
    svcTitle: 'What I Offer',
    svcSubtitle: 'Flexible sets for every event',
    svcMostChosen: 'Most Popular',
    svc30Title: 'Opener',
    svc30Item1: '5–6 Songs',
    svc30Item2: 'Perfect for aperitifs, receptions & warm-ups',
    svc30Item3: 'Mix of originals & covers',
    svc30Item4: 'Sound check included',
    svc60Title: 'Full Set',
    svc60Item1: '12–14 Songs',
    svc60Item2: 'Club night, venue, open air',
    svc60Item3: 'Continuous flow with dynamic arc',
    svc60Item4: 'Sound check + setup/teardown included',
    svc60Item5: 'Song requests possible by arrangement',
    svc120Title: 'Full Evening',
    svc120Item1: '28 Songs (2 sets with break)',
    svc120Item2: 'Festivals, pubs, full events',
    svc120Item3: 'Flexible setlist based on the mood',
    svc120Item4: 'Sound check + setup/teardown included',
    svc120Item5: 'Song requests possible',
    svcPriceOnRequest: 'Price on request',
    svcCustomOffer: 'Individual offer',

    svcExtraTravel: 'Long distance? No problem',
    svcExtraPA: 'Open air with own PA possible',
    svcExtraSpecial: 'Special requests on inquiry',
    svcExtraEncore: 'Encore possible',

    // Tech
    techTitle: 'Tech & Setup',
    techSubtitle: 'Plug & Play – stress-free for every organizer',
    techPlugPlay: 'Plug & Play',
    techPlugPlayDesc: 'I deliver a ready-mixed stereo signal (vocals & guitar) from my TC Helicon directly to your mixer. No complex sound check needed.',
    techInEar: 'In-Ear Monitoring',
    techInEarDesc: 'I handle it myself. I don\'t need stage monitors – less gear, less effort for you.',
    techAutark: 'Fully Self-Sufficient',
    techAutarkDesc: 'No PA on site? No problem. I bring my own amplifier on request and just need a power outlet.',
    techRiderDownload: 'Download Technical Rider',

    // Repertoire
    repTitle: 'Repertoire',
    repSubtitle: 'Currently 28 songs – repertoire is constantly growing',
    repOriginals: 'Original Compositions',
    repOriginalCount: '15 Songs',
    repBallads: 'Ballads & Emotional Songs',
    repUptempo: 'Uptempo & Pop-Rock',
    repCovers: 'Carefully Selected Covers',
    repCoverCount: '13 Songs',
    repGerman: 'German',
    repEnglish: 'English',
    repPolish: 'Polish',
    repNote: 'I flexibly alternate between originals and covers – depending on the audience, mood and event type. Repertoire is being constantly expanded.',

    // Gallery
    galLabel: 'Gallery',
    galTitle: 'Press Photos',
    galSubtitle: 'High resolution & ready for your promotion',
    galDownloadHint: 'Click on a photo to download.',

    // Booking Form
    formLabel: 'Contact',
    formTitle: 'Booking Request',
    formSubtitle: 'Send me a short message. I\'ll get back to you as soon as possible.',
    formName: 'Your Name',
    formNamePlaceholder: 'First Last Name',
    formEmail: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formEventType: 'Event Type',
    formEventTypeDefault: 'Please select...',
    formEventWedding: 'Wedding',
    formEventBar: 'Pub / Bar',
    formEventPrivate: 'Private Event',
    formEventCorporate: 'Corporate Event',
    formEventFestival: 'Festival',
    formEventOther: 'Other',
    formDate: 'Preferred Date',
    formLocation: 'Location / Venue',
    formLocationPlaceholder: 'City, Venue Name',
    formMessage: 'Message',
    formMessagePlaceholder: 'Tell me more about your event...',
    formSubmit: 'Send Request',
    formSending: 'Sending...',
    formCallDirect: 'Or call directly',
    formSuccessTitle: 'Request sent!',
    formSuccessText: 'Thank you for your message. I\'ll get back to you as soon as possible.',
    formSuccessAnother: 'Send another request',
    formErrorDefault: 'Something went wrong.',
    formErrorConnection: 'Connection error. Please try again later.',

    // Footer
    footerBackToTop: 'Back to top ↑',

    // Mobile CTA
    mobileCtaBook: 'Book now',
    mobileCtaCallLabel: 'Call',
  },

  pl: {
    // Nav
    navAbout: 'O mnie',
    navMusic: 'Muzyka',
    navLive: 'Live',
    navReferences: 'Referencje',
    navServices: 'Oferta',
    navPhotos: 'Zdjęcia',
    navBooking: 'Booking',
    menuAriaLabel: 'Otwórz menu',

    // Hero
    heroBadge: 'Booking & EPK',
    heroSubtitle: 'Słowiański Pop-Rock z gitarą akustyczną.\nPełen pasji, szczery, niezapomniany.',
    heroCtaBook: 'Zarezerwuj',
    heroCtaListen: 'Posłuchaj muzyki',
    heroLanguages: 'Niemiecki · Polski · Angielski',
    heroGuitar: 'Solo gitara akustyczna',
    heroRepertoire: '28 utworów w repertuarze',
    heroScroll: 'Scroll',

    // About
    aboutLabel: 'O mnie',
    aboutTitle1: 'Kim jest',
    aboutTitle2: 'Dawid Faith?',
    aboutP1: 'Muzyk, który łączy kultury Niemiec i Polski. Piosenkami po niemiecku i polsku tworzę emocjonalne więzi, które zostają na długo.',
    aboutP2: 'Mój dźwięk: Słowiański Pop-Rock z autentyczną gitarą akustyczną. Ballady pełne uczuć, chwytliwe piosenki pop-rockowe – zawsze grane na żywo, zawsze z serca.',
    aboutQuote: 'Autentyczny występ na żywo bez kompromisów. Tylko gitara, głos i mnóstwo pasji do dobrej muzyki.',

    // USP
    uspLabel: 'Unikalna cecha',
    uspTitle1: 'Melancholia Polski',
    uspTitle2: 'spotyka nowoczesne wpływy Pop-Rocka',
    uspDesc: 'To nie kolejny piosenkarz z gitarą akustyczną. Słowiański Pop-Rock łączy emocjonalne polskie ballady z niemieckim pop-rockiem i angielskimi klasykami – dźwięk, jakiego nie znajdziesz nigdzie indziej.',
    uspTag1: 'Polska melancholia',
    uspTag2: 'Niemiecki Pop-Rock',
    uspTag3: 'Angielskie klasyki',
    uspTag4: 'Autentyczna akustyka',

    // Music
    musicLabel: 'Muzyka',
    musicTitle: 'Moje utwory',
    musicSubtitle: 'Podgląd wideo moich autorskich kompozycji',
    musicNowPlaying: 'Teraz gra',
    musicVideoOpen: 'Obejrzyj wideo',
    musicVideoClose: 'Zamknij wideo',

    // Videos
    videosLabel: 'Występy na żywo',
    videosTitle: 'Występy Live',
    videosSubtitle: 'Autentyczne występy na żywo w pełnej długości',

    // References
    refLabel: 'Referencje',
    refTitle: 'Dotychczasowe występy',
    refSubtitle: 'Doświadczenie od ulicy po scenę',
    refQuote: 'Dawid oczarował wszystkich swoim głosem i gitarą. Autentyczny, pełen pasji i niesamowicie porywający.',
    refQuoteCite: '— Opinia po prywatnym wydarzeniu w Rostocku',
    refCardLiveLabel: 'Live',
    refCardLive: 'Prywatne wydarzenia',
    refCardLiveLocation: 'Rostock i okolice',
    refCardStreetLabel: 'Ulica',
    refCardStreet: 'Muzyka uliczna',
    refCardStreetLocation: 'Centra miast i deptaki',
    refCardEventsLabel: 'Eventy',
    refCardEvents: 'Imprezy prywatne',
    refCardEventsLocation: 'Przyjęcia i garden party',
    refCardGastroLabel: 'Gastro',
    refCardGastro: 'Puby i bary',
    refCardGastroLocation: 'Lokalne wieczory z muzyką na żywo',

    // Services
    svcLabel: 'Oferta',
    svcTitle: 'Co oferuję',
    svcSubtitle: 'Elastyczne sety na każde wydarzenie',
    svcMostChosen: 'Najpopularniejszy',
    svc30Title: 'Opener',
    svc30Item1: '5–6 utworów',
    svc30Item2: 'Idealny na aperitif, recepcje i powitania',
    svc30Item3: 'Mix autorskich i coverów',
    svc30Item4: 'Próba dźwięku w cenie',
    svc60Title: 'Full Set',
    svc60Item1: '12–14 utworów',
    svc60Item2: 'Wieczór klubowy, centrum kultury, open air',
    svc60Item3: 'Ciągły flow z dynamicznym łukiem',
    svc60Item4: 'Próba dźwięku + montaż/demontaż w cenie',
    svc60Item5: 'Utwór na życzenie po uzgodnieniu',
    svc120Title: 'Cały wieczór',
    svc120Item1: '28 utworów (2 sety z przerwą)',
    svc120Item2: 'Festiwale, puby, duże eventy',
    svc120Item3: 'Elastyczna setlista według nastroju',
    svc120Item4: 'Próba dźwięku + montaż/demontaż w cenie',
    svc120Item5: 'Utwory na życzenie',
    svcPriceOnRequest: 'Cena na zapytanie',
    svcCustomOffer: 'Indywidualna oferta',

    svcExtraTravel: 'Daleki dojazd? Żaden problem',
    svcExtraPA: 'Open air z własnym nagłośnieniem',
    svcExtraSpecial: 'Specjalne życzenia na zapytanie',
    svcExtraEncore: 'Bis możliwy',

    // Tech
    techTitle: 'Technika i setup',
    techSubtitle: 'Plug & Play – bezstresowo dla każdego organizatora',
    techPlugPlay: 'Plug & Play',
    techPlugPlayDesc: 'Dostarczam gotowy, zmiksowany sygnał stereo (wokal i gitara) z mojego TC Helicon prosto do waszego miksera. Bez skomplikowanej próby dźwięku.',
    techInEar: 'In-Ear Monitoring',
    techInEarDesc: 'Zajmuję się tym sam. Nie potrzebuję monitorów scenicznych – mniej sprzętu, mniej pracy dla was.',
    techAutark: 'W pełni niezależny',
    techAutarkDesc: 'Brak nagłośnienia na miejscu? Żaden problem. Na życzenie przynoszę własny wzmacniacz – potrzebuję tylko gniazdka.',
    techRiderDownload: 'Pobierz Technical Rider',

    // Repertoire
    repTitle: 'Repertuar',
    repSubtitle: 'Aktualnie 28 utworów – repertuar stale się rozwija',
    repOriginals: 'Autorskie kompozycje',
    repOriginalCount: '15 utworów',
    repBallads: 'Ballady i utwory emocjonalne',
    repUptempo: 'Uptempo & Pop-Rock',
    repCovers: 'Starannie wybrane covery',
    repCoverCount: '13 utworów',
    repGerman: 'Niemiecki',
    repEnglish: 'Angielski',
    repPolish: 'Polski',
    repNote: 'Elastycznie zmieniam między autorskimi utworami a coverami – w zależności od publiczności, nastroju i rodzaju imprezy. Repertuar jest ciągle poszerzany.',

    // Gallery
    galLabel: 'Galeria',
    galTitle: 'Zdjęcia prasowe',
    galSubtitle: 'Wysoka rozdzielczość, gotowe do wykorzystania w promocji',
    galDownloadHint: 'Kliknij na zdjęcie, aby pobrać.',

    // Booking Form
    formLabel: 'Kontakt',
    formTitle: 'Zapytanie o booking',
    formSubtitle: 'Wyślij mi krótką wiadomość. Odpowiem tak szybko, jak to możliwe.',
    formName: 'Imię i nazwisko',
    formNamePlaceholder: 'Imię Nazwisko',
    formEmail: 'E-mail',
    formEmailPlaceholder: 'twoj@email.pl',
    formEventType: 'Rodzaj wydarzenia',
    formEventTypeDefault: 'Proszę wybrać...',
    formEventWedding: 'Ślub / Wesele',
    formEventBar: 'Pub / Bar',
    formEventPrivate: 'Wydarzenie prywatne',
    formEventCorporate: 'Impreza firmowa',
    formEventFestival: 'Festiwal',
    formEventOther: 'Inne',
    formDate: 'Preferowana data',
    formLocation: 'Miejsce / Lokal',
    formLocationPlaceholder: 'Miasto, nazwa lokalu',
    formMessage: 'Wiadomość',
    formMessagePlaceholder: 'Opowiedz mi więcej o swoim wydarzeniu...',
    formSubmit: 'Wyślij zapytanie',
    formSending: 'Wysyłanie...',
    formCallDirect: 'Lub zadzwoń bezpośrednio',
    formSuccessTitle: 'Zapytanie wysłane!',
    formSuccessText: 'Dziękuję za wiadomość. Odpowiem tak szybko, jak to możliwe.',
    formSuccessAnother: 'Wyślij kolejne zapytanie',
    formErrorDefault: 'Coś poszło nie tak.',
    formErrorConnection: 'Błąd połączenia. Spróbuj ponownie później.',

    // Footer
    footerBackToTop: 'Do góry ↑',

    // Mobile CTA
    mobileCtaBook: 'Zarezerwuj',
    mobileCtaCallLabel: 'Zadzwoń',
  },
};

export default BookingPageTrans;
