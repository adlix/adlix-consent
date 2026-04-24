# i18n-System — Wiederverwendbares Übersetzungspaket

## Struktur

```
i18n-system/
├── TranslationContext.tsx    # Client-seitiger React Context mit t()
├── useTranslations.ts         # Hook für Komponenten
├── frontend/
│   └── api/
│       ├── translations/
│       │   └── route.ts      # GET /api/translations (Redis cached)
│       └── translations/register/
│           └── route.ts      # POST /api/translations/register (Auto-Register)
└── backend/
    └── scripts/
        └── seed-ui-texts.ts  # Seed-Script für Strapi
```

## Features

- **Auto-Register**: Fehlende Keys werden automatisch in Strapi angelegt
- **Redis-Caching**: 24h TTL auf Server-Seite
- **Fallback**: Deutscher Text wird angezeigt wenn keine Übersetzung existiert
- **Fire-and-forget**: Registrierung blockiert nicht die UI

## Integration in Next.js

### 1. Provider wrapping

```tsx
// pages/_app.tsx
import { TranslationProvider } from '@/i18n-system/TranslationContext'

export default function App({ Component, pageProps }) {
  return (
    <TranslationProvider locale="de">
      <Component {...pageProps} />
    </TranslationProvider>
  )
}
```

### 2. In Komponenten nutzen

```tsx
import { useTranslations } from '@/i18n-system/useTranslations'

export function MyComponent() {
  const { t } = useTranslations()
  
  return <button>{t("Speichern")}</button>
}
```

## Backend (Strapi) Setup

### 1. Content-Type anlegen

```
Name: ui-text
Felder:
- code: String (unique, required, not localized)
- text: Text (localized)
- page: String (optional)
```

### 2. Lifecycle-Hook für Cache-Invalidierung

```ts
// src/api/ui-text/content-types/ui-text/lifecycles.ts
export default {
  async afterCreate() { invalidateCache() },
  async afterUpdate() { invalidateCache() },
  async afterDelete() { invalidateCache() },
}
```

### 3. Seed-Script ausführen

```bash
cd backend
npx ts-node scripts/seed-ui-texts.ts
```

## Als wiederverwendbares NPM-Paket

Um dies als separates Package zu publishen:

1. `package.json` mit Namen erstellen
2. TypeScript-Build (tsc)
3. Auf npmjs.com oder internem Registry publishen
4. In anderen Projekten: `npm install @adlix/i18n-system`

---

*Aus sima-chartarea extrahiert (2026-04-19)*