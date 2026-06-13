import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — adlix consent',
  description: 'Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten.',
}

export default function DatenschutzPage() {
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
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-gray max-w-none">
          <h2>1. Datenschutz auf einen Blick</h2>

          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten kannst du dem Impressum dieser Website entnehmen.
          </p>
          <p>
            <strong>Wie erfassen wir deine Daten?</strong><br />
            Deine Daten werden zum einen dadurch erhoben, dass du uns diese mitteilst (z.B. über ein Registrierungsformular). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. technische Daten wie Browser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>
          <p>
            <strong>Wofür nutzen wir deine Daten?</strong><br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse deines Nutzerverhaltens verwendet werden.
          </p>

          <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3>Datenschutz</h3>
          <p>
            Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p>
            Wenn du diese Website benutzt, werden verschiedene personenbezogene Daten erhoben. Diese Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
            <br />
            Die Problemlöser e.V.<br />
            Vorstand: Matthias Zillig<br />
            E-Mail: kontakt@die-problemloeser.org
          </p>

          <h3>Speicherung von Daten</h3>
          <p>
            Deine Daten werden auf Servern in der Europäischen Union gespeichert. Wir treffen technische und organisatorische Maßnahmen, um deine Daten gegen Verlust, Zerstörung oder unberechtigten Zugriff zu schützen.
          </p>

          <h3>Deine Rechte</h3>
          <p>Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck deiner gespeicherten personenbezogenen Daten zu erhalten. Du hast außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn du eine Einwilligung zur Datenverarbeitung erteilt hast, kannst du diese Einwilligung jederzeit für die Zukunft widerrufen.</p>
          <p>Du hast zudem das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen. Des Weiteren steht dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>

          <h3>Widerspruchsrecht</h3>
          <p>
            Du hast das Recht, einer Verarbeitung deiner personenbezogenen Daten zu widersprechen. Hierzu kannst du uns jederzeit eine E-Mail an die im Impressum genannte Adresse senden.
          </p>

          <h2>3. Datenerfassung auf dieser Website</h2>

          <h3>Kontaktformular</h3>
          <p>
            Wenn du uns über das Kontaktformular kontaktierst, werden deine Angaben aus dem Anfrageformular inklusive der von dir dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
          </p>

          <h3>Registrierung</h3>
          <p>
            Bei der Registrierung werden folgende Daten erhoben: Benutzername, E-Mail-Adresse und Passwort. Diese Daten werden für die Bereitstellung deines Accounts verwendet. Du kannst freiwillig weitere Angaben machen (z.B. Profilinformationen).
          </p>

          <h3>Consent-Daten</h3>
          <p>
            Alle Daten, die du im Rahmen eines Consent-Prozesses eingibst (Vorhaben, Vorschläge, Kommentare, Einwände, Abstimmungen), werden verschlüsselt gespeichert und sind nur für die am Prozess beteiligten Kreis-Mitglieder sichtbar.
          </p>

          <h3>Anonyme Bedenken</h3>
          <p>
            Wenn du anonym Bedenken äußerst (Enthaltungsgrund D), wird deine Identität nicht gespeichert. Die Bedenken werden thematisch zusammengefasst, ohne Rückschluss auf Einzelpersonen.
          </p>

          <h3>Cookies</h3>
          <p>
            Diese Website verwendet technische Cookies für die Sitzungsverwaltung (Login-Session). Es werden keine Tracking-Cookies oder Cookies von Drittanbietern verwendet.
          </p>

          <h3>Server-Log-Dateien</h3>
          <p>
            Der Provider der Website erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
          </p>
          <p>
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erhebung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
          </p>

          <h2>4. Deine Daten exportieren und löschen</h2>
          <p>
            Du kannst jederzeit alle deine Daten exportieren (JSON-Download) und die Löschung deines Accounts beantragen. Account-Löschung löscht alle persönlichen Daten mit einem 30-tägigen Sicherheitsfenster.
          </p>
          <p>
            Nutze die Funktion in den Einstellungen oder schreibe uns an: kontakt@die-problemloeser.org
          </p>

          <h2>5. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht. Für deinen erneuten Besuch gilt dann die neue Datenschutzerklärung.
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