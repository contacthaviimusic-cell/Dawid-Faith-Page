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
      url: 'https://instagram.com/dawid_faith_music',
      color: 'from-pink-500 to-purple-600',
      description: 'Folge mir für Daily Updates'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@DawidFaithMusic',
      color: 'from-red-500 to-red-600',
      description: 'Musik Videos & Behind the Scenes'
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: () => setShowEmailModal(true),
      color: 'from-blue-500 to-blue-600',
      description: 'Professionelle Anfragen'
    }
  ];

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('contact@dawidfaith.com');
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
                  <link.icon size={24} />
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
          <div className="px-6 pb-6">
            <div className="bg-black/30 rounded-2xl p-4 border border-gray-700">
              <h3 className="text-white font-bold mb-2">Über Dawid Faith</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Innovativer Künstler, der Musik mit Blockchain-Technologie verbindet. 
                Erlebe die Zukunft der Musikindustrie mit D.FAITH Token und exklusiven Community-Features.
              </p>
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
                      contact@dawidfaith.com
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