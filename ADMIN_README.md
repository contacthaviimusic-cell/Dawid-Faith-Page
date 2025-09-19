# 🎵 Dawid Faith Website - Admin Bereich

## 📋 Überblick

Diese Anleitung erklärt, wie du das Admin-Panel für die News-Verwaltung der Dawid Faith Website verwendest. Als Administrator kannst du News-Artikel erstellen, bearbeiten und löschen, die dann automatisch auf der Hauptseite angezeigt werden.

## 🚀 Erste Schritte

### 1. Admin-Login

Öffne in deinem Browser:
```
https://deine-website.vercel.app/admin/login
```

Gib das Admin-Passwort ein (siehe Umgebungsvariablen unten).

### 2. News-Verwaltung

Nach erfolgreichem Login wirst du automatisch zur News-Übersicht weitergeleitet:
```
https://deine-website.vercel.app/admin/news
```

## 📝 News-Artikel verwalten

### Neue News erstellen

1. Klicke auf **"+ Neue News"**
2. Fülle alle Felder aus:
   - **Titel**: Überschrift des Artikels
   - **Kategorie**: z.B. "Musik Release", "Blockchain", "Events", "Community"
   - **Beschreibung/Kurztext**: Kurze Zusammenfassung (wird in der Vorschau angezeigt)
   - **Datum**: Veröffentlichungsdatum
   - **Lesezeit**: z.B. "3 min", "5 min"
   - **Bild-URL**: Pfad zum Bild (z.B. `/dawid-faith-bg.jpg`)
   - **Featured**: Häkchen setzen für hervorgehobene Artikel
3. Klicke auf **"Speichern"**

### News bearbeiten

1. Klicke bei einem Artikel auf **"Bearbeiten"**
2. Ändere die gewünschten Felder
3. Klicke auf **"Speichern"**

### News löschen

1. Klicke bei einem Artikel auf **"Löschen"**
2. Bestätige die Löschung

### News-Details ansehen

In der Übersicht kannst du über den Button "Details" den vollständigen Inhalt und alle Metadaten eines Artikels ein- und ausklappen. So siehst du genau, was aktuell auf der Seite erscheint (Titel, Kategorie, Datum, Lesezeit, Bildpfad sowie der komplette Text-Inhalt).

## 🖼️ Bilder verwalten

### Verfügbare Bilder
Die folgenden Bilder sind bereits verfügbar:
- `/dawid-faith-bg.jpg` - Haupthintergrundbild
- `/dawid-faith.jpg` - Dawid Faith Portrait
- `/dfaith-token.png` - D.FAITH Token Logo
- `/dinvest-token.png` - D.INVEST Token Logo

### Neue Bilder hinzufügen
1. Lade Bilder in den `public/` Ordner hoch
2. Verwende den Pfad `/bildname.jpg` in der News

## 📱 Kategorien und Icons

Das System ordnet automatisch Icons zu:
- **"Musik Release"** / **"Musik"** → 🎵 Musik-Icon
- **"Blockchain"** → ⭐ Stern-Icon  
- **"Events"** → 🎧 Kopfhörer-Icon
- **"Community"** → 👥 Users-Icon
- **Andere** → ⭐ Standard Stern-Icon

## ⭐ Featured Artikel

- **Nur 1 Featured-Artikel** wird prominent auf der Startseite angezeigt
- **Featured-Artikel** erscheinen größer mit 2-spaltigem Layout
- **Normale Artikel** werden im Grid darunter angezeigt

## 🔧 Technische Details

### Datenspeicherung
- **Lokal (Entwicklung)**: Daten in `data/news.json`
- **Vercel (Produktion)**: Automatisch Vercel Blob Storage

### Admin-Authentifizierung
- Cookie-basierte Session
- 8 Stunden Gültigkeit
- Automatische Weiterleitung bei abgelaufener Session

## 🌐 Deployment auf Vercel

### Umgebungsvariablen einrichten

Setze diese Variablen in deinem Vercel Dashboard:

```env
ADMIN_SECRET=dein-sicheres-admin-passwort
BLOB_READ_WRITE_TOKEN=vercel-blob-token (automatisch von Vercel gesetzt)
```

### Deployment-Schritte

1. **Repository mit Vercel verbinden**
   ```bash
   # In deinem lokalen Projekt
   vercel --prod
   ```

2. **Umgebungsvariablen setzen**
   - Gehe zu Vercel Dashboard → Dein Projekt → Settings → Environment Variables
   - Füge `ADMIN_SECRET` hinzu mit einem sicheren Passwort
   - `BLOB_READ_WRITE_TOKEN` wird automatisch gesetzt

3. **Deployment überprüfen**
   - Teste `/admin/login` mit deinem Admin-Passwort
   - Erstelle eine Test-News im Admin-Panel
   - Prüfe, ob sie auf der Hauptseite erscheint

## 🔒 Sicherheit

### Passwort-Richtlinien
- Verwende ein starkes Admin-Passwort (min. 12 Zeichen)
- Kombiniere Buchstaben, Zahlen und Sonderzeichen
- Ändere das Passwort regelmäßig

### Admin-Zugang
- Nur vertrauenswürdige Personen sollten Admin-Zugang haben
- Logge dich immer aus, wenn du fertig bist
- Verwende keine öffentlichen Computer für Admin-Zugang

## 🆘 Fehlerbehebung

### "Unauthorized" Fehler
- **Problem**: Session abgelaufen oder falsches Passwort
- **Lösung**: Erneut unter `/admin/login` anmelden

### News erscheinen nicht auf der Hauptseite
- **Problem**: Möglicherweise caching oder Build-Fehler
- **Lösung**: 
  1. Browser-Cache leeren (Strg+F5)
  2. Warte 1-2 Minuten (Vercel Build-Zeit)
  3. Prüfe Browser-Entwicklertools auf Fehler

### Bilder werden nicht angezeigt
- **Problem**: Falscher Bildpfad oder Bild nicht hochgeladen
- **Lösung**: 
  1. Prüfe, ob das Bild in `public/` existiert
  2. Verwende korrekten Pfad: `/bildname.jpg` (mit führendem `/`)

### Build-Fehler
- **Problem**: TypeScript/ESLint Fehler
- **Lösung**: 
  1. Prüfe Browser-Konsole auf Fehlermeldungen
  2. Kontaktiere den Entwickler bei anhaltenden Problemen

## 📞 Support

Bei technischen Problemen oder Fragen:
1. Prüfe zuerst diese Anleitung
2. Schaue in die Browser-Entwicklertools (F12) für Fehlermeldungen
3. Kontaktiere den Entwickler mit Details zum Problem

## 🎯 Best Practices

### Content-Richtlinien
- **Titel**: Kurz und aussagekräftig (max. 60 Zeichen)
- **Beschreibung**: 1-2 Sätze, die Interesse wecken
- **Bilder**: Hohe Qualität, passend zum Thema
- **Kategorien**: Konsistent verwenden

### Veröffentlichungs-Workflow
1. **Entwurf erstellen** (featured = false)
2. **Inhalt überprüfen** auf Rechtschreibung und Richtigkeit
3. **Bei wichtigen News**: featured = true setzen
4. **Regelmäßig alte News** als nicht-featured markieren

---

**Viel Erfolg beim Verwalten der Dawid Faith News! 🎵✨**