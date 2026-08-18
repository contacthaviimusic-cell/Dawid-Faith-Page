"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DFaithTranslations from '../lib/translations/DFaithSectionTrans';
import CoverMedia from './CoverMedia';

const DFaithSection = () => {
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  useEffect(() => {
    // try to read persisted lang or html lang
    try {
      const stored = localStorage.getItem('site-lang') as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') {
        setLang(stored);
      } else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const docLang = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (docLang === 'de' || docLang === 'en' || docLang === 'pl') setLang(docLang);
      }
    } catch (e) {}

    // listen for language changes dispatched by Navigation
    function onLang(e: Event) {
      // CustomEvent with detail.lang
      const ce = e as CustomEvent<{ lang: 'de' | 'en' | 'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  return (
    <section id="dfaith" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.04] via-transparent to-amber-500/[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.05] rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with floating token */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20"
            >
              <CoverMedia src="/dfaith-token-showcase.mp4" alt="D.FAITH Token" className="object-cover" />
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-3">
            {DFaithTranslations[lang].title}
          </h2>
          <p className="text-stone-400 leading-relaxed max-w-2xl mx-auto">
            {DFaithTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Numbered steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {DFaithTranslations[lang].points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white/[0.03] rounded-2xl border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05] p-8 transition-all duration-500 flex flex-col"
            >
              <div className="text-4xl font-black mb-6 text-stone-700 group-hover:text-amber-500/60 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
              <p className="text-stone-400 leading-relaxed text-sm">{point.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://app.dawidfaith.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
          >
            {DFaithTranslations[lang].ctaEarn}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DFaithSection;
