'use client';

import { useState, useEffect } from 'react';
import KonzerteEventsTranslations from '@/lib/translations/KonzerteEventsTranslations';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Ticket, Star } from 'lucide-react';

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

  type KonzertEvent = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    venue: string;
    location: string;
    description: string;
    ticketUrl: string;
    isReleaseKonzert?: boolean;
    isVip?: boolean;
    capacity: string;
    price: string;
    status: string;
  };

  const konzertEvents: KonzertEvent[] = [
    // Single Release-Konzert wird ausgeblendet bis Datum feststeht
    // {
    //   id: 'release-konzert-2025',
    //   title: '🎵 Single Release-Konzert 2025',
    //   subtitle: 'Exklusives Single Release Event',
    //   date: '2025-11-15',
    //   time: '19:00',
    //   venue: 'Katys Garage',
    //   location: 'Dresden Neustadt',
    //   description: 'Ein gemütlicher Abend mit neuen Songs und guter Musik. Komm vorbei und lass uns zusammen feiern!',
    //   ticketUrl: '#tickets',
    //   isReleaseKonzert: true,
    //   isVip: false,
    //   capacity: 'Begrenzte Plätze',
    //   price: 'Freier Eintritt',
    //   status: 'upcoming'
    // }
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
    <section id="konzerte" className="py-12 px-2 sm:px-4 bg-gradient-to-b from-slate-900/20 to-purple-900/10">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {KonzerteEventsTranslations[lang].title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            {KonzerteEventsTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="flex flex-col gap-8">
          {konzertEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-md">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-xl font-bold text-purple-300 mb-3">
                  {KonzerteEventsTranslations[lang].noEvents}
                </h3>
                <p className="text-gray-300 text-sm">
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
              className={`relative overflow-hidden rounded-2xl border backdrop-blur-md p-6 sm:p-8 ${
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
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-xs font-bold flex items-center gap-2">
                    <Star size={14} />
                    Release Event
                  </div>
                </div>
              )}

              {/* VIP Badge */}
              {event.isVip && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-xs font-bold flex items-center gap-2">
                    <Star size={14} />
                    VIP
                  </div>
                </div>
              )}

              {/* Event Content */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      event.isReleaseKonzert ? 'text-purple-300' : event.isVip ? 'text-yellow-300' : 'text-blue-300'
                    }`}
                  >
                    {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.title) || event.title}
                  </h3>
                  {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.subtitle) || event.subtitle ? (
                    <p className="text-gray-400 text-sm">
                      {(KonzerteEventsTranslations[lang].events && KonzerteEventsTranslations[lang].events![event.id]?.subtitle) || event.subtitle}
                    </p>
                  ) : null}
                </div>

                {/* Event Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={18} className="text-purple-400" />
                    <span>{formatDate(event.date)}</span>
                    {event.time !== 'Nach Vereinbarung' && (
                      <>
                        <Clock size={15} className="text-purple-400 ml-2" />
                        <span>{event.time} {KonzerteEventsTranslations[lang].timeSuffix}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-pink-400" />
                    <span>{KonzerteEventsTranslations[lang].events?.[event.id]?.venue ?? event.venue}</span>
                    <span className="text-gray-500">•</span>
                    <span>{KonzerteEventsTranslations[lang].events?.[event.id]?.location ?? event.location}</span>
                  </div>
                  {(KonzerteEventsTranslations[lang].events?.[event.id]?.capacity ?? event.capacity) && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users size={18} className="text-blue-400" />
                      <span>{KonzerteEventsTranslations[lang].events?.[event.id]?.capacity ?? event.capacity}</span>
                    </div>
                  )}
                  {(KonzerteEventsTranslations[lang].events?.[event.id]?.price ?? event.price) && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Ticket size={18} className="text-green-400" />
                      <span>{KonzerteEventsTranslations[lang].events?.[event.id]?.price ?? event.price}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {KonzerteEventsTranslations[lang].events?.[event.id]?.description ?? event.description}
                </p>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-3">
                  {getStatusBadge(event.status)}

                  {event.ticketUrl && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2 rounded-full font-semibold text-xs transition-all duration-300 flex items-center gap-2 ${
                        event.isReleaseKonzert
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : event.isVip
                          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-black'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}
                      onClick={() => {
                        if (event.ticketUrl === '#tickets') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setTimeout(() => {
                            alert(KonzerteEventsTranslations[lang].releaseAlert);
                          }, 500);
                        }
                      }}
                    >
                      <Ticket size={15} />
                      {KonzerteEventsTranslations[lang].register}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )))}
        </div>
      </div>
    </section>
  );
}