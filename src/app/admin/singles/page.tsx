"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SingleConfig {
  id: string;
  title: string;
  coverImage: string;
  teaserVideo: string;
  audioReleaseDate: string;
  videoReleaseDate: string;
  presaveUrl: string;
  discountCode: string;
  preorderPrice: string;
  bandcampUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

type FormState = Omit<SingleConfig, 'createdAt' | 'updatedAt'> & { isNew?: boolean };

function isoToLocal(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function localToIso(local: string): string {
  if (!local) return '';
  const d = new Date(local);
  return isNaN(d.getTime()) ? '' : d.toISOString();
}

export default function AdminSinglesPage() {
  const [items, setItems] = useState<SingleConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const router = useRouter();

  async function fetchSingles() {
    setLoading(true);
    const res = await fetch('/api/admin/singles', { cache: 'no-store' });
    if (res.ok) {
      setItems((await res.json()) as SingleConfig[]);
      setError(null);
    } else if (res.status === 401) {
      router.replace('/admin/login');
      return;
    } else {
      setError('Konnte Singles nicht laden');
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) {
        router.replace('/admin/login');
        return;
      }
      await fetchSingles();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyForm: FormState = useMemo(
    () => ({
      isNew: true,
      id: '',
      title: '',
      coverImage: '',
      teaserVideo: '',
      audioReleaseDate: '',
      videoReleaseDate: '',
      presaveUrl: '',
      discountCode: '',
      preorderPrice: '',
      bandcampUrl: '',
      active: true,
    }),
    []
  );

  async function saveItem(form: FormState) {
    setSaving(true);
    const method = form.isNew ? 'POST' : 'PUT';
    const url = form.isNew ? '/api/admin/singles' : `/api/admin/singles/${form.id}`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form.id,
        title: form.title,
        coverImage: form.coverImage,
        teaserVideo: form.teaserVideo,
        audioReleaseDate: form.audioReleaseDate,
        videoReleaseDate: form.videoReleaseDate,
        presaveUrl: form.presaveUrl,
        discountCode: form.discountCode,
        preorderPrice: form.preorderPrice,
        bandcampUrl: form.bandcampUrl,
        active: form.active,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      if (res.status === 401) {
        router.push('/admin/login');
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? 'Fehler beim Speichern');
      }
      return;
    }
    setEditing(null);
    await fetchSingles();
  }

  async function deleteItem(id: string) {
    if (!confirm('Diese Single wirklich löschen?')) return;
    const res = await fetch(`/api/admin/singles/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      if (res.status === 401) router.push('/admin/login');
      else alert('Fehler beim Löschen');
      return;
    }
    await fetchSingles();
  }

  async function uploadCover(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (!res.ok) {
      alert('Upload fehlgeschlagen');
      return;
    }
    const data = await res.json();
    setEditing((prev) => (prev ? { ...prev, coverImage: data.url } : prev));
  }

  async function uploadTeaserVideo(file: File) {
    setUploadingVideo(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploadingVideo(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? 'Upload fehlgeschlagen');
      return;
    }
    const data = await res.json();
    setEditing((prev) => (prev ? { ...prev, teaserVideo: data.url } : prev));
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function field(
    label: string,
    value: string,
    onChange: (v: string) => void,
    props?: { type?: string; placeholder?: string; hint?: string }
  ) {
    return (
      <label className="block">
        <span className="block text-sm text-slate-300 mb-1">{label}</span>
        <input
          type={props?.type ?? 'text'}
          value={value}
          placeholder={props?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        {props?.hint && <span className="block text-xs text-slate-500 mt-1">{props.hint}</span>}
      </label>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Singles / Pre-Order Admin</h1>
          <button onClick={logout} className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700">Logout</button>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setEditing(emptyForm)}
            className="px-4 py-2 rounded bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold"
          >
            + Neue Single
          </button>
          <button
            onClick={() => router.push('/admin/news')}
            className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700"
          >
            📰 News Admin
          </button>
        </div>

        {loading ? (
          <p>Lade…</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : items.length === 0 && !editing ? (
          <p className="text-slate-400">Noch keine Singles angelegt.</p>
        ) : (
          <div className="space-y-3">
            {items.map((s) => (
              <div key={s.id} className="p-4 bg-black/30 border border-slate-800 rounded">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${s.active ? 'bg-green-400' : 'bg-slate-600'}`} />
                      <h2 className="font-semibold">{s.title}</h2>
                      <span className="text-xs text-slate-500">({s.id})</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Audio: {s.audioReleaseDate ? new Date(s.audioReleaseDate).toLocaleString('de-DE') : '–'} ·
                      Video: {s.videoReleaseDate ? new Date(s.videoReleaseDate).toLocaleString('de-DE') : '–'} ·
                      Preis: {s.preorderPrice ? `${s.preorderPrice} €` : '–'} ·
                      Bandcamp: {s.bandcampUrl ? '✓' : '✗'}
                    </div>
                  </div>
                  <a
                    href={`/pre-order/${s.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sm"
                  >
                    Seite öffnen
                  </a>
                  <button
                    onClick={() => setEditing({ ...s, isNew: false })}
                    className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-sm"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => deleteItem(s.id)}
                    className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-600 text-sm"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div className="mt-8 p-5 bg-black/40 border border-amber-500/30 rounded-lg">
            <h2 className="text-lg font-bold mb-4">
              {editing.isNew ? 'Neue Single anlegen' : `„${editing.title}" bearbeiten`}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {editing.isNew &&
                field('Song-ID', editing.id, (v) => setEditing({ ...editing, id: v }), {
                  placeholder: 'z.B. katze',
                  hint: 'Nur Buchstaben, Zahlen, - und _. Muss zur Song-ID der Musik-Sektion passen. Ergibt die URL /pre-order/<ID>.',
                })}
              {field('Titel', editing.title, (v) => setEditing({ ...editing, title: v }), { placeholder: 'z.B. Katze' })}

              <div>
                {field('Cover-Bild (URL)', editing.coverImage, (v) => setEditing({ ...editing, coverImage: v }))}
                <label className="inline-block mt-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sm cursor-pointer">
                  {uploading ? 'Lädt hoch…' : '📤 Bild hochladen'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadCover(f);
                    }}
                  />
                </label>
              </div>
              <div>
                {field('Teaser-Video (URL)', editing.teaserVideo, (v) => setEditing({ ...editing, teaserVideo: v }), {
                  hint: 'MP4-URL für den Vollbild-Hintergrund (optional, sonst Cover-Bild). Max. 25MB.',
                })}
                <label className="inline-block mt-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sm cursor-pointer">
                  {uploadingVideo ? 'Lädt hoch…' : '📤 Video hochladen'}
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadTeaserVideo(f);
                    }}
                  />
                </label>
              </div>

              {field('Audio-Release', isoToLocal(editing.audioReleaseDate), (v) => setEditing({ ...editing, audioReleaseDate: localToIso(v) }), {
                type: 'datetime-local',
                hint: 'Bis dahin läuft der Countdown + Presave.',
              })}
              {field('Video-Release', isoToLocal(editing.videoReleaseDate), (v) => setEditing({ ...editing, videoReleaseDate: localToIso(v) }), {
                type: 'datetime-local',
                hint: 'Bis dahin ist Pre-Order möglich, danach „überall verfügbar".',
              })}

              {field('Presave-URL', editing.presaveUrl, (v) => setEditing({ ...editing, presaveUrl: v }), {
                placeholder: 'https://ffm.to/…',
                hint: 'Feature.fm/Presave-Link. Leer lassen = Presave-Karte ausblenden.',
              })}
              {field('Rabattcode', editing.discountCode, (v) => setEditing({ ...editing, discountCode: v }), {
                placeholder: 'z.B. PRESAVE20',
                hint: 'Wird nach „Ich habe presaved" angezeigt. Muss auf Bandcamp als Discount-Code angelegt sein.',
              })}

              {field('Pre-Order-Preis (€)', editing.preorderPrice, (v) => setEditing({ ...editing, preorderPrice: v }), {
                placeholder: 'z.B. 4.99',
                hint: 'Rein informativ – der tatsächliche Preis wird auf Bandcamp gepflegt.',
              })}
              {field('Bandcamp-Link', editing.bandcampUrl, (v) => setEditing({ ...editing, bandcampUrl: v }), {
                placeholder: 'https://dawidfaith.bandcamp.com/track/…',
                hint: 'Link zum Track/Album auf Bandcamp (MP3 + Musikvideo als Bonus-Item). Leer lassen = Pre-Order-Karte zeigt „Bald verfügbar".',
              })}
            </div>

            <label className="flex items-center gap-2 mt-4 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={editing.active}
                onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
              <span className="text-sm">Aktiv (öffentliche Seite erreichbar)</span>
            </label>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => saveItem(editing)}
                disabled={saving || !editing.title || (editing.isNew && !editing.id)}
                className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Speichert…' : 'Speichern'}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded bg-slate-800 hover:bg-slate-700"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
