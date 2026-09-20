'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Sparkles, Trash2 } from 'lucide-react';

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
const SONG_NFT_SLOTS = 10;

interface GiveawayWinner {
  id: string;
  songId: string;
  prizeType: PrizeType;
  entryId: string;
  email: string;
  drawnAt: string;
}

interface WinnerMailPreview {
  entryId: string;
  email: string;
  prizeTypes: PrizeType[];
  lang: 'de' | 'en' | 'pl';
  subject: string;
  html: string;
  text: string;
}

const PRIZE_LABELS: Record<PrizeType, string> = { mythic: 'Mythic-NFT', 'song-nft': 'Song-NFT' };

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
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notifyPreviews, setNotifyPreviews] = useState<WinnerMailPreview[]>([]);
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [testEmail, setTestEmail] = useState('');
  const router = useRouter();

  async function fetchNotifyPreviews(songId: string) {
    if (!songId) {
      setNotifyPreviews([]);
      return;
    }
    const res = await fetch(`/api/admin/giveaway/notify?songId=${encodeURIComponent(songId)}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setNotifyPreviews(data.previews ?? []);
    }
  }

  async function sendWinnerEmail(entryId: string, email: string) {
    if (!filterSongId) return;
    if (!confirm(`Gewinner-Mail jetzt wirklich an „${email}" senden?`)) return;
    setSendingId(entryId);
    const res = await fetch('/api/admin/giveaway/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId: filterSongId, entryId }),
    });
    setSendingId(null);
    if (res.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      setSentIds((prev) => new Set(prev).add(entryId));
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? 'Konnte Mail nicht senden.');
    }
  }

  async function sendTestWinnerEmail(entryId: string) {
    if (!filterSongId) return;
    if (!testEmail.trim()) {
      alert('Bitte zuerst eine Test-E-Mail-Adresse eingeben.');
      return;
    }
    setSendingId(`test-${entryId}`);
    const res = await fetch('/api/admin/giveaway/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId: filterSongId, entryId, testEmail: testEmail.trim() }),
    });
    setSendingId(null);
    if (res.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      alert(`Test-Mail an ${testEmail.trim()} gesendet.`);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? 'Konnte Test-Mail nicht senden.');
    }
  }

  async function deleteEntry(entryId: string, email: string) {
    if (!confirm(`Teilnahme von „${email}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) return;
    setDeletingId(entryId);
    const res = await fetch(`/api/admin/giveaway?entryId=${encodeURIComponent(entryId)}`, {
      method: 'DELETE',
    });
    setDeletingId(null);
    if (res.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
    } else {
      alert('Konnte Eintrag nicht löschen.');
    }
  }

  async function confirmEntry(entryId: string) {
    if (!confirm('Diesen Eintrag manuell als bestätigt markieren? Das ist nur für Alt-Einträge von vor der Modal-Umstellung gedacht.')) return;
    setConfirmingId(entryId);
    const res = await fetch('/api/admin/giveaway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId }),
    });
    setConfirmingId(null);
    if (res.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      await fetchEntries();
    } else {
      alert('Konnte nicht bestätigen.');
    }
  }

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
    setExpandedPreview(null);
    fetchWinners(filterSongId);
    fetchNotifyPreviews(filterSongId);
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
    fetchNotifyPreviews(filterSongId);
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
    fetchNotifyPreviews(filterSongId);
  }

  const songIds = Array.from(new Set(entries.map((e) => e.songId)));
  const visibleEntries = filterSongId ? entries.filter((e) => e.songId === filterSongId) : entries;
  const clickedCount = visibleEntries.filter((e) => e.clickedAt).length;

  const mythicWinner = winners.find((w) => w.prizeType === 'mythic') ?? null;
  const songNftWinners = winners.filter((w) => w.prizeType === 'song-nft');
  // Eine entryId kann jetzt zu zwei Gewinner-Datensätzen gehören (Song-NFT +
  // zusätzlich Mythic), deshalb ein Array pro entryId statt nur dem letzten.
  const winnersByEntryId = new Map<string, GiveawayWinner[]>();
  for (const w of winners) {
    const list = winnersByEntryId.get(w.entryId) ?? [];
    list.push(w);
    winnersByEntryId.set(w.entryId, list);
  }

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
            {/* Song-NFTs (bis zu 5 Gewinner) – zuerst, da der Mythic-NFT aus diesen gezogen wird */}
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

            {/* Mythic-NFT (1 Gewinner, gezogen aus den Song-NFT-Gewinnern) */}
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-900/10">
              <p className="text-xs uppercase tracking-wide text-amber-400 font-bold mb-1">Mythic-NFT · 1 Gewinner</p>
              <p className="text-xs text-gray-500 mb-3">
                Geht an eine(n) der Song-NFT-Gewinner:innen – diese Person bekommt dadurch bewusst beide Preise.
              </p>
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
                    {songNftWinners.length === 0
                      ? 'Erst mindestens einen Song-NFT-Gewinner auslosen (oben).'
                      : `${songNftWinners.length} Song-NFT-Gewinner ausgelost – bereit für die Mythic-Verlosung.`}
                  </p>
                  <button
                    onClick={() => handleDraw('mythic')}
                    disabled={!!drawing || songNftWinners.length === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Sparkles size={16} />
                    {drawing === 'mythic' ? 'Lost aus…' : 'Verlosen'}
                  </button>
                </div>
              )}
            </div>

            {drawError && <p className="text-red-400 text-sm">{drawError}</p>}

            {/* Gewinner-Mails: Vorschau vor dem Versand, einzeln pro Person */}
            {notifyPreviews.length > 0 && (
              <div className="p-5 rounded-2xl border border-slate-700 bg-slate-900/40">
                <p className="text-xs uppercase tracking-wide text-amber-400 font-bold mb-3">
                  Gewinner-Mails · {notifyPreviews.length} Person{notifyPreviews.length === 1 ? '' : 'en'}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Test-E-Mail-Adresse (z. B. deine eigene)"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  {notifyPreviews.map((p) => {
                    const isExpanded = expandedPreview === p.entryId;
                    const isSent = sentIds.has(p.entryId);
                    return (
                      <div key={p.entryId} className="p-3 rounded-lg bg-black/30 border border-white/5">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{p.email}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {p.prizeTypes.map((pt) => PRIZE_LABELS[pt]).join(' + ')} · {LANG_LABELS[p.lang]}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => setExpandedPreview(isExpanded ? null : p.entryId)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-all"
                            >
                              {isExpanded ? 'Vorschau verbergen' : 'Vorschau anzeigen'}
                            </button>
                            <button
                              onClick={() => sendTestWinnerEmail(p.entryId)}
                              disabled={sendingId === `test-${p.entryId}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-all disabled:opacity-50"
                            >
                              {sendingId === `test-${p.entryId}` ? 'Sende…' : 'Test an mich'}
                            </button>
                            <button
                              onClick={() => sendWinnerEmail(p.entryId, p.email)}
                              disabled={sendingId === p.entryId}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 ${
                                isSent
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400'
                              }`}
                            >
                              {sendingId === p.entryId ? 'Sende…' : isSent ? '✓ Gesendet' : 'Mail senden'}
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-white/5">
                            <p className="text-xs text-gray-500 mb-2">
                              <span className="text-gray-400 font-semibold">Betreff:</span> {p.subject}
                            </p>
                            <pre className="text-xs text-gray-300 whitespace-pre-wrap bg-black/40 rounded-lg p-3 font-sans">
                              {p.text}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
              const entryWinners = winnersByEntryId.get(entry.id) ?? [];
              const isWinner = entryWinners.length > 0;
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
                      {entryWinners.map((w) => (
                        <span
                          key={w.id}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold"
                        >
                          <Trophy size={12} /> {w.prizeType === 'mythic' ? 'Mythic-Gewinner' : 'Song-NFT-Gewinner'}
                        </span>
                      ))}
                      {clicked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          ✅ Bestätigt
                        </span>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-slate-400 text-xs font-semibold">
                            ⏳ Noch nicht
                          </span>
                          <button
                            onClick={() => confirmEntry(entry.id)}
                            disabled={confirmingId === entry.id}
                            className="px-2 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-semibold transition-all disabled:opacity-50"
                          >
                            {confirmingId === entry.id ? 'Bestätige…' : 'Manuell bestätigen'}
                          </button>
                        </>
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
                    <button
                      onClick={() => deleteEntry(entry.id, entry.email)}
                      disabled={deletingId === entry.id}
                      title="Teilnahme löschen"
                      className="flex-shrink-0 p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
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
