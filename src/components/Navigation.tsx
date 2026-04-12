'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, Music, Sparkles, User, Newspaper, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from './FlagIcon';
import { useRef } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load lang from localStorage if present
    try {
      const stored = localStorage.getItem('site-lang');
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
    } catch (e) {}
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

  const translations: Record<string, { home: string; news: string; dfaith: string; musik: string; konzerte: string }> = {
    de: { home: 'Home', news: 'News', dfaith: 'D.FAITH', musik: 'Musik', konzerte: 'Konzerte' },
    en: { home: 'Home', news: 'News', dfaith: 'D.FAITH', musik: 'Music', konzerte: 'Shows' },
    pl: { home: 'Home', news: 'Aktualności', dfaith: 'D.FAITH', musik: 'Muzyka', konzerte: 'Koncerty' },
  };

  const navItems = [
    { key: 'home', name: translations[lang].home, href: '#home', icon: User, type: 'scroll' },
    { key: 'news', name: translations[lang].news, href: '#news', icon: Newspaper, type: 'scroll' },
    { key: 'dfaith', name: translations[lang].dfaith, href: '#dfaith', icon: Sparkles, type: 'scroll' },
    { key: 'musik', name: translations[lang].musik, href: '#music', icon: Music, type: 'scroll' },
    { key: 'konzerte', name: translations[lang].konzerte, href: '#konzerte', icon: Calendar, type: 'scroll' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'Pirata One, cursive' }}
          >
            <div className="flex items-center gap-3">
              <span className="ml-1">Dawid Faith</span>
              
              {/* Language selector direkt nach Dawid Faith */}
              <div className="relative" ref={langRef}>
                <button
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((s) => !s)}
                  className="flex items-center gap-2 text-white px-2 py-1 rounded-md hover:bg-white/5"
                  title="Sprache"
                >
                  <FlagForLang lang={lang} />
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>

                {langOpen && (
                  <div className="absolute left-0 mt-2 w-36 bg-black/90 border border-purple-500/20 rounded-md shadow-lg z-50">
                    <ul role="listbox" aria-label="Sprachen" className="py-1">
                      <li>
                        <button
                          onClick={() => { setLang('de'); setLangOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10"
                        >
                          <FlagDE />
                          <span className="text-sm text-white">Deutsch</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => { setLang('en'); setLangOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10"
                        >
                          <FlagGB />
                          <span className="text-sm text-white">English</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => { setLang('pl'); setLangOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10"
                        >
                          <FlagPL />
                          <span className="text-sm text-white">Polski</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  const element = document.querySelector(item.href);
                  if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY - 64;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
              >
                <item.icon size={18} />
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-purple-400 transition-colors"
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
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  const element = document.querySelector(item.href);
                  if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY - 64;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 py-3 px-4 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 w-full text-left"
              >
                <item.icon size={18} />
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
