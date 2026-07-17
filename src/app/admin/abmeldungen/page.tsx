'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MailX } from 'lucide-react';

interface UnsubscribeLogEntry {
  id: string;
  email: string;
  matchedNewsletter: boolean;
  matchedGiveawayCount: number;
  requestedAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminAbmeldungenPage() {
  const [entries, setEntries] = useState<UnsubscribeLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) { router.replace('/admin/login'); return; }

      const res = await fetch('/api/admin/unsubscribe-log', { cache: 'no-store' });
      if (res.status === 401) { router.replace('/admin/login'); return; }
      if (res.ok) {
        setEntries(await res.json());
      } else {
        setError('Konnte Daten nicht laden.');
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unmatchedCount = entries.filter((e) => !e.matchedNewsletter && e.matchedGiveawayCount === 0).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/singles" className="text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Abmeldungen
            </h1>
            <p className="text-gray-400 mt-1">
              Alle über /abmelden eingegangenen Anfragen. Einträge ohne Treffer in Newsletter/Gewinnspiel
              stammen vermutlich aus deinem Fanbuch – dort bitte manuell austragen.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Noch keine Abmeldungen.</p>
          </div>
        ) : (
          <>
            {unmatchedCount > 0 && (
              <p className="text-sm text-amber-400 mb-4">
                {unmatchedCount} Abmeldung{unmatchedCount === 1 ? '' : 'en'} ohne Treffer in Newsletter/Gewinnspiel –
                vermutlich aus dem Fanbuch.
              </p>
            )}
            <div className="space-y-3">
              {entries.map((entry) => {
                const matched = entry.matchedNewsletter || entry.matchedGiveawayCount > 0;
                return (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-xl border ${
                      matched ? 'border-slate-700 bg-slate-900/40' : 'border-amber-500/40 bg-amber-900/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MailX size={18} className={matched ? 'text-gray-500' : 'text-amber-400'} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{entry.email}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formatDate(entry.requestedAt)}
                          {entry.matchedNewsletter && ' · aus Newsletter entfernt'}
                          {entry.matchedGiveawayCount > 0 && ` · ${entry.matchedGiveawayCount}× Gewinnspiel-Eintrag markiert`}
                          {!matched && ' · kein Treffer in unserem System'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
