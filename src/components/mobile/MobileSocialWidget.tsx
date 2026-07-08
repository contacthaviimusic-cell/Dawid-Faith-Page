'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Mail, Copy, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SocialWidgetTrans from '@/lib/translations/SocialWidgetTrans';

interface MobileSocialWidgetProps {
  onClose: () => void;
}

type CustomIconProps = {
  size: number;
  className?: string;
  style?: React.CSSProperties;
};

type SocialLink = {
  name: string;
  icon: LucideIcon | ((props: { size: number; className: string }) => React.ReactNode);
  url?: string;
  action?: () => void;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  description: keyof typeof SocialWidgetTrans.de;
};

export default function MobileSocialWidget({ onClose }: MobileSocialWidgetProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dawidfaith/',
      color: 'from-pink-500 via-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
      borderColor: 'border-pink-500/40',
      hoverColor: 'hover:border-pink-400',
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
      color: 'from-blue-600 via-blue-500 to-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-600/20 to-blue-500/20',
      borderColor: 'border-blue-500/40',
      hoverColor: 'hover:border-blue-400',
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
      color: 'from-gray-900 via-pink-500 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-gray-900/20 to-pink-500/20',
      borderColor: 'border-pink-500/40',
      hoverColor: 'hover:border-cyan-400',
      description: 'tiktok'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dawidfaith',
      color: 'from-red-600 via-red-500 to-red-700',
      bgColor: 'bg-gradient-to-br from-red-600/20 to-red-500/20',
      borderColor: 'border-red-500/40',
      hoverColor: 'hover:border-red-400',
      description: 'youtube'
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: () => setShowEmailModal(true),
      color: 'from-green-600 via-green-500 to-green-700',
      bgColor: 'bg-gradient-to-br from-green-600/20 to-green-500/20',
      borderColor: 'border-green-500/40',
      hoverColor: 'hover:border-green-400',
      description: 'email'
    },
    {
      name: 'D.FAITH',
      icon: ({ size, className }: CustomIconProps) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.querySelector('#dfaith');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      },
      color: 'from-amber-600 via-yellow-500 to-amber-500',
      bgColor: 'bg-gradient-to-br from-amber-600/20 to-yellow-500/20',
      borderColor: 'border-amber-500/40',
      hoverColor: 'hover:border-amber-400',
      description: 'tokenDesc'
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
          className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl rounded-t-2xl border-t border-amber-500/20 p-6 max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hairline top border + ambient glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute -top-10 right-0 w-40 h-40 bg-amber-500/[0.06] rounded-full blur-[80px]" />

          {/* Header */}
          <div className="relative z-10 flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40">
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-black text-lg">
                Dawid Faith
              </h3>
              <p className="text-amber-400 text-sm">{SocialWidgetTrans[lang].followMe}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-stone-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Social Links Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-3">
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
                  className="bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06] rounded-xl p-3 transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon size={20} style={{ color: brandColors[link.name] }} className="group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-stone-300 group-hover:text-white text-sm font-medium transition-colors">
                      {link.name}
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
                className="bg-black/95 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 shadow-2xl max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                {/* Header */}
                <div className="relative text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Mail size={26} className="text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    {SocialWidgetTrans[lang].professionalRequests}
                  </h3>
                  <p className="text-stone-400 text-sm">{SocialWidgetTrans[lang].aboutText}</p>
                </div>

                {/* Email Display */}
                <div className="bg-white/[0.03] rounded-xl p-4 mb-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-amber-400" />
                      <span className="text-white font-mono text-sm select-all">dawid.faith@gmail.com</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEmailClick}
                      className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-2 rounded-lg transition-colors"
                    >
                      {emailCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailClick}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    {SocialWidgetTrans[lang].copyEmail}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmailModal(false)}
                    className="w-full border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all"
                  >
                    {SocialWidgetTrans[lang].close}
                  </motion.button>
                </div>

                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/30 rounded-full py-1.5 px-3"
                  >
                    <p className="text-amber-400 text-xs font-medium flex items-center gap-1">
                      <CheckCircle size={12} />
                      <span>{SocialWidgetTrans[lang].emailCopySuccess}</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}