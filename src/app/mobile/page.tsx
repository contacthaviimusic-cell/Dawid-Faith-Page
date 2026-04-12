'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MobileNavigation from '../../components/mobile/MobileNavigation';
import MobileNewsSection from '../../components/mobile/MobileNewsSection';
import MobileDFaithSection from '../../components/mobile/MobileDFaithSection';
import MobileMusicSection from '../../components/mobile/MobileMusicSection';
import MobileKonzerteEventsSection from '../../components/mobile/MobileKonzerteEventsSection';
import MobileNewsletterSection from '../../components/mobile/MobileNewsletterSection';
import MobileSocialWidget from '../../components/mobile/MobileSocialWidget';
import PageTranslations from '@/lib/translations/page';

export default function MobilePage() {
  const [mounted, setMounted] = useState(false);
  const [showSocialWidget, setShowSocialWidget] = useState(false);
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }
    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MobileNavigation />
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        
        {/* Mobile Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-end relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/dawid-faith-bg.jpg"
              alt="Dawid Faith"
              fill
              className="object-cover object-center"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          </div>

          <div className="relative z-10 px-6 pb-20 text-center">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-wider [font-family:var(--font-pirata),cursive]">
                DAWID FAITH
              </h1>
              
              <div className="flex items-center justify-center gap-3 text-lg mb-8">
                <span className="w-6 h-px bg-gradient-to-r from-purple-400 to-pink-400" />
                <span className="text-gray-200 font-medium">{PageTranslations[lang].heroSubtitle}</span>
                <span className="w-6 h-px bg-gradient-to-r from-pink-400 to-purple-400" />
              </div>
            </motion.div>

            {/* Mobile CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                onClick={() => {
                  const el = document.querySelector('#news');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 56;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                  setTimeout(() => {
                    const event = new CustomEvent('openDInvestNews');
                    window.dispatchEvent(event);
                  }, 800);
                }}
              >
                <Play size={18} />
                <span>{PageTranslations[lang].ctaInvite}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full border border-purple-500/50 hover:bg-purple-500/10 px-5 py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                onClick={() => {
                  const el = document.querySelector('#dfaith');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 56;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/dfaith-token.png"
                    alt="D.FAITH Token"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{PageTranslations[lang].ctaExperience}</span>
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="mt-8 flex flex-col items-center gap-1.5 animate-bounce">
              <span className="text-gray-500 text-[9px] uppercase tracking-widest">Scroll</span>
              <div className="w-px h-6 bg-gradient-to-b from-purple-400/50 to-transparent" />
            </div>
          </div>
        </section>

  {/* Mobile Sections */}
  <MobileNewsSection />
  <MobileMusicSection />
  <MobileDFaithSection />
  <MobileKonzerteEventsSection />
  <MobileNewsletterSection />

        {/* Mobile Social Widget */}
        {showSocialWidget && (
          <MobileSocialWidget onClose={() => setShowSocialWidget(false)} />
        )}

        {/* Floating Social Button */}
        {!showSocialWidget && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSocialWidget(true)}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl border-4 border-purple-400/30 flex items-center justify-center animate-pulse"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith Social"
                fill
                className="object-cover"
              />
            </div>
          </motion.button>
        )}

        {/* Mobile Footer */}
        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 [font-family:var(--font-pirata),cursive]">
                Dawid Faith
              </h3>
              <p className="text-gray-400 text-sm">
                Wo Musik auf Blockchain trifft
              </p>
            </motion.div>
            
            <div className="text-gray-500 text-xs">
              <p>&copy; 2026 Dawid Faith. Alle Rechte vorbehalten.</p>
              <p className="mt-1">Powered by D.FAITH Ecosystem</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}