'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Music, Video, Smartphone, ExternalLink } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  image: string;
  video: string;
  description: string;
}

const songs: Song[] = [
  {
    id: 'maria',
    title: 'Maria',
    image: '/musik/maria/Maria.jpg',
    video: '/musik/maria/Maria Vid1.mp4',
    description: 'Eine herzzerreißende Ballade über Einsamkeit, verlorene Liebe und die schmerzhafte Erkenntnis des Alleinseins'
  },
  {
    id: 'znikla',
    title: 'Znikła',
    image: '/musik/znikla/Znikła pic.jpg',
    video: '/musik/znikla/Znikłą Vid1.mp4',
    description: 'Die polnische Version - eine intensive Reise durch Verlust, Sehnsucht und die Suche nach dem was verschwunden ist'
  }
];

const MusicSection = () => {
  const [showVideo, setShowVideo] = useState<string | null>(null);

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
            Schaue dir die Video-Vorschauen an und besuche die D.FAITH Webapp für exklusive Songs vor dem Release.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm">Songs verfügbar in der D.FAITH Webapp</span>
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
                
                {/* Video Play Button Overlay */}
                <button
                  onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Video className="w-8 h-8 text-white" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{song.title}</h3>
                  <p className="text-gray-300 text-sm">{song.description}</p>
                </div>
              </div>

              {/* Song Controls */}
              <div className="p-6">
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Video Trailer Button */}
                  <button
                    onClick={() => setShowVideo(showVideo === song.id ? null : song.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Video className="w-4 h-4" />
                    {showVideo === song.id ? 'Video schließen' : 'Video ansehen'}
                  </button>

                  {/* D.FAITH Webapp Button */}
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02]">
                    <ExternalLink className="w-4 h-4" />
                    D.FAITH Webapp
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
                      preload="metadata"
                    >
                      <source src={song.video} type="video/mp4" />
                      Dein Browser unterstützt keine Videos.
                    </video>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Webapp Download CTA */}
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
              <h3 className="text-2xl font-bold text-white">Exklusive Songs vor Release</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Besuche die D.FAITH Webapp und höre die kompletten Songs bereits vor dem offiziellen Release. 
              Verdiene Tokens durch deine Interaktionen und unterstütze Dawid Faith direkt.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center gap-3">
                <ExternalLink className="w-6 h-6" />
                D.FAITH Webapp besuchen
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;