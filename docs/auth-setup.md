# Authentifizierung – Einrichtung und Aktivierung

Dieses Dokument beschreibt alle Schritte, die notwendig sind, um den vollständigen Auth-Prozess (E-Mail/Passwort, Einmalcode, Social Login) in Betrieb zu nehmen.

---

## Übersicht der Auth-Flows

| Flow | Frontend-Route | API-Route |
|---|---|---|
| E-Mail/Passwort Login | `/login` | `POST /api/auth/login` |
| Registrierung | `/register` | `POST /api/auth/register` |
| Passwort vergessen | `/forgot-password` | `POST /api/auth/forgot-password` |
| Passwort zurücksetzen | `/reset-password?code=…` | `POST /api/auth/reset-password` |
| Einmalcode (OTP) | `/login` (Toggle) | `POST /api/auth/one-time-code` + `/api/auth/verify-code` |
| Social Login | `/login`, `/register` | `GET /api/auth/social/[provider]` |

---

## 1. Umgebungsvariablen

### Frontend (`apps/frontend/.env`)

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_STRAPI_API_URL=http://consent_strapi:1337/api   # intern (Docker)
NEXT_PUBLIC_STRAPI_API_URL=https://yourdomain.com/api  # öffentlich
NEXT_PUBLIC_STRAPI_URL=https://yourdomain.com
STRAPI_URL=http://consent_strapi:1337                # intern (Docker)

# NextAuth-Secret — generieren mit: openssl rand -base64 32
AUTH_SECRET=<zufälliger-secret>
AUTH_URL=https://yourdomain.com

# Strapi Admin API Token (für OTP-Codeschreiben auf den User)
# Erstellen unter: Strapi Admin → Settings → API Tokens → Create new token
# Typ: Custom, Berechtigung: users-permissions → User → update
STRAPI_API_TOKEN=<strapi-admin-api-token>
```

### Backend (`apps/backend/.env`)

```env
APP_KEYS=<key1>,<key2>,<key3>,<key4>   # je 16+ zufällige Zeichen
API_TOKEN_SALT=<zufällig>
ADMIN_JWT_SECRET=<zufällig>
JWT_SECRET=<zufällig>
TRANSFER_TOKEN_SALT=<zufällig>

DATABASE_CLIENT=postgres
DATABASE_HOST=consent_postgres
DATABASE_PORT=5432
DATABASE_NAME=consent
DATABASE_USERNAME=consent
DATABASE_PASSWORD=<sicheres-passwort>
```

Secrets generieren mit:
```bash
openssl rand -base64 32
```

---

## 2. Strapi: Custom User-Felder anlegen (für OTP)

Die Einmalcode-Anmeldung benötigt zwei zusätzliche Felder am User-Modell.

**Strapi Admin → Content-Type Builder → User (users-permissions) → Add another field:**

| Feldname | Typ | Einstellungen |
|---|---|---|
| `loginCode` | Text (Short text) | Optional, kein Unique-Index nötig |
| `loginCodeExpires` | DateTime | Optional |

Nach dem Speichern generiert Strapi automatisch eine neue Migration und startet den Server neu (im Entwicklungsmodus).

> **Hinweis:** Im Produktionsmodus muss `autoMigrate` aktiviert sein oder die Migration manuell ausgeführt werden.

---

## 3. Strapi: API Token für OTP erstellen

1. Strapi Admin öffnen → **Settings → API Tokens → Create new API Token**
2. Name: `Frontend OTP Token`
3. Token type: **Custom**
4. Berechtigung aktivieren: `users-permissions` → `user` → `update`
5. Token kopieren und in `apps/frontend/.env` als `STRAPI_API_TOKEN` eintragen

---

## 4. Strapi: E-Mail-Plugin konfigurieren (für OTP-Versand)

OTP-Codes werden per E-Mail versendet. Dazu muss das Strapi E-Mail-Plugin konfiguriert sein.

**`apps/backend/config/plugins.js`** – Beispiel mit SMTP:

```js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.example.com'),
        port: env.int('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: 'no-reply@yourdomain.com',
        defaultReplyTo: 'no-reply@yourdomain.com',
      },
    },
  },
})
```

Entsprechende Umgebungsvariablen im Backend-`.env` ergänzen:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=<passwort>
```

