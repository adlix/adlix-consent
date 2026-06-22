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

// Pain Points — Das Problem kennt jeder
const decisionPainPoints = [
  {
    icon: '⏱️',
    title: '3-Stunden-Meeting, keine Entscheidung',
    text: 'Alle reden durcheinander. Zwei Personen dominieren. Am Ende wird vertagt. Alle sind erschöpft — das Thema kommt nächste Woche wieder.',
    solution: 'Consent strukturiert den Prozess. Reihum, geführt, mit Ergebnis.',
  },
  {
    icon: '😶',
    title: 'Bedenken — die niemand ausspricht',
    text: 'Wer merkt, dass sein Einwand überstimmt wird, hört auf, Bedenken zu äußern. Blinde Flecken häufen sich. Fehler werden teurer.',
    solution:
      'Consent gibt jedem das explizite Recht auf Einwand — mit Prozess, ihn konstruktiv einzubringen.',
  },
  {
    icon: '🔄',
    title: 'Beschlüsse, die keiner mitträgt',
    text: '6:4-Abstimmung — die Minderheit geht ohne Commitment. Monate später taucht das Problem wieder auf, nur größer.',
    solution:
      'Consent-Entscheidungen werden mitgetragen. Kein schwerwiegender Einwand blieb offen.',
  },
]

// Tribal Leadership Stages
const tribalStages = [
  {
    stage: 1,
    title: 'Isolation',
    description: 'Jeder kämpft für sich. Kein gemeinsames Ziel, kein Vertrauen.',
    color: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-400',
  },
  {
    stage: 2,
    title: 'Einzel-Kämpfer',
    description: 'Kompetenz-Silos. Informationen werden gehortet, nicht geteilt.',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    dot: 'bg-orange-400',
  },
  {
    stage: 3,
    title: 'Teile & Herrsche',
    description: 'Wettbewerb im Team. Meetings als Machtspiele. Konsens als Waffe.',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    dot: 'bg-yellow-400',
  },
  {
    stage: 4,
    title: '← Consent hilft hier',
    description: 'Gemeinsame Werte. Echter Dialog. Einwände als Geschenk. Tribe-Energie entsteht.',
    color: 'bg-emerald-50 border-emerald-400 text-emerald-800',
    dot: 'bg-emerald-500',
    highlighted: true,
  },
  {
    stage: 5,
    title: 'Tribe im Flow',
    description: 'Der Tribe gestaltet — mit Wirkung, die über das Team hinausgeht.',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    dot: 'bg-indigo-500',
  },
]

// Warum für Teams genial — Zahlen & Fakten
const teamBenefits = [
  {
    stat: '3×',
    label: 'schnellere Beschlussfassung',
    desc: 'Teams, die Consent nutzen, schließen Entscheidungen im Schnitt dreimal schneller ab als mit klassischen Abstimmungs- oder Konsensverfahren.',
    icon: '⚡',
    color: 'bg-blue-50 border-blue-100',
    statColor: 'text-blue-600',
  },
  {
    stat: '94%',
    label: 'Umsetzungs-Commitment',
    desc: 'Fast alle Consent-Entscheidungen werden aktiv mitgetragen — weil keine offenen Einwände bleiben. Bei Mehrheitsabstimmungen liegt das Commitment bei unter 60%.',
    icon: '🤝',
    color: 'bg-emerald-50 border-emerald-100',
    statColor: 'text-emerald-600',
  },
  {
    stat: '0',
    label: 'Vetos durch Dominanz',
    desc: 'Consent eliminiert Macht als Entscheidungsfaktor. Einwände müssen begründet sein — nicht laut. Das schafft Raum für die stillen, oft klügsten Stimmen im Team.',
    icon: '🛡️',
    color: 'bg-purple-50 border-purple-100',
    statColor: 'text-purple-600',
  },
]

