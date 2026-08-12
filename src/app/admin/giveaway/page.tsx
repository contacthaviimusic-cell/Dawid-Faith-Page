'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Sparkles } from 'lucide-react';

interface GiveawayEntry {
  id: string;
  songId: string;
  email: string;
  location: string;
  language?: 'de' | 'en' | 'pl';
  deviceFingerprint?: string;
  token: string;
  clickedAt: string | null;
  unsubscribed: boolean;
  createdAt: string;
}

const LANG_LABELS: Record<string, string> = { de: '🇩🇪 DE', en: '🇬🇧 EN', pl: '🇵🇱 PL' };

interface GiveawayWinner {
  songId: string;
  entryId: string;
  email: string;
  drawnAt: string;
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
  const [winner, setWinner] = useState<GiveawayWinner | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [drawError, setDrawError] = useState('');
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

  async function fetchWinner(songId: string) {
    if (!songId) {
      setWinner(null);
      return;
    }
    const res = await fetch(`/api/admin/giveaway/draw?songId=${encodeURIComponent(songId)}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setWinner(data.winner ?? null);
    }
  }

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) { router.replace('/admin/login'); return; }
      await fetchEntries();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDrawError('');
    fetchWinner(filterSongId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSongId]);

  async function handleDraw(redraw = false) {
    if (!filterSongId) return;
    if (redraw && !confirm('Wirklich neu auslosen? Der bisherige Gewinner wird ersetzt.')) return;
    setDrawing(true);
    setDrawError('');
    const res = await fetch('/api/admin/giveaway/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId: filterSongId, redraw }),
    });
    const data = await res.json().catch(() => ({}));
    setDrawing(false);
    if (!res.ok) {
      setDrawError(data.error ?? 'Konnte nicht auslosen.');
      return;
    }
    setWinner(data);
  }

  const songIds = Array.from(new Set(entries.map((e) => e.songId)));
  const visibleEntries = filterSongId ? entries.filter((e) => e.songId === filterSongId) : entries;
  const clickedCount = visibleEntries.filter((e) => e.clickedAt).length;

  // Gruppiert alle Einträge (über alle Songs hinweg) nach Geräte-Fingerprint,
  // damit wir erkennen, wenn dasselbe Gerät mehrere E-Mail-Adressen benutzt hat.
  const emailsByFingerprint = entries.reduce<Record<string, Set<string>>>((acc, e) => {
    if (!e.deviceFingerprint) return acc;
    if (!acc[e.deviceFingerprint]) acc[e.deviceFingerprint] = new Set();
    acc[e.deviceFingerprint].add(e.email);
    return acc;
  }, {});

  function otherEmailsSameDevice(entry: GiveawayEntry): string[] {
    if (!entry.deviceFingerprint) return [];
    const emails = emailsByFingerprint[entry.deviceFingerprint];
    if (!emails || emails.size < 2) return [];
    return Array.from(emails).filter((e) => e !== entry.email);
  }

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
              Nur Einträge mit &bdquo;geklickt&ldquo; haben ihren persönlichen Presave-Link wirklich benutzt.
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

        {/* Verlosung */}
        {filterSongId && (
          <div className="mb-6 p-5 rounded-2xl border border-amber-500/30 bg-amber-900/10">
            {winner ? (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                    <Trophy size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-amber-400 font-bold">Gewinner</p>
                    <p className="font-semibold text-white">{winner.email}</p>
                    <p className="text-xs text-gray-500">Ausgelost: {formatDate(winner.drawnAt)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDraw(true)}
                  disabled={drawing}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-all disabled:opacity-50 flex-shrink-0"
                >
                  {drawing ? 'Lost aus…' : 'Neu auslosen'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-sm text-gray-300 flex-1">
                  {clickedCount === 0
                    ? 'Noch keine bestätigten Teilnahmen für diesen Song.'
                    : `${clickedCount} bestätigte Teilnahme${clickedCount === 1 ? '' : 'n'} – bereit für die Verlosung.`}
                </p>
                <button
                  onClick={() => handleDraw(false)}
                  disabled={drawing || clickedCount === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Sparkles size={16} />
                  {drawing ? 'Lost aus…' : 'Verlosung starten'}
                </button>
              </div>
            )}
            {drawError && <p className="text-red-400 text-sm mt-3">{drawError}</p>}
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
              const isWinner = winner?.entryId === entry.id;
              const sameDeviceEmails = otherEmailsSameDevice(entry);
              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border ${
                    isWinner
                      ? 'border-amber-500/60 bg-amber-900/10'
                      : sameDeviceEmails.length > 0
                      ? 'border-red-500/40 bg-red-900/10'
                      : clicked
                      ? 'border-green-500/40 bg-green-900/10'
                      : 'border-slate-700 bg-slate-900/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {isWinner && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                          <Trophy size={12} /> Gewinner
                        </span>
                      )}
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
                      <p className="font-semibold text-white truncate flex items-center gap-2">
                        {entry.email}
                        {entry.unsubscribed && (
                          <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                            abgemeldet
                          </span>
                        )}
                        {sameDeviceEmails.length > 0 && (
                          <span
                            className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-red-500/20 text-red-400"
                            title={`Gleiches Gerät wie: ${sameDeviceEmails.join(', ')}`}
                          >
                            ⚠ gleiches Gerät wie {sameDeviceEmails.length} weitere E-Mail{sameDeviceEmails.length === 1 ? '' : 's'}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {entry.location && <>📍 {entry.location} · </>}
                        {LANG_LABELS[entry.language ?? 'de']} · Song: {entry.songId} · Eingetragen: {formatDate(entry.createdAt)}
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
