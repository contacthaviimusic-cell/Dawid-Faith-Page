"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { NewsItem } from '@/types/news';

type FormState = Omit<NewsItem, 'id'> & { id?: string };

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const router = useRouter();

  async function fetchNews() {
    setLoading(true);
    const res = await fetch('/api/news', { cache: 'no-store' });
    if (res.ok) {
      const data = (await res.json()) as NewsItem[];
      setItems(data);
      setError(null);
    } else {
      setError('Konnte News nicht laden');
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      // verify auth first
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) {
        router.replace('/admin/login');
        return;
      }
      await fetchNews();
    })();
  }, []);

  async function saveItem(form: FormState) {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/news/${form.id}` : '/api/news';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        date: form.date,
        readTime: form.readTime,
        category: form.category,
        image: form.image,
        featured: form.featured,
      }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        router.push('/admin/login');
      } else {
        alert('Fehler beim Speichern');
      }
      return;
    }
    setEditing(null);
    await fetchNews();
  }

  async function deleteItem(id: string) {
    if (!confirm('Wirklich löschen?')) return;
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      if (res.status === 401) router.push('/admin/login');
      else alert('Fehler beim Löschen');
      return;
    }
    await fetchNews();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const emptyForm: FormState = useMemo(() => ({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    readTime: '3 min',
    category: 'Allgemein',
    image: '/dawid-faith-bg.jpg',
    featured: false,
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">News Admin</h1>
          <button onClick={logout} className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700">Logout</button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setEditing(emptyForm)}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600"
          >
            + Neue News
          </button>
        </div>

        {loading ? (
          <p>Lade…</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="space-y-3">
            {items.map((n) => (
              <div key={n.id} className="p-4 bg-black/30 border border-slate-800 rounded">
                <div className="flex items-start gap-4">
                  <Image src={n.image} alt="" width={96} height={64} className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {n.featured && <span className="text-yellow-400">★</span>}
                      <h2 className="font-semibold">{n.title}</h2>
                    </div>
                    <div className="text-sm text-slate-400">{n.category} · {new Date(n.date).toLocaleDateString('de-DE')} · {n.readTime}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setExpanded((prev) => ({ ...prev, [n.id]: !prev[n.id] }))} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">
                      {expanded[n.id] ? 'Verbergen' : 'Details'}
                    </button>
                    <button onClick={() => setEditing({ ...n })} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Bearbeiten</button>
                    <button onClick={() => deleteItem(n.id)} className="px-3 py-1 rounded bg-red-700 hover:bg-red-600">Löschen</button>
                  </div>
                </div>

                {expanded[n.id] && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-4">
                        <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">Vollständiger Inhalt</h3>
                        <div className="prose prose-invert max-w-none">
                          {n.content && n.content.trim() ? (
                            <div className="whitespace-pre-wrap text-slate-200 bg-slate-900/50 border border-slate-800 rounded p-3">
                              {n.content}
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap bg-slate-900/50 border border-slate-800 rounded p-3">
                                {n.excerpt}
                              </p>
                              {n.category === 'Musik Release' && (
                                <div className="space-y-6">
                                  <h3 className="text-2xl font-bold text-white">Über den Release</h3>
                                  <p className="text-gray-300 leading-relaxed">
                                    &quot;Digital Dreams&quot; markiert einen wichtigen Meilenstein in Dawid Faiths künstlerischer Entwicklung.
                                    Der Track wurde in den legendären Abbey Road Studios aufgenommen und kombiniert modernste
                                    Produktionstechniken mit zeitlosen melodischen Elementen.
                                  </p>
                                  <p className="text-gray-300 leading-relaxed">
                                    Die Single ist ab sofort auf allen gängigen Streaming-Plattformen verfügbar und wird
                                    exklusiv für D.FAITH Token-Inhaber in limitierter Vinyl-Edition veröffentlicht.
                                  </p>
                                  <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
                                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Streaming Links</h4>
                                    <div className="flex flex-wrap gap-3">
                                      <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Spotify</button>
                                      <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">YouTube</button>
                                      <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Apple Music</button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {n.category === 'Blockchain' && (
                                <div className="space-y-6">
                                  <h3 className="text-2xl font-bold text-white">Token Details</h3>
                                  <p className="text-gray-300 leading-relaxed">
                                    Der D.INVEST Token revolutioniert die Art, wie Fans an Dawid Faiths Erfolg teilhaben können.
                                    Als Utility-Token bietet er exklusive Vorteile und Zugang zu limitierten Inhalten.
                                  </p>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                      <h4 className="text-purple-300 font-semibold mb-2">Token-Vorteile</h4>
                                      <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• VIP-Zugang zu Konzerten</li>
                                        <li>• Exklusive Merchandise</li>
                                        <li>• Meet & Greet Möglichkeiten</li>
                                        <li>• Früher Zugang zu neuen Releases</li>
                                      </ul>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                      <h4 className="text-purple-300 font-semibold mb-2">Technische Daten</h4>
                                      <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Ethereum Blockchain</li>
                                        <li>• ERC-20 Standard</li>
                                        <li>• Limitierte Auflage: 10.000</li>
                                        <li>• Smart Contract verifiziert</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {n.category === 'Events' && (
                                <div className="space-y-6">
                                  <h3 className="text-2xl font-bold text-white">Event-Details</h3>
                                  <p className="text-gray-300 leading-relaxed">
                                    Das Berlin-Konzert wird ein einmaliges Erlebnis mit modernster Technik und einer
                                    360°-Bühneninszenierung. Erlebe Dawid Faith live in einer völlig neuen Dimension.
                                  </p>
                                  <div className="bg-blue-900/30 p-6 rounded-2xl border border-blue-500/20">
                                    <h4 className="text-lg font-semibold text-blue-300 mb-4">Konzert-Info</h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                                      <div>
                                        <p className="font-medium">Datum & Zeit</p>
                                        <p className="text-sm">15. Januar 2025, 20:00 Uhr</p>
                                      </div>
                                      <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-sm">Mercedes-Benz Arena Berlin</p>
                                      </div>
                                      <div>
                                        <p className="font-medium">Tickets</p>
                                        <p className="text-sm">Ab 45€ - VIP ab 150€</p>
                                      </div>
                                      <div>
                                        <p className="font-medium">Support Act</p>
                                        <p className="text-sm">Wird noch bekannt gegeben</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">Metadaten</h3>
                      <div className="text-sm text-slate-300 space-y-1">
                        <div><span className="text-slate-400">Datum:</span> {new Date(n.date).toLocaleDateString('de-DE')}</div>
                        <div><span className="text-slate-400">Lesezeit:</span> {n.readTime}</div>
                        <div><span className="text-slate-400">Kategorie:</span> {n.category}</div>
                        <div><span className="text-slate-400">Bild:</span> <span className="break-all">{n.image}</span></div>
                        <div><span className="text-slate-400">Featured:</span> {n.featured ? 'Ja' : 'Nein'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-slate-900 rounded-xl border border-slate-700 p-4">
              <h3 className="text-xl font-semibold mb-3">{editing.id ? 'News bearbeiten' : 'Neue News'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="text-sm">
                  Titel
                  <input className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" value={editing.title}
                         onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                </label>
                <label className="text-sm">
                  Kategorie
                  <input className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" value={editing.category}
                         onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </label>
                <label className="text-sm md:col-span-2">
                  Beschreibung/Kurztext
                  <textarea className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" rows={3} value={editing.excerpt}
                            onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
                </label>
                <label className="text-sm md:col-span-2">
                  Inhalt (optional, Markdown oder Text)
                  <textarea className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" rows={8} value={editing.content ?? ''}
                            onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
                </label>
                <label className="text-sm">
                  Datum
                  <input type="date" className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                         value={editing.date.slice(0,10)}
                         onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
                </label>
                <label className="text-sm">
                  Lesezeit
                  <input className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" value={editing.readTime}
                         onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} />
                </label>
                <label className="text-sm md:col-span-2">
                  Bild-URL (öffentlich)
                  <input className="mt-1 w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" value={editing.image}
                         onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
                </label>
                <label className="text-sm flex items-center gap-2 md:col-span-2">
                  <input type="checkbox" checked={editing.featured}
                         onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  Featured
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700">Abbrechen</button>
                <button onClick={() => saveItem(editing)} className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600">Speichern</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
