'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = [
    { name: 'Katze', file: '/booking/music/Katze_V4.mp3', duration: '3:45' },
    { name: 'Niebianski Groove', file: '/booking/music/Niebianski Groove.mp3', duration: '4:12' },
    { name: 'Maria', file: '/booking/music/Maria.mp3', duration: '3:58' }
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
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 opacity-50 group-hover:opacity-60 transition-opacity duration-1000">
          <Image
            src={fotos[0].src}
            alt="Dawid Faith"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        
        <div className="relative z-20 text-left px-6 md:px-12 max-w-3xl w-full">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Musiker • Songwriter</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-4 leading-tight drop-shadow-2xl">
            DAWID<br />FAITH
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Deutsche & Polnische Musik • Akustik-Gitarre • Authentische Live-Performance
          </p>
          
          <button 
            onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            ▶ Musik anhören
          </button>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500 mb-2">45–90</div>
            <div className="text-gray-400 text-sm">Minuten Setlänge</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500 mb-2">2</div>
            <div className="text-gray-400 text-sm">Sprachen</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500 mb-2">∞</div>
            <div className="text-gray-400 text-sm">Authentische Musik</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500 mb-2">✓</div>
            <div className="text-gray-400 text-sm">Solo Gitarre</div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                Wer ist<br /><span className="text-blue-500">Dawid Faith?</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Ein Singer-Songwriter, der die Kultur-Grenzen zwischen Deutschland und Polen überbrückt. Mit Liedern in <strong>Deutsch und Polnisch</strong> schaffe ich emotionale Verbindungen mit dem Publikum.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Mein Sound: <strong>Slavischer Pop-Rock</strong> mit authentischer Akustik-Gitarre. Balladen mit Tiefe, Pop-Rock mit Power. Dazu kommen handverlesene Covers – schwerpunktmäßig Country-Klassiker, die ich in mein Repertoire integriere.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong>Der Name Dawid Faith</strong> steht für meinen Glauben an die Kraft der Musik und daran, dass wir alle an uns selbst glauben können – egal woher wir kommen.
              </p>
              <p className="text-gray-400 italic">
                Meine Musik ist authentisch, roh und von Herzen. Perfekt für Events, Hochzeiten, Festivals und Veranstaltungen, wo echte Live-Musik zählt – kein Playback, keine Tricks. Nur Gitarre, Stimme und Emotion.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <Image
                src={fotos[1].src}
                alt="Dawid Faith"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section id="music" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-4">🎵 Höre meine Musik</h2>
            <p className="text-xl text-gray-400">Mein Genre, Setlängen & alles was Veranstalter wissen müssen</p>
          </div>

          {/* Large Music Player */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 mb-12 shadow-2xl border border-blue-500">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-2">► Aktuell läuft</p>
                  <h3 className="text-4xl md:text-5xl font-black text-white">
                    {songs[currentSong].name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl">🎧</div>
                </div>
              </div>
              
              <audio 
                key={currentSong}
                className="w-full h-10 rounded-lg" 
                controls 
                autoPlay
                controlsList="nodownload"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={songs[currentSong].file} type="audio/mpeg" />
              </audio>

              <p className="text-blue-200 text-sm mt-3">{songs[currentSong].duration}</p>
            </div>

            {/* Song Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {songs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSong(idx)}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    currentSong === idx
                      ? 'bg-white text-blue-600 scale-105 shadow-xl'
                      : 'bg-blue-500/50 text-white hover:bg-blue-500 hover:scale-102'
                  }`}
                >
                  ▶ {song.name}
                </button>
              ))}
            </div>
          </div>

          {/* Song Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {songs.map((song, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
                <div className="text-3xl mb-3">🎶</div>
                <h4 className="font-bold text-lg mb-2">{song.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{song.duration}</p>
                <button
                  onClick={() => setCurrentSong(idx)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Abspielen
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 md:py-24 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">🎬 Live in Action</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-xl">
                <div className="bg-gray-900 p-6">
                  <h3 className="text-white font-bold text-lg mb-4">{video.name}</h3>
                  <div className="relative bg-black rounded-xl overflow-hidden">
                    <video
                      className="w-full aspect-video"
                      controls
                      controlsList="nodownload"
                    >
                      <source src={video.file} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPK / GENRE SECTION */}
      <section className="py-16 md:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">🎸 Mein Sound</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Genre Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 border border-blue-500 shadow-xl">
              <h3 className="text-3xl font-black text-white mb-4">Genre</h3>
              <div className="space-y-3">
                <p className="text-blue-100 font-bold text-lg">🎭 <strong>Slavischer Pop Rock</strong></p>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Deutsch & Polnische Texte mit modernem Rock-Pop Sound und emotionalen Balladen. Authentische Gitarrenmusik mit Tiefe.
                </p>
              </div>
            </div>

            {/* Covers Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 border border-purple-500 shadow-xl">
              <h3 className="text-3xl font-black text-white mb-4">Covers</h3>
              <div className="space-y-3">
                <p className="text-purple-100 font-bold text-lg">🎼 <strong>Sorgfältig ausgewählt</strong></p>
                <p className="text-purple-100 text-sm leading-relaxed mb-3">
                  Mix aus Deutsch & Englisch. Beispiele:
                </p>
                <div className="text-sm text-purple-100 space-y-1">
                  <p>🎤 Pocahontas – Annelyy Kantereit</p>
                  <p>🎤 Country Roads – John Denver</p>
                  <p>🎤 Johnny Cash Klassiker</p>
                </div>
              </div>
            </div>

            {/* Vibe Card */}
            <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl p-8 border border-pink-500 shadow-xl">
              <h3 className="text-3xl font-black text-white mb-4">Vibe</h3>
              <div className="space-y-3">
                <p className="text-pink-100 font-bold text-lg">✨ <strong>Authentisch & Raw</strong></p>
                <p className="text-pink-100 text-sm leading-relaxed">
                  Keine Backing-Tracks, keine Tricks. Nur Gitarre, Stimme und echte Emotionen – direkter Kontakt zum Publikum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EPK - ELECTRONIC PRESS KIT */}
      <section className="py-16 md:py-24 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">📋 Electronic Press Kit (EPK)</h2>
          <p className="text-center text-gray-400 mb-12">Alle Infos für Veranstalter auf einen Blick</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Setlängen */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">⏱️ Setlängen</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-blue-400 font-bold mb-1">SHORT SET</p>
                  <p className="text-white text-lg font-bold">30 Minuten</p>
                  <p className="text-gray-400 text-sm">Perfekt für Apéros, kleine Events</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-blue-400 font-bold mb-1">STANDARD SET</p>
                  <p className="text-white text-lg font-bold">60 Minuten</p>
                  <p className="text-gray-400 text-sm">Für die meisten Events & Hochzeiten</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-blue-400 font-bold mb-1">EXTENDED SET</p>
                  <p className="text-white text-lg font-bold">90+ Minuten</p>
                  <p className="text-gray-400 text-sm">Festivals, volle Events, mehrere Sessions</p>
                </div>
              </div>
            </div>

            {/* Besetzung */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">🎤 Besetzung & Setup</h3>
              <div className="space-y-4">
                <div className="bg-blue-600 p-4 rounded-lg">
                  <p className="font-bold text-white mb-2">🎸 ACOUSTIC SOLO</p>
                  <p className="text-blue-100 text-sm">Solo mit Akustik-Gitarre. Minimal, authentisch, direkt.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 font-bold mb-2">Optional: Loop-Station</p>
                  <p className="text-gray-300 text-sm">Kann für Extra-Effekte & Beatboxing hinzugefügt werden</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 font-bold mb-2">Easy zu Transportation</p>
                  <p className="text-gray-300 text-sm">Braucht nur Gitarre + Mikro. Einfaches Setup.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Specs */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-black text-white mb-6">🔧 Technische Anforderungen</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Bühne</p>
                <p className="text-white">Kleine Bühne oder Floor-Level möglich</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Ton</p>
                <p className="text-white">Einkanal Mikro + Monitor</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Licht</p>
                <p className="text-white">Standard spot oder Ambient</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Aufbau</p>
                <p className="text-white">15–20 Minuten Setup</p>
              </div>
            </div>
          </div>

          {/* Repertoire */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 border border-blue-700">
            <h3 className="text-2xl font-black text-white mb-4">🎸 Repertoire & Song-Beispiele</h3>
            <p className="text-blue-100 mb-6">
              Mix aus eigenen Songs (Deutsch/Polnisch) + handverlesene Covers (Deutsch/Englisch). Flexible Playlist je nach Event, Publikum & Stimmung.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-300 font-bold mb-3">🎤 Meine Songs</p>
                <ul className="text-blue-100 space-y-1 text-sm">
                  <li>• Katze</li>
                  <li>• Niebianski Groove</li>
                  <li>• Maria</li>
                  <li>• Weitere Original-Songs</li>
                </ul>
              </div>
              <div>
                <p className="text-purple-300 font-bold mb-3">🎵 Cover-Beispiele</p>
                <ul className="text-blue-100 space-y-1 text-sm">
                  <li>• Pocahontas (Annelyy Kantereit)</li>
                  <li>• Country Roads (John Denver)</li>
                  <li>• Johnny Cash Klassiker</li>
                  <li>• Weitere passende Covers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSEFOTOS DOWNLOAD */}
      <section className="py-16 md:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">📸 Pressefotos Download</h2>
          <p className="text-center text-gray-400 mb-12">Hochauflösend • HD-Quality • Sofort einsatzbereit für Promotion</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {fotos.map((foto, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 h-96 shadow-xl">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-6">
                  <p className="text-white font-semibold">{foto.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center border border-blue-500">
            <h3 className="text-2xl font-bold text-white mb-3">📥 Fotos herunterladen</h3>
            <p className="text-blue-100 mb-6">
              Alle Pressefotos in voller Auflösung – perfekt für Flyer, Social Media, Website & Promotion
            </p>
            <a 
              href="mailto:dawid.faith@gmail.com?subject=Pressefotos Download Anfrage"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition transform hover:scale-105"
            >
              📧 Fotos per Email anfordern
            </a>
          </div>
        </div>
      </section>

      {/* SPECS / DETAILS */}
      <section className="py-16 md:py-24 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">🎯 Quick Facts für Veranstalter</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🎸</div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Genre</p>
              <p className="text-2xl font-black text-white">Slavischer<br/>Pop-Rock</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🌍</div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Sprachen</p>
              <p className="text-2xl font-black text-white">Deutsch<br/>& Polnisch</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🎤</div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Format</p>
              <p className="text-2xl font-black text-white">Solo<br/>Akustik</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">⏱️</div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Sets</p>
              <p className="text-2xl font-black text-white">30–90<br/>Minuten</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Lass mich<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">auf deinem Event spielen</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Hochzeit • Festival • Club • Privatveranstaltung • Unternehmensevent
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a 
              href="mailto:dawid.faith@gmail.com?subject=Booking%20Anfrage%20-%20Dawid%20Faith&body=Hallo%20Dawid%2C%0D%0A%0D%0Aich%20bin%20interessiert%20dich%20zu%20buchen.%0D%0A%0D%0AVeranstaltung%3A%20%5BTYPE%5D%0D%0ADatum%3A%20%5BDATE%5D%0D%0AOrt%3A%20%5BLOCATION%5D%0D%0A%0D%0AViele%20Gr%C3%BC%C3%9Fe"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-xl transition transform hover:scale-105 shadow-lg text-lg"
            >
              ✉️ Per E-Mail buchen
            </a>
            
            <a 
              href="tel:+491234567890"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-5 rounded-xl transition transform hover:scale-105 border border-gray-700 text-lg"
            >
              📞 Anrufen
            </a>
          </div>

          <p className="text-gray-400">
            📧 <a href="mailto:dawid.faith@gmail.com" className="text-blue-400 hover:text-blue-300">dawid.faith@gmail.com</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 Dawid Faith • Singer-Songwriter • Deutschland & Polen</p>
        </div>
      </footer>

    </div>
  );
}
