'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Music, Sparkles, User, Newspaper, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: User, type: 'scroll' },
    { name: 'News', href: '#news', icon: Newspaper, type: 'scroll' },
    { name: 'D.FAITH', href: '#dfaith', icon: Sparkles, type: 'scroll' },
    { name: 'Musik', href: '#musik', icon: Music, type: 'scroll' },
    { name: 'Konzerte', href: '#konzerte', icon: Calendar, type: 'scroll' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'Pirata One, cursive' }}
          >
            Dawid Faith
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
              >
                <item.icon size={18} />
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 py-3 px-4 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 w-full text-left"
              >
                <item.icon size={18} />
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
