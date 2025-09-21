import React from 'react';

export type LangKey = 'de' | 'en' | 'pl';

export const DFaithTranslations: Record<LangKey, {
  title: string;
  subtitle: string;
  tagline: string;
  badgeLabel: string;
  smallValues: string[];
  tabFans: string;
  tabSupporter: string;
  fansList: string[];
  supporterList: string[];
  ctaEarn: string;
  ctaWhitepaper: string;
}> = {
  de: {
    title: 'D.FAITH Ökosystem – kurz erklärt',
    subtitle: 'Likes, Kommentare, Shares – dein Support bringt dir Tokens. Frühere Musik, exklusive Vorteile, einfache Auszahlung.',
    tagline: 'Einfach. Fair. Sofort.',
    badgeLabel: 'Für Fans & Supporter',
    smallValues: ['💬 Interagiere & erhalte Token', '🎧 Früher Zugang zu Songs', '💸 Einfach auszahlen'],
    tabFans: 'Für Fans',
    tabSupporter: 'Für Supporter',
    fansList: [
      'Like, kommentiere, teile – sammle automatisch D.FAITH Token.',
      'Nutze Token für frühen Zugang, VIP-Erlebnisse und Rabatte.',
      'Willst du auszahlen? Einfach und transparent möglich.'
    ],
    supporterList: [
      'Kaufe D.INVEST zum Fixpreis (5€) und unterstütze die Musik direkt.',
      'Erhalte wöchentlich D.FAITH Token als Dankeschön.',
      'Mehr Support = mehr Reichweite = stärkeres Ökosystem.'
    ],
    ctaEarn: 'Jetzt Token verdienen',
    ctaWhitepaper: 'Whitepaper lesen',
  },
  en: {
    title: 'D.FAITH ecosystem — a short explanation',
    subtitle: 'Likes, comments, shares — your support earns you tokens. Early music access, exclusive perks, easy payouts.',
    tagline: 'Simple. Fair. Instant.',
    badgeLabel: 'For Fans & Supporters',
    smallValues: ['💬 Interact & earn tokens', '🎧 Early access to songs', '💸 Easy to cash out'],
    tabFans: 'For Fans',
    tabSupporter: 'For Supporters',
    fansList: [
      'Like, comment, share — automatically collect D.FAITH tokens.',
      'Use tokens for early access, VIP experiences and discounts.',
      'Want to cash out? Simple and transparent.'
    ],
    supporterList: [
      'Buy D.INVEST at a fixed price (5€) and support the music directly.',
      'Receive weekly D.FAITH tokens as a thank you.',
      'More support = more reach = a stronger ecosystem.'
    ],
    ctaEarn: 'Earn tokens now',
    ctaWhitepaper: 'Read the whitepaper',
  },
  pl: {
    title: 'Ekosystem D.FAITH — krótko wyjaśniony',
    subtitle: 'Polubienia, komentarze, udostępnienia — Twój support daje tokeny. Wczesny dostęp do muzyki, ekskluzywne korzyści, łatwe wypłaty.',
    tagline: 'Prosto. Sprawiedliwie. Natychmiast.',
    badgeLabel: 'Dla fanów i wspierających',
    smallValues: ['💬 Angażuj się i zdobywaj tokeny', '🎧 Wczesny dostęp do utworów', '💸 Łatwe wypłacanie'],
    tabFans: 'Dla fanów',
    tabSupporter: 'Dla wspierających',
    fansList: [
      'Polub, skomentuj, udostępnij — automatycznie zbieraj tokeny D.FAITH.',
      'Wykorzystaj tokeny na wczesny dostęp, doświadczenia VIP i zniżki.',
      'Chcesz wypłacić? Prosto i przejrzyście.'
    ],
    supporterList: [
      'Kup D.INVEST po stałej cenie (5€) i wspieraj muzykę bezpośrednio.',
      'Otrzymuj cotygodniowo tokeny D.FAITH w podziękowaniu.',
      'Więcej wsparcia = większy zasięg = silniejsze ekosystem.'
    ],
    ctaEarn: 'Zarabiaj tokeny teraz',
    ctaWhitepaper: 'Przeczytaj whitepaper',
  }
};

export default DFaithTranslations;
