'use client';

import React, { useEffect, useMemo, useState } from 'react';
import NewsTranslations from '@/lib/translations/NewsSectionTrans';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Star, Music, Headphones, Users, X, Share2 } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import NewsDetailRenderer from '@/components/news';

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [lang, setLang] = useState<'de'|'en'|'pl'>('de');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (!res.ok) throw new Error('Fehler beim Laden');
        const data = (await res.json()) as NewsItem[];
        if (mounted) {
          setNewsItems(data);
        }
      } catch (e: unknown) {
        console.error('Fehler beim Laden der News:', e instanceof Error ? e.message : 'Unbekannter Fehler');
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
  } catch {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const isClockTime = (t: string) => /\d{1,2}:\d{2}/.test(t);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang') as 'de'|'en'|'pl'|null;
      if (stored === 'de' || stored === 'en' || stored === 'pl') setLang(stored);
      else if (typeof document !== 'undefined' && document.documentElement.lang) {
        const dl = document.documentElement.lang as 'de'|'en'|'pl';
        if (dl === 'de' || dl === 'en' || dl === 'pl') setLang(dl);
      }
  } catch {}

    function onLang(e: Event) {
      const ce = e as CustomEvent<{ lang: 'de'|'en'|'pl' }>;
      if (ce?.detail?.lang) setLang(ce.detail.lang);
    }

    window.addEventListener('site-lang-changed', onLang as EventListener);
    return () => window.removeEventListener('site-lang-changed', onLang as EventListener);
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
    return d.toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const formatTime = (dateString: string, timeString: string) => {
    if (!timeString) return '';
    if (!isClockTime(timeString)) return timeString;
    const iso = `${dateString}T${timeString}`;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return timeString;
    const locale = lang === 'de' ? 'de-DE' : lang === 'pl' ? 'pl-PL' : 'en-GB';
    const formatted = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(d);
    return lang === 'de' ? `${formatted} Uhr` : formatted;
  };

  // Helper to safely get localized fields from NewsItem without using `any`
  const getLocalizedField = (item: NewsItem | null | undefined, field: 'title' | 'excerpt' | 'content', langParam: 'de'|'en'|'pl') => {
    if (!item) return '';
    if (langParam === 'de') return (item[field] ?? '');
    const key = `${field}_${langParam}` as keyof NewsItem;
    const val = item[key];
    return typeof val === 'string' && val.length > 0 ? val : (item[field] ?? '');
  };

  // Listen for custom event to open release news
  useEffect(() => {
    const handleOpenReleaseNews = () => {
      // Find the waterfall release news item
      const releaseNews = newsItems.find(item => 
        item.id === '1758217302493-waterfall'
      );
      if (releaseNews) {
        setSelectedArticle(releaseNews);
      }
    };

    window.addEventListener('openReleaseNews', handleOpenReleaseNews);
    return () => {
      window.removeEventListener('openReleaseNews', handleOpenReleaseNews);
    };
  }, [newsItems]);

  // Share functionality
  const shareNews = async (article: NewsItem) => {
    const shareData = {
      title: `🎵 ${article.title}`,
      text: article.excerpt,
      url: `${window.location.origin}#news`,
    };

    // Check if Web Share API is supported (mainly mobile devices)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        console.log('Error sharing:', error);
        // Continue to fallback options
      }
    }

    // Desktop/Fallback: Show sharing options
    showShareOptions(article);
  };

  const showShareOptions = (article: NewsItem) => {
    const shareText = encodeURIComponent(`🎵 ${article.title}\n\n${article.excerpt}\n\nMehr erfahren:`);
    const shareUrl = encodeURIComponent(`${window.location.origin}#news`);
    
    // Social media sharing URLs
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
      whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    };

    // For now, use the most common sharing method
    if (confirm(NewsTranslations[lang].shareConfirm)) {
      // Open WhatsApp share (most used on mobile)
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.open(shareUrls.whatsapp, '_blank');
      } else {
        // Desktop: Copy to clipboard and offer Twitter
        const fullText = `🎵 ${article.title}\n\n${article.excerpt}\n\nMehr erfahren: ${window.location.origin}#news`;
        copyToClipboard(fullText);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(NewsTranslations[lang].clipboardCopied);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(NewsTranslations[lang].clipboardCopied);
    });
  };

  const iconFor = useMemo(() => ({
    'Musik Release': Music,
    Musik: Music,
    Blockchain: Star,
    Events: Headphones,
    Community: Users,
  }), []);

  return (
    <section id="news" className="scroll-mt-16 relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      {/* Ambient glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-[128px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header – editorial, left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 block">
            {NewsTranslations[lang].sectionTitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-2xl">
            {NewsTranslations[lang].sectionDesc}
          </h2>
        </motion.div>

        {/* Featured Article – cover story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          {newsItems.filter(item => item.featured).map((item) => {
            const Icon = iconFor[item.category as keyof typeof iconFor] || Star;
            const displayTitle = getLocalizedField(item, 'title', lang);
            const displayExcerpt = getLocalizedField(item, 'excerpt', lang);
            return (
            <div
              key={item.id}
              className="relative h-[26rem] md:h-[30rem] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-500/40 transition-colors duration-500"
              onClick={() => setSelectedArticle(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>

              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {NewsTranslations[lang].featuredTag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <span className="text-amber-400 font-semibold flex items-center gap-2">
                    <Icon size={15} />
                    {item.category}
                  </span>
                  <span className="flex items-center gap-2 text-stone-400">
                    <Calendar size={14} />
                    {formatDate(item.date)}
                  </span>
                  <span className="flex items-center gap-2 text-stone-400">
                    <Clock size={14} />
                    {isClockTime(item.readTime) ? formatTime(item.date, item.readTime) : item.readTime}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-4 max-w-3xl leading-tight group-hover:text-amber-300 transition-colors">
                  {displayTitle}
                </h3>

                <p className="text-stone-300 leading-relaxed mb-6 max-w-2xl hidden sm:block">
                  {displayExcerpt}
                </p>

                <span className="inline-flex items-center gap-2 bg-amber-500 group-hover:bg-amber-400 text-black px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors">
                  {NewsTranslations[lang].readMore}
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          );})}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.filter(item => !item.featured).slice(0, 2).map((item, index) => {
            const Icon = iconFor[item.category as keyof typeof iconFor] || Star;
            const displayTitle = getLocalizedField(item, 'title', lang);
            const displayExcerpt = getLocalizedField(item, 'excerpt', lang);
            return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelectedArticle(item)}
              className="group cursor-pointer bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Icon size={13} />
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-stone-500 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDate(item.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {isClockTime(item.readTime) ? formatTime(item.date, item.readTime) : item.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {displayTitle}
                </h3>

                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                  {displayExcerpt}
                </p>

                <span className="text-amber-400 group-hover:text-amber-300 font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors">
                  {NewsTranslations[lang].readMore}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          );})}
        </div>

        {/* "See All News" Button - zeige nur wenn mehr als 2 News existieren */}
        {newsItems.filter(item => !item.featured).length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <motion.a
              href="#all-news"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/25 hover:border-amber-400/50 hover:bg-white/5 text-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              {lang === 'de' ? 'Alle News anzeigen' : lang === 'en' ? 'View All News' : 'Pokaż wszystkie wiadomości'}
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#12100d] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-64 md:h-80">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-t-3xl"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Article Meta */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    {iconFor[selectedArticle.category as keyof typeof iconFor] && 
                      React.createElement(iconFor[selectedArticle.category as keyof typeof iconFor] || Star, { size: 14 })}
                    {selectedArticle.category}
                  </span>
                  {selectedArticle.featured && (
                    <span className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {NewsTranslations[lang].featuredTag}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {getLocalizedField(selectedArticle, 'title', lang)}
                </h2>
                <div className="flex items-center gap-4 text-stone-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(selectedArticle.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {isClockTime(selectedArticle.readTime) ? formatTime(selectedArticle.date, selectedArticle.readTime) : selectedArticle.readTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Modulares News-Detail-System */}
                    {/* Show localized excerpt above the specific renderer */}
                    <p className="text-xl text-stone-300 leading-relaxed mb-6">
                      {getLocalizedField(selectedArticle, 'excerpt', lang)}
                    </p>
                    <NewsDetailRenderer article={selectedArticle} />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-stone-700">
                {/* Button-Logik je nach News-Typ */}
                {selectedArticle?.category === 'Blockchain' ? (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://app.dawidfaith.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <span>{NewsTranslations[lang].toWebapp}</span>
                    <ArrowRight size={16} />
                  </motion.a>
                ) : selectedArticle?.title?.includes('Bandmitglieder gesucht') || selectedArticle?.title?.includes('Band Members Wanted') || selectedArticle?.title?.includes('Poszukiwani członkowie') ? (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:dawid.faith@gmail.com?subject=Interesse an Bandmitgliedschaft&body=Hallo Dawid,%0A%0AIch habe Interesse an einer Bandmitgliedschaft und spiele..."
                    className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <span>{NewsTranslations[lang].contactEmail || 'E-Mail senden'}</span>
                    <ArrowRight size={16} />
                  </motion.a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareNews(selectedArticle)}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    {NewsTranslations[lang].share}
                    <Share2 size={16} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArticle(null)}
                  className="border border-white/20 hover:border-amber-400/50 hover:bg-white/5 text-stone-300 hover:text-white px-7 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all"
                >
                  {NewsTranslations[lang].close}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;