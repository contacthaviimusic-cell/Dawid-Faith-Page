"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsItem } from '@/types/news';

type FormState = Omit<NewsItem, 'id'> & { id?: string };

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<FormState | null>(null);
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
              <div key={n.id} className="p-4 bg-black/30 border border-slate-800 rounded flex items-start gap-4">
                <img src={n.image} alt="" className="w-24 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {n.featured && <span className="text-yellow-400">★</span>}
                    <h2 className="font-semibold">{n.title}</h2>
                  </div>
                  <div className="text-sm text-slate-400">{n.category} · {new Date(n.date).toLocaleDateString('de-DE')} · {n.readTime}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing({ ...n })} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Bearbeiten</button>
                  <button onClick={() => deleteItem(n.id)} className="px-3 py-1 rounded bg-red-700 hover:bg-red-600">Löschen</button>
                </div>
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
