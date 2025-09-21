'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileDFaithSection() {
  const [view, setView] = useState<'fans' | 'supporter'>('fans');

  return (
    <section id="dfaith" className="relative py-16 px-4 bg-gradient-to-b from-slate-900/30 to-purple-900/10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5" />

      <div className="relative z-10 container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            D.FAITH Ökosystem – kurz erklärt
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            Likes, Kommentare, Shares – dein Support bringt dir Tokens. Frühere Musik, exklusive Vorteile, einfache Auszahlung.
          </p>
        </motion.div>

        {/* Content: Mobile-optimized version of desktop layout */}
        <div className="space-y-8">
          {/* Text Content with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">Für Fans & Supporter</span>
              <span className="text-gray-400 text-xs">Einfach. Fair. Sofort.</span>
            </div>

            {/* Value propositions in mobile grid */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="rounded-xl border border-gray-700/40 bg-slate-900/40 px-3 py-2 text-xs text-gray-200">💬 Interagiere & erhalte Token</div>
              <div className="rounded-xl border border-gray-700/40 bg-slate-900/40 px-3 py-2 text-xs text-gray-200">🎧 Früher Zugang zu Songs</div>
              <div className="rounded-xl border border-gray-700/40 bg-slate-900/40 px-3 py-2 text-xs text-gray-200">💸 Einfach auszahlen</div>
            </div>

            {/* Tab system */}
            <div className="inline-flex p-1 rounded-full bg-slate-800/60 border border-gray-700/40 mb-4 w-full">
              {(['fans','supporter'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`flex-1 py-2 px-3 rounded-full text-sm font-semibold transition-colors ${
                    view === key ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {key === 'fans' ? 'Für Fans' : 'Für Supporter'}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-900/60 to-purple-900/30 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20 mb-6">
              {view === 'fans' ? (
                <ul className="list-disc ml-4 space-y-2 text-gray-200 text-sm">
                  <li>Like, kommentiere, teile – sammle automatisch D.FAITH Token.</li>
                  <li>Nutze Token für frühen Zugang, VIP-Erlebnisse und Rabatte.</li>
                  <li>Willst du auszahlen? Einfach und transparent möglich.</li>
                </ul>
              ) : (
                <ul className="list-disc ml-4 space-y-2 text-gray-200 text-sm">
                  <li>Kaufe D.INVEST zum Fixpreis (5€) und unterstütze die Musik direkt.</li>
                  <li>Erhalte wöchentlich D.FAITH Token als Dankeschön.</li>
                  <li>Mehr Support = mehr Reichweite = stärkeres Ökosystem.</li>
                </ul>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <motion.a
                href="https://leaderboard-pi-liard.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg text-sm"
              >
                Jetzt Token verdienen
              </motion.a>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/whitepaper"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border-2 border-purple-500/60 hover:bg-purple-500/10 text-sm w-full"
                >
                  Whitepaper lesen
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Token Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto w-48 h-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-blue-500/30 blur-2xl animate-pulse" />
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
}