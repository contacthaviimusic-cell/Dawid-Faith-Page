'use client';

import React, { useState, useEffect } from 'react';
import DFaithTranslations from '@/lib/translations/DFaithSectionTrans';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Coins, Users, Gift, TrendingUp, Zap, ArrowRight, Star, Crown } from 'lucide-react';

export default function MobileDFaithSection() {
  const [view, setView] = useState<'fans' | 'supporter'>('fans');
  const [showStats, setShowStats] = useState(false);
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

  const benefits = {
    fans: [
      { icon: Gift, text: DFaithTranslations[lang].fansList[0], color: "text-pink-400" },
      { icon: Crown, text: DFaithTranslations[lang].fansList[1], color: "text-purple-400" },
      { icon: TrendingUp, text: DFaithTranslations[lang].fansList[2], color: "text-green-400" }
    ],
    supporter: [
      { icon: Coins, text: DFaithTranslations[lang].supporterList[0], color: "text-yellow-400" },
      { icon: Users, text: DFaithTranslations[lang].supporterList[1], color: "text-blue-400" },
      { icon: Star, text: DFaithTranslations[lang].supporterList[2], color: "text-purple-400" }
    ]
  };

  return (
    <section id="dfaith" className="relative py-8 px-4 bg-gradient-to-b from-black via-purple-900/20 to-black overflow-hidden">
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400/50 rounded-full animate-pulse"
             style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"
             style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse"
             style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent opacity-50" />

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
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-lg animate-pulse" />
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-purple-500/60 shadow-2xl shadow-purple-500/30">
                  <Image src="/dfaith-token.png" alt="D.FAITH Token" width={80} height={80} className="object-cover" />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
              </div>
              
              <motion.h2 
                className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
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
              className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {DFaithTranslations[lang].subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Interactive Tab System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Modern Tab Switcher */}
          <div className="relative bg-gradient-to-r from-slate-900/60 via-purple-900/20 to-slate-900/60 backdrop-blur-md rounded-2xl p-1 border border-purple-500/30 mb-6 shadow-lg shadow-purple-500/10">
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/50"
              initial={false}
              animate={{
                left: view === 'fans' ? '4px' : '50%',
                right: view === 'fans' ? '50%' : '4px'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {(['fans', 'supporter'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className="relative z-10 flex-1 py-3 px-4 text-sm font-semibold text-white transition-all duration-300 w-1/2 text-center hover:text-purple-200"
              >
                {key === 'fans' ? `🎵 ${DFaithTranslations[lang].tabFans}` : `💎 ${DFaithTranslations[lang].tabSupporter}`}
              </button>
            ))}
          </div>

          {/* Dynamic Content Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {benefits[view].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-gradient-to-r from-slate-900/80 via-purple-900/10 to-slate-900/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/40"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800/80 to-purple-900/40 flex items-center justify-center border border-purple-500/30 shadow-inner`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <benefit.icon className={`${benefit.color} drop-shadow-sm`} size={20} />
                    </motion.div>
                    <p className="text-gray-200 text-sm font-medium flex-1 group-hover:text-white transition-colors">{benefit.text}</p>
                  </div>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <motion.a
            href="https://leaderboard-pi-liard.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-0 rounded-2xl overflow-hidden shadow-xl shadow-purple-500/25"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl px-6 py-4 text-center relative overflow-hidden">
              {/* Enhanced shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              {/* Magical sparkles */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
                <div className="flex items-center justify-center gap-2 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="text-yellow-300 drop-shadow-lg" size={20} />
                </motion.div>
                <span className="text-white font-bold text-base drop-shadow-sm">{DFaithTranslations[lang].ctaEarn}</span>
                <ArrowRight className="text-white/80 group-hover:translate-x-1 transition-transform drop-shadow-sm" size={18} />
              </div>
            </div>
          </motion.a>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/whitepaper"
              className="group w-full bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-purple-500/10 hover:from-purple-500/20 hover:via-purple-500/10 hover:to-purple-500/20 rounded-2xl px-6 py-4 text-center transition-all duration-300 flex items-center justify-center gap-2 border border-purple-500/20 hover:border-purple-400/40 shadow-lg hover:shadow-purple-500/20"
            >
              <span className="text-purple-300 font-semibold text-base group-hover:text-purple-200 transition-colors drop-shadow-sm">{DFaithTranslations[lang].ctaWhitepaper}</span>
              <ArrowRight className="text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300" size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}