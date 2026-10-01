import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/adminSession';

// Einmalig aufrufen, um alle Tabellen für die Neon-Migration anzulegen.
// Alle Statements sind idempotent (IF NOT EXISTS) – mehrfaches Aufrufen ist
// gefahrlos und löscht/überschreibt nie bestehende Daten. Der Neon-HTTP-
// Treiber führt pro Aufruf genau ein Statement aus, daher einzeln nacheinander.
export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_singles (
        id text PRIMARY KEY,
        title text NOT NULL,
        cover_image text NOT NULL DEFAULT '',
        teaser_video text NOT NULL DEFAULT '',
        audio_release_date text NOT NULL DEFAULT '',
        video_release_date text NOT NULL DEFAULT '',
        presave_url text NOT NULL DEFAULT '',
        skip_presave boolean NOT NULL DEFAULT false,
        discount_code text NOT NULL DEFAULT '',
        preorder_price text NOT NULL DEFAULT '',
        bandcamp_url text NOT NULL DEFAULT '',
        streaming_url text NOT NULL DEFAULT '',
        audio_file_url text NOT NULL DEFAULT '',
        premiere_video_url text NOT NULL DEFAULT '',
        premiere_reveal_hours text NOT NULL DEFAULT '',
        active boolean NOT NULL DEFAULT true,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_giveaway_entries (
        id text PRIMARY KEY,
        song_id text NOT NULL,
        email text NOT NULL,
        location text NOT NULL DEFAULT '',
        language text NOT NULL DEFAULT 'de',
        device_fingerprint text NOT NULL DEFAULT '',
        token text NOT NULL UNIQUE,
        clicked_at timestamptz,
        unsubscribed boolean NOT NULL DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_giveaway_entries_song ON site_giveaway_entries (song_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_giveaway_entries_email ON site_giveaway_entries (song_id, email)`;

    await sql`
      CREATE TABLE IF NOT EXISTS site_giveaway_winners (
        id text PRIMARY KEY,
        song_id text NOT NULL,
        prize_type text NOT NULL,
        entry_id text NOT NULL,
        email text NOT NULL,
        drawn_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_giveaway_winners_song ON site_giveaway_winners (song_id)`;

    await sql`
      CREATE TABLE IF NOT EXISTS site_newsletter_subscribers (
        id text PRIMARY KEY,
        email text NOT NULL UNIQUE,
        location text NOT NULL DEFAULT '',
        language text NOT NULL DEFAULT 'de',
        subscribed_at timestamptz NOT NULL DEFAULT now(),
        ip_address text NOT NULL DEFAULT '',
        user_agent text NOT NULL DEFAULT ''
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_news_items (
        id text PRIMARY KEY,
        title text NOT NULL,
        excerpt text NOT NULL,
        title_en text,
        title_pl text,
        excerpt_en text,
        excerpt_pl text,
        content text,
        content_en text,
        content_pl text,
        date text NOT NULL,
        read_time text NOT NULL DEFAULT '',
        category text NOT NULL DEFAULT '',
        image text NOT NULL DEFAULT '',
        gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
        featured boolean NOT NULL DEFAULT false
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_action_clicks (
        id text PRIMARY KEY,
        song_id text NOT NULL,
        action text NOT NULL,
        clicked_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_action_clicks_song ON site_action_clicks (song_id)`;

    await sql`
      CREATE TABLE IF NOT EXISTS site_platform_clicks (
        id text PRIMARY KEY,
        song_id text NOT NULL,
        platform text NOT NULL,
        clicked_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_platform_clicks_song ON site_platform_clicks (song_id)`;

    await sql`
      CREATE TABLE IF NOT EXISTS site_unsubscribe_log (
        id text PRIMARY KEY,
        email text NOT NULL,
        matched_newsletter boolean NOT NULL DEFAULT false,
        matched_giveaway_count integer NOT NULL DEFAULT 0,
        requested_at timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_outreach (
        id text PRIMARY KEY,
        label text NOT NULL,
        sent_to text NOT NULL DEFAULT '',
        note text NOT NULL DEFAULT '',
        created_at timestamptz NOT NULL DEFAULT now(),
        clicks integer NOT NULL DEFAULT 0,
        first_click_at timestamptz,
        last_click_at timestamptz
      )
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin db-setup]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Interner Fehler.' },
      { status: 500 }
    );
  }
}
