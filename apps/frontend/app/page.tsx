import type { Metadata } from 'next'
import Link from 'next/link'
import { PricingSection } from '@/components/PricingSection'

export const metadata: Metadata = {
  title: 'adlix consent — Gemeinsam entscheiden',
  description:
    'Fair. Transparent. Inklusiv. adlix consent macht es einfach, gemeinsam zu entscheiden — ohne Hierarchien, mit Stimme für alle.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'adlix consent — Gemeinsam entscheiden',
    description:
      'Fair. Transparent. Inklusiv. adlix consent macht es einfach, gemeinsam zu entscheiden — ohne Hierarchien, mit Stimme für alle.',
    url: '/',
  },
}

// Consent Flow Steps
const flowSteps = [
  { label: 'Beschreibung', icon: '📝', description: 'Vorschlag wird vorgestellt' },
  { label: 'Abstimmung', icon: '🗳️', description: 'Zustimmung / Ablehnung' },
  { label: 'Einspruch', icon: '✋', description: 'Bedenken einbringen' },
  { label: 'Diskussion', icon: '💬', description: 'Argumente austauschen' },
  { label: 'Anpassung', icon: '🔄', description: 'Vorschlag überarbeiten' },
  { label: 'Neuer Loop', icon: '🔁', description: 'Zurück zur Abstimmung' },
]

// Use Cases for teams
const useCases = [
  {
    icon: '🏢',
    title: 'Agile Teams & Scrum-Kreise',
    scenario: 'Sprint-Ziel, Team-Normen, Rollenverteilung',
    text: 'Entscheidungen, die das ganze Team mittragen — nicht nur der Product Owner. Einwände werden im Prozess aufgefangen, nicht in Retrospektiven nachbehandelt.',
  },
  {
    icon: '🤝',
    title: 'Selbstorganisierte Kreise',
    scenario: 'Soziokratie, Holacracy, Kreisarbeit',
    text: 'Der Consent-Prozess ist die natürliche Entscheidungsform im Kreis. adlix consent bringt ihn digital — async, dokumentiert, mit Prozessgedächtnis.',
  },
  {
    icon: '🌱',
    title: 'Vereine & NGOs',
    scenario: 'Satzungsänderungen, Projekte, Vorstands-Entschlüsse',
    text: 'Transparente Entscheidungen für alle Mitglieder — auch für die, die beim Treffen nicht dabei waren. Alles dokumentiert, nachvollziehbar, fair.',
  },
  {
    icon: '🚀',
    title: 'Startups & Scale-ups',
    scenario: 'Strategie, Produkt, Kultur-Entscheidungen',
    text: 'Wenn das Team wächst, wächst auch die Komplexität. Consent hält die Entscheidungsqualität hoch — ohne Meetings die endlos dauern.',
  },
  {
    icon: '🏘️',
    title: 'Communities & Initiativen',
    scenario: 'Regeln, Events, Ressourcen, Konflikte',
    text: 'Jeder hat eine Stimme. Niemand kann einfach überstimmt werden. Consent schafft das Vertrauen, das lebendige Communities brauchen.',
  },
  {
    icon: '🎓',
    title: 'Bildungseinrichtungen',
    scenario: 'Schulentwicklung, Gremienarbeit, Klassenrat',
    text: 'Consent funktioniert auch mit jungen Menschen — gerade weil er fair ist. Ein Einwand zählt nicht wegen der Lautstärke, sondern wegen der Begründung.',
  },
]

