"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import DFaithTranslations from '../lib/translations/DFaithSectionTrans';

const DFaithSection = () => {
  const [view, setView] = useState<'fans' | 'supporter'>('fans');
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
    <section id="dfaith" className="relative py-20 px-4 bg-gradient-to-b from-slate-900/30 to-purple-900/10 overflow-hidden">
      {/* Background similar to News */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header to match News */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {DFaithTranslations[lang].title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {DFaithTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Content Grid: Text left, Token right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Copy + Tabs + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">{DFaithTranslations[lang].badgeLabel}</span>
              <span className="text-gray-400 text-sm">{DFaithTranslations[lang].tagline}</span>
            </div>

            {/* Small value row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {DFaithTranslations[lang].smallValues.map((v, i) => (
                <div key={i} className="rounded-xl border border-gray-700/40 bg-slate-900/40 px-4 py-3 text-sm text-gray-200">{v}</div>
              ))}
            </div>

            {/* Simple tabs */}
            <div className="inline-flex p-1 rounded-full bg-slate-800/60 border border-gray-700/40 mb-5">
              {(['fans','supporter'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    view === key ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {key === 'fans' ? DFaithTranslations[lang].tabFans : DFaithTranslations[lang].tabSupporter}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-900/60 to-purple-900/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 mb-6">
              {view === 'fans' ? (
                <ul className="list-disc ml-5 space-y-2 text-gray-200">
                  {DFaithTranslations[lang].fansList.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc ml-5 space-y-2 text-gray-200">
                  {DFaithTranslations[lang].supporterList.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.a
                href="https://leaderboard-pi-liard.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
              >
                {DFaithTranslations[lang].ctaEarn}
              </motion.a>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/whitepaper"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white border-2 border-purple-500/60 hover:bg-purple-500/10"
                >
                  {DFaithTranslations[lang].ctaWhitepaper}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Token image with glow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-blue-500/30 blur-3xl animate-pulse" />
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/40 shadow-2xl shadow-purple-500/20"
              >
                <Image src="/dfaith-token.png" alt="D.FAITH Token" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DFaithSection;