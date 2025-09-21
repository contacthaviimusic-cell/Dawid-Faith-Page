"use client";

import React, { useEffect, useState } from 'react';
import Translations from '@/lib/translations/ReleaseKonzertNewsTrans';

const ReleaseKonzertNews = () => {
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

  const isClockTime = (t: string) => /\d{1,2}:\d{2}/.test(t);
  const formatTime = (timeString: string) => {
    if (!isClockTime(timeString)) return timeString;
    const parts = timeString.split(':');
    if (parts.length !== 2) return timeString;
    // keep time as HH:MM but append 'Uhr' for de
    return lang === 'de' ? `${timeString} Uhr` : timeString;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">{t.title}</h3>
      <p className="text-gray-300 leading-relaxed">{t.intro}</p>

      <div className="bg-blue-900/30 p-6 rounded-2xl border border-blue-500/20">
        <h4 className="text-lg font-semibold text-blue-300 mb-4">{t.infoTitle}</h4>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="font-medium">{t.dateLabel}</p>
            <p className="text-sm">{t.dateText}, {formatTime(t.timeText)}</p>
          </div>
          <div>
            <p className="font-medium">{t.locationLabel}</p>
            <p className="text-sm">{t.locationText}</p>
          </div>
          <div>
            <p className="font-medium">{t.songsLabel}</p>
            <p className="text-sm">{t.songsText}</p>
          </div>
          <div>
            <p className="font-medium">{t.specialLabel}</p>
            <p className="text-sm">{t.specialText}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500/20">
          <p className="text-gray-300 text-sm">{t.paragraph}</p>
        </div>
      </div>

      <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
        <h4 className="text-lg font-semibold text-purple-300 mb-3">{t.premiereTitle}</h4>
        <div className="flex flex-wrap gap-3">
          {t.badges.map((b, i) => (
            <span key={i} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleaseKonzertNews;