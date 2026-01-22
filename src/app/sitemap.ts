import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dawidfaith.de', // Hier DEINE echte URL einfügen
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}