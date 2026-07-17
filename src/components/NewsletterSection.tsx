"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import NewsletterTranslations from '../lib/translations/NewsletterTranslations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !location.trim()) return;

    setIsSubscribing(true);

    try {
      let lastResponse: Response | null = null;
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), location: location.trim() }),
      });
      lastResponse = response;

      const data = await response.json().catch(() => ({}));
      console.log('Newsletter POST response:', response.status, data);

      setResponseStatus(response.status);
      
      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
        setLocation('');

        setTimeout(() => {
          setSubscriptionStatus('idle');
          setResponseStatus(null);
        }, 9000);
      } else if (response.status === 409) {
        setSubscriptionStatus('error');
        console.log('Email already subscribed');
        
        setTimeout(() => {
          setSubscriptionStatus('idle');
          setResponseStatus(null);
        }, 3000);
      } else {
        setSubscriptionStatus('error');
        const message = (data && (data.error)) ? data.error : `status:${response.status}`;
        console.error('Newsletter subscription error:', message);

        setTimeout(() => {
          setSubscriptionStatus('idle');
        }, 3000);
      }
    } catch (error) {
      setSubscriptionStatus('error');
      console.error('Newsletter subscription error (network):', error);

      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    } finally {
      setIsSubscribing(false);
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
    <section id="newsletter" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.07] via-transparent to-amber-500/[0.07] p-8 md:p-12 overflow-hidden">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
              <Mail className="text-amber-400" size={22} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-white">
              {NewsletterTranslations[lang].newsletterTitle}
            </h3>
            <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
              {NewsletterTranslations[lang].newsletterDesc}
            </p>

            {subscriptionStatus === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                <p className="text-green-300 font-semibold">{NewsletterTranslations[lang].subscribeSuccess}</p>
              </div>
            ) : subscriptionStatus === 'error' ? (
              <div className={`${responseStatus === 409 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-xl p-4 mb-6`}>
                <p className={`${responseStatus === 409 ? 'text-amber-300' : 'text-red-300'} font-semibold`}>
                  {responseStatus === 409
                    ? NewsletterTranslations[lang].alreadySubscribed
                    : NewsletterTranslations[lang].subscribeError}
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={NewsletterTranslations[lang].emailPlaceholder}
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    required
                    disabled={isSubscribing}
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={NewsletterTranslations[lang].locationPlaceholder}
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    required
                    disabled={isSubscribing}
                  />
                </div>
                <p className="text-stone-500 text-xs mb-4 -mt-1">
                  {NewsletterTranslations[lang].locationHint}
                </p>
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubscribing}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {NewsletterTranslations[lang].subscribingLabel}
                      </>
                    ) : (
                      <>
                        <Mail size={15} />
                        {NewsletterTranslations[lang].subscribeLabel}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}

            <button
              className="text-amber-400 hover:text-amber-300 text-xs font-semibold uppercase tracking-wider transition-colors"
              onClick={() => {
                const el = document.querySelector('#dfaith');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {NewsletterTranslations[lang].ticketButtonScroll}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}