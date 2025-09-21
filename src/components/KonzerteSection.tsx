"use client";

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Ticket, Music, Heart, Mail } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import KonzerteTranslations from '../lib/translations/KonzerteSectionTrans';

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

export default function KonzerteSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  // removed apiDebug (debug UI no longer needed in production)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
  try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json().catch(() => ({}));
      console.log('Newsletter POST response:', response.status, data);

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');

        // Reset status after ~9 seconds (previously 3s) - keep success visible longer
        setTimeout(() => {
          setSubscriptionStatus('idle');
        }, 9000);
      } else {
        setSubscriptionStatus('error');
        const message = (data && (data.error)) ? data.error : `status:${response.status}`;
        console.error('Newsletter subscription error:', message);

        // Reset status after 3 seconds
        setTimeout(() => {
          setSubscriptionStatus('idle');
        }, 3000);
      }
    } catch (error) {
      setSubscriptionStatus('error');
      console.error('Newsletter subscription error (network):', error);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Verschiedene Termine') return dateString;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">{KonzerteTranslations[lang].status.upcoming}</span>;
      case 'sold-out':
        return <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">{KonzerteTranslations[lang].status.soldOut}</span>;
      case 'vip-only':
        return <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">{KonzerteTranslations[lang].status.vipOnly}</span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de' | 'en' | 'pl' | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de' | 'en' | 'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de' | 'en' | 'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
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
            {KonzerteTranslations[lang].title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {KonzerteTranslations[lang].subtitle}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            {konzertEvents.map((event, index) => (
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
                  <h3 className={`text-2xl font-bold mb-2 ${
                    event.isReleaseKonzert ? 'text-purple-300' : 
                    event.isVip ? 'text-yellow-300' : 'text-blue-300'
                  }`}>
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <p className="text-gray-400 text-lg">{event.subtitle}</p>
                  )}
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={20} className="text-purple-400" />
                    <span>{formatDate(event.date)}</span>
                    {event.time !== 'Nach Vereinbarung' && (
                      <>
                        <Clock size={16} className="text-purple-400 ml-2" />
                        <span>{event.time} Uhr</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={20} className="text-pink-400" />
                    <span>{event.venue}</span>
                    <span className="text-gray-500">•</span>
                    <span>{event.location}</span>
                  </div>

                  {event.capacity && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users size={20} className="text-blue-400" />
                      <span>{event.capacity}</span>
                    </div>
                  )}

                  {event.price && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Ticket size={20} className="text-green-400" />
                      <span>{event.price}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {event.description}
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
                              alert(KonzerteTranslations[lang].releaseAlert);
                          }, 500);
                        }
                      }}
                    >
                      {event.isVip ? (
                        <>
                          <Heart size={16} />
                          {KonzerteTranslations[lang].moreInfo}
                        </>
                      ) : (
                        <>
                          <Ticket size={16} />
                          {KonzerteTranslations[lang].register}
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <Mail className="mx-auto mb-4 text-purple-400" size={48} />
            <h3 className="text-2xl font-bold mb-4 text-purple-300">
              {KonzerteTranslations[lang].newsletterTitle}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {KonzerteTranslations[lang].newsletterDesc}
            </p>
            
            {subscriptionStatus === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-300 font-semibold">{KonzerteTranslations[lang].subscribeSuccess}</p>
              </div>
            ) : subscriptionStatus === 'error' ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300 font-semibold">{KonzerteTranslations[lang].subscribeError}</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-6">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={KonzerteTranslations[lang].emailPlaceholder}
                    className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    required
                    disabled={isSubscribing}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubscribing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {KonzerteTranslations[lang].subscribingLabel}
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        {KonzerteTranslations[lang].subscribeLabel}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
            {/* API debug panel (shows server debug message when present) */}
            {/* debug panel removed */}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm"
              onClick={() => {
                const el = document.querySelector('#dfaith');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {KonzerteTranslations[lang].ticketButtonScroll}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}