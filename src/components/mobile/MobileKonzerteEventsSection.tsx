'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, PartyPopper, Music, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const translations = {
  de: {
    title: 'Live buchen',
    subtitle: 'Slavischer Pop-Rock mit Akustik-Gitarre – für dein Event.',
    card1Title: 'Clubs & Bars',
    card1Desc: 'Intime Live-Abende mit Stimmung.',
    card2Title: 'Festivals & Open Air',
    card2Desc: 'Energie und Leidenschaft auf der Bühne.',
    card3Title: 'Private Events',
    card3Desc: 'Hochzeiten, Feiern, Gartenpartys.',
    cta: 'Booking-Seite öffnen',
    tagline: 'Solo Akustik · DE / PL / EN · 28 Songs',
  },
  en: {
    title: 'Book Live',
    subtitle: 'Slavic Pop-Rock with acoustic guitar – for your event.',
    card1Title: 'Clubs & Bars',
    card1Desc: 'Intimate live evenings with atmosphere.',
    card2Title: 'Festivals & Open Air',
    card2Desc: 'Energy and passion on stage.',
    card3Title: 'Private Events',
    card3Desc: 'Weddings, parties, living room concerts.',
    cta: 'Open Booking Page',
    tagline: 'Solo Acoustic · DE / PL / EN · 28 Songs',
  },
  pl: {
    title: 'Zarezerwuj na żywo',
    subtitle: 'Słowiański Pop-Rock z gitarą akustyczną – na Twoje wydarzenie.',
    card1Title: 'Kluby i bary',
    card1Desc: 'Kameralne wieczory live z klimatem.',
    card2Title: 'Festiwale & Open Air',
    card2Desc: 'Energia i pasja na scenie.',
    card3Title: 'Wydarzenia prywatne',
    card3Desc: 'Śluby, imprezy, koncerty domowe.',
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

  const cards = [
    { icon: Mic, title: t.card1Title, desc: t.card1Desc, gradient: 'from-amber-500/20 to-amber-500/20', border: 'border-amber-500/20', iconColor: 'text-amber-400' },
    { icon: PartyPopper, title: t.card2Title, desc: t.card2Desc, gradient: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/20', iconColor: 'text-amber-400' },
    { icon: Music, title: t.card3Title, desc: t.card3Desc, gradient: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/20', iconColor: 'text-yellow-400' },
  ];

  return (
    <section id="konzerte" className="scroll-mt-14 py-12 px-4 bg-gradient-to-b from-stone-900/20 to-amber-900/10">
      <div className="max-w-lg mx-auto">
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

        {/* Cards */}
        <div className="flex flex-col gap-4 mb-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-6 backdrop-blur-md`}
            >
              <div className="flex items-start gap-4">
                <card.icon size={24} className={`${card.iconColor} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300 shadow-lg"
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