---

## 5. Strapi: Passwort-Reset-E-Mail konfigurieren

Strapi versendet Reset-E-Mails über das eingebaute Users & Permissions Plugin.

1. Strapi Admin → **Settings → Users & Permissions → Email Templates**
2. Template **"Reset password"** bearbeiten
3. `URL` setzen auf: `https://yourdomain.com/reset-password?code=<%= TOKEN %>`

---

## 6. Social Login aktivieren

### Allgemeines Vorgehen (gilt für alle Provider)

1. Strapi Admin → **Settings → Users & Permissions → Providers**
2. Gewünschten Provider auswählen und aktivieren
3. **Client ID** und **Client Secret** aus der jeweiligen Developer Console eintragen
4. **Callback URL** in der Developer Console des Providers freigeben:
   ```
   https://yourdomain.com/api/connect/<provider>/callback
   ```

### GitHub

1. Unter [github.com/settings/developers](https://github.com/settings/developers) → **New OAuth App**
2. **Homepage URL:** `https://yourdomain.com`
3. **Authorization callback URL:** `https://yourdomain.com/api/connect/github/callback`  
   _(Strapi leitet intern weiter, der Frontend-Callback wird von Strapi gesteuert)_
4. Client ID + Secret in Strapi eintragen

### Facebook

1. Unter [developers.facebook.com](https://developers.facebook.com) → App erstellen
2. Produkt **Facebook Login** hinzufügen
3. **Valid OAuth Redirect URIs:** `https://yourdomain.com/api/connect/facebook/callback`
4. App ID + App Secret in Strapi eintragen

### Google

1. Unter [console.cloud.google.com](https://console.cloud.google.com) → **APIs & Services → Credentials → Create OAuth 2.0 Client**
2. Application type: **Web application**
3. **Authorized redirect URIs:** `https://yourdomain.com/api/connect/google/callback`
4. Client ID + Client Secret in Strapi eintragen

---

## 7. Strapi: Öffentliche Berechtigungen prüfen

Die Berechtigungen werden beim Start automatisch durch `apps/backend/src/extensions/users-permissions/strapi-server.js` gesetzt. Zur manuellen Verifikation:

**Strapi Admin → Settings → Users & Permissions → Roles → Public**

Folgende Aktionen müssen aktiviert sein:

| Plugin | Controller | Aktion |
|---|---|---|
| users-permissions | Auth | `callback`, `connect`, `forgotPassword`, `resetPassword`, `register`, `emailConfirmation` |
| one-time-login | one-time-login | `login` |

---

## 8. Lokale Entwicklung

```bash
# Abhängigkeiten installieren
pnpm install

# Beide Apps starten
docker-compose up -d

# Oder manuell:
# Backend
cd apps/backend && pnpm dev

# Frontend
cd apps/frontend && pnpm dev
```

Frontend läuft auf [http://localhost:3000](http://localhost:3000), Strapi Admin auf [http://localhost:1337/admin](http://localhost:1337/admin).

---

## 9. Checkliste vor dem Go-Live

- [ ] Alle Secrets in `.env` durch echte Werte ersetzt (keine `changeme`-Platzhalter)
- [ ] `STRAPI_API_TOKEN` im Frontend gesetzt
- [ ] Custom User-Felder `loginCode` + `loginCodeExpires` in Strapi angelegt
- [ ] E-Mail-Plugin (SMTP) konfiguriert und getestet
- [ ] Passwort-Reset-URL im Strapi Email Template gesetzt
- [ ] Social-Provider aktiviert und OAuth-Credentials eingetragen
- [ ] Callback-URLs in den jeweiligen Developer Consoles freigegeben
- [ ] Öffentliche Strapi-Berechtigungen verifiziert
- [ ] `AUTH_SECRET` mit `openssl rand -base64 32` generiert
