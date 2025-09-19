import React from 'react';
import type { NewsItem } from '@/types/news';

// Individual News Components
import ReleaseKonzertNews from './ReleaseKonzertNews';
import DInvestTokenNews from './DInvestTokenNews';
import DFaithAppNews from './DFaithAppNews';

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
  // Map News-IDs zu ihren entsprechenden Detail-Komponenten
  const newsComponents: Record<string, React.ComponentType> = {
    '1758217302493-gbictm': ReleaseKonzertNews,    // Release-Konzert Maria & Znikła
    '1758217302493-p9jwga': DInvestTokenNews,      // D.INVEST Token Launch
    '1758217302493-kix4d8': DFaithAppNews,         // D.FAITH App Launch
  };

  // Hole die entsprechende Komponente für diese News
  const NewsComponent = newsComponents[article.id];

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      {/* Standard Excerpt für alle News */}
      <p className="text-xl text-gray-300 leading-relaxed mb-6">
        {article.excerpt}
      </p>
      
      {/* Spezifische News-Komponente */}
      {NewsComponent ? (
        <NewsComponent />
      ) : (
        // Fallback für unbekannte News-IDs
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">News Details</h3>
          <p className="text-gray-300 leading-relaxed">
            Weitere Details zu dieser News werden in Kürze verfügbar sein.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsDetailRenderer;

// Exporte für direkten Zugriff auf einzelne Komponenten
export {
  ReleaseKonzertNews,
  DInvestTokenNews,
  DFaithAppNews,
};