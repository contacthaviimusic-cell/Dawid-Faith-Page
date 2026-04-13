'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Newspaper, Coins, Music, Calendar, Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from '../FlagIcon';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang');
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('site-lang', lang);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      try {
        const ev = new CustomEvent('site-lang-changed', { detail: { lang } });
        window.dispatchEvent(ev);
      } catch (e) {}
    }
  }, [lang]);

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
    { icon: Home, label: translations[lang].home, href: '#home' },
    { icon: Newspaper, label: translations[lang].news, href: '#news' },
    { icon: Coins, label: translations[lang].dfaith, href: '#dfaith' },
    { icon: Music, label: translations[lang].musik, href: '#music' },
    { icon: Calendar, label: translations[lang].booking, href: '#konzerte' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 [font-family:var(--font-pirata),cursive]">
              DAWID FAITH
            </span>
            
            {/* Language Dropdown direkt nach DAWID FAITH */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((s) => !s)}
                className="p-1 rounded-md bg-transparent flex items-center gap-1 text-white"
                aria-haspopup
                aria-expanded={langOpen}
              >
                <FlagForLang lang={lang} />
                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {langOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-black/90 border border-purple-500/20 rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10" onClick={() => { setLang('de'); setLangOpen(false); }}>
                        <FlagDE />
                        <span className="text-sm text-white">Deutsch</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10" onClick={() => { setLang('en'); setLangOpen(false); }}>
                        <FlagGB />
                        <span className="text-sm text-white">English</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-500/10" onClick={() => { setLang('pl'); setLangOpen(false); }}>
                        <FlagPL />
                        <span className="text-sm text-white">Polski</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Button */}
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-purple-900/20 to-pink-900/20 border-l border-purple-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-20 px-6">
                {/* Profile Section */}
                <div className="text-center mb-8 pb-6 border-b border-gray-700">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-3 border-purple-500">
                    <Image
                      src="/dawid-faith.jpg"
                      alt="Dawid Faith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1 [font-family:var(--font-pirata),cursive]">Dawid Faith</h2>
                  <p className="text-gray-400 text-sm">Künstler • Visionär</p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center gap-4 px-4 py-4 text-left text-white hover:bg-purple-500/20 rounded-xl transition-all duration-300"
                    >
                      <item.icon className="text-purple-400" size={24} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}