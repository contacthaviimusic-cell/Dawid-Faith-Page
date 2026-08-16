export type Platform = 'youtube' | 'facebook' | 'tiktok' | 'instagram';

// 'website' ist keine postbare Plattform, sondern markiert Besucher, die direkt
// über die Website selbst (Hero, Musik-Sektion, News-Artikel) auf die
// Pre-Order-Seite gekommen sind, ohne einen der Tracking-Links zu nutzen.
export type Source = Platform | 'website';

export const PLATFORMS: Platform[] = ['youtube', 'facebook', 'tiktok', 'instagram'];
export const ALL_SOURCES: Source[] = [...PLATFORMS, 'website'];
