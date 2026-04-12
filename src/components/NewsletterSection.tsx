"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import NewsletterTranslations from '../lib/translations/NewsletterTranslations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    try {
      let lastResponse: Response | null = null;
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      lastResponse = response;

      const data = await response.json().catch(() => ({}));
      console.log('Newsletter POST response:', response.status, data);

      setResponseStatus(response.status);
      
      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');

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
    <section id="newsletter" className="scroll-mt-16 py-20 px-4 relative bg-gradient-to-b from-slate-900/20 to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <Mail className="mx-auto mb-4 text-purple-400" size={48} />
            <h3 className="text-2xl font-bold mb-4 text-purple-300">
              {NewsletterTranslations[lang].newsletterTitle}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {NewsletterTranslations[lang].newsletterDesc}
            </p>
            
            {subscriptionStatus === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-300 font-semibold">{NewsletterTranslations[lang].subscribeSuccess}</p>
              </div>
            ) : subscriptionStatus === 'error' ? (
              <div className={`${responseStatus === 409 ? 'bg-blue-500/20 border-blue-500/30' : 'bg-red-500/20 border-red-500/30'} border rounded-lg p-4 mb-6`}>
                <p className={`${responseStatus === 409 ? 'text-blue-300' : 'text-red-300'} font-semibold`}>
                  {responseStatus === 409 
                    ? NewsletterTranslations[lang].alreadySubscribed 
                    : NewsletterTranslations[lang].subscribeError}
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-6">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={NewsletterTranslations[lang].emailPlaceholder}
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
                        {NewsletterTranslations[lang].subscribingLabel}
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        {NewsletterTranslations[lang].subscribeLabel}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm"
              onClick={() => {
                const el = document.querySelector('#dfaith');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {NewsletterTranslations[lang].ticketButtonScroll}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}