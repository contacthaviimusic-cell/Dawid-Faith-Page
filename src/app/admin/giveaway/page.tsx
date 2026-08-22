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

type PrizeType = 'mythic' | 'song-nft';
const SONG_NFT_SLOTS = 5;

interface GiveawayWinner {
  id: string;
  songId: string;
  prizeType: PrizeType;
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
  const [winners, setWinners] = useState<GiveawayWinner[]>([]);
  const [drawing, setDrawing] = useState<string | null>(null);
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

  async function fetchWinners(songId: string) {
    if (!songId) {
      setWinners([]);
      return;
    }
    const res = await fetch(`/api/admin/giveaway/draw?songId=${encodeURIComponent(songId)}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setWinners(data.winners ?? []);
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
    fetchWinners(filterSongId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSongId]);

  async function handleDraw(prizeType: PrizeType) {
    if (!filterSongId) return;
    setDrawing(prizeType);
    setDrawError('');
    const res = await fetch('/api/admin/giveaway/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId: filterSongId, prizeType }),
    });
    const data = await res.json().catch(() => ({}));
    setDrawing(null);
    if (!res.ok) {
      setDrawError(data.error ?? 'Konnte nicht auslosen.');
      return;
    }
    setWinners((prev) => [...prev, data]);
  }

  async function handleRedraw(winnerId: string) {
    if (!filterSongId) return;
    if (!confirm('Wirklich neu auslosen? Der bisherige Gewinner wird ersetzt.')) return;
    setDrawing(winnerId);
    setDrawError('');
    const res = await fetch('/api/admin/giveaway/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId: filterSongId, winnerId }),
    });
    const data = await res.json().catch(() => ({}));
    setDrawing(null);
    if (!res.ok) {
      setDrawError(data.error ?? 'Konnte nicht neu auslosen.');
      return;
    }
    setWinners((prev) => [...prev.filter((w) => w.id !== winnerId), data]);
  }

  const songIds = Array.from(new Set(entries.map((e) => e.songId)));
  const visibleEntries = filterSongId ? entries.filter((e) => e.songId === filterSongId) : entries;
  const clickedCount = visibleEntries.filter((e) => e.clickedAt).length;

  const mythicWinner = winners.find((w) => w.prizeType === 'mythic') ?? null;
  const songNftWinners = winners.filter((w) => w.prizeType === 'song-nft');
  const winnerByEntryId = new Map(winners.map((w) => [w.entryId, w]));

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
              Nur Einträge mit &bdquo;bestätigt&ldquo; haben das Gewinnspiel-Formular vollständig abgeschickt.
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
              {visibleEntries.length} Einträge · {clickedCount} bestätigt
            </span>
          </div>
        )}

        {/* Verlosung */}
        {filterSongId && (
          <div className="mb-6 space-y-4">
            {/* Mythic-NFT (1 Gewinner) */}
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-900/10">
              <p className="text-xs uppercase tracking-wide text-amber-400 font-bold mb-3">Mythic-NFT · 1 Gewinner</p>
              {mythicWinner ? (
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                      <Trophy size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{mythicWinner.email}</p>
                      <p className="text-xs text-gray-500">Ausgelost: {formatDate(mythicWinner.drawnAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRedraw(mythicWinner.id)}
                    disabled={!!drawing}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-all disabled:opacity-50 flex-shrink-0"
                  >
                    {drawing === mythicWinner.id ? 'Lost aus…' : 'Neu auslosen'}
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
                    onClick={() => handleDraw('mythic')}
                    disabled={!!drawing || clickedCount === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Sparkles size={16} />
                    {drawing === 'mythic' ? 'Lost aus…' : 'Verlosen'}
                  </button>
                </div>
              )}
            </div>

            {/* Song-NFTs (bis zu 5 Gewinner) */}
            <div className="p-5 rounded-2xl border border-amber-500/20 bg-slate-900/40">
              <p className="text-xs uppercase tracking-wide text-amber-400 font-bold mb-3">
                Song-NFTs · {songNftWinners.length}/{SONG_NFT_SLOTS} vergeben
              </p>
              {songNftWinners.length > 0 && (
                <div className="space-y-2 mb-3">
                  {songNftWinners.map((w) => (
                    <div key={w.id} className="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/5">
                      <div className="flex items-center gap-3 flex-1">
                        <Trophy size={16} className="text-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-white">{w.email}</p>
                          <p className="text-xs text-gray-500">Ausgelost: {formatDate(w.drawnAt)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRedraw(w.id)}
                        disabled={!!drawing}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-all disabled:opacity-50 flex-shrink-0"
                      >
                        {drawing === w.id ? 'Lost aus…' : 'Neu auslosen'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {songNftWinners.length < SONG_NFT_SLOTS && (
                <button
                  onClick={() => handleDraw('song-nft')}
                  disabled={!!drawing || clickedCount === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold text-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles size={16} />
                  {drawing === 'song-nft'
                    ? 'Lost aus…'
                    : `Nächsten Song-NFT-Gewinner auslosen (${songNftWinners.length + 1}/${SONG_NFT_SLOTS})`}
                </button>
              )}
            </div>

            {drawError && <p className="text-red-400 text-sm">{drawError}</p>}
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
              const entryWinner = winnerByEntryId.get(entry.id);
              const isWinner = !!entryWinner;
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
                      {entryWinner && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                          <Trophy size={12} /> {entryWinner.prizeType === 'mythic' ? 'Mythic-Gewinner' : 'Song-NFT-Gewinner'}
                        </span>
                      )}
                      {clicked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          ✅ Bestätigt
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
                        {clicked && <>&nbsp;·&nbsp;Bestätigt: {formatDate(entry.clickedAt)}</>}
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
