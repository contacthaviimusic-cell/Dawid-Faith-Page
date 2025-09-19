'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Music, ExternalLink, Play, Star, Heart } from 'lucide-react';
import Image from 'next/image';

interface SocialMediaWidgetProps {
  compact?: boolean;
}

const SocialMediaWidget: React.FC<SocialMediaWidgetProps> = ({ compact = true }) => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: '#',
      color: 'from-pink-500 via-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
      borderColor: 'border-pink-500/40',
      hoverColor: 'hover:border-pink-400',
      followers: '125K',
      description: 'Stories & Updates'
    },
    {
      name: 'Facebook',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: '#',
      color: 'from-blue-600 via-blue-500 to-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-600/20 to-blue-500/20',
      borderColor: 'border-blue-500/40',
      hoverColor: 'hover:border-blue-400',
      followers: '89K',
      description: 'Community & News'
    },
    {
      name: 'TikTok',
      icon: ({ size, className }: { size: number, className: string }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: '#',
      color: 'from-gray-900 via-pink-500 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-gray-900/20 to-pink-500/20',
      borderColor: 'border-pink-500/40',
      hoverColor: 'hover:border-cyan-400',
      followers: '67K',
      description: 'Short Videos'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: '#',
      color: 'from-red-600 via-red-500 to-red-700',
      bgColor: 'bg-gradient-to-br from-red-600/20 to-red-500/20',
      borderColor: 'border-red-500/40',
      hoverColor: 'hover:border-red-400',
      followers: '245K',
      description: 'Music Videos'
    },
    {
      name: 'D.FAITH',
      icon: Star,
      url: '#',
      color: 'from-purple-600 via-pink-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-purple-600/20 to-pink-500/20',
      borderColor: 'border-purple-500/40',
      hoverColor: 'hover:border-purple-400',
      followers: 'VIP',
      description: 'Exklusiver Zugang'
    }
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
        className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl max-w-sm relative overflow-hidden"
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
          <div>
            <h3 className="text-white font-bold text-lg bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Dawid Faith
            </h3>
            <p className="text-purple-300 text-sm font-medium">Connect & Follow</p>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-5">
          {socialLinks.slice(0, 4).map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`${link.bgColor} ${link.borderColor} ${link.hoverColor} border-2 p-4 rounded-2xl transition-all duration-300 group backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Hover Effect Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <link.icon 
                  size={22} 
                  className="text-white group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="text-center">
                  <div className="text-white font-semibold text-xs">{link.name}</div>
                  <div className="text-xs text-gray-300">{link.followers}</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* D.FAITH Special Button */}
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)"
          }}
          whileTap={{ scale: 0.97 }}
          className="relative z-10 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-400/50 hover:border-purple-300 transition-all duration-300 group backdrop-blur-sm overflow-hidden"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Star size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="text-white font-bold text-sm">D.FAITH</span>
              <div className="text-xs text-purple-200">Exklusiver VIP Zugang</div>
            </div>
            <Heart size={14} className="text-purple-300 group-hover:text-pink-300 transition-colors" />
          </div>
        </motion.a>

        {/* Footer */}
        <div className="relative z-10 mt-5 pt-4 border-t border-gray-600/50">
          <motion.p 
            className="text-center text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            🎵 Folge der Musik Revolution
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Full Widget (non-compact)
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      className="bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-pink-900/98 backdrop-blur-3xl rounded-3xl p-8 border border-purple-400/40 shadow-2xl max-w-md relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"
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
          className="relative w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden ring-4 ring-purple-400/60 shadow-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/dawid-faith.jpg"
            alt="Dawid Faith"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent" />
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-purple-400/50"
            animate={{
              boxShadow: [
                '0 0 20px rgba(147, 51, 234, 0.3)',
                '0 0 40px rgba(147, 51, 234, 0.6)',
                '0 0 20px rgba(147, 51, 234, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <h3 className="text-white font-bold text-2xl mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Dawid Faith
        </h3>
        <p className="text-purple-300 font-medium">Künstler • Liedermacher • Visionär</p>
      </div>

      {/* Social Links Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
        {socialLinks.slice(0, 4).map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
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
            className={`${link.bgColor} ${link.borderColor} ${link.hoverColor} border-2 p-5 rounded-2xl transition-all duration-300 group backdrop-blur-sm relative overflow-hidden transform-gpu`}
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
                <div className="text-xs text-gray-300 bg-black/20 px-2 py-1 rounded-full">
                  {link.followers}
                </div>
                <div className="text-xs text-purple-200 mt-1 opacity-80">
                  {link.description}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* D.FAITH VIP Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mb-6"
      >
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)"
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-400/60 hover:border-purple-300 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
        >
          {/* Animated VIP Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex items-center gap-4 w-full">
            <motion.div 
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Star size={20} className="text-white" />
            </motion.div>
            <div className="flex-1">
              <span className="text-white font-bold text-base">D.FAITH VIP</span>
              <div className="text-sm text-purple-200">Exklusiver Zugang & Benefits</div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={18} className="text-pink-300" />
            </motion.div>
          </div>
        </motion.a>
      </motion.div>

      {/* Newsletter Signup */}
      <div className="relative z-10 space-y-4">
        <h4 className="text-white font-bold text-center text-lg">Stay Connected</h4>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Deine E-Mail"
            className="flex-1 px-4 py-3 bg-black/60 border-2 border-gray-600/50 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
          >
            <Play size={16} />
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-600/50 text-center">
        <motion.p 
          className="text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          🎵 Musik • Blockchain • Community • Exklusive Inhalte
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SocialMediaWidget;