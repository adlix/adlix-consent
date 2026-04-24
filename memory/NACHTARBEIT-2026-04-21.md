# Nachtarbeit — 21. April 2026

## Neue Tickets (review)
- **#54** Frontend: Einladungs-Link Komponente (GitHub-Style)
- **#55** Frontend: Custom Error Pages (404, 500)

## Freigegebene Tickets umgesetzt

| # | Ticket | Status |
|---|--------|-------|
| 42 | Backend: API Security & Rate Limiting | ✅ Komplett |
| 38 | Backend: Export & Datensparsamkeit | ✅ Komplett |
| 35 | Frontend: Onboarding-Flow | 🏃 In Arbeit |

### #42 — Umsetzung:
- Security Headers (X-Frame-Options, X-Content-Type-Options, XSS-Protection, Referrer-Policy, Permissions-Policy)
- Rate Limiting: 100 req/min IP, 1000 req/min User (In-Memory)
- Export Service: User-Daten als JSON exportieren, Account-Löschung mit 30-Tage-Safety-Delay
- Export API: GET /export/data, POST /export/schedule-delete, DELETE /export/schedule-delete
- Commit: 4f2d2ee

### #38 — Umsetzung:
- Export Service in apps/backend/src/services/export.ts
- Controller + Routes

### #35 — Umsetzung:
- OnboardingProvider mit React Context
- 4-Step Flow: Welcome → Profile → Circle → Complete
- GitHub-Style Einladung: Kreis erstellen ODER Invite-Code
- Commit: bb00553

## Offene Fragen
- API-Routen in Strapi bootstrap einbinden (Follow-up)
- API-Integration Kreis erstellen folgt mit Consent-Loop #49

## Commits
```
4f2d2ee feat: #42 API Security Middleware (Headers + Rate Limiting)
bb00553 feat: #35 Onboarding-Flow (Phase 1)
```