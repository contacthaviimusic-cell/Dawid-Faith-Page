type TranslationType = {
  [key in 'de' | 'en' | 'pl']: {
    title: string;
    subtitle: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    spotify: string;
    bandcamp: string;
    email: string;
    aboutTitle: string;
    aboutText: string;
    stayConnected: string;
    newsletterDesc: string;
    subscribe: string;
    professionalRequests: string;
    emailCopySuccess: string;
    followMe: string;
    copyEmail: string;
    close: string;
  }
};

const SocialWidgetTrans: TranslationType = {
  de: {
    title: 'Dawid Faith',
    subtitle: 'Künstler • Visionär',
    instagram: 'Stories & Updates',
    facebook: 'Community & News',
    tiktok: 'Kurzvideos',
    youtube: 'Musik Videos & Behind the Scenes',
    spotify: 'Musik & Playlists',
    bandcamp: 'Musik kaufen',
    email: 'Professionelle Anfragen',
    aboutTitle: 'Über Dawid Faith',
    aboutText: 'Singer-Songwriter mit einer Leidenschaft für ehrliche, emotionale Musik. Folge mir für neue Songs, Konzerte und Einblicke hinter die Kulissen.',
    stayConnected: 'Stay Connected',
    newsletterDesc: 'Erhalte Updates zu neuen Songs und Konzerten',
    subscribe: 'Newsletter abonnieren',
    professionalRequests: 'Professionelle Anfragen',
    emailCopySuccess: '✓ E-Mail in Zwischenablage kopiert!',
    followMe: 'Folge mir auf Social Media',
    copyEmail: 'E-Mail kopieren',
    close: 'Schließen'
  },
  en: {
    title: 'Dawid Faith',
    subtitle: 'Artist • Visionary',
    instagram: 'Stories & Updates',
    facebook: 'Community & News',
    tiktok: 'Short Videos',
    youtube: 'Music Videos & Behind the Scenes',
    spotify: 'Music & Playlists',
    bandcamp: 'Buy music',
    email: 'Professional Inquiries',
    aboutTitle: 'About Dawid Faith',
    aboutText: 'Singer-songwriter with a passion for honest, emotional music. Follow along for new songs, concerts and behind-the-scenes insights.',
    stayConnected: 'Stay Connected',
    newsletterDesc: 'Get updates about new songs and concerts',
    subscribe: 'Subscribe to newsletter',
    professionalRequests: 'Professional Inquiries',
    emailCopySuccess: '✓ Email copied to clipboard!',
    followMe: 'Follow me on social media',
    copyEmail: 'Copy email',
    close: 'Close'
  },
  pl: {
    title: 'Dawid Faith',
    subtitle: 'Artysta • Wizjoner',
    instagram: 'Relacje & Aktualizacje',
    facebook: 'Społeczność & Aktualności',
    tiktok: 'Krótkie filmy',
    youtube: 'Teledyski & kulisy',
    spotify: 'Muzyka i playlisty',
    bandcamp: 'Kup muzykę',
    email: 'Zapytania zawodowe',
    aboutTitle: 'O Dawidzie Faith',
    aboutText: 'Piosenkarz i autor tekstów z pasją do szczerej, emocjonalnej muzyki. Śledź mnie, aby być na bieżąco z nowymi utworami, koncertami i tym, co dzieje się za kulisami.',
    stayConnected: 'Pozostań w kontakcie',
    newsletterDesc: 'Otrzymuj aktualizacje o nowych piosenkach i koncertach',
    subscribe: 'Zapisz się do newslettera',
    professionalRequests: 'Zapytania zawodowe',
    followMe: 'Obserwuj mnie w mediach społecznościowych',
    emailCopySuccess: '✓ E-mail skopiowany do schowka!',
    copyEmail: 'Skopiuj email',
    close: 'Zamknij'
  }
};

export default SocialWidgetTrans;
