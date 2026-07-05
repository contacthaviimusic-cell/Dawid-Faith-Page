'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import PageTranslations from '@/lib/translations/page';
import Navigation from '../components/Navigation';
import NewsSection from '../components/NewsSection';
import DFaithSection from '../components/DFaithSection';
import MusicSection from '../components/MusicSection';
import KonzerteEventsSection from '../components/KonzerteEventsSection';
import NewsletterSection from '../components/NewsletterSection';
import SocialMediaWidget from '../components/SocialMediaWidget';
import MobilePage from './mobile/page';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');
  const { isMobile, isLoading } = useMobileDetection();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0908] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/10 border-t-amber-400 mb-4 mx-auto"></div>
          <p className="text-stone-400">{PageTranslations[lang].loaderText}</p>
        </div>
      </div>
    );
  }

  // Render mobile version for mobile devices
  if (isMobile) {
    return <MobilePage />;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a0908] text-white overflow-hidden relative">
        {/* Floating Social Widget Button & Overlay */}
        <div className="hidden lg:block">
          {/* Button */}
          {!showWidget && (
            <button
              onClick={() => setShowWidget(true)}
              className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg shadow-amber-500/20 border-2 border-amber-400/60 hover:scale-110 transition-transform p-0"
              aria-label="Social Media öffnen"
            >
              <span className="block w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith Social Widget"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </span>
            </button>
          )}
          {/* Overlay Widget */}
          {showWidget && (
            <div className="fixed bottom-8 right-8 z-50">
              <div className="relative">
                <button
                  onClick={() => setShowWidget(false)}
                  className="absolute -top-3 -right-3 bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center border border-white/20 hover:border-amber-400 hover:text-amber-400 transition-colors z-10"
                  aria-label="Schließen"
                >
                  ×
                </button>
                <SocialMediaWidget compact />
              </div>
            </div>
          )}
        </div>

        {/* Hero Landing Section */}
        <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
          {/* Full-screen Background Image with cinematic overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/dawid-faith-bg.jpg"
              alt="Dawid Faith"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          </div>

          {/* Ambient glow accents */}
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/8 rounded-full blur-[128px] z-0" />
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[96px] z-0" />

          {/* Hero Content – editorial, bottom-left */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pb-28 md:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl"
            >
              <div className="mb-4">
                <span className="inline-block text-amber-400/90 text-xs uppercase tracking-[0.35em] font-semibold px-4 py-1.5 border border-amber-500/20 rounded-full bg-amber-500/5 backdrop-blur-sm">
                  {PageTranslations[lang].heroSubtitle}
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl xl:text-9xl font-black mb-5 leading-[0.85] tracking-tight">
                Dawid<br/>
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Faith</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-200/90 mb-8 leading-relaxed max-w-lg font-light">
                {PageTranslations[lang].footerTagline}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-9 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/30 text-sm uppercase tracking-wider flex items-center gap-2"
                  onClick={() => {
                    const el = document.querySelector('#news');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 64;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                    setTimeout(() => {
                      const event = new CustomEvent('openReleaseNews');
                      window.dispatchEvent(event);
                    }, 800);
                  }}
                >
                  <Play size={16} />
                  {PageTranslations[lang].ctaInvite}
                </button>
                <button
                  className="border border-white/25 hover:border-amber-400/50 text-white font-semibold px-9 py-4 rounded-full transition-all hover:bg-white/5 backdrop-blur-sm text-sm uppercase tracking-wider flex items-center gap-2"
                  onClick={() => {
                    const el = document.querySelector('#dfaith');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 64;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="relative w-4 h-4">
                    <Image
                      src="/dfaith-token.png"
                      alt="D.FAITH Token"
                      fill
                      className="object-contain"
                    />
                  </span>
                  {PageTranslations[lang].ctaExperience}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center gap-2 pb-6 animate-bounce"
          >
            <span className="text-stone-500 text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-stone-500 to-transparent" />
          </motion.div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* Music Section */}
        <MusicSection />

        {/* D.FAITH Ecosystem Section */}
        <DFaithSection />

        {/* Konzerte Section */}
        <KonzerteEventsSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer */}
        <footer className="relative py-16 px-6 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black tracking-tight mb-2">
                  DAWID <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">FAITH</span>
                </h3>
                <p className="text-stone-400 text-sm">
                  {PageTranslations[lang].footerTagline}
                </p>
              </div>

              <div className="text-center md:text-right text-stone-500 text-sm">
                <p>{PageTranslations[lang].copyright}</p>
                <p className="mt-1 text-stone-600">{PageTranslations[lang].poweredBy}</p>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}
