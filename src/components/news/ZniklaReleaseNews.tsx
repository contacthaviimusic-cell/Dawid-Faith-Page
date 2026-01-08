"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Calendar, ExternalLink } from 'lucide-react';
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

  const handlePresave = () => {
    const presaveUrl = t.presaveUrl;
    if (presaveUrl) {
      window.open(presaveUrl, '_blank');
    } else {
      alert(lang === 'de' ? 'Presave-Link wird bald verfügbar!' : lang === 'en' ? 'Presave link coming soon!' : 'Link do presave wkrótce!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-purple-500 pl-4">
        <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-purple-300 font-semibold flex items-center gap-2">
          <Calendar size={18} />
          {t.releaseDate}
        </p>
      </div>
      
      <p className="text-gray-300 leading-relaxed text-lg">{t.intro}</p>
      
      <div className="bg-slate-800/50 p-6 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-4 text-lg">{t.aboutTitle}</h4>
        <p className="text-gray-300 leading-relaxed">{t.about}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
      </div>

      <motion.div 
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-2xl border border-purple-400/50"
        animate={{ borderColor: ['rgba(192, 132, 250, 0.5)', 'rgba(236, 72, 153, 0.5)', 'rgba(192, 132, 250, 0.5)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <h4 className="text-lg font-semibold text-purple-300 mb-3">{t.callToAction}</h4>
        <p className="text-gray-300 text-sm mb-4">{t.ctaDesc}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePresave}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg"
        >
          <Music size={18} />
          {t.presaveButton}
          <ExternalLink size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ZniklaReleaseNews;
