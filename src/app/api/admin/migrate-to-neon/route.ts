import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/adminSession';

// Einmaliger Migrations-Endpoint: liest die bisherigen JSON-Dateien direkt aus
// dem (noch lesbaren) Blob-Store dieser Seite und importiert sie per Bulk-
// Insert in die neuen Neon-Tabellen. Nutzt ON CONFLICT DO NOTHING, damit ein
// erneuter Aufruf keine Duplikate erzeugt. Tabellen müssen vorher per
// /api/admin/db-setup angelegt worden sein.
const BLOB_BASE = 'https://qtzfhrzgik861bds.public.blob.vercel-storage.com';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchJson(path: string): Promise<any[]> {
  const res = await fetch(`${BLOB_BASE}/${path}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const summary: Record<string, number> = {};

  try {
    // ── singles ──────────────────────────────────────────────────────────
    const singles = await fetchJson('data/singles.json');
    for (const s of singles) {
      await sql`
        INSERT INTO site_singles (
          id, title, cover_image, teaser_video, audio_release_date, video_release_date,
          presave_url, skip_presave, discount_code, preorder_price, bandcamp_url,
          streaming_url, audio_file_url, premiere_video_url, premiere_reveal_hours,
          active, created_at, updated_at
        ) VALUES (
          ${s.id}, ${s.title}, ${s.coverImage ?? ''}, ${s.teaserVideo ?? ''},
          ${s.audioReleaseDate ?? ''}, ${s.videoReleaseDate ?? ''}, ${s.presaveUrl ?? ''},
          ${!!s.skipPresave}, ${s.discountCode ?? ''}, ${s.preorderPrice ?? ''},
          ${s.bandcampUrl ?? ''}, ${s.streamingUrl ?? ''}, ${s.audioFileUrl ?? ''},
          ${s.premiereVideoUrl ?? ''}, ${s.premiereRevealHours ?? ''}, ${!!s.active},
          ${s.createdAt ?? new Date().toISOString()}, ${s.updatedAt ?? new Date().toISOString()}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.singles = singles.length;

    // ── giveaway entries ─────────────────────────────────────────────────
    const entries = await fetchJson('data/giveaway.json');
    for (const e of entries) {
      await sql`
        INSERT INTO site_giveaway_entries (id, song_id, email, location, language, device_fingerprint, token, clicked_at, unsubscribed, created_at)
        VALUES (${e.id}, ${e.songId}, ${e.email}, ${e.location ?? ''}, ${e.language ?? 'de'}, ${e.deviceFingerprint ?? ''}, ${e.token}, ${e.clickedAt}, ${!!e.unsubscribed}, ${e.createdAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.giveaway_entries = entries.length;

    // ── giveaway winners ─────────────────────────────────────────────────
    const winners = await fetchJson('data/giveaway-winners.json');
    for (const w of winners) {
      await sql`
        INSERT INTO site_giveaway_winners (id, song_id, prize_type, entry_id, email, drawn_at)
        VALUES (${w.id}, ${w.songId}, ${w.prizeType}, ${w.entryId}, ${w.email}, ${w.drawnAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.giveaway_winners = winners.length;

    // ── newsletter subscribers ───────────────────────────────────────────
    const subs = await fetchJson('newsletter-subscribers.json');
    for (const s of subs) {
      await sql`
        INSERT INTO site_newsletter_subscribers (id, email, location, language, subscribed_at, ip_address, user_agent)
        VALUES (${s.id}, ${s.email}, ${s.location ?? ''}, ${s.language ?? 'de'}, ${s.subscribedAt}, ${s.ipAddress ?? ''}, ${s.userAgent ?? ''})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.newsletter_subscribers = subs.length;

    // ── news ─────────────────────────────────────────────────────────────
    const news = await fetchJson('data/news.json');
    for (const n of news) {
      await sql`
        INSERT INTO site_news_items (
          id, title, excerpt, title_en, title_pl, excerpt_en, excerpt_pl,
          content, content_en, content_pl, date, read_time, category, image, gallery, featured
        ) VALUES (
          ${n.id}, ${n.title}, ${n.excerpt}, ${n.title_en ?? null}, ${n.title_pl ?? null},
          ${n.excerpt_en ?? null}, ${n.excerpt_pl ?? null}, ${n.content ?? null},
          ${n.content_en ?? null}, ${n.content_pl ?? null}, ${n.date}, ${n.readTime ?? ''},
          ${n.category ?? ''}, ${n.image ?? ''}, ${JSON.stringify(n.gallery ?? [])}, ${!!n.featured}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.news_items = news.length;

    // ── unsubscribe log ──────────────────────────────────────────────────
    const unsubs = await fetchJson('data/unsubscribe-log.json');
    for (const u of unsubs) {
      await sql`
        INSERT INTO site_unsubscribe_log (id, email, matched_newsletter, matched_giveaway_count, requested_at)
        VALUES (${u.id}, ${u.email}, ${!!u.matchedNewsletter}, ${u.matchedGiveawayCount ?? 0}, ${u.requestedAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.unsubscribe_log = unsubs.length;

    // ── outreach ─────────────────────────────────────────────────────────
    const outreach = await fetchJson('data/outreach.json');
    for (const o of outreach) {
      await sql`
        INSERT INTO site_outreach (id, label, sent_to, note, created_at, clicks, first_click_at, last_click_at)
        VALUES (${o.id}, ${o.label}, ${o.sentTo ?? ''}, ${o.note ?? ''}, ${o.createdAt}, ${o.clicks ?? 0}, ${o.firstClickAt}, ${o.lastClickAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.outreach = outreach.length;

    // ── action clicks ────────────────────────────────────────────────────
    const actionClicks = await fetchJson('data/action-clicks.json');
    for (const c of actionClicks) {
      await sql`
        INSERT INTO site_action_clicks (id, song_id, action, clicked_at)
        VALUES (${c.id}, ${c.songId}, ${c.action}, ${c.clickedAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.action_clicks = actionClicks.length;

    // ── platform clicks ──────────────────────────────────────────────────
    const platformClicks = await fetchJson('data/platform-clicks.json');
    for (const c of platformClicks) {
      await sql`
        INSERT INTO site_platform_clicks (id, song_id, platform, clicked_at)
        VALUES (${c.id}, ${c.songId}, ${c.platform}, ${c.clickedAt})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    summary.platform_clicks = platformClicks.length;

    return NextResponse.json({ success: true, summary });
  } catch (err) {
    console.error('[admin migrate-to-neon]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Interner Fehler.', summary },
      { status: 500 }
    );
  }
}
