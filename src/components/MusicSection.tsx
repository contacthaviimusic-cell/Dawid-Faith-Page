'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Volume2, Download, Music, Video, Smartphone } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  image: string;
  audio: string;
  video: string;
  description: string;
}

const songs: Song[] = [
  {
    id: 'maria',
    title: 'Maria',
    image: '/musik/maria/Maria.jpg',
    audio: '/musik/maria/Maria.mp3',
    video: '/musik/maria/Maria Vid1.mp4',
    description: 'Ein emotionaler Track, der die Geschichte von Maria erzählt'
  },
  {
    id: 'znikla',
    title: 'Znikła',
    image: '/musik/znikla/Znikła pic.jpg',
    audio: '/musik/znikla/Znikła.mp3',
    video: '/musik/znikla/Znikłą Vid1.mp4',
    description: 'Eine intensive Reise durch Verlust und Hoffnung'
  }
];

const MusicSection = () => {
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const togglePlay = (songId: string) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (playingSong === songId) {
      audio.pause();
      setPlayingSong(null);
    } else {
      // Pause any currently playing song
      Object.values(audioRefs.current).forEach(a => a?.pause());
      setPlayingSong(songId);
      audio.play();
    }
  };

  const handleAudioEnd = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    }
  };

  return (
    <section id="music" className="relative py-20 px-4 bg-gradient-to-b from-purple-900/10 to-slate-900/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/5 to-purple-900/5" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Musik Vorschau
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Entdecke exklusive Tracks bereits jetzt. Vollversion verfügbar in der D.FAITH App.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm">Verfügbar in der D.FAITH App</span>
          </div>
        </motion.div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-slate-800/40 to-purple-900/20 rounded-2xl border border-gray-700/40 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500"
            >
              {/* Song Image */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <Image
                  src={song.image}
                  alt={song.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => togglePlay(song.id)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  {playingSong === song.id ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{song.title}</h3>
                  <p className="text-gray-300 text-sm">{song.description}</p>
                </div>
              </div>

              {/* Song Controls */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Audio Vorschau</span>
                  </div>
                  {playingSong === song.id && (
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Video Trailer Button */}
                  <button
                    onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Video className="w-4 h-4" />
                    {showVideo === song.id ? 'Video schließen' : 'Video Trailer'}
                  </button>

                  {/* D.FAITH App Download */}
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02]">
                    <Download className="w-4 h-4" />
                    D.FAITH App
                  </button>
                </div>

                {/* Video Player */}
                {showVideo === song.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 rounded-xl overflow-hidden"
                  >
                    <video
                      controls
                      className="w-full h-64 object-cover"
                      poster={song.image}
                    >
                      <source src={song.video} type="video/mp4" />
                      Dein Browser unterstützt keine Videos.
                    </video>
                  </motion.div>
                )}

                {/* Hidden Audio Element */}
                <audio
                  ref={(el) => {
                    audioRefs.current[song.id] = el;
                  }}
                  onEnded={() => handleAudioEnd(song.id)}
                  preload="none"
                >
                  <source src={song.audio} type="audio/mpeg" />
                </audio>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/20 backdrop-blur-sm p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Vollversionen verfügbar</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Lade die D.FAITH App herunter und genieße die kompletten Songs sowie exklusive Inhalte. 
              Verdiene Tokens durch deine Interaktionen und unterstütze Dawid Faith direkt.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6" />
                D.FAITH App herunterladen
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;