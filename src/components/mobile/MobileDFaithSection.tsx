'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Coins, Users, Gift, TrendingUp, Zap, ArrowRight, Star, Crown } from 'lucide-react';

export default function MobileDFaithSection() {
  const [view, setView] = useState<'fans' | 'supporter'>('fans');
  const [showStats, setShowStats] = useState(false);

  const benefits = {
    fans: [
      { icon: Gift, text: "Automatische Token für Likes & Shares", color: "text-pink-400" },
      { icon: Crown, text: "VIP-Zugang zu neuen Songs", color: "text-purple-400" },
      { icon: TrendingUp, text: "Einfache Auszahlung möglich", color: "text-green-400" }
    ],
    supporter: [
      { icon: Coins, text: "D.INVEST für nur 5€ kaufen", color: "text-yellow-400" },
      { icon: Users, text: "Wöchentliche Token-Belohnungen", color: "text-blue-400" },
      { icon: Star, text: "Direkter Support für den Künstler", color: "text-purple-400" }
    ]
  };

  return (
    <section id="dfaith" className="relative py-16 px-4 bg-gradient-to-b from-black via-purple-900/20 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-8 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Hero Section mit Token */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="relative mb-8">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/40 via-pink-500/30 to-blue-500/40 blur-2xl animate-pulse" />
              <motion.div
                animate={{ 
                  y: [0, -8, 0], 
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/60 shadow-2xl shadow-purple-500/30"
              >
                <Image src="/dfaith-token.png" alt="D.FAITH Token" fill className="object-cover" />
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              D.FAITH Ökosystem
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              Dein Support wird belohnt. Sammle Token durch Interaktion und erlebe exklusive Vorteile.
            </p>
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
          <div className="relative bg-slate-900/60 backdrop-blur-md rounded-2xl p-1 border border-gray-700/50 mb-6">
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg"
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
                className="relative z-10 flex-1 py-3 px-4 text-sm font-semibold text-white transition-colors w-1/2 text-center"
              >
                {key === 'fans' ? '🎵 Für Fans' : '💎 Für Supporter'}
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
                  className="bg-gradient-to-r from-slate-900/80 to-purple-900/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-600/50`}>
                      <benefit.icon className={benefit.color} size={20} />
                    </div>
                    <p className="text-gray-200 text-sm font-medium flex-1">{benefit.text}</p>
                  </div>
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-0 rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl px-6 py-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Zap className="text-yellow-300" size={20} />
                <span className="text-white font-bold text-base">Jetzt Token verdienen</span>
                <ArrowRight className="text-white/80 group-hover:translate-x-1 transition-transform" size={18} />
              </div>
            </div>
          </motion.a>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/whitepaper"
              className="w-full bg-purple-500/5 hover:bg-purple-500/10 rounded-2xl px-6 py-4 text-center transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="text-purple-300 font-semibold text-base">Whitepaper lesen</span>
              <ArrowRight className="text-purple-400" size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}