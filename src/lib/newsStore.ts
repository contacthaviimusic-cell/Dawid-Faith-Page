import { sql } from './db';
import { NewsItem, NewsCreateInput, NewsUpdateInput } from '@/types/news';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToNews(r: any): NewsItem {
  return {
    id: r.id,
    title: r.title,
    excerpt: r.excerpt,
    title_en: r.title_en ?? undefined,
    title_pl: r.title_pl ?? undefined,
    excerpt_en: r.excerpt_en ?? undefined,
    excerpt_pl: r.excerpt_pl ?? undefined,
    content: r.content ?? undefined,
    content_en: r.content_en ?? undefined,
    content_pl: r.content_pl ?? undefined,
    date: r.date,
    readTime: r.read_time,
    category: r.category,
    image: r.image,
    gallery: Array.isArray(r.gallery) ? r.gallery : undefined,
    featured: r.featured,
  };
}

function seedItems(): NewsItem[] {
  const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return [
    {
      id: genId(),
      title: "Neue Single 'Digital Dreams' ab sofort verfügbar",
      excerpt:
        "Dawid Faith's neuester Track kombiniert futuristische Beats mit emotionalen Vocals und nimmt dich mit auf eine Reise durch die digitale Zukunft.",
      date: '2024-12-15',
      readTime: '3 min',
      category: 'Musik Release',
      image: '/dawid-faith-bg.jpg',
      featured: true,
    },
    {
      id: genId(),
      title: 'D.INVEST Token Launch - Frühe Investoren gesucht',
      excerpt:
        'Werde Teil der Revolution! Die ersten 1000 Token-Inhaber erhalten exklusive Vorteile und lebenslangen VIP-Zugang zu allen Events.',
      date: '2024-12-10',
      readTime: '5 min',
      category: 'Blockchain',
      image: '/dinvest-token.png',
      featured: false,
    },
    {
      id: genId(),
      title: 'Exklusives Live-Konzert in Berlin angekündigt',
      excerpt:
        'Das erste Live-Konzert im neuen Jahr wird ein unvergessliches Erlebnis mit 360°-Sound, holographischen Visuals und Überraschungsgästen.',
      date: '2024-12-08',
      readTime: '4 min',
      category: 'Events',
      image: '/dawid-faith.jpg',
      featured: false,
    },
  ];
}

async function insertNews(item: NewsItem): Promise<void> {
  await sql`
    INSERT INTO site_news_items (
      id, title, excerpt, title_en, title_pl, excerpt_en, excerpt_pl,
      content, content_en, content_pl, date, read_time, category, image, gallery, featured
    ) VALUES (
      ${item.id}, ${item.title}, ${item.excerpt}, ${item.title_en ?? null}, ${item.title_pl ?? null},
      ${item.excerpt_en ?? null}, ${item.excerpt_pl ?? null}, ${item.content ?? null},
      ${item.content_en ?? null}, ${item.content_pl ?? null}, ${item.date}, ${item.readTime},
      ${item.category}, ${item.image}, ${JSON.stringify(item.gallery ?? [])}, ${item.featured}
    )
  `;
}

export async function getAllNews(): Promise<NewsItem[]> {
  const rows = await sql`SELECT * FROM site_news_items`;
  if (rows.length === 0) {
    const seed = seedItems();
    for (const item of seed) await insertNews(item);
    return seed.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return rows.map(rowToNews).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function createNews(input: NewsCreateInput): Promise<NewsItem> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const item: NewsItem = { id, ...input };
  await insertNews(item);
  return item;
}

export async function updateNews(update: NewsUpdateInput): Promise<NewsItem | null> {
  const rows = await sql`SELECT * FROM site_news_items WHERE id = ${update.id}`;
  if (rows.length === 0) return null;
  const merged: NewsItem = { ...rowToNews(rows[0]), ...update };

  await sql`
    UPDATE site_news_items SET
      title = ${merged.title},
      excerpt = ${merged.excerpt},
      title_en = ${merged.title_en ?? null},
      title_pl = ${merged.title_pl ?? null},
      excerpt_en = ${merged.excerpt_en ?? null},
      excerpt_pl = ${merged.excerpt_pl ?? null},
      content = ${merged.content ?? null},
      content_en = ${merged.content_en ?? null},
      content_pl = ${merged.content_pl ?? null},
      date = ${merged.date},
      read_time = ${merged.readTime},
      category = ${merged.category},
      image = ${merged.image},
      gallery = ${JSON.stringify(merged.gallery ?? [])},
      featured = ${merged.featured}
    WHERE id = ${update.id}
  `;
  return merged;
}

export async function deleteNews(id: string): Promise<boolean> {
  const rows = await sql`DELETE FROM site_news_items WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
