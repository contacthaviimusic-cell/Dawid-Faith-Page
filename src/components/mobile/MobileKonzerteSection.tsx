'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Mail, CheckCircle, AlertCircle, Ticket } from 'lucide-react';

export default function MobileKonzerteSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // apiDebug removed for production

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
        return <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Verfügbar</span>;
      case 'sold-out':
        return <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">Ausverkauft</span>;
      case 'vip-only':
        return <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">VIP Only</span>;
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
              Live Konzerte
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Erlebe die Musik live und hautnah
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
                <span className="text-white font-bold text-sm">NÄCHSTES KONZERT</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {event.title}
              </h3>
              {event.subtitle && (
                <p className="text-orange-100 text-sm mb-1">{event.subtitle}</p>
              )}
              <p className="text-orange-100 text-sm">
                Neue Songs live erleben
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
                  <span>{event.time} Uhr</span>
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
                        alert('🎵 Das Single Release-Konzert in Katys Garage (Dresden Neustadt) hat freien Eintritt! Komm einfach vorbei.');
                      }, 500);
                    }
                  }}
                >
                  <Ticket size={18} />
                  Info & Anmeldung
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative backdrop-blur-md rounded-2xl border border-purple-500/30 p-6 overflow-hidden"
          style={{ backgroundImage: 'url(/dawid-faith-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative z-10 text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-purple-300" size={24} />
              <h3 className="text-xl font-bold text-white">
                Newsletter
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              Verpasse keine Neuigkeiten! Melde dich für Updates an.
            </p>
          </div>

          <div className="relative z-20">
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.com"
                disabled={isSubscribing}
                className="w-full px-4 py-4 bg-black/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Mail className="text-gray-400" size={18} />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubscribing}
              whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
              whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
              className="relative z-30 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ring-1 ring-white/5"
            >
              {isSubscribing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Wird angemeldet...</span>
                </>
              ) : (
                <>
                  <Mail size={20} />
                  <span>Für Updates anmelden</span>
                </>
              )}
            </motion.button>
            </form>
          </div>

          {/* Status Display */}
          {subscriptionStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl border bg-green-500/20 border-green-500/30 text-green-400 flex items-center gap-3"
            >
              <CheckCircle size={20} />
              <span className="text-sm">✓ Erfolgreich angemeldet! Du erhältst alle Updates zu kommenden Konzerten.</span>
            </motion.div>
          )}

          {subscriptionStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl border bg-red-500/20 border-red-500/30 text-red-400 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              <span className="text-sm">❌ Fehler bei der Anmeldung. Bitte versuche es erneut.</span>
            </motion.div>
          )}

          {/* debug panel removed */}

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div
              role="region"
              aria-label="Exklusive Updates"
              className="bg-gradient-to-br from-purple-700/80 to-pink-600/80 shadow-lg rounded-xl p-4 text-center border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              tabIndex={0}
            >
              <Users className="text-white mx-auto mb-2 drop-shadow-md" size={28} />
              <p className="text-white text-sm font-bold">Exklusive Updates</p>
              <p className="text-white/90 text-[11px] mt-1">Vorabinfos & Specials</p>
            </div>
            <div
              role="region"
              aria-label="Frühe Tickets"
              className="bg-gradient-to-br from-orange-700/80 to-red-600/80 shadow-lg rounded-xl p-4 text-center border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              tabIndex={0}
            >
              <Calendar className="text-white mx-auto mb-2 drop-shadow-md" size={28} />
              <p className="text-white text-sm font-bold">Frühe Tickets</p>
              <p className="text-white/90 text-[11px] mt-1">Sichere dir Plätze früher</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}