// Why Consent reasons
const whyConsentReasons = [
  {
    icon: '🎯',
    title: 'Schnellere bessere Entscheidungen',
    text: 'Consent fragt nicht: „Stimmt ihr alle zu?" sondern: „Gibt es einen schwerwiegenden Einwand?" Das senkt die Hürde, beschleunigt den Prozess und führt zu Entscheidungen, die tragfähig sind — weil Bedenken gehört und integriert werden, nicht überstimmt.',
  },
  {
    icon: '🛡️',
    title: 'Psychologische Sicherheit',
    text: 'Wer schon mal in einem Meeting geschwiegen hat, obwohl er Bedenken hatte, kennt das Problem: Majoritätsentscheidungen marginalisieren. Consent gibt jedem das Recht auf einen Einwand — und den Prozess, ihn konstruktiv einzubringen. Kein Anonymitätsdruck, kein „dagegen sein" ohne Grund.',
  },
  {
    icon: '🔗',
    title: 'Einwände als Geschenk',
    text: 'In der Soziokratie sind Einwände keine Störung — sie sind wertvolle Informationen. Jeder schwerwiegende Einwand zeigt einen blinden Fleck im Vorschlag. Wer das akzeptiert, trifft robustere Entscheidungen. adlix consent macht diesen Prozess sichtbar und führbar.',
  },
  {
    icon: '⚡',
    title: 'Kein Endlos-Diskutieren',
    text: 'Konsens braucht 100% Zustimmung — eine Bar, die oft nicht erreichbar ist. Consent braucht nur die Abwesenheit schwerwiegender Einwände. Der Unterschied? Bei Konsens wird endlos diskutiert. Bei Consent wird entschieden — und bei Bedarf angepasst.',
  },
  {
    icon: '🌱',
    title: 'Entscheidungen wachsen mit',
    text: '„Gut genug für jetzt, sicher genug zum Ausprobieren." Consent-Entscheidungen sind nicht in Stein gemeißelt. Ein Evaluationsdatum sorgt dafür, dass Entscheidungen überprüft werden können. Das schafft Raum für Experimente, ohne dass Fehler für immer sind.',
  },
  {
    icon: '🤝',
    title: 'Vertrauen durch Transparenz',
    text: 'Jede Entscheidung ist nachvollziehbar: Wer hat abgestimmt? Welche Einwände gab es? Wie wurden sie integriert? Audit-Trail statt schwarzes Brett. Das schafft Vertrauen — auch bei Leuten, die nicht an der Entscheidung beteiligt waren.',
  },
]

