"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Calendar, Music2 } from 'lucide-react';
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
      <div className="border-l-4 border-blue-500 pl-4">
        <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-blue-300 font-semibold flex items-center gap-2">
          <Music2 size={18} />
          {t.campaign}
        </p>
      </div>
      
      <p className="text-gray-300 leading-relaxed text-lg">{t.intro}</p>

      <div className="space-y-4">
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-400/30">
          <p className="text-blue-300 font-semibold flex items-center gap-2 mb-2">
            <Calendar size={18} />
            {t.firstSongTitle}
          </p>
          <p className="text-gray-300">{t.firstSongDate}</p>
        </div>

        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-400/30">
          <p className="text-blue-300 font-semibold flex items-center gap-2 mb-2">
            <Music size={18} />
            {t.musicVideoTitle}
          </p>
          <p className="text-gray-300">{t.musicVideoDate}</p>
        </div>
      </div>

      <motion.div 
        className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6 rounded-2xl border border-blue-400/50"
        animate={{ borderColor: ['rgba(96, 165, 250, 0.5)', 'rgba(34, 211, 238, 0.5)', 'rgba(96, 165, 250, 0.5)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <h4 className="text-lg font-semibold text-blue-300 mb-3">{t.campaignDetails}</h4>
        <ul className="text-gray-300 space-y-2 mb-4">
          {t.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            alert(lang === 'de' ? 'Presave-Link wird bald verfügbar!' : lang === 'en' ? 'Presave link coming soon!' : 'Link do presave wkrótce!');
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
        >
          <Music size={18} />
          {t.presaveButton}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WaterfallReleaseNews;
