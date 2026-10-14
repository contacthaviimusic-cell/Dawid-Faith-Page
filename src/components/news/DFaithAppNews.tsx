"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Translations from '@/lib/translations/DFaithAppNewsTrans';

const KATZE_YOUTUBE_ID = '-h7US3tHuyo';

const DFaithAppNews = () => {
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

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

  const t = Translations[lang];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">{t.title}</h3>
      <p className="text-stone-300 leading-relaxed">{t.intro}</p>
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${KATZE_YOUTUBE_ID}`}
          title="Katze – Musikvideo"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${KATZE_YOUTUBE_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors"
      >
        {t.ctaButton}
        <ArrowRight size={15} />
      </a>
    </div>
  );
};

export default DFaithAppNews;
