'use client';

import { motion } from 'framer-motion';
import { Coins, TrendingUp, Users, Shield, Zap, Gift } from 'lucide-react';
import Image from 'next/image';

export default function MobileDFaithSection() {
  const features = [
    {
      icon: Coins,
      title: 'D.FAITH Token',
      description: 'Exklusiver Zugang zu Konzerten und Inhalten',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Werde Teil einer globalen Musik-Community',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Gift,
      title: 'Belohnungen',
      description: 'Sammle Tokens und erhalte exklusive Vorteile',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Shield,
      title: 'Sicherheit',
      description: 'Blockchain-basierte Transparenz und Sicherheit',
      color: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <section id="dfaith" className="py-16 px-4 bg-gradient-to-b from-black via-blue-900/10 to-black">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-8 h-8">
              <Image
                src="/dfaith-token.png"
                alt="D.FAITH Token"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              D.FAITH Ecosystem
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Die Zukunft der Musik-Erfahrung
          </p>
        </motion.div>

        {/* Token Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl border border-blue-500/30 p-6 mb-8"
        >
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/dfaith-token.png"
                alt="D.FAITH Token"
                fill
                className="object-contain animate-pulse"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">D.FAITH TOKEN</h3>
            <p className="text-blue-300 text-sm mb-4">
              Dein Zugang zur exklusiven Dawid Faith Welt
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-xl p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="text-green-400" size={16} />
                  <span className="text-green-400 font-bold text-sm">+25%</span>
                </div>
                <p className="text-gray-400 text-xs">Community Wachstum</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="text-blue-400" size={16} />
                  <span className="text-blue-400 font-bold text-sm">1,234</span>
                </div>
                <p className="text-gray-400 text-xs">Token Holder</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 w-full"
            >
              Token erhalten
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-gray-900/50 to-purple-900/20 backdrop-blur-md rounded-2xl border border-purple-500/20 p-5"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* D.INVEST Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-900/30 to-teal-900/30 backdrop-blur-md rounded-2xl border border-green-500/30 p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/dinvest-token.png"
                alt="D.INVEST Token"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">D.INVEST</h3>
              <p className="text-green-300 text-sm">Investment-Token für Fans</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Investiere in Dawid Faith&apos;s musikalische Zukunft und profitiere vom Erfolg.
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-yellow-400 text-sm font-medium">Bald verfügbar</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 w-full"
          >
            Mehr erfahren
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}