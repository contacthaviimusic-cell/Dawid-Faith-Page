'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Mail, Copy, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface MobileSocialWidgetProps {
  onClose: () => void;
}

export default function MobileSocialWidget({ onClose }: MobileSocialWidgetProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dawidfaith/',
      color: 'from-pink-500 to-purple-600',
      description: 'Stories & Updates'
    },
    {
      name: 'Facebook',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/profile.php?id=61572473614500',
      color: 'from-blue-600 to-blue-700',
      description: 'Community & News'
    },
    {
      name: 'TikTok',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@dawidfaith',
      color: 'from-gray-900 via-pink-500 to-cyan-400',
      description: 'Short Videos'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dawidfaith',
      color: 'from-red-500 to-red-600',
      description: 'Musik Videos & Behind the Scenes'
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: () => setShowEmailModal(true),
      color: 'from-green-500 to-green-600',
      description: 'Professionelle Anfragen'
    }
  ];

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('dawid.faith@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-t from-gray-900 via-purple-900/30 to-pink-900/20 rounded-t-3xl border-t border-l border-r border-purple-500/30 w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Dawid Faith</h2>
                <p className="text-gray-400 text-sm">Künstler • Visionär</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Social Links */}
          <div className="p-6 space-y-4">
            {socialLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (link.action) {
                    link.action();
                  } else if (link.url) {
                    window.open(link.url, '_blank');
                  }
                }}
                className={`w-full bg-gradient-to-r ${link.color} p-4 rounded-2xl flex items-center gap-4 text-white shadow-xl`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <link.icon size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">{link.name}</h3>
                  <p className="text-white/80 text-sm">{link.description}</p>
                </div>
                {link.url && <ExternalLink size={20} className="text-white/60" />}
              </motion.button>
            ))}
          </div>

          {/* Bio Section */}
          <div className="px-6 pb-4">
            <div className="bg-black/30 rounded-2xl p-4 border border-gray-700 mb-4">
              <h3 className="text-white font-bold mb-2">Über Dawid Faith</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Innovativer Künstler, der Musik mit Blockchain-Technologie verbindet. 
                Erlebe die Zukunft der Musikindustrie mit D.FAITH Token und exklusiven Community-Features.
              </p>
            </div>

            {/* D.FAITH Token Teaser */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-4 border border-purple-500/30 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/dfaith-token.png"
                    alt="D.FAITH Token"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-bold">D.FAITH Token</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Dein Zugang zur exklusiven Dawid Faith Community
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector('#dfaith');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 300);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-xl font-medium text-sm"
              >
                Mehr erfahren
              </motion.button>
            </div>

            {/* Quick Newsletter */}
            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-4 border border-green-500/30">
              <h3 className="text-white font-bold mb-2 text-center">Stay Connected</h3>
              <p className="text-gray-300 text-xs text-center mb-3">
                Erhalte Updates zu neuen Songs und Konzerten
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector('#konzerte');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 300);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-xl font-medium text-sm"
              >
                Newsletter abonnieren
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Email Modal */}
        <AnimatePresence>
          {showEmailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowEmailModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-600 p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-blue-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Professionelle Anfragen
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Für Business-Anfragen, Kooperationen und Bookings
                  </p>
                </div>

                <div className="bg-black/30 rounded-xl p-4 mb-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono text-sm">
                      dawid.faith@gmail.com
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEmailClick}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Copy size={18} />
                    </motion.button>
                  </div>
                </div>

                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 mb-4 text-center"
                  >
                    <p className="text-green-400 text-sm font-medium">
                      ✓ E-Mail in Zwischenablage kopiert!
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEmailClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    E-Mail kopieren
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmailModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    Schließen
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}