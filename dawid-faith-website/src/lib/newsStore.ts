import fs from 'node:fs/promises';
import path from 'node:path';
import { put, list } from '@vercel/blob';
import { NewsItem, NewsCreateInput, NewsUpdateInput } from '@/types/news';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'news.json');
const BLOB_PATH = 'data/news.json';

function useBlob() {
  // Prefer blob in production/Vercel or when token is present
  return !!process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL === '1';
}

function seedItems(): NewsItem[] {
  const now = Date.now();
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

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    const seed: NewsItem[] = [];
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), 'utf8');
  }
}

export async function getAllNews(): Promise<NewsItem[]> {
  if (useBlob()) {
    // Try to find blob; if not present, initialize with empty array
    const blobs = await list({ prefix: BLOB_PATH });
    const existing = blobs.blobs.find((b) => b.pathname === BLOB_PATH);
    if (!existing) {
      await put(BLOB_PATH, JSON.stringify(seedItems(), null, 2), {
        access: 'public',
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return seedItems();
    }
    const res = await fetch(existing.url);
    const items = ((await res.json()) as NewsItem[]) || [];
    if (items.length === 0) {
      const seeded = seedItems();
      await put(BLOB_PATH, JSON.stringify(seeded, null, 2), {
        access: 'public',
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return seeded.sort((a, b) => (a.date < b.date ? 1 : -1));
    }
    return items.sort((a, b) => (a.date < b.date ? 1 : -1));
  } else {
    await ensureFile();
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    let items = JSON.parse(raw) as NewsItem[];
    if (!Array.isArray(items) || items.length === 0) {
      items = seedItems();
      await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
    }
    return items.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}

export async function createNews(input: NewsCreateInput): Promise<NewsItem> {
  const items = await getAllNews();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const item: NewsItem = { id, ...input };
  items.push(item);
  if (useBlob()) {
    await put(BLOB_PATH, JSON.stringify(items, null, 2), {
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  }
  return item;
}

export async function updateNews(update: NewsUpdateInput): Promise<NewsItem | null> {
  const items = await getAllNews();
  const idx = items.findIndex((n) => n.id === update.id);
  if (idx === -1) return null;
  const merged = { ...items[idx], ...update } as NewsItem;
  items[idx] = merged;
  if (useBlob()) {
    await put(BLOB_PATH, JSON.stringify(items, null, 2), {
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  }
  return merged;
}

export async function deleteNews(id: string): Promise<boolean> {
  const items = await getAllNews();
  const next = items.filter((n) => n.id !== id);
  const changed = next.length !== items.length;
  if (changed) {
    if (useBlob()) {
      await put(BLOB_PATH, JSON.stringify(next, null, 2), {
        access: 'public',
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } else {
      await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), 'utf8');
    }
  }
  return changed;
}