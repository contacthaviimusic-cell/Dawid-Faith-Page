'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Video, Smartphone, ExternalLink, ShoppingBag } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  image: string;
  video: string;
  description: string;
}

const songs: Song[] = [
  {
    id: 'katze',
    title: 'Katze',
    image: '/musik/katze/photo_2026-01-06_14-31-47.jpg',
    video: '/musik/katze/video_2026-04-10_14-55-08.mp4',
    description: 'Der erste Song der Release Kampagne - ab 18. September 2026'
  },
  {
    id: 'znikla',
    title: 'Znikła',
    image: '/musik/znikla/Znikła pic.jpg',
    video: '/musik/znikla/Znikłą Vid1.mp4',
    description: 'Die polnische Version - eine intensive Reise durch Verlust, Sehnsucht und die Suche nach dem was verschwunden ist'
  },
  {
    id: 'maria',
    title: 'Maria',
    image: '/musik/maria/Maria.jpg',
    video: '/musik/maria/Maria Vid1.mp4',
    description: 'Eine herzzerreißende Ballade über Einsamkeit, verlorene Liebe und die schmerzhafte Erkenntnis des Alleinseins'
  },
  {
    id: 'niebianski-groove',
    title: 'Niebianski Groove',
    image: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png',
    video: '/musik/niebianski-groove/video_2026-04-10_15-15-15.mp4',
    description: 'Ein weiterer Track aus der Release Kampagne'
  },
  {
    id: 'jupiter',
    title: 'Jupiter',
    image: '/musik/jupiter/Jupiter-Cover.jpg',
    video: '/musik/jupiter/Jupiter.mp4',
    description: 'Der fünfte Song der Release Kampagne'
  }
];

import MusicTranslations from '../lib/translations/MusicSectionTrans';

const MusicSection = () => {
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de' | 'en' | 'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  return (
    <section id="music" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header – editorial, left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {MusicTranslations[lang].title}
          </h2>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="text-stone-400 text-sm">{MusicTranslations[lang].appNote}</span>
          </div>
        </motion.div>

        {/* Tracklist */}
        <div className="space-y-4">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/[0.03] rounded-2xl border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-stretch">
                {/* Track number */}
                <div className="hidden sm:flex items-center justify-center w-20 shrink-0 border-r border-white/5">
                  <span className="text-3xl font-black text-stone-700 group-hover:text-amber-500/60 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Cover */}
                <div className="relative w-full sm:w-44 h-44 shrink-0 overflow-hidden">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                    aria-label={showVideo === song.id ? MusicTranslations[lang].videoClose : MusicTranslations[lang].videoOpen}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="w-12 h-12 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 transition-colors">
                      <Video className="w-5 h-5 text-black" />
                    </span>
                  </button>
                </div>

                {/* Info + actions */}
                <div className="flex-1 p-6 flex flex-col justify-center gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                      {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![song.id]?.title) || song.title}
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![song.id]?.description) || song.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {song.id === 'katze' && (
                      <Link
                        href="/pre-order/katze"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {MusicTranslations[lang].preorderButton}
                      </Link>
                    )}
                    <button
                      onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <Video className="w-3.5 h-3.5" />
                      {showVideo === song.id ? MusicTranslations[lang].videoClose : MusicTranslations[lang].videoOpen}
                    </button>
                    <a
                      href="https://app.dawidfaith.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {MusicTranslations[lang].webappButton}
                    </a>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              {showVideo === song.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/10"
                >
                  <video
                    controls
                    className="w-full max-h-[28rem] bg-black"
                    poster={song.image}
                    preload="metadata"
                  >
                    <source src={song.video} type="video/mp4" />
                    Dein Browser unterstützt keine Videos.
                  </video>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Webapp CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.07] via-transparent to-amber-500/[0.07] p-8 md:p-10 text-center overflow-hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl md:text-3xl font-black text-white">{MusicTranslations[lang].exclusiveTitle}</h3>
            </div>
            <p className="text-stone-400 mb-7 max-w-2xl mx-auto leading-relaxed">
              {MusicTranslations[lang].exclusiveDesc}
            </p>
            <a
              href="https://app.dawidfaith.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              <ExternalLink className="w-4 h-4" />
              {MusicTranslations[lang].webappButton}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
