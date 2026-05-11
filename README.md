# StarvingCrowd

Deploybare Next.js + Tailwind Website für StarvingCrowd.

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen:

```bash
http://localhost:3000
```

## Für Vercel deployen

1. Projekt in ein GitHub-Repository hochladen.
2. In Vercel auf **Add New Project** klicken.
3. Repository auswählen.
4. Framework wird automatisch als **Next.js** erkannt.
5. Deploy klicken.

## Build testen

```bash
npm run build
```

## Struktur

```text
app/page.tsx       Hauptseite
app/layout.tsx     SEO/Metadata/Layout
app/globals.css    Tailwind + globale Styles
package.json       Dependencies und Scripts
tailwind.config.ts Tailwind-Konfiguration
```

## Hinweis

Die Website ist als hochwertige Demo-/Marketing-Website gebaut. Das Dashboard nutzt Mockdaten. Für echte Analysen können später APIs für Keywords, SERPs, Trends, Ads oder interne Daten angebunden werden.