// Konsens vs Konsent Comparison
const konsensVskonsent = [
  { aspect: 'Ziel', konsens: 'Alle stimmen aktiv zu', konsent: 'Kein schwerwiegender Einwand' },
  { aspect: 'Geschwindigkeit', konsens: 'Langsam — oft blockiert', konsent: 'Zügig — pragmatisch' },
  { aspect: 'Diskussion', konsens: 'Endlos bis alle zufrieden', konsent: 'Gezielt bei Einwänden' },
  { aspect: 'Ergebnis', konsens: 'Kompromiss oder Blockade', konsent: 'Tragfähige Entscheidung' },
  { aspect: 'Psych. Sicherheit', konsens: 'Druck zur Zustimmung', konsent: 'Recht auf Einwand' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🗳️
            </span>
            <span className="text-xl font-bold">adlix consent</span>
          </div>
          <nav aria-label="Hauptnavigation">
            <ul className="flex items-center gap-4 list-none">
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-gray-900">
                  Projekte
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                >
                  Anmelden
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main id="main-content" className="flex-1">
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          aria-labelledby="hero-heading"
        >
          <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold mb-6">
            Niemand wird überstimmt.
            <br className="hidden sm:block" />
            <span className="text-primary">Alle werden gehört.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Consent ist nicht Konsens. Es geht nicht um Kompromiss, sondern um tragfähige
            Entscheidungen — schnell, fair und mit Raum für Bedenken.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/projects/new"
              className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Kostenlos starten
            </Link>
            <Link
              href="#pricing"
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              So funktioniert&apos;s
            </Link>
          </div>
        </section>

        {/* Consent Flow */}
        <section className="bg-gray-50 py-16" aria-labelledby="how-it-works-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-center mb-4">
              So funktioniert&apos;s
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Der Consent-Prozess: Beschreibung → Abstimmung → Einspruch → Diskussion → Anpassung →
              Neuer Loop
            </p>

            {/* Flow Visualization */}
            <ol
              aria-label="Consent-Prozess Schritte"
              className="flex items-center justify-between gap-2 overflow-x-auto pb-4 list-none"
            >
              {flowSteps.map((step, index) => (
                <li key={index} className="flex items-center min-w-0">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2 shrink-0"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-center">{step.label}</div>
                    <div className="text-xs text-gray-500 text-center hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div
                      className="w-8 sm:w-16 h-0.5 bg-gray-300 mx-2 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold mb-2">Schnell & einfach</h3>
                <p className="text-gray-600">
                  Projekte in Minuten erstellen. Teilnehmer einladen. Abstimmungen in wenigen
                  Klicks.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">
                  🤝
                </div>
                <h3 className="text-lg font-semibold mb-2">Jede Stimme zählt</h3>
                <p className="text-gray-600">
                  Niemand wird überstimmt. Einsprüche ermöglichen konstruktive Diskussionen.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">
                  📊
                </div>
                <h3 className="text-lg font-semibold mb-2">Transparent</h3>
                <p className="text-gray-600">
                  Alle Entscheidungen sind nachvollziehbar. Vollständige Historie inklusive.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Why Consent */}
        <section className="py-16" aria-labelledby="why-consent-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="why-consent-heading" className="text-3xl font-bold text-center mb-4">
              Warum Consent-Entscheidung?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Die meisten Teams entscheiden durch Abstimmung oder Hierarchie. Beides hat Schwächen.
              Consent ist der dritte Weg — und der bessere.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyConsentReasons.map(({ icon, title, text }) => (
                <article
                  key={title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Agile Tribes */}
        <section
          className="bg-gradient-to-b from-indigo-50 to-white py-16"
          aria-labelledby="tribes-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🌀</span> Die Bewegung dahinter
              </div>
              <h2 id="tribes-heading" className="text-3xl font-bold mb-4">
                Agile Tribes — Entscheidungen, die verbinden
              </h2>
              <p className="text-gray-600 text-lg">
                Ein Tribe ist mehr als ein Team. Es ist eine Gemeinschaft, die durch gemeinsame
                Werte zusammengehalten wird — nicht durch Organigramme. adlix consent ist das
                Werkzeug. Der Tribe ist das Ziel.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <article className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 text-center">
                <div className="text-4xl mb-3" aria-hidden="true">
                  🤝
                </div>
                <h3 className="font-semibold mb-2">Vertrauen durch Prozess</h3>
                <p className="text-gray-600 text-sm">
                  Wer gemeinsam Consent-Entscheidungen trifft, baut Vertrauen auf. Nicht weil es
                  vorgeschrieben ist — sondern weil jeder gehört wurde.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 text-center">
                <div className="text-4xl mb-3" aria-hidden="true">
                  🔄
                </div>
                <h3 className="font-semibold mb-2">Iterativ, nicht perfekt</h3>
                <p className="text-gray-600 text-sm">
                  Kein Tribe ist von Anfang an perfekt. Consent-Entscheidungen sind bewusst
                  vorläufig — mit Evaluationsdatum. So kann der Tribe wachsen.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 text-center">
                <div className="text-4xl mb-3" aria-hidden="true">
                  🌍
                </div>
                <h3 className="font-semibold mb-2">Mitákuye Oyásʼiŋ</h3>
                <p className="text-gray-600 text-sm">
                  &bdquo;Alle meine Verwandten&ldquo; — das stille Fundament. Consent, weil der andere mein
                  Verwandter ist. Einwände als Geschenk, nicht als Angriff.
                </p>
              </article>
            </div>

            <blockquote className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
              <p className="text-xl font-medium mb-2">
                &ldquo;Der stärkste Tribe gewinnt — nicht durch Macht, sondern durch Kohärenz.&rdquo;
              </p>
              <footer className="text-indigo-200 text-sm not-italic">Dave Logan, Tribal Leadership</footer>
            </blockquote>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16" aria-labelledby="usecases-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="usecases-heading" className="text-3xl font-bold text-center mb-4">
              Für welche Teams?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              adlix consent funktioniert überall dort, wo Menschen gemeinsam Entscheidungen treffen
              — und dabei niemanden verlieren wollen.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map(({ icon, title, scenario, text }) => (
                <article
                  key={title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl shrink-0" aria-hidden="true">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">{scenario}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Konsens vs Konsent */}
        <section className="bg-gray-50 py-16" aria-labelledby="comparison-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="comparison-heading" className="text-3xl font-bold text-center mb-4">
              Konsens vs. Konsent — der Unterschied
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Viele verwechseln Konsens mit Konsent. Dabei sind es zwei grundverschiedliche Ansätze
              mit unterschiedlichen Ergebnissen.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden" role="table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Aspekt
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">
                      ❌ Konsens
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                      ✅ Konsent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {konsensVskonsent.map(({ aspect, konsens, konsent }) => (
                    <tr key={aspect} className="border-t border-gray-100">
                      <td className="px-6 py-4 font-medium">{aspect}</td>
                      <td className="px-6 py-4 text-gray-500">{konsens}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{konsent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-12 max-w-2xl mx-auto text-center text-lg italic text-gray-700 bg-primary-light/10 rounded-xl p-8">
              &ldquo;Gut genug für jetzt &mdash; sicher genug zum Ausprobieren.&rdquo;
              <footer className="mt-2 text-sm text-gray-500 not-italic">Das Consent-Prinzip</footer>
            </blockquote>
          </div>
        </section>

        {/* Features */}
        <section className="py-16" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '📝',
                  title: 'Vorhaben erstellen',
                  text: 'Organisiere Consent-Projekte parallel. Titel, Beschreibung, Ziel, Kreis — übersichtlich und schlank.',
                },
                {
                  icon: '🗳️',
                  title: 'Geführte Abstimmung',
                  text: 'Konsent, leichter Einwand, schwerwiegender Einwand oder Enthaltung — mit Begründung. Kein tweaky Formular, sondern ein Prozess.',
                },
                {
                  icon: '✋',
                  title: 'Einwand-Integration',
                  text: 'Schwerwiegende Einwände werden nicht ignoriert, sondern integriert. Dialog zur Lösungsfindung statt endloser Diskussion.',
                },
                {
                  icon: '🔮',
                  title: 'Kluge Enthaltung',
                  text: '5 Gründe für Enthaltung — jeder mit eigenem Folgeprozess. Nicht einfach „dagegen", sondern konstruktiv aufgefangen.',
                },
                {
                  icon: '🤖',
                  title: 'KI-Unterstützung (Pro)',
                  text: 'Einwands-Analyse, Synthese und Integrations-Entwürfe. KI als Prozess-Coach — Mensch entscheidet, KI strukturiert.',
                },
                {
                  icon: '🔒',
                  title: 'Anonyme Bedenken',
                  text: 'Psychologische Sicherheit: Bedenken anonym äußern, KI fasst zusammen. Kein Rückschluss auf Personen.',
                },
              ].map(({ icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="text-2xl shrink-0" aria-hidden="true">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA before pricing */}
        <section className="py-16 bg-primary text-white" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Bereit für bessere Entscheidungen?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Starte kostenlos mit bis zu 3 Vorhaben. Kein Kreditkarte nötig. Dein Team wird den
              Unterschied merken.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="px-8 py-3 text-lg font-medium bg-white text-primary rounded-lg hover:bg-gray-100"
              >
                Kostenlos starten
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-3 text-lg font-medium bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
        </section>

        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl" aria-hidden="true">
                  🗳️
                </span>
                <span className="text-xl font-bold">adlix consent</span>
              </div>
              <p className="text-gray-600 text-sm">
                Entscheidungen, die tragen. Von Die Problemlösern e.V. — für Teams, die Kreisarbeit
                leben.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Plattform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#how-it-works-heading" className="hover:text-gray-900">
                    So funktioniert&apos;s
                  </Link>
                </li>
                <li>
                  <Link href="#why-consent-heading" className="hover:text-gray-900">
                    Warum Consent
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-gray-900">
                    Preise
                  </Link>
                </li>
                <li>
                  <a
                    href="https://die-problemloeser.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900"
                  >
                    Die Problemlöser e.V.
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/impressum" className="hover:text-gray-900">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="hover:text-gray-900">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/agb" className="hover:text-gray-900">
                    AGB
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 adlix. Consent trifft Einfachheit.</p>
            <p className="text-gray-400 text-xs">Mit ♥ Respekt gebaut — Omitakuyasin</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
