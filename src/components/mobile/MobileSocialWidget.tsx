'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Mail, Copy, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SocialWidgetTrans from '@/lib/translations/SocialWidgetTrans';

interface MobileSocialWidgetProps {
  onClose: () => void;
}

export default function MobileSocialWidget({ onClose }: MobileSocialWidgetProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const socialLinks = [
    {
      name: 'D.FAITH',
      icon: ({ size, className }: { size: number, className?: string }) => (
        <div style={{ width: size, height: size }} className={`${className ?? ''} rounded-lg overflow-hidden`}>
          <Image src="/dfaith-token.png" alt="D.FAITH Token" width={size} height={size} />
        </div>
      ),
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.querySelector('#dfaith');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      },
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/40',
      description: 'tokenDesc'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dawidfaith/',
      gradient: 'from-pink-500/20 to-purple-500/20',
      borderColor: 'border-pink-500/40',
      description: 'instagram'
    },
    {
      name: 'Facebook',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/profile.php?id=61572473614500',
      gradient: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/40',
      description: 'facebook'
    },
    {
      name: 'TikTok',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@dawidfaith',
      gradient: 'from-gray-900/20 to-pink-500/20',
      borderColor: 'border-pink-500/40',
      description: 'tiktok'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dawidfaith',
      gradient: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-500/40',
      description: 'youtube'
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: () => setShowEmailModal(true),
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/40',
      description: 'email'
    }
  ];

  // Brand colors for icons
  const brandColors: Record<string, string> = {
    'D.FAITH': '#A78BFA',
    'Instagram': '#E1306C',
    'Facebook': '#1877F2',
    'TikTok': '#000000',
    'YouTube': '#FF0000',
    'E-Mail': '#10B981'
  };

  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const handleEmailClick = async () => {
    const email = 'dawid.faith@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-t-3xl border-t border-purple-400/30 p-6 max-h-[85vh] overflow-y-auto shadow-[0_-10px_40px_-15px_rgba(168,85,247,0.3)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-purple-500/30">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Dawid Faith
                </h3>
                <p className="text-sm text-gray-400">{SocialWidgetTrans[lang].followMe}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  onClick={(e) => {
                    if (link.action) {
                      e.preventDefault();
                      link.action();
                    }
                  }}
                  target={link.url ? '_blank' : undefined}
                  rel={link.url ? 'noopener noreferrer' : undefined}
                  className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-4 border ${link.borderColor} hover:bg-white/5 transition-colors cursor-pointer group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 bg-black/20 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon size={28} style={{ color: brandColors[link.name] }} className={link.name === 'D.FAITH' ? 'rounded-lg' : ''} />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">{link.name}</div>
                      <div className="text-gray-400 text-sm">
                        {SocialWidgetTrans[lang][link.description]}
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
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
                className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30 shadow-2xl max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Mail size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{SocialWidgetTrans[lang].professionalRequests}</h3>
                  <p className="text-gray-300">{SocialWidgetTrans[lang].aboutText}</p>
                </div>

                <div className="bg-black/30 rounded-xl p-4 mb-6 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono">dawid.faith@gmail.com</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEmailClick}
                      className="text-green-400 hover:text-green-300 transition-colors"
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
                      {SocialWidgetTrans[lang].emailCopySuccess}
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailClick}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-medium"
                  >
                    {SocialWidgetTrans[lang].copyEmail}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmailModal(false)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    {SocialWidgetTrans[lang].close}
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