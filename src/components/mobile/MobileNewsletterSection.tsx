'use client';

import { useState, useEffect } from 'react';
import NewsletterTranslations from '@/lib/translations/NewsletterTranslations';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function MobileNewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

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

        setTimeout(() => {
          setSubscriptionStatus('idle');
        }, 9000);
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

  return (
    <section id="newsletter" className="py-8 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto">
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
                {NewsletterTranslations[lang].newsletterTitle}
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              {NewsletterTranslations[lang].newsletterDesc}
            </p>
          </div>

          <div className="relative z-20">
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={NewsletterTranslations[lang].emailPlaceholder}
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
                  <span>{NewsletterTranslations[lang].subscribingLabel}</span>
                </>
              ) : (
                <>
                  <Mail size={20} />
                  <span>{NewsletterTranslations[lang].subscribeLabel}</span>
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
              <span className="text-sm">{NewsletterTranslations[lang].subscribeSuccess}</span>
            </motion.div>
          )}

          {subscriptionStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl border bg-red-500/20 border-red-500/30 text-red-400 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              <span className="text-sm">{NewsletterTranslations[lang].subscribeError}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}