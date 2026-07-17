'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, MailX } from 'lucide-react';

export default function AbmeldenPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setError(data.error ?? 'Etwas ist schiefgelaufen. Bitte versuch es erneut.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Etwas ist schiefgelaufen. Bitte versuch es erneut.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <MailX className="text-amber-400" size={26} />
        </div>

        <h1 className="text-3xl font-black mb-3">Von E-Mails abmelden</h1>

        {status === 'success' ? (
          <p className="text-stone-300 leading-relaxed">
            Erledigt — deine E-Mail-Adresse wurde aus dem Newsletter und von künftigen Gewinnspiel-Updates entfernt.
          </p>
        ) : (
          <>
            <p className="text-stone-400 leading-relaxed mb-8">
              Trag deine E-Mail-Adresse ein, um dich von allen Updates (Newsletter und Gewinnspiel-Benachrichtigungen)
              abzumelden. Bereits gewonnene Preise oder laufende Gewinnspiel-Teilnahmen sind davon nicht betroffen.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                required
                disabled={submitting}
                className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
              {status === 'error' && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Wird abgemeldet…' : 'Jetzt abmelden'}
              </button>
            </form>
          </>
        )}

        <div className="mt-10">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 text-sm transition-colors">
            Zur Startseite
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
