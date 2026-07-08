"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Music, Calendar } from 'lucide-react';
import Translations from '@/lib/translations/waterfallRelease';

const WaterfallReleaseNews = () => {
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
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{t.title}</h3>
        <p className="text-stone-400 text-sm">{t.campaign}</p>
      </div>

      <p className="text-stone-300 leading-relaxed">{t.intro}</p>

      {/* Termine */}
      <div className="divide-y divide-white/10 border-y border-white/10">
        <div className="flex items-center gap-3 py-3">
          <Calendar size={16} className="text-amber-400 shrink-0" />
          <span className="text-white font-medium">{t.firstSongTitle}</span>
          <span className="text-stone-400 ml-auto text-sm">{t.firstSongDate}</span>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Music size={16} className="text-amber-400 shrink-0" />
          <span className="text-white font-medium">{t.musicVideoTitle}</span>
          <span className="text-stone-400 ml-auto text-sm">{t.musicVideoDate}</span>
        </div>
      </div>

      {/* Details */}
      <div>
        <h4 className="text-white font-semibold mb-3">{t.campaignDetails}</h4>
        <ul className="text-stone-400 space-y-2 text-sm">
          {t.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/pre-order/katze"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors"
      >
        <Music size={15} />
        {t.presaveButton}
      </Link>
    </div>
  );
};

export default WaterfallReleaseNews;
