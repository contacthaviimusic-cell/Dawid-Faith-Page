"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me', { cache: 'no-store' });
      if (me.ok) router.replace('/admin/news');
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Login fehlgeschlagen');
      router.push('/admin/news');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
        <label className="block text-sm text-gray-300 mb-2">Passwort</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Admin Passwort"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded font-semibold hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Einloggen…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
