'use client';

import { useState, useEffect } from 'react';
import KonzerteEventsTranslations from '@/lib/translations/KonzerteEventsTranslations';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react';

export default function MobileKonzerteEventsSection() {
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }
    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const konzertEvents = [
    {
      id: 'release-konzert-2025',
      title: '🎵 Single Release-Konzert 2025',
      subtitle: 'Exklusives Single Release Event',
      date: '2025-11-15',
      time: '19:00',
      venue: 'Katys Garage',
      location: 'Dresden Neustadt',
      description: 'Ein gemütlicher Abend mit neuen Songs und guter Musik. Komm vorbei und lass uns zusammen feiern!',
      ticketUrl: '#tickets',
      isReleaseKonzert: true,
      capacity: 'Begrenzte Plätze',
      price: 'Freier Eintritt',
      status: 'upcoming'
    }
  ];

  const formatDate = (dateString: string) => {
    if (dateString === (KonzerteEventsTranslations[lang].variousDates ?? 'Verschiedene Termine')) return KonzerteEventsTranslations[lang].variousDates ?? dateString;
    const date = new Date(dateString);
    const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
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

  return (
    <section id="konzerte" className="py-16 px-4 bg-gradient-to-b from-black via-orange-900/10 to-black">
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
            <Calendar className="text-orange-400" size={28} />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              {KonzerteEventsTranslations[lang].title}
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            {KonzerteEventsTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Upcoming Concert Card */}
        {konzertEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900/50 to-orange-900/20 backdrop-blur-md rounded-2xl border border-orange-500/20 overflow-hidden mb-8"
          >
            {/* Concert Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Ticket className="text-white" size={20} />
                <span className="text-white font-bold text-sm">{KonzerteEventsTranslations[lang].events?.[event.id]?.title ? KonzerteEventsTranslations[lang].events[event.id].title : KonzerteEventsTranslations[lang].releaseBadge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {KonzerteEventsTranslations[lang].events?.[event.id]?.title ?? event.title}
              </h3>
              { (KonzerteEventsTranslations[lang].events?.[event.id]?.subtitle ?? event.subtitle) && (
                <p className="text-orange-100 text-sm mb-1">{KonzerteEventsTranslations[lang].events?.[event.id]?.subtitle ?? event.subtitle}</p>
              )}
              <p className="text-orange-100 text-sm">
                {KonzerteEventsTranslations[lang].events?.[event.id]?.description ?? event.description}
              </p>
            </div>

            {/* Concert Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Datum & Uhrzeit */}
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="text-blue-400" size={18} />
                  <span>{formatDate(event.date)}</span>
                  <Clock className="text-purple-400 ml-2" size={18} />
                  <span>{event.time} {KonzerteEventsTranslations[lang].timeSuffix}</span>
                </div>
                {/* Venue & Ort */}
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="text-pink-400" size={18} />
                  <span>{event.venue}</span>
                  <span className="text-gray-400">•</span>
                  <span>{event.location}</span>
                </div>
                {/* Kapazität */}
                {event.capacity && (
                  <div className="flex items-center gap-3 text-white">
                    <Users className="text-blue-400" size={18} />
                    <span>{event.capacity}</span>
                  </div>
                )}
                {/* Preis */}
                {event.price && (
                  <div className="flex items-center gap-3 text-white">
                    <Ticket className="text-green-400" size={18} />
                    <span>{event.price}</span>
                  </div>
                )}
              </div>
              {/* Status-Badge */}
              <div className="mt-2">{getStatusBadge(event.status)}</div>
              {/* Beschreibung */}
              <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
              {/* Info Button */}
              {event.ticketUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() => {
                      if (event.ticketUrl === '#tickets') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          alert(KonzerteEventsTranslations[lang].releaseAlert);
                        }, 500);
                      }
                  }}
                >
                  <Ticket size={18} />
                  {KonzerteEventsTranslations[lang].register}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}