# Stripe aktivieren — adlix-consent

> Stand: 2026-05-14  
> Stripe ist vollständig implementiert (Checkout, Webhook, Billing-Portal, Rechnungen).  
> Diese Anleitung beschreibt alle Schritte, die nötig sind, um es in Betrieb zu nehmen.

---

## 1. Stripe-Account & Produkt anlegen

1. Account anlegen / einloggen: https://dashboard.stripe.com
2. **Produkt anlegen:** Produkte → + Produkt
   - Name: `adlix consent Pro`
   - Preis: z. B. `9,90 €/Monat` (recurring)
   - Zahlungsmethoden: Karte, SEPA-Lastschrift, PayPal *(PayPal erfordert separate Aktivierung in Stripe)*
3. Die **Price-ID** notieren: sieht aus wie `price_1ABC...`

---

## 2. API-Keys ermitteln

Im Stripe-Dashboard unter **Entwickler → API-Schlüssel**:

| Key | Wo | Variable |
|---|---|---|
| Secret Key | Geheim (nur Backend) | `STRIPE_SECRET_KEY` |
| Publishable Key | Optional, hier nicht genutzt | — |

> Für Tests: `sk_test_...` Keys verwenden. Für Produktion: `sk_live_...` Keys.

---

## 3. Webhook einrichten

Stripe muss über Ereignisse informiert werden (Zahlung erfolgreich, Abo gekündigt, etc.).

### Lokal (Entwicklung)
```bash
stripe listen --forward-to http://localhost:3000/api/billing/webhook
```
Das gibt einen temporären `STRIPE_WEBHOOK_SECRET` aus (`whsec_...`).

### Produktion
1. Stripe Dashboard → **Entwickler → Webhooks → + Endpunkt**
2. URL: `https://deine-domain.de/api/billing/webhook`
3. Zu abonnende Events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. **Signing Secret** (`whsec_...`) notieren → `STRIPE_WEBHOOK_SECRET`

---

## 4. Strapi: User-Felder ergänzen

Der Webhook speichert `plan` und `stripeCustomerId` am Strapi-User.  
Diese Felder müssen im User-Permissions-Plugin vorhanden sein.

**Strapi Admin** → Content-Type Builder → Users (plugin::users-permissions.user) → Felder hinzufügen:

| Feldname | Typ | Default |
|---|---|---|
| `stripeCustomerId` | String | — |
| `plan` | Enumeration: `free`, `pro`, `enterprise` | `free` |

Danach Strapi neu starten.

---

## 5. Strapi API-Token für Webhook

Der Webhook schreibt via Admin-Token auf den Strapi-User.

1. Strapi Admin → **Settings → API Tokens → + Create new API Token**
   - Name: `stripe-webhook`
   - Type: **Full Access** oder Custom mit `users-permissions.user: update`
2. Token notieren → `STRAPI_API_TOKEN`

---

## 6. Billing-Portal aktivieren (Stripe Dashboard)

Das Billing-Portal (Abo verwalten, kündigen) muss einmal aktiviert werden:

Stripe Dashboard → **Billing → Customer Portal → Activate test link**  
→ Einstellungen nach Bedarf anpassen (erlaubte Aktionen: Kündigen, Plan wechseln, etc.)

---

## 7. Umgebungsvariablen setzen

### `/prj/adlix-consent/apps/frontend/.env` (oder `.env.local`)

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...          # oder sk_live_... für Produktion
STRIPE_PRO_PRICE_ID=price_1ABC...      # Price-ID aus Schritt 1
STRIPE_WEBHOOK_SECRET=whsec_...        # Webhook Signing Secret aus Schritt 3

# Strapi (für Webhook-Handler)
STRAPI_API_TOKEN=...                   # API-Token aus Schritt 5
STRAPI_URL=http://consent_strapi:1337  # intern (Docker) oder extern
```

> `NEXT_PUBLIC_APP_URL` muss auf die korrekte Domain zeigen (für Redirect nach Checkout).

---

## 8. Zahlungsmethoden in Stripe aktivieren

In `checkout/route.ts` sind `card`, `paypal` und `sepa_debit` konfiguriert.  
PayPal und SEPA müssen im Stripe-Dashboard aktiviert sein:

- **Einstellungen → Zahlungsmethoden** → PayPal + SEPA-Lastschrift einschalten
- SEPA erfordert eine Gläubiger-ID (Creditor ID) — für Testmodus nicht nötig

---

## 9. Testen

```bash
# Stripe CLI installieren (einmalig)
brew install stripe/stripe-cli/stripe

# Lokalen Webhook testen
stripe listen --forward-to http://localhost:3000/api/billing/webhook

# Test-Zahlung auslösen
stripe trigger checkout.session.completed
```

Test-Karten: https://stripe.com/docs/testing#cards  
- Erfolg: `4242 4242 4242 4242`
- SEPA: `DE89370400440532013000`

---

## 10. Go-Live Checkliste

- [ ] Live API-Keys (`sk_live_...`) in Produktion gesetzt
- [ ] Produktion-Webhook in Stripe registriert (mit Live-URL)
- [ ] `STRIPE_WEBHOOK_SECRET` für Produktion gesetzt
- [ ] Billing-Portal für Live-Mode aktiviert
- [ ] Strapi-Felder `plan` + `stripeCustomerId` in Produktion vorhanden
- [ ] Test-Zahlung mit Live-Keys durchgeführt
- [ ] PayPal/SEPA für Live-Account aktiviert (wenn gewünscht)
- [ ] Impressum + AGB + Datenschutz auf der Billing-Seite verlinkt (Pflicht!)

---

## Implementierungs-Übersicht (was bereits existiert)

| Datei | Funktion |
|---|---|
| `app/api/billing/checkout/route.ts` | Erstellt Stripe-Checkout-Session, legt Customer an |
| `app/api/billing/webhook/route.ts` | Verarbeitet Events: plan setzen/entfernen |
| `app/api/billing/portal/route.ts` | Öffnet Billing-Portal für bestehende Kunden |
| `app/api/billing/invoices/route.ts` | Lädt Plan-Status + Rechnungsliste |
| `app/(protected)/settings/billing/page.tsx` | Billing-UI (Upgrade, Portal, Rechnungen) |

Alles ist fertig implementiert — es fehlen nur die Umgebungsvariablen und die Konfiguration im Stripe-Dashboard.
