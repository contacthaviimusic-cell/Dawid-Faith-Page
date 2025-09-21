'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Mail, CheckCircle, AlertCircle, Ticket } from 'lucide-react';

export default function MobileKonzerteSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Bitte E-Mail-Adresse eingeben');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Erfolgreich angemeldet! Du erhältst alle Updates zu kommenden Konzerten.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Newsletter-Anmeldung fehlgeschlagen. Bitte versuche es später erneut.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const konzertDetails = {
    venue: 'Katys Garage Dresden',
    date: 'Bald verfügbar',
    time: 'Wird bekannt gegeben',
    price: 'Eintritt frei',
    address: 'Dresden, Deutschland',
    description: 'Ein intimes Konzert in gemütlicher Atmosphäre. Erlebe neue Songs live und sei Teil einer unvergesslichen Nacht.'
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
              Release Konzert
            </h3>
            <p className="text-orange-100 text-sm">
              Neue Songs live erleben
            </p>
          </div>

          {/* Concert Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Venue */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="text-orange-400" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">{konzertDetails.venue}</p>
                  <p className="text-gray-400 text-sm">{konzertDetails.address}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="text-blue-400" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">{konzertDetails.date}</p>
                  <p className="text-gray-400 text-sm">Datum wird bald bekannt gegeben</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="text-purple-400" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">{konzertDetails.time}</p>
                  <p className="text-gray-400 text-sm">Uhrzeit folgt</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Ticket className="text-green-400" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">{konzertDetails.price}</p>
                  <p className="text-gray-400 text-sm">Kostenlos für alle Fans</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-300 text-sm leading-relaxed">
                {konzertDetails.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-purple-400" size={24} />
              <h3 className="text-xl font-bold text-white">
                Konzert-Updates
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Verpasse keine Konzert-Ankündigungen! Melde dich für Updates an.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.com"
                disabled={isSubmitting}
                className="w-full px-4 py-4 bg-black/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Mail className="text-gray-400" size={18} />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
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

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl border flex items-center gap-3 ${
                messageType === 'success'
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
              }`}
            >
              {messageType === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="text-sm">{message}</span>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-black/30 rounded-xl p-3 text-center">
              <Users className="text-blue-400 mx-auto mb-2" size={20} />
              <p className="text-white text-xs font-medium">Exklusive Updates</p>
            </div>
            <div className="bg-black/30 rounded-xl p-3 text-center">
              <Calendar className="text-green-400 mx-auto mb-2" size={20} />
              <p className="text-white text-xs font-medium">Frühe Tickets</p>
            </div>
          </div>
        </motion.div>

        {/* Past Concerts Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Mehr Konzerte in Planung
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Dies ist erst der Anfang! Weitere Live-Shows werden folgen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700">
              <h4 className="text-white font-medium mb-1">Acoustic Sessions</h4>
              <p className="text-gray-400 text-xs">Intime Auftritte mit nur Gitarre und Stimme</p>
            </div>
            <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700">
              <h4 className="text-white font-medium mb-1">Festival Shows</h4>
              <p className="text-gray-400 text-xs">Große Bühnen und unvergessliche Momente</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}