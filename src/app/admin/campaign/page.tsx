'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Trash2, Upload } from 'lucide-react';

interface CampaignRecipient {
  id: string;
  email: string;
  source: string;
  note: string;
  createdAt: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export default function AdminCampaignPage() {
  const [recipients, setRecipients] = useState<CampaignRecipient[]>([]);
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState('');

  const [manualEmail, setManualEmail] = useState('');

  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [useBuchListe, setUseBuchListe] = useState(true);
  const [useNewsletter, setUseNewsletter] = useState(false);

  const [sending, setSending] = useState(false);
  const [sendProgress, setSendProgress] = useState<{ sent: number; total: number } | null>(null);
  const [sendError, setSendError] = useState('');
  const [sendDone, setSendDone] = useState(false);

  const router = useRouter();

  async function fetchAll() {
    setLoading(true);
    const [recRes, nlRes] = await Promise.all([
      fetch('/api/admin/campaign/recipients', { cache: 'no-store' }),
      fetch('/api/newsletter', { cache: 'no-store' }),
    ]);
    if (recRes.status === 401 || nlRes.status === 401) {
      router.replace('/admin/login');
      return;
    }
    if (recRes.ok) setRecipients(await recRes.json());
    if (nlRes.ok) {
      const subs: NewsletterSubscriber[] = await nlRes.json();
      setNewsletterCount(subs.length);
      setNewsletterEmails(subs.map((s) => s.email));
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (!me.ok) { router.replace('/admin/login'); return; }
      await fetchAll();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buchListe = recipients.filter((r) => r.source === 'buch');

  async function handleImport() {
    const emails = importText
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter(Boolean);
    if (emails.length === 0) return;
    setImporting(true);
    setImportResult('');
    const res = await fetch('/api/admin/campaign/recipients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails, source: 'buch', note: 'Import aus Konzert-Buch' }),
    });
    const data = await res.json().catch(() => ({}));
    setImporting(false);
    if (!res.ok) {
      setImportResult(data.error ?? 'Fehler beim Import.');
      return;
    }
    setImportResult(`${data.added} hinzugefügt, ${data.skipped} übersprungen (ungültig oder bereits vorhanden).`);
    setImportText('');
    await fetchAll();
  }

  async function handleManualAdd() {
    if (!manualEmail.trim()) return;
    const res = await fetch('/api/admin/campaign/recipients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: [manualEmail], source: 'buch', note: 'Manuell ergänzt' }),
    });
    if (res.ok) {
      setManualEmail('');
      await fetchAll();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Diesen Eintrag wirklich löschen?')) return;
    const res = await fetch(`/api/admin/campaign/recipients/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchAll();
  }

  async function handleSend() {
    if (!subject.trim() || !text.trim()) return;
    const emails = new Set<string>();
    if (useBuchListe) buchListe.forEach((r) => emails.add(r.email));
    if (useNewsletter) newsletterEmails.forEach((e) => emails.add(e));
    const list = Array.from(emails);
    if (list.length === 0) return;
    if (!confirm(`Kampagne wirklich an ${list.length} Empfänger senden?`)) return;

    setSending(true);
    setSendDone(false);
    setSendError('');
    setSendProgress({ sent: 0, total: list.length });

    let offset = 0;
    let totalSent = 0;
    try {
      while (offset < list.length) {
        const res = await fetch('/api/admin/campaign/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, text, emails: list, offset }),
        });
        const data = await res.json();
        if (!res.ok) {
          setSendError(data.error ?? 'Fehler beim Versand.');
          break;
        }
        totalSent += data.sent;
        offset = data.nextOffset;
        setSendProgress({ sent: totalSent, total: list.length });
        if (data.done) {
          setSendDone(true);
          break;
        }
      }
    } catch {
      setSendError('Verbindung unterbrochen. Bitte Fortschritt prüfen und ggf. erneut senden.');
    } finally {
      setSending(false);
    }
  }

  const selectedCount =
    (useBuchListe ? buchListe.length : 0) +
    (useNewsletter ? newsletterEmails.filter((e) => !useBuchListe || !buchListe.some((r) => r.email === e)).length : 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/singles" className="text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Mail-Kampagnen
            </h1>
            <p className="text-gray-400 mt-1">
              Buch-Liste verwalten und E-Mail-Kampagnen versenden. Gewinnspiel-Teilnehmer sind hier bewusst
              nicht enthalten, da sie nur der Gewinnspiel-Teilnahme zugestimmt haben.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        ) : (
          <>
            {/* Buch-Liste */}
            <section className="mb-10 p-5 rounded-2xl border border-slate-700 bg-slate-900/40">
              <h2 className="text-lg font-bold mb-1">📖 Buch-Liste (Konzerte)</h2>
              <p className="text-sm text-gray-400 mb-4">{buchListe.length} Einträge</p>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Liste importieren (eine Mail pro Zeile, oder mit Komma getrennt)</label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows={5}
                  placeholder={'max@example.com\nanna@example.com'}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <button
                  onClick={handleImport}
                  disabled={importing || !importText.trim()}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-sm font-semibold disabled:opacity-50 transition-all"
                >
                  <Upload size={14} />
                  {importing ? 'Importiere…' : 'Importieren'}
                </button>
                {importResult && <p className="text-sm text-gray-400 mt-2">{importResult}</p>}
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="einzelne@email.de manuell ergänzen"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  onClick={handleManualAdd}
                  disabled={!manualEmail.trim()}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-semibold disabled:opacity-50 transition-all"
                >
                  Hinzufügen
                </button>
              </div>

              {buchListe.length > 0 && (
                <div className="max-h-52 overflow-y-auto space-y-1">
                  {buchListe.map((r) => (
                    <div key={r.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/30 text-sm">
                      <span className="text-gray-300 truncate">{r.email}</span>
                      <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 flex-shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Kampagne verfassen */}
            <section className="p-5 rounded-2xl border border-amber-500/30 bg-amber-900/10">
              <h2 className="text-lg font-bold mb-4">✉️ Kampagne verfassen</h2>

              <label className="block text-sm text-gray-300 mb-1">Betreff</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Katze kommt bald – für dich, weil du dabei warst"
                className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <label className="block text-sm text-gray-300 mb-1">
                Text (Absätze durch Leerzeile trennen, **fett**, [Linktext](url), 👉 [Linktext](url) für einen Button)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />

              <div className="flex flex-col gap-2 mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" checked={useBuchListe} onChange={(e) => setUseBuchListe(e.target.checked)} className="w-4 h-4 accent-amber-500" />
                  Buch-Liste ({buchListe.length})
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" checked={useNewsletter} onChange={(e) => setUseNewsletter(e.target.checked)} className="w-4 h-4 accent-amber-500" />
                  Newsletter-Abonnenten ({newsletterCount})
                </label>
              </div>

              <p className="text-sm text-gray-400 mb-4">Empfänger insgesamt (dedupliziert): {selectedCount}</p>

              <button
                onClick={handleSend}
                disabled={sending || !subject.trim() || !text.trim() || selectedCount === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-semibold text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
                {sending ? 'Sende…' : 'Kampagne senden'}
              </button>

              {sendProgress && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all"
                      style={{ width: `${(sendProgress.sent / sendProgress.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {sendProgress.sent} / {sendProgress.total} gesendet
                    {sendDone && ' — fertig!'}
                  </p>
                </div>
              )}
              {sendError && <p className="text-red-400 text-sm mt-3">{sendError}</p>}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
