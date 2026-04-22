'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Copy, Check, ExternalLink } from 'lucide-react';

interface OutreachEntry {
  id: string;
  label: string;
  sentTo: string;
  note: string;
  createdAt: string;
  clicks: number;
  firstClickAt: string | null;
  lastClickAt: string | null;
}

const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL ?? 'https://dawid-faith.de';

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

export default function AdminOutreachPage() {
  const [entries, setEntries] = useState<OutreachEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', sentTo: '', note: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  async function fetchEntries() {
    setLoading(true);
    const res = await fetch('/api/outreach', { cache: 'no-store' });
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

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!form.label.trim() || !form.sentTo.trim()) {
      setFormError('Bezeichnung und E-Mail sind Pflichtfelder.');
      return;
    }
    setSaving(true);
    const res = await fetch('/api/outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json();
      setFormError(d.error ?? 'Fehler beim Erstellen.');
      return;
    }
    setForm({ label: '', sentTo: '', note: '' });
    setShowForm(false);
    await fetchEntries();
  }

  async function handleDelete(id: string, label: string) {
    if (!confirm(`"${label}" wirklich löschen?`)) return;
    await fetch(`/api/outreach/${id}`, { method: 'DELETE' });
    await fetchEntries();
  }

  function copyLink(id: string) {
    const url = `${BASE_URL}/booking?ref=${id}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/news" className="text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Booking Outreach
            </h1>
            <p className="text-gray-400 mt-1">
              Erstelle Tracking-Links für deine Booking-Mails und sieh wer geklickt hat.
            </p>
          </div>
        </div>

        {/* New entry button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold transition-all"
          >
            <Plus size={18} />
            Neuen Link erstellen
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleCreate}
            className="mb-8 p-5 rounded-2xl border border-amber-500/30 bg-amber-900/10 space-y-4"
          >
            <h2 className="text-lg font-semibold text-amber-300">Neuer Tracking-Link</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm text-gray-300">
                Bezeichnung *
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="z.B. Club Butan – April 2026"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                />
              </label>
              <label className="block text-sm text-gray-300">
                Gesendet an (E-Mail) *
                <input
                  type="email"
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="booking@venue.de"
                  value={form.sentTo}
                  onChange={(e) => setForm({ ...form, sentTo: e.target.value })}
                />
              </label>
            </div>

            <label className="block text-sm text-gray-300">
              Notiz (optional)
              <input
                className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="z.B. Anfrage für Sommerfest, 200 Gäste"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </label>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 font-semibold disabled:opacity-50 transition-all"
              >
                {saving ? 'Erstelle…' : 'Link erstellen'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setFormError(''); }}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all"
              >
                Abbrechen
              </button>
            </div>
          </form>
        )}

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Noch keine Einträge.</p>
            <p className="text-sm mt-1">Erstelle deinen ersten Tracking-Link oben.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const trackingUrl = `${BASE_URL}/booking?ref=${entry.id}`;
              const clicked = entry.clicks > 0;
              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border ${
                    clicked
                      ? 'border-green-500/40 bg-green-900/10'
                      : 'border-slate-700 bg-slate-900/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    {/* Status badge */}
                    <div className="flex-shrink-0">
                      {clicked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          ✅ {entry.clicks}× geklickt
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-slate-400 text-xs font-semibold">
                          ⏳ Nicht geklickt
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{entry.label}</p>
                      <p className="text-sm text-gray-400">
                        {entry.sentTo}
                        {entry.note && <span className="ml-2 text-gray-500">· {entry.note}</span>}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Erstellt: {formatDate(entry.createdAt)}
                        {clicked && (
                          <>
                            &nbsp;·&nbsp; Erster Klick: {formatDate(entry.firstClickAt)}
                            &nbsp;·&nbsp; Letzter Klick: {formatDate(entry.lastClickAt)}
                          </>
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Copy link */}
                      <button
                        onClick={() => copyLink(entry.id)}
                        title="Link kopieren"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm transition-all"
                      >
                        {copied === entry.id ? (
                          <><Check size={14} className="text-green-400" /> Kopiert!</>
                        ) : (
                          <><Copy size={14} /> Link kopieren</>
                        )}
                      </button>

                      {/* Open in new tab */}
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Link öffnen"
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all"
                      >
                        <ExternalLink size={14} />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(entry.id, entry.label)}
                        title="Löschen"
                        className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-700/60 transition-all"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* URL preview */}
                  <div className="mt-2 text-xs text-gray-600 font-mono truncate bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    {trackingUrl}
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
