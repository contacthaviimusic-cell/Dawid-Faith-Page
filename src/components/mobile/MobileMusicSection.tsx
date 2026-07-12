'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music, Heart, Download, Share, Video, ExternalLink, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
      coverImage: '/musik/katze/photo_2026-01-06_14-31-47.jpg',
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
      duration: '3:58',
      audioSrc: '/musik/niebianski-groove/Niebianski.mp3',
      coverImage: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png',
      video: '/musik/niebianski-groove/video_2026-04-10_15-15-15.mp4',
      description: 'Ein weiterer Track aus der Release Kampagne'
    }
  ]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  // Helper function to get localized track info
  const getTrackInfo = (trackId: string, field: 'title' | 'description'): string => {
    const translatedTrack = MusicTranslations[lang].songs?.[trackId];
    if (translatedTrack && translatedTrack[field]) {
      return translatedTrack[field];
    }
    const track = tracks.find(t => t.id === trackId);
    return track?.[field as keyof Track] || '';
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next track
      const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
      if (currentIndex < tracks.length - 1) {
        setCurrentTrack(tracks[currentIndex + 1]);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, tracks]);

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

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (direction: 'prev' | 'next') => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % tracks.length;
    } else {
      newIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    }
    
    setCurrentTrack(tracks[newIndex]);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

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
                    <Image
                      src={track.coverImage}
                      alt={track.title}
                      fill
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
                {((MusicTranslations[lang].songs && MusicTranslations[lang].songs![track.id]?.description) || track.description) && (
                  <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    {(MusicTranslations[lang].songs && MusicTranslations[lang].songs![track.id]?.description) || track.description}
                  </p>
                )}

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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Play Audio Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => playTrack(track)}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 rounded-xl px-4 py-3 text-white font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} />
                    )}
                  </motion.button>

                  {/* Webapp Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://app.dawidfaith.de', '_blank')}
                    className="bg-stone-700/60 hover:bg-stone-600/60 rounded-xl px-4 py-3 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="Webapp öffnen"
                  >
                    <ExternalLink size={18} />
                    Webapp
                  </motion.button>
                </div>

                {/* Progress Bar for Current Track */}
                {currentTrack?.id === track.id && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 bg-stone-700 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-amber-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
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

        {/* Mobile Player Controls */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-stone-900 via-amber-900/50 to-transparent backdrop-blur-md border-t border-amber-500/30 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Current Track Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={currentTrack.coverImage}
                      alt={getTrackInfo(currentTrack.id, 'title')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">
                      {getTrackInfo(currentTrack.id, 'title')}
                    </h3>
                    <p className="text-stone-400 text-xs">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skipTrack('prev')}
                    className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400"
                  >
                    <SkipBack size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skipTrack('next')}
                    className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400"
                  >
                    <SkipForward size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="w-10 h-10 bg-stone-500/20 rounded-full flex items-center justify-center text-stone-400"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.audioSrc}
            autoPlay={isPlaying}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(audioRef.current.duration);
              }
            }}
          />
        )}

        {/* Style for custom slider */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ec4899, #8b5cf6);
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ec4899, #8b5cf6);
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    </section>
  );
}