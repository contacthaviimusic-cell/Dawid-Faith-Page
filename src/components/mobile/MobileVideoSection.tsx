'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import VideoTranslations from '@/lib/translations/VideoSectionTrans';

const KATZE_YOUTUBE_ID = '-h7US3tHuyo';
const GROOVE_YOUTUBE_ID = 'bt2JsiMYlM4';

const MobileVideoSection = () => {
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

  const t = VideoTranslations[lang];

  return (
    <section id="news" className="py-8 px-4 bg-gradient-to-b from-black via-amber-900/10 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-2xl font-black text-white mb-2">{t.title}</h2>
          <p className="text-stone-400 text-sm">{t.intro}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/10"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${KATZE_YOUTUBE_ID}`}
            title="Katze – Musikvideo"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        <a
          href={`https://www.youtube.com/watch?v=${KATZE_YOUTUBE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-amber-500 active:bg-amber-400 text-black px-5 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
        >
          {t.ctaButton}
          <ArrowRight size={16} />
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 mb-5"
        >
          <h2 className="text-2xl font-black text-white mb-2">{t.grooveTitle}</h2>
          <p className="text-stone-400 text-sm">{t.grooveIntro}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/10"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${GROOVE_YOUTUBE_ID}`}
            title="Niebiański Groove – Musikvideo"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        <a
          href={`https://www.youtube.com/watch?v=${GROOVE_YOUTUBE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-amber-500 active:bg-amber-400 text-black px-5 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
        >
          {t.ctaButton}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default MobileVideoSection;
