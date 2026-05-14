# Nachtarbeit — Auth & Billing — 10. Mai 2026

## Ziel
Heute Nacht an Registrierung, Anmeldung und Billing für `adlix-consent` weiterarbeiten.

## Kontext
- Repo: `/prj/adlix-consent`
- Strapi 5.45.0 läuft wieder
- Admin-Panel funktioniert
- Alte Daten werden nicht benötigt (DB durfte frisch sein)
- Custom Session-Auth im Frontend ist bereits vorhanden
- Registrierung/Login brauchen weitere Stabilisierung und Ausbau

## Gewünschter Scope
1. Registrierung und Anmeldung weiter verbessern/stabilisieren
2. Social Login vorbereiten bzw. umsetzen
   - GitHub
   - Facebook
   - ggf. weitere sinnvolle Provider, wenn sauber vorbereitbar
3. Registrierung um Passwort-Wiederholung ergänzen
4. "Passwort vergessen"-Flow ergänzen
5. Anmeldung mit Einmalcode prüfen/umsetzen
   - z. B. E-Mail-Code / Magic-Code, falls praktikabel
6. Stripe prüfen/ergänzen
   - Billing sauber anbinden
   - Rechnungsliste / Invoices im Frontend

## Erwartung an den Nachtlauf
- Erst Bestand analysieren
- Dann die sinnvollste Reihenfolge wählen
- So viel wie möglich direkt implementieren
- Bei externen Blockern (OAuth-Keys, SMTP, Stripe-Konfiguration) Grundlagen bauen und die fehlenden Inputs klar dokumentieren
- Änderungen prüfen (Build/Lint/Test, soweit vorhanden)
- Ergebnis mit kurzer Zusammenfassung, geänderten Dateien und Blockern zurückmelden
