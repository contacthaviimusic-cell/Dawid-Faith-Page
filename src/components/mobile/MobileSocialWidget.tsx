'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Mail, Copy, ExternalLink } from 'lucide-react';
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
  color: 'bg-gray-800/50',
  description: 'tokenDesc'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dawidfaith/',
  color: 'bg-gray-800/40',
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
  color: 'bg-gray-800/40',
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
  color: 'bg-gray-800/40',
  description: 'tiktok'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dawidfaith',
  color: 'bg-gray-800/40',
  description: 'youtube'
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: () => setShowEmailModal(true),
  color: 'bg-gray-800/40',
  description: 'email'
    }
  ];

  // Brand colors for icons (icons use currentColor / inherit from wrapper)
  const brandColors: Record<string, string> = {
    'D.FAITH': '#A78BFA', // purple
    'Instagram': '#E1306C',
    'Facebook': '#1877F2',
    'TikTok': '#000000',
    'YouTube': '#FF0000',
    'E-Mail': '#10B981'
  };

  // typed alias for translations to avoid any casts at usage sites
  const translations: Record<'de'|'en'|'pl', Record<string, string>> = SocialWidgetTrans as unknown as Record<'de'|'en'|'pl', Record<string, string>>;

  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
  } catch (_err) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

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
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-t from-gray-900 via-purple-900/30 to-pink-900/20 rounded-t-3xl border-t border-l border-r border-purple-500/30 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white [font-family:var(--font-pirata),cursive]">Dawid Faith</h2>
                <p className="text-gray-400 text-xs">Künstler • Visionär</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-12 h-12 bg-red-600/20 hover:bg-red-600/40 border-2 border-red-500/50 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else if (link.url) {
                      window.open(link.url, '_blank');
                    }
                  }}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center text-white min-h-[100px] relative`} 
                  style={{ background: 'rgba(31, 41, 55, 0.6)', border: '1px solid rgba(148,163,184,0.06)' }}
                >
                  {(() => {
                    const isToken = link.name === 'D.FAITH';
                    const wrapperClass = isToken ? 'w-14 h-14 bg-white/6 rounded-full flex items-center justify-center mb-2 border border-white/6' : 'w-8 h-8 bg-white/6 rounded-lg flex items-center justify-center mb-2 border border-white/6';
                    const iconSize = isToken ? 34 : 16;
                    return (
                      <div className={wrapperClass} style={{ color: brandColors[link.name] || undefined }}>
                        {link.name === 'D.FAITH' ? (
                          <link.icon size={iconSize} className="" />
                        ) : (
                          <link.icon size={iconSize} className="" />
                        )}
                      </div>
                    );
                  })()}
                        <h3 className="font-bold text-sm text-center text-white">{link.name}</h3>
                  {/* typed access to translations to avoid any */}
                  <p className="text-white/70 text-xs text-center mt-1 leading-tight">{translations[lang][link.description] || link.description}</p>
                  {link.url && (
                    <div className="absolute top-2 right-2">
                      <ExternalLink size={12} className="text-white/60" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bio Section */}
          <div className="px-4 pb-6">
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700 mb-3">
              <h3 className="text-white font-bold mb-2 text-sm">{SocialWidgetTrans[lang].aboutTitle}</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                {SocialWidgetTrans[lang].aboutText}
              </p>
            </div>

            {/* D.FAITH Token Teaser moved into the social links grid */}

            {/* Quick Newsletter */}
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700 mb-3">
              <h3 className="text-white font-bold mb-1 text-center text-sm">{SocialWidgetTrans[lang].stayConnected}</h3>
              <p className="text-gray-300 text-xs text-center mb-2">
                {SocialWidgetTrans[lang].newsletterDesc}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector('#newsletter');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 300);
                }}
                className="w-full bg-white/6 text-white py-2 rounded-lg font-medium text-xs border border-white/6"
              >
                {SocialWidgetTrans[lang].subscribe}
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
                  <h3 className="text-xl font-bold text-white mb-2">{SocialWidgetTrans[lang].professionalRequests}</h3>
                  <p className="text-gray-400 text-sm">
                    {SocialWidgetTrans[lang].aboutText}
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
                      {SocialWidgetTrans[lang].emailCopySuccess}
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
                    {SocialWidgetTrans[lang].professionalRequests}
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