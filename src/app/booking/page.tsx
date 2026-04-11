'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const [currentSong, setCurrentSong] = useState(0);

  const songs = [
    { name: 'Katze', file: '/booking/music/Katze_V4.mp3', duration: '3:45', image: '/musik/katze/photo_2026-01-06_14-31-47.jpg' },
    { name: 'Niebianski Groove', file: '/booking/music/Niebianski Groove.mp3', duration: '4:12', image: '/musik/niebianski-groove/vlcsnap-2026-04-10-15h24m56s318.png' },
    { name: 'Maria', file: '/booking/music/Maria.mp3', duration: '3:58', image: '/musik/maria/Maria.jpg' }
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
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO SECTION - Clean Modern Design */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-black py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                Authentische Live Musik
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
                Für Kneipen, Bars & Events
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-lg">
                Singer-Songwriter mit Deutsch & Polnisch 🎸 Wechsel zwischen bekannten Covers & eigenen Songs • Akustik-Gitarre • Keine Playbacks – echte Live-Performance
              </p>
              <button 
                onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition transform hover:scale-105"
              >
                ▶ Zur Musik
              </button>
            </div>
            
            {/* Portrait */}
            <div className="flex-1">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                <Image
                  src={fotos[0].src}
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Wer ist Dawid Faith */}
      <section className="py-12 md:py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden border border-gray-700">
              <Image
                src={fotos[1].src}
                alt="Dawid Faith mit Gruppe"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black mb-5">
                Wer ist <span className="text-blue-400">Dawid Faith?</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ein Singer-Songwriter, der die Musik-Brücke zwischen Deutschland und Polen schlägt. Mit Songs in <strong>Deutsch und Polnisch</strong> schaffe ich eine emotionale Verbindung zum Publikum.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Mein Sound: <strong>Slavischer Pop-Rock</strong> mit authentischer Akustik-Gitarre. Balladen mit Gefühl, eingängige Pop-Rock-Songs – immer live gespielt, nie aus der Dose.
              </p>
              <p className="text-gray-400 italic">
                <strong>Der Name Dawid Faith?</strong> Mein Glaube an die Kraft der Musik und daran, dass echte Live-Performance zählt. Kein Playback, kein Kommerz – nur Gitarre, Stimme und Emotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC SECTION - Kompakt */}
      <section id="music" className="py-12 md:py-16 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-8">🎵 Musik hören</h2>

          {/* Music Player */}
          <div className="bg-blue-600 rounded-xl p-6 md:p-8 mb-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {songs[currentSong].name}
              </h3>
              <audio 
                key={currentSong}
                className="w-full" 
                controls 
                controlsList="nodownload"
              >
                <source src={songs[currentSong].file} type="audio/mpeg" />
              </audio>
              <p className="text-blue-200 text-sm mt-2">{songs[currentSong].duration}</p>
            </div>

            {/* Song Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {songs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSong(idx)}
                  className={`py-2 px-4 rounded-lg font-bold transition-all ${
                    currentSong === idx
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-700'
                  }`}
                >
                  {song.name}
                </button>
              ))}
            </div>
          </div>

          {/* Song Cards - Compact */}
          <div className="grid md:grid-cols-3 gap-4">
            {songs.map((song, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-all group cursor-pointer" onClick={() => setCurrentSong(idx)}>
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={song.image}
                    alt={song.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm">{song.name}</p>
                  <p className="text-gray-400 text-xs">{song.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION - Kompakt */}
      <section className="py-12 md:py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6">🎬 Live Beispiele</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden border border-gray-800 shadow-lg">
                <div className="bg-black">
                  <p className="text-white font-bold p-3 text-sm">{video.name}</p>
                  <video className="w-full aspect-video" controls controlsList="nodownload">
                    <source src={video.file} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSENTIALS FOR ORGANIZERS - Kombiniert & Kompakt */}
      <section className="py-12 md:py-16 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8">📋 Infos für Veranstalter</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Genre & Setup */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-black mb-4">🎸 Mein Sound</h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-blue-400 font-bold">Genre:</span> Slavischer Pop-Rock</p>
                <p><span className="text-blue-400 font-bold">Sprachen:</span> Deutsch & Polnisch</p>
                <p><span className="text-blue-400 font-bold">Format:</span> Solo Akustik-Gitarre</p>
                <p><span className="text-blue-400 font-bold">Vibe:</span> Authentisch, keine Playbacks</p>
              </div>
            </div>

            {/* Setlängen */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-black mb-4">⏱️ Setlänge</h3>
              <div className="space-y-2 text-sm">
                <p className="text-lg"><span className="text-blue-400 font-bold">2 Stunden</span></p>
                <p className="text-gray-400 text-xs">Flexibel anpassbar nach deinen Wünschen</p>
              </div>
            </div>
          </div>

          {/* Covers vs Eigene Songs */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <h3 className="text-xl font-black text-white mb-4">🎵 Mein Repertoire</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-100">
              <div>
                <p className="font-bold text-white mb-2">🎤 Meine Original-Songs</p>
                <p>Katze, Niebianski Groove, Maria + mehr</p>
              </div>
              <div>
                <p className="font-bold text-white mb-2">🎵 Bekannte Covers</p>
                <p>Deutsch & Englisch: Pocahontas, Country Roads, Johnny Cash, u.v.m.</p>
              </div>
            </div>
            <p className="text-blue-200 text-xs mt-4">💡 Ich wechsle zwischen Covers & eigenen Songs – je nach Stimmung und Publikum</p>
          </div>
        </div>
      </section>

      {/* PRESSEFOTOS - Minimal */}
      <section className="py-12 md:py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6">📸 Pressefotos</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {fotos.map((foto, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-800 h-64 shadow-lg group">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          <a 
            href="mailto:dawid.faith@gmail.com?subject=Pressefotos Anfrage"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg text-sm"
          >
            📧 Fotos anfordern
          </a>
        </div>
      </section>

      {/* CTA SECTION - STRONG BOOKING FOCUS */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-blue-950 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Jetzt <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">buchen</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-8">
            Hochzeit • Festival • Privatanlass • Unternehmensevent
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="mailto:dawid.faith@gmail.com?subject=Booking%20Anfrage%20-%20Dawid%20Faith&body=Hallo%20Dawid%2C%0D%0A%0D%0Aich%20bin%20interessiert%20dich%20zu%20buchen.%0D%0A%0D%0AVeranstaltung%3A%20%5BTYPE%5D%0D%0ADatum%3A%20%5BDATE%5D%0D%0AOrt%3A%20%5BLOCATION%5D%0D%0A%0D%0AViele%20Gr%C3%BC%C3%9Fe"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 text-lg"
            >
              ✉️ Email senden
            </a>
            
            <a 
              href="tel:+491234567890"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 border border-gray-600 text-lg"
            >
              📞 Anrufen
            </a>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            📧 <a href="mailto:dawid.faith@gmail.com" className="text-blue-400 hover:text-blue-300 font-semibold">dawid.faith@gmail.com</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 py-8 text-center text-gray-500 text-xs">
        <p>© 2026 Dawid Faith • Singer-Songwriter</p>
      </footer>

    </div>
  );
}
