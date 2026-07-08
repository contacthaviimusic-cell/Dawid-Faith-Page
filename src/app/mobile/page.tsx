'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="min-h-screen bg-[#0a0908] text-white overflow-hidden relative">
        
        {/* Mobile Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-end relative overflow-hidden">
          {/* Background: Katze teaser video */}
          <div className="absolute inset-0 z-0 bg-black">
            <video
              src="/musik/katze/katze-teaser-web.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
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
              <div className="mb-5">
                <span className="inline-block text-amber-400/90 text-[10px] uppercase tracking-[0.35em] font-semibold px-4 py-1.5 border border-amber-500/20 rounded-full bg-amber-500/5 backdrop-blur-sm">
                  {PageTranslations[lang].newSingleBadge}
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-[0.85] tracking-tight">
                Dawid<br/>
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Faith</span>
              </h1>
            </motion.div>

            {/* Mobile CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              <Link href="/pre-order/katze" className="block">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-500 active:bg-amber-400 text-black px-5 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Play size={18} />
                  <span>{PageTranslations[lang].ctaInvite}</span>
                </motion.div>
              </Link>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full border border-white/25 active:border-amber-400/50 text-white px-5 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
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
              <span className="text-stone-500 text-[9px] uppercase tracking-widest">Scroll</span>
              <div className="w-px h-6 bg-gradient-to-b from-amber-400/50 to-transparent" />
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
            className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl shadow-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center"
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
        <footer className="relative py-10 px-6 bg-black">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-xl font-black tracking-tight mb-2">
                DAWID <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">FAITH</span>
              </h3>
              <p className="text-stone-400 text-sm">
                {PageTranslations[lang].footerTagline}
              </p>
            </motion.div>

            <div className="text-stone-500 text-xs">
              <p>{PageTranslations[lang].copyright}</p>
              <p className="mt-1 text-stone-600">{PageTranslations[lang].poweredBy}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}