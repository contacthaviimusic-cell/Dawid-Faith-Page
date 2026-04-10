import React from 'react';
import type { NewsItem } from '@/types/news';
import NewsTranslations from '@/lib/translations/NewsSectionTrans';

// Individual News Components
import BandgesuchtNews from './BandgesuchtNews';
import DInvestTokenNews from './DInvestTokenNews';
import DFaithAppNews from './DFaithAppNews';
import ZniklaReleaseNews from './ZniklaReleaseNews';

interface NewsDetailProps {
  article: NewsItem;
}

/**
 * NewsDetailRenderer - Zentrale Komponente für News-Details
 * 
 * Diese Komponente rendert die entsprechende Detail-Komponente basierend auf der News-ID.
 * Für neue News einfach eine neue Komponente erstellen und hier hinzufügen.
 */
const NewsDetailRenderer: React.FC<NewsDetailProps> = ({ article }) => {
  const lang = (typeof document !== 'undefined' && document.documentElement.lang) ? (document.documentElement.lang as 'de'|'en'|'pl') : 'de';
  
  // Funktion für lokalisierte Felder
  const getLocalizedField = (field: 'title' | 'excerpt' | 'content') => {
    if (lang === 'de') return (article[field] ?? '');
    const key = `${field}_${lang}` as keyof NewsItem;
    const val = article[key];
    return typeof val === 'string' && val.length > 0 ? val : (article[field] ?? '');
  };
  
  // Map News-IDs zu ihren entsprechenden Detail-Komponenten
  const newsComponents: Record<string, React.ComponentType> = {
    // '1758217302493-gbictm': BandgesuchtNews,       // Bandmitglieder gesucht - AUSGEBLENDET
    '1758217302493-waterfall': ZniklaReleaseNews,  // Waterfall Release - FEATURED
    '1758217302493-p9jwga': DInvestTokenNews,      // D.INVEST Token Launch
    '1758217302493-kix4d8': DFaithAppNews,         // D.FAITH App Launch
  };

  // Hole die entsprechende Komponente für diese News
  const NewsComponent = newsComponents[article.id];

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      {/* Spezifische News-Komponente */}
      {NewsComponent ? (
        <NewsComponent />
      ) : (
        // Fallback für unbekannte News-IDs
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">{NewsTranslations[lang].defaultNewsTitle}</h3>
          <p className="text-gray-300 leading-relaxed">
            {NewsTranslations[lang].defaultNewsFallback}
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsDetailRenderer;

// Exporte für direkten Zugriff auf einzelne Komponenten
export {
  BandgesuchtNews,
  DInvestTokenNews,
  DFaithAppNews,
  ZniklaReleaseNews,
};