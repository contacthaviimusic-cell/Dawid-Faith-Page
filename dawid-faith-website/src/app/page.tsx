'use client';

import { motion } from 'framer-motion';
import { Music, Play, Sparkles, TrendingUp, Users, ArrowRight, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              >
                Dawid Faith
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed"
              >
                Musiker & Blockchain-Innovator
                <br />
                <span className="text-purple-400">Revolutioniere die Creator Economy</span>
              </motion.p>

              {/* Upcoming Single */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 rounded-2xl border border-purple-500/30 mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Music className="text-purple-400" size={24} />
                  <span className="text-purple-400 font-semibold">Kommende Single</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Maria / Znikła</h3>
                <p className="text-gray-300">Zweisprachige Veröffentlichung - Deutsch & Polnisch</p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#musik" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group">
                  <Play size={20} />
                  Musik entdecken
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a href="#dfaith" className="border border-purple-500 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group">
                  <Sparkles size={20} />
                  D.FAITH Projekt
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Artist Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="/dawid-faith.jpg"
                  alt="Dawid Faith"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-black/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/30"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-purple-400" />
                  <span>774+ Follower</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Music Section */}
        <section id="musik" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Meine Musik
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Authentische Songs mit Herz, die von echten Erfahrungen erzählen
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Upcoming Release */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-3xl border border-purple-500/30 text-center"
              >
                <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Music className="text-purple-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Maria / Znikła</h3>
                <p className="text-gray-300 mb-6">
                  Meine erste offizielle Single in zwei Sprachen - eine emotionale Reise über Verlust und Hoffnung.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>🇩🇪 Deutsche Version: Maria</p>
                  <p>🇵🇱 Polnische Version: Znikła</p>
                  <p className="text-purple-400 font-semibold">Coming Soon</p>
                </div>
              </motion.div>

              {/* Musical Journey */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600/20 to-green-600/20 p-8 rounded-3xl border border-blue-500/30 text-center"
              >
                <div className="w-20 h-20 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-blue-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Meine Reise</h3>
                <p className="text-gray-300 mb-6">
                  Als unabhängiger Künstler kenne ich die Herausforderungen der Musikindustrie - deshalb erschaffe ich neue Wege.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>🎵 Authentische Texte</p>
                  <p>🌍 Internationale Reichweite</p>
                  <p>🚀 Innovation durch Blockchain</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* D.FAITH Project Section */}
        <section id="dfaith" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                D.FAITH Ökosystem
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Revolutionäres Fan-Engagement durch Blockchain-Technologie
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Fan Rewards */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="text-purple-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Fan Belohnungen</h3>
                <p className="text-gray-300 mb-4">
                  Verdiene D.FAITH Token durch Social Media Engagement
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 10 EXP pro Like/Kommentar/Share</li>
                  <li>• 20 EXP pro Story</li>
                  <li>• 150 EXP bei Live-Konzerten</li>
                </ul>
              </motion.div>

              {/* Investment */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-8 rounded-3xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">D.INVEST Token</h3>
                <p className="text-gray-300 mb-4">
                  Investiere in die Zukunft der Creator Economy
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 5€ pro Token (fest)</li>
                  <li>• 0,1 D.FAITH/Woche Staking</li>
                  <li>• Bis zu 104% ROI möglich</li>
                </ul>
              </motion.div>

              {/* Technology */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-600/10 to-purple-600/10 p-8 rounded-3xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="text-green-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Live auf Base Chain</h3>
                <p className="text-gray-300 mb-4">
                  Vollständig implementiert und operational
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Smart Contracts deployed</li>
                  <li>• Webapp vollständig funktional</li>
                  <li>• Real-time Tracking</li>
                </ul>
              </motion.div>
            </div>

            {/* D.FAITH Token Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <Image
                  src="/dfaith-token.png"
                  alt="D.FAITH Token"
                  fill
                  className="object-contain"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                D.FAITH Webapp besuchen
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Contact & Social Media */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Folge der Reise</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Bleib auf dem Laufenden über neue Musik, das D.FAITH Projekt und verdiene Token durch dein Engagement
              </p>
              
              <div className="flex justify-center gap-6">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-2xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                >
                  <Instagram size={32} />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  <Facebook size={32} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
