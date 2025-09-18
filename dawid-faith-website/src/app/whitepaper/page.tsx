'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative px-6 py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6"
            style={{ fontFamily: 'Pirata One, cursive' }}
          >
            D.FAITH Whitepaper
          </motion.h1>

          <p className="text-lg text-gray-200 mb-10">
            Kurzübersicht des Ökosystems. Für Details siehe die vollständigen Abschnitte unten.
          </p>

          <div className="grid gap-4 mb-10">
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-5 py-4">
              <h2 className="text-xl font-bold mb-1">Executive Summary</h2>
              <p className="text-gray-300 text-sm">
                Live auf Base Chain. Dual‑Token: D.FAITH (Fan‑Rewards) und D.INVEST (fix 5€; Staking mit 6‑Stufen‑Halving).
                Ziel: Fan‑Engagement vergüten, Reichweite steigern, fairer ROI für Unterstützer.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-5 py-4">
              <h2 className="text-xl font-bold mb-1">Kernfeatures</h2>
              <ul className="text-gray-300 text-sm list-disc ml-5 space-y-1">
                <li>Token‑Rewards für Likes, Kommentare, Shares, Events</li>
                <li>D.INVEST Staking öffnet gesperrte D.FAITH mit Halving‑Mechanik</li>
                <li>Live‑APIs: Leaderboard, Token‑Preise, Staking, Liquidität</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-5 py-4">
              <h2 className="text-xl font-bold mb-1">Smart Contracts (Base)</h2>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>D.FAITH Token: 0x69eFD833288605f320d77eB2aB99DDE62919BbC1</li>
                <li>D.INVEST Token: 0x6F1fFd03106B27781E86b33Df5dBB734ac9DF4bb</li>
                <li>Staking: 0xe85b32a44b9eD3ecf8bd331FED46fbdAcDBc9940</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a
              href="https://leaderboard-pi-liard.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 shadow-lg"
            >
              Zur WebApp
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </motion.a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white border-2 border-purple-500/60 hover:bg-purple-500/10"
            >
              Zurück zur Startseite
            </Link>
          </div>

          {/* Optional: kurze Strukturpunkte aus dem Whitepaper */}
          <div className="prose prose-invert max-w-none">
            <h3>1. Problem & Lösung</h3>
            <p>
              Unabhängige Künstler kämpfen mit Reichweite, Werbekosten und fehlendem Kapital. D.FAITH dreht den Spieß um:
              Fans erhalten Token‑Rewards für ihr natürliches Engagement. Marketing fließt direkt in die Community,
              steigert Reichweite und schafft einen selbstverstärkenden Kreislauf.
            </p>
            <h3>2. Tokenomics</h3>
            <ul>
              <li>D.FAITH: Fan‑Reward‑Token, handelbar, für Shop/Utility nutzbar</li>
              <li>D.INVEST: 5€ fix, Staking‑Schlüssel zu gesperrten D.FAITH, 6‑Stufen‑Halving</li>
            </ul>
            <h3>3. Roadmap</h3>
            <p>
              Foundation abgeschlossen. Community‑Aufbau läuft. Expansion mit Streaming‑Rewards, Partnerschaften und
              Governance geplant.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
