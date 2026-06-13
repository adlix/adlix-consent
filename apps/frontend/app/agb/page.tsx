import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AGB — adlix consent',
  description: 'Allgemeine Geschäftsbedingungen für adlix consent.',
}

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

        <div className="prose prose-gray max-w-none">
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Plattform adlix consent, bereitgestellt von Die Problemlöser e.V. (im Folgenden: „Anbieter").
          </p>

          <h2>2. Leistungsbeschreibung</h2>
          <p>
            adlix consent ist eine Online-Plattform zur Durchführung von Consent-Entscheidungsprozessen. Der Anbieter stellt Werkzeuge zur Verfügung, die es Teams und Organisationen ermöglichen, gemeinsame Entscheidungen nach dem Konsent-Prinzip zu treffen.
          </p>
          <p>
            Die Kernfunktionen umfassen: Vorhaben-Verwaltung, geführte Consent-Prozesse (Informationsrunde, Reaktionsrunde, Abstimmung, Einwand-Integration), Kreis-Verwaltung und Audit-Trail.
          </p>

          <h2>3. Registrierung und Zugang</h2>
          <p>
            Die Nutzung von adlix consent erfordert eine Registrierung. Du bist verpflichtet, wahrheitsgemäße und vollständige Angaben zu machen. Du bist für die Vertraulichkeit deiner Zugangsdaten verantwortlich.
          </p>
          <p>
            Die Accounts sind nicht übertragbar. Du bist für alle Aktivitäten verantwortlich, die unter deinem Account stattfinden.
          </p>

          <h2>4. Kostenlose Nutzung (Free-Plan)</h2>
          <p>
            Der Free-Plan ermöglicht die Nutzung von adlix consent bis zu 3 aktiven Vorhaben und 50 Teilnehmern pro Vorhaben. Der Anbieter behält sich vor, den Umfang des Free-Plans jederzeit anzupassen.
          </p>

          <h2>5. Bezahlte Nutzung (Pro / Enterprise)</h2>
          <p>
            Die kostenpflichtigen Tarife werden separat vereinbart und abgerechnet. Es gelten die zum Zeitpunkt der Buchung aktuellen Preise. Die Abrechnung erfolgt im Voraus.
          </p>

          <h2>6. Vertragslaufzeit und Kündigung</h2>
          <p>
            Verträge für kostenpflichtige Tarife werden mit einer Mindestlaufzeit von einem Monat abgeschlossen und verlängern sich automatisch um jeweils einen weiteren Monat, sofern sie nicht mit einer Frist von 14 Tagen zum Monatsende gekündigt werden.
          </p>
          <p>
            Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
          </p>

          <h2>7. Datennutzung und Eigentum</h2>
          <p>
            Alle Daten, die du im Rahmen der Nutzung von adlix consent eingibst, gehören dir. Du behältst sämtliche Rechte an deinen Daten. Der Anbieter erhält ein nicht-exklusives Recht, die Daten zur Erbringung der Dienstleistung zu nutzen.
          </p>
          <p>
            Mit der Löschung deines Accounts werden alle personenbezogenen Daten gemäß unserer Datenschutzerklärung gelöscht.
          </p>

          <h2>8. Verfügbarkeit</h2>
          <p>
            Der Anbieter strebt eine hohe Verfügbarkeit an, übernimmt jedoch keine Garantie für eine ununterbrochene Verfügbarkeit. Geplante Wartungsarbeiten werden nach Möglichkeit vorher angekündigt.
          </p>

          <h2>9. Haftung</h2>
          <p>
            Der Anbieter haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht und nur für vorhersehbare Schäden.
          </p>
          <p>
            Die Haftung für Datenverlust wird auf den typischen Wiederherstellungsaufwand beschränkt, der bei regelmäßiger Datensicherung durch den Nutzer entstehen würde.
          </p>

          <h2>10. Nutzungsregeln</h2>
          <p>
            Du verpflichtest dich, adlix consent nicht für rechtswidrige Zwecke zu nutzen. Du bist verantwortlich für die Inhalte, die du einreichst. Es ist untersagt, Inhalte zu veröffentlichen, die gegen geltendes Recht verstoßen oder Rechte Dritter verletzen.
          </p>

          <h2>11. Änderungen der AGB</h2>
          <p>
            Der Anbieter behält sich vor, diese AGB zu ändern. Über wesentliche Änderungen wirst du rechtzeitig informiert. Wenn du den geänderten Bedingungen nicht zustimmst, kannst du den Vertrag kündigen.
          </p>

          <h2>12. Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
          </p>
          <p>
            Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
          <p>
            Stand: Juni 2026
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-primary hover:text-primary-dark text-sm">
            ← Zurück zur Startseite
          </Link>
        </div>
      </main>
    </div>
  )
}