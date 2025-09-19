# News Component System

## Übersicht

Das News-System ist modular aufgebaut, um die Wartbarkeit und Übersichtlichkeit zu verbessern. Jede News hat ihre eigene Komponente mit spezifischen Details.

## Struktur

```
src/components/news/
├── index.tsx                    # Zentrale News-Detail-Renderer
├── NewsDetailContent.tsx        # [DEPRECATED] - Alt, wird durch modulares System ersetzt
├── ReleaseKonzertNews.tsx      # Release-Konzert Details
├── DInvestTokenNews.tsx        # D.INVEST Token Details
├── DFaithAppNews.tsx          # D.FAITH App Details
└── README.md                   # Diese Datei
```

## Neue News hinzufügen

### 1. News-Daten hinzufügen
Füge die News-Daten in `/data/news.json` hinzu:

```json
{
  "id": "unique-id-here",
  "title": "News Titel",
  "excerpt": "Kurze Beschreibung...",
  "date": "YYYY-MM-DD",
  "readTime": "X min",
  "category": "Events|Blockchain|Musik Release",
  "image": "/image-path.jpg",
  "featured": true|false
}
```

### 2. News-Komponente erstellen
Erstelle eine neue Datei in `src/components/news/`:

```tsx
// src/components/news/NeueNews.tsx
import React from 'react';

const NeueNews = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white mb-4">Titel</h3>
    <p className="text-gray-300 leading-relaxed">
      Detaillierte Beschreibung hier...
    </p>
    {/* Weitere Details... */}
  </div>
);

export default NeueNews;
```

### 3. Komponente registrieren
Füge die neue Komponente in `src/components/news/index.tsx` hinzu:

```tsx
// Import hinzufügen
import NeueNews from './NeueNews';

// In newsComponents Map hinzufügen
const newsComponents: Record<string, React.ComponentType> = {
  'existing-ids': ExistingComponents,
  'neue-news-id': NeueNews,  // ← Hier hinzufügen
};

// Export hinzufügen
export {
  // ... existing exports
  NeueNews,
};
```

## Aktuelle News-IDs

- `1758217302493-gbictm`: Release-Konzert Maria & Znikła
- `1758217302493-p9jwga`: D.INVEST Token Launch  
- `1758217302493-kix4d8`: D.FAITH App Launch

## Design-System

### Standard-Komponenten
- **Titel**: `text-2xl font-bold text-white mb-4`
- **Text**: `text-gray-300 leading-relaxed`
- **Info-Boxen**: `bg-slate-800/50 p-4 rounded-xl`
- **Feature-Boxen**: `bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20`
- **Tags**: `bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium`

### Grid-Layout
```tsx
<div className="grid md:grid-cols-2 gap-4">
  <div className="bg-slate-800/50 p-4 rounded-xl">
    {/* Content */}
  </div>
</div>
```

## Verwendung

Die News werden automatisch über `NewsDetailRenderer` in der `NewsSection.tsx` gerendert:

```tsx
import NewsDetailRenderer from '@/components/news';

// In Modal verwenden:
<NewsDetailRenderer article={selectedArticle} />
```

## Wartung

- **Neue News**: Folge den 3 Schritten oben
- **News bearbeiten**: Bearbeite die entsprechende Komponente
- **News löschen**: Entferne aus `news.json` und der `newsComponents` Map
- **Design ändern**: Aktualisiere die Komponenten-Templates

## Vorteile

✅ **Modular**: Jede News hat ihre eigene Komponente  
✅ **Wartbar**: Einfache Bearbeitung einzelner News  
✅ **Skalierbar**: Unbegrenzt viele News möglich  
✅ **Typsicher**: TypeScript-Unterstützung  
✅ **Konsistent**: Einheitliches Design-System  
✅ **Übersichtlich**: Klare Dateistruktur  