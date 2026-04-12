'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const [currentSong, setCurrentSong] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingFormData),
      });

      if (res.ok) {
        setFormStatus('success');
        setBookingFormData({ name: '', email: '', eventType: '', date: '', location: '', message: '' });
      } else {
        const data = await res.json();
        setFormError(data.error || 'Etwas ist schiefgelaufen.');
        setFormStatus('error');
      }
    } catch {
      setFormError('Verbindungsfehler. Bitte versuchen Sie es später.');
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['hero', 'about', 'music', 'videos', 'services', 'gallery', 'booking'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const songs = [
    { name: 'Katze', file: '/booking/music/Katze_V4.mp3', duration: '3:45', image: '/musik/katze/photo_2026-01-06_14-31-47.jpg' },
    { name: 'Niebianski Groove', file: '/booking/music/Niebianski Groove.mp3', duration: '4:12', image: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png' },
    { name: 'Maria', file: '/booking/music/Maria.mp3', duration: '3:58', image: '/musik/maria/Maria.jpg' }
  ];

  const videos = [
    { name: 'Katze - Live Performance', file: '/booking/videos/Katze 1.mp4' },
    { name: 'Niebianski Groove - Live', file: '/booking/videos/Niebianski Groove.mp4' }
  ];

  const fotos = [
    { src: '/booking/pressefotos/Dawid Faith.jpg', alt: 'Dawid Faith - Portrait' },
    { src: '/booking/pressefotos/Dawid und Gruppe.jpg', alt: 'Dawid Faith mit Gruppe' }
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'about', label: 'Über mich' },
    { id: 'music', label: 'Musik' },
    { id: 'videos', label: 'Live' },
    { id: 'services', label: 'Leistungen' },
    { id: 'gallery', label: 'Fotos' },
    { id: 'booking', label: 'Booking' },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">

      {/* STICKY NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-lg border-b border-amber-900/30 shadow-lg shadow-black/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <button onClick={() => scrollTo('hero')} className={`font-black text-lg transition-colors ${scrolled ? 'text-amber-400' : 'text-white/0 pointer-events-none'}`}>
            DF
          </button>
          <div className={`flex gap-1 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={fotos[0].src}
            alt="Dawid Faith"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
        </div>

        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="mb-6">
                <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] font-semibold">Artist Profile</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                Dawid<br/>
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Faith</span>
              </h1>

              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
                Authentischer Live-Sound für Clubs, Festivals, Kulturveranstaltungen und private Events. Solo Akustik-Gitarre direkt vom Herzen – leidenschaftlich, ehrlich, unvergesslich.
              </p>

              <div className="space-y-3 mb-10">
                <p className="flex items-center gap-3 text-slate-300">
                  <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                  Deutsch, Polnische & Englische Songs
                </p>
                <p className="flex items-center gap-3 text-slate-300">
                  <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                  Sorgfältig ausgewählte Cover
                </p>
                <p className="flex items-center gap-3 text-slate-300">
                  <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                  Solo Akustik-Gitarre
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollTo('music')}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/25"
                >
                  Musik anhören
                </button>
                <button 
                  onClick={() => scrollTo('booking')}
                  className="border border-white/20 hover:border-amber-400/50 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:bg-white/5"
                >
                  Jetzt buchen
                </button>
              </div>
            </div>

            {/* Professional Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">Genre</p>
                <p className="text-xl font-black leading-tight">Slavischer Pop-Rock</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">Sprachen</p>
                <p className="text-xl font-black leading-tight">DE / PL / EN</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">Format</p>
                <p className="text-xl font-black leading-tight">Solo Akustik</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">Repertoire</p>
                <p className="text-xl font-black leading-tight">20 Songs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-500 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[28rem] rounded-2xl overflow-hidden group">
              <Image
                src={fotos[1].src}
                alt="Dawid Faith mit Gruppe"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div>
              <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-6 block">Über mich</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Wer ist<br/><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Dawid Faith?</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                Ein Musiker, der die Kulturgrenzen zwischen Deutschland und Polen überbrückt. Mit Songs in Deutsch und Polnisch schaffe ich emotionale Verbindungen, die lange nachwirken.
              </p>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                Mein Sound: Slavischer Pop-Rock mit authentischer Akustik-Gitarre. Balladen mit Gefühl, eingängige Pop-Rock-Songs – immer live gespielt, immer vom Herzen.
              </p>
              <p className="text-slate-500 italic border-l-2 border-amber-500/40 pl-4">
                Echte Live-Performance ohne Kompromisse. Nur Gitarre, Stimme und eine Menge Leidenschaft für gute Musik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO PLAYER SECTION */}
      <section id="music" className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Musik</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">Höre meine Songs</h2>
            <p className="text-slate-500">Meine Original-Kompositionen und handverlesene Covers</p>
          </div>

          {/* Main Player */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-16 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              {/* Current Song Image */}
              <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl">
                <Image
                  src={songs[currentSong].image}
                  alt={songs[currentSong].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              {/* Player Controls */}
              <div className="flex-1 w-full">
                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] mb-1">Jetzt spielen</p>
                <h3 className="text-3xl font-black mb-4 text-white">
                  {songs[currentSong].name}
                </h3>
                <audio 
                  key={currentSong}
                  className="w-full [&::-webkit-media-controls-panel]:bg-slate-800 [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-white" 
                  controls 
                  controlsList="nodownload"
                >
                  <source src={songs[currentSong].file} type="audio/mpeg" />
                </audio>
                <p className="text-slate-500 text-sm mt-3">{songs[currentSong].duration}</p>
              </div>
            </div>

            {/* Track Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {songs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSong(idx)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                    currentSong === idx
                      ? 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    currentSong === idx ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-slate-500'
                  }`}>
                    {currentSong === idx ? '▶' : idx + 1}
                  </span>
                  {song.name}
                </button>
              ))}
            </div>
          </div>

          {/* Song Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {songs.map((song, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer"
                onClick={() => setCurrentSong(idx)}
              >
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 shadow-xl">
                  <Image
                    src={song.image}
                    alt={song.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentSong === idx
                        ? 'bg-amber-500 text-black scale-100'
                        : 'bg-white/20 backdrop-blur-sm text-white scale-0 group-hover:scale-100'
                    }`}>
                      <span className="text-lg ml-0.5">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-black text-lg">{song.name}</h4>
                    <p className="text-slate-400 text-sm">{song.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="videos" className="py-24 md:py-32 bg-black relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Live Performance</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">Live Auftritte</h2>
            <p className="text-slate-500">Authentische Live-Aufführungen in voller Länge</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, idx) => (
              <div key={idx} className="group">
                <p className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  {video.name}
                </p>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <video className="w-full aspect-video bg-black" controls controlsList="nodownload">
                    <source src={video.file} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / PACKAGES */}
      <section id="services" className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-amber-500/5 rounded-full blur-[120px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Leistungen</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">Was ich anbiete</h2>
            <p className="text-slate-500">Flexible Sets für jede Veranstaltung</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* 30 Minuten */}
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-white/20 group">
              <div className="text-4xl font-black mb-2 text-slate-500 group-hover:text-slate-300 transition-colors">30 min</div>
              <h3 className="text-lg font-bold mb-6 text-slate-300">Kurz & prägnant</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>5-6 Songs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>Perfekt für Apéros & Empfänge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>Mix aus Original & Cover</span>
                </li>
              </ul>
            </div>

            {/* 1 Stunde - Featured */}
            <div className="border border-amber-500/30 rounded-2xl p-8 bg-amber-500/[0.04] relative group hover:border-amber-500/50 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-black text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">Meistgewählt</span>
              </div>
              <div className="text-4xl font-black mb-2 text-amber-400">1 h</div>
              <h3 className="text-lg font-bold mb-6">Standard</h3>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>12-14 Songs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>Perfekt für Hochzeiten & Events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>Volle Setlist mit Flow</span>
                </li>
              </ul>
            </div>

            {/* 2 Stunden */}
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-white/20 group">
              <div className="text-4xl font-black mb-2 text-slate-500 group-hover:text-slate-300 transition-colors">2 h</div>
              <h3 className="text-lg font-bold mb-6 text-slate-300">Vollständig</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>20 Songs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>Kneipen & Festivals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>Mit Pause + Variabilität</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Repertoire Overview */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span>
              Repertoire
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">Original-Kompositionen</h4>
                <p className="text-slate-500 mb-5">Deutsch & Polnische Songs mit emotionalen Balladen und eingängigen Pop-Rock-Nummern:</p>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Aladine
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Niebianski Groove
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Słabość
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Jupiter
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Katze
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Huhu
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Schiffchen
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Zacznij
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Mambo
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Frei sein
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Maria
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Rapu Tapu Tak Ma
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Mit dir sein
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Holy Children
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Monster
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">Sorgfältig Ausgewählte Covers</h4>
                <p className="text-slate-500 mb-5">Klassiker & Hits in Deutsch, Polnisch und Englisch:</p>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Pocahontas <span className="text-slate-500">(AnnenMayKantereit)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    This is the Life <span className="text-slate-500">(Amy Macdonald)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Ring of Fire <span className="text-slate-500">(Johnny Cash)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Country Roads <span className="text-slate-500">(John Denver)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Weź nie pytaj <span className="text-slate-500">(Paweł Domagała)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Verdammt ich lieb dich <span className="text-slate-500">(Matthias Reim)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Kompliment <span className="text-slate-500">(Sportfreunde Stiller)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Nie allein <span className="text-slate-500">(Kaffkiez)</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-8 pt-8 border-t border-white/10">
              Ich wechsle flexibel zwischen Original-Songs und Covers – je nach Publikum, Stimmung und Veranstaltungstyp.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / GALLERY */}
      <section id="gallery" className="py-24 md:py-32 bg-black relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Galerie</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">Pressefotos</h2>
            <p className="text-slate-500">Hochauflösend & einsatzbereit für Ihre Promotion</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {fotos.map((foto, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden h-96 cursor-pointer">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-semibold text-sm">{foto.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href="https://drive.google.com/drive/folders/DEIN_FOLDER_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              Presse-Paket (EPK) herunterladen
              <span>↓</span>
            </a>
            <a 
              href="mailto:dawid.faith@gmail.com?subject=Pressefotos in hoher Auflösung anfordern"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              Oder per E-Mail anfordern
              <span className="text-amber-400">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="mb-16 text-center">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Kontakt</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">Booking Anfrage</h2>
            <p className="text-slate-500">Senden Sie mir eine kurze Nachricht. Ich melde mich schnellstmöglich.</p>
          </div>

          {formStatus === 'success' ? (
            <div className="bg-white/[0.03] border border-amber-500/30 rounded-2xl p-12 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-400 text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-black mb-3">Anfrage gesendet!</h3>
              <p className="text-slate-400 mb-8">Vielen Dank für Ihre Nachricht. Ich melde mich schnellstmöglich bei Ihnen.</p>
              <button
                onClick={() => setFormStatus('idle')}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Weitere Anfrage senden
              </button>
            </div>
          ) : (
          <form className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm" onSubmit={handleBookingSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Ihr Name</label>
                <input 
                  type="text" 
                  placeholder="Vorname Nachname"
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">E-Mail</label>
                <input 
                  type="email" 
                  placeholder="ihre@email.de"
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Veranstaltungstyp</label>
                <select 
                  value={bookingFormData.eventType}
                  onChange={(e) => setBookingFormData({...bookingFormData, eventType: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                >
                  <option value="">Bitte wählen...</option>
                  <option>Hochzeit</option>
                  <option>Kneipe / Bar</option>
                  <option>Privatanlass</option>
                  <option>Corporate Event</option>
                  <option>Festival</option>
                  <option>Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Gewünschtes Datum</label>
                <input 
                  type="date" 
                  value={bookingFormData.date}
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Ort / Venue</label>
              <input 
                type="text" 
                placeholder="Stadt, Venue-Name"
                value={bookingFormData.location}
                onChange={(e) => setBookingFormData({...bookingFormData, location: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Nachricht</label>
              <textarea 
                placeholder="Erzählen Sie mir mehr über Ihre Veranstaltung..."
                value={bookingFormData.message}
                onChange={(e) => setBookingFormData({...bookingFormData, message: e.target.value})}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
              ></textarea>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {formError}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <button 
                type="submit"
                disabled={formStatus === 'sending'}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-black font-bold px-10 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                {formStatus === 'sending' ? 'Wird gesendet...' : 'Anfrage senden'}
                {formStatus !== 'sending' && <span>→</span>}
              </button>
              <a 
                href="tel:+4915237673661"
                className="border border-white/15 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/5 hover:border-white/25 transition-all flex items-center justify-center gap-2"
              >
                Oder direkt anrufen
              </a>
            </div>
          </form>
          )}

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <a href="mailto:dawid.faith@gmail.com" className="hover:text-amber-400 transition-colors">
              dawid.faith@gmail.com
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a href="tel:+4915237673661" className="hover:text-amber-400 transition-colors">
              +49 152 3767 3661
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black relative py-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2026 Dawid Faith</p>
          <button 
            onClick={() => scrollTo('hero')}
            className="text-slate-600 hover:text-amber-400 text-sm transition-colors"
          >
            Nach oben ↑
          </button>
        </div>
      </footer>

    </div>
  );
}
