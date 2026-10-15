'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Smartphone, Calendar } from 'lucide-react';

const SPOTIFY_ARTIST_ID = '0CESFIQKIs643l9hV0QXsE';

import MusicTranslations from '../lib/translations/MusicSectionTrans';

const MusicSection = () => {
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de' | 'en' | 'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  return (
    <section id="music" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header – editorial, left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {MusicTranslations[lang].title}
          </h2>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="text-stone-400 text-sm">{MusicTranslations[lang].appNote}</span>
          </div>
        </motion.div>

        {/* Spotify Player – immer aktuell, zeigt automatisch alle veröffentlichten Songs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl overflow-hidden border border-white/10"
        >
          <iframe
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            style={{ border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Dawid Faith – Spotify"
          />
        </motion.div>

        {/* Booking CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.07] via-transparent to-amber-500/[0.07] p-8 md:p-10 text-center overflow-hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl md:text-3xl font-black text-white">{MusicTranslations[lang].exclusiveTitle}</h3>
            </div>
            <p className="text-stone-400 mb-7 max-w-2xl mx-auto leading-relaxed">
              {MusicTranslations[lang].exclusiveDesc}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              <Calendar className="w-4 h-4" />
              {MusicTranslations[lang].webappButton}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
