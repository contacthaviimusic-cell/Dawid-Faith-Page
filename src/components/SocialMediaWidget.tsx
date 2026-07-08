'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Play, Star, Mail, Copy, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface SocialMediaWidgetProps {
  compact?: boolean;
}

const SocialMediaWidget: React.FC<SocialMediaWidgetProps> = ({ compact = true }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  // Initialize lang and listen for site-lang-changed
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  const copyEmailToClipboard = async () => {
    const email = 'dawid.faith@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const openEmailClient = () => {
    window.location.href = 'mailto:dawid.faith@gmail.com';
    setShowEmailModal(false);
  };

  const EmailModal = () => (
    <AnimatePresence>
      {showEmailModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowEmailModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-black/95 backdrop-blur-xl rounded-2xl p-8 border border-amber-500/20 shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            {/* Close Button */}
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Mail size={26} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Kontakt aufnehmen</h3>
              <p className="text-stone-400">Schreib mir eine E-Mail!</p>
            </div>

            {/* Email Display */}
            <div className="bg-white/[0.03] rounded-xl p-4 mb-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-400" />
                  <span className="text-white font-mono text-sm">dawid.faith@gmail.com</span>
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-2 rounded-lg transition-colors"
                >
                  {emailCopied ? (
                    <>
                      <CheckCircle size={16} />
                      <span className="text-xs">Kopiert!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="text-xs">Kopieren</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={openEmailClient}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                E-Mail-Client öffnen
              </motion.button>

              <motion.button
                onClick={() => setShowEmailModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all"
              >
                Schließen
              </motion.button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-stone-500 text-center mt-4">
              Falls sich kein E-Mail-Client öffnet, nutze die kopierte Adresse in deinem bevorzugten E-Mail-Programm.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dawidfaith/',
      iconColor: '#E1306C',
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
      iconColor: '#1877F2',
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
      iconColor: '#ffffff',
      description: 'Short Videos'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dawidfaith',
      iconColor: '#FF0000',
      description: 'Music Videos'
    },
    {
      name: 'E-Mail',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      url: 'mailto:dawid.faith@gmail.com',
      iconColor: '#f59e0b',
      description: 'dawid.faith@gmail.com'
    },
    {
      name: 'D.FAITH',
      icon: Star,
      url: '#',
      iconColor: '#f59e0b',
      description: 'Exklusiver Zugang'
    }
  ];

  if (compact) {
    return (
      <>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
          className="bg-black/95 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 shadow-2xl max-w-sm relative overflow-hidden"
        >
        {/* Hairline top border, matching site sections */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/[0.06] rounded-full blur-[80px]" />

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
          <div>
            <h3 className="text-white font-black text-lg">
              Dawid Faith
            </h3>
            <p className="text-amber-400 text-sm">Folge mir</p>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2 mb-5">
          {socialLinks.slice(0, 6).map((link, index) => (
            <motion.a
              key={link.name}
              href={link.name === 'E-Mail' ? undefined : link.url}
              target={link.name === 'E-Mail' ? undefined : "_blank"}
              rel={link.name === 'E-Mail' ? undefined : "noopener noreferrer"}
              onClick={link.name === 'E-Mail' ? handleEmailClick : undefined}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 + 0.2 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06] p-4 rounded-xl transition-all duration-300 group ${link.name === 'E-Mail' ? 'cursor-pointer' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                <link.icon
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                  style={{ color: link.iconColor }}
                />
                <div className="text-center">
                  <div className="text-stone-300 group-hover:text-white font-medium text-xs transition-colors">{link.name}</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/10">
          <p className="text-center text-xs text-stone-500">
            {lang === 'de' ? 'Musik · Blockchain · Community' : lang === 'pl' ? 'Muzyka · Blockchain · Społeczność' : 'Music · Blockchain · Community'}
          </p>
        </div>
      </motion.div>
      <EmailModal />
    </>);
  }

  // Full Widget (non-compact)
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
        className="bg-gradient-to-br from-stone-900/98 via-amber-900/95 to-yellow-900/98 backdrop-blur-3xl rounded-3xl p-8 border border-amber-400/40 shadow-2xl max-w-md relative overflow-hidden"
      >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <motion.div 
          className="relative w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden ring-4 ring-amber-400/60 shadow-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/dawid-faith.jpg"
            alt="Dawid Faith"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-transparent" />
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-amber-400/50"
            animate={{
              boxShadow: [
                '0 0 20px rgba(217, 119, 6, 0.3)',
                '0 0 40px rgba(217, 119, 6, 0.6)',
                '0 0 20px rgba(217, 119, 6, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <h3 className="text-white font-bold text-2xl mb-2 bg-gradient-to-r from-white via-amber-200 to-yellow-200 bg-clip-text text-transparent">
          Dawid Faith
        </h3>
        <p className="text-amber-300 font-medium">Singer-Songwriter</p>
      </div>

      {/* Social Links Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mb-6">
        {socialLinks.slice(0, 6).map((link, index) => (
          <motion.a
            key={link.name}
            href={link.name === 'E-Mail' ? undefined : link.url}
            target={link.name === 'E-Mail' ? undefined : "_blank"}
            rel={link.name === 'E-Mail' ? undefined : "noopener noreferrer"}
            onClick={link.name === 'E-Mail' ? handleEmailClick : undefined}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.15,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              rotateY: 10,
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`${link.bgColor} ${link.borderColor} ${link.hoverColor} border-2 p-5 rounded-2xl transition-all duration-300 group backdrop-blur-sm relative overflow-hidden transform-gpu ${link.name === 'E-Mail' ? 'cursor-pointer' : ''}`}
          >
            {/* Dynamic Hover Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <link.icon 
                  size={26} 
                  className="text-white drop-shadow-lg" 
                />
              </motion.div>
              <div className="text-center">
                <div className="text-white font-bold text-sm mb-1">{link.name}</div>
                <div className="text-xs text-amber-200 mt-1 opacity-80">
                  {link.description}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 space-y-4">
        <h4 className="text-white font-bold text-center text-lg">Stay Connected</h4>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Deine E-Mail"
            className="flex-1 px-4 py-3 bg-black/60 border-2 border-stone-600/50 rounded-xl text-white text-sm placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-all duration-300 backdrop-blur-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 hover:shadow-amber-500/25"
          >
            <Play size={16} />
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-stone-600/50 text-center">
        <motion.p 
          className="text-xs text-stone-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {lang === 'de' ? '🎵 Musik • Blockchain • Community • Exklusive Inhalte' : lang === 'pl' ? '🎵 Muzyka • Blockchain • Społeczność • Ekskluzywne treści' : '🎵 Music • Blockchain • Community • Exclusive content'}
        </motion.p>
      </div>
    </motion.div>
    <EmailModal />
  </>);
};

export default SocialMediaWidget;