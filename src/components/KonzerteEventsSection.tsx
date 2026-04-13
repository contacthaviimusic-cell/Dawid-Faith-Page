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
    card3Desc: 'Hochzeiten, Firmenfeiern, Wohnzimmerkonzerte – maßgeschneidert für euch.',
    cta: 'Booking-Seite öffnen',
    tagline: 'Solo Akustik-Gitarre · Deutsch · Polnisch · Englisch · 23 Songs Repertoire',
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
    tagline: 'Solo Acoustic Guitar · German · Polish · English · 23 Songs Repertoire',
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
    tagline: 'Gitara akustyczna solo · Niemiecki · Polski · Angielski · 23 utwory w repertuarze',
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
    { icon: Mic, title: t.card1Title, desc: t.card1Desc, gradient: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-500/20', iconColor: 'text-blue-400' },
    { icon: PartyPopper, title: t.card2Title, desc: t.card2Desc, gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20', iconColor: 'text-purple-400' },
    { icon: Music, title: t.card3Title, desc: t.card3Desc, gradient: 'from-pink-500/20 to-amber-500/20', border: 'border-pink-500/20', iconColor: 'text-pink-400' },
  ];

  return (
    <section id="konzerte" className="scroll-mt-16 py-20 px-4 relative bg-gradient-to-b from-slate-900/20 to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-8 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300`}
            >
              <card.icon size={32} className={`${card.iconColor} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            {t.cta}
            <ArrowRight size={20} />
          </Link>
          <p className="text-gray-500 text-sm mt-6">{t.tagline}</p>
        </motion.div>
      </div>
    </section>
  );
}
