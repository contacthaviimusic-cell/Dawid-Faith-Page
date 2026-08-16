'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { ALL_SOURCES, PLATFORMS, type Source } from '@/lib/platformSources';

interface PlatformClick {
  id: string;
  songId: string;
  platform: Source;
  clickedAt: string;
}

const SOURCE_LABELS: Record<Source, string> = {
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  website: 'Website',
};

const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL ?? 'https://dawidfaith.de';

function formatDay(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function emptySourceRecord(): Record<Source, number> {
  return { youtube: 0, facebook: 0, tiktok: 0, instagram: 0, website: 0 };
}

export default function SingleStatsPage() {
  const params = useParams<{ id: string }>();
  const songId = params?.id;
  const [clicks, setClicks] = useState<PlatformClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) { router.replace('/admin/login'); return; }
      if (!songId) return;

      const res = await fetch(`/api/admin/platform-clicks?songId=${encodeURIComponent(songId)}`, { cache: 'no-store' });
      if (res.status === 401) { router.replace('/admin/login'); return; }
      if (res.ok) {
        setClicks(await res.json());
        setError(null);
      } else {
        setError('Konnte Statistik nicht laden.');
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songId]);

  function copyLink(platform: string) {
    const url = `${BASE_URL}/api/track/${songId}/${platform}`;
    navigator.clipboard.writeText(url);
    setCopied(platform);
    setTimeout(() => setCopied(null), 2000);
  }

  const totalsBySource: Record<Source, number> = emptySourceRecord();
  const byDay: Record<string, Record<Source, number>> = {};

  for (const click of clicks) {
    totalsBySource[click.platform]++;
    const dayKey = click.clickedAt.slice(0, 10); // YYYY-MM-DD
    if (!byDay[dayKey]) {
      byDay[dayKey] = emptySourceRecord();
    }
    byDay[dayKey][click.platform]++;
  }

  const days = Object.keys(byDay).sort((a, b) => (a < b ? 1 : -1));
  const totalClicks = clicks.length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/singles" className="text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Klick-Statistik: {songId}
            </h1>
            <p className="text-gray-400 mt-1">
              Poste die passenden Links auf den jeweiligen Plattformen, um zu sehen, wie viele Leute darüber
              auf die Pre-Order-Seite kommen. &bdquo;Website&ldquo; zählt Besucher, die direkt über deine Seite
              (ohne einen dieser Links) auf die Pre-Order-Seite gekommen sind.
            </p>
          </div>
        </div>

        {/* Tracking links */}
        <div className="mb-8 space-y-3">
          {PLATFORMS.map((key) => {
            const url = `${BASE_URL}/api/track/${songId}/${key}`;
            return (
              <div key={key} className="p-4 rounded-xl border border-slate-700 bg-slate-900/40">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-white w-24">{SOURCE_LABELS[key]}</span>
                  <span className="flex-1 min-w-0 text-xs text-gray-500 font-mono truncate bg-black/40 px-3 py-1.5 rounded-lg border border-slate-800">
                    {url}
                  </span>
                  <button
                    onClick={() => copyLink(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm transition-all flex-shrink-0"
                  >
                    {copied === key ? (
                      <><Check size={14} className="text-green-400" /> Kopiert!</>
                    ) : (
                      <><Copy size={14} /> Kopieren</>
                    )}
                  </button>
                  <span className="text-amber-400 font-bold text-sm flex-shrink-0 w-16 text-right">
                    {totalsBySource[key]}×
                  </span>
                </div>
              </div>
            );
          })}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-stone-300 w-24">Website</span>
              <span className="flex-1 min-w-0 text-xs text-gray-500">
                Direkte Besucher der Pre-Order-Seite ohne Tracking-Link (z. B. über die Startseite).
              </span>
              <span className="text-amber-400 font-bold text-sm flex-shrink-0 w-16 text-right">
                {totalsBySource.website}×
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : totalClicks === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Noch keine Klicks.</p>
            <p className="text-sm mt-1">Poste die Links oben, sobald du bereit bist.</p>
          </div>
        ) : (
          <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-600/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600/20 bg-gray-800/30 text-gray-300">
                    <th className="text-left font-semibold px-4 py-3">Datum</th>
                    {ALL_SOURCES.map((key) => (
                      <th key={key} className="text-right font-semibold px-4 py-3">{SOURCE_LABELS[key]}</th>
                    ))}
                    <th className="text-right font-semibold px-4 py-3">Gesamt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600/10">
                  {days.map((day) => {
                    const row = byDay[day];
                    const rowTotal = ALL_SOURCES.reduce((sum, key) => sum + row[key], 0);
                    return (
                      <tr key={day} className="hover:bg-gray-800/20 transition-colors">
                        <td className="px-4 py-3 text-gray-300">{formatDay(day)}</td>
                        {ALL_SOURCES.map((key) => (
                          <td key={key} className="px-4 py-3 text-right text-gray-400">
                            {row[key] || '—'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right font-bold text-amber-400">{rowTotal}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-600/20 bg-gray-800/30 font-bold">
                    <td className="px-4 py-3 text-white">Gesamt</td>
                    {ALL_SOURCES.map((key) => (
                      <td key={key} className="px-4 py-3 text-right text-white">{totalsBySource[key]}</td>
                    ))}
                    <td className="px-4 py-3 text-right text-amber-400">{totalClicks}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
