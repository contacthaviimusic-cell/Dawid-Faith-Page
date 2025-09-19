'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Star, Music, Headphones, Users, X } from 'lucide-react';
import type { NewsItem } from '@/types/news';

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
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>
                
                {/* Extended Content based on category */}
                {selectedArticle.category === 'Musik Release' && selectedArticle.title.includes('D.FAITH Token Launch') && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">D.FAITH App Features</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Die D.FAITH App revolutioniert das Fan-Engagement durch Blockchain-Technologie. Fans können jetzt durch 
                      ihre natürlichen Social Media Aktivitäten D.FAITH Token verdienen und diese gegen exklusive Rewards eintauschen.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 p-4 rounded-xl">
                        <h4 className="text-purple-300 font-semibold mb-2">App-Features</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Instagram/TikTok Integration</li>
                          <li>• Automatische EXP-Sammlung</li>
                          <li>• Live Leaderboard-System</li>
                          <li>• Cross-Platform Tracking</li>
                        </ul>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-xl">
                        <h4 className="text-purple-300 font-semibold mb-2">Token-Rewards</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Like: 10 EXP → D.FAITH</li>
                          <li>• Kommentar: 10 EXP → D.FAITH</li>
                          <li>• Share: 10 EXP → D.FAITH</li>
                          <li>• Live-Konzert: 150 EXP → D.FAITH</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">D.FAITH Exklusiv Shop</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Nutze deine verdienten D.FAITH Token im exklusiven Shop für neue Songs, limitierte Merchandise, 
                        signierte Editionen und Konzert-Tickets - alles 20-50% günstiger als normale Preise!
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Live auf Base Chain</span>
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Fan-Rewards</span>
                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Exklusiv Shop</span>
                      </div>
                    </div>
                  </div>
                )}
                {selectedArticle.category === 'Musik Release' && selectedArticle.title.includes('Maria') && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Über den Release</h3>
                    <p className="text-gray-300 leading-relaxed">
                      &quot;Maria&quot; und &quot;Znikła&quot; markieren den Beginn von Dawid Faith&apos;s musikalischer Reise. 
                      Die beiden Tracks wurden mit viel Leidenschaft und emotionaler Tiefe komponiert und zeigen 
                      verschiedene Facetten seiner künstlerischen Vision.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Als seine ersten beiden Singles setzen diese Songs den Grundstein für das was noch kommen wird. 
                      Erlebe sie zuerst live beim Release-Konzert bei Katys Garage in Dresden Neustadt.
                    </p>
                    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">Premiere Songs</h4>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Maria</span>
                        <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">Znikła</span>
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Live Premiere</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedArticle.category === 'Blockchain' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">D.INVEST Token Details</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Der D.INVEST Token ist der Investment-Token des D.FAITH Ökosystems. Mit einem festen Preis von 5€ pro Token 
                      und einer Total Supply von nur 10.000 Token bietet er eine einzigartige Möglichkeit, am Erfolg von Dawid Faith teilzuhaben.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 p-4 rounded-xl">
                        <h4 className="text-purple-300 font-semibold mb-2">Token-Details</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Preis: 5,00€ pro Token (fest)</li>
                          <li>• Total Supply: 10.000 Token</li>
                          <li>• Gesamtkapital: 50.000€</li>
                          <li>• Live auf Base Chain</li>
                        </ul>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-xl">
                        <h4 className="text-purple-300 font-semibold mb-2">Staking-Rewards</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• 0,1 D.FAITH pro Woche (Initial)</li>
                          <li>• 6-Stufen Halving-System</li>
                          <li>• Bis zu 104% ROI möglich</li>
                          <li>• Automatische Smart Contract Ausschüttung</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">Investment-Möglichkeit</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Durch das Staking von D.INVEST Token erhältst du wöchentliche D.FAITH Rewards. Das 6-Stufen Halving-System 
                        sorgt für kontinuierliche Verknappung und potenzielle Wertsteigerung.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Fixed Price: 5€</span>
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Weekly Rewards</span>
                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">High ROI Potential</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedArticle.category === 'Events' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Event-Details</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Das Release-Konzert wird ein einmaliges Erlebnis mit den ersten beiden Songs von Dawid Faith. 
                      Erlebe &apos;Maria&apos; und &apos;Znikła&apos; live in einer intimen Atmosphäre bei Katys Garage in Dresden Neustadt.
                    </p>
                    <div className="bg-blue-900/30 p-6 rounded-2xl border border-blue-500/20">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4">Konzert-Info</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                          <p className="font-medium">Datum & Zeit</p>
                          <p className="text-sm">15. November 2025, 19:00 Uhr</p>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm">Katys Garage in Dresden Neustadt</p>
                        </div>
                        <div>
                          <p className="font-medium">Songs</p>
                          <p className="text-sm">Maria & Znikła (Premiere)</p>
                        </div>
                        <div>
                          <p className="font-medium">Besonderheit</p>
                          <p className="text-sm">Dawid Faith&apos;s erste Songs live</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-500/20">
                        <p className="text-gray-300 text-sm">
                          Am 15. November um 19:00 Uhr bei Katys Garage in Dresden Neustadt erwartet dich ein unvergesslicher Abend voller Musik, Emotionen und Überraschungen. Feiere mit uns den Beginn von Dawid Faith&apos;s musikalischer Reise! Erlebe &apos;Maria&apos; und &apos;Znikła&apos; zum ersten Mal live in einer intimen Atmosphäre.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                >
                  Teilen
                  <ArrowRight size={16} />
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