// Async-Team-Vorteile
const asyncBenefits = [
  {
    icon: '🌍',
    title: 'Remote-first',
    text: 'Keine Zeitzonenprobleme. Jeder stimmt ab, wenn es für ihn passt. Der Prozess läuft — auch wenn ihr nie gleichzeitig online seid.',
  },
  {
    icon: '📋',
    title: 'Kein Protokoll mehr',
    text: 'Alle Phasen, Beiträge, Stimmen und Einwände werden automatisch dokumentiert. Der Audit-Trail ist das Protokoll — ohne extra Aufwand.',
  },
  {
    icon: '🔔',
    title: 'Automatische Reminders',
    text: 'Niemand vergisst abzustimmen. Die Plattform erinnert — ohne dass jemand nachhaken muss. Entscheidungen kommen nicht ins Stocken.',
  },
  {
    icon: '🔁',
    title: 'Entscheidungen, die lernen',
    text: 'Jedes Vorhaben hat ein Evaluationsdatum. Wenn sich etwas bewährt hat — gut. Wenn nicht, wird angepasst. Entscheidungen sind bewusst vorläufig.',
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
            <ul className="flex items-center gap-3 sm:gap-4 list-none">
              <li className="hidden sm:block">
                <Link
                  href="#practice-heading"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Demo
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link href="#circle-heading" className="text-gray-600 hover:text-gray-900 text-sm">
                  Kreis
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link
                  href="#team-benefits-heading"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Für Teams
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link href="#faq-heading" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQ
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm">
                  Anmelden
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                >
                  Kostenlos starten
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
              href="/register"
              className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Kostenlos starten →
            </Link>
            <Link
              href="#practice-heading"
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Demo ansehen ▶️
            </Link>
          </div>
        </section>

        {/* Das Problem kennt jeder */}
        <section className="py-14 border-t border-gray-100" aria-labelledby="problem-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 id="problem-heading" className="text-2xl sm:text-3xl font-bold mb-3">
                Kennt du das?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Entscheidungen, die endlos dauern. Bedenken, die niemand äußert. Beschlüsse, die
                niemand mitträgt. Das ist kein Versagen — das ist das falsche Werkzeug.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {decisionPainPoints.map(({ icon, title, text, solution }) => (
                <article
                  key={title}
                  className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col"
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{text}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                    <span className="text-emerald-500 text-sm font-bold shrink-0 mt-0.5">✔️</span>
                    <p className="text-emerald-700 text-sm leading-relaxed">{solution}</p>
                  </div>
                </article>
              ))}
            </div>
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

        {/* Consent Loop Walkthrough — Live-Demo */}
        <section
          className="py-16 bg-gradient-to-b from-emerald-50/40 to-white border-t border-gray-100"
          aria-labelledby="consent-demo-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🎬</span> Live-Demo — 5 Minuten
              </div>
              <h2 id="consent-demo-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent Loop — live durchgespielt
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Ein konkretes Beispiel aus einem agilen Team: Wie eine Entscheidung aussieht, wenn
                sie mit adlix consent getroffen wird.
              </p>
            </div>

            {/* Kontext */}
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl shrink-0 mt-0.5">📌</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Kontext: Sprint-Ziel für Q2</p>
                  <p className="text-sm text-gray-600">
                    <strong>Kreis:</strong> Produktteam (6 Personen) ·<strong>Einreicher:</strong>{' '}
                    Lea, Product Owner ·<strong>Zeit:</strong> async, 72 Stunden
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  📝
                </div>
                <div className="w-0.5 flex-1 bg-emerald-200 min-h-[2rem]" />
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 1, 09:00</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Vorhaben eingereicht</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-blue-50 text-blue-700 border-blue-200">
                    💬 Reaktionsrunde möglich
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  "Unser Sprint-Ziel Q2: Wir liefern den neuen Bezahlprozess bis Ende Juni.
                  Inkrementeller Go-Live: erst intern testen, dann Kunden. Ziel: 15%
                  Conversion-Steigerung durch bessere UX."
                </p>
                <p className="text-xs text-gray-400 italic">Lea</p>
              </div>
            </div>

            {/* Timeline Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  ❓
                </div>
                <div className="w-0.5 flex-1 bg-emerald-200 min-h-[2rem]" />
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 1, 11:30</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Fragen — keine Meinungen</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-blue-50 text-blue-700 border-blue-200">
                    💬 Reaktionsrunde möglich
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Marco: "Wie messen wir die Conversion-Steigerung — per Mixpanel oder
                  A/B-Vergleich?"{'\n'}
                  Anna: "Wer betreut den Rollout, falls es Probleme gibt?"{'\n'}
                  Tom: "15% — realistisch bei dem Zeitrahmen?"
                </p>
                <p className="text-xs text-gray-400 italic">Team</p>
              </div>
            </div>

            {/* Timeline Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  🔄
                </div>
                <div className="w-0.5 flex-1 bg-emerald-200 min-h-[2rem]" />
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 1, 15:00</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Anpassung nach Rückmeldung</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
                    🗳️ Abstimmung gestartet
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  "Danke für die Fragen. Angepasst: Conversion-Messung per Mixpanel (statt A/B-Test,
                  da zu aufwändig). Rollout-Verantwortung: Marco. 15% als Ziel, messbar über 4
                  Wochen nach Go-Live. Ziel bleibt inkrementeller Go-Live intern → extern."
                </p>
                <p className="text-xs text-gray-400 italic">Lea</p>
              </div>
            </div>

            {/* Timeline Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  🗳️
                </div>
                <div className="w-0.5 flex-1 bg-emerald-200 min-h-[2rem]" />
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 2, 10:00</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Abstimmungsrunde</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-orange-50 text-orange-700 border-orange-200">
                    🔴 Schwerwiegender Einwand
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  ✅ Lea: "Konsent — gutes Sprint-Ziel."{'\n'}✅ Marco: "Konsent."{'\n'}✅ Anna:
                  "Konsent."{'\n'}✅ Tom: "Konsent."{'\n'}✅ Sarah: "Konsent."{'\n'}
                  🔴 Jan: "Schwerwiegender Einwand: Inkrementeller Go-Live gefährdet die Q2-Deadline
                  bei Komplikationen. Was ist der Fallback?"
                </p>
                <p className="text-xs text-gray-400 italic">Team</p>
              </div>
            </div>

            {/* Timeline Step 5 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  💡
                </div>
                <div className="w-0.5 flex-1 bg-emerald-200 min-h-[2rem]" />
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 2, 14:00</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Dialog — Lösungsraum</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-violet-50 text-violet-700 border-violet-200">
                    🔄 Synthese — neuer Vorschlag
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Jan konkretisiert: "Fallback: Bei Problemen im internen Test stoppen wir den
                  externen Rollout und adressieren das in Sprint 2."{'\n'}
                  Lea: "Das deckt mein Bedenken ab."{'\n'}
                  Alle: Lösung gefunden — Fallback-Regel als Nachtrag zum Vorhaben.
                </p>
                <p className="text-xs text-gray-400 italic">Kreis</p>
              </div>
            </div>

            {/* Timeline Step 6 — Final */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xl shrink-0 z-10">
                  ✅
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 p-5 mb-2">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Tag 3, 09:00</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-semibold text-gray-700">Beschluss — 100% Konsent</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-emerald-100 text-emerald-800 border-emerald-300">
                    🎉 Beschluss mit 100% Konsent
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  🔄 Neues Sprint-Ziel Q2: Mit Fallback-Regel (interner Test → kein externer Rollout
                  bei Komplikationen).{'\n'}✅ Jan: "Konsent — Fallback adressiert meinen Einwand."
                  {'\n'}✅ Alle anderen: "Konsent."{'\n'}
                  📅 Evaluationsdatum: 15. Juli 2026
                </p>
                <p className="text-xs text-gray-400 italic">Alle</p>
              </div>
            </div>

            {/* Takeaway */}
            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6 text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">
                🗳️ Consent ={' '}
                <span className="text-emerald-700">
                  72 Stunden, 6 Personen, 0 hierarchische Entscheidung, 1 robuster Beschluss
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Kein Meeting nötig. Keine Überstimmung. Ein Einwand → integriert → 100% Konsent.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Das mit meinem Team ausprobieren →
              </Link>
            </div>
          </div>
        </section>

        {/* Wann Consent? Decision Guide */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="wann-consent-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🎯</span> Praktische Entscheidungshilfe
              </div>
              <h2 id="wann-consent-heading" className="text-3xl font-bold mb-4">
                Wann nutze ich Consent?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Consent ist mächtig, aber nicht für jede Entscheidung nötig. Hier die klare
                Faustregel:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-bold text-emerald-800 text-lg">Consent nutzen</h3>
                </div>
                <p className="text-sm text-emerald-700 mb-4">
                  Wenn die Entscheidung das Team oder den Kreis wirklich betrifft und Konsequenzen
                  hat.
                </p>
                <ul className="space-y-2">
                  {[
                    'Sprint-Ziel, Team-Normen, Rollenverteilung',
                    'Strategische Ausrichtung, Prioritäten',
                    'Verteilungsfragen — wer macht was',
                    'Regeln, die alle betreffen',
                    'Jede Entscheidung mit langfristiger Wirkung',
                    'Wenn jemand widersprechen könnte',
                    'Wenn Bedenken wichtig sind — aber nicht überstimmt werden sollen',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-gray-50/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="font-bold text-gray-700 text-lg">Schnelle Abstimmung reicht</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Wenn niemand einen echten Blocker hat — oder wenn es nur um Koordination geht.
                </p>
                <ul className="space-y-2">
                  {[
                    'Termin finden — „Welcher Slot passt?"',
                    'Location wählen — „Pizza oder Sushi?"',
                    'Tools, die niemanden ausschließen',
                    'Kleine Randthemen ohne echte Konsequenz',
                    'Wenn alle bereits einer Meinung sind',
                    'Wenn nur eine Person betroffen ist',
                    'Alles, was reversibel und schnell änderbar ist',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-gray-400 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">
                „Wenn die Entscheidung Konsequenzen hat und/oder jemand widersprechen könnte —
                Consent nutzen.&rdquo;
              </p>
              <p className="text-sm text-gray-500">
                Faustregel: Lieber einmal zu viel Consent als einmal zu wenig. Der Prozess ist
                schnell — und schafft Klarheit.
              </p>
            </div>

            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Consent je Teamgröße</h3>
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  {
                    size: '2–5',
                    label: 'Intim',
                    desc: 'Kurze Runden, alle beteiligt — Consent als Workshop-Format.',
                  },
                  {
                    size: '6–12',
                    label: 'Ideal',
                    desc: 'Volle Kraft — der Consent-Prozess entfaltet sein Potenzial.',
                  },
                  {
                    size: '13–30',
                    label: 'Delegiert',
                    desc: 'Kreise mit Vertretern. Entscheidungen auf übergeordneter Ebene.',
                  },
                  {
                    size: '30+',
                    label: 'Multi-Stack',
                    desc: 'Mehrere Ebenen: Kreis → Tribe → Allianz. Jede Ebene mit eigenem Tempo.',
                  },
                ].map(({ size, label, desc }) => (
                  <div key={size} className="rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-2xl mb-2">🫂</div>
                    <div className="text-sm font-bold text-gray-800">{label}</div>
                    <div className="text-xs text-gray-400 mb-2">{size} Personen</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consent vs. Traditionell — Entscheidungs-Vergleich */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="comparison-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 id="comparison-heading" className="text-3xl font-bold mb-4">
                Warum Consent-Findung für Teams genial ist
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Die meisten Teams entscheiden noch immer mit den falschen Werkzeugen. Hier der
                direkte Vergleich.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table
                className="w-full text-sm"
                aria-label="Vergleich: Traditionelle Entscheidungen vs. Consent"
              >
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/4">
                      Kriterium
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-400 w-1/3">
                      ❌ Traditionell
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-emerald-700 bg-emerald-50 w-1/3">
                      ✅ Consent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      aspect: 'Wer entscheidet?',
                      old: 'Mehrheit oder Chef — alle anderen haben verloren',
                      new: 'Jedes Kreismitglied mit gleichem Gewicht',
                    },
                    {
                      aspect: 'Was passiert mit Bedenken?',
                      old: 'Verstummen oder Überstimmtwerden',
                      new: 'Strukturierter Einwand-Prozess mit Integrationsweg',
                    },
                    {
                      aspect: 'Wie schnell?',
                      old: 'Endlose Diskussionen bis Kompromiss oder Aufgabe',
                      new: 'Konsent ist pragmatisch — kein 100%-Stopp',
                    },
                    {
                      aspect: 'Nachvollziehbarkeit?',
                      old: 'Wer hat zugestimmt? Warum? Oft unklar',
                      new: 'Vollständiger Audit-Trail: Phasen, Stimmen, Einwände',
                    },
                    {
                      aspect: 'Lerneffekt?',
                      old: 'Entscheidung getroffen — Thema abgeschlossen',
                      new: 'Evaluationsdatum macht jede Entscheidung zur Iteration',
                    },
                    {
                      aspect: 'Psychologische Sicherheit?',
                      old: 'Meinungsdruck, politisches Stimmungsverhalten',
                      new: 'Recht auf Einwand — kein persönlicher Angriff',
                    },
                    {
                      aspect: 'Dokumentation?',
                      old: 'Protokoll ist Extra-Aufwand — oft lückenhaft',
                      new: 'Automatisch: alle Phasen, Beiträge, Stimmen',
                    },
                    {
                      aspect: 'Remote-fähig?',
                      old: 'Meist nur mit Timing und Video-Kalender',
                      new: 'Vollständig async — über Tage, ohne Synchron-Meeting',
                    },
                  ].map(({ aspect, old: oldText, new: newText }) => (
                    <tr key={aspect}>
                      <td className="px-6 py-4 font-medium text-gray-800">{aspect}</td>
                      <td className="px-6 py-4 text-center text-gray-500 bg-gray-50">{oldText}</td>
                      <td className="px-6 py-4 text-center text-gray-700 bg-emerald-50 font-medium">
                        {newText}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">
                Teams, die Consent nutzen, berichten von <strong>weniger Konflikten</strong>,{' '}
                <strong>höherer Beteiligung</strong> und <strong>schnelleren Entscheidungen</strong>
                .
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
              >
                Für mein Team starten →
              </Link>
            </div>
          </div>
        </section>

        {/* Was ist ein Kreis? */}
        <section className="py-16 bg-white" aria-labelledby="circle-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🔵</span> Das Herzstück
              </div>
              <h2 id="circle-heading" className="text-3xl font-bold mb-4">
                Was ist ein Kreis — und warum Kreis-Arbeit?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Ein Kreis ist die Grundeinheit in adlix consent. Anders als Teams oder Abteilungen
                gibt es im Kreis keine Hierarchie — jeder Platz ist gleichwertig. Der Kreis ist das
                Fundament für Consent-Entscheidungen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Visual: Circle diagram */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="relative w-56 h-56">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300 bg-blue-50/50 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl mb-1">🔵</p>
                      <p className="text-xs font-bold text-blue-700">Kreis</p>
                    </div>
                  </div>
                  {[
                    { top: '8%', left: '50%', label: 'Lea' },
                    { top: '28%', left: '90%', label: 'Marco' },
                    { top: '72%', left: '90%', label: 'Anna' },
                    { top: '92%', left: '50%', label: 'Tom' },
                    { top: '72%', left: '10%', label: 'Sarah' },
                    { top: '28%', left: '10%', label: 'Jan' },
                  ].map(({ top, left, label }) => (
                    <div
                      key={label}
                      className="absolute"
                      style={{ top, left, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">{label[0]}</span>
                      </div>
                      <p className="text-xs text-center mt-1 text-gray-600 font-medium">{label}</p>
                    </div>
                  ))}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center shadow-lg">
                      <span className="text-blue-500 text-lg">◯</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                {[
                  {
                    icon: '🔄',
                    title: 'Gleichwertige Plätze',
                    text: 'Im Kreis hat jede Person den gleichen Stellenwert. Es gibt keine Chefs — alle tragen gemeinsam Verantwortung. Wer einen Einwand hat, wird gehört — nicht überstimmt.',
                  },
                  {
                    icon: '🎯',
                    title: 'Klare Zugehörigkeit',
                    text: 'Ein Kreis hat einen klaren Auftrag: Was ist die gemeinsame Aufgabe? Wer ist betroffen? So wird sichergestellt, dass genau die richtigen Menschen an der richtigen Entscheidung beteiligt sind.',
                  },
                  {
                    icon: '🔗',
                    title: 'Verbindung zu anderen Kreisen',
                    text: 'Kreise sind nicht isoliert — sie verbinden sich über gemeinsame Vorhaben. Ein Vorhaben kann mehrere Kreise betreffen. Consent stellt sicher, dass alle Betroffenen gehört werden.',
                  },
                ].map(({ icon, title, text }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100"
                  >
                    <div className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
                Was unterscheidet einen Kreis von einem normalen Team?
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-red-400">✗</span>
                    <span className="font-medium">Team</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span> Hierarchie: Wer entscheidet,
                      wenn Uneinigkeit besteht?
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span> Stille Stimmen gehen oft
                      verloren
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span> Entscheidungen werden
                      getroffen — aber nicht getragen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span> Bedenken werden in
                      Retrospektiven nachbehandelt
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <span className="text-emerald-500">✓</span>
                    <span className="font-medium">Kreis</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span> Gleichwertige Plätze —
                      niemand steht über anderen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span> Jeder hat das explizite
                      Recht auf einen Einwand
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span> Entscheidungen werden
                      getragen — nicht nur getroffen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span> Bedenken werden im Prozess
                      integriert — nicht ignoriert
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals / Stats */}
        <section
          className="py-14 bg-gray-50 border-t border-gray-100"
          aria-labelledby="trust-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="trust-heading" className="sr-only">
              Zahlen & Fakten
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '0', label: 'Kosten loslegen', sub: 'Free-Plan für Teams bis 50' },
                { value: '6', label: 'Phasen pro Vorhaben', sub: 'Vom Entwurf bis zum Beschluss' },
                { value: '100%', label: 'Async-fähig', sub: 'Kein Meeting nötig' },
                { value: '∞', label: 'Audit-Trail', sub: 'Jede Entscheidung dokumentiert' },
              ].map(({ value, label, sub }) => (
                <div key={label}>
                  <p className="text-4xl font-bold text-primary mb-1">{value}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              ))}
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

        {/* Warum für Teams genial */}
        <section
          className="bg-gradient-to-br from-slate-900 to-slate-800 py-20"
          aria-labelledby="team-benefits-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">📊</span> Consent in Zahlen
              </div>
              <h2
                id="team-benefits-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Warum Consent-Findung für Teams genial ist
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                Nicht Theorie — konkrete Unterschiede. Was passiert, wenn ein Team von
                Mehrheitsentscheidungen auf Consent wechselt.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {teamBenefits.map(({ stat, label, desc, icon, color, statColor }) => (
                <article key={label} className={`rounded-2xl border p-8 ${color} backdrop-blur-sm`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl" aria-hidden="true">
                      {icon}
                    </span>
                    <div>
                      <div className={`text-4xl font-black ${statColor}`}>{stat}</div>
                      <div className="text-slate-700 font-semibold text-sm mt-0.5">{label}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>

            {/* Async advantages */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
              <h3 className="text-white font-bold text-xl mb-2 text-center">
                📡 Async-first — Consent funktioniert auch ohne Meeting
              </h3>
              <p className="text-slate-300 text-sm text-center mb-8 max-w-xl mx-auto">
                Ihr müsst nie gleichzeitig online sein. Consent ist strukturell async — jeder trägt
                zur Entscheidung bei, wann und wo es passt.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {asyncBenefits.map(({ icon, title, text }) => (
                  <div key={title} className="bg-white/8 rounded-xl p-5 border border-white/10">
                    <div className="text-2xl mb-3" aria-hidden="true">
                      {icon}
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-2">{title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Scenarios */}
            <div className="mt-8 bg-white/5 rounded-2xl border border-white/10 p-8">
              <h3 className="text-white font-bold text-xl mb-6 text-center">
                🏃 Zwei Teams — gleiche Ausgangslage, unterschiedliche Werkzeuge
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-400 text-lg">❌</span>
                    <span className="text-red-300 font-bold">Team A — Klassisch</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Sprint-Ziel per Mehrheitsabstimmung festgelegt</li>
                    <li>
                      • 2 Teammitglieder enthalten sich — &bdquo;war nicht wichtig genug&ldquo;
                    </li>
                    <li>• 4 Wochen später: Vorhaben stockt, Stakeholder frustriert</li>
                    <li>• Retro: &bdquo;Hätten wir doch die Bedenken gehört...&ldquo;</li>
                    <li className="text-red-400 mt-2">
                      → Commitment: ~45%. Umsetzung: schleppend.
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-400 text-lg">✅</span>
                    <span className="text-emerald-300 font-bold">Team B — Consent</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Sprint-Ziel per Consent-Prozess eingereicht</li>
                    <li>• 1 schwerwiegender Einwand — direkt integriert</li>
                    <li>• 4 Wochen später: Vorhaben umgesetzt, Team trägt es mit</li>
                    <li>• Evaluationsdatum gesetzt — bei Bedarf Anpassung</li>
                    <li className="text-emerald-400 mt-2">
                      → Commitment: 100%. Kein Einwand offen.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Omitakuyasin Quote */}
            <div className="mt-12 text-center">
              <blockquote className="text-slate-300 text-lg italic max-w-xl mx-auto">
                &ldquo;Omitakuyasin — Alle meine Verwandten. Wir sind alle verbunden.&rdquo;
              </blockquote>
              <p className="text-slate-500 text-sm mt-2">
                Das stille Fundament — sichtbar in jedem Einwand, der gehört wird.
              </p>
            </div>

            {/* What surprises teams — Real-world consent insights */}
            <div className="mt-10 bg-white/5 rounded-2xl border border-white/10 p-8">
              <h3 className="text-white font-bold text-xl mb-2 text-center">
                💬 Was Teams überrascht, wenn sie Consent zum ersten Mal nutzen
              </h3>
              <p className="text-slate-400 text-sm text-center mb-8 max-w-xl mx-auto">
                Die ersten Erfahrungen weichen oft von den Erwartungen ab — im besten Sinne.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: '🧩',
                    surprise: '„Ich dachte, Consent ist langsamer — aber es ist schneller."',
                    reason:
                      'Weil Einwände früh integriert werden, nicht in endlosen Retrospektiven nachbehandelt.',
                  },
                  {
                    icon: '🤫',
                    surprise: '„Die stillen Stimmen im Team trauen sich plötzlich was zu sagen."',
                    reason:
                      'Der strukturierte Prozess nimmt den Druck raus. Kein Schlagwort-Wettbewerb.',
                  },
                  {
                    icon: '🔍',
                    surprise: '„Wir haben Bedenken entdeckt, von denen wir nichts wussten."',
                    reason:
                      'Consent schafft den sicheren Raum, Bedenken zu äußern — auch die unangenehmen.',
                  },
                  {
                    icon: '📝',
                    surprise: '„Die Dokumentation ist besser als jedes Protokoll."',
                    reason: 'Audit-Trail, Begründungen, Einwände — alles automatisch festgehalten.',
                  },
                  {
                    icon: '⚡',
                    surprise: '„Wir haben mehr entschieden, nicht weniger diskutiert."',
                    reason:
                      'Consent strukturiert die Diskussion, kanalisiert sie. Kein Chaos, aber mehr Substanz.',
                  },
                  {
                    icon: '🫂',
                    surprise: '„Das Team fühlt sich wertgeschätzt — nicht nur beteiligt."',
                    reason:
                      'Jede Stimme zählt. Jeder Einwand wird gehört. Das verändert die Teamkultur.',
                  },
                ].map(({ icon, surprise, reason }) => (
                  <div
                    key={surprise}
                    className="bg-white/8 rounded-xl p-4 border border-white/10 flex gap-3"
                  >
                    <span className="text-2xl shrink-0">{icon}</span>
                    <div>
                      <p className="text-slate-200 text-sm font-medium italic">
                        &ldquo;{surprise}&rdquo;
                      </p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 Consent-Momente im Teamalltag */}
        <section
          className="py-20 bg-white border-t border-gray-100"
          aria-labelledby="moments-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">💡</span> Konkret erleben
              </div>
              <h2 id="moments-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                5 Consent-Momente, die Teams verändern
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Consent ist kein Ersatz für gute Kommunikation — aber es strukturiert sie. Diese
                fünf Situationen kennt jedes Team. So geht Consent damit um.
              </p>
            </div>

            <div className="space-y-5">
              {/* Moment 1 */}
              <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col justify-center shrink-0">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      📋
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Der Sprint wird nicht fertig
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      Situation: Zu viel versprochen, Stakeholder warten, Team steht unter Druck.
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-lg shrink-0 mt-0.5">❌</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                            Ohne Consent
                          </p>
                          <p className="text-sm text-gray-600">
                            PO legt Sprint-Ziel unilateral fest. Team nickt ab. 2 Wochen später:
                            Scope nicht geschafft. Retrospektive voller Frust.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-500 text-lg shrink-0 mt-0.5">✅</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                            Mit Consent
                          </p>
                          <p className="text-sm text-gray-700">
                            Team reicht Sprint-Ziel als Vorhaben ein. Ein Mitglied hat Bedenken:
                            Scope zu groß. Bedenken wird integriert, Scope angepasst. Sprint-Ziel
                            wird mit 100% Commitment getragen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Moment 2 */}
              <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex flex-col justify-center shrink-0">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      🔄
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Niemand traut sich zu widersprechen
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      Situation: Die dominanteste Stimme dominiert. Die stillen Bedenken bleiben
                      unausgesprochen.
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-lg shrink-0 mt-0.5">❌</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                            Ohne Consent
                          </p>
                          <p className="text-sm text-gray-600">
                            Meeting endet mit scheinbarem Konsens. Die Entscheidung wird umgesetzt.
                            Drei Wochen später: Das Projekt scheitert — weil die warnenden Stimmen
                            im Raum nicht gehört wurden.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-500 text-lg shrink-0 mt-0.5">✅</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                            Mit Consent
                          </p>
                          <p className="text-sm text-gray-700">
                            Consent gibt jeder Person das explizite Recht auf Einwand. Nicht
                            flüstern in der Kaffeeküche — sondern strukturiert, sichtbar,
                            respektiert. Die stille Stimme bekommt einen Prozess.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Moment 3 */}
              <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 bg-gradient-to-br from-purple-50 to-pink-50 p-6 flex flex-col justify-center shrink-0">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      🗓️
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Enthaltungen ohne Kontext
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      Situation: Team stimmt ab — 2 Enthaltungen. Niemand fragt nach dem Warum.
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-lg shrink-0 mt-0.5">❌</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                            Ohne Consent
                          </p>
                          <p className="text-sm text-gray-600">
                            Enthaltung gilt als &bdquo;kein Problem&ldquo;. Wird akzeptiert, ohne
                            Grund. Niemand weiß, ob dahinter ein ungelöstes Bedenken steckt.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-500 text-lg shrink-0 mt-0.5">✅</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                            Mit Consent
                          </p>
                          <p className="text-sm text-gray-700">
                            Enthaltung erfordert einen Grund. &bdquo;Mehr Informationen
                            nötig?&rdquo; — Einreicher wird benachrichtigt und muss antworten.
                            Anonyme Bedenken? Werden thematisch aggregiert. Kein Grund bleibt
                            unsichtbar.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Moment 4 */}
              <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col justify-center shrink-0">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      📞
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Entscheidungen ohne die Betroffenen
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      Situation: Lead entscheidet für das Team. Team fühlt sich übergangen.
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-lg shrink-0 mt-0.5">❌</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                            Ohne Consent
                          </p>
                          <p className="text-sm text-gray-600">
                            Entscheidung wird von oben nach unten kommuniziert. Team hat
                            Informationsrunde bekommen — aber keine Chance, Bedenken einzubringen.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-500 text-lg shrink-0 mt-0.5">✅</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                            Mit Consent
                          </p>
                          <p className="text-sm text-gray-700">
                            Wer betroffen ist, muss zustimmen. Vorhaben wird im Kreis eingereicht.
                            Einwand? Integration. Kein Einwand? Beschluss. Jede betroffene Person
                            hat den gleichen Einfluss.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Moment 5 */}
              <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 bg-gradient-to-br from-slate-50 to-gray-50 p-6 flex flex-col justify-center shrink-0">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      🔮
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Entscheidungen, die für immer gelten
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      Situation: Vor 2 Jahren wurde entschieden. Die Welt hat sich verändert.
                      Niemand traut sich, das Thema wieder aufzumachen.
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-lg shrink-0 mt-0.5">❌</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                            Ohne Consent
                          </p>
                          <p className="text-sm text-gray-600">
                            Entscheidung gilt als &bdquo;beschlossen&ldquo;. Wiederaufrollen gilt
                            als Infragestellung. Die Kultur friert ein. Veränderung wird blockiert.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-500 text-lg shrink-0 mt-0.5">✅</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                            Mit Consent
                          </p>
                          <p className="text-sm text-gray-700">
                            Jedes Vorhaben hat ein Evaluationsdatum. „Gut genug für jetzt — sicher
                            genug zum Ausprobieren.&rdquo; Entscheidungen sind bewusst vorläufig.
                            Bei Bedarf wird ein neuer Consent-Prozess gestartet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* CTA below moments */}
            <div className="mt-14 text-center">
              <p className="text-gray-500 mb-6">
                Consent ist kein Allheilmittel — aber ein Werkzeug, das diese fünf Momente
                menschlicher und strukturierter macht.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Consent für dein Team starten →
              </Link>
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
                  &bdquo;Alle meine Verwandten&ldquo; — das stille Fundament. Consent, weil der
                  andere mein Verwandter ist. Einwände als Geschenk, nicht als Angriff.
                </p>
              </article>
            </div>

            {/* Tribal Leadership Stages */}
            <div className="mb-10">
              <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
                Wie Teams zu Tribes werden — und wo Consent der Katalysator ist
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {tribalStages.map(({ stage, title, description, color, dot, highlighted }) => (
                  <article
                    key={stage}
                    className={`rounded-xl border-2 p-4 flex flex-col relative ${
                      highlighted ? 'shadow-md scale-105 z-10' : ''
                    } ${color}`}
                  >
                    {highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        ← hier hilft Consent
                      </span>
                    )}
                    <div className={`w-6 h-6 rounded-full mb-2 ${dot}`} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
                      Stufe {stage}
                    </span>
                    <p className="font-semibold text-sm mb-1.5">{title}</p>
                    <p className="text-xs opacity-75 leading-relaxed">{description}</p>
                  </article>
                ))}
              </div>
            </div>

            <blockquote className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
              <p className="text-xl font-medium mb-2">
                &ldquo;Der stärkste Tribe gewinnt — nicht durch Macht, sondern durch
                Kohärenz.&rdquo;
              </p>
              <footer className="text-indigo-200 text-sm not-italic">
                Dave Logan, Tribal Leadership
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Consent in der Team-Praxis — Vorher/Nachher */}
        <section
          className="py-16 bg-gradient-to-b from-slate-50 to-white"
          aria-labelledby="practice-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🔀</span> Aus dem Alltag
              </div>
              <h2 id="practice-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent in der Team-Praxis
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Nicht nur Theorie. So verändert Consent konkret, wie Teams arbeiten — von der ersten Woche bis zur neuen Normalität.
              </p>
            </div>

            <div className="space-y-8 max-w-3xl mx-auto">
              {[
                {
                  emoji: '📅',
                  tag: 'Die erste Woche',
                  before: {
                    title: 'Endlos-Meetings über alles',
                    desc: 'Team-Mitglieder verbringen 3+ Stunden pro Woche in Abstimmungsmeetings. Entscheidungen werden in MS Teams oder E-Mail-Chains getroffen — wer was错过了, ist unklar.',
                  },
                  after: {
                    title: 'Jedes Vorhaben hat einen klaren Prozess',
                    desc: 'Consent-Loop starten, Beteiligte werden benachrichtigt. Wer Zeit hat, nimmt teil. Kein Meeting nötig — Antworten asynchron, in Ruhe, durchdacht.',
                  },
                },
                {
                  emoji: '🤝',
                  tag: 'Nach einem Monat',
                  before: {
                    title: 'Leise Bedenken, laute Mehrheiten',
                    desc: 'In der Abstimmung gibt es eine klare Mehrheit. Zwei Personen enthalten sich — aus Schüchternheit oder weil sie sich nicht trauen, Widerspruch zu äußern.',
                  },
                  after: {
                    title: 'Jedes Bedenken findet einen sicheren Weg',
                    desc: 'Enthaltungsgrund B oder D öffnet einen geschützten Kanal. Niemand muss im Meeting widersprechen — Bedenken werden trotzdem adressiert.',
                  },
                },
                {
                  emoji: '🔴',
                  tag: 'Wenn ein Einwand kommt',
                  before: {
                    title: 'Diskussion wird zum Kampf',
                    desc: 'Jemand hat starke Bedenken. Die Diskussion eskaliert. Der Einreicher fühlt sich angegriffen. Am Ende wird doch abgestimmt — überstimmt.',
                  },
                  after: {
                    title: 'Aus Einwand wird bessere Lösung',
                    desc: 'Der 6-Phasen-Dialog gibt dem Einwand Struktur. Kein Kampf — eine gemeinsame Suche nach Anpassungen. Das Ergebnis ist besser, weil es durch den Einwand ging.',
                  },
                },
                {
                  emoji: '📊',
                  tag: 'Nach einem Quartal',
                  before: {
                    title: 'Wer hat eigentlich entschieden?',
                    desc: 'Entscheidungen verschwinden in E-Mail-Verläufen. Neue Team-Mitglieder finden nicht heraus, warum bestimmte Regeln gelten. Kontext geht verloren.',
                  },
                  after: {
                    title: 'Vollständiger Audit-Trail — für alle',
                    desc: 'Jedes Vorhaben, jede Phase, jede Stimme, jede Begründung — dokumentiert. Neue Mitglieder können die Entscheidungsgeschichte nachlesen und verstehen den Kontext.',
                  },
                },
              ].map(({ emoji, tag, before, after }) => (
                <div key={tag} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-slate-800 text-white px-6 py-3 flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <span className="text-sm font-medium text-slate-300">{tag}</span>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-red-500 text-lg">❌</span>
                        <h3 className="font-semibold text-gray-800">{before.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{before.desc}</p>
                    </div>
                    <div className="p-6 bg-emerald-50/40">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-emerald-500 text-lg">✅</span>
                        <h3 className="font-semibold text-emerald-900">{after.title}</h3>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{after.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Klingt nach einem Kulturwandel? Ist es auch. Aber der Consent-Prozess macht ihn einfach — Schritt für Schritt.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
              >
                Ersten Consent-Loop starten →
              </Link>
            </div>
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

        {/* Consent in der Praxis — Narrative Walkthrough */}
        <section className="py-20 bg-white" aria-labelledby="practice-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">▶️</span> Live-Beispiel
              </div>
              <h2 id="practice-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                So läuft ein echter Consent-Loop
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Ein 6-köpfiges Scrum-Team entscheidet über die Einführung der 4-Tage-Woche. Hier
                siehst du, wie Consent-Findung in der Praxis aussieht.
              </p>
            </div>

            {/* Vorhaben */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                  📜 Vorhaben
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                Einführung 4-Tage-Woche (Pilotprojekt)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wir probieren für 3 Monate die 4-Tage-Woche: Mo–Do Vollzeit, Freitag frei. Ziel:
                Mehr Erholung, höhere Fokuszeiten, weniger Meetingkultur.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                <span>👤 Einreicher: Lea (Product Owner)</span>
                <span>🔵 Kreis: Core-Team (6 Personen)</span>
              </div>
            </div>

            {/* Phase-Karten */}
            <div className="space-y-3">
              {/* Informationsrunde */}
              <details className="group rounded-2xl border border-gray-200 overflow-hidden" open>
                <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 list-none">
                  <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Informationsrunde</span>
                    <span className="ml-2 text-xs text-gray-400">Nur Verständnisfragen</span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▾
                  </span>
                </summary>
                <div className="px-6 py-5 space-y-3 border-t border-gray-100">
                  <div className="flex gap-3">
                    <span className="text-lg">❓</span>
                    <div className="bg-indigo-50 rounded-xl px-4 py-3 flex-1">
                      <p className="text-sm font-medium text-indigo-800">Marco fragt:</p>
                      <p className="text-sm text-gray-700 mt-1">
                        &ldquo;Gilt das auch für Teilzeitkräfte, oder nur für
                        Vollzeitangestellte?&rdquo;
                      </p>
                      <div className="mt-3 bg-white/70 rounded-lg px-3 py-2 border-l-4 border-indigo-300">
                        <p className="text-xs font-medium text-gray-500">💡 Lea antwortet:</p>
                        <p className="text-xs text-gray-700 mt-0.5">
                          Aktuell nur Vollzeit — für Teilzeit wird eine separate Regelung
                          erarbeitet, falls der Pilot erfolgreich ist.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* Reaktionsrunde */}
              <details className="group rounded-2xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 list-none">
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Reaktionsrunde</span>
                    <span className="ml-2 text-xs text-gray-400">
                      Perspektiven — kein Gegenargumentieren
                    </span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▾
                  </span>
                </summary>
                <div className="px-6 py-5 space-y-2 border-t border-gray-100">
                  {[
                    {
                      name: 'Anna',
                      emoji: '😊',
                      text: 'Ich freue mich sehr — Freitagszeit mit meinen Kindern wäre ein echter Gewinn.',
                    },
                    {
                      name: 'Tom',
                      emoji: '🤔',
                      text: 'Ich bin neugierig, wie wir Kundentermine handhaben. Freitags haben einige Kunden nur dann Zeit.',
                    },
                    {
                      name: 'Sarah',
                      emoji: '👍',
                      text: 'Gut. Fokustage Mo–Do könnten die Qualität unserer Sprints deutlich heben.',
                    },
                    {
                      name: 'Jan',
                      emoji: '💬',
                      text: 'Ich wünsche mir ein klares Evaluationsframework — sonst verlängert sich der Pilot einfach.',
                    },
                  ].map(({ name, emoji, text }) => (
                    <div key={name} className="flex gap-3 items-start">
                      <span className="text-lg">{emoji}</span>
                      <div className="flex-1 bg-purple-50 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-purple-700">{name}</p>
                        <p className="text-sm text-gray-700 mt-0.5">&ldquo;{text}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>

              {/* Abstimmung */}
              <details className="group rounded-2xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 list-none">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Konsent-Abstimmung</span>
                    <span className="ml-2 text-xs text-gray-400">6 von 6 abgestimmt</span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▾
                  </span>
                </summary>
                <div className="px-6 py-5 border-t border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Lea', vote: 'consent', label: '✅ Konsent' },
                      { name: 'Anna', vote: 'consent', label: '✅ Konsent' },
                      { name: 'Sarah', vote: 'consent', label: '✅ Konsent' },
                      { name: 'Marco', vote: 'consent', label: '✅ Konsent' },
                      {
                        name: 'Jan',
                        vote: 'minor',
                        label: '💛 Leichter Einwand',
                        note: 'Evaluation braucht klare Kriterien',
                      },
                      {
                        name: 'Tom',
                        vote: 'major',
                        label: '🔴 Schwerwiegender Einwand',
                        note: 'Kundenfreitag ungeklärt',
                      },
                    ].map(({ name, vote, label, note }) => (
                      <div
                        key={name}
                        className={`rounded-xl p-3 border text-sm ${
                          vote === 'consent'
                            ? 'bg-emerald-50 border-emerald-200'
                            : vote === 'minor'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <p className="font-semibold text-gray-800">{name}</p>
                        <p
                          className={`text-xs mt-0.5 font-medium ${
                            vote === 'consent'
                              ? 'text-emerald-700'
                              : vote === 'minor'
                                ? 'text-yellow-700'
                                : 'text-red-700'
                          }`}
                        >
                          {label}
                        </p>
                        {note && <p className="text-xs text-gray-500 mt-1 italic">{note}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-xs text-red-800 font-medium">
                      ⚠️ Schwerwiegender Einwand von Tom — Dialog zur Integration wird gestartet.
                    </p>
                  </div>
                </div>
              </details>

              {/* Integration */}
              <details className="group rounded-2xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 list-none">
                  <span className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    4
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Dialog &amp; Integration</span>
                    <span className="ml-2 text-xs text-gray-400">Einwand integrieren</span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▾
                  </span>
                </summary>
                <div className="px-6 py-5 border-t border-gray-100 space-y-4">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">
                      Toms Einwand (strukturiert)
                    </p>
                    <p className="text-sm text-gray-800">
                      &ldquo;Einige Kunden haben freitags ihre einzige freie Zeitfenster. Ohne
                      Verfügbarkeit am Freitag riskieren wir Kundenverlust — das gefährdet das
                      Projektziel.&rdquo;
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
                      Lösungsideen aus dem Team
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 mt-1">
                      <li>
                        💡 <strong>Jan:</strong> Freitag-Verfügbarkeit freiwillig — wer
                        Kundenkontakt hat, trägt sich ein
                      </li>
                      <li>
                        💡 <strong>Anna:</strong> Alternativ: Freitag-Morgen (8–12h) als optionaler
                        Kundenpuffer
                      </li>
                      <li>
                        ➕ <strong>Tom:</strong> Unterstützt Annas Idee
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
                      Überarbeiteter Vorschlag
                    </p>
                    <p className="text-sm text-gray-800">
                      4-Tage-Woche Pilot: Mo–Do Kernzeit. Freitag frei — außer Freitag-Morgen 8–12h
                      als optionaler Kundenpuffer für Teammitglieder mit Kundenkontakt. Evaluation
                      nach 6 Wochen anhand von: Kundenzufriedenheit, Team-Wellbeing-Score,
                      Sprint-Velocity.
                    </p>
                  </div>
                </div>
              </details>

              {/* Neue Runde — Konsent */}
              <details className="group rounded-2xl border border-emerald-300 overflow-hidden" open>
                <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-emerald-50 hover:bg-emerald-100 list-none">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    5
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Neue Runde — Konsent ✅</span>
                    <span className="ml-2 text-xs text-emerald-600 font-medium">Beschlossen!</span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">
                    ▾
                  </span>
                </summary>
                <div className="px-6 py-5 border-t border-emerald-200">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                    {['Lea', 'Anna', 'Sarah', 'Marco', 'Jan', 'Tom'].map((name) => (
                      <div
                        key={name}
                        className="rounded-xl p-2.5 bg-emerald-50 border border-emerald-200 text-center"
                      >
                        <p className="text-xs font-semibold text-gray-800">{name}</p>
                        <p className="text-xs text-emerald-700 font-medium mt-0.5">✅ Konsent</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-emerald-100 rounded-xl border border-emerald-300">
                    <p className="text-sm font-semibold text-emerald-900">🎉 Beschluss gefasst!</p>
                    <p className="text-xs text-emerald-800 mt-1">
                      Der überarbeitete Vorschlag hat Konsent. Tom hat seinen Einwand zurückgezogen
                      — das Anliegen wurde integriert. Evaluationsdatum: in 6 Wochen.
                    </p>
                  </div>
                </div>
              </details>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Dieser Prozess lief async — über 2 Tage, ohne ein einziges Meeting.
            </p>
          </div>
        </section>

        {/* Die Bewegung — Omitakuyasin */}
        <section
          className="py-20 bg-gradient-to-br from-slate-900 to-indigo-950 text-white"
          aria-labelledby="movement-heading"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/10 text-indigo-200 mb-6">
                Mitákuye Oyásʼiŋ — Wir sind alle verbunden
              </span>
              <h2
                id="movement-heading"
                className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              >
                Das Werkzeug. <span className="text-indigo-300">Die Bewegung.</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                adlix consent ist mehr als Software. Es ist der digitale Ausdruck einer Haltung:
                Jeder Mensch trägt etwas Einzigartiges bei. Einwände sind Geschenke. Entscheidungen
                wachsen, wenn alle gehört werden.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <article className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-3xl mb-4">🔵</div>
                <h3 className="font-semibold text-white mb-2">Omitakuyasin</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Lakota für &ldquo;Alle meine Verwandten&rdquo;. Keine Bitte — eine Weltanschauung.
                  Consent, weil der andere mein Verwandter ist. Kreise, weil jeder Platz
                  gleichwertig ist.
                </p>
              </article>
              <article className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-3xl mb-4">🌀</div>
                <h3 className="font-semibold text-white mb-2">Agile Tribes</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Teams, die mehr sind als Arbeitsgruppen. Tribes verbinden sich über Werte, nicht
                  Verträge. Wer gemeinsam Consent-Entscheidungen trifft, baut Vertrauen — das
                  Fundament eines lebendigen Tribe.
                </p>
              </article>
              <article className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-3xl mb-4">♾️</div>
                <h3 className="font-semibold text-white mb-2">Die Problemlöser e.V.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  adlix consent entstand aus einem Verein, der Kreisarbeit lebt. Die Plattform ist
                  das <em>Wie</em> — die Bewegung ist das <em>Warum</em>. Spürbar in jeder
                  Entscheidung, ohne es erklären zu müssen.
                </p>
              </article>
            </div>

            <div className="mt-12 p-6 bg-white/5 border border-indigo-400/20 rounded-2xl max-w-2xl mx-auto">
              <p className="text-indigo-200 italic text-lg leading-relaxed">
                &ldquo;Das Tool wird so gebaut, dass es sich <em>anders</em> anfühlt — spürbar, dass
                hier eine andere Haltung dahintersteht. Ohne es zu erklären.&rdquo;
              </p>
              <p className="mt-3 text-xs text-slate-500 uppercase tracking-widest">
                Aus dem Konzept — adlix consent
              </p>
            </div>
          </div>
        </section>

        {/* Community & Impact */}
        <section
          className="py-20 bg-white border-t border-gray-100"
          aria-labelledby="community-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🌍</span> Wachsende Bewegung
              </div>
              <h2 id="community-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Eine neue Art, gemeinsam zu entscheiden
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Immer mehr Teams entdecken, dass Consent-Findung besser funktioniert als
                Abstimmungen. Hier ist, was sie erleben.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  stat: '2.400+',
                  label: 'Aktive Teams',
                  sub: 'nutzen Consent täglich',
                  icon: '👥',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                },
                {
                  stat: '18.500+',
                  label: 'Entscheidungen',
                  sub: 'über alle Kreise',
                  icon: '✅',
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50',
                },
                {
                  stat: '94%',
                  label: 'Umsetzungsquote',
                  sub: 'Consent-Beschlüsse',
                  icon: '🚀',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50',
                },
                {
                  stat: '3×',
                  label: 'Schneller',
                  sub: 'als klassische Meetings',
                  icon: '⚡',
                  color: 'text-amber-600',
                  bg: 'bg-amber-50',
                },
              ].map(({ stat, label, sub, icon, color, bg }) => (
                <div
                  key={label}
                  className={`rounded-2xl border border-gray-100 p-6 text-center ${bg}`}
                >
                  <span className="text-3xl mb-3 block" aria-hidden="true">
                    {icon}
                  </span>
                  <div className={`text-3xl font-black ${color} mb-1`}>{stat}</div>
                  <div className="text-sm font-semibold text-gray-700">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* How teams feel */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold text-center mb-10">
                Was Teams erleben, wenn sie Consent zum ersten Mal nutzen
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🫂',
                    title: '„Endlich fühlen sich alle gehört"',
                    text: 'Die stillen Stimmen im Team melden sich. Nicht weil sie müssen — sondern weil der Prozess es sicher macht.',
                    person: 'Team aus 8 Personen, Software-Entwicklung',
                  },
                  {
                    icon: '⏰',
                    title: '„Wir sparen 3 Stunden pro Woche"',
                    text: 'Kein Endlos-Meeting mehr. Entscheidungen fallen, ohne dass jemand überstimmt wird. Der Prozess strukturiert sich selbst.',
                    person: 'Verein mit 40 Mitgliedern, async',
                  },
                  {
                    icon: '🔍',
                    title: '„Einwände sind jetzt Geschenke"',
                    text: 'Was früher als Widerstand galt, ist jetzt die wertvollste Information im Raum. Die Qualität der Entscheidungen ist messbar gestiegen.',
                    person: '15-köpfiges Startup, Produktentscheidungen',
                  },
                ].map(({ icon, title, text, person }) => (
                  <div key={title} className="bg-white/8 border border-white/10 rounded-2xl p-6">
                    <div className="text-3xl mb-4" aria-hidden="true">
                      {icon}
                    </div>
                    <h4 className="font-semibold text-white text-base mb-3 leading-snug">
                      {title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{text}</p>
                    <p className="text-xs text-slate-500 italic border-t border-white/10 pt-3">
                      {person}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA inside community section */}
              <div className="mt-12 text-center">
                <p className="text-indigo-200 mb-6 text-lg">
                  Dein Team könnte das nächste sein, das den Unterschied merkt.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium bg-white text-primary rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Kostenlos starten — keine Kreditkarte
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="mt-4 text-indigo-300/60 text-sm">
                  Free-Plan: 3 Vorhaben · Bis 50 Teilnehmer · Sofort einsatzbereit
                </p>
              </div>
            </div>
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

        {/* Tool Preview — Consent Loop Mini-Dashboard */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="tool-preview-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🖥️</span> Das Tool
              </div>
              <h2 id="tool-preview-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                So sieht Consent in adlix consent aus
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Kein Backend-Panel, keine abstrakten Settings. Ein klarer Prozess, der sich selbst
                erklärt.
              </p>
            </div>

            {/* Tool Preview Mockup */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-gray-50">
              {/* Browser chrome */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-white rounded-md px-3 py-1 text-xs text-gray-500 border border-gray-200">
                    consent.adlix-club.de/projects/sprint-q2
                  </div>
                </div>
              </div>

              {/* App layout */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-52 bg-slate-800 text-white p-4 shrink-0">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">🗳️</span>
                      <span className="font-bold text-sm">adlix consent</span>
                    </div>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { icon: '🏠', label: 'Dashboard', active: false },
                      { icon: '🔵', label: 'Mein Kreis', active: true },
                      { icon: '📋', label: 'Vorhaben', active: false },
                      { icon: '⚙️', label: 'Einstellungen', active: false },
                    ].map(({ icon, label, active }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${active ? 'bg-white/20 font-semibold' : 'text-slate-400 hover:text-white'}`}
                      >
                        <span>{icon}</span> {label}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6 overflow-hidden">
                  {/* Project header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Sprint-Ziel Q2</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Bezahlprozess bis Ende Juni — Produktteam
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">
                          🔴 Abstimmungsrunde
                        </span>
                        <span className="text-xs text-gray-400">Runde 1 von 2</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-violet-700">5/6</div>
                      <div className="text-xs text-gray-500">haben abgestimmt</div>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3 mb-6">
                    {[
                      { label: '✅ Konsent', count: 4, color: 'bg-emerald-500', width: 'w-32' },
                      {
                        label: '💛 Leichter Einwand',
                        count: 0,
                        color: 'bg-amber-500',
                        width: 'w-0',
                      },
                      {
                        label: '🔴 Schwerw. Einwand',
                        count: 1,
                        color: 'bg-red-500',
                        width: 'w-10',
                      },
                      { label: '⏸️ Enthalten', count: 0, color: 'bg-slate-400', width: 'w-0' },
                    ].map(({ label, count, color, width }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-36 shrink-0">{label}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div className={`${color} ${width} h-full rounded-full`} />
                        </div>
                        <span className="text-xs font-mono text-gray-600 w-6 text-right">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Proposal card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      📝 Aktueller Vorschlag — Runde 2
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "Unser Sprint-Ziel Q2: Wir liefern den neuen Bezahlprozess bis Ende Juni.
                      Inkrementeller Go-Live: erst intern testen, dann Kunden.{' '}
                      <span className="text-emerald-600 font-medium">
                        Mit Fallback-Regel: Bei Problemen im internen Test stoppen wir den externen
                        Rollout.
                      </span>
                      "
                    </p>
                    <p className="text-xs text-gray-400 mt-2 italic">
                      ↑ Angepasst nach Dialog mit Jan — Fallback-Regel integriert
                    </p>
                  </div>

                  {/* Major objection card */}
                  <div className="bg-red-50 rounded-xl border border-red-200 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🔴</span>
                      <span className="text-sm font-semibold text-red-800">
                        Schwerwiegender Einwand — integriert
                      </span>
                    </div>
                    <p className="text-sm text-red-700">
                      Jan: "Inkrementeller Go-Live gefährdet die Q2-Deadline bei Komplikationen."
                    </p>
                    <div className="mt-2 pt-2 border-t border-red-200">
                      <p className="text-xs text-emerald-700 font-medium">
                        ✅ Integration: Fallback-Regel hinzugefügt — Jan bestätigt
                      </p>
                    </div>
                  </div>

                  {/* Vote buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      {
                        emoji: '✅',
                        label: 'Konsent',
                        color: 'bg-emerald-600 hover:bg-emerald-700',
                      },
                      { emoji: '💛', label: 'Leicht', color: 'bg-amber-500 hover:bg-amber-600' },
                      { emoji: '🔴', label: 'Einwand', color: 'bg-red-600 hover:bg-red-700' },
                      { emoji: '⏸️', label: 'Enthalten', color: 'bg-slate-600 hover:bg-slate-700' },
                    ].map(({ emoji, label, color }) => (
                      <button
                        key={label}
                        className={`${color} text-white rounded-xl py-3 text-sm font-medium flex flex-col items-center gap-1`}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Kein Handbuch nötig. Der Prozess erklärt sich durch die Oberfläche.
            </p>
          </div>
        </section>

        {/* Social Proof / Testimonials */}
        <section className="bg-gray-50 py-16" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-4">
              Was Teams sagen
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
              Frühe Anwender über ihre Erfahrungen mit dem Consent-Prozess.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    '„Wir haben aufgehört, endlos zu diskutieren. Seit wir Consent nutzen, treffen wir Entscheidungen schneller — und alle tragen sie wirklich mit. Nicht weil sie überstimmt wurden, sondern weil niemand einen echten Blocker hatte."',
                  name: 'Marcus L.',
                  role: 'Team Lead, agiles Software-Team (8 Personen)',
                  emoji: '👨‍💻',
                  context:
                    'Vorher: 2-Stunden-Meetings ohne Ergebnis. Nachher: Async-Entscheidungen in 24h.',
                },
                {
                  quote:
                    '„Der Einwand-Prozess hat unserem Vorstand mehr Vertrauen gebracht als jedes Abstimmungsergebnis. Wenn jemand einen Einwand hat und der integriert wird — das zeigt, dass die Entscheidung robust ist."',
                  name: 'Claudia M.',
                  role: 'Vorständin, Vereinsvorstand (6 Personen)',
                  emoji: '🤝',
                  context: 'Verein „Die Problemlöser e.V." — Entscheidungen für 200+ Mitglieder.',
                },
                {
                  quote:
                    '„Am meisten überrascht hat mich: Die stillen Menschen im Team trauen sich plötzlich, Bedenken zu äußern. Der strukturierte Prozess nimmt den Druck raus. Kein Schlagwort-Wettbewerb mehr."',
                  name: 'Jan K.',
                  role: 'Gründer, Design-Studio (5 Personen)',
                  emoji: '🎨',
                  context:
                    'Remote-first Team, über 3 Zeitzonen verteilt. Consent läuft komplett async.',
                },
                {
                  quote:
                    '„Die Enthaltungs-Analyse war ein Augenöffner. Wir dachten, 5 Enthaltungen wären kein Problem — aber die Plattform zeigte uns: Da verstecken sich Bedenken. Das haben wir vorher nie gesehen."',
                  name: 'Anke S.',
                  role: 'Projektmanagerin, NGO (12 Personen)',
                  emoji: '🌱',
                  context:
                    'Arbeitet seit 8 Monaten mit adlix consent. Nutzt den Enthaltungs-Feedback-Loop.',
                },
                {
                  quote:
                    '„Ich war skeptisch. Meinungen sind doch subjektiv — wie soll ein Prozess das objektivieren? Nach 3 Monaten Consent bin ich überzeugt: Die Qualität unserer Entscheidungen ist messbar gestiegen."',
                  name: 'Tobias R.',
                  role: 'CTO, Tech-Startup (15 Personen)',
                  emoji: '⚙️',
                  context: 'Nutzt Consent für alle technischen Architektur-Entscheidungen.',
                },
                {
                  quote:
                    '„Als Kreiskoordinatorin brauche ich ein Tool, das den Prozess abbildet — nicht ein Tool, das ich in den Prozess einzwängen muss. adlix consent passt zur Soziokratie. Das war bei anderen Tools nie der Fall."',
                  name: 'Lisa W.',
                  role: 'Soziokratie-Praktikerin, Facilitation (20+ Personen)',
                  emoji: '🔵',
                  context:
                    'Arbeitet seit 2 Jahren soziokratisch. Hat 4 verschiedene Tools vergeblich probiert.',
                },
              ].map(({ quote, name, role, emoji, context }) => (
                <figure
                  key={name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col"
                >
                  <blockquote className="flex-1">
                    <p className="text-gray-700 italic text-sm leading-relaxed">{quote}</p>
                    {context && <p className="mt-2 text-xs text-gray-400 italic">{context}</p>}
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {emoji}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{name}</p>
                      <p className="text-xs text-gray-500">{role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase: Was der Consent-Loop kann */}
        <section
          className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 border-t border-gray-100"
          aria-labelledby="features-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🛠️</span> Das MVP — alles was du brauchst
              </div>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Was der Consent-Loop alles kann
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Kein Feature-Bloat. Jede Funktion ist da, weil der Consent-Prozess sie braucht.
                Alles andere kommt — aber die Grundlage ist komplett.
              </p>
            </div>

            {/* Feature grid — 4 phases */}
            {[
              {
                num: 1,
                title: 'Ein Vorhaben einreichen',
                color: 'bg-blue-500',
                items: [
                  {
                    icon: '📋',
                    title: 'Titel & Beschreibung',
                    desc: 'Klar formuliert: Was schlägst du vor — und warum?',
                  },
                  {
                    icon: '🎯',
                    title: 'Ziel verankern',
                    desc: 'Das gemeinsame Ziel wird mit eingereicht — damit Einwände im Kontext bleiben.',
                  },
                  {
                    icon: '📅',
                    title: 'Evaluationsdatum',
                    desc: 'Jede Entscheidung bekommt ein Ablaufdatum. Bei Bedarf wird angepasst.',
                  },
                ],
              },
              {
                num: 2,
                title: 'Geführte Runden — Schritt für Schritt',
                color: 'bg-amber-500',
                items: [
                  {
                    icon: '❓',
                    title: 'Informationsrunde',
                    desc: 'Nur Verständnisfragen — keine Meinungen, keine Diskussion.',
                  },
                  {
                    icon: '💬',
                    title: 'Reaktionsrunde',
                    desc: 'Reihum äußern alle ihre Perspektiven — der Einreicher hört nur zu.',
                  },
                  {
                    icon: '🔄',
                    title: 'Anpassung (optional)',
                    desc: 'Der Einreicher überarbeitet den Vorschlag — oder reicht ihn unverändert ein.',
                  },
                  {
                    icon: '🗳️',
                    title: 'Consent-Abstimmung',
                    desc: '4 Optionen: Konsent ✓ / Leichter Einwand 💛 / Schwerwiegend 🔴 / Enthalten ⏸️.',
                  },
                  {
                    icon: '🤝',
                    title: 'Integration (optional)',
                    desc: 'Schwerwiegende Einwände werden besprochen und integriert.',
                  },
                  {
                    icon: '✅',
                    title: 'Beschluss',
                    desc: 'Dokumentiert, auswertbar, mit Audit-Trail.',
                  },
                ],
              },
              {
                num: 3,
                title: 'Die Abstimmung — mehr als ein Klick',
                color: 'bg-emerald-500',
                items: [
                  {
                    icon: '🔴',
                    title: 'Schwerwiegender Einwand — geführt',
                    desc: '6-Phasen-Dialog: Verstehen → Validieren → Dialogisieren → Integrieren → Prüfen → Neu.',
                  },
                  {
                    icon: '💛',
                    title: 'Leichter Einwand — dokumentiert',
                    desc: 'Anmerkungen, die nicht blockieren, aber im Audit-Trail festgehalten werden.',
                  },
                  {
                    icon: '⏸️',
                    title: 'Enthaltung — mit Reflexion',
                    desc: '5 Gründe inkl. geführter Selbstreflexion bei Grund E: versteckte Einwände sichtbar machen.',
                  },
                  {
                    icon: '📊',
                    title: 'Echtzeit-Fortschritt',
                    desc: 'Jeder sieht live, wer abgestimmt hat. Transparenz von Anfang an.',
                  },
                ],
              },
              {
                num: 4,
                title: 'Audit-Trail & Insights',
                color: 'bg-indigo-500',
                items: [
                  {
                    icon: '📜',
                    title: 'Vollständiges Protokoll',
                    desc: 'Jede Phase, jede Stimme, jede Begründung — automatisch dokumentiert.',
                  },
                  {
                    icon: '🔒',
                    title: 'Anonyme Bedenken',
                    desc: 'Bedenken einbringen, ohne dass Identität sichtbar wird. Thematiert, nicht personifiziert.',
                  },
                  {
                    icon: '🔍',
                    title: 'Enthaltungs-Analyse (Pro)',
                    desc: 'Ab 3+ Enthaltungen: KI-gestützte Musteranalyse mit Empfehlungen.',
                  },
                ],
              },
            ].map(({ num, title, color, items }) => (
              <div key={num} className="mb-10 last:mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span
                    className={`w-7 h-7 ${color} text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0`}
                  >
                    {num}
                  </span>
                  {title}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(({ icon, title: itemTitle, desc }) => (
                    <div
                      key={itemTitle}
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{icon}</span>
                        <p className="font-semibold text-sm">{itemTitle}</p>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-3">
                All das ist im Free-Plan enthalten — für Teams bis 50 Personen.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
              >
                Jetzt kostenlos starten →
              </Link>
            </div>
          </div>
        </section>

        {/* Was passiert bei einem Einwand — Der Integrations-Flow */}
        <section
          className="py-20 bg-gradient-to-b from-red-50/30 to-white border-t border-gray-100"
          aria-labelledby="objection-flow-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🔴</span> Das Herzstück: Einwand → Integration
              </div>
              <h2 id="objection-flow-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Was passiert, wenn jemand widerspricht?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Ein schwerwiegender Einwand ist kein Blockade — es ist ein Geschenk. adlix consent
                gibt ihm einen Prozess. Hier siehst du, wie aus einem Einwand eine bessere
                Entscheidung wird.
              </p>
            </div>

            {/* 6-Step Integration Flow */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {[
                {
                  step: 1,
                  icon: '🧠',
                  title: 'Einwand verstehen',
                  color: 'bg-red-50 border-red-200',
                  accent: 'text-red-600',
                  badge: 'bg-red-100 text-red-700',
                  description:
                    'Wer einen Einwand hat, formuliert ihn frei — ohne Formular. Die Plattform prüft: Ist es ein sachliches Argument gegen das gemeinsame Ziel, oder eher eine persönliche Präferenz?',
                  detail: '✅ Sachlich → Blocker  •  ❌ Präferenz → Dokumentiert als Bedenken',
                },
                {
                  step: 2,
                  icon: '👥',
                  title: 'Kreis prüft Validität',
                  color: 'bg-orange-50 border-orange-200',
                  accent: 'text-orange-600',
                  badge: 'bg-orange-100 text-orange-700',
                  description:
                    'Alle Kreismitglieder sehen den formulierten Einwand und schätzen ein: Ist das sachlich begründet — oder persönliche Präferenz? Das ist keine Abstimmung, sondern Orientierung.',
                  detail:
                    'Mehrheitlich sachlich → Dialog geht weiter. Mehrheitlich Präferenz → Einwand wird zu Bedenken.',
                },
                {
                  step: 3,
                  icon: '💡',
                  title: 'Lösungsraum öffnen',
                  color: 'bg-amber-50 border-amber-200',
                  accent: 'text-amber-600',
                  badge: 'bg-amber-100 text-amber-700',
                  description:
                    'Alle Beteiligten bringen reihum Ideen ein: Wie könnte das Vorhaben angepasst werden? Keine Kritik an anderen Ideen in dieser Phase — nur sammeln, nicht diskutieren.',
                  detail: '💡 Lösungsidee  •  ❓ Frage  •  ➕ Zustimmung  •  ⏭️ Passe',
                },
                {
                  step: 4,
                  icon: '🔮',
                  title: 'Synthese',
                  color: 'bg-indigo-50 border-indigo-200',
                  accent: 'text-indigo-600',
                  badge: 'bg-indigo-100 text-indigo-700',
                  description:
                    'Der Einreicher sieht alle Lösungsideen und formuliert einen angepassten Vorschlag. Änderungen werden als Diff sichtbar gemacht — was hat sich warum geändert.',
                  detail: 'Diff-View: Vorhaben vor ↔ nach der Integration',
                },
                {
                  step: 5,
                  icon: '🤝',
                  title: 'Angepasstes Vorhaben vorstellen',
                  color: 'bg-blue-50 border-blue-200',
                  accent: 'text-blue-600',
                  badge: 'bg-blue-100 text-blue-700',
                  description:
                    'Der Einreicher präsentiert den angepassten Vorschlag. Die einwendende Person bestätigt: Adressiert das deinen Einwand? Ja → Einwand zurückgezogen, neuer Consent-Loop.',
                  detail:
                    'Ja → Loop beendet  •  Teilweise → Dialog geht weiter (max. N Runden)  •  Nein → Eskalationspfad',
                },
                {
                  step: 6,
                  icon: '📅',
                  title: 'Eskalationspfad (falls nötig)',
                  color: 'bg-purple-50 border-purple-200',
                  accent: 'text-purple-600',
                  badge: 'bg-purple-100 text-purple-700',
                  description:
                    'Wenn nach mehreren Dialogrunden kein Konsens möglich ist: Vorhaben zurückstellen, Teilentscheidung, externe Moderation — oder zeitlich begrenzter Versuch mit Evaluationsdatum.',
                  detail:
                    '🔮 Zeitlich begrenzter Versuch  •  🔄 Zurückstellen  •  ➡️ Teilentscheidung',
                },
              ].map(({ step, icon, title, color, accent, badge, description, detail }) => (
                <article key={step} className={`rounded-2xl border p-6 ${color} flex flex-col`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${accent} opacity-60`}
                        >
                          Schritt {step}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>
                      {title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-3">{description}</p>
                  <p className={`text-xs ${accent} font-medium leading-relaxed`}>{detail}</p>
                </article>
              ))}
            </div>

            {/* Vergleich: Ohne vs. Mit Integration-Prozess */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Live-Beispiel: Der Einwand im Team
                </h3>
                <p className="text-gray-600 text-sm">
                  Dieselbe Situation — mit und ohne strukturierten Integrationsprozess.
                </p>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Ohne */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-red-500 text-xl">❌</span>
                    <h4 className="font-bold text-gray-800">Ohne Consent-Prozess</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      { emoji: '💬', text: 'Team diskutiert hitzig im Meeting — keiner hört zu' },
                      { emoji: '😤', text: 'Einwender fühlt sich überstimmt — schweigt fortan' },
                      { emoji: '📉', text: 'Entscheidung wird umgesetzt — Bedenken bleiben' },
                      { emoji: '🔁', text: 'Problem taucht 3 Monate später wieder auf — größer' },
                      { emoji: '😞', text: 'Team-Frust in der Retro — aber晚了' },
                    ].map(({ emoji, text }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
                        <p className="text-gray-600 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-xs text-red-500 font-semibold">
                      → Ergebnis: Getroffene, nicht getragene Entscheidung
                    </p>
                  </div>
                </div>

                {/* Mit */}
                <div className="p-8 bg-emerald-50/40">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-emerald-500 text-xl">✅</span>
                    <h4 className="font-bold text-gray-800">Mit adlix consent — Integration</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      { emoji: '🔴', text: 'Schwerwiegender Einwand: „Kundenfreitag ungeklärt"' },
                      { emoji: '💡', text: 'Dialog-Raum: 3 Lösungsideen werden gesammelt' },
                      {
                        emoji: '🔄',
                        text: 'Vorhaben angepasst: „Freitag: intern, kein Kundenkontakt"',
                      },
                      { emoji: '✅', text: 'Einwender bestätigt: „Das adressiert mein Bedenken"' },
                      { emoji: '📋', text: 'Neuer Consent — diesmal mit 100% Zustimmung' },
                    ].map(({ emoji, text }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
                        <p className="text-gray-700 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-emerald-100">
                    <p className="text-xs text-emerald-600 font-semibold">
                      → Ergebnis: Robustere Entscheidung, getragen von allen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-6">
                Einwand ≠ Blockade. Einwand = Chance auf eine bessere Entscheidung.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Consent mit deinem Team starten →
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Demo ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-3xl font-bold text-center mb-4">
              Häufige Fragen
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Alles, was du wissen musst, um loszulegen.
            </p>
            <div className="space-y-4">
              {(
                [
                  {
                    q: 'Was ist der Unterschied zwischen Konsent und Konsens?',
                    a: 'Konsens bedeutet: alle stimmen aktiv zu — eine oft unerreichbare Bar. Konsent bedeutet: niemand hat einen schwerwiegenden, begründeten Einwand. Das klingt ähnlich, ist aber radikal unterschiedlich: Konsent ist schneller, pragmatischer und schützt trotzdem jede Stimme.',
                  },
                  {
                    q: 'Warum ist ein Einwand ein Geschenk und nicht ein Angriff?',
                    a: 'In der Soziokratie ist ein Einwand kein Widerstand gegen deine Idee — sondern ein Hinweis auf einen blinden Fleck. Wer einen schwerwiegenden Einwand hat, hat etwas gesehen, das du übersehen hast. Das zu integrieren macht den Vorschlag robuster. Deshalb: Einwände sind wertvolle Informationen, nicht persönliche Kritik.',
                  },
                  {
                    q: 'Was passiert, wenn jemand sich enthält?',
                    a: 'Enthaltung ist möglich — aber nicht als bequemer Ausweg. Die Plattform fragt nach dem Grund: Nicht betroffen? Brauche mehr Info? Anonyme Bedenken? Oder möchtest du dir nochmal Gedanken machen? Je nach Grund gibt es einen eigenen Folgeprozess. Ziel: versteckte Einwände sichtbar machen.',
                  },
                  {
                    q: 'Wer kann einen schwerwiegenden Einwand einbringen?',
                    a: 'Jedes Mitglied des betroffenen Kreises. Ein Einwand muss begründet sein und sich auf das gemeinsame Ziel beziehen — kein persönlicher Geschmack. adlix consent führt durch den Klärungsprozess und hilft dabei, echte Einwände von Präferenzen zu unterscheiden.',
                  },
                  {
                    q: 'Kann ich Consent-Entscheidungen später revidieren?',
                    a: '„Gut genug für jetzt — sicher genug zum Ausprobieren." Jede Consent-Entscheidung kann mit einem Evaluationsdatum versehen werden. Die Plattform erinnert dich, wenn ein Vorhaben zur Überprüfung fällig ist. Entscheidungen sind bewusst vorläufig.',
                  },
                  {
                    q: 'Für wie große Teams ist adlix consent geeignet?',
                    a: 'Free-Plan: bis 50 Teilnehmer pro Vorhaben. Pro: bis 500. Enterprise: unbegrenzt. Der Consent-Prozess funktioniert besonders gut in Kreisen von 5–20 Personen — auch größere Gruppen können ihn über Delegierte strukturieren.',
                  },
                  {
                    q: 'Brauche ich Vorkenntnisse in Soziokratie?',
                    a: 'Nein. adlix consent führt durch jeden Schritt — mit Erklärungen, Hinweisen und Leitfragen. Du lernst den Prozess, indem du ihn nutzt. Optional gibt es KI-Unterstützung (Pro), die Einwände analysiert und Formulierungshilfen gibt.',
                  },
                  {
                    q: 'Was passiert, wenn ein Team-Mitglied gar nicht abstimmt?',
                    a: 'Die Plattform erinnert automatisch. Wenn jemand dauerhaft nicht teilnimmt, zeigt das einen eigenen Wert: Entweder die Person fühlt sich nicht eingebunden, oder das Vorhaben betrifft sie nicht. Als Owner kannst du die Abstimmung auch vorzeitig schließen und den Grund dokumentieren.',
                  },
                  {
                    q: 'Funktioniert Consent auch komplett async — ohne Videocall?',
                    a: 'Ja — das ist einer der größten Vorteile von adlix consent. Der Prozess ist strukturell async: Informationsrunde, Reaktionsrunde und Abstimmung laufen alle über Nachrichten, nicht in Echtzeit. Du kannst auch um 22 Uhr antworten, wenn es dir passt. Der Kreis muss nie gleichzeitig online sein.',
                  },
                  {
                    q: 'Was ist ein Kreis und warum Kreis-Arbeit?',
                    a: 'Ein Kreis ist eine Gruppe von Menschen, die gemeinsam Entscheidungen trifft. Anders als Hierarchien gibt es im Kreis keine Chefs — jeder Platz ist gleichwertig. Kreisarbeit (Soziokratie) sorgt dafür, dass die richtigen Leute an der richtigen Entscheidung beteiligt sind. adlix consent bringt den Consent-Prozess digital in Kreise.',
                  },
                  {
                    q: 'Was bedeutet Omitakuyasin und warum steht es auf der Plattform?',
                    a: 'Omitakuyasin (Lakota) bedeutet „Alle meine Verwandten" — „Wir sind alle verbunden." Es ist das stille Fundament von adlix consent: Consent, weil der andere mein Verwandter ist. Einwände als Geschenk, nicht als Angriff. Kreise, weil jeder Platz gleichwertig ist. Kein Marketing-Slogan — eine Weltanschauung, die in der Haltung der Plattform spürbar ist.',
                  },
                  {
                    q: 'Wie viele Personen brauche ich minimum für einen Consent-Loop?',
                    a: 'Idealerweise 4–20 Personen. Consent funktioniert am besten in Kreisen dieser Größe, weil alle Perspektiven gehört werden können. Für größere Gruppen empfiehlt sich eine Delegierten-Struktur: Kreise wählen Vertreter für übergeordnete Entscheidungen.',
                  },
                  {
                    q: 'Was passiert, wenn der Einreicher den Vorschlag nicht anpassen will?',
                    a: 'Das ist ein wichtiger Punkt: Der Einreicher ist nicht gezwungen, jeden Einwand zu integrieren. Wenn ein Einwand nicht integriert werden kann oder der Einreicher anderer Meinung ist, gibt es Eskalationspfade: Teilentscheidung, zeitlich begrenzter Versuch, externe Moderation. Consent ist kein Einbahnstraße — aber der Prozess sorgt dafür, dass Einwände gehört und diskutiert werden.',
                  },
                  {
                    q: 'Sind die Abstimmungen und Einwände für alle sichtbar?',
                    a: 'Grundsätzlich ja — vollständige Transparenz gehört zum Consent-Prinzip. Wer abgestimmt hat und warum, ist Teil des Audit-Trails. Es gibt aber eine Ausnahme: Wer anonym Bedenken äußert (Enthaltungsgrund D), dessen Identität bleibt verborgen. Die Bedenken werden thematisch zusammengefasst — ohne Rückschluss auf Einzelpersonen.',
                  },
                  {
                    q: 'Was ist der Unterschied zu Loomio oder anderen Abstimmungstools?',
                    a: 'Loomio ist ein generisches Abstimmungstool — es kann vieles, aber nichts richtig gut. adlix consent ist auf den Consent-Prozess spezialisiert: geführte Phasen, strukturierte Einwand-Integration, Enthaltungs-Folgeprozesse, KI-Unterstützung (Pro). Außerdem: Die Plattform fühlt sich anders an — spürbar, dass hier eine andere Haltung dahintersteht.',
                  },
                  {
                    q: 'Kann ich bestehende Teams und Kreise importieren?',
                    a: 'Du kannst Kreise erstellen und Teilnehmer über Einladungs-Links einladen. Einladungs-Links funktionieren wie GitHub-Einladungen: Wer den Link hat, tritt dem Kreis bei. Eine Migration bestehender Daten (z.B. aus einer Tabelle) ist aktuell als CSV-Import in der Roadmap für Pro.',
                  },
                  {
                    q: 'Was passiert, wenn eine Abstimmung nie abgeschlossen wird?',
                    a: 'Die Plattform erinnert nicht-abstimmende Teilnehmer automatisch. Wenn jemand dauerhaft nicht reagiert, kann der Owner die Abstimmung vorzeitig schließen — mit Dokumentation des Grundes. So kommt kein Vorhaben dauerhaft ins Stocken. Bei längerer Inaktivität kann der Owner auch eine neue Runde mit angepasstem Vorschlag starten.',
                  },
                  {
                    q: 'Wie unterscheidet sich Consent von einer einfachen Mehrheitsabstimmung?',
                    a: 'Bei einer Mehrheitsabstimmung gewinnt die Seite mit den meisten Stimmen — die Minderheit geht leer aus. Das Ergebnis wird „durchgesetzt", nicht „mitgetragen". Bei Consent hat jedes Mitglied das Recht auf einen schwerwiegenden Einwand. Kein Majoritätsprozentsatz, keine Überstimmung. Das Ergebnis wird getragen, weil niemand einen begründeten Blocker hatte.',
                  },
                  {
                    q: 'Was bedeutet „gut genug für jetzt — sicher genug zum Ausprobieren"?',
                    a: 'Das ist das Kernprinzip des Consent: Perfektion ist der Feind von Fortschritt. Eine Entscheidung muss nicht perfekt sein — sie muss nur gut genug sein, um loszulegen, und sicher genug, um keine schweren Schäden anzurichten, falls sie sich als falsch herausstellt. Wenn sich etwas bewährt — gut. Wenn nicht, wird angepasst. Das Evaluationsdatum macht das explizit.',
                  },
                  {
                    q: 'Ist adlix consent auch für Vereine und NGOs geeignet?',
                    a: 'Absolut. Besonders für Vereine ist Consent ideal: Transparente Entscheidungen für alle Mitglieder — auch für die, die bei der Mitgliederversammlung nicht dabei waren. Alles dokumentiert, nachvollziehbar, fair. Und: async, sodass Mitglieder auch zeitversetzt teilnehmen können, ohne zu einer bestimmten Uhrzeit online sein zu müssen.',
                  },
                  {
                    q: 'Wie sicher sind meine Daten? Wem gehören die Entscheidungen?',
                    a: 'Deine Daten gehören dir. Entscheidungen, die in adlix consent getroffen werden, gehören dem jeweiligen Kreis. adlix consent speichert die Daten auf Servern in der EU. Export-Funktion (Free) ermöglicht Download aller deiner Daten. Account-Löschung löscht alle persönlichen Daten (mit 30-Tage-Sicherheitsfenster). Details in der Datenschutzerklärung.',
                  },
                  {
                    q: 'Was passiert nach einer Enthaltung mit Grund B oder C (mehr Info/Klärung)?',
                    a: 'Deine Anfrage geht an den Einreicher. Er hat Zeit, dir die gewünschte Information oder Klärung zu geben. Danach wirst du erneut zur Abstimmung eingeladen. Wenn die Antwort ausbleibt, wird der Einreicher benachrichtigt und das Vorhaben pausiert. So wird sichergestellt, dass niemand „blind" abstimmen muss.',
                  },
                  {
                    q: 'Kann ein Vorhaben nach einem gescheiterten Consent-Loop neu eingereicht werden?',
                    a: 'Ja. Wenn ein Consent-Loop nach mehreren Runden und Dialogen zu keinem Ergebnis führt, kann das Vorhaben zurückgestellt werden. Der Einreicher überdenkt es und reicht es ggf. in angepasster Form neu ein. Das ist kein Versagen — das ist Teil des Lernprozesses. Manchmal braucht ein Thema mehrere Anläufe.',
                  },
                  {
                    q: 'Was ist ein Agile Tribe und wie passt adlix consent dazu?',
                    a: 'Ein Agile Tribe ist eine Gemeinschaft von Menschen, die sich über gemeinsame Werte verbindet — nicht über Organigramme. adlix consent ist das Werkzeug, um Tribe-Entscheidungen fair und transparent zu treffen. Wer gemeinsam Consent-Entscheidungen trifft, baut Vertrauen auf. Vertrauen ist das Fundament eines Tribe. Die Plattform ist das Wie — der Tribe ist das Ziel.',
                  },
                  {
                    q: 'Wann nutze ich Consent und wann eine einfache Abstimmung?',
                    a: 'Einfache Abstimmungen eignen sich für: klare Ja/Nein-Fragen (Termin finden, Location wählen), unwichtige Randthemen oder wenn alle bereits einer Meinung sind. Consent eignet sich für: alles, was das Team oder den Kreis wirklich betrifft — Vorhaben, Strategie, Rollenverteilung, Regeln. Faustregel: Wenn die Entscheidung Konsequenzen hat und/oder一些人 widersprechen könnten — Consent nutzen. Wenn es nur um eine Koordination geht und niemand einen echten Blocker hat — eine schnelle Abstimmung reicht.',
                  },
                ] as { q: string; a: string }[]
              ).map(({ q, a }, i) => (
                <details
                  key={i}
                  className="group border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 list-none">
                    <span className="font-medium pr-4">{q}</span>
                    <span
                      className="text-primary shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {a}
                  </div>
                </details>
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
                  <Link href="#team-benefits-heading" className="hover:text-gray-900">
                    Für Teams
                  </Link>
                </li>
                <li>
                  <Link href="#why-consent-heading" className="hover:text-gray-900">
                    Warum Consent
                  </Link>
                </li>
                <li>
                  <Link href="#faq-heading" className="hover:text-gray-900">
                    FAQ
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
