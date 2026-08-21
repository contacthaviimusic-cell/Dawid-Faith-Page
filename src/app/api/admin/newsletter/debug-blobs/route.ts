import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { isAdminAuthenticated } from '@/lib/adminSession';
import type { NewsletterSubscriber } from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

// Temporäres Diagnose-Tool: listet ALLE Blobs, deren Pfad mit
// "newsletter-subscribers" beginnt (inkl. eventueller Zufalls-Suffixe durch
// einen früheren addRandomSuffix-Bug), und zeigt pro Blob, wie viele
// Abonnenten darin stehen – um verlorene/verstreute Daten zu finden.
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { blobs } = await list({ prefix: 'newsletter-subscribers' });

  const details = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(`${b.url}?t=${Date.now()}`, { cache: 'no-store' });
        const data = res.ok ? await res.json() : null;
        const subs: NewsletterSubscriber[] = Array.isArray(data) ? data : [];
        return {
          pathname: b.pathname,
          uploadedAt: b.uploadedAt,
          size: b.size,
          count: subs.length,
          emails: subs.map((s) => s.email),
        };
      } catch (e) {
        return { pathname: b.pathname, uploadedAt: b.uploadedAt, size: b.size, error: String(e) };
      }
    })
  );

  return NextResponse.json({ blobCount: blobs.length, details });
}
