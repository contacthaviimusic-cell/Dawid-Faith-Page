'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Star, Music, Headphones, Users } from 'lucide-react';

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Neue Single 'Digital Dreams' ab sofort verfügbar",
      excerpt: "Dawid Faith's neuester Track kombiniert futuristische Beats mit emotionalen Vocals und nimmt dich mit auf eine Reise durch die digitale Zukunft.",
      date: "2024-12-15",
      readTime: "3 min",
      category: "Musik Release",
      image: "/dawid-faith-bg.jpg",
      featured: true,
      icon: Music
    },
    {
      id: 2,
      title: "D.INVEST Token Launch - Frühe Investoren gesucht",
      excerpt: "Werde Teil der Revolution! Die ersten 1000 Token-Inhaber erhalten exklusive Vorteile und lebenslangen VIP-Zugang zu allen Events.",
      date: "2024-12-10",
      readTime: "5 min",
      category: "Blockchain",
      image: "/dinvest-token.png",
      featured: false,
      icon: Star
    },
    {
      id: 3,
      title: "Exklusives Live-Konzert in Berlin angekündigt",
      excerpt: "Das erste Live-Konzert im neuen Jahr wird ein unvergessliches Erlebnis mit 360°-Sound, holographischen Visuals und Überraschungsgästen.",
      date: "2024-12-08",
      readTime: "4 min",
      category: "Events",
      image: "/dawid-faith.jpg",
      featured: false,
      icon: Headphones
    }
  ];

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
          {newsItems.filter(item => item.featured).map((item) => (
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
                      <item.icon size={16} />
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-2 w-fit"
                  >
                    Mehr lesen
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {newsItems.filter(item => !item.featured).map((item, index) => (
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
                    <item.icon size={14} />
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
                  className="text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  Weiterlesen
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;