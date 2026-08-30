'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import PreOrderTranslations, { type LangKey } from '@/lib/translations/PreOrderPageTrans';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from '@/components/FlagIcon';
import { getDeviceFingerprint } from '@/lib/fingerprint';

interface PublicSingle {
  id: string;
  title: string;
  coverImage: string;
  teaserVideo: string;
  presaveUrl: string;
  active: boolean;
}

// Ziel-Seite für den Presave-Redirect (z.B. bei Hypeddit als "danach
// weiterleiten zu"-URL hinterlegt): der Presave selbst ist an dieser Stelle
// schon erledigt, hier gibt's nur noch das Gewinnspiel als Bonus obendrauf.
export default function GewinnspielPage() {
  const params = useParams<{ songId: string }>();
  const songId = params?.songId;

  const [lang, setLang] = useState<LangKey>('de');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const [single, setSingle] = useState<PublicSingle | null>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const t = PreOrderTranslations[lang];

  function changeLang(next: LangKey) {
    setLang(next);
    setLangOpen(false);
    try {
      localStorage.setItem('site-lang', next);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next;
      try {
        window.dispatchEvent(new CustomEvent('site-lang-changed', { detail: { lang: next } }));
      } catch {}
    }
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as LangKey | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
    } catch {}
    function onDocClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    if (!songId) return;
    (async () => {
      try {
        const res = await fetch(`/api/singles/${songId}`, { cache: 'no-store' });
        if (res.ok) setSingle((await res.json()) as PublicSingle);
      } catch {}
      setLoading(false);
    })();
  }, [songId]);

  async function submitGiveaway(e: FormEvent) {
    e.preventDefault();
    if (!single || !consent) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setError(t.presave.giveawayEmailInvalid);
      return;
    }
    if (!location.trim()) {
      setStatus('error');
      setError(t.presave.giveawayLocationInvalid);
      return;
    }
    setSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/giveaway/enter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId: single.id,
          email,
          location,
          lang,
          fingerprint: getDeviceFingerprint(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setError(data.error ?? t.presave.giveawayError);
        return;
      }
      setStatus('success');
      window.fbq?.('track', 'Lead', { content_name: single.title, content_category: 'presave' });
    } catch {
      setStatus('error');
      setError(t.presave.giveawayError);
    } finally {
      setSubmitting(false);
    }
  }

  const langSwitcher = (
    <div className="fixed top-4 right-4 z-50" ref={langRef}>
      <button
        onClick={() => setLangOpen((s) => !s)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm text-white"
        aria-haspopup
        aria-expanded={langOpen}
      >
        <FlagForLang lang={lang} />
        <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
      </button>
      {langOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-black/90 border border-amber-500/20 rounded-md shadow-lg backdrop-blur-sm">
          <ul className="py-1">
            <li>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-amber-500/10" onClick={() => changeLang('de')}>
                <FlagDE />
                <span className="text-sm text-white">Deutsch</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-amber-500/10" onClick={() => changeLang('en')}>
                <FlagGB />
                <span className="text-sm text-white">English</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-amber-500/10" onClick={() => changeLang('pl')}>
                <FlagPL />
                <span className="text-sm text-white">Polski</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {langSwitcher}
        <p className="text-stone-400">{t.loading}</p>
      </div>
    );
  }

  if (!single) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6 text-center">
        {langSwitcher}
        <p className="text-stone-300 text-lg">{t.notFound}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
        >
          {t.backHome}
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {langSwitcher}
      <div className="fixed inset-0 z-0">
        {single.teaserVideo ? (
          <video src={single.teaserVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : single.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={single.coverImage} alt={single.title} className="w-full h-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4">Dawid Faith</p>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{t.giveawayPage.title}</h1>
          <p className="text-stone-300 text-sm leading-relaxed mb-6">{t.giveawayPage.intro(single.title)}</p>

          <div className="inline-flex items-center gap-1.5 mb-8 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 max-w-full">
            <Trophy size={14} className="text-amber-400 flex-shrink-0" />
            <span className="text-amber-400 text-[11px] font-black uppercase tracking-wide">{t.presave.prizeLabel}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full p-6 md:p-8 rounded-3xl bg-black/60 border border-amber-500/20 backdrop-blur-sm"
        >
          {status === 'success' ? (
            <p className="text-sm text-amber-400 leading-relaxed">{t.giveawayPage.success}</p>
          ) : (
            <form onSubmit={submitGiveaway} className="space-y-2.5 text-left">
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setStatus('idle');
                }}
                placeholder={t.presave.giveawayLocationPlaceholder}
                className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <p className="text-stone-500 text-[11px] -mt-1.5">{t.presave.giveawayLocationHint}</p>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus('idle');
                }}
                placeholder={t.presave.giveawayEmailPlaceholder}
                className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-start gap-2 text-xs text-stone-400 pt-1">
                <input
                  id="giveaway-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-amber-500 flex-shrink-0 cursor-pointer"
                />
                <label htmlFor="giveaway-consent" className="cursor-pointer select-none">
                  {t.presave.giveawayConsent}{' '}
                  <Link href="/teilnahmebedingungen" target="_blank" className="text-amber-400 hover:underline relative z-10">
                    {t.presave.giveawayTermsLink}
                  </Link>
                  .
                </label>
              </div>
              {status === 'error' && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={submitting || !consent || !email || !location}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all mt-1"
              >
                {submitting ? t.presave.giveawaySending : t.giveawayPage.submitButton}
              </button>
            </form>
          )}
        </motion.div>

        <Link href="/" className="text-stone-500 hover:text-amber-400 text-sm transition-colors mt-10">
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
