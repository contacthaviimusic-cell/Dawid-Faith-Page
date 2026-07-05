"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, ShoppingBag, Layers } from 'lucide-react';
import DFaithTranslations from '../lib/translations/DFaithSectionTrans';

const pointIcons = [Target, ShoppingBag, Layers];

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
    <section id="dfaith" className="scroll-mt-16 relative py-20 px-4 bg-gradient-to-b from-stone-900/30 to-amber-900/10 overflow-hidden">
      {/* Background similar to News */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 to-yellow-900/5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header to match News */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent [font-family:var(--font-display),serif]">
            {DFaithTranslations[lang].title}
          </h2>
          <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
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
            <div className="space-y-4 mb-8">
              {DFaithTranslations[lang].points.map((point, i) => {
                const Icon = pointIcons[i];
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-gradient-to-br from-stone-900/60 to-amber-900/30 backdrop-blur-md rounded-2xl p-5 border border-amber-500/20"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                      <Icon className="text-amber-300" size={22} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{point.title}</h3>
                      <p className="text-stone-300 text-sm leading-relaxed">{point.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.a
                href="https://app.dawidfaith.de"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-600 to-yellow-600 shadow-lg"
              >
                {DFaithTranslations[lang].ctaEarn}
              </motion.a>
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-500/20 to-amber-500/30 blur-3xl animate-pulse" />
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-500/20"
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