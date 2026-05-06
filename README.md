# 📅 Stundenplan Creator

Eine moderne, interaktive Webseite zum Erstellen und Verwalten von Stundenplänen mit Drag-and-Drop Funktionalität.

## ✨ Features

- 🎯 **Drag & Drop**: Fächer ganz einfach per Drag & Drop in den Stundenplan eintragen
- 📚 **Fächer-Verwaltung**: Fächer mit Namen und Farben hinzufügen und löschen
- 📋 **Mehrere Stundenpläne**: Erstelle und verwalte mehrere Stundenpläne
- 💾 **LocalStorage**: Alle Daten werden automatisch im Browser gespeichert
- 📥 **Import/Export**: Stundenpläne als JSON-Dateien importieren und exportieren
- 🎨 **Moderne UI**: Schöne und benutzerfreundliche Oberfläche
- 📱 **Responsive Design**: Funktioniert auf Desktop und Tablet

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/giterade/stundenplan.git
cd stundenplan

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Öffne dann `http://localhost:5173` in deinem Browser.

## 📦 Production Build

```bash
npm run build
npm run preview
```

## 🎮 Verwendung

1. **Stundenplan erstellen**: Klicke auf "+ Neuer Stundenplan" und gib einen Namen ein
2. **Fächer hinzufügen**: Gib einen Fachnamen ein, wähle eine Farbe und klicke "Hinzufügen"
3. **Fächer eintragen**: Ziehe ein Fach per Drag & Drop in einen Zeitslot
4. **Speichern**: Alles wird automatisch gespeichert
5. **Exportieren**: Klicke das Download-Icon zum Exportieren als JSON
6. **Importieren**: Klicke "Importieren" um eine gespeicherte Datei zu laden

## 🏗️ Technologie-Stack

- **React 18**: UI-Framework
- **Vite**: Build-Tool und Dev Server
- **react-beautiful-dnd**: Drag & Drop Bibliothek
- **CSS3**: Styling

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Schedule.jsx          # Stundenplan-Grid
│   ├── Schedule.css
│   ├── SubjectManager.jsx    # Fächer-Verwaltung
│   ├── SubjectManager.css
│   ├── ScheduleManager.jsx   # Stundenplan-Verwaltung
│   └── ScheduleManager.css
├── App.jsx                   # Hauptkomponente
├── App.css
├── main.jsx                  # Entry Point
└── index.css                 # Globale Styles
```

## 📝 Lizenz

MIT - Frei verwendbar!
