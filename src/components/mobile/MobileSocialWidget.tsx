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
      color: 'from-purple-600 via-pink-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-purple-600/20 to-pink-500/20',
      borderColor: 'border-purple-500/40',
      hoverColor: 'hover:border-purple-400',
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
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-t-3xl border-t border-purple-400/30 p-6 max-h-[85vh] overflow-y-auto shadow-[0_-10px_40px_-15px_rgba(168,85,247,0.3)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-5 -left-5 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center gap-4 mb-6">
            <motion.div 
              className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-purple-400/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="/dawid-faith.jpg"
                alt="Dawid Faith"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Dawid Faith
              </h3>
              <p className="text-purple-300 text-sm font-medium">{SocialWidgetTrans[lang].followMe}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-gray-400 hover:text-white"
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
                  className={`relative overflow-hidden ${link.bgColor} rounded-xl p-3 border ${link.borderColor} ${link.hoverColor} transition-all duration-300 cursor-pointer group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: `linear-gradient(to bottom right, ${brandColors[link.name]}20, ${brandColors[link.name]}10)`
                  }} />
                  <div className="flex flex-col items-center gap-2 text-center relative z-10">
                    <div className="p-2.5 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-sm rounded-xl group-hover:scale-110 group-hover:from-black/40 group-hover:to-black/30 transition-all duration-300">
                      <Icon size={20} style={{ color: brandColors[link.name] }} className={`${link.name === 'D.FAITH' ? 'rounded-md' : ''} drop-shadow`} />
                    </div>
                    <div className="text-white text-sm font-medium group-hover:text-white/90 transition-colors">
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
                className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30 shadow-2xl max-w-sm w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -left-5 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                  />
                </div>

                {/* Header */}
                <div className="relative text-center mb-6">
                  <motion.div 
                    className="relative w-16 h-16 mx-auto mb-4"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur opacity-50" />
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center ring-2 ring-green-400/20">
                      <Mail size={32} className="text-white drop-shadow-lg" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent mb-2">
                    {SocialWidgetTrans[lang].professionalRequests}
                  </h3>
                  <p className="text-gray-300 text-sm">{SocialWidgetTrans[lang].aboutText}</p>
                </div>

                {/* Email Display */}
                <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-500/20 shadow-inner shadow-black/10 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-green-400" />
                      <span className="text-white font-mono text-sm select-all">dawid.faith@gmail.com</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEmailClick}
                      className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-3 py-2 rounded-lg transition-colors"
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
                    className="relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <Mail size={18} className="relative z-10" />
                    <span className="relative z-10">{SocialWidgetTrans[lang].copyEmail}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmailModal(false)}
                    className="w-full bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-gray-300 py-3 rounded-xl font-medium transition-all duration-300 border border-white/10"
                  >
                    {SocialWidgetTrans[lang].close}
                  </motion.button>
                </div>

                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 shadow-lg shadow-green-500/20"
                  >
                    <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                      <CheckCircle size={12} className="drop-shadow" />
                      <span className="drop-shadow">{SocialWidgetTrans[lang].emailCopySuccess}</span>
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