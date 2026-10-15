'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, Calendar, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const SPOTIFY_ARTIST_ID = '0CESFIQKIs643l9hV0QXsE';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
  poster?: string;
  video: string;
  description?: string;
  comingSoon?: boolean;
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
      description: 'Der erste Song der Release Kampagne'
    },
    {
      id: 'niebianski-groove',
      title: 'Niebiański Groove',
      artist: 'Dawid Faith',
      duration: '0:36',
      audioSrc: '/musik/niebianski-groove/Niebianski.mp3',
      coverImage: '/musik/niebianski-groove/Teaser%20Groove.mp4',
      poster: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png',
      video: '/musik/niebianski-groove/video_2026-04-10_15-15-15.mp4',
      description: 'Ein weiterer Track aus der Release Kampagne'
    },
    {
      id: 'maria',
      title: 'Maria',
      artist: 'Dawid Faith',
      duration: '3:42',
      audioSrc: '/musik/maria/Maria.mp3',
      coverImage: '/musik/maria/Maria.jpg',
      video: '/musik/maria/Maria Vid1.mp4',
      description: 'Eine emotionale Ballade über verlorene Liebe',
      comingSoon: true
    },
    {
      id: 'znikla',
      title: 'Znikła',
      artist: 'Dawid Faith',
      duration: '4:15',
      audioSrc: '/musik/znikla/Znikła.mp3',
      coverImage: '/musik/znikla/Znikła pic.jpg',
      video: '/musik/znikla/Znikłą Vid1.mp4',
      description: 'Melancholische Töne treffen auf moderne Beats',
      comingSoon: true
    },
    {
      id: 'jupiter',
      title: 'Jupiter',
      artist: 'Dawid Faith',
      duration: '0:29',
      audioSrc: '/musik/jupiter/Jupiter.mp3',
      coverImage: '/musik/jupiter/Jupiter-Cover.jpg',
      video: '/musik/jupiter/Jupiter.mp4',
      description: 'Der fünfte Song der Release Kampagne',
      comingSoon: true
    }
  ]);

  const [showVideo, setShowVideo] = useState<string | null>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  // Sobald das offizielle Musikvideo released ist, führt der Play-Button auf
  // das echte YouTube-Video statt auf den lokalen Platzhalter-Clip.
  const [releasedVideoUrls, setReleasedVideoUrls] = useState<Record<string, string>>({});

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

  useEffect(() => {
    const preorderSingleId: Record<string, string> = { katze: 'katze', 'niebianski-groove': 'Groove' };
    (async () => {
      const entries = await Promise.all(
        Object.entries(preorderSingleId).map(async ([songId, singleId]) => {
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

        {/* Spotify Player – immer aktuell, zeigt automatisch alle veröffentlichten Songs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 rounded-2xl overflow-hidden border border-yellow-500/20"
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

        {/* Track List */}
        <div className="space-y-2 mb-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-stone-900/60 to-yellow-900/20 backdrop-blur-md rounded-xl border border-yellow-500/20 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-sm font-black text-stone-500 w-5 shrink-0 text-center">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="flex-1 min-w-0 truncate font-bold text-white text-sm">
                  {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![track.id]?.title) || track.title}
                </h3>

                <div className="flex items-center gap-2 shrink-0">
                  {(track.id === 'katze' || track.id === 'niebianski-groove') && (
                    <Link
                      href={track.id === 'katze' ? '/pre-order/katze' : '/pre-order/Groove'}
                      className="inline-flex items-center gap-1 bg-amber-500 active:bg-amber-400 text-black px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider"
                    >
                      <ShoppingBag size={11} />
                    </Link>
                  )}
                  {track.comingSoon ? (
                    <div className="inline-flex items-center bg-stone-800 text-stone-400 px-3 py-1.5 rounded-full font-semibold text-[10px] uppercase tracking-wider whitespace-nowrap">
                      {MusicTranslations[lang].comingSoonLabel}
                    </div>
                  ) : releasedVideoUrls[track.id] ? (
                    <a
                      href={releasedVideoUrls[track.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 border border-white/20 rounded-full"
                    >
                      <Video size={14} className="text-stone-300" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowVideo(showVideo === track.id ? null : track.id)}
                      className="inline-flex items-center justify-center w-8 h-8 border border-white/20 rounded-full"
                    >
                      <Video size={14} className="text-stone-300" />
                    </button>
                  )}
                </div>
              </div>

              {/* Video Player */}
              {showVideo === track.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-yellow-500/20"
                >
                  <video
                    controls
                    className="w-full max-h-72 bg-black"
                    poster={track.coverImage}
                    preload="metadata"
                  >
                    <source src={track.video} type="video/mp4" />
                    Dein Browser unterstützt keine Videos.
                  </video>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-2xl border border-amber-500/30 backdrop-blur-sm p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-amber-400" size={24} />
            <h3 className="text-xl font-bold text-white">{MusicTranslations[lang].exclusiveTitle}</h3>
          </div>
          <p className="text-stone-300 text-sm mb-4">
            {MusicTranslations[lang].exclusiveDesc}
          </p>
          <Link href="/booking" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-500 active:bg-amber-400 px-6 py-3 rounded-full text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 w-full"
            >
              <Calendar size={18} />
              {MusicTranslations[lang].webappButton}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}