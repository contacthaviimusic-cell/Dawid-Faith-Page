'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const [currentSong, setCurrentSong] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const songs = [
    { name: 'Katze', file: '/booking/music/Katze_V4.mp3' },
    { name: 'Niebianski Groove', file: '/booking/music/Niebianski Groove.mp3' },
    { name: 'Maria', file: '/booking/music/Maria.mp3' }
  ];

  const videos = [
    { name: 'Katze - Live Performance', file: '/booking/videos/Katze 1.mp4' },
    { name: 'Niebianski Groove - Live', file: '/booking/videos/Niebianski Groove.mp4' }
  ];

  const fotos = [
    { src: '/booking/pressefotos/Dawid Faith.jpg', alt: 'Dawid Faith - Portrait' },
    { src: '/booking/pressefotos/Dawid und Gruppe.jpg', alt: 'Dawid Faith mit Gruppe' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {fotos[0] && (
          <Image
            src={fotos[0].src}
            alt="Dawid Faith"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            DAWID FAITH
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-2xl mx-auto">
            Singer-Songwriter • Deutsch & Polnisch • Akustik-Gitarre
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* Intro Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
          <h2 className="text-4xl font-bold text-white mb-6">Über Dawid Faith</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            Ich schreibe Songs in Deutsch und Polnisch und möchte durch die Verbindung dieser Sprachen Brücken bauen zwischen beiden Kulturen. Mit dem Namen Dawid Faith möchte ich den Glauben an sich selbst und seine Möglichkeiten bestärken. Meine Musik verbindet emotionale Texte mit authentischer Akustik-Gitarre und schafft echte Verbindungen mit dem Publikum.
          </p>
        </section>

        {/* Video Gallery */}
        <section>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-blue-500">🎥</span> Live Performances
          </h2>
          <div className="space-y-6">
            {videos.map((video, idx) => (
              <div key={idx} className="bg-black rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="bg-gray-900 p-4">
                  <h3 className="text-white font-semibold text-lg mb-4">{video.name}</h3>
                  <video
                    className="w-full rounded-lg"
                    controls
                    controlsList="nodownload"
                  >
                    <source src={video.file} type="video/mp4" />
                    Dein Browser unterstützt das Video-Tag nicht.
                  </video>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Music Player Section */}
        <section>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-green-500">🎵</span> Musik
          </h2>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 border border-blue-500">
            <div className="mb-8">
              <p className="text-blue-100 text-sm uppercase tracking-widest mb-3">Aktuell läuft</p>
              <h3 className="text-3xl font-bold text-white mb-6">
                {songs[currentSong].name}
              </h3>
              <audio 
                key={currentSong}
                className="w-full rounded-lg" 
                controls 
                autoPlay
                controlsList="nodownload"
                onEnded={() => setCurrentSong((currentSong + 1) % songs.length)}
              >
                <source src={songs[currentSong].file} type="audio/mpeg" />
                Dein Browser unterstützt das Audio-Tag nicht.
              </audio>
            </div>

            {/* Song Selection Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {songs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSong(idx)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    currentSong === idx
                      ? 'bg-white text-blue-600 shadow-lg scale-105'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  {song.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Hard Facts */}
        <section>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-yellow-500">📋</span> Hard Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">Setlänge</p>
              <p className="text-3xl font-bold text-white">45 - 90 Min</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">Format</p>
              <p className="text-3xl font-bold text-white">Solo • Akustik</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">Sprachen</p>
              <p className="text-3xl font-bold text-white">Deutsch & Polnisch</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">Equipment</p>
              <p className="text-3xl font-bold text-white">Gitarre & Mikro</p>
            </div>
          </div>
        </section>

        {/* Pressefotos Gallery */}
        <section>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-pink-500">📸</span> Pressefotos
          </h2>
          <p className="text-gray-300 mb-6">Hochauflösende Fotos für Marketing & Promotion</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fotos.map((foto, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500 transition-all duration-300 h-96">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              Alle Fotos sind hochauflösend und für Print optimiert. 
            </p>
            <a 
              href="/booking/pressefotos"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              📁 Alle Fotos herunterladen
            </a>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-12 text-center border border-blue-400">
          <h2 className="text-4xl font-bold text-white mb-6">
            🎤 Bereit zu buchen?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktiere mich direkt für Anfragen zu Hochzeiten, Events, Festivals oder privaten Auftritten.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="mailto:dawid.faith@gmail.com?subject=Booking%20Anfrage%20von%20dawidfaith.de&body=Hallo%20Dawid%2C%0A%0Aich%20m%C3%B6chte%20dich%20f%C3%BCr%20mein%20Event%20buchen."
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              ✉️ Per E-Mail buchen
            </a>
            <a 
              href="tel:+491234567890"
              className="bg-blue-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              📞 Anrufen
            </a>
          </div>
        </section>

        {/* Footer Info */}
        <section className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <p className="text-gray-400">
            Dawid Faith • Singer-Songwriter • <a href="mailto:dawid.faith@gmail.com" className="text-blue-400 hover:text-blue-300">dawid.faith@gmail.com</a>
          </p>
        </section>

      </div>
    </div>
  );
}
