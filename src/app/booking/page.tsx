'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const [currentSong, setCurrentSong] = useState(0);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  });

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
      
      {/* HERO SECTION - Professional Minimalist */}
      <section className="relative bg-gradient-to-b from-slate-900 to-black min-h-[550px] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={fotos[0].src}
            alt="Dawid Faith"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="mb-6">
                <span className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Artist Profile</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
                Dawid Faith
              </h1>

              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Professional Singer-Songwriter für Ihre Hochzeiten, Veranstaltungen und Events. Live Musik direkt vom Herzen – authentisch, leidenschaftlich, unvergesslich.
              </p>

              <div className="space-y-3 mb-8">
                <p className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  Deutsch & Polnische Original-Songs
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  Sorgfältig ausgewählte Cover
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  Solo Akustik-Gitarre • Keine Playbacks
                </p>
              </div>

              <button 
                onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 transition"
              >
                Musik anhören
              </button>
            </div>

            {/* Professional Stats */}
            <div className="space-y-4">
              <div className="bg-black/60 backdrop-blur border border-slate-700 p-6 rounded-lg">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Genre</p>
                <p className="text-2xl font-black">Slavischer Pop-Rock</p>
              </div>
              <div className="bg-black/60 backdrop-blur border border-slate-700 p-6 rounded-lg">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Sprachen</p>
                <p className="text-2xl font-black">Deutsch & Polnisch</p>
              </div>
              <div className="bg-black/60 backdrop-blur border border-slate-700 p-6 rounded-lg">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Format</p>
                <p className="text-2xl font-black">Solo Akustik</p>
              </div>
              <div className="bg-black/60 backdrop-blur border border-slate-700 p-6 rounded-lg">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Verfügbarkeit</p>
                <p className="text-2xl font-black">Flexibel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 md:py-24 bg-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
              <Image
                src={fotos[1].src}
                alt="Dawid Faith mit Gruppe"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-4 block">Über mich</span>
              <h2 className="text-5xl font-black mb-8 leading-tight">
                Wer ist<br/><span className="text-slate-400">Dawid Faith?</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                Ein Musiker, der die Kulturgrenzen zwischen Deutschland und Polen überbrückt. Mit Songs in Deutsch und Polnisch schaffe ich emotionale Verbindungen, die lange nachwirken.
              </p>
              <p className="text-slate-300 leading-relaxed mb-5 text-lg">
                Mein Sound: Slavischer Pop-Rock mit authentischer Akustik-Gitarre. Balladen mit Gefühl, eingängige Pop-Rock-Songs – immer live gespielt, immer vom Herzen.
              </p>
              <p className="text-slate-400 italic">
                Echte Live-Performance ohne Kompromisse. Nur Gitarre, Stimme und eine Menge Leidenschaft für gute Musik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO PLAYER SECTION */}
      <section id="music" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Musik</span>
            <h2 className="text-5xl font-black mt-2 mb-2">Höre meine Songs</h2>
            <p className="text-slate-400">Meine Original-Kompositionen und handverlesene Covers</p>
          </div>

          {/* Main Player */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-12 backdrop-blur">
            <div className="mb-8">
              <h3 className="text-3xl font-black mb-6 text-white">
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
              <p className="text-slate-400 text-sm mt-3">{songs[currentSong].duration}</p>
            </div>

            {/* Track Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {songs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSong(idx)}
                  className={`py-3 px-4 rounded font-semibold transition-all ${
                    currentSong === idx
                      ? 'bg-slate-700 text-white ring-2 ring-slate-600'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {song.name}
                </button>
              ))}
            </div>
          </div>

          {/* Song Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {songs.map((song, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer"
                onClick={() => setCurrentSong(idx)}
              >
                <div className="relative h-48 rounded-lg overflow-hidden border border-slate-700 mb-4 shadow-lg">
                  <Image
                    src={song.image}
                    alt={song.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶
                    </div>
                  </div>
                </div>
                <h4 className="font-black text-lg mb-1">{song.name}</h4>
                <p className="text-slate-400 text-sm">{song.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 md:py-24 bg-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Live Performance</span>
            <h2 className="text-5xl font-black mt-2 mb-2">Live Auftritte</h2>
            <p className="text-slate-400">Authentische Live-Aufführungen in voller Länge</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, idx) => (
              <div key={idx} className="group">
                <p className="text-slate-300 font-semibold mb-4">{video.name}</p>
                <div className="rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                  <video className="w-full aspect-video bg-black" controls controlsList="nodownload">
                    <source src={video.file} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / PACKAGES */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Leistungen</span>
            <h2 className="text-5xl font-black mt-2 mb-2">Was ich anbiete</h2>
            <p className="text-slate-400">Flexible Sets für jede Veranstaltung</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 30 Minuten */}
            <div className="border border-slate-700 rounded-lg p-8 bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
              <div className="text-4xl font-black mb-4 text-slate-300">30 min</div>
              <h3 className="text-xl font-bold mb-4">Kurz & prägnant</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>5-6 Songs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Perfekt für Apéros & Empfänge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Mix aus Original & Cover</span>
                </li>
              </ul>
            </div>

            {/* 1 Stunde */}
            <div className="border-2 border-slate-500 rounded-lg p-8 bg-slate-700/20 relative">
              <div className="absolute -top-4 left-6 bg-black px-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-300">Meistgewählt</span>
              </div>
              <div className="text-4xl font-black mb-4">1 h</div>
              <h3 className="text-xl font-bold mb-4">Standard</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>12-14 Songs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Perfekt für Hochzeiten & Events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Volle Setlist mit Flow</span>
                </li>
              </ul>
            </div>

            {/* 2 Stunden */}
            <div className="border border-slate-700 rounded-lg p-8 bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
              <div className="text-4xl font-black mb-4 text-slate-300">2 h</div>
              <h3 className="text-xl font-bold mb-4">Vollständig</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>25+ Songs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Kneipen & Festivals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Mit Pause + Variabilität</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Repertoire Overview */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur">
            <h3 className="text-2xl font-black mb-6">Repertoire</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-slate-200">Original-Kompositionen</h4>
                <p className="text-slate-400 mb-4">Deutsch & Polnische Songs mit emotionalen Balladen und eingängigen Pop-Rock-Nummern:</p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>→ Katze</li>
                  <li>→ Niebianski Groove</li>
                  <li>→ Maria</li>
                  <li>→ Weitere Original-Werke</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-slate-200">Sorgfältig Ausgewählte Covers</h4>
                <p className="text-slate-400 mb-4">Klassiker & aktuelle Hits in Deutsch und Englisch:</p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>→ Pocahontas (Annelyy Kantereit)</li>
                  <li>→ Country Roads (John Denver)</li>
                  <li>→ Johnny Cash Klassiker</li>
                  <li>→ Viele weitere Favoriten</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 pt-6 border-t border-slate-700">
              Ich wechsle flexibel zwischen Original-Songs und Covers – je nach Publikum, Stimmung und Veranstaltungstyp.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / GALLERY */}
      <section className="py-16 md:py-24 bg-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Galerie</span>
            <h2 className="text-5xl font-black mt-2 mb-2">Pressefotos</h2>
            <p className="text-slate-400">Hochauflösend & einsatzbereit für Ihre Promotion</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {fotos.map((foto, idx) => (
              <div key={idx} className="group relative rounded-lg overflow-hidden border border-slate-700 shadow-lg h-80">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <a 
            href="mailto:dawid.faith@gmail.com?subject=Pressefotos in hoher Auflösung anfordern"
            className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded transition"
          >
            Fotos per E-Mail anfordern
          </a>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-black border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Kontakt</span>
            <h2 className="text-5xl font-black mt-2 mb-2">Booking Anfrage</h2>
            <p className="text-slate-400">Senden Sie mir eine kurze Nachricht. Ich melde mich schnellstmöglich.</p>
          </div>

          <form className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Ihr Name</label>
                <input 
                  type="text" 
                  placeholder="Vorname Nachname"
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-2">E-Mail</label>
                <input 
                  type="email" 
                  placeholder="ihre@email.de"
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Veranstaltungstyp</label>
                <select 
                  value={bookingFormData.eventType}
                  onChange={(e) => setBookingFormData({...bookingFormData, eventType: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white focus:outline-none focus:border-slate-500"
                >
                  <option value="">Bitte wählen...</option>
                  <option>Hochzeit</option>
                  <option>Kneipe / Bar</option>
                  <option>Privatanlass</option>
                  <option>Corporate Event</option>
                  <option>Festival</option>
                  <option>Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Gewünschtes Datum</label>
                <input 
                  type="date" 
                  value={bookingFormData.date}
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-2">Ort / Venue</label>
              <input 
                type="text" 
                placeholder="Stadt, Venue-Name"
                value={bookingFormData.location}
                onChange={(e) => setBookingFormData({...bookingFormData, location: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            <div className="mb-8">
              <label className="block text-slate-300 font-semibold mb-2">Nachricht</label>
              <textarea 
                placeholder="Erzählen Sie mir mehr über Ihre Veranstaltung..."
                value={bookingFormData.message}
                onChange={(e) => setBookingFormData({...bookingFormData, message: e.target.value})}
                rows={5}
                className="w-full bg-slate-900/50 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <a 
                href={`mailto:dawid.faith@gmail.com?subject=Booking Anfrage - ${bookingFormData.eventType || 'Event'}&body=Name: ${bookingFormData.name}%0DEmail: ${bookingFormData.email}%0DDatum: ${bookingFormData.date}%0DOrt: ${bookingFormData.location}%0D%0DVeranstaltung: ${bookingFormData.eventType}%0D%0D${bookingFormData.message}`}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded transition flex items-center justify-center"
              >
                Anfrage senden
              </a>
              <a 
                href="tel:+491234567890"
                className="border border-slate-600 text-white font-semibold px-8 py-3 rounded hover:bg-slate-800 transition flex items-center justify-center"
              >
                Oder direkt anrufen
              </a>
            </div>
          </form>

          <div className="mt-8 p-6 bg-slate-800/30 border border-slate-700 rounded-lg text-center">
            <p className="text-slate-300 mb-2">Weitere Kontaktmöglichkeiten:</p>
            <p className="text-slate-400 text-sm">
              <a href="mailto:dawid.faith@gmail.com" className="text-slate-300 hover:text-white font-semibold">dawid.faith@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">© 2026 Dawid Faith • Professional Singer-Songwriter</p>
        </div>
      </footer>

    </div>
  );
}
