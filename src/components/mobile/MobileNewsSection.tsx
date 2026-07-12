'use client';

import { useState, useEffect } from 'react';
import NewsTranslations from '@/lib/translations/NewsSectionTrans';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Clock, Tag, X, ExternalLink, Share, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { NewsItem } from '@/types/news';
import NewsDetailRenderer from '@/components/news';

export default function MobileNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    fetchNews();
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
    } catch (e) {}
    
    // Listen for news triggers
    const handleOpenReleaseNews = () => {
      const releaseNews = news.find(item => 
        item.title.toLowerCase().includes('release') || 
        item.title.toLowerCase().includes('konzert')
      );
      if (releaseNews) {
        setSelectedNews(releaseNews);
      }
    };

    window.addEventListener('openReleaseNews', handleOpenReleaseNews);

    return () => {
      window.removeEventListener('openReleaseNews', handleOpenReleaseNews);
    };
  }, [news]);

  useEffect(() => {
    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }
    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedField = (item: NewsItem | null | undefined, field: 'title' | 'excerpt' | 'content', langParam: 'de'|'en'|'pl') => {
    if (!item) return '';
    if (langParam === 'de') return (item[field] ?? '');
    const key = `${field}_${langParam}` as keyof NewsItem;
    const val = item[key];
    return typeof val === 'string' && val.length > 0 ? val : (item[field] ?? '');
  };

  const handleShare = async (newsItem: NewsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsItem.title,
          text: newsItem.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
  // Fallback: copy to clipboard
  navigator.clipboard.writeText(`${newsItem.title} - ${window.location.href}`);
  alert(NewsTranslations[lang].clipboardCopied);
    }
  };

  return (
    <section id="news" className="py-8 px-4 bg-gradient-to-b from-black via-amber-900/10 to-black">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <Newspaper className="text-amber-400" size={28} />
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              {NewsTranslations[lang].sectionTitle}
            </h2>
          </div>
        </motion.div>

        {/* News Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-stone-400">{NewsTranslations[lang].loading ?? 'Lade News...'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.sort((a, b) => {
              // Featured news first
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            }).slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNews(item)}
                className={`backdrop-blur-md rounded-2xl border overflow-hidden cursor-pointer ${
                  item.featured 
                  ? 'bg-gradient-to-r from-amber-900/80 to-yellow-900/80 border-amber-400/50 shadow-lg shadow-amber-500/20' 
                  : 'bg-gradient-to-r from-stone-900/50 to-amber-900/20 border-amber-500/20'
                }`}
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {item.featured && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent">
                        <div className="absolute top-1 right-1 px-2 py-1 bg-yellow-400/90 rounded-full text-[10px] font-medium text-black flex items-center gap-1">
                          <Star size={10} />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm mb-1 line-clamp-2 ${
                      item.featured ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200' : 'text-white'
                    }`}>
                      {getLocalizedField(item, 'title', lang)}
                    </h3>
                    <p className="text-stone-400 text-xs mb-2 line-clamp-2">
                      {getLocalizedField(item, 'excerpt', lang)}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className={item.featured ? 'text-amber-300' : ''} />
                        <span className={item.featured ? 'text-amber-300' : ''}>{item.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag size={12} className={item.featured ? 'text-amber-300' : ''} />
                        <span className={item.featured ? 'text-amber-300' : ''}>{item.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* "See All News" Button - zeige nur wenn mehr als 3 News existieren */}
        {!loading && news.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 flex justify-center"
          >
            <motion.a
              href="#all-news"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 active:bg-amber-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg text-sm"
            >
              {lang === 'de' ? 'Alle News' : lang === 'en' ? 'All News' : 'Wszystkie wiadomości'}
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        )}

        {/* Featured Release Banner */}

      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-stone-900 to-amber-900/30 rounded-2xl border border-amber-500/30 max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-48">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>
                {selectedNews.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-3">
                    {getLocalizedField(selectedNews, 'title', lang)}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{selectedNews.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag size={14} />
                      <span>{selectedNews.category}</span>
                    </div>
                  </div>

                  {/* Vollständige News-Details mit NewsDetailRenderer */}
                  <div className="text-stone-200 text-sm leading-relaxed [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-3 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2 [&_p]:mb-3 [&_p]:text-sm [&_.grid]:grid-cols-1 [&_.grid]:gap-2 [&_.bg-amber-900\/30]:bg-amber-900/20 [&_.bg-amber-900\/30]:bg-amber-900/20 [&_.bg-green-900\/30]:bg-green-900/20 [&_.p-6]:p-4 [&_.p-4]:p-3 [&_.rounded-2xl]:rounded-xl [&_.text-2xl]:text-lg [&_.text-xl]:text-base [&_.text-lg]:text-base [&_.mb-4]:mb-2 [&_.mb-6]:mb-3">
                    <NewsDetailRenderer article={selectedNews} />
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed am unteren Rand, je nach News-Typ */}
              <div className="border-t border-stone-700/50 p-4 bg-stone-900/80 backdrop-blur-sm">
                <div className="flex gap-3">
                  {selectedNews?.category === 'Blockchain' ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://app.dawidfaith.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink size={18} />
                      {NewsTranslations[lang].toWebapp}
                    </motion.a>
                  ) : selectedNews?.title?.toLowerCase().includes('bandmitglieder') || selectedNews?.title?.toLowerCase().includes('band members') || selectedNews?.title?.toLowerCase().includes('członkowie') ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:dawid.faith@gmail.com?subject=Interesse an Bandmitgliedschaft&body=Hallo Dawid,%0A%0AIch habe Interesse an einer Bandmitgliedschaft und spiele..."
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink size={18} />
                      {NewsTranslations[lang].contactEmail}
                    </motion.a>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(selectedNews)}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share size={18} />
                      {NewsTranslations[lang].share}
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedNews(null)}
                    className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <X size={18} />
                    {NewsTranslations[lang].close}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}