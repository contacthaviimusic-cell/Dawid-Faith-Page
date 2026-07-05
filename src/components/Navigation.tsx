'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from './FlagIcon';
import { useRef } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load lang from localStorage if present
    try {
      const stored = localStorage.getItem('site-lang');
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // persist and set html lang
    try {
      localStorage.setItem('site-lang', lang);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      try {
        // notify other components
        const ev = new CustomEvent('site-lang-changed', { detail: { lang } });
        window.dispatchEvent(ev);
      } catch (e) {}
    }
  }, [lang]);

  // close language dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const translations: Record<string, { home: string; news: string; dfaith: string; musik: string; booking: string }> = {
    de: { home: 'Home', news: 'News', dfaith: 'D.FAITH', musik: 'Musik', booking: 'Booking' },
    en: { home: 'Home', news: 'News', dfaith: 'D.FAITH', musik: 'Music', booking: 'Booking' },
    pl: { home: 'Home', news: 'Aktualności', dfaith: 'D.FAITH', musik: 'Muzyka', booking: 'Booking' },
  };

  const navItems = [
    { key: 'home', name: translations[lang].home, href: '#home', type: 'scroll' },
    { key: 'news', name: translations[lang].news, href: '#news', type: 'scroll' },
    { key: 'musik', name: translations[lang].musik, href: '#music', type: 'scroll' },
    { key: 'dfaith', name: translations[lang].dfaith, href: '#dfaith', type: 'scroll' },
    { key: 'booking', name: translations[lang].booking, href: '#konzerte', type: 'scroll' },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/60 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Wordmark + language */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('#home')}
              className="text-lg font-black tracking-tight text-white"
            >
              DAWID <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">FAITH</span>
            </button>

            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((s) => !s)}
                className="flex items-center gap-1.5 text-white px-2 py-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                title="Sprache"
              >
                <FlagForLang lang={lang} />
                <ChevronDown
                  size={13}
                  className={`text-stone-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>

              {langOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-[#12100d]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <ul role="listbox" aria-label="Sprachen" className="py-1">
                    <li>
                      <button
                        onClick={() => { setLang('de'); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'de' ? 'text-amber-400 bg-amber-500/10' : 'text-stone-300 hover:bg-white/5'}`}
                      >
                        <FlagDE />
                        <span>Deutsch</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { setLang('en'); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'en' ? 'text-amber-400 bg-amber-500/10' : 'text-stone-300 hover:bg-white/5'}`}
                      >
                        <FlagGB />
                        <span>English</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { setLang('pl'); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === 'pl' ? 'text-amber-400 bg-amber-500/10' : 'text-stone-300 hover:bg-white/5'}`}
                      >
                        <FlagPL />
                        <span>Polski</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.href)}
                className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <a
              href="https://app.dawidfaith.de"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              App
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-300 hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.key}
                onClick={() => {
                  setIsOpen(false);
                  scrollTo(item.href);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 py-3 px-4 text-sm font-semibold uppercase tracking-wider text-stone-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 w-full text-left"
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
