"use client";

import { motion } from 'framer-motion';
import { Mic, PartyPopper, Music, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const translations = {
  de: {
    title: 'Live buchen',
    subtitle: 'Authentischer Slavischer Pop-Rock mit Akustik-Gitarre – für dein Event.',
    card1Title: 'Clubs & Bars',
    card1Desc: 'Intime Live-Abende mit Stimmung – von der Kneipe bis zum Kulturhaus.',
    card2Title: 'Festivals & Open Air',
    card2Desc: 'Energie und Leidenschaft auf der großen Bühne – Solo oder mit Band-Sound.',
    card3Title: 'Private Events',
    card3Desc: 'Hochzeiten, Firmenfeiern, Gartenpartys – maßgeschneidert für euch.',
    cta: 'Booking-Seite öffnen',
    tagline: 'Solo Akustik-Gitarre · Deutsch · Polnisch · Englisch · 28 Songs Repertoire',
  },
  en: {
    title: 'Book Live',
    subtitle: 'Authentic Slavic Pop-Rock with acoustic guitar – for your event.',
    card1Title: 'Clubs & Bars',
    card1Desc: 'Intimate live evenings with atmosphere – from pubs to cultural venues.',
    card2Title: 'Festivals & Open Air',
    card2Desc: 'Energy and passion on the big stage – solo or with band sound.',
    card3Title: 'Private Events',
    card3Desc: 'Weddings, corporate events, living room concerts – tailored for you.',
    cta: 'Open Booking Page',
    tagline: 'Solo Acoustic Guitar · German · Polish · English · 28 Songs Repertoire',
  },
  pl: {
    title: 'Zarezerwuj na żywo',
    subtitle: 'Autentyczny Słowiański Pop-Rock z gitarą akustyczną – na Twoje wydarzenie.',
    card1Title: 'Kluby i bary',
    card1Desc: 'Kameralne wieczory live z klimatem – od pubów po domy kultury.',
    card2Title: 'Festiwale & Open Air',
    card2Desc: 'Energia i pasja na dużej scenie – solo lub z brzmieniem zespołu.',
    card3Title: 'Wydarzenia prywatne',
    card3Desc: 'Śluby, imprezy firmowe, koncerty domowe – dostosowane do Was.',
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

  const cards = [
    { icon: Mic, title: t.card1Title, desc: t.card1Desc },
    { icon: PartyPopper, title: t.card2Title, desc: t.card2Desc },
    { icon: Music, title: t.card3Title, desc: t.card3Desc },
  ];

  return (
    <section id="konzerte" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 block">
            {t.title}
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
            {t.subtitle}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05] rounded-2xl p-8 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <card.icon size={22} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-stone-400 leading-relaxed text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
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
    </section>
  );
}
