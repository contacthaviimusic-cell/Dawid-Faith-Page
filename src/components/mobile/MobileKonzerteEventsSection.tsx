'use client';

import { useState, useEffect } from 'react';
import KonzerteEventsTranslations from '@/lib/translations/KonzerteEventsTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Ticket, Star, Phone, Mail, X } from 'lucide-react';

export default function MobileKonzerteEventsSection() {
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');
  const [showContactModal, setShowContactModal] = useState(false);
  const [modalEventId, setModalEventId] = useState<string | null>(null);

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
    {
      id: 'wohnzimmer-konzert',
      title: 'Private Wohnzimmerkonzerte',
      subtitle: 'Exklusives Konzert in deinem Wohnzimmer',
      date: KonzerteEventsTranslations[lang].variousDates ?? 'Verschiedene Termine',
      time: 'Nach Vereinbarung',
      venue: 'Dein Wohnzimmer',
      location: 'Überall möglich',
      description: 'Erlebe ein intimes Konzert in deinem eigenen Wohnzimmer. Ein einzigartiges musikalisches Erlebnis für dich und deine Gäste. Kontaktiere mich per Mail oder Telefon für weitere Details und Buchung.',
      ticketUrl: 'tel:+48692223144',
      isReleaseKonzert: false,
      isVip: true,
      capacity: '5-20 Personen',
      price: 'Auf Anfrage',
      status: 'upcoming'
    }
  ];

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === KonzerteEventsTranslations[lang].variousDates) {
      return KonzerteEventsTranslations[lang].variousDates ?? 'Verschiedene Termine';
    }
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
      return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
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
                        } else if (event.id === 'wohnzimmer-konzert') {
                          setModalEventId(event.id);
                          setShowContactModal(true);
                        } else {
                          window.location.href = event.ticketUrl;
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

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30 shadow-2xl max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Animation */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-5 -left-5 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                />
              </div>

              {/* Modal Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4">
                  {lang === 'de' ? 'Wie möchten Sie Kontakt aufnehmen?' :
                   lang === 'en' ? 'How would you like to get in touch?' :
                   'Jak chcesz się skontaktować?'}
                </h3>
                
                {/* Contact Options */}
                <div className="space-y-3">
                  {/* Phone Option */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'tel:+48692223144'}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl p-4 flex items-center gap-3 transition-all duration-300"
                  >
                    <div className="bg-white/10 rounded-lg p-2">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">
                        {lang === 'de' ? 'Anrufen' :
                         lang === 'en' ? 'Call' :
                         'Zadzwoń'}
                      </div>
                      <div className="text-sm text-white/70">+48 692 223 144</div>
                    </div>
                  </motion.button>

                  {/* Email Option */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'mailto:dawid.faith@gmail.com?subject=Wohnzimmerkonzert%20Anfrage'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl p-4 flex items-center gap-3 transition-all duration-300"
                  >
                    <div className="bg-white/10 rounded-lg p-2">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">
                        {lang === 'de' ? 'E-Mail schreiben' :
                         lang === 'en' ? 'Send Email' :
                         'Wyślij e-mail'}
                      </div>
                      <div className="text-sm text-white/70">dawid.faith@gmail.com</div>
                    </div>
                  </motion.button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-2 right-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}