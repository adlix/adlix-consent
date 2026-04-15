# adlix-consent

Schlanke Consent-Plattform (Abstimmungs- und Einspruchstool).

## Kernprozess

Beschreibung &rarr; Abstimmung &rarr; Einspruch &rarr; Diskussion &rarr; Anpassung &rarr; neuer Loop

## Preismodell

| Plan | Preis | Umfang |
|------|-------|--------|
| Free | 0 EUR | Bis 3 Consent-Projekte, 50 Teilnehmer |
| Pro | 29 EUR/Monat | Unbegrenzte Projekte, 500 Teilnehmer, Einspruch-Workflow |
| Enterprise | Auf Anfrage | SSO, API, SLA, dedizierter Support |

## Stack

- **Backend:** Strapi 5 (Headless CMS + REST API)
- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Datenbank:** PostgreSQL 16
- **Infrastruktur:** Docker Compose

## Architektur

```
apps/backend/    Strapi 5 (API, Admin, Content-Types)
apps/frontend/   Next.js (App Router, Tailwind)
```

## Voraussetzungen

- Docker + Docker Compose
- Node.js 20+ (nur fuer lokale Entwicklung ohne Docker)

## Schnellstart

### 1. Environment-Dateien anlegen

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### 2. Development starten

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### 3. Production starten

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

### Erreichbarkeit

- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin
- Strapi API: http://localhost:1337/api
- Postgres: localhost:5432

## Kommandos

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
docker compose down
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

## Hinweise

- Persistente Postgres-Daten liegen im Docker Volume `postgres_data`.
- Backend- und Frontend-Code sind im Dev-Modus als Volumes gemountet (Hot Reload).
- Wenn Dependencies geaendert wurden, Images neu bauen:
  ```bash
  docker compose build --no-cache
  ```
