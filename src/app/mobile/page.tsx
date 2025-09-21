'use client';

import { motion } from 'framer-motion';
import { Music, Play, Sparkles, Heart, Calendar, Mail } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MobileNavigation from '../../components/mobile/MobileNavigation';
import MobileNewsSection from '../../components/mobile/MobileNewsSection';
import MobileDFaithSection from '../../components/mobile/MobileDFaithSection';
import MobileMusicSection from '../../components/mobile/MobileMusicSection';
import MobileKonzerteSection from '../../components/mobile/MobileKonzerteSection';
import MobileSocialWidget from '../../components/mobile/MobileSocialWidget';

export default function MobilePage() {
  const [mounted, setMounted] = useState(false);
  const [showSocialWidget, setShowSocialWidget] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MobileNavigation />
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        
        {/* Mobile Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
          {/* Background */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/dawid-faith-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto relative z-10 text-center">
            {/* Artist Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-wider [font-family:var(--font-pirata),cursive]">
                DAWID FAITH
              </h1>
              
              <div className="flex items-center justify-center gap-2 text-lg mb-6">
                <Music className="text-purple-400 animate-pulse" size={20} />
                <span className="text-gray-200 font-medium">Künstler • Visionär</span>
                <Sparkles className="text-pink-400 animate-pulse" size={20} />
              </div>
            </motion.div>

            {/* Mobile CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                onClick={() => {
                  const el = document.querySelector('#news');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const event = new CustomEvent('openReleaseNews');
                    window.dispatchEvent(event);
                  }, 800);
                }}
              >
                <Calendar size={24} />
                <span>Release Konzert</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-purple-500 hover:bg-purple-500/10 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
                onClick={() => {
                  const el = document.querySelector('#dfaith');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <div className="relative w-6 h-6">
                  <Image
                    src="/dfaith-token.png"
                    alt="D.FAITH Token"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>D.FAITH erleben</span>
              </motion.button>
            </motion.div>

            {/* Quick Access Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-6 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const el = document.querySelector('#music');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30"
              >
                <Play className="text-purple-400" size={24} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const el = document.querySelector('#dfaith');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30"
              >
                <div className="relative w-6 h-6">
                  <Image
                    src="/dfaith-token.png"
                    alt="D.FAITH Token"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const el = document.querySelector('#konzerte');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
              >
                <Mail className="text-blue-400" size={24} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Mobile Sections */}
        <MobileNewsSection />
        <MobileDFaithSection />
        <MobileMusicSection />
        <MobileKonzerteSection />

        {/* Mobile Social Widget */}
        {showSocialWidget && (
          <MobileSocialWidget onClose={() => setShowSocialWidget(false)} />
        )}

        {/* Floating Social Button */}
        {!showSocialWidget && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSocialWidget(true)}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl border-4 border-purple-400/30 flex items-center justify-center animate-pulse"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith Social"
                fill
                className="object-cover"
              />
            </div>
          </motion.button>
        )}

        {/* Mobile Footer */}
        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 [font-family:var(--font-pirata),cursive]">
                Dawid Faith
              </h3>
              <p className="text-gray-400 text-sm">
                Wo Musik auf Blockchain trifft
              </p>
            </motion.div>
            
            <div className="text-gray-500 text-xs">
              <p>&copy; 2025 Dawid Faith. Alle Rechte vorbehalten.</p>
              <p className="mt-1">Powered by D.FAITH Ecosystem</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}