import React from 'react';

export function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" width="18" height="12" className={className} aria-hidden>
      <rect width="3" height="2" fill="#000" />
      <rect y="0.66" width="3" height="0.66" fill="#DD0000" />
      <rect y="1.33" width="3" height="0.67" fill="#FFCE00" />
    </svg>
  );
}

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" width="18" height="12" className={className} aria-hidden>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 L30 30 M0 15 L60 15" stroke="#fff" strokeWidth="10" />
      <path d="M30 0 L30 30 M0 15 L60 15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagPL({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 4 3" width="18" height="12" className={className} aria-hidden>
      <rect width="4" height="3" fill="#fff" />
      <rect y="1.5" width="4" height="1.5" fill="#DC143C" />
    </svg>
  );
}

export default function FlagForLang({ lang, className }: { lang: 'de' | 'en' | 'pl'; className?: string }) {
  if (lang === 'de') return <FlagDE className={className} />;
  if (lang === 'en') return <FlagGB className={className} />;
  return <FlagPL className={className} />;
}
