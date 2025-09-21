'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music, Heart, Download, Share } from 'lucide-react';
import Image from 'next/image';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
  description?: string;
}

export default function MobileMusicSection() {
  const [tracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Maria',
      artist: 'Dawid Faith',
      duration: '3:42',
      audioSrc: '/musik/maria/Maria.mp3',
      coverImage: '/musik/maria/Maria.jpg',
      description: 'Eine emotionale Ballade über verlorene Liebe'
    },
    {
      id: '2',
      title: 'Znikła',
      artist: 'Dawid Faith',
      duration: '4:15',
      audioSrc: '/musik/znikla/Znikła.mp3',
      coverImage: '/musik/znikla/Znikła pic.jpg',
      description: 'Melancholische Töne treffen auf moderne Beats'
    }
  ]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    <section id="music" className="py-16 px-4 bg-gradient-to-b from-black via-pink-900/10 to-black">
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
            <Music className="text-pink-400" size={28} />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Meine Musik
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Entdecke meine neuesten Songs und erlebe die emotionale Reise
          </p>
        </motion.div>

        {/* Track List */}
        <div className="space-y-4 mb-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playTrack(track)}
              className={`bg-gradient-to-r from-gray-900/50 to-pink-900/20 backdrop-blur-md rounded-2xl border border-pink-500/20 overflow-hidden cursor-pointer transition-all duration-300 ${
                currentTrack?.id === track.id ? 'border-pink-500/50 bg-pink-900/30' : ''
              }`}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Cover Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={track.coverImage}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="text-white" size={20} />
                    ) : (
                      <Play className="text-white" size={20} />
                    )}
                  </div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg mb-1 truncate">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">
                    {track.artist}
                  </p>
                  {track.description && (
                    <p className="text-gray-500 text-xs line-clamp-1">
                      {track.description}
                    </p>
                  )}
                </div>

                {/* Duration & Actions */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-gray-400 text-sm">
                    {track.duration}
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite
                      }}
                      className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400"
                    >
                      <Heart size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share
                      }}
                      className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400"
                    >
                      <Share size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Progress Bar for Current Track */}
              {currentTrack?.id === track.id && (
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Player Controls */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-gray-900 via-purple-900/50 to-transparent backdrop-blur-md border-t border-purple-500/30 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Current Track Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={currentTrack.coverImage}
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">
                      {currentTrack.title}
                    </h3>
                    <p className="text-gray-400 text-xs">
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
                    className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"
                  >
                    <SkipBack size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skipTrack('next')}
                    className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"
                  >
                    <SkipForward size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center text-gray-400"
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
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
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