'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Trash2, Calendar, User, ArrowLeft, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'email'>('newest');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (email: string) => {
    if (!confirm(`Newsletter-Abonnement für ${email} wirklich löschen?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubscribers(prev => prev.filter(sub => sub.email !== email));
        alert('Newsletter-Abonnement erfolgreich gelöscht!');
      } else {
        alert('Fehler beim Löschen des Newsletter-Abonnements.');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Fehler beim Löschen des Newsletter-Abonnements.');
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['E-Mail', 'Anmeldedatum', 'IP-Adresse', 'User Agent'].join(','),
      ...filteredAndSortedSubscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleString('de-DE'),
        sub.ipAddress || 'unknown',
        (sub.userAgent || 'unknown').replace(/,/g, ';') // Replace commas to avoid CSV issues
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAndSortedSubscribers = subscribers
    .filter(sub => 
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime();
        case 'oldest':
          return new Date(a.subscribedAt).getTime() - new Date(b.subscribedAt).getTime();
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Newsletter-Abonnenten werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/admin/news"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Newsletter-Management
            </h1>
            <p className="text-gray-400 mt-2">
              Verwalte alle Newsletter-Abonnenten und exportiere die Liste
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <Mail className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{subscribers.length}</h3>
                <p className="text-gray-400">Gesamt Abonnenten</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Calendar className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {subscribers.filter(sub => {
                    const dayAgo = new Date();
                    dayAgo.setDate(dayAgo.getDate() - 1);
                    return new Date(sub.subscribedAt) > dayAgo;
                  }).length}
                </h3>
                <p className="text-gray-400">Heute angemeldet</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <motion.button
              onClick={exportToCSV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={subscribers.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              CSV Export
            </motion.button>
          </motion.div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Nach E-Mail-Adresse suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'email')}
              className="pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              <option value="newest">Neueste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
              <option value="email">Nach E-Mail sortiert</option>
            </select>
          </div>
        </div>

        {/* Subscribers List */}
        {filteredAndSortedSubscribers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Mail className="mx-auto mb-4 text-gray-600" size={48} />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {searchTerm ? 'Keine Abonnenten gefunden' : 'Noch keine Newsletter-Abonnenten'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Versuche einen anderen Suchbegriff.' : 'Sobald sich jemand anmeldet, erscheinen die Daten hier.'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-600/20 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-gray-600/20 bg-gray-800/30">
              <div className="font-semibold text-gray-300">E-Mail</div>
              <div className="font-semibold text-gray-300 hidden md:block">Anmeldedatum</div>
              <div className="font-semibold text-gray-300 hidden md:block">IP-Adresse</div>
              <div className="font-semibold text-gray-300">Aktionen</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-600/20">
              {filteredAndSortedSubscribers.map((subscriber, index) => (
                <motion.div
                  key={subscriber.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 hover:bg-gray-800/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-purple-400" />
                    </div>
                    <span className="text-white font-medium">{subscriber.email}</span>
                  </div>
                  
                  <div className="text-gray-400 hidden md:block">
                    {new Date(subscriber.subscribedAt).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="text-gray-400 text-sm hidden md:block">
                    {subscriber.ipAddress || 'unknown'}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => deleteSubscriber(subscriber.email)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors"
                      title="Abonnement löschen"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}