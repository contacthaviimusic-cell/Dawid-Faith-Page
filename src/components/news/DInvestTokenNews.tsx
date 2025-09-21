"use client";

import React, { useEffect, useState } from 'react';
import Translations from '@/lib/translations/dinvest';

const DInvestTokenNews = () => {
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
      <p className="text-gray-300 leading-relaxed">{t.intro}</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-xl">
          <h4 className="text-purple-300 font-semibold mb-2">{t.detailsTitle}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {t.details.map((d, i) => <li key={i}>• {d}</li>)}
          </ul>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl">
          <h4 className="text-purple-300 font-semibold mb-2">{t.stakingTitle}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {t.staking.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
      </div>
      <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
        <h4 className="text-lg font-semibold text-purple-300 mb-3">{t.investTitle}</h4>
        <p className="text-gray-300 text-sm mb-3">{t.investDesc}</p>
        <div className="flex flex-wrap gap-3">
          {t.badges.map((b, i) => (
            <span key={i} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DInvestTokenNews;