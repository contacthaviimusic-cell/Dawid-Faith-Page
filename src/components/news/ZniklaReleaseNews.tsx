"use client";

import React, { useEffect, useState } from 'react';
import Translations from '@/lib/translations/znikla';

const ZniklaReleaseNews = () => {
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
      <div className="border-l-4 border-purple-500 pl-4">
        <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-purple-300 font-semibold">{t.releaseDate}</p>
      </div>
      
      <p className="text-gray-300 leading-relaxed">{t.intro}</p>
      
      <div className="bg-slate-800/50 p-6 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-4 text-lg">{t.aboutTitle}</h4>
        <p className="text-gray-300 leading-relaxed">{t.about}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-xl">
          <h4 className="text-purple-300 font-semibold mb-3">{t.streamingTitle}</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            {t.streaming.map((platform, i) => (
              <li key={i} className="flex items-center">
                <span className="mr-2">▸</span>
                <span>{platform}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl">
          <h4 className="text-purple-300 font-semibold mb-3">{t.featuresTitle}</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            {t.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <span className="mr-2">◆</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
        <h4 className="text-lg font-semibold text-purple-300 mb-3">{t.callToAction}</h4>
        <p className="text-gray-300 text-sm">{t.ctaDesc}</p>
      </div>
    </div>
  );
};

export default ZniklaReleaseNews;
