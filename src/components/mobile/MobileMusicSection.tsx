'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, ExternalLink, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import CoverMedia from '../CoverMedia';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
  video: string;
  description?: string;
}

import MusicTranslations from '../../lib/translations/MusicSectionTrans';

export default function MobileMusicSection() {
  const [tracks] = useState<Track[]>([
    {
      id: 'katze',
      title: 'Katze',
      artist: 'Dawid Faith',
      duration: '3:45',
      audioSrc: '/musik/katze/Katze_V4.mp3',
      coverImage: '/musik/katze/Katze-Cover.mp4',
      video: '/musik/katze/video_2026-04-10_14-55-08.mp4',
      description: 'Der erste Song der Release Kampagne - ab 18. September 2026'
    },
    {
      id: 'znikla',
      title: 'Znikła',
      artist: 'Dawid Faith',
      duration: '4:15',
      audioSrc: '/musik/znikla/Znikła.mp3',
      coverImage: '/musik/znikla/Znikła pic.jpg',
      video: '/musik/znikla/Znikłą Vid1.mp4',
      description: 'Melancholische Töne treffen auf moderne Beats'
    },
    {
      id: 'maria',
      title: 'Maria',
      artist: 'Dawid Faith',
      duration: '3:42',
      audioSrc: '/musik/maria/Maria.mp3',
      coverImage: '/musik/maria/Maria.jpg',
      video: '/musik/maria/Maria Vid1.mp4',
      description: 'Eine emotionale Ballade über verlorene Liebe'
    },
    {
      id: 'niebianski-groove',
      title: 'Niebianski Groove',
      artist: 'Dawid Faith',
      duration: '0:36',
      audioSrc: '/musik/niebianski-groove/Niebianski.mp3',
      coverImage: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png',
      video: '/musik/niebianski-groove/video_2026-04-10_15-15-15.mp4',
      description: 'Ein weiterer Track aus der Release Kampagne'
    },
    {
      id: 'jupiter',
      title: 'Jupiter',
      artist: 'Dawid Faith',
      duration: '0:29',
      audioSrc: '/musik/jupiter/Jupiter.mp3',
      coverImage: '/musik/jupiter/Jupiter-Cover.jpg',
      video: '/musik/jupiter/Jupiter.mp4',
      description: 'Der fünfte Song der Release Kampagne'
    }
  ]);

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
    <section id="music" className="py-8 px-4 bg-gradient-to-b from-black via-yellow-900/10 to-black">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="text-yellow-400" size={28} />
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              {MusicTranslations[lang].title}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs">{MusicTranslations[lang].appNote}</span>
          </div>
        </motion.div>

        {/* Track List */}
        <div className="space-y-6 mb-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-stone-900/60 to-yellow-900/20 backdrop-blur-md rounded-2xl border border-yellow-500/20 overflow-hidden"
            >
              {/* Cover Image with Video Overlay */}
              <div className="relative h-48 overflow-hidden">
                {showVideo === track.id ? (
                  // Video Player direkt anstelle des Covers
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={track.coverImage}
                    preload="metadata"
                    autoPlay
                  >
                    <source src={track.video} type="video/mp4" />
                    Dein Browser unterstützt keine Videos.
                  </video>
                ) : (
                  // Cover Image mit Play Button
                  <>
                    <CoverMedia
                      src={track.coverImage}
                      alt={track.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Video Play Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowVideo(track.id)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-500/80 hover:bg-yellow-500 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 border-white/20"
                    >
                      <Video className="text-white" size={24} />
                    </motion.button>
                  </>
                )}

                {/* Title Overlay - nur anzeigen wenn kein Video läuft */}
                {showVideo !== track.id && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg mb-1 truncate">
                      {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![track.id]?.title) || track.title}
                    </h3>
                    <p className="text-stone-300 text-sm">
                      {track.artist}
                    </p>
                  </div>
                )}

                {/* Close Video Button - nur anzeigen wenn Video läuft */}
                {showVideo === track.id && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowVideo(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 text-white"
                  >
                    ✕
                  </motion.button>
                )}
              </div>

              {/* Track Info & Controls */}
              <div className="p-4">
                {/* Pre-Order Button */}
                {track.id === 'katze' && (
                  <Link href="/pre-order/katze" className="block mb-3">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl px-4 py-3 text-black font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <ShoppingBag size={18} />
                      {MusicTranslations[lang].preorderButton}
                    </motion.div>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* D.FAITH Webapp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-2xl border border-amber-500/30 backdrop-blur-sm p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="text-amber-400" size={24} />
            <h3 className="text-xl font-bold text-white">{MusicTranslations[lang].exclusiveTitle || 'Komplette Songs'}</h3>
          </div>
          <p className="text-stone-300 text-sm mb-4">
            {MusicTranslations[lang].exclusiveDesc || 'Höre die vollständigen Songs in der D.FAITH Webapp und verdiene Token'}
          </p>
          <motion.a
            href="https://app.dawidfaith.de"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-amber-500 active:bg-amber-400 px-6 py-3 rounded-full text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 w-full"
          >
            <ExternalLink size={18} />
            {MusicTranslations[lang].webappButton || 'D.FAITH Webapp besuchen'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}