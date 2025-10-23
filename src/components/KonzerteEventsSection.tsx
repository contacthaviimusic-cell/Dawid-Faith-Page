"use client";

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Ticket, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import KonzerteEventsTranslations from '../lib/translations/KonzerteEventsTranslations';

interface KonzertEvent {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  ticketUrl?: string;
  isVip?: boolean;
  isReleaseKonzert?: boolean;
  capacity?: string;
  price?: string;
  status: 'upcoming' | 'sold-out' | 'vip-only';
}

const konzertEvents: KonzertEvent[] = [
  // Single Release-Konzert wird ausgeblendet bis Datum feststeht
  // {
  //   id: 'release-konzert-2025',
  //   title: '🎵 Single Release-Konzert 2025',
  //   subtitle: 'Exklusives Single Release Event',
  //   date: '2025-11-15',
  //   time: '19:00',
  //   venue: "Katys Garage",
  //   location: 'Dresden Neustadt',
  //   description: 'Ein gemütlicher Abend mit neuen Songs und guter Musik. Komm vorbei und lass uns zusammen feiern!',
  //   ticketUrl: '#tickets',
  //   isReleaseKonzert: true,
  //   capacity: 'Begrenzte Plätze',
  //   price: 'Freier Eintritt',
  //   status: 'upcoming'
  // }
];

export default function KonzerteEventsSection() {
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  const formatDate = (dateString: string) => {
    if (dateString === 'Verschiedene Termine') return dateString;
    const date = new Date(dateString);
    const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const isClockTime = (t: string) => /\d{1,2}:\d{2}/.test(t);

  const formatTime = (dateString: string, timeString: string) => {
    if (!timeString) return '';
    if (!isClockTime(timeString)) return timeString;

    const iso = `${dateString}T${timeString}`;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return timeString;

    const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
    const formatted = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(d);
    if (lang === 'de') return `${formatted} Uhr`;
    return formatted;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">{KonzerteEventsTranslations[lang].status.upcoming}</span>;
      case 'sold-out':
        return <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">{KonzerteEventsTranslations[lang].status.soldOut}</span>;
      case 'vip-only':
        return <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">{KonzerteEventsTranslations[lang].status.vipOnly}</span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    try {
      const stored = (typeof window !== 'undefined' && localStorage.getItem('site-lang')) as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }

      const handler = () => {
        const newLang = (typeof window !== 'undefined' && localStorage.getItem('site-lang')) as 'de' | 'en' | 'pl' | null || (typeof document !== 'undefined' ? (document.documentElement.lang as 'de' | 'en' | 'pl') : null);
        if (newLang === 'de' || newLang === 'en' || newLang === 'pl') setLang(newLang);
      };

      window.addEventListener('site-lang-changed', handler as EventListener);
      return () => window.removeEventListener('site-lang-changed', handler as EventListener);
    } catch (_err) {
      // ignore
    }
  }, []);

  return (
    <section id="konzerte" className="py-20 px-4 relative bg-gradient-to-b from-slate-900/20 to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {KonzerteEventsTranslations[lang].title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {KonzerteEventsTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            {konzertEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center py-16"
              >
                <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border border-purple-500/20 rounded-2xl p-12 backdrop-blur-md">
                  <div className="text-6xl mb-6">🎵</div>
                  <h3 className="text-2xl font-bold text-purple-300 mb-4">
                    {KonzerteEventsTranslations[lang].noEvents}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {KonzerteEventsTranslations[lang].noEventsDesc}
                  </p>
                </div>
              </motion.div>
            ) : (
              konzertEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl border backdrop-blur-md p-8 ${
                  event.isReleaseKonzert
                    ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30'
                    : event.isVip
                    ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-500/30'
                    : 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20'
                }`}
              >
                {/* Special Badge for Release Konzert */}
                {event.isReleaseKonzert && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-sm font-bold flex items-center gap-2">
                      <Star size={16} />
                      Release Event
                    </div>
                  </div>
                )}

                {/* VIP Badge */}
                {event.isVip && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-sm font-bold flex items-center gap-2">
                      <Star size={16} />
                      VIP
                    </div>
                  </div>
                )}

                {/* Event Content */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        event.isReleaseKonzert ? 'text-purple-300' : event.isVip ? 'text-yellow-300' : 'text-blue-300'
                      }`}
                    >
                      {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.title) || event.title}
                    </h3>
                    {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.subtitle) || event.subtitle ? (
                      <p className="text-gray-400 text-lg">
                        {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.subtitle) || event.subtitle}
                      </p>
                    ) : null}
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar size={20} className="text-purple-400" />
                      <span>{formatDate(event.date)}</span>
                      {event.time !== 'Nach Vereinbarung' && (
                        <>
                          <Clock size={16} className="text-purple-400 ml-2" />
                          <span>{formatTime(event.date, event.time)}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin size={20} className="text-pink-400" />
                      <span>{(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.venue) || event.venue}</span>
                      <span className="text-gray-500">•</span>
                      <span>{(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.location) || event.location}</span>
                    </div>

                    {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.capacity) || event.capacity ? (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Users size={20} className="text-blue-400" />
                        <span>{(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.capacity) || event.capacity}</span>
                      </div>
                    ) : null}

                    {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.price) || event.price ? (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Ticket size={20} className="text-green-400" />
                        <span>{(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.price) || event.price}</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.description) || event.description}
                  </p>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between pt-4">
                    {getStatusBadge(event.status)}

                    {event.ticketUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                          event.isReleaseKonzert
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : event.isVip
                            ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-black'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        }`}
                        onClick={() => {
                          if (event.ticketUrl === '#tickets') {
                            // Scroll to top and trigger a special event for tickets
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setTimeout(() => {
                              alert(KonzerteEventsTranslations[lang].releaseAlert);
                            }, 500);
                          }
                        }}
                      >
                        {event.isVip ? (
                          <>
                            <Heart size={16} />
                            {KonzerteEventsTranslations[lang].moreInfo}
                          </>
                        ) : (
                          <>
                            <Ticket size={16} />
                            {KonzerteEventsTranslations[lang].register}
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
}
