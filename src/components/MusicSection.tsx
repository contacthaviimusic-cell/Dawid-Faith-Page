'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Video, Smartphone, Calendar, ShoppingBag } from 'lucide-react';

const SPOTIFY_ARTIST_ID = '0CESFIQKIs643l9hV0QXsE';

interface Song {
  id: string;
  title: string;
  image: string;
  poster?: string;
  video: string;
  description: string;
  comingSoon?: boolean;
}

const songs: Song[] = [
  {
    id: 'katze',
    title: 'Katze',
    image: '/musik/katze/Katze-Cover.mp4',
    video: '/musik/katze/video_2026-04-10_14-55-08.mp4',
    description: 'Der erste Song der Release Kampagne'
  },
  {
    id: 'niebianski-groove',
    title: 'Niebiański Groove',
    image: '/musik/niebianski-groove/Teaser%20Groove.mp4',
    poster: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png',
    video: '/musik/niebianski-groove/video_2026-04-10_15-15-15.mp4',
    description: 'Ein weiterer Track aus der Release Kampagne'
  },
  {
    id: 'maria',
    title: 'Maria',
    image: '/musik/maria/Maria.jpg',
    video: '/musik/maria/Maria Vid1.mp4',
    description: 'Eine herzzerreißende Ballade über Einsamkeit, verlorene Liebe und die schmerzhafte Erkenntnis des Alleinseins',
    comingSoon: true
  },
  {
    id: 'znikla',
    title: 'Znikła',
    image: '/musik/znikla/Znikła pic.jpg',
    video: '/musik/znikla/Znikłą Vid1.mp4',
    description: 'Die polnische Version - eine intensive Reise durch Verlust, Sehnsucht und die Suche nach dem was verschwunden ist',
    comingSoon: true
  },
  {
    id: 'jupiter',
    title: 'Jupiter',
    image: '/musik/jupiter/Jupiter-Cover.jpg',
    video: '/musik/jupiter/Jupiter.mp4',
    description: 'Der fünfte Song der Release Kampagne',
    comingSoon: true
  }
];

import MusicTranslations from '../lib/translations/MusicSectionTrans';

// Mapping von Tracklist-Song-ID auf die Single-ID im Pre-Order-System (Groove
// heißt dort "Groove", nicht "niebianski-groove") – nur für Songs, die dort
// gepflegt werden.
const PREORDER_SINGLE_ID: Record<string, string> = {
  katze: 'katze',
  'niebianski-groove': 'Groove',
};

const MusicSection = () => {
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  // Sobald das offizielle Musikvideo released ist, führt "Video ansehen" auf
  // das echte YouTube-Video statt auf den lokalen Platzhalter-Clip.
  const [releasedVideoUrls, setReleasedVideoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const entries = await Promise.all(
        Object.entries(PREORDER_SINGLE_ID).map(async ([songId, singleId]) => {
          try {
            const res = await fetch(`/api/singles/${singleId}`, { cache: 'no-store' });
            if (!res.ok) return null;
            const single = await res.json();
            const videoReleaseMs = single.videoReleaseDate ? new Date(single.videoReleaseDate).getTime() : NaN;
            if (!Number.isNaN(videoReleaseMs) && Date.now() >= videoReleaseMs && single.premiereVideoUrl) {
              return [songId, single.premiereVideoUrl] as const;
            }
          } catch {}
          return null;
        })
      );
      const map: Record<string, string> = {};
      for (const e of entries) {
        if (e) map[e[0]] = e[1];
      }
      setReleasedVideoUrls(map);
    })();
  }, []);

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

        {/* Spotify Player – immer aktuell, zeigt automatisch alle veröffentlichten Songs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl overflow-hidden border border-white/10"
        >
          <iframe
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            style={{ border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Dawid Faith – Spotify"
          />
        </motion.div>

        {/* Tracklist */}
        <div className="space-y-2">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group bg-white/[0.03] rounded-xl border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="text-lg font-black text-stone-600 group-hover:text-amber-500/60 transition-colors w-6 shrink-0 text-center">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="flex-1 min-w-0 truncate text-base md:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![song.id]?.title) || song.title}
                </h3>

                <div className="flex items-center gap-2 shrink-0">
                  {(song.id === 'katze' || song.id === 'niebianski-groove') && (
                    <Link
                      href={song.id === 'katze' ? '/pre-order/katze' : '/pre-order/Groove'}
                      className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span className="hidden sm:inline">{MusicTranslations[lang].preorderButton}</span>
                    </Link>
                  )}
                  {song.comingSoon ? (
                    <div className="inline-flex items-center gap-1.5 bg-stone-800 text-stone-400 px-4 py-2 rounded-full font-semibold text-[11px] uppercase tracking-wider cursor-not-allowed whitespace-nowrap">
                      {MusicTranslations[lang].comingSoonLabel}
                    </div>
                  ) : releasedVideoUrls[song.id] ? (
                    <a
                      href={releasedVideoUrls[song.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-4 py-2 rounded-full font-semibold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap"
                    >
                      <Video className="w-3 h-3" />
                      <span className="hidden sm:inline">{MusicTranslations[lang].videoOpen}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                      className="inline-flex items-center gap-1.5 border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-4 py-2 rounded-full font-semibold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap"
                    >
                      <Video className="w-3 h-3" />
                      <span className="hidden sm:inline">{showVideo === song.id ? MusicTranslations[lang].videoClose : MusicTranslations[lang].videoOpen}</span>
                    </button>
                  )}
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

        {/* Booking CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.07] via-transparent to-amber-500/[0.07] p-8 md:p-10 text-center overflow-hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl md:text-3xl font-black text-white">{MusicTranslations[lang].exclusiveTitle}</h3>
            </div>
            <p className="text-stone-400 mb-7 max-w-2xl mx-auto leading-relaxed">
              {MusicTranslations[lang].exclusiveDesc}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              <Calendar className="w-4 h-4" />
              {MusicTranslations[lang].webappButton}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
