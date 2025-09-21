export type NewsItem = {
  id: string;
  // Default/original fields (can be German)
  title: string;
  excerpt: string;
  // Optional localized fields
  title_en?: string;
  title_pl?: string;
  excerpt_en?: string;
  excerpt_pl?: string;
  // Optional localized full content
  content?: string; // Volltext für Modal (default/original)
  content_en?: string;
  content_pl?: string;
  date: string; // ISO string
  readTime: string; // e.g., "3 min"
  category: string; // e.g., "Musik Release", "Blockchain", "Events"
  image: string; // Hauptbild - public path, e.g., "/dawid-faith-bg.jpg"
  gallery?: string[]; // Zusätzliche Bilder für die Galerie
  featured: boolean;
};

export type NewsCreateInput = Omit<NewsItem, 'id'>;
export type NewsUpdateInput = Partial<Omit<NewsItem, 'id'>> & { id: string };