'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface GiveawayEntry {
  id: string;
  songId: string;
  email: string;
  token: string;
  clickedAt: string | null;
  createdAt: string;
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminGiveawayPage() {
  const [entries, setEntries] = useState<GiveawayEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterSongId, setFilterSongId] = useState('');
  const router = useRouter();

  async function fetchEntries() {
    setLoading(true);
    const res = await fetch('/api/admin/giveaway', { cache: 'no-store' });
    if (res.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      setEntries(await res.json());
      setError(null);
    } else {
      setError('Konnte Daten nicht laden.');
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) { router.replace('/admin/login'); return; }
      await fetchEntries();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const songIds = Array.from(new Set(entries.map((e) => e.songId)));
  const visibleEntries = filterSongId ? entries.filter((e) => e.songId === filterSongId) : entries;
  const clickedCount = visibleEntries.filter((e) => e.clickedAt).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/singles" className="text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Gewinnspiel-Teilnehmer
            </h1>
            <p className="text-gray-400 mt-1">
              Nur Einträge mit „geklickt" haben ihren persönlichen Presave-Link wirklich benutzt.
            </p>
          </div>
        </div>

        {songIds.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <select
              value={filterSongId}
              onChange={(e) => setFilterSongId(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Alle Songs</option>
              {songIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <span className="text-sm text-gray-400">
              {visibleEntries.length} Einträge · {clickedCount} geklickt
            </span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : visibleEntries.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Noch keine Teilnehmer.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleEntries.map((entry) => {
              const clicked = !!entry.clickedAt;
              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border ${
                    clicked ? 'border-green-500/40 bg-green-900/10' : 'border-slate-700 bg-slate-900/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-shrink-0">
                      {clicked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          ✅ Geklickt
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-slate-400 text-xs font-semibold">
                          ⏳ Noch nicht
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{entry.email}</p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Song: {entry.songId} · Eingetragen: {formatDate(entry.createdAt)}
                        {clicked && <>&nbsp;·&nbsp;Geklickt: {formatDate(entry.clickedAt)}</>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
