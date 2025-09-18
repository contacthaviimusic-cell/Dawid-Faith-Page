export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO string
  readTime: string; // e.g., "3 min"
  category: string; // e.g., "Musik Release", "Blockchain", "Events"
  image: string; // public path, e.g., "/dawid-faith-bg.jpg"
  featured: boolean;
};

export type NewsCreateInput = Omit<NewsItem, 'id'>;
export type NewsUpdateInput = Partial<Omit<NewsItem, 'id'>> & { id: string };