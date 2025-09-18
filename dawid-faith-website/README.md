# 🎵 Dawid Faith Website

Eine moderne, interaktive Website für den Künstler Dawid Faith mit integriertem News-Management-System und D.FAITH Ökosystem.

## ✨ Features

- **🎨 Modernes Design**: Gradient-basierte UI mit Framer Motion Animationen
- **📱 Responsive**: Optimiert für Desktop, Tablet und Mobile
- **📰 News-System**: Vollständiges CMS mit Admin-Panel
- **🔐 Admin-Bereich**: Sicherer Login und News-Verwaltung
- **🪙 Token-Integration**: D.FAITH und D.INVEST Token Showcase
- **⚡ Performance**: Next.js 15 mit Turbopack
- **☁️ Cloud-Ready**: Vercel Blob Storage für Produktion

## 🚀 Quick Start

### Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Website öffnen
open http://localhost:3000
```

### Admin-Zugang (Entwicklung)

1. Setze Umgebungsvariable:
   ```bash
   echo "ADMIN_SECRET=dein-admin-passwort" > .env.local
   ```

2. Öffne Admin-Panel:
   ```
   http://localhost:3000/admin/login
   ```

3. News verwalten:
   ```
   http://localhost:3000/admin/news
   ```

## 📁 Projekt-Struktur

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin-Bereich
│   │   ├── login/         # Admin Login
│   │   └── news/          # News-Verwaltung
│   ├── api/               # API Routes
│   │   ├── admin/         # Admin Auth APIs
│   │   └── news/          # News CRUD APIs
│   ├── whitepaper/        # Whitepaper Seite
│   └── page.tsx           # Hauptseite
├── components/            # React Components
│   ├── DFaithSection.tsx  # D.FAITH Ökosystem
│   ├── Navigation.tsx     # Header Navigation
│   ├── NewsSection.tsx    # News mit Modal
│   └── SocialMediaWidget.tsx
├── lib/                   # Utilities
│   ├── adminSession.ts    # Auth Helpers
│   └── newsStore.ts       # News Persistierung
├── types/                 # TypeScript Types
│   └── news.ts
└── middleware.ts          # Route Protection
```

## 🔧 Technologie-Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Pirata One (Google Fonts)
- **Storage**: Vercel Blob (Produktion) / JSON Files (Entwicklung)
- **Deployment**: Vercel Platform

## 📝 Admin-System

### Funktionen
- ✅ **Login/Logout** mit sicherer Cookie-Authentifizierung
- ✅ **News erstellen** mit Rich-Content-Unterstützung
- ✅ **News bearbeiten** und löschen
- ✅ **Featured-System** für hervorgehobene Artikel
- ✅ **Kategorien** mit automatischer Icon-Zuordnung
- ✅ **Responsive UI** für Mobile-Administration

### News-Kategorien
- **Musik Release** 🎵 - Neue Songs, Alben, Singles
- **Blockchain** ⭐ - Token-Updates, DeFi-News
- **Events** 🎧 - Konzerte, Live-Auftritte
- **Community** 👥 - Fan-Updates, Community-Events

Ausführliche Admin-Anleitung: [`ADMIN_README.md`](./ADMIN_README.md)

## 🌐 Deployment

### Vercel (Empfohlen)

1. **Repository verbinden**:
   ```bash
   vercel --prod
   ```

2. **Umgebungsvariablen setzen**:
   ```env
   ADMIN_SECRET=dein-sicheres-admin-passwort
   ```

3. **Automatisches Setup**:
   - Vercel Blob wird automatisch konfiguriert
   - Build und Deployment erfolgen automatisch

### Umgebungsvariablen

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `ADMIN_SECRET` | Admin-Passwort für Login | ✅ Ja |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob Token | 🔄 Auto (Vercel) |

## 🎨 Design-System

### Farbschema
- **Primary**: Purple (`purple-600`) zu Pink (`pink-600`) Gradients
- **Secondary**: Blue (`blue-600`) Akzente
- **Background**: Schwarz mit Slate (`slate-900`) Overlays
- **Text**: White, Gray (`gray-300`) für sekundäre Texte

### Typografie
- **Headings**: Pirata One (Display Font)
- **Body**: System Font Stack (Default)
- **Responsive**: `text-4xl md:text-6xl` Pattern

### Komponenten
- **Buttons**: Gradient mit Hover-Effekten
- **Cards**: Backdrop-blur mit Border-Gradients
- **Modals**: Full-screen Overlays mit Blur
- **Animations**: Framer Motion für smooth Transitions

## 🧪 Entwicklung

### Scripts
```bash
npm run dev        # Development Server
npm run build      # Production Build
npm run start      # Production Server
npm run lint       # ESLint Check
```

### Entwickler-Tools
- **Hot Reload**: Automatisch mit Turbopack
- **TypeScript**: Strikte Typisierung
- **ESLint**: Code-Qualität
- **Prettier**: Code-Formatierung (empfohlen)

### API-Endpunkte
```
GET    /api/news           # Alle News abrufen
POST   /api/news           # News erstellen (Auth)
PUT    /api/news/[id]      # News bearbeiten (Auth)
DELETE /api/news/[id]      # News löschen (Auth)

POST   /api/admin/login    # Admin Login
POST   /api/admin/logout   # Admin Logout
GET    /api/admin/me       # Auth Status prüfen
```

## 🔒 Sicherheit

- **Cookie-basierte Auth** mit HTTP-Only Cookies
- **Route Protection** via Middleware
- **Input Validation** für alle API-Endpunkte
- **CSRF Protection** durch SameSite Cookies
- **Secure Headers** in Produktion

## 📱 Responsive Breakpoints

```css
sm:   640px  # Kleine Tablets
md:   768px  # Tablets
lg:   1024px # Laptops
xl:   1280px # Desktops
2xl:  1536px # Große Screens
```

## 🤝 Contributing

1. **Fork** das Repository
2. **Feature Branch** erstellen: `git checkout -b feature/amazing-feature`
3. **Commit** Changes: `git commit -m 'Add amazing feature'`
4. **Push** to Branch: `git push origin feature/amazing-feature`
5. **Pull Request** öffnen

## 📄 Lizenz

© 2024 Dawid Faith. Alle Rechte vorbehalten.

---

**Built with ❤️ for the D.FAITH Community**

Für Admin-Anleitungen siehe: [`ADMIN_README.md`](./ADMIN_README.md)
