'use client';

import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [showEcoDetails, setShowEcoDetails] = useState(false);
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4 mx-auto"></div>
          <p className="text-gray-400">{PageTranslations[lang].loaderText}</p>
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
  <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Floating Social Widget Button & Overlay */}
      <div className="hidden lg:block">
        {/* Pulsierender Button */}
        {!showWidget && (
          <button
            onClick={() => setShowWidget(true)}
            className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg border-4 border-purple-400 hover:scale-110 transition-transform bg-gradient-to-r from-purple-500 to-pink-500 p-0 animate-pulse"
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
              <span className="absolute inset-0 rounded-full border-4 border-purple-400 animate-pulse pointer-events-none" />
            </span>
          </button>
        )}
        {/* Overlay Widget */}
        {showWidget && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              <button
                onClick={() => setShowWidget(false)}
                className="absolute -top-3 -right-3 bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center border border-white hover:bg-pink-600 transition-colors z-10"
                aria-label="Schließen"
              >
                ×
              </button>
              <SocialMediaWidget compact />
            </div>
          </div>
        )}
      </div>
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/8 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-32 w-48 h-48 bg-pink-500/6 rounded-full blur-[80px]" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
          </div>

          {/* Neon accent line at top */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-10" />

          {/* Hero Content – centered */}
          <div className="relative z-10 container mx-auto px-4 pb-28 md:pb-32">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 
                  className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-wider [font-family:var(--font-pirata),cursive]"
                >
                  DAWID FAITH
                </h1>
                <div className="flex items-center justify-center gap-4 text-lg sm:text-xl lg:text-2xl mb-8">
                  <span className="w-8 h-px bg-gradient-to-r from-purple-400 to-pink-400" />
                  <span className="text-gray-200 font-semibold">{PageTranslations[lang].heroSubtitle}</span>
                  <span className="w-8 h-px bg-gradient-to-r from-pink-400 to-purple-400" />
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                    <Play size={20} />
                    {PageTranslations[lang].ctaInvite}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-purple-500/50 hover:bg-purple-500/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                    onClick={() => {
                      const el = document.querySelector('#dfaith');
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 64;
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
                    {PageTranslations[lang].ctaExperience}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center gap-2 pb-6 animate-bounce"
          >
            <span className="text-gray-500 text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-purple-400/50 to-transparent" />
          </motion.div>
        </section>

  {/* News Section */}
  <NewsSection />

  {/* Music Section (moved) */}
  <MusicSection />

  {/* D.FAITH Ecosystem Section (moved) */}
  <DFaithSection />

  {/* Konzerte Section */}
  <KonzerteEventsSection />

  {/* Newsletter Section */}
  <NewsletterSection />

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 
                className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ fontFamily: 'Pirata One, cursive' }}
              >
                Dawid Faith
              </h3>
              <p className="text-gray-400">
                {PageTranslations[lang].footerTagline}
              </p>
            </motion.div>
            
            <div className="text-gray-500 text-sm">
              <p>{PageTranslations[lang].copyright}</p>
              <p className="mt-2">{PageTranslations[lang].poweredBy}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}