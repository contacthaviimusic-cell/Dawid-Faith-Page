'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import BookingPageTrans from '@/lib/translations/BookingPageTrans';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from '@/components/FlagIcon';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [currentSong, setCurrentSong] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
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
  const [menuOpen, setMenuOpen] = useState(false);

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
        setFormError(data.error || t.formErrorDefault);
        setFormStatus('error');
      }
    } catch {
      setFormError(t.formErrorConnection);
      setFormStatus('error');
    }
  };

  // Language sync
  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
    } catch {}
    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de' | 'en' | 'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }
    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  // Outreach ref tracking
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref || !/^[\w-]+$/.test(ref)) return;
    fetch(`/api/outreach/${ref}`, { method: 'POST' }).catch(() => {});
  }, [searchParams]);

  // Broadcast language change
  useEffect(() => {
    try {
      localStorage.setItem('site-lang', lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent('site-lang-changed', { detail: { lang } }));
    } catch {}
  }, [lang]);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = BookingPageTrans[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['hero', 'about', 'music', 'videos', 'referenzen', 'services', 'gallery', 'booking'];
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
    { src: '/booking/pressefotos/Dawid und Gruppe.jpg', alt: 'Dawid Faith mit Gruppe' },
    { src: '/booking/pressefotos/Dawid Faith Tatoo.jpg', alt: 'Dawid Faith - Tattoo' },
    { src: '/booking/pressefotos/Dawid Faith black.jpg', alt: 'Dawid Faith - Black' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 56; // h-14 = 3.5rem = 56px
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/dawidfaith/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572473614500', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@dawidfaith', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
    { name: 'YouTube', url: 'https://www.youtube.com/@dawidfaith', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  ];

  const navItems = [
    { id: 'about', label: t.navAbout },
    { id: 'music', label: t.navMusic },
    { id: 'videos', label: t.navLive },
    { id: 'referenzen', label: t.navReferences },
    { id: 'services', label: t.navServices },
    { id: 'gallery', label: t.navPhotos },
    { id: 'booking', label: t.navBooking },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">

      {/* STICKY NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-lg border-b border-amber-900/30 shadow-lg shadow-black/50' 
          : 'bg-black/70 backdrop-blur-md md:bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <button onClick={() => scrollTo('hero')} className={`font-black text-lg transition-colors ${scrolled ? 'text-amber-400' : 'text-amber-400 md:text-white/0 md:pointer-events-none'}`}>
            DF
          </button>
          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-1 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
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
          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((s) => !s)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-full border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <FlagForLang lang={lang} />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-black/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl overflow-hidden z-50">
                  <button onClick={() => { setLang('de'); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'de' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:bg-white/5'}`}>
                    <FlagDE /> <span>Deutsch</span>
                  </button>
                  <button onClick={() => { setLang('en'); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'en' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:bg-white/5'}`}>
                    <FlagGB /> <span>English</span>
                  </button>
                  <button onClick={() => { setLang('pl'); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'pl' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:bg-white/5'}`}>
                    <FlagPL /> <span>Polski</span>
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden transition-all duration-500"
              aria-label={t.menuAriaLabel}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-black/95 backdrop-blur-xl border-t border-amber-900/20 px-6 py-4 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Full-screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background-hero.jpg"
            alt="Dawid Faith Hero"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Ambient glow accents */}
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/8 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[96px]"></div>

        {/* Hero Content – pushed to bottom half of viewport */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pb-28 md:pb-32">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="inline-block text-amber-400/90 text-xs uppercase tracking-[0.35em] font-semibold px-4 py-1.5 border border-amber-500/20 rounded-full bg-amber-500/5 backdrop-blur-sm">
                {t.heroBadge}
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-5 leading-[0.85] tracking-tight">
              Dawid<br/>
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Faith</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200/90 mb-8 leading-relaxed max-w-lg font-light whitespace-pre-line">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                onClick={() => scrollTo('booking')}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-9 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/30 text-sm uppercase tracking-wider"
              >
                {t.heroCtaBook}
              </button>
              <button 
                onClick={() => scrollTo('music')}
                className="border border-white/25 hover:border-amber-400/50 text-white font-semibold px-9 py-4 rounded-full transition-all hover:bg-white/5 backdrop-blur-sm text-sm uppercase tracking-wider"
              >
                {t.heroCtaListen}
              </button>
            </div>

            {/* Quick facts inline */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                {t.heroLanguages}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                {t.heroGuitar}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                {t.heroRepertoire}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator – sits at the very bottom of the hero viewport */}
        <div className="relative z-10 flex flex-col items-center gap-2 pb-6 animate-bounce">
          <span className="text-slate-500 text-[10px] uppercase tracking-widest">{t.heroScroll}</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-16 py-24 md:py-32 bg-black relative overflow-hidden">
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
              <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-6 block">{t.aboutLabel}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                {t.aboutTitle1}<br/><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{t.aboutTitle2}</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                {t.aboutP1}
              </p>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                {t.aboutP2}
              </p>
              <p className="text-slate-500 italic border-l-2 border-amber-500/40 pl-4">
                {t.aboutQuote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLAVISCHER POP-ROCK USP */}
      <section className="py-16 md:py-20 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.04] via-transparent to-amber-500/[0.04]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 block">{t.uspLabel}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{t.uspTitle1}</span><br/>
            {t.uspTitle2}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.uspDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold">{t.uspTag1}</span>
            <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold">{t.uspTag2}</span>
            <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold">{t.uspTag3}</span>
            <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold">{t.uspTag4}</span>
          </div>
        </div>
      </section>

      {/* AUDIO PLAYER SECTION */}
      <section id="music" className="scroll-mt-16 py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.musicLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.musicTitle}</h2>
            <p className="text-slate-500">{t.musicSubtitle}</p>
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
                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] mb-1">{t.musicNowPlaying}</p>
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
      <section id="videos" className="scroll-mt-16 py-24 md:py-32 bg-black relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.videosLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.videosTitle}</h2>
            <p className="text-slate-500">{t.videosSubtitle}</p>
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

      {/* REFERENZEN / SOCIAL PROOF */}
      <section id="referenzen" className="scroll-mt-16 py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.refLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.refTitle}</h2>
            <p className="text-slate-500">{t.refSubtitle}</p>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-white/[0.03] border border-amber-500/20 rounded-2xl p-10 md:p-14 mb-16 text-center relative">
            <div className="absolute top-6 left-10 text-6xl text-amber-500/20 font-serif">&ldquo;</div>
            <blockquote className="text-2xl md:text-3xl font-black text-white leading-relaxed mb-6 max-w-3xl mx-auto">
              {t.refQuote}
            </blockquote>
            <cite className="text-slate-500 text-sm not-italic">{t.refQuoteCite}</cite>
          </div>

          {/* Auftrittsorte */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/30 transition-all">
              <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">{t.refCardLiveLabel}</p>
              <p className="text-white font-bold">{t.refCardLive}</p>
              <p className="text-slate-500 text-sm mt-1">{t.refCardLiveLocation}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/30 transition-all">
              <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">{t.refCardStreetLabel}</p>
              <p className="text-white font-bold">{t.refCardStreet}</p>
              <p className="text-slate-500 text-sm mt-1">{t.refCardStreetLocation}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/30 transition-all">
              <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">{t.refCardEventsLabel}</p>
              <p className="text-white font-bold">{t.refCardEvents}</p>
              <p className="text-slate-500 text-sm mt-1">{t.refCardEventsLocation}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/30 transition-all">
              <p className="text-amber-400/70 text-[10px] uppercase tracking-[0.2em] mb-2">{t.refCardGastroLabel}</p>
              <p className="text-white font-bold">{t.refCardGastro}</p>
              <p className="text-slate-500 text-sm mt-1">{t.refCardGastroLocation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES / PACKAGES */}
      <section id="services" className="scroll-mt-16 py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-amber-500/5 rounded-full blur-[120px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.svcLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.svcTitle}</h2>
            <p className="text-slate-500">{t.svcSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* 30 Minuten – Opener */}
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-white/20 group flex flex-col">
              <div className="text-4xl font-black mb-2 text-slate-500 group-hover:text-slate-300 transition-colors">30 min</div>
              <h3 className="text-lg font-bold mb-6 text-slate-300">{t.svc30Title}</h3>
              <ul className="space-y-4 text-slate-400 text-sm flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc30Item1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc30Item2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc30Item3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc30Item4}</span>
                </li>
              </ul>
              <p className="text-slate-600 text-xs mt-6 pt-4 border-t border-white/5">{t.svcPriceOnRequest}</p>
            </div>

            {/* 1 Stunde – Full Set */}
            <div className="border border-amber-500/30 rounded-2xl p-8 bg-amber-500/[0.04] relative group hover:border-amber-500/50 transition-all duration-300 flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-black text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">{t.svcMostChosen}</span>
              </div>
              <div className="text-4xl font-black mb-2 text-amber-400">1 h</div>
              <h3 className="text-lg font-bold mb-6">{t.svc60Title}</h3>
              <ul className="space-y-4 text-slate-300 text-sm flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>{t.svc60Item1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>{t.svc60Item2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>{t.svc60Item3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>{t.svc60Item4}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-amber-400">✓</span>
                  <span>{t.svc60Item5}</span>
                </li>
              </ul>
              <p className="text-amber-500/60 text-xs mt-6 pt-4 border-t border-amber-500/10">{t.svcCustomOffer}</p>
            </div>

            {/* 2 Stunden – Abendfüllend */}
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-white/20 group flex flex-col">
              <div className="text-4xl font-black mb-2 text-slate-500 group-hover:text-slate-300 transition-colors">2 h</div>
              <h3 className="text-lg font-bold mb-6 text-slate-300">{t.svc120Title}</h3>
              <ul className="space-y-4 text-slate-400 text-sm flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc120Item1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc120Item2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc120Item3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc120Item4}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-slate-500">✓</span>
                  <span>{t.svc120Item5}</span>
                </li>
              </ul>
              <p className="text-slate-600 text-xs mt-6 pt-4 border-t border-white/5">{t.svcPriceOnRequest}</p>
            </div>
          </div>

          {/* Zusatzleistungen */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            <span className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-semibold">{t.svcExtraTravel}</span>
            <span className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-semibold">{t.svcExtraPA}</span>
            <span className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-semibold">{t.svcExtraSpecial}</span>
            <span className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-semibold">{t.svcExtraEncore}</span>
          </div>

          {/* TECHNIK & SETUP – Plug & Play */}
          <div className="bg-gradient-to-r from-amber-500/[0.08] to-transparent border border-amber-500/20 rounded-2xl p-10 mb-16">
            <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span>
              {t.techTitle}
            </h3>
            <p className="text-amber-400/70 text-sm mb-8">{t.techSubtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="text-amber-400 font-black text-sm uppercase tracking-wider mb-3">{t.techPlugPlay}</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.techPlugPlayDesc}
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="text-amber-400 font-black text-sm uppercase tracking-wider mb-3">{t.techInEar}</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.techInEarDesc}
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="text-amber-400 font-black text-sm uppercase tracking-wider mb-3">{t.techAutark}</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.techAutarkDesc}
                </p>
              </div>
            </div>
            
            <a 
              href="/booking/Technical_Rider_Dawid_Faith_V2.pdf"
              download
              className="inline-flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold px-6 py-3 rounded-full border border-amber-500/30 transition-all"
            >
              {t.techRiderDownload}
              <span>↓</span>
            </a>
          </div>

          {/* Repertoire Overview */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <span className="w-8 h-px bg-amber-500"></span>
                {t.repTitle}
              </h3>
              <p className="text-amber-400/70 text-sm mt-2 md:mt-0">{t.repSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Originals */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-white">{t.repOriginals} <span className="text-slate-500 text-sm font-normal">({t.repOriginalCount})</span></h4>
                
                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{t.repBallads}</p>
                <ul className="space-y-2.5 text-slate-300 text-sm mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Maria / Znikła <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE / PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Katze <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Mit dir sein <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Frei sein <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Holy Children <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                </ul>

                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{t.repUptempo}</p>
                <ul className="space-y-2.5 text-slate-300 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Niebianski Groove <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Aladdine <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Słabość <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Schiffchen <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Jupiter <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Mambo <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Huhu <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Zacznij <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Rapu Tapu Tak Ma <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Monster <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                </ul>
              </div>

              {/* Covers */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-white">{t.repCovers} <span className="text-slate-500 text-sm font-normal">({t.repCoverCount})</span></h4>
                
                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{t.repGerman}</p>
                <ul className="space-y-2.5 text-slate-300 text-sm mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Pocahontas <span className="text-slate-500">(AnnenMayKantereit)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Verdammt ich lieb dich <span className="text-slate-500">(Matthias Reim)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Nie allein <span className="text-slate-500">(Kaffkiez)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">DE</span>
                  </li>
                </ul>

                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{t.repEnglish}</p>
                <ul className="space-y-2.5 text-slate-300 text-sm mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Your Man <span className="text-slate-500">(Josh Turner)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    This is the Life <span className="text-slate-500">(Amy Macdonald)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Ring of Fire <span className="text-slate-500">(Johnny Cash)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Country Roads <span className="text-slate-500">(John Denver)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Believer <span className="text-slate-500">(Imagine Dragons)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Walk the Line <span className="text-slate-500">(Johnny Cash)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">EN</span>
                  </li>
                </ul>

                <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{t.repPolish}</p>
                <ul className="space-y-2.5 text-slate-300 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Weź nie pytaj <span className="text-slate-500">(Paweł Domagała)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Zawsze tam gdzie ty <span className="text-slate-500">(Perfect)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Czarny chleb i czarna kawa <span className="text-slate-500">(Strachy na Lachy)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    Aisha <span className="text-slate-500">(Magma)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 ml-auto">PL</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-8 pt-8 border-t border-white/10">
              {t.repNote}
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / GALLERY */}
      <section id="gallery" className="scroll-mt-16 py-24 md:py-32 bg-black relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.galLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.galTitle}</h2>
            <p className="text-slate-500">{t.galSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {fotos.map((foto, idx) => (
              <a 
                key={idx} 
                href={foto.src} 
                download
                className="group relative rounded-2xl overflow-hidden h-96 cursor-pointer block"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">{foto.alt}</p>
                  <span className="text-amber-400 text-xl">↓</span>
                </div>
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-sm">{t.galDownloadHint}</p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="scroll-mt-16 py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="mb-16 text-center">
            <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold">{t.formLabel}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-3">{t.formTitle}</h2>
            <p className="text-slate-500">{t.formSubtitle}</p>
          </div>

          {formStatus === 'success' ? (
            <div className="bg-white/[0.03] border border-amber-500/30 rounded-2xl p-12 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-400 text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-black mb-3">{t.formSuccessTitle}</h3>
              <p className="text-slate-400 mb-8">{t.formSuccessText}</p>
              <button
                onClick={() => setFormStatus('idle')}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                {t.formSuccessAnother}
              </button>
            </div>
          ) : (
          <form className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm" onSubmit={handleBookingSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formName}</label>
                <input 
                  type="text" 
                  placeholder={t.formNamePlaceholder}
                  required
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formEmail}</label>
                <input 
                  type="email" 
                  placeholder={t.formEmailPlaceholder}
                  required
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formEventType}</label>
                <select 
                  value={bookingFormData.eventType}
                  required
                  onChange={(e) => setBookingFormData({...bookingFormData, eventType: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                >
                  <option value="" className="bg-neutral-900 text-white">{t.formEventTypeDefault}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventWedding}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventBar}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventPrivate}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventCorporate}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventFestival}</option>
                  <option className="bg-neutral-900 text-white">{t.formEventOther}</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formDate}</label>
                <input 
                  type="date" 
                  value={bookingFormData.date}
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formLocation}</label>
              <input 
                type="text" 
                placeholder={t.formLocationPlaceholder}
                value={bookingFormData.location}
                onChange={(e) => setBookingFormData({...bookingFormData, location: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">{t.formMessage}</label>
              <textarea 
                placeholder={t.formMessagePlaceholder}
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
                {formStatus === 'sending' ? t.formSending : t.formSubmit}
                {formStatus !== 'sending' && <span>→</span>}
              </button>
              <a 
                href="tel:+4915237673661"
                className="border border-white/15 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/5 hover:border-white/25 transition-all flex items-center justify-center gap-2"
              >
                {t.formCallDirect}
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
      <footer className="bg-black relative py-12 pb-24 md:pb-12">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/15 hover:border-amber-500/30 transition-all group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-amber-400 transition-colors">
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 Dawid Faith</p>
            <button 
              onClick={() => scrollTo('hero')}
              className="text-slate-600 hover:text-amber-400 text-sm transition-colors"
            >
              {t.footerBackToTop}
            </button>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BOOKING CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-black/90 backdrop-blur-lg border-t border-amber-900/30 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => scrollTo('booking')}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-full transition-all text-sm"
          >
            {t.mobileCtaBook}
          </button>
          <a
            href="tel:+4915237673661"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/5 transition-all flex-shrink-0"
            aria-label={t.mobileCtaCallLabel}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}
