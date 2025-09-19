'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Star, Music, Headphones, Users, X, Share2 } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import NewsDetailRenderer from '@/components/news';

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

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

  // Listen for custom event to open release news
  useEffect(() => {
    const handleOpenReleaseNews = () => {
      // Find the release concert news item
      const releaseNews = newsItems.find(item => 
        item.title.includes('Release-Konzert') && item.title.includes('Maria')
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
    if (confirm('News teilen? Öffnet in einem neuen Tab.')) {
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
      alert('✅ Link wurde in die Zwischenablage kopiert! Du kannst ihn jetzt in sozialen Medien teilen.');
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('✅ Link wurde in die Zwischenablage kopiert! Du kannst ihn jetzt in sozialen Medien teilen.');
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
    <section id="news" className="relative py-20 px-4 bg-gradient-to-b from-slate-900/30 to-purple-900/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Aktuelle News
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bleibe immer auf dem neuesten Stand - Exklusive Updates, neue Releases und 
            spannende Entwicklungen aus dem D.FAITH Universum.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {newsItems.filter(item => item.featured).map((item) => {
            const Icon = iconFor[item.category as keyof typeof iconFor] || Star;
            return (
            <div
              key={item.id}
              className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl group hover:scale-[1.02] transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <Icon size={16} />
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={16} />
                      {new Date(item.date).toLocaleDateString('de-DE')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock size={16} />
                      {item.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedArticle(item)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-2 w-fit"
                  >
                    Mehr lesen
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          );})}
        </motion.div>

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {newsItems.filter(item => !item.featured).map((item, index) => {
            const Icon = iconFor[item.category as keyof typeof iconFor] || Star;
            return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900/60 to-purple-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <Icon size={14} />
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(item.date).toLocaleDateString('de-DE')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {item.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArticle(item)}
                  className="text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  Weiterlesen
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.article>
          );})}
        </motion.div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900/50 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20 shadow-2xl"
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
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    {iconFor[selectedArticle.category as keyof typeof iconFor] && 
                      React.createElement(iconFor[selectedArticle.category as keyof typeof iconFor] || Star, { size: 14 })}
                    {selectedArticle.category}
                  </span>
                  {selectedArticle.featured && (
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(selectedArticle.date).toLocaleDateString('de-DE')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {selectedArticle.readTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Modulares News-Detail-System */}
              <NewsDetailRenderer article={selectedArticle} />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => shareNews(selectedArticle)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                >
                  Teilen
                  <Share2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArticle(null)}
                  className="border border-gray-600 text-gray-300 hover:text-white px-6 py-3 rounded-full font-semibold"
                >
                  Schließen
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