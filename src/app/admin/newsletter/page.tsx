'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Trash2, Calendar, User, ArrowLeft, Search, Filter, Trophy } from 'lucide-react';
import Link from 'next/link';

interface NewsletterSubscriber {
  id: string;
  email: string;
  location?: string;
  language?: 'de' | 'en' | 'pl';
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

interface GiveawayEntry {
  id: string;
  songId: string;
  email: string;
  location: string;
  language?: 'de' | 'en' | 'pl';
  unsubscribed: boolean;
  createdAt: string;
}

interface ContactRow {
  id: string;
  email: string;
  location: string;
  language: 'de' | 'en' | 'pl';
  date: string;
  ipAddress: string | null;
  unsubscribed: boolean;
  source: 'newsletter' | 'giveaway';
  songId?: string;
}

const LANG_LABELS: Record<string, string> = { de: '🇩🇪 DE', en: '🇬🇧 EN', pl: '🇵🇱 PL' };

export default function AdminNewsletterPage() {
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'email'>('newest');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const [newsletterRes, giveawayRes] = await Promise.all([
        fetch('/api/newsletter'),
        fetch('/api/admin/giveaway'),
      ]);

      const newsletterRows: ContactRow[] = newsletterRes.ok
        ? ((await newsletterRes.json()) as NewsletterSubscriber[]).map((sub) => ({
            id: `newsletter_${sub.id}`,
            email: sub.email,
            location: sub.location || '',
            language: sub.language ?? 'de',
            date: sub.subscribedAt,
            ipAddress: sub.ipAddress ?? null,
            unsubscribed: false,
            source: 'newsletter',
          }))
        : [];

      const giveawayRows: ContactRow[] = giveawayRes.ok
        ? ((await giveawayRes.json()) as GiveawayEntry[]).map((entry) => ({
            id: `giveaway_${entry.id}`,
            email: entry.email,
            location: entry.location || '',
            language: entry.language ?? 'de',
            date: entry.createdAt,
            ipAddress: null,
            unsubscribed: entry.unsubscribed,
            source: 'giveaway',
            songId: entry.songId,
          }))
        : [];

      setContacts([...newsletterRows, ...giveawayRows]);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (row: ContactRow) => {
    if (row.source !== 'newsletter') return;
    if (!confirm(`Newsletter-Abonnement für ${row.email} wirklich löschen?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(row.email)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(prev => prev.filter(c => c.id !== row.id));
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
      ['E-Mail', 'Quelle', 'Wohnort', 'Sprache', 'Datum', 'Abgemeldet', 'IP-Adresse'].join(','),
      ...filteredAndSortedContacts.map(row => [
        row.email,
        row.source === 'newsletter' ? 'Newsletter' : `Gewinnspiel (${row.songId})`,
        row.location || '',
        row.language,
        new Date(row.date).toLocaleString('de-DE'),
        row.unsubscribed ? 'Ja' : 'Nein',
        row.ipAddress || 'unknown',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `kontakte-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAndSortedContacts = contacts
    .filter(row =>
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

  const unsubscribedCount = contacts.filter(c => c.unsubscribed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Kontakte werden geladen...</p>
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
              Newsletter-Abonnenten & Gewinnspiel-Teilnehmer an einem Ort verwalten und exportieren
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <h3 className="text-2xl font-bold text-white">{contacts.length}</h3>
                <p className="text-gray-400">Gesamt Kontakte</p>
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
                  {contacts.filter(c => {
                    const dayAgo = new Date();
                    dayAgo.setDate(dayAgo.getDate() - 1);
                    return new Date(c.date) > dayAgo;
                  }).length}
                </h3>
                <p className="text-gray-400">Heute hinzugekommen</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                <Trash2 className="text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{unsubscribedCount}</h3>
                <p className="text-gray-400">Abgemeldet</p>
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
              disabled={contacts.length === 0}
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

        {/* Contacts List */}
        {filteredAndSortedContacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Mail className="mx-auto mb-4 text-gray-600" size={48} />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {searchTerm ? 'Keine Kontakte gefunden' : 'Noch keine Kontakte'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Versuche einen anderen Suchbegriff.' : 'Sobald sich jemand anmeldet oder am Gewinnspiel teilnimmt, erscheinen die Daten hier.'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-600/20 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-6 border-b border-gray-600/20 bg-gray-800/30">
              <div className="font-semibold text-gray-300">E-Mail</div>
              <div className="font-semibold text-gray-300 hidden md:block">Quelle</div>
              <div className="font-semibold text-gray-300 hidden md:block">Wohnort</div>
              <div className="font-semibold text-gray-300 hidden md:block">Sprache</div>
              <div className="font-semibold text-gray-300 hidden md:block">Datum</div>
              <div className="font-semibold text-gray-300 hidden md:block">Status</div>
              <div className="font-semibold text-gray-300">Aktionen</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-600/20">
              {filteredAndSortedContacts.map((row, index) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 p-6 hover:bg-gray-800/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-purple-400" />
                    </div>
                    <span className="text-white font-medium truncate">{row.email}</span>
                  </div>

                  <div className="hidden md:block">
                    {row.source === 'newsletter' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
                        <Mail size={12} /> Newsletter
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                        <Trophy size={12} /> Gewinnspiel · {row.songId}
                      </span>
                    )}
                  </div>

                  <div className="text-gray-400 hidden md:block">
                    {row.location || '—'}
                  </div>

                  <div className="text-gray-400 hidden md:block">
                    {LANG_LABELS[row.language]}
                  </div>

                  <div className="text-gray-400 hidden md:block">
                    {new Date(row.date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>

                  <div className="hidden md:block">
                    {row.unsubscribed ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
                        Abgemeldet
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                        Aktiv
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {row.source === 'newsletter' ? (
                      <motion.button
                        onClick={() => deleteSubscriber(row)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors"
                        title="Abonnement löschen"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
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
