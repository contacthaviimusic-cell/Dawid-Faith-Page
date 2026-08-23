'use client';

import { useState, useEffect, useMemo, useRef, type FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Music, ShoppingBag, Sparkles, ChevronDown, Trophy, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PreOrderTranslations, { type LangKey } from '@/lib/translations/PreOrderPageTrans';
import FlagForLang, { FlagDE, FlagGB, FlagPL } from '@/components/FlagIcon';
import { getDeviceFingerprint } from '@/lib/fingerprint';

interface PublicSingle {
  id: string;
  title: string;
  coverImage: string;
  teaserVideo: string;
  audioReleaseDate: string;
  videoReleaseDate: string;
  presaveUrl: string;
  discountCode: string;
  preorderPrice: string;
  bandcampUrl: string;
  premiereVideoUrl: string;
  premiereRevealHours: string;
  active: boolean;
}

type Phase = 'presave' | 'preorder' | 'released';

function parseDate(value: string): number | null {
  if (!value) return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
}

function getPhase(single: PublicSingle, now: number): Phase {
  const audio = parseDate(single.audioReleaseDate);
  const video = parseDate(single.videoReleaseDate);
  if (video !== null && now >= video) return 'released';
  if (audio !== null && now >= audio) return 'preorder';
  return 'presave';
}

function formatRemaining(
  target: number,
  now: number,
  labels: { days: string; hours: string; minutes: string }
): string {
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  if (days > 0) return `${days} ${labels.days}, ${hours} ${labels.hours}`;
  if (hours > 0) return `${hours} ${labels.hours}, ${minutes} ${labels.minutes}`;
  return `${minutes} ${labels.minutes}`;
}

function Countdown({ target, labels }: { target: number; labels: { days: string; hours: string; minutes: string; seconds: string } }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const units = [
    { value: days, label: labels.days },
    { value: hours, label: labels.hours },
    { value: minutes, label: labels.minutes },
    { value: seconds, label: labels.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-16 sm:w-24 py-3 sm:py-4 rounded-2xl bg-black/60 border border-amber-500/20 backdrop-blur-sm">
            <span className="text-3xl sm:text-5xl font-black text-amber-400 tabular-nums">
              {String(u.value).padStart(2, '0')}
            </span>
          </div>
          <span className="block mt-2 text-xs uppercase tracking-widest text-stone-400">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PreOrderPageClient({
  skipWebsiteTracking = false,
  forceLang,
}: {
  skipWebsiteTracking?: boolean;
  forceLang?: LangKey;
}) {
  const params = useParams<{ songId: string }>();
  const songId = params?.songId;

  const [lang, setLang] = useState<LangKey>(forceLang ?? 'de');
  const [single, setSingle] = useState<PublicSingle | null>(null);
  const [loading, setLoading] = useState(true);
  const [presaved, setPresaved] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const [showGiveawayModal, setShowGiveawayModal] = useState(false);
  const [giveawayEmail, setGiveawayEmail] = useState('');
  const [giveawayLocation, setGiveawayLocation] = useState('');
  const [giveawayConsent, setGiveawayConsent] = useState(false);
  const [giveawaySubmitting, setGiveawaySubmitting] = useState(false);
  const [giveawayStatus, setGiveawayStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [giveawayError, setGiveawayError] = useState('');

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

  async function submitGiveaway(e: FormEvent) {
    e.preventDefault();
    if (!single || !giveawayConsent) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(giveawayEmail)) {
      setGiveawayStatus('error');
      setGiveawayError(t.presave.giveawayEmailInvalid);
      return;
    }
    if (!giveawayLocation.trim()) {
      setGiveawayStatus('error');
      setGiveawayError(t.presave.giveawayLocationInvalid);
      return;
    }
    setGiveawaySubmitting(true);
    setGiveawayStatus('idle');
    // Synchron innerhalb der Klick-Geste öffnen (sonst blockieren Browser das
    // spätere Öffnen nach dem asynchronen Request) und erst nach Erfolg auf
    // den echten Presave-Link umleiten.
    const presaveTab = typeof window !== 'undefined' ? window.open('', '_blank') : null;
    try {
      const res = await fetch('/api/giveaway/enter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId: single.id,
          email: giveawayEmail,
          location: giveawayLocation,
          lang,
          fingerprint: getDeviceFingerprint(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        presaveTab?.close();
        setGiveawayStatus('error');
        setGiveawayError(data.error ?? t.presave.giveawayError);
        return;
      }
      setGiveawayStatus('success');
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', { content_name: single.title, content_category: 'presave' });
      }
      const target = data.presaveUrl || single.presaveUrl;
      if (presaveTab) {
        presaveTab.location.href = target;
      } else {
        window.open(target, '_blank');
      }
    } catch {
      presaveTab?.close();
      setGiveawayStatus('error');
      setGiveawayError(t.presave.giveawayError);
    } finally {
      setGiveawaySubmitting(false);
    }
  }

  useEffect(() => {
    if (forceLang) {
      // Plattform-Link erzwingt die Sprache dieser Seite – trotzdem merken,
      // damit sie beim weiteren Navigieren auf der Seite erhalten bleibt.
      try {
        localStorage.setItem('site-lang', forceLang);
      } catch {}
      if (typeof document !== 'undefined') document.documentElement.lang = forceLang;
      return;
    }

    try {
      const stored = localStorage.getItem('site-lang') as LangKey | null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as LangKey;
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: LangKey }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }
    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, [forceLang]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    if (!songId) return;
    (async () => {
      try {
        const res = await fetch(`/api/singles/${songId}`, { cache: 'no-store' });
        if (res.ok) {
          setSingle((await res.json()) as PublicSingle);
        }
      } catch {}
      setLoading(false);
    })();
  }, [songId]);

  // Solange der Premiere-Link konfiguriert, aber noch nicht freigeschaltet ist,
  // regelmäßig neu abfragen, damit er ohne Neuladen der Seite erscheint, sobald
  // die Reveal-Zeit erreicht wird.
  useEffect(() => {
    if (!songId || !single) return;
    if (single.premiereVideoUrl || getPhase(single, Date.now()) !== 'preorder') return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/singles/${songId}`, { cache: 'no-store' });
        if (res.ok) setSingle((await res.json()) as PublicSingle);
      } catch {}
    }, 60_000);
    return () => clearInterval(interval);
  }, [songId, single]);

  useEffect(() => {
    if (!songId) return;
    // Nicht zusätzlich als Website-Besuch zählen, wenn der Klick bereits über
    // einen Plattform-Link gezählt wurde (skipWebsiteTracking-Prop von der
    // /pre-order/[songId]/[platform]-Route).
    if (skipWebsiteTracking) return;
    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId }),
      keepalive: true,
    }).catch(() => {});
  }, [songId, skipWebsiteTracking]);

  const phase: Phase = useMemo(
    () => (single ? getPhase(single, Date.now()) : 'presave'),
    [single]
  );

  const countdownTarget = useMemo(() => {
    if (!single) return null;
    if (phase === 'presave') return parseDate(single.audioReleaseDate);
    if (phase === 'preorder') return parseDate(single.videoReleaseDate);
    return null;
  }, [single, phase]);

  const premiereRevealTarget = useMemo(() => {
    if (!single) return null;
    const video = parseDate(single.videoReleaseDate);
    if (video === null) return null;
    const hours = Number(single.premiereRevealHours) || 48;
    return video - hours * 3_600_000;
  }, [single]);

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

  const showPresaveCard = phase === 'presave' && !!single.presaveUrl;
  const showPremiereCard = phase === 'preorder';

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {langSwitcher}
      {/* Fullscreen background: teaser video or cover */}
      <div className="fixed inset-0 z-0">
        {single.teaserVideo ? (
          <video
            src={single.teaserVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : single.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={single.coverImage} alt={single.title} className="w-full h-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4">Dawid Faith</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">{single.title}</h1>
        </motion.div>

        {/* Countdown or released */}
        {phase !== 'released' && countdownTarget !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <p className="text-stone-300 text-sm uppercase tracking-widest mb-6">
              {phase === 'presave' ? t.releaseIn : t.videoReleaseIn}
            </p>
            <Countdown
              target={countdownTarget}
              labels={{ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds }}
            />
          </motion.div>
        )}

        {phase === 'released' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t.released.title}</h2>
            <p className="text-stone-400 leading-relaxed mb-8">{t.released.desc}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {single.premiereVideoUrl && (
                <a
                  href={single.premiereVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
                >
                  {t.released.watchButton}
                  <ArrowRight size={18} />
                </a>
              )}
              <a
                href="https://app.dawidfaith.de"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                  single.premiereVideoUrl
                    ? 'border border-amber-500/50 hover:bg-amber-500/10 text-amber-400'
                    : 'bg-amber-500 hover:bg-amber-400 text-black hover:shadow-lg hover:shadow-amber-500/30'
                }`}
              >
                {t.released.appButton}
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-stone-300 text-sm uppercase tracking-widest mb-8"
            >
              {t.chooseYourWay}
            </motion.p>

            <div className={`grid gap-6 w-full items-start ${showPresaveCard || showPremiereCard ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-3xl'}`}>
              {/* 01 – Presave */}
              {showPresaveCard && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col p-8 rounded-2xl bg-black/60 border border-amber-500/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-500/60 font-black text-sm">01</span>
                    <Music className="text-amber-400" size={22} />
                  </div>

                  <div className="self-start inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 max-w-full">
                    <Trophy size={14} className="text-amber-400 flex-shrink-0" />
                    <span className="text-amber-400 text-[11px] font-black uppercase tracking-wide">{t.presave.prizeLabel}</span>
                  </div>

                  <h3 className="text-xl font-black mb-3">{t.presave.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-1">{t.presave.desc}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setGiveawayStatus('idle');
                      setShowGiveawayModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all mb-5"
                  >
                    {t.presave.button}
                    <ArrowRight size={16} />
                  </button>

                  {single.discountCode && (
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-stone-300">
                        <input
                          type="checkbox"
                          checked={presaved}
                          onChange={(e) => setPresaved(e.target.checked)}
                          className="w-4 h-4 accent-amber-500"
                        />
                        {t.presave.checkbox}
                      </label>
                      {presaved && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center"
                        >
                          <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                            {t.presave.codeLabel}
                          </p>
                          <p className="text-2xl font-black text-amber-400 tracking-widest">
                            {single.discountCode}
                          </p>
                          <p className="text-xs text-stone-500 mt-2">{t.presave.codeHint}</p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 01 – Premiere */}
              {showPremiereCard && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col p-8 rounded-2xl bg-black/60 border border-amber-500/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-amber-500/60 font-black text-sm">01</span>
                    <Youtube className="text-amber-400" size={22} />
                  </div>
                  <h3 className="text-xl font-black mb-3">{t.premiere.cardTitle}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-1">{t.premiere.cardDesc}</p>
                  {single.premiereVideoUrl ? (
                    <a
                      href={single.premiereVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
                    >
                      {t.premiere.button}
                      <ArrowRight size={16} />
                    </a>
                  ) : premiereRevealTarget !== null ? (
                    <p className="text-xs text-stone-500 text-center">
                      {t.premiere.countdownLabel}{' '}
                      {formatRemaining(premiereRevealTarget, Date.now(), {
                        days: t.days,
                        hours: t.hours,
                        minutes: t.minutes,
                      })}
                    </p>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 bg-stone-800 text-stone-400 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider cursor-not-allowed">
                      {t.premiere.comingSoon}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 02 – Pre-Order */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col p-8 rounded-2xl bg-black/60 border border-amber-500/40 backdrop-blur-sm relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-amber-500/60 font-black text-sm">{showPresaveCard || showPremiereCard ? '02' : '01'}</span>
                  <ShoppingBag className="text-amber-400" size={22} />
                </div>
                <h3 className="text-xl font-black mb-3">{t.preorder.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-1">{t.preorder.desc}</p>

                {single.preorderPrice && (
                  <p className="text-3xl font-black text-amber-400 mb-4">{single.preorderPrice} €</p>
                )}

                {single.bandcampUrl ? (
                  <a
                    href={single.bandcampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
                  >
                    {t.preorder.button}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center gap-2 bg-stone-800 text-stone-400 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider cursor-not-allowed">
                    {t.preorder.comingSoon}
                  </div>
                )}
                <p className="text-xs text-stone-500 mt-4 text-center">{t.preorder.availableUntil}</p>
              </motion.div>

              {/* 03 – Engagement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col p-8 rounded-2xl bg-black/60 border border-amber-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-amber-500/60 font-black text-sm">{showPresaveCard || showPremiereCard ? '03' : '02'}</span>
                  <Sparkles className="text-amber-400" size={22} />
                </div>

                {single.coverImage && (
                  <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-amber-500/30 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={single.coverImage} alt={single.title} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-black/70 border border-amber-500/40 text-amber-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                        NFT
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="relative w-4 h-4 rounded-full overflow-hidden border border-amber-500/40 flex-shrink-0">
                          <Image src="/dfaith-token.png" alt="D.FAITH Token" fill className="object-cover" />
                        </div>
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide truncate">
                          {t.engagement.nftLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">{t.engagement.nftSupply}</p>
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-black mb-3">{t.engagement.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-1">{t.engagement.desc}</p>
                <a
                  href="https://app.dawidfaith.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
                >
                  {t.engagement.button}
                  <ArrowRight size={16} />
                </a>
              </motion.div>

            </div>
          </>
        )}

        {/* Hairline divider + back link */}
        <div className="w-full mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />
          <div className="text-center">
            <Link href="/" className="text-stone-500 hover:text-amber-400 text-sm transition-colors">
              {t.backHome}
            </Link>
          </div>
        </div>
      </div>

      {/* Gewinnspiel-Modal: Wohnort + E-Mail + Teilnahmebedingungen, danach
          direkte Weiterleitung zum Presave */}
      {showGiveawayModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => !giveawaySubmitting && setShowGiveawayModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#12100d] rounded-3xl max-w-md w-full border border-amber-500/20 shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {giveawayStatus === 'success' ? (
              <>
                <h3 className="text-xl font-black mb-3">{t.presave.title}</h3>
                <p className="text-sm text-amber-400 leading-relaxed mb-6">{t.presave.giveawaySuccess}</p>
                <button
                  type="button"
                  onClick={() => setShowGiveawayModal(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {t.presave.giveawayClose}
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black mb-4">{t.presave.giveawayModalTitle}</h3>
                <form onSubmit={submitGiveaway} className="space-y-2.5">
                  <p className="text-xs text-stone-400 leading-relaxed mb-1">{t.presave.giveawayDesc}</p>
                  <input
                    type="text"
                    value={giveawayLocation}
                    onChange={(e) => {
                      setGiveawayLocation(e.target.value);
                      setGiveawayStatus('idle');
                    }}
                    placeholder={t.presave.giveawayLocationPlaceholder}
                    className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-stone-500 text-[11px] -mt-1.5">{t.presave.giveawayLocationHint}</p>
                  <input
                    type="email"
                    value={giveawayEmail}
                    onChange={(e) => {
                      setGiveawayEmail(e.target.value);
                      setGiveawayStatus('idle');
                    }}
                    placeholder={t.presave.giveawayEmailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex items-start gap-2 text-xs text-stone-400 pt-1">
                    <input
                      id="giveaway-consent"
                      type="checkbox"
                      checked={giveawayConsent}
                      onChange={(e) => setGiveawayConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-amber-500 flex-shrink-0 cursor-pointer"
                    />
                    <label htmlFor="giveaway-consent" className="cursor-pointer select-none">
                      {t.presave.giveawayConsent}{' '}
                      <Link
                        href="/teilnahmebedingungen"
                        target="_blank"
                        className="text-amber-400 hover:underline relative z-10"
                      >
                        {t.presave.giveawayTermsLink}
                      </Link>
                      .
                    </label>
                  </div>
                  {giveawayStatus === 'error' && (
                    <p className="text-xs text-red-400">{giveawayError}</p>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowGiveawayModal(false)}
                      className="flex-1 border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-4 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      {t.presave.giveawayCancel}
                    </button>
                    <button
                      type="submit"
                      disabled={giveawaySubmitting || !giveawayConsent || !giveawayEmail || !giveawayLocation}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      {giveawaySubmitting ? t.presave.giveawaySending : t.presave.giveawayButton}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
