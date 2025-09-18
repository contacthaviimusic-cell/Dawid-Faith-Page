'use client';

import { motion } from 'framer-motion';
import { Music, Play, Pause, Sparkles, Users, Trophy, ArrowRight, Download, Instagram, Youtube, ShoppingBag, Calendar, Heart, ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import NewsSection from '../components/NewsSection';
import DFaithSection from '../components/DFaithSection';
import SocialMediaWidget from '../components/SocialMediaWidget';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [showEcoDetails, setShowEcoDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navigation />
  <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Floating Social Widget Button & Overlay */}
      <div className="hidden lg:block">
        {/* Pulsierender Button */}
        {!showWidget && (
          <button
            onClick={() => setShowWidget(true)}
            className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg border-4 border-purple-400 hover:scale-110 transition-transform bg-gradient-to-r from-purple-500 to-pink-500 p-0 animate-pulse"
            aria-label="Social Media öffnen"
          >
            <span className="block w-16 h-16 rounded-full overflow-hidden relative">
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith Social Widget"
                fill
                className="object-cover rounded-full"
                priority
              />
              <span className="absolute inset-0 rounded-full border-4 border-purple-400 animate-pulse pointer-events-none" />
            </span>
          </button>
        )}
        {/* Overlay Widget */}
        {showWidget && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              <button
                onClick={() => setShowWidget(false)}
                className="absolute -top-3 -right-3 bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center border border-white hover:bg-pink-600 transition-colors z-10"
                aria-label="Schließen"
              >
                ×
              </button>
              <SocialMediaWidget compact />
            </div>
          </div>
        )}
      </div>
        {/* Studio Lighting Effects */}
        <div className="absolute inset-0">
          {/* Neon Strips */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
          
          {/* Studio Spotlights */}
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-32 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Hero Landing Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
          {/* Background Image - Ökosystem */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/dawid-faith-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center gap-8 relative">
              
              {/* Main Title - Now at Top */}
              <div className="text-center relative">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <h1 
                    className="text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-wider [font-family:var(--font-pirata),cursive]"
                  >
                    DAWID FAITH
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-xl lg:text-2xl mb-8">
                    <Music className="text-purple-400 animate-pulse" />
                    <span className="text-gray-200 font-semibold">Künstler  • Liedermacher • Visionär</span>
                    <Sparkles className="text-pink-400 animate-pulse" />
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Play size={20} />
                      Einladung zum Release Konzert
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-purple-500 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        const el = document.querySelector('#dfaith');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <div className="relative w-5 h-5">
                        <Image
                          src="/dfaith-token.png"
                          alt="D.FAITH Token"
                          fill
                          className="object-contain"
                        />
                      </div>
                      D.FAITH erleben
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* D.FAITH Ecosystem Section */}
        <DFaithSection />

        {/* Musik Section */}
        <section id="musik" className="py-20 px-4 relative bg-gradient-to-b from-purple-900/10 to-slate-900/20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Musik
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entdecke Dawid Faith's neueste Tracks, Alben und exklusive Releases. 
                Erlebe Musik in einer völlig neuen Dimension.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Kommende Releases</h3>
              <p className="text-gray-300 mb-6">
                Bleib dran für die neuesten Musikveröffentlichungen und exklusive Previews.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
              >
                Musik entdecken
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Konzerte Section */}
        <section id="konzerte" className="py-20 px-4 relative bg-gradient-to-b from-slate-900/20 to-purple-900/10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Konzerte & Events
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Erlebe Dawid Faith live! Hier findest du alle kommenden Konzerte, 
                Events und exklusive Live-Performances.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Live in Berlin</h3>
                <p className="text-gray-300 mb-4">15. Januar 2025 • 20:00 Uhr</p>
                <p className="text-sm text-gray-400 mb-4">Mercedes-Benz Arena</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold text-sm"
                >
                  Tickets
                </motion.button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-3 text-purple-300">VIP Experience</h3>
                <p className="text-gray-300 mb-4">Exklusive Meet & Greets</p>
                <p className="text-sm text-gray-400 mb-4">Nur für D.FAITH Token Inhaber</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold text-sm"
                >
                  Mehr erfahren
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 
                className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ fontFamily: 'Pirata One, cursive' }}
              >
                Dawid Faith
              </h3>
              <p className="text-gray-400">
                Wo Musik auf Blockchain trifft
              </p>
            </motion.div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2024 Dawid Faith. Alle Rechte vorbehalten.</p>
              <p className="mt-2">Powered by D.FAITH Ecosystem</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}