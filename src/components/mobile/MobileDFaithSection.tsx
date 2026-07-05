'use client';

import React, { useState, useEffect } from 'react';
import DFaithTranslations from '@/lib/translations/DFaithSectionTrans';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap, ArrowRight, Target, ShoppingBag, Layers } from 'lucide-react';

const pointIcons = [
  { icon: Target, color: 'text-yellow-400' },
  { icon: ShoppingBag, color: 'text-amber-400' },
  { icon: Layers, color: 'text-yellow-400' },
];

export default function MobileDFaithSection() {
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

  return (
    <section id="dfaith" className="relative py-8 px-4 bg-gradient-to-b from-black via-amber-900/20 to-black overflow-hidden">
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse"
             style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-pulse"
             style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse"
             style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 container mx-auto">
        {/* Hero Section mit Token */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
            <div className="relative mb-8 flex flex-col items-center">
              {/* Glowing ring around token */}
              <div className="relative">
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 blur-lg animate-pulse" />
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-2xl shadow-amber-500/30">
                  <Image src="/dfaith-token.png" alt="D.FAITH Token" width={80} height={80} className="object-cover" />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
              </div>
              
              <motion.h2 
                className="text-3xl font-black mb-3 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {DFaithTranslations[lang].title}
              </motion.h2>
              
              <motion.p 
              className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {DFaithTranslations[lang].subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Ecosystem Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-3 mb-8"
        >
          {DFaithTranslations[lang].points.map((point, index) => {
            const { icon: Icon, color } = pointIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-gradient-to-r from-stone-900/80 via-amber-900/10 to-stone-900/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20 shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:border-amber-400/40"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-stone-800/80 to-amber-900/40 flex items-center justify-center border border-amber-500/30 shadow-inner"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className={`${color} drop-shadow-sm`} size={20} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold mb-1 group-hover:text-amber-200 transition-colors">{point.title}</p>
                    <p className="text-stone-300 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </div>
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://app.dawidfaith.de"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="group relative block w-full bg-amber-500 active:bg-amber-400 rounded-full px-6 py-4 text-center shadow-lg shadow-amber-500/20 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="text-black" size={17} />
              <span className="text-black font-bold text-sm uppercase tracking-wider">{DFaithTranslations[lang].ctaEarn}</span>
              <ArrowRight className="text-black/70 group-hover:translate-x-1 transition-transform" size={16} />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}