'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const translations = {
  de: {
    title: 'Live buchen',
    subtitle: 'Slavischer Pop-Rock mit Akustik-Gitarre – für dein Event.',
    cta: 'Booking-Seite öffnen',
    tagline: 'Solo Akustik · DE / PL / EN · 28 Songs',
  },
  en: {
    title: 'Book Live',
    subtitle: 'Slavic Pop-Rock with acoustic guitar – for your event.',
    cta: 'Open Booking Page',
    tagline: 'Solo Acoustic · DE / PL / EN · 28 Songs',
  },
  pl: {
    title: 'Zarezerwuj na żywo',
    subtitle: 'Słowiański Pop-Rock z gitarą akustyczną – na Twoje wydarzenie.',
    cta: 'Otwórz stronę bookingu',
    tagline: 'Gitara akustyczna · DE / PL / EN · 28 utworów',
  },
};

export default function MobileKonzerteEventsSection() {
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');
  const t = translations[lang];

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
    <section id="konzerte" className="scroll-mt-14 py-12 px-4 bg-gradient-to-b from-stone-900/20 to-amber-900/10">
      <div className="max-w-lg mx-auto">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-56 rounded-2xl overflow-hidden mb-8"
        >
          <Image
            src="/booking/pressefotos/Dawid und Gruppe.jpg"
            alt="Dawid Faith live"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-base text-stone-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 bg-amber-500 active:bg-amber-400 text-black px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            {t.cta}
            <ArrowRight size={18} />
          </Link>
          <p className="text-stone-500 text-xs mt-4">{t.tagline}</p>
        </motion.div>
      </div>
    </section>
  );
}
