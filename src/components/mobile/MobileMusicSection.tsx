'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, Calendar } from 'lucide-react';
import Link from 'next/link';

const SPOTIFY_ARTIST_ID = '0CESFIQKIs643l9hV0QXsE';

import MusicTranslations from '../../lib/translations/MusicSectionTrans';

export default function MobileMusicSection() {
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
    <section id="music" className="py-8 px-4 bg-gradient-to-b from-black via-yellow-900/10 to-black">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="text-yellow-400" size={28} />
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              {MusicTranslations[lang].title}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs">{MusicTranslations[lang].appNote}</span>
          </div>
        </motion.div>

        {/* Spotify Player – immer aktuell, zeigt automatisch alle veröffentlichten Songs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 rounded-2xl overflow-hidden border border-yellow-500/20"
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

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-2xl border border-amber-500/30 backdrop-blur-sm p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-amber-400" size={24} />
            <h3 className="text-xl font-bold text-white">{MusicTranslations[lang].exclusiveTitle}</h3>
          </div>
          <p className="text-stone-300 text-sm mb-4">
            {MusicTranslations[lang].exclusiveDesc}
          </p>
          <Link href="/booking" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-500 active:bg-amber-400 px-6 py-3 rounded-full text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 w-full"
            >
              <Calendar size={18} />
              {MusicTranslations[lang].webappButton}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}