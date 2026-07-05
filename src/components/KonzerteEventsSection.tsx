"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const translations = {
  de: {
    title: 'Live buchen',
    subtitle: 'Authentischer Slavischer Pop-Rock mit Akustik-Gitarre – für dein Event.',
    cta: 'Booking-Seite öffnen',
    tagline: 'Solo Akustik-Gitarre · Deutsch · Polnisch · Englisch · 28 Songs Repertoire',
  },
  en: {
    title: 'Book Live',
    subtitle: 'Authentic Slavic Pop-Rock with acoustic guitar – for your event.',
    cta: 'Open Booking Page',
    tagline: 'Solo Acoustic Guitar · German · Polish · English · 28 Songs Repertoire',
  },
  pl: {
    title: 'Zarezerwuj na żywo',
    subtitle: 'Autentyczny Słowiański Pop-Rock z gitarą akustyczną – na Twoje wydarzenie.',
    cta: 'Otwórz stronę bookingu',
    tagline: 'Gitara akustyczna solo · Niemiecki · Polski · Angielski · 28 utworów w repertuarze',
  },
};

export default function KonzerteEventsSection() {
  const [lang, setLang] = useState<'de' | 'en' | 'pl'>('de');
  const t = translations[lang];

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
    <section id="konzerte" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[24rem] md:h-[28rem] rounded-2xl overflow-hidden group"
          >
            <Image
              src="/booking/pressefotos/Dawid und Gruppe.jpg"
              alt="Dawid Faith live"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              {t.title}
            </h2>
            <p className="text-stone-400 leading-relaxed mb-8">
              {t.subtitle}
            </p>

            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              {t.cta}
              <ArrowRight size={18} />
            </Link>
            <p className="text-stone-500 text-sm mt-6">{t.tagline}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
