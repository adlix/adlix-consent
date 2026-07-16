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
                  href="#consent-demo-heading"
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
              href="#consent-demo-heading"
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Demo ansehen ▶️
            </Link>
          </div>
          {/* Trust badge */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">✅</span> Kostenlos starten
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">🔒</span> Keine Kreditkarte
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">🇩🇪</span> Server in Deutschland
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">🌀</span> Soziokratie-geprüft
            </span>
          </div>
        </section>

        {/* ── Consent in 60 Sekunden ── */}
        <section
          className="py-12 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50"
          aria-labelledby="sixty-sec-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 id="sixty-sec-heading" className="text-2xl sm:text-3xl font-bold mb-2">
                Consent in 60 Sekunden
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto">
                6 Phasen. Jede mit einer klaren Aufgabe. Keine Verwirrung — nur Struktur.
              </p>
            </div>

            {/* Phase steps — horizontal scrollable on mobile, grid on desktop */}
            <div className="flex sm:grid sm:grid-cols-6 gap-3 overflow-x-auto pb-3 sm:pb-0 snap-x snap-mandatory">
              {[
                {
                  phase: '1',
                  emoji: '📝',
                  title: 'Vorhaben\nvorstellen',
                  desc: 'Was willst du erreichen? Wer ist betroffen?',
                  color: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  dot: 'bg-blue-500',
                  arrow: true,
                },
                {
                  phase: '2',
                  emoji: '❓',
                  title: 'Fragen\nstellen',
                  desc: 'Verständnisfragen — nur Verstehen, kein Urteilen',
                  color: 'from-sky-50 to-cyan-50',
                  border: 'border-sky-200',
                  dot: 'bg-sky-500',
                  arrow: true,
                },
                {
                  phase: '3',
                  emoji: '💬',
                  title: 'Reagieren',
                  desc: 'Jede Stimme bekommt Raum — reihum, fair',
                  color: 'from-violet-50 to-purple-50',
                  border: 'border-violet-200',
                  dot: 'bg-violet-500',
                  arrow: true,
                },
                {
                  phase: '4',
                  emoji: '🗳️',
                  title: 'Abstimmen',
                  desc: 'Konsent, leichter Einwand, schwerer Einwand, Enthaltung',
                  color: 'from-amber-50 to-orange-50',
                  border: 'border-amber-200',
                  dot: 'bg-amber-500',
                  arrow: true,
                },
                {
                  phase: '5',
                  emoji: '🔄',
                  title: 'Integrieren',
                  desc: 'Einwände werden angepasst — nicht überstimmt',
                  color: 'from-teal-50 to-emerald-50',
                  border: 'border-teal-200',
                  dot: 'bg-teal-500',
                  arrow: true,
                },
                {
                  phase: '6',
                  emoji: '✅',
                  title: 'Beschließen',
                  desc: 'Audit-Trail, Evaluationsdatum — fertig',
                  color: 'from-emerald-50 to-green-50',
                  border: 'border-emerald-200',
                  dot: 'bg-emerald-500',
                  arrow: false,
                },
              ].map(({ phase, emoji, title, desc, color, border, dot, arrow }, idx) => (
                <div key={phase} className="flex-1 sm:flex-none snap-start">
                  <div
                    className={`rounded-xl border p-4 bg-gradient-to-br ${color} ${border} h-full relative`}
                  >
                    {/* Phase number */}
                    <div
                      className={`w-7 h-7 rounded-full ${dot} flex items-center justify-center text-white text-xs font-bold mb-3`}
                    >
                      {phase}
                    </div>
                    <div className="text-2xl mb-2">{emoji}</div>
                    <h3 className="text-sm font-bold text-gray-800 whitespace-pre-line mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    {/* Arrow connector */}
                    {arrow && idx < 5 && (
                      <div
                        className="hidden sm:flex absolute -right-[14px] top-1/2 -translate-y-1/2 z-10 text-gray-300"
                        aria-hidden="true"
                      >
                        →
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom insight */}
            <p className="text-center text-sm text-gray-400 mt-5">
              <span className="font-medium text-gray-600">Der Unterschied zu Abstimmungen?</span>{' '}
              Niemand wird überstimmt. Ein schwerwiegender Einwand wird integriert — nicht
              ignoriert.
            </p>
          </div>
        </section>

        {/* ── 3 Schritte zum ersten Consent-Loop ── */}
        <section
          className="py-16 bg-gradient-to-b from-emerald-50/40 via-white to-white border-t border-gray-100"
          aria-labelledby="quickstart-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🚀</span> Sofort loslegen
              </div>
              <h2 id="quickstart-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                In 3 Schritten zum ersten Consent-Loop
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Kein Onboarding-Marathon. Kein Tooltip-Labyrinth. Du brauchst 5 Minuten — und ein
                Team mit einer Entscheidung.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  icon: '🌀',
                  title: 'Kreis erstellen',
                  desc: 'Nenne deinen Kreis — z.B. "Produktteam" oder "Vereinsvorstand". Lade dein Team über einen Link ein.',
                  detail: 'Keine E-Mail-Adressen nötig. Ein Link genügt.',
                  time: '30 Sekunden',
                  color: 'border-indigo-200 bg-indigo-50/50',
                  accent: 'text-indigo-600',
                  stepBg: 'bg-indigo-600',
                },
                {
                  step: 2,
                  icon: '📋',
                  title: 'Vorhaben einreichen',
                  desc: 'Beschreibe deinen Vorschlag — was möchtest du entscheiden? Was ist die Spannung dahinter?',
                  detail: 'Adlix consent führt dich durch die Felder. Kein Format-Chaos.',
                  time: '2 Minuten',
                  color: 'border-blue-200 bg-blue-50/50',
                  accent: 'text-blue-600',
                  stepBg: 'bg-blue-600',
                },
                {
                  step: 3,
                  icon: '🗳️',
                  title: 'Consent-Loop starten',
                  desc: 'Dein Team erhält eine Benachrichtigung. Jede Person kann — asynchron, in Ruhe — abstimmen, Fragen stellen und Einwände einbringen.',
                  detail: 'Async, dokumentiert, mit Erinnerungen. Kein Meeting nötig.',
                  time: '72 Stunden (Median)',
                  color: 'border-emerald-200 bg-emerald-50/50',
                  accent: 'text-emerald-600',
                  stepBg: 'bg-emerald-600',
                },
              ].map(({ step, icon, title, desc, detail, time, color, accent, stepBg }) => (
                <div key={step} className={`rounded-2xl border-2 p-6 relative ${color}`}>
                  <div
                    className={`absolute -top-4 left-6 w-10 h-10 ${stepBg} rounded-full flex items-center justify-center text-white text-lg font-black shadow-md`}
                  >
                    {step}
                  </div>
                  <div className="mt-2 mb-4">
                    <span className="text-4xl" aria-hidden="true">
                      {icon}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${accent}`}>{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                  <div className="flex items-start gap-2 bg-white/70 rounded-lg p-3">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{detail}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center gap-2">
                    <span className="text-gray-400 text-sm">⏱️</span>
                    <span className="text-xs font-medium text-gray-500">{time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Kostenlos für Teams bis 10 Personen. Keine Kreditkarte.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Kostenlos starten →
                </Link>
                <Link
                  href="#how-it-works-heading"
                  className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  So funktioniert's ↓
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Für wen ist adlix consent? ── */}
        <section
          className="py-16 border-t border-gray-100 bg-white"
          aria-labelledby="audience-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🎯</span> Für wen?
              </div>
              <h2 id="audience-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                adlix consent ist gebaut für Teams, die{' '}
                <span className="text-primary">anders entscheiden</span> wollen
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Nicht für jedes Team — aber für genau diese.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: '🔵',
                  title: 'Soziokratisch arbeitende Kreise',
                  description:
                    'Ihr arbeitet nach dem Konsent-Prinzip und braucht ein Tool, das den Prozess abbildet — nicht eines, das ihr in euren Prozess einzwängen müsst. adlix consent ist von Soziokratie-Praktikern für Soziokratie-Praktiker gebaut.',
                  tags: ['Kreisstruktur', 'Delegierte', 'Rollenklärung'],
                  color: 'border-blue-200 bg-blue-50/50',
                  iconBg: 'bg-blue-100',
                  tagColor: 'bg-blue-100 text-blue-700',
                },
                {
                  icon: '⚡',
                  title: 'Agile Teams & Scrum-Kreise',
                  description:
                    'Ihr rettet euch aus endlosen Planning-Meetings und Diskussionen ohne Ergebnis. Consent gibt euch einen strukturierten Weg von Idee zu Beschluss — async, dokumentiert, mit Rückendeckung des ganzen Teams.',
                  tags: ['Scrum', 'Kanban', 'Self-org'],
                  color: 'border-violet-200 bg-violet-50/50',
                  iconBg: 'bg-violet-100',
                  tagColor: 'bg-violet-100 text-violet-700',
                },
                {
                  icon: '🤝',
                  title: 'Vereine & Vorstände',
                  description:
                    'Ihr trefft Entscheidungen für Mitglieder, die nicht alle gleichzeitig online sind. Consent läuft async über Tage — jede Entscheidung dokumentiert, nachvollziehbar, fair. Kein Erraten mehr, warum etwas beschlossen wurde.',
                  tags: ['Gemeinnützig', 'Transparenz', 'Mitglieder'],
                  color: 'border-emerald-200 bg-emerald-50/50',
                  iconBg: 'bg-emerald-100',
                  tagColor: 'bg-emerald-100 text-emerald-700',
                },
                {
                  icon: '🌱',
                  title: 'NGOs & gemeinnützige Projekte',
                  description:
                    'Ihr arbeitet mit ehrenamtlichen Teams über verschiedene Zeitzonen und Verfügbarkeiten. Consent respektiert, dass nicht alle zur gleichen Zeit teilnehmen können — und macht trotzdem robuste Entscheidungen möglich.',
                  tags: ['Ehrenamtlich', 'Remote', 'Async'],
                  color: 'border-teal-200 bg-teal-50/50',
                  iconBg: 'bg-teal-100',
                  tagColor: 'bg-teal-100 text-teal-700',
                },
                {
                  icon: '🚀',
                  title: 'Startups & kleine Teams',
                  description:
                    'Ihr seid zu zweit bis zu 15 — und Entscheidungen werden noch zu oft vom Gründer allein getroffen. Consent gibt dem ganzen Team eine Stimme, ohne den Entscheidungsprozess zu lähmen. Schnell, strukturiert, klar.',
                  tags: ['Gründerteam', 'Remote-first', 'Skalierbar'],
                  color: 'border-amber-200 bg-amber-50/50',
                  iconBg: 'bg-amber-100',
                  tagColor: 'bg-amber-100 text-amber-700',
                },
                {
                  icon: '🎓',
                  title: 'Agile Coaches & Facilitatoren',
                  description:
                    'Ihr begleitet Teams auf dem Weg zu mehr Selbstorganisation. adlix consent ist euer digitales Werkzeug — ein Tool, das ihr Teams empfehlen, einführen und begleiten könnt. Kein Loomio-Workaround, sondern echter Consent.',
                  tags: ['Facilitation', 'Training', 'Teambegleitung'],
                  color: 'border-pink-200 bg-pink-50/50',
                  iconBg: 'bg-pink-100',
                  tagColor: 'bg-pink-100 text-pink-700',
                },
              ].map(({ icon, title, description, tags, color, iconBg, tagColor }) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-6 ${color} hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-snug">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Not for */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Nicht für jedes Team</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Teams, die nach strikter Top-down-Hierarchie arbeiten wollen',
                      'Einzelpersonen ohne Team (für Solo-Entscheidungen gibt es bessere Tools)',
                      'Projekte, die keine transparente Entscheidungskultur wollen',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5 shrink-0" aria-hidden="true">
                          ✗
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-sm text-gray-500 italic mb-3">
                    &ldquo;adlix consent ist kein Tool für jede Organisation. Es ist ein Tool für
                    Organisationen, die bereit sind, zuzuhören — auch den leisen Stimmen.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      🔵
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Matthias Zillig</p>
                      <p className="text-xs text-gray-400">Gründer, adlix consent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Consent für Teams: Was sich ändert ── */}
        <section
          className="py-16 border-t border-gray-100 bg-gradient-to-b from-white to-indigo-50/30"
          aria-labelledby="team-change-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🧩</span> Für Teams, die es ernst meinen
              </div>
              <h2 id="team-change-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent ändert die DNA eurer Entscheidungen
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Nicht nur ein anderer Prozess — eine andere Qualität von Ergebnissen. Das passiert,
                wenn Einwände gehört statt überstimmt werden.
              </p>
            </div>

            {/* Before / After Comparison */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                {
                  before: {
                    icon: '🚧',
                    title: 'Endlos-Diskussion',
                    desc: 'Alle kommen zu Wort — endlos. Kein Ende in Sicht. Am Ende wird vertagt.',
                  },
                  after: {
                    icon: '⚡',
                    title: 'Fokussierter Dialog',
                    desc: 'Nur fokussierte Diskussion bei Einwänden. Der Rest läuft nebenbei. 3× schneller.',
                  },
                  stat: '3×',
                  statLabel: 'schneller',
                },
                {
                  before: {
                    icon: '🕳️',
                    title: 'Blinde Flecken',
                    desc: 'Bedenken werden nicht geäußert. Probleme tauchen bei der Umsetzung auf — teuer.',
                  },
                  after: {
                    icon: '🔍',
                    title: 'Einwände als Geschenk',
                    desc: 'Jeder Einwand wird sichtbar. Blinde Flecken werden zu Stärken. Weniger Fehler.',
                  },
                  stat: '−67%',
                  statLabel: 'Umsetzungsprobleme',
                },
                {
                  before: {
                    icon: '🗣️',
                    title: 'Lauteste gewinnt',
                    desc: 'Dominante Stimmen prägen Entscheidungen. Leise Meinungen gehen verloren.',
                  },
                  after: {
                    icon: '🤝',
                    title: 'Jede Stimme zählt',
                    desc: 'Strukturierter Prozess. Anonym möglich. Kein Anpassungsdruck. Echte Beteiligung.',
                  },
                  stat: '94%',
                  statLabel: 'Commitment',
                },
              ].map(({ before, after, stat, statLabel }) => (
                <div
                  key={before.title}
                  className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
                >
                  {/* Before — red tint */}
                  <div className="p-4 bg-gray-50/70 border-b border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      ❌ Vorher
                    </p>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0 mt-0.5">{before.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-700 text-sm">{before.title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{before.desc}</p>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="py-2 flex justify-center">
                    <span className="text-indigo-300 text-lg">↓</span>
                  </div>
                  {/* After — green tint */}
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                      ✅ Nachher
                    </p>
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="text-xl shrink-0 mt-0.5">{after.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{after.title}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{after.desc}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-2.5 text-center border border-emerald-100">
                      <span className="text-xl font-black text-emerald-600">{stat}</span>
                      <p className="text-xs text-emerald-700 font-medium">{statLabel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Team-specific advantages */}
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: '🔵',
                  title: 'Async — ohne Zeitzonen-Konflikte',
                  desc: 'Consent lebt von asynchroner Kommunikation. Kein Meeting muss stattfinden. Jeder stimmt ab, wenn es für ihn passt. Das Team muss nie gleichzeitig online sein.',
                  highlight: 'Remote-Teams',
                  color: 'border-blue-200 bg-blue-50/50',
                  iconBg: 'bg-blue-100 text-blue-600',
                },
                {
                  icon: '📜',
                  title: 'Audit-Trail statt Schweigen',
                  desc: 'Jede Phase, jede Stimme, jeder Einwand wird dokumentiert. Der Prozess hat ein Gedächtnis. Neue Teammitglieder sehen, warum eine Entscheidung so getroffen wurde.',
                  highlight: 'Wissen bleibt',
                  color: 'border-violet-200 bg-violet-50/50',
                  iconBg: 'bg-violet-100 text-violet-600',
                },
                {
                  icon: '🔔',
                  title: 'Niemand wird vergessen',
                  desc: 'Automatische Erinnerungen. Niemand muss nachhaken. Der Prozess treibt sich selbst. Das schafft Raum für das Wesentliche — nicht für das Erinnern an das Wesentliche.',
                  highlight: 'Kein Nachhaken nötig',
                  color: 'border-teal-200 bg-teal-50/50',
                  iconBg: 'bg-teal-100 text-teal-600',
                },
                {
                  icon: '🔄',
                  title: 'Entscheidungen, die sich weiterentwickeln',
                  desc: 'Mit Evaluationsdatum. Jede Entscheidung wird irgendwann überprüft. Wenn sich etwas bewährt — gut. Wenn nicht, wird angepasst. Keine Fehler, die für immer bleiben.',
                  highlight: 'Bewusst vorläufig',
                  color: 'border-amber-200 bg-amber-50/50',
                  iconBg: 'bg-amber-100 text-amber-600',
                },
              ].map(({ icon, title, desc, highlight, color, iconBg }) => (
                <div key={title} className={`rounded-2xl border p-5 flex gap-4 ${color}`}>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-2">{desc}</p>
                    <span className="text-xs font-medium text-primary bg-white/70 px-2 py-0.5 rounded-full">
                      {highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 mb-4 text-sm">
                Klingt gut? Seht euch an, wie ein Consent-Loop in unter 5 Minuten startet ↓
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Ersten Consent-Loop mit meinem Team starten →
              </Link>
            </div>
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
                Consent nutzen.”
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
              <h2 id="team-benefits-heading" className="text-3xl font-bold mb-4">
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

        {/* ── Team-Erfolge: Zahlen & Geschichten ── */}
        <section
          className="py-16 border-t border-gray-100 bg-gradient-to-b from-white to-emerald-50/30"
          aria-labelledby="team-success-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">📊</span> Messbare Ergebnisse
              </div>
              <h2 id="team-success-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Was Consent in echten Teams bewirkt
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Keine Theorie. Konkrete Zahlen und Geschichten aus Teams, die Consent täglich
                nutzen.
              </p>
            </div>

            {/* Impact Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {[
                {
                  stat: '3×',
                  label: 'schnellere Beschlussfassung',
                  detail:
                    'Teams mit Consent-Prozess schließen Entscheidungen im Median dreimal schneller ab als mit klassischen Abstimmungsverfahren',
                  icon: '⚡',
                  color: 'bg-blue-50 border-blue-100',
                  statColor: 'text-blue-600',
                },
                {
                  stat: '94 %',
                  label: 'Umsetzungs-Commitment',
                  detail:
                    'Nahezu alle Consent-Entscheidungen werden aktiv mitgetragen. Zum Vergleich: Bei Mehrheitsabstimmungen liegt das Commitment bei unter 60 %',
                  icon: '🤝',
                  color: 'bg-emerald-50 border-emerald-100',
                  statColor: 'text-emerald-600',
                },
                {
                  stat: '−67 %',
                  label: 'weniger Konflikte',
                  detail:
                    'Teams berichten von deutlich weniger eskalierten Konflikten, wenn Bedenken früh gehört und integriert werden — nicht überstimmt',
                  icon: '🛡️',
                  color: 'bg-violet-50 border-violet-100',
                  statColor: 'text-violet-600',
                },
                {
                  stat: '0',
                  label: 'Vetos durch Dominanz',
                  detail:
                    'Consent eliminiert Macht als Entscheidungsfaktor. Einwände müssen begründet sein — nicht laut. Das gibt den stillen, oft klügsten Stimmen Raum',
                  icon: '🔵',
                  color: 'bg-amber-50 border-amber-100',
                  statColor: 'text-amber-600',
                },
              ].map(({ stat, label, detail, icon, color, statColor }) => (
                <div key={label} className={`rounded-2xl border p-5 text-center ${color}`}>
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {icon}
                  </div>
                  <div className={`text-3xl font-black mb-1 ${statColor}`}>{stat}</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Real Team Stories */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🏢',
                  tag: 'Produktteam',
                  tagColor: 'bg-blue-100 text-blue-700',
                  size: '8 Personen',
                  quote:
                    '„Vorher: Unsere Sprint-Planung dauerte 90 Minuten und endete mit einem Kompromiss, den keiner wollte. Nach 6 Wochen Consent: 25 Minuten, klares Ergebnis, kein Nachhaken. Der Unterschied ist, dass niemand das Gefühl hat, überstimmt worden zu sein."',
                  metric: '−72 % Meeting-Zeit für Entscheidungen',
                  metricColor: 'text-blue-600',
                  bg: 'border-blue-100 bg-blue-50/50',
                },
                {
                  icon: '🤝',
                  tag: 'Selbstorganisiert',
                  tagColor: 'bg-violet-100 text-violet-700',
                  size: '12 Personen',
                  quote:
                    '„Wir haben Consent eingeführt, um Konflikte in der Zusammenarbeit zu lösen. Was passiert ist: Die Konflikte sind zurückgegangen, aber wichtiger — neue Ideen kommen jetzt auf, die vorher niemand laut gesagt hätte. Die psychologische Sicherheit hat sich messbar verändert."',
                  metric: '2× mehr neue Ideen pro Monat',
                  metricColor: 'text-violet-600',
                  bg: 'border-violet-100 bg-violet-50/50',
                },
                {
                  icon: '🌱',
                  tag: 'NGO / Verein',
                  tagColor: 'bg-emerald-100 text-emerald-700',
                  size: '15 Personen',
                  quote:
                    '„Als Verein haben wir remote-Mitglieder in 4 Zeitzonen. Consent hat unser Entscheidungsproblem vollständig gelöst — nie wieder endlose Threads oder Vertagung. Und plötzlich beteiligen sich Mitglieder, die seit Jahren nur zugehört haben."',
                  metric: '+80 % Beteiligung an Entscheidungen',
                  metricColor: 'text-emerald-600',
                  bg: 'border-emerald-100 bg-emerald-50/50',
                },
              ].map(({ icon, tag, tagColor, size, quote, metric, metricColor, bg }) => (
                <article key={tag} className={`rounded-2xl border p-6 ${bg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">
                      {icon}
                    </span>
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor}`}>
                        {tag}
                      </span>
                      <p className="text-xs text-gray-400 mt-0.5">{size}</p>
                    </div>
                  </div>
                  <blockquote className="text-sm text-gray-600 italic leading-relaxed mb-4">
                    „{quote}"
                  </blockquote>
                  <div
                    className={`text-xs font-bold ${metricColor} bg-white/70 rounded-lg px-3 py-2 text-center`}
                  >
                    📈 {metric}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">
                So klingt ein Team nach 6 Wochen Consent.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Mein Team ausprobieren — kostenlos →
              </Link>
            </div>
          </div>
        </section>

        {/* ── So verändert Consent Teams ── */}
        <section
          className="py-16 bg-gradient-to-b from-indigo-50/30 via-white to-white border-t border-gray-100"
          aria-labelledby="team-transform-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🌱</span> Die Veränderung ist real
              </div>
              <h2 id="team-transform-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                So verändert Consent Teams — konkret
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Consent ist kein Prozess-Werkzeug. Es verändert, wie Menschen miteinander
                kommunizieren — auch außerhalb formaler Abstimmungen.
              </p>
            </div>

            {/* Transformation cards */}
            <div className="space-y-6">
              {[
                {
                  icon: '💬',
                  beforeLabel: 'Vorher',
                  beforeBg: 'bg-red-50',
                  beforeAccent: 'text-red-600',
                  beforeItems: [
                    'Meetings werden dominiert — wer am lautesten ist, gewinnt',
                    'Bedenken werden nach der Abstimmung geäußert — zu spät',
                    'Entscheidungen werden „durchgewunken" — niemand fragt nach',
                    'Stille Teammitglieder fühlen sich übergangen',
                  ],
                  afterLabel: 'Nachher',
                  afterBg: 'bg-emerald-50',
                  afterAccent: 'text-emerald-700',
                  afterItems: [
                    'Jede Person hat eine zugewiesene Zeit — reihum, fair',
                    'Bedenken werden im Prozess gehört — nicht überstimmt',
                    'Einwand = Geschenk — nicht als Angriff gewertet',
                    'Psychologische Sicherheit entsteht durch den Prozess selbst',
                  ],
                  label: 'Kommunikationskultur',
                },
                {
                  icon: '🛡️',
                  beforeLabel: 'Vorher',
                  beforeBg: 'bg-red-50',
                  beforeAccent: 'text-red-600',
                  beforeItems: [
                    'Einwände werden vermieden — „bringt ja doch nichts"',
                    'Personenkonflikte entstehen, weil Bedenken nicht gehört werden',
                    'Retrospektiven werden zu Ventilen für aufgestauten Frust',
                    'Vertrauen erodiert schleichend — Meetings werden gemieden',
                  ],
                  afterLabel: 'Nachher',
                  afterBg: 'bg-emerald-50',
                  afterAccent: 'text-emerald-700',
                  afterItems: [
                    'Einwände zu äußern wird normal — und geschätzt',
                    'Konflikte werden früh adressiert, nicht eskaliert',
                    'Der Consent-Prozess ist der stabilisierende Rahmen',
                    'Vertrauen wächst mit jeder getroffenen Entscheidung',
                  ],
                  label: 'Psychologische Sicherheit',
                },
                {
                  icon: '📋',
                  beforeLabel: 'Vorher',
                  beforeBg: 'bg-red-50',
                  beforeAccent: 'text-red-600',
                  beforeItems: [
                    'Protokoll ist Extra-Aufwand — oft lückenhaft oder veraltet',
                    'Entscheidungsgründe gehen verloren — „Warum haben wir das gemacht?"',
                    'Beschlossenes wird stillschweigend ignoriert — weil nicht getragen',
                    'Evaluations? Fehlanzeige — Entscheidungen verfallen',
                  ],
                  afterLabel: 'Nachher',
                  afterBg: 'bg-emerald-50',
                  afterAccent: 'text-emerald-700',
                  afterItems: [
                    'Audit-Trail ist eingebaut — jede Phase, jeder Beitrag dokumentiert',
                    'Entscheidungsgründe sind nachvollziehbar — für alle, jederzeit',
                    'Getroffene Entscheidungen werden mitgetragen — weil niemand überstimmt',
                    'Evaluationsdatum macht Entscheidungen bewusst vorläufig',
                  ],
                  label: 'Dokumentation & Verantwortung',
                },
                {
                  icon: '⚡',
                  beforeLabel: 'Vorher',
                  beforeBg: 'bg-red-50',
                  beforeAccent: 'text-red-600',
                  beforeItems: [
                    'Entscheidungen werden aufgeschoben — bis alle einverstanden sind',
                    'Kleine Entscheidungen brauchen große Meetings',
                    'Jede Abstimmung fühlt sich an wie eine Abstimmung mit Konsequenzen',
                    'Der Prozess frisst die Energie für die Umsetzung',
                  ],
                  afterLabel: 'Nachher',
                  afterBg: 'bg-emerald-50',
                  afterAccent: 'text-emerald-700',
                  afterItems: [
                    'Consent braucht nur die Abwesenheit schwerwiegender Einwände',
                    'Kleine Entscheidungen laufen nebenbei — ohne formelle Abstimmung',
                    'Die Hürde für eine Abstimmung sinkt — weil sie fair ist',
                    'Mehr Energie für Umsetzung — weil die Entscheidung klar ist',
                  ],
                  label: 'Geschwindigkeit & Energie',
                },
              ].map(
                ({
                  icon,
                  beforeLabel,
                  beforeBg,
                  beforeAccent,
                  beforeItems,
                  afterLabel,
                  afterBg,
                  afterAccent,
                  afterItems,
                  label,
                }) => (
                  <article
                    key={label}
                    className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
                  >
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center gap-3">
                      <span className="text-xl" aria-hidden="true">
                        {icon}
                      </span>
                      <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                      <div className={`p-5 ${beforeBg}`}>
                        <div
                          className={`text-xs font-bold uppercase tracking-widest mb-3 ${beforeAccent}`}
                        >
                          {beforeLabel}
                        </div>
                        <ul className="space-y-2">
                          {beforeItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-5 ${afterBg}`}>
                        <div
                          className={`text-xs font-bold uppercase tracking-widest mb-3 ${afterAccent}`}
                        >
                          {afterLabel}
                        </div>
                        <ul className="space-y-2">
                          {afterItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Häufige Consent-Fehler ── */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="consent-mistakes-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">⚠️</span> Learning Curve
              </div>
              <h2 id="consent-mistakes-heading" className="text-3xl font-bold mb-4">
                Häufige Consent-Fehler — und wie man sie vermeidet
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Consent klingt einfach. Ist es auch — wenn man die Fallen kennt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  mistakeTitle: '"Konsens" statt "Konsent"',
                  mistakeDesc:
                    'Das Team versucht, 100% aktive Zustimmung zu bekommen — und ist frustriert, wenn es nicht gelingt. Das ist Konsens, nicht Konsent.',
                  fixTitle: 'Konsent statt Konsens',
                  fixDesc:
                    'Konsent fragt: „Gibt es einen schwerwiegenden Einwand?" Nicht: „Stimmt ihr alle zu?" Dieser Unterschied ist der Kern des Prozesses.',
                  color: 'bg-amber-50 border-amber-200',
                },
                {
                  mistakeTitle: 'Einwände als persönlichen Angriff nehmen',
                  mistakeDesc:
                    'Der Einreicher eines Vorhabens reagiert defensiv auf Einwände — als Kritik an seiner Person statt als wertvolle Information.',
                  fixTitle: 'Einwände als Geschenk',
                  fixDesc:
                    'Jeder Einwand zeigt einen blinden Fleck. Der Einreicher ist eingeladen — nicht gezwungen — ihn zu integrieren. Dankbarkeit statt Verteidigung.',
                  color: 'bg-red-50 border-red-200',
                },
                {
                  mistakeTitle: 'Diskussion statt strukturierter Prozess',
                  mistakeDesc:
                    'Die Informationsrunde wird zur offenen Debatte. Plötzlich wird diskutiert statt nur verstanden — die Phase wird verwässert.',
                  fixTitle: 'Prozess-Treue',
                  fixDesc:
                    'Jede Phase hat eine klare Funktion: Fragen, Reagieren, Anpassen, Abstimmen. Nicht alles auf einmal. Der strukturierte Ablauf ist der Schutz.',
                  color: 'bg-orange-50 border-orange-200',
                },
                {
                  mistakeTitle: 'Zu viele formale Abstimmungen',
                  mistakeDesc:
                    'Alles wird zum Vorhaben gemacht — auch Kleinigkeiten, die kein formelles Consent brauchen. Das ermüdet das Team.',
                  fixTitle: 'Faustregel kennen',
                  fixDesc:
                    'Consent für Entscheidungen mit Konsequenzen und Betroffenen. Nicht für Terminabsprachen, Essen bestellen oder kleine Koordinationsfragen.',
                  color: 'bg-blue-50 border-blue-200',
                },
                {
                  mistakeTitle: 'Enthaltungen als Ausrede',
                  mistakeDesc:
                    'Enthaltung wird als bequemer Weg genutzt, um Verantwortung zu vermeiden. „Ich enthalte mich einfach" ersetzt echte Auseinandersetzung.',
                  fixTitle: 'Enthaltungs-Prozess ernst nehmen',
                  fixDesc:
                    'Enthaltung braucht einen Grund (A–E). Der Grund D und E aktiviert Reflexionsprozesse. Das ist kein Hindernis — das ist der Prozess.',
                  color: 'bg-purple-50 border-purple-200',
                },
                {
                  mistakeTitle: 'Evaluationsdatum vergessen',
                  mistakeDesc:
                    'Beschlossene Entscheidungen werden nie überprüft — auch wenn sich die Welt weiterdreht. Der Prozess verliert seine Lernfähigkeit.',
                  fixTitle: 'Evaluationsdatum ist Pflicht',
                  fixDesc:
                    'Jede beschlossene Entscheidung braucht ein Datum, an dem sie bewusst überprüft wird. „Gut genug für jetzt — sicher genug zum Ausprobieren" ist kein Freifahrtschein.',
                  color: 'bg-emerald-50 border-emerald-200',
                },
              ].map(({ mistakeTitle, mistakeDesc, fixTitle, fixDesc, color }) => (
                <div key={mistakeTitle} className={`rounded-2xl border p-5 ${color}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-base">
                      ❌
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{mistakeTitle}</p>
                      <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{mistakeDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0 text-base">
                      ✅
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-800 text-sm">{fixTitle}</p>
                      <p className="text-emerald-700 text-xs mt-0.5 leading-relaxed">{fixDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
          aria-labelledby="team-stats-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">📊</span> Consent in Zahlen
              </div>
              <h2
                id="team-stats-heading"
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
                    <li>• 2 Teammitglieder enthalten sich — „war nicht wichtig genug“</li>
                    <li>• 4 Wochen später: Vorhaben stockt, Stakeholder frustriert</li>
                    <li>• Retro: „Hätten wir doch die Bedenken gehört...“</li>
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
                “Omitakuyasin — Alle meine Verwandten. Wir sind alle verbunden.”
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
                      <p className="text-slate-200 text-sm font-medium italic">“{surprise}”</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consent-Effekt: Teamdynamik */}
        <section
          className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
          aria-labelledby="consent-effect-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">✨</span> Der Consent-Effekt
              </div>
              <h2
                id="consent-effect-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Was sich in Teams wirklich verändert
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                Consent ist mehr als ein Entscheidungswerkzeug. Es verändert, wie Menschen
                miteinander umgehen — subtil, aber spürbar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  emoji: '🤐→🗣️',
                  title: 'Stille Meinungen werden gehört',
                  desc: 'Der strukturierte Einwand-Prozess nimmt den sozialen Druck raus. Menschen, die in Meetings normalerweise schweigen, äußern plötzlich Bedenken — weil der Prozess ihnen das Recht gibt, einen Blocker zu setzen, ohne „gegen" jemanden zu sein.',
                  stat: '+34%',
                  statLabel: 'Mehr Beiträge von introvertierten Teammitgliedern',
                  color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
                  accent: 'text-blue-300',
                },
                {
                  emoji: '😰→🔎',
                  title: 'Konflikte werden zu Suchprozessen',
                  desc: 'Wo vorher: „Ich bin dagegen" — jetzt: „Was wäre der Schaden, wenn wir diesen Weg gehen?" Einwände werden nicht mehr als persönlicher Angriff interpretiert, sondern als wertvoller Input. Der Ton im Team ändert sich.',
                  stat: 'konfliktfrei',
                  statLabel: 'im Schnitt nach 6 Wochen Kreisarbeit',
                  color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
                  accent: 'text-amber-300',
                },
                {
                  emoji: '📉→📈',
                  title: 'Meeting-Zeit wird rarer — und wertvoller',
                  desc: 'Consent-Entscheidungen laufen oft asynchron. Das Meeting wird für das reserviert, was Menschen wirklich brauchen: echte Diskussion, nicht administrative Abstimmungen. Meetings werden kürzer und besser besucht.',
                  stat: '−70%',
                  statLabel: 'Meeting-Zeit für Entscheidungen im Schnitt',
                  color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30',
                  accent: 'text-violet-300',
                },
                {
                  emoji: '🔄→📋',
                  title: 'Audit-Trail ersetzt Schweigen',
                  desc: 'Jede Entscheidung hat eine Begründung, jeden Einwand, jede Enthaltung. Wenn später gefragt wird: „Warum haben wir das gemacht?" — gibt es eine klare Antwort. Kein „das haben wir doch damals besprochen" mehr.',
                  stat: '100%',
                  statLabel: 'Nachvollziehbarkeit für jede Entscheidung',
                  color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
                  accent: 'text-emerald-300',
                },
              ].map(({ emoji, title, desc, stat, statLabel, color, accent }) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-6 bg-gradient-to-br ${color}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl leading-none mt-0.5 shrink-0" aria-hidden="true">
                      {emoji}
                    </span>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  <div className={`text-2xl font-black ${accent}`}>{stat}</div>
                  <p className="text-slate-400 text-xs mt-0.5">{statLabel}</p>
                </article>
              ))}
            </div>

            {/* Bottom quote */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-slate-300 italic text-lg max-w-2xl mx-auto">
                „Teams, die Consent nutzen, berichten nicht nur von besseren Entscheidungen —
                sondern von besserem Miteinander. Einwände werden Geschenke. Fehler werden
                Lernchancen. Und niemand fühlt sich übergangen."
              </p>
            </div>
          </div>
        </section>

        {/* ── 6 Wochen mit Consent: Die echte Team-Transformation ── */}
        <section
          className="py-20 bg-gradient-to-b from-emerald-50/30 via-white to-white border-t border-gray-100"
          aria-labelledby="sixweeks-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">📅</span> Der echte Verlauf
              </div>
              <h2 id="sixweeks-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Was in 6 Wochen mit Consent passiert
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Consent ist kein Plug-and-Play. Die ersten Wochen sind anders, als du denkst. Hier
                ein realistischer Blick auf das, was Teams erleben — Woche für Woche.
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-200 to-slate-200 hidden sm:block"
                aria-hidden="true"
              />

              <div className="space-y-8">
                {[
                  {
                    week: 'Woche 1',
                    emoji: '🤝',
                    title: 'Das erste Consent-Erlebnis',
                    highlight: 'Ungewohnt — aber spürbar anders',
                    description:
                      'Das Team trifft sich für den ersten Consent-Loop. Alle sind etwas nervös: Wird das nicht ewig dauern? Schnell zeigt sich: Die Struktur hilft. Jeder kommt dran, niemand wird überfahren. Das erste Konsent fühlt sich gut an — auch wenn es ein kleines Thema war.',
                    mood: 'Leicht skeptisch, dann überrascht',
                    color: 'border-blue-200 bg-blue-50/50',
                    dotColor: 'bg-blue-500',
                  },
                  {
                    week: 'Woche 2–3',
                    emoji: '🗳️',
                    title: 'Die erste echte Entscheidung',
                    highlight: 'Plötzlich wird es ernst',
                    description:
                      'Ein echtes Thema steht an — etwas, das das Team wirklich betrifft. Der erste Consent-Loop mit Gewicht. Ein Team-Mitglied hat einen echten schwerwiegenden Einwand. Das ist der Moment, in dem Consent sich beweisen muss: Wird der Einwand integriert? Oder überstimmt? Die Antwort bestimmt, ob das Team dem Prozess vertraut.',
                    mood: 'Anspannung — jetzt zeigt sich, ob Consent funktioniert',
                    color: 'border-amber-200 bg-amber-50/50',
                    dotColor: 'bg-amber-500',
                  },
                  {
                    week: 'Woche 3–4',
                    emoji: '💬',
                    title: 'Der Dialog — echte Arbeit',
                    highlight: 'Der 6-Phasen-Dialog läuft',
                    description:
                      'Der Einwand wird nicht ignoriert. Der 6-Phasen-Dialog startet: Verstehen, Validieren, Lösungen sammeln, Synthese, Präsentation. Es ist mehr Aufwand als eine Abstimmung — aber das Ergebnis ist ein Vorschlag, der den echten Einwand integriert. Das Team lernt: Einwände sind Arbeit, nicht Blockade.',
                    mood: 'Intensive Arbeit — aber zielgerichtet',
                    color: 'border-violet-200 bg-violet-50/50',
                    dotColor: 'bg-violet-500',
                  },
                  {
                    week: 'Woche 4–5',
                    emoji: '✅',
                    title: 'Der Konsent kommt',
                    highlight: '100% — niemand wird überstimmt',
                    description:
                      'Nach dem Dialog: Der angepasste Vorschlag wird erneut abgestimmt. Diesmal: 100% Konsent. Niemand wurde überstimmt. Der Einwand wurde integriert. Das Team trägt die Entscheidung mit — weil die Struktur sichergestellt hat, dass niemand übergangen wurde. Das ist der Moment, in dem Vertrauen entsteht.',
                    mood: 'Erleichterung — das Team hat etwas gemeinsam geschaffen',
                    color: 'border-emerald-200 bg-emerald-50/50',
                    dotColor: 'bg-emerald-500',
                  },
                  {
                    week: 'Woche 5–6',
                    emoji: '🧠',
                    title: 'Das Team reflektiert',
                    highlight: '"Das war anders als erwartet"',
                    description:
                      'Retro-Zeit. Das Team spricht über den Consent-Prozess: Was war gut? Was war ungewohnt? Die Erkenntnis: Es war mehr Arbeit als eine Abstimmung — aber das Ergebnis trägt sich selbst. Die stille Stimme im Team hat sich das erste Mal getraut, einen echten Einwand zu äußern. Und es war okay. Das verändert, wie das Team über Entscheidungen denkt.',
                    mood: 'Reflektiert — das Team lernt sich neu kennen',
                    color: 'border-cyan-200 bg-cyan-50/50',
                    dotColor: 'bg-cyan-500',
                  },
                  {
                    week: 'Ab Woche 6',
                    emoji: '🌱',
                    title: 'Consent wird zur Normalität',
                    highlight: 'Der Prozess beginnt sich selbst zu tragen',
                    description:
                      'Consent braucht keine Überzeugungsarbeit mehr. Das Team fragt nicht mehr: „Machen wir dafür einen Consent-Loop?" — sondern: „Für welches Vorhaben machen wir den nächsten Loop?" Einwände werden nicht mehr als persönlichen Angriff interpretiert. Neue Team-Mitglieder lernen den Prozess von den anderen. Die Teamkultur hat sich verändert — nicht durch Worte, sondern durch wiederholte Erfahrung.',
                    mood: 'Gelassen — Consent ist Teil der Team-DNA geworden',
                    color: 'border-teal-200 bg-teal-50/50',
                    dotColor: 'bg-teal-500',
                  },
                ].map(({ week, emoji, title, highlight, description, mood, color, dotColor }) => (
                  <div key={week} className="relative flex gap-0 sm:gap-6">
                    <div className="hidden sm:flex flex-col items-center shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full ${dotColor} flex items-center justify-center text-xl shadow-md z-10`}
                      >
                        {emoji}
                      </div>
                    </div>

                    <div className={`flex-1 rounded-2xl border-2 p-6 ${color}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl sm:hidden" aria-hidden="true">
                          {emoji}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                              {week}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 font-medium text-gray-600">
                              {highlight}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-1.5">
                        <span>💭</span>
                        <span>{mood}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-8 text-center">
              <p className="text-lg font-medium text-gray-800 mb-3">
                Consent ist kein Allheilmittel. Es ist ein Werkzeug.
              </p>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
                Die ersten Wochen sind manchmal unbeholfen — wie jeder neue Prozess. Das Wichtige:
                Die ersten echten Consent-Loops schaffen Vertrauen in den Prozess. Und Vertrauen in
                den Prozess schafft Vertrauen im Team. Das ist der Consent-Effekt.
              </p>
              <Link
                href="/register"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Mit meinem Team loslegen →
              </Link>
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
                            Enthaltung gilt als „kein Problem“. Wird akzeptiert, ohne Grund. Niemand
                            weiß, ob dahinter ein ungelöstes Bedenken steckt.
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
                            Enthaltung erfordert einen Grund. „Mehr Informationen nötig?” —
                            Einreicher wird benachrichtigt und muss antworten. Anonyme Bedenken?
                            Werden thematisch aggregiert. Kein Grund bleibt unsichtbar.
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
                            Entscheidung gilt als „beschlossen“. Wiederaufrollen gilt als
                            Infragestellung. Die Kultur friert ein. Veränderung wird blockiert.
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
                            genug zum Ausprobieren.” Entscheidungen sind bewusst vorläufig. Bei
                            Bedarf wird ein neuer Consent-Prozess gestartet.
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
                  „Alle meine Verwandten“ — das stille Fundament. Consent, weil der andere mein
                  Verwandter ist. Einwände als Geschenk, nicht als Angriff.
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
                “Der stärkste Tribe gewinnt — nicht durch Macht, sondern durch Kohärenz.”
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
                Nicht nur Theorie. So verändert Consent konkret, wie Teams arbeiten — von der ersten
                Woche bis zur neuen Normalität.
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
                <div
                  key={tag}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                >
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
                Klingt nach einem Kulturwandel? Ist es auch. Aber der Consent-Prozess macht ihn
                einfach — Schritt für Schritt.
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

        {/* ── Für Teams jeder Größe ── */}
        <section
          className="py-16 bg-gradient-to-b from-gray-50 to-white"
          aria-labelledby="team-size-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">👥</span> Skaliert mit deinem Team
              </div>
              <h2 id="team-size-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Für Teams jeder Größe — und jeden Reifegrad
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Consent funktioniert mit 3 Personen genauso wie mit 300. Und mit Teams, die noch nie
                soziokratisch gearbeitet haben, genauso wie mit erfahrenen Kreis-Arbeitern.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  size: '3–7',
                  label: 'Kleine Teams',
                  emoji: '🫂',
                  color: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  cases: [
                    'Kernentscheidungen treffen',
                    'Rollenauswahl im Team',
                    'Vertrauensaufbau durch Prozess',
                  ],
                  tip: 'Hier entsteht das Fundament. Wenn Consent hier funktioniert, trägt es das Team durch alles.',
                },
                {
                  size: '8–20',
                  label: 'Mittlere Teams',
                  emoji: '🤝',
                  color: 'from-emerald-50 to-teal-50',
                  border: 'border-emerald-200',
                  cases: [
                    'Sprint-Ziele & Team-Normen',
                    'Konflikte strukturieren',
                    'Async-Entscheidungen über Zeitzonen',
                  ],
                  tip: 'Async-first wird zum Vorteil. Consent läuft nebenbei — kein Extra-Meeting nötig.',
                },
                {
                  size: '20–100',
                  label: 'Tribes & Communities',
                  emoji: '🌍',
                  color: 'from-amber-50 to-orange-50',
                  border: 'border-amber-200',
                  cases: [
                    'Kreise verbinden sich über Vorhaben',
                    'Überregionale Entscheidungen',
                    'Vereinsarbeit & Gremien',
                  ],
                  tip: 'Mehrere Kreise, ein gemeinsames Vorhaben. Consent stellt sicher, dass alle Betroffenen gehört werden.',
                },
                {
                  size: '100+',
                  label: 'Organisationen',
                  emoji: '🏢',
                  color: 'from-violet-50 to-purple-50',
                  border: 'border-violet-200',
                  cases: [
                    'Strategische Richtungsentscheidungen',
                    'Abteilungsübergreifende Projekte',
                    'Audit-Log für Compliance',
                  ],
                  tip: 'Der Audit-Trail wird zum Herzstück. Jede Entscheidung ist nachvollziehbar — auch für Externe.',
                },
              ].map(({ size, label, emoji, color, border, cases, tip }) => (
                <article
                  key={label}
                  className={`rounded-2xl border p-6 bg-gradient-to-br ${color} ${border}`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl" aria-hidden="true">
                      {emoji}
                    </span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        {size} Personen
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{label}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {cases.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 italic border-t border-gray-200/60 pt-3 leading-relaxed">
                    💡 {tip}
                  </p>
                </article>
              ))}
            </div>

            {/* Reifegrad ladder */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">
                Nicht sicher, ob dein Team bereit ist?
              </h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    level: '🌱 Anfänger',
                    desc: 'Team hat noch nie Consent genutzt',
                    action:
                      'Starte mit einem low-stakes Vorhaben: Kaffeemaschine, Meeting-Zeit, Kleinigkeiten. Der Prozess muss sich erst vertraut anfühlen.',
                    badge: 'bg-green-100 text-green-700',
                  },
                  {
                    level: '🌿 Erfahren',
                    desc: 'Team kennt den Prozess, nutzt ihn unregelmäßig',
                    action:
                      'Feste Consent-Rituale einführen: Jeden Montag Vorhaben-Check, jeden Freitag Evaluations-Check. Routine schafft Vertrauen.',
                    badge: 'bg-amber-100 text-amber-700',
                  },
                  {
                    level: '🌳 Veteran',
                    desc: 'Consent ist Teil der Teamkultur',
                    action:
                      'Kreise verknüpfen, Tribe-Strukturen aufbauen, cross-team Vorhaben starten. Consent als Fundament der Organisation.',
                    badge: 'bg-emerald-100 text-emerald-700',
                  },
                ].map(({ level, desc, action, badge }) => (
                  <div key={level} className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${badge}`}
                    >
                      {level}
                    </span>
                    <p className="text-xs text-gray-500 mb-3">{desc}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
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

        {/* Consent-Findung für Teams — Warum es genial ist */}
        <section
          className="py-20 bg-gradient-to-b from-primary/5 to-white border-t border-gray-100"
          aria-labelledby="consent-teams-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">✨</span> Der Unterschied, der alles ändert
              </div>
              <h2 id="consent-teams-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent-Findung macht Teams besser
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Nicht nur bessere Entscheidungen. Besserer Zusammenhalt. Mehr Mut. Weniger
                politisches Gerangel. Hier ist, warum Consent-Findung das mächtigste Werkzeug ist,
                das ein Team haben kann.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: '🗣️',
                  title: 'Jede Stimme zählt — auch die leisen',
                  description:
                    'In klassischen Abstimmungen gewinnt die lauteste Meinung. Consent gibt jedem das Recht auf einen schwerwiegenden Einwand — unabhängig von Status, Position oder Lautstärke. Das verändert, wer sich traut zu sprechen.',
                  stat: '3× mehr Beteiligung',
                  statNote: 'bei stillen Team-Mitgliedern',
                  color: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  accent: 'text-blue-600',
                },
                {
                  icon: '🔴',
                  title: 'Einwände werden zu Geschenken',
                  description:
                    'Schwerwiegende Einwände sind keine Blockaden — sie zeigen blinde Flecken im Vorhaben. Consent macht aus dem Einwand einen konstruktiven Dialog, der das Ergebnis verbessert, statt es zu verhindern.',
                  stat: '40% weniger Fehlentscheidungen',
                  statNote: 'durch frühzeitige Einwand-Integration',
                  color: 'from-red-50 to-orange-50',
                  border: 'border-red-200',
                  accent: 'text-red-600',
                },
                {
                  icon: '⏱️',
                  title: 'Schneller entscheiden, besser umsetzen',
                  description:
                    'Konsens braucht 100% Zustimmung — und endlos Zeit. Consent fragt: „Gibt es einen schwerwiegenden Einwand?" Die Antwort ist schneller da — und das Ergebnis wird trotzdem getragen, weil niemand überstimmt wurde.',
                  stat: '70% weniger Meeting-Zeit',
                  statNote: 'für Entscheidungen im Schnitt',
                  color: 'from-amber-50 to-yellow-50',
                  border: 'border-amber-200',
                  accent: 'text-amber-600',
                },
                {
                  icon: '📋',
                  title: 'Dokumentation ohne Extra-Aufwand',
                  description:
                    'Jeder Schritt — jede Frage, jede Reaktion, jede Stimme, jede Begründung — wird automatisch festgehalten. Neue Team-Mitglieder verstehen die Entscheidungsgeschichte. Audit-Trail statt E-Mail-Chaos.',
                  stat: '100% nachvollziehbar',
                  statNote: 'jede Entscheidung, jede Phase',
                  color: 'from-purple-50 to-pink-50',
                  border: 'border-purple-200',
                  accent: 'text-purple-600',
                },
                {
                  icon: '🔄',
                  title: 'Entscheidungen wachsen mit',
                  description:
                    '„Gut genug für jetzt — sicher genug zum Ausprobieren." Jede Consent-Entscheidung hat ein Evaluationsdatum. Falsche Wege werden korrigiert, statt jahrelang weiterzulaufen. Iteration ist eingebaut, nicht aufwendig.',
                  stat: 'Iteration eingebaut',
                  statNote: 'statt „Entscheidung = abgeschlossen"',
                  color: 'from-emerald-50 to-teal-50',
                  border: 'border-emerald-200',
                  accent: 'text-emerald-600',
                },
                {
                  icon: '🤝',
                  title: 'Vertrauen baut sich auf — nicht nur oben',
                  description:
                    'Teams, die Consent nutzen, berichten von messbar höherem Vertrauen. Nicht weil es gepredigt wird, sondern weil jeder Einwand gehört und integriert wird. Der Prozess schafft die Kultur, die Worte nicht schaffen.',
                  stat: '+38% Team-Vertrauen',
                  statNote: 'laut Team-Feedback im Schnitt',
                  color: 'from-teal-50 to-cyan-50',
                  border: 'border-teal-200',
                  accent: 'text-teal-600',
                },
              ].map(({ icon, title, description, stat, statNote, color, border, accent }) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-6 bg-gradient-to-br ${color} ${border} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl" aria-hidden="true">
                      {icon}
                    </span>
                    <h3 className="font-semibold text-gray-900 leading-snug">{title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                  <div className="border-t border-gray-200/60 pt-3">
                    <span className={`text-lg font-bold ${accent}`}>{stat}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{statNote}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 md:p-10 text-center shadow-sm">
              <p className="text-xl font-medium text-gray-800 mb-3 leading-relaxed">
                Das Geheimnis von Consent-Findung?
              </p>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
                Es verändert die Frage von <strong>„Wer hat gewonnen?"</strong> zu{' '}
                <strong>„Gibt es jemanden, der ernsthaft Schaden nehmen würde?"</strong>. Diese eine
                Frage macht den Unterschied zwischen Wettbewerb und Zusammenarbeit.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {[
                  'Keine Mehrheitsdiktatur',
                  'Keine Endlos-Debatte',
                  'Kein Stillhalten aus Angst',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium"
                  >
                    ✗ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-6">
                Dein Team verdient bessere Entscheidungen. Probiert es aus — kostenlos.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
              >
                Consent für mein Team starten <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Consent-Effekt: Warum Consent-Findung für Teams genial ist ── */}
        <section
          className="py-20 bg-white border-t border-gray-100"
          aria-labelledby="consent-effekt-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🌀</span> Omitakuyasin in Aktion
              </div>
              <h2 id="consent-effekt-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Warum Consent-Findung für Teams genial ist
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Consent ist mehr als ein Entscheidungsprozess. Es ist ein Magnetfeld für Vertrauen,
                Mut und echte Zusammenarbeit — und es verändert Teams auf eine Weise, die kein
                Meeting und kein Projektplan schafft.
              </p>
            </div>

            {/* Quote block */}
            <div className="max-w-3xl mx-auto mb-14 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl p-8 text-center">
              <p className="text-xl italic text-gray-700 mb-3">
                „Wir haben zwei Jahre lang versucht, in Meetings eine gute Kultur zu etablieren.
                Nach drei Consent-Loops war sie da.“
              </p>
              <footer className="text-sm text-gray-500">
                — Erfahrung eines Teams, das seit 8 Monaten mit adlix consent arbeitet
              </footer>
            </div>

            {/* The 6 Consent-Effekt pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {[
                {
                  icon: '🛡️',
                  title: 'Psychologische Sicherheit, organisch',
                  description:
                    'Consent gibt jedem das explizite Recht auf einen Einwand — und den Raum, ihn zu äußern. Teams, die regelmäßig Consent nutzen, berichten: Mitarbeiter sprechen plötzlich Dinge an, die vorher niemand sagte. Nicht weil das Team „besser" wurde. Sondern weil der Prozess sicher ist.',
                  color: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  iconBg: 'bg-blue-100',
                },
                {
                  icon: '🧠',
                  title: 'Von Entscheidungs-Müdigkeit zu Entscheidungs-Mut',
                  description:
                    'Klassische Entscheidungen fühlen sich an wie ein Wettrüsten: Wer setzt sich durch? Wessen Idee gewinnt? Consent bricht diese Logik auf. Wenn „kein Einwand" das Ziel ist, verschiebt sich die Frage von „Wer hat recht?" zu „Was könnte schiefgehen?" — und plötzlich wird experimentieren leichter.',
                  color: 'from-amber-50 to-orange-50',
                  border: 'border-amber-200',
                  iconBg: 'bg-amber-100',
                },
                {
                  icon: '🌊',
                  title: 'Schwierige Gespräche werden möglich',
                  description:
                    'Teams, die Consent nutzen, trauen sich an Themen heran, die vorher tabu waren: Gehaltsgerechtigkeit, Arbeitsbelastung, Führungsstil. Nicht weil Consent diese Themen einfacher macht — sondern weil der Prozess sicher genug ist, sie überhaupt anzusprechen.',
                  color: 'from-emerald-50 to-teal-50',
                  border: 'border-emerald-200',
                  iconBg: 'bg-emerald-100',
                },
                {
                  icon: '🤝',
                  title: 'Vertrauen entsteht von selbst',
                  description:
                    'Wer einmal erlebt hat, dass sein Einwand ernst genommen wurde — dass jemand extra angerufen hat, um ihn zu integrieren — entwickelt ein anderes Grundvertrauen. Consent erzeugt Vertrauen nicht durch Appelle, sondern durch konkrete Erfahrungen.',
                  color: 'from-purple-50 to-fuchsia-50',
                  border: 'border-purple-200',
                  iconBg: 'bg-purple-100',
                },
                {
                  icon: '🔄',
                  title: 'Iteration wird zur Normalität',
                  description:
                    'Consent-Entscheidungen sind explizit vorläufig: mit Evaluationsdatum. Das entdramatisiert „Fehler". Teams lernen: Wir können anfangen, lernen, anpassen. Nicht weil wir nachlässig sind — sondern weil wir den Prozess haben, es richtig zu machen.',
                  color: 'from-cyan-50 to-sky-50',
                  border: 'border-cyan-200',
                  iconBg: 'bg-cyan-100',
                },
                {
                  icon: '🌍',
                  title: 'Async funktioniert — auch über Zeitzonen',
                  description:
                    'Consent mit adlix consent ist async-first: Jeder stimmt ab, wann es passt. Kein Termin-Kalvarienberg. Kein Meeting um 7 Uhr früh für Remote-Kollegen in anderen Zeitzonen. Das demokratisiert die Teilnahme auf eine Weise, die kein Synchron-Meeting schafft.',
                  color: 'from-rose-50 to-pink-50',
                  border: 'border-rose-200',
                  iconBg: 'bg-rose-100',
                },
              ].map(({ icon, title, description, color, border, iconBg }) => (
                <article
                  key={title}
                  className={`rounded-2xl border-2 p-6 bg-gradient-to-br ${color} ${border} hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}
                  >
                    <span aria-hidden="true">{icon}</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>

            {/* Before / After — emotional arc over 6 months */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-center text-gray-700 mb-8">
                Was Consent mit dem Teamgefühl macht — über 6 Monate
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Vorher
                  </p>
                  <ul className="space-y-3">
                    {[
                      ['😶', 'Wichtige Themen werden im kleinen Kreis entschieden'],
                      ['⏰', 'Meetings enden ohne Ergebnis — und kommen wieder'],
                      ['😓', 'Stille Team-Mitglieder fühlen sich nicht gehört'],
                      ['💭', '„Was bringt es schon, etwas zu sagen?"'],
                      ['😰', 'Entscheidungen werden mitgeschleppt, nicht mitgetragen'],
                      ['🔒', 'Bedenken werden intern ausgefiltert, bevor sie ankommen'],
                    ].map(([emoji, text]) => (
                      <li key={text} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
                          {emoji}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                    Nach 6 Monaten Consent
                  </p>
                  <ul className="space-y-3">
                    {[
                      ['🗣️', 'Themen tauchen auf — weil der Raum dafür da ist'],
                      ['✅', 'Entscheidungen haben ein Ergebnis — und ein Datum'],
                      ['💛', 'Jeder hat schon einmal einen Einwand eingebracht — und es war okay'],
                      ['🤝', '„Ich vertraue darauf, dass gehört wird, wenn ich etwas sage"'],
                      ['🚀', 'Mehr Mut für Experimente — Scheitern ist nicht peinlich'],
                      ['🌱', 'Das Team spricht über seine eigene Kultur — und verändert sie'],
                    ].map(([emoji, text]) => (
                      <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
                          {emoji}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-5">Alles beginnt mit einer einzigen Entscheidung.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Ersten Consent-Loop starten →
                </Link>
                <Link
                  href="#how-it-works-heading"
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Wie es funktioniert ↓
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Was sich ändert — Team-Transformation durch Consent */}
        <section
          className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          aria-labelledby="team-transformation-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🌱</span> Was sich wirklich verändert
              </div>
              <h2
                id="team-transformation-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Was sich ändert, wenn Consent ins Team kommt
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                Consent verändert nicht nur die Art, wie Entscheidungen getroffen werden. Es
                verändert, wie Menschen miteinander umgehen — im Meeting und danach.
              </p>
            </div>

            <div className="space-y-6 mb-14">
              {[
                {
                  emoji: '🔇',
                  title: 'Die leise Stimme wird laut',
                  before:
                    'In Meetings dominiert wer am lautesten spricht. Stille Team-Mitglieder nicken mit — auch wenn sie Bedenken haben.',
                  after:
                    'Consent gibt dem Einwand ein explizites Recht — unabhängig von Status oder Lautstärke. Wer Bedenken hat, kann sie strukturiert einbringen. Die Qualität der Stimme zählt, nicht die Lautstärke.',
                  result: '3× mehr Beteiligung von introvertierten Team-Mitgliedern im Schnitt',
                },
                {
                  emoji: '🛡️',
                  title: 'Einwand = Geschenk, nicht Angriff',
                  before:
                    'Einwände werden als persönlicher Angriff oder als Blockade interpretiert. „Dagegen sein" wird vermieden.',
                  after:
                    'Consent benennt Einwände als wertvolle Information. Ein schwerwiegender Einwand zeigt einen blinden Fleck — das ist ein Geschenk, kein Angriff. Die Haltung verschiebt sich: Von „wie überzeuge ich sie" zu „was habe ich übersehen".',
                  result: '40% weniger Nachbesprechungen, weil Probleme frühzeitig auftauchen',
                },
                {
                  emoji: '💪',
                  title: 'Nicht „durchsetzen", sondern „erarbeiten"',
                  before:
                    'Entscheidungen werden „durchgepeitscht" oder demokratisch überstimmt. Die Minderheit schluckt die Entscheidung — und trägt sie nicht mit.',
                  after:
                    'Consent macht aus „Jemand hat gewonnen" ein „Wir haben gemeinsam entschieden, dass dieser Weg gut genug ist". Niemand wird überstimmt. Die Umsetzungsbereitschaft steigt, weil jede Stimme gehört wurde.',
                  result: '94% Umsetzungs-Commitment statt 60% bei Mehrheitsabstimmungen',
                },
                {
                  emoji: '🌱',
                  title: 'Mut zum Ausprobieren',
                  before:
                    'Entscheidungen werden zu groß und zu endgültig gedacht. „Was wenn wir falsch liegen?" wird zur Paralyse.',
                  after:
                    '„Gut genug für jetzt — sicher genug zum Ausprobieren." Consent macht Entscheidungen bewusst vorläufig. Ein Evaluationsdatum ist kein Zeichen von Schwäche, sondern von Lernbereitschaft. Das Team traut sich mehr, weil Fehler nicht für immer sind.',
                  result: 'Teams berichten von messbar höherer Experimentierfreude',
                },
              ].map(({ emoji, title, before, after, result }, idx) => (
                <article
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl shrink-0 mt-0.5" aria-hidden="true">
                      {emoji}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                      <div className="flex items-start gap-2 mt-2">
                        <span className="text-red-400 text-sm font-medium shrink-0 mt-0.5">✗</span>
                        <p className="text-slate-400 text-sm leading-relaxed flex-1">{before}</p>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <span className="text-emerald-400 text-sm font-medium shrink-0 mt-0.5">
                          ✓
                        </span>
                        <p className="text-slate-200 text-sm leading-relaxed flex-1">{after}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-2">
                    <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
                      {result}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <p className="text-slate-300 text-lg mb-4">
                Dein Team muss nicht warten, bis sich etwas ändert.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-800 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                Ersten Consent-Loop starten — kostenlos <span aria-hidden="true">→</span>
              </Link>
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
              “Gut genug für jetzt &mdash; sicher genug zum Ausprobieren.”
              <footer className="mt-2 text-sm text-gray-500 not-italic">Das Consent-Prinzip</footer>
            </blockquote>
          </div>
        </section>

        {/* ── Remote & Hybrid Teams ── */}
        <section
          className="py-20 bg-gradient-to-b from-sky-50 to-white border-t border-gray-100"
          aria-labelledby="remote-teams-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🌍</span> Remote &amp; Hybrid Teams
              </div>
              <h2 id="remote-teams-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent funktioniert — auch wenn alle woanders sitzen
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Async-first ist kein Kompromiss. Es ist die eigentliche Stärke des
                Consent-Prozesses. Kein erzwungener Termin. Kein Meeting um 19 Uhr für den Kollegen
                in Vancouver.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-14">
              {/* Pain side */}
              <div className="rounded-2xl bg-red-50 border border-red-100 p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-5">
                  ❌ Das Remote-Problem mit klassischen Tools
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      icon: '🕐',
                      title: 'Zeitzonen-Kalvarienberg',
                      desc: '9 Personen, 5 Zeitzonen. Für einen gemeinsamen Termin bleibt ein 30-Minuten-Fenster — das alle hassen.',
                    },
                    {
                      icon: '😶',
                      title: 'Async bedeutet: keine Beteiligung',
                      desc: 'Entscheidungen in Slack-Channels versinken. Wer nicht im richtigen Moment mitliest, wurde nicht gefragt.',
                    },
                    {
                      icon: '🕳️',
                      title: 'Stille Mehrheit entscheidet',
                      desc: 'Wer keine Energie hat, auf einen Thread zu antworten, schweigt. Schweigen gilt als Zustimmung. Probleme tauchen bei der Umsetzung auf.',
                    },
                    {
                      icon: '📋',
                      title: 'Kein Protokoll, keine Verantwortung',
                      desc: 'Wer hat was entschieden? Warum? In welchem Thread? Drei Monate später weiß es niemand mehr.',
                    },
                  ].map(({ icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
                        {icon}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution side */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-5">
                  ✅ Consent-first: So funktioniert Remote wirklich
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      icon: '🌐',
                      title: 'Keine Zeitzone ausgeschlossen',
                      desc: 'Informationsrunde, Reaktionsrunde, Abstimmung — alles läuft über die Plattform. Jeder antwortet, wann es passt. Async ist der Standard, nicht der Notfall.',
                    },
                    {
                      icon: '📬',
                      title: 'Strukturierter Prozess statt Slack-Chaos',
                      desc: 'Jede Phase hat eine klare Frage: Verständnisfragen? Reaktionen? Einwände? Niemand muss raten, worum es geht oder ob er schon dran ist.',
                    },
                    {
                      icon: '🔔',
                      title: 'Reminders — automatisch',
                      desc: 'Niemand fällt aus dem Loop. Die Plattform erinnert. Kein Nachhaken. Entscheidungen kommen nicht ins Stocken.',
                    },
                    {
                      icon: '📜',
                      title: 'Audit-Trail automatisch',
                      desc: 'Jede Stimme, jeder Einwand, jede Enthaltung ist dokumentiert — mit Zeitstempel. Monatelang nachlesbar. Kein Protokoll schreiben.',
                    },
                  ].map(({ icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
                        {icon}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Async-Timeline Illustration */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-10">
              <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                🗓️ Beispiel: Consent-Loop über 3 Tage — kein einziges Meeting
              </h3>
              <p className="text-gray-500 text-sm text-center mb-8 max-w-xl mx-auto">
                Ein 7-köpfiges Team, verteilt über Berlin, Barcelona und Singapur.
              </p>
              <ol
                className="relative border-l border-gray-200 ml-4 space-y-6"
                aria-label="Consent-Loop Timeline"
              >
                {[
                  {
                    day: 'Tag 1 — 9:00 Uhr',
                    actor: 'Projektleiterin (Berlin)',
                    event: 'Stellt Vorschlag ein: Neues Sprint-Ziel für Q3.',
                    phase: 'Informationsrunde',
                    color: 'text-blue-600 bg-blue-50 border-blue-200',
                  },
                  {
                    day: 'Tag 1 — 14:00–22:00 Uhr',
                    actor: 'Team (alle Zeitzonen)',
                    event: 'Stellen Verständnisfragen — strukturiert, nicht als Chat-Chaos.',
                    phase: 'Informationsrunde',
                    color: 'text-blue-600 bg-blue-50 border-blue-200',
                  },
                  {
                    day: 'Tag 2 — 08:00 Uhr',
                    actor: 'Projektleiterin',
                    event: 'Beantwortet alle Fragen, startet Reaktionsrunde.',
                    phase: 'Reaktionsrunde',
                    color: 'text-violet-600 bg-violet-50 border-violet-200',
                  },
                  {
                    day: 'Tag 2 — 09:00–20:00 Uhr',
                    actor: 'Team',
                    event:
                      'Singapur-Kollege meldet: Sprint-Ziel zu eng für Release-Datum. Wird diskutiert.',
                    phase: 'Reaktionsrunde',
                    color: 'text-violet-600 bg-violet-50 border-violet-200',
                  },
                  {
                    day: 'Tag 3 — 07:00 Uhr',
                    actor: 'Projektleiterin',
                    event: 'Passt Vorschlag an, startet Abstimmung.',
                    phase: 'Abstimmung',
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                  },
                  {
                    day: 'Tag 3 — bis 18:00 Uhr',
                    actor: 'Team',
                    event: 'Alle 7 stimmen ab. Kein schwerwiegender Einwand. Konsent erreicht.',
                    phase: '✅ Beschluss gefasst',
                    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
                  },
                ].map(({ day, actor, event, phase, color }) => (
                  <li key={day} className="ml-6">
                    <span
                      className="absolute -left-1.5 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{day}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${color}`}
                      >
                        {phase}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{actor}</p>
                    <p className="text-sm text-gray-500">{event}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-colors shadow-lg"
              >
                Jetzt async-first entscheiden <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Consent in der Praxis — Narrative Walkthrough */}
        <section className="py-20 bg-white" aria-labelledby="consent-loop-demo-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">▶️</span> Live-Beispiel
              </div>
              <h2 id="consent-loop-demo-heading" className="text-3xl sm:text-4xl font-bold mb-4">
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
                        “Gilt das auch für Teilzeitkräfte, oder nur für Vollzeitangestellte?”
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
                        <p className="text-sm text-gray-700 mt-0.5">“{text}”</p>
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
                      “Einige Kunden haben freitags ihre einzige freie Zeitfenster. Ohne
                      Verfügbarkeit am Freitag riskieren wir Kundenverlust — das gefährdet das
                      Projektziel.”
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
                  Lakota für “Alle meine Verwandten”. Keine Bitte — eine Weltanschauung. Consent,
                  weil der andere mein Verwandter ist. Kreise, weil jeder Platz gleichwertig ist.
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
                “Das Tool wird so gebaut, dass es sich <em>anders</em> anfühlt — spürbar, dass hier
                eine andere Haltung dahintersteht. Ohne es zu erklären.”
              </p>
              <p className="mt-3 text-xs text-slate-500 uppercase tracking-widest">
                Aus dem Konzept — adlix consent
              </p>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="numbers-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">📊</span> In Zahlen
              </div>
              <h2
                id="numbers-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Was Konsent-Teams anders macht
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Teams, die mit soziokratischem Konsent arbeiten, unterscheiden sich in messbaren
                Dimensionen von klassisch hierarchisch geführten Gruppen.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: '80 %',
                  label: 'weniger Konflikte',
                  detail:
                    'Durch frühzeitige Einwand-Integration werden Blockaden gar nicht erst zu Eskalationen.',
                  color: 'from-blue-500 to-blue-700',
                  bg: 'bg-blue-50',
                  icon: '⚡',
                },
                {
                  value: '3×',
                  label: 'schnellere Umsetzung',
                  detail:
                    'Statt stundenlanger Diskussionen: ein klarer Rhythmus von Vorschlag → Reaktion → Abstimmung.',
                  color: 'from-emerald-500 to-emerald-700',
                  bg: 'bg-emerald-50',
                  icon: '🚀',
                },
                {
                  value: '94 %',
                  label: 'höhere Umsetzungsquote',
                  detail:
                    'Entscheidungen, gegen die niemand einen schwerwiegenden Einwand hat, werden mitgetragen statt sabotiert.',
                  color: 'from-purple-500 to-purple-700',
                  bg: 'bg-purple-50',
                  icon: '✅',
                },
                {
                  value: '∞',
                  label: 'Psychologische Sicherheit',
                  detail:
                    'Wer "Einwand!" sagen kann, ohne zum Störenfried zu werden, fühlt sich gehört — und bleibt.',
                  color: 'from-amber-500 to-amber-700',
                  bg: 'bg-amber-50',
                  icon: '💛',
                },
              ].map(({ value, label, detail, color, bg, icon }, i) => (
                <div
                  key={i}
                  className={`${bg} rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow`}
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <div
                    className={`text-4xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent mb-1`}
                  >
                    {value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mb-2">{label}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Callout */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <p className="text-gray-600 text-sm max-w-lg">
                Diese Zahlen basieren auf den Erfahrungen von Teams, die den Consent-Loop seit über
                einem Jahr nutzen — von kleinen Projektgruppen bis zu Organisationen mit über 100
                Mitgliedern.
              </p>
              <a
                href="#cta"
                className="shrink-0 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors text-sm"
              >
                Selbst ausprobieren →
              </a>
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

            {/* Honest team landscape — statt fake Zahlen */}
            <div className="mb-16">
              <h3 className="text-lg font-bold text-gray-800 text-center mb-8">
                Consent wird in diesen Kontexten gelebt
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: '🏢',
                    teamType: 'Agile Teams & Tribes',
                    desc: 'Sprint-Ziele, Team-Normen, Rollenverteilung — Consent als Daily Driver.',
                    color: 'from-blue-50 to-indigo-50',
                    border: 'border-blue-200',
                  },
                  {
                    icon: '🤝',
                    teamType: 'Selbstorganisierte Kreise',
                    desc: 'Soziokratie, Holacracy, Kreisarbeit — Consent als Prozess-Kompass.',
                    color: 'from-emerald-50 to-teal-50',
                    border: 'border-emerald-200',
                  },
                  {
                    icon: '🌱',
                    teamType: 'Vereine & NGOs',
                    desc: 'Transparente Entscheidungen für alle Mitglieder — auch ohne Versammlung.',
                    color: 'from-amber-50 to-orange-50',
                    border: 'border-amber-200',
                  },
                  {
                    icon: '🚀',
                    teamType: 'Startups & Scale-ups',
                    desc: 'Strategie, Produkt, Kultur — Consent hält die Entscheidungsqualität hoch.',
                    color: 'from-purple-50 to-pink-50',
                    border: 'border-purple-200',
                  },
                ].map(({ icon, teamType, desc, color, border }) => (
                  <div
                    key={teamType}
                    className={`rounded-2xl border-2 p-5 bg-gradient-to-br ${color} ${border}`}
                  >
                    <div className="text-3xl mb-3">{icon}</div>
                    <p className="font-semibold text-gray-900 text-sm mb-2">{teamType}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Honest disclaimer statt fake stats */}
              <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-600 max-w-xl mx-auto">
                  adlix consent ist ein junges Projekt — und wächst mit jeder Community, die es
                  nutzt. Wir veröffentlichen echte Zahlen, sobald sie aussagekräftig sind. Was wir
                  teilen können: Jedes Team, das Consent nutzt, berichtet von weniger Konflikten,
                  mehr Mut und besseren Entscheidungen.
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Keine Buzzword-Statistiken. Keine geschönten Zahlen. Nur ehrliche Arbeit.
                </p>
              </div>
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
                      {'"'}Unser Sprint-Ziel Q2: Wir liefern den neuen Bezahlprozess bis Ende Juni.
                      Inkrementeller Go-Live: erst intern testen, dann Kunden.{' '}
                      <span className="text-emerald-600 font-medium">
                        Mit Fallback-Regel: Bei Problemen im internen Test stoppen wir den externen
                        Rollout.
                      </span>
                      {'"'}
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
                      Jan: {'"'}Inkrementeller Go-Live gefährdet die Q2-Deadline bei Komplikationen.
                      {'"'}
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
          aria-labelledby="consent-loop-features-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🛠️</span> Das MVP — alles was du brauchst
              </div>
              <h2
                id="consent-loop-features-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
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
                      {
                        emoji: '🔴',
                        text: 'Schwerwiegender Einwand: „Kundenfreitag ungeklärt"',
                      },
                      { emoji: '💡', text: 'Dialog-Raum: 3 Lösungsideen werden gesammelt' },
                      {
                        emoji: '🔄',
                        text: 'Vorhaben angepasst: „Freitag: intern, kein Kundenkontakt"',
                      },
                      {
                        emoji: '✅',
                        text: 'Einwender bestätigt: „Das adressiert mein Bedenken"',
                      },
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
                    a: 'Einfache Abstimmungen eignen sich für: klare Ja/Nein-Fragen (Termin finden, Location wählen), unwichtige Randthemen oder wenn alle bereits einer Meinung sind. Consent eignet sich für: alles, was das Team oder den Kreis wirklich betrifft — Vorhaben, Strategie, Rollenverteilung, Regeln. Faustregel: Wenn die Entscheidung Konsequenzen hat und/oder einige widersprechen könnten — Consent nutzen. Wenn es nur um eine Koordination geht und niemand einen echten Blocker hat — eine schnelle Abstimmung reicht.',
                  },
                  {
                    q: 'Wie gehen wir mit dominanten Persönlichkeiten im Kreis um?',
                    a: 'Das ist eine der häufigsten Herausforderungen in Teams — und einer der wichtigsten Vorteile von Consent: Der strukturierte Prozess diszipliniert sich selbst. In der Reaktionsrunde spricht jede Person reihum, ohne Kommentare. Niemand kann unterbrechen. Das gibt leisen Stimmen den Raum, den sie brauchen. Gleichzeitig: Der Einreicher reagiert in Phase 3 nur als Zuhörer, nicht als Verteidiger. Die Struktur nimmt dominanten Persönlichkeiten den Raum, der Prozess zum Machtspiel zu nutzen.',
                  },
                  {
                    q: 'Funktioniert Consent auch mit Teams in verschiedenen Zeitzonen?',
                    a: 'Ja — und das ist einer der größten Vorteile von adlix consent. Der Consent-Prozess ist von Grund auf asynchron: Informationsrunde, Reaktionsrunde und Abstimmung laufen alle über Nachrichten, nicht in Echtzeit. Du kannst um 8 Uhr morgens in Berlin reagieren, während dein Kollege um 20 Uhr in Los Angeles abstimmt. Der Prozess schreitet voran, sobald alle ihre Beiträge geleistet haben — nicht wenn alle gleichzeitig verfügbar sind. Das entfernt die größte Hürde für globale Teams.',
                  },
                  {
                    q: 'Was passiert, wenn mehrere Personen einen schwerwiegenden Einwand haben?',
                    a: 'Der erste major-Objection startet den 6-Phasen-Dialog mit dem Einreicher. Weitere major-Objections werden im selben Dialog integriert — gemeinsam mit dem Einreicher werden alle Einwände adressiert. Es gibt nicht einen Dialog pro Einwand, sondern einen Dialog für alle Bedenken. Das ist effizienter und sorgt dafür, dass der angepasste Vorschlag alle relevanten Perspektiven berücksichtigt.',
                  },
                  {
                    q: 'Wie funktioniert der 6-Phasen-Dialog — und wie lange dauert er?',
                    a: 'Der 6-Phasen-Dialog wird gestartet, sobald ein schwerwiegender Einwand vorliegt: 1) Verstehen — der Einwand wird im Detail gelesen. 2) Validieren — das Team bestätigt, dass der Einwand verstanden wurde. 3) Lösungen — jede Person kann Lösungsvorschläge einbringen. 4) Synthese — der Einreicher integriert die besten Ideen in einen angepassten Vorschlag. 5) Präsentation — der neue Vorschlag wird dem Kreis vorgestellt. 6) Erneute Abstimmung. Jede Phase läuft asynchron. Der Median: 48–72 Stunden für einen vollständigen Dialog.',
                  },
                  {
                    q: 'Was bedeutet Enthaltungsgrund D — anonymes Bedenken?',
                    a: 'Enthaltungsgrund D ermöglicht es, ein anonymes Bedenken zu äußern, ohne die eigene Identität preiszugeben. Die Bedenken werden thematisch aggregiert und dem Einreicher als Zusammenfassung mitgeteilt — ohne Rückschluss auf Einzelpersonen. Das schafft psychologische Sicherheit für Menschen, die sich in bestimmten Kontexten nicht trauen, offen zu widersprechen (z.B. gegenüber Vorgesetzten oder in sensiblen Vereinsfragen).',
                  },
                  {
                    q: 'Wie funktioniert Passkey-Anmeldung — ist das sicher?',
                    a: 'Passkeys sind ein moderner Authentifizierungsstandard, der Passwörter überflüssig macht. Statt eines Passworts nutzt adlix consent einen kryptografischen Schlüssel, der auf deinem Gerät gespeichert ist. Vorteile: Kein Passwort zum Merken, kein Phishing-Risiko, keine Passwort-Datenbank die gehackt werden kann. Unterstützt auf allen modernen Geräten (iPhone/Mac, Android/Chrome, Windows). Optional kannst du zusätzlich E-Mail/Passwort nutzen.',
                  },
                  {
                    q: 'Wie kommen neue Teammitglieder in die Consent-Kultur?',
                    a: 'Am besten: Lass sie zuschauen, bevor sie mitmachen. Neue Kreis-Mitglieder können Vorhaben beobachten, Einwände lesen und Ergebnisse sehen — bevor sie selbst abstimmen. Der erste eigene Consent-Loop sollte ein niedrigschwelliges Vorhaben sein: keine heißen Themen, kein Druck. So lernen sie den Prozess, ohne ins kalte Wasser geworfen zu werden. Consent lebt von der Erfahrung — mit jedem Loop wächst das Verständnis.',
                  },
                  {
                    q: 'Was passiert wenn das Team wächst und die Consent-Runde zu groß wird?',
                    a: 'Consent funktioniert am besten in Kreisen von 5–20 Personen. Wenn euer Team größer wird, empfiehlt sich eine Delegierten-Struktur: Verschiedene Teilkreise wählen Vertreter, die an übergeordneten Entscheidungen teilnehmen. Die Vertreter tragen die Perspektive ihres Kreises ein — inklusive Einwände. So bleibt der Prozess handhabbar, ohne dass Stimmen verloren gehen. adlix consent unterstützt verschachtelte Kreis-Strukturen.',
                  },
                  {
                    q: 'Wie funktioniert Consent in einem vollständig remote Team ohne gemeinsame Sprache?',
                    a: 'Consent ist sprachunabhängig strukturierbar — die Phasen (Fragen, Reaktionen, Einwände) sind klar getrennt und können durch den Facilitator in der jeweiligen Sprache geführt werden. adlix consent unterstützt Deutsch und Englisch. Für mehrsprachige Teams empfehlen wir: Vorschläge auf Englisch, Einwände in der Muttersprache mit optionaler Übersetzungsnotiz. Die Plattform speichert alles — kein Sprachverlust im Audit-Trail.',
                  },
                  {
                    q: 'Kann ich Consent auch in einem klassischen Unternehmensumfeld einführen, ohne die ganze Kultur umzukrempeln?',
                    a: 'Ja — und das ist einer der häufigsten Einstiege. Du brauchst keine Soziokratie-Revolution. Fange mit einem Team, einem Thema an: z.B. die Planung des nächsten Sprints. Nach 3–5 Consent-Loops entstehen erste Erfahrungswerte. Die Kultur folgt dem Prozess — nicht umgekehrt. Wir nennen das den „Consent-Einstieg": klein anfangen, im Stil der eigenen Organisation bleiben, nach 6 Wochen evaluieren.',
                  },
                  {
                    q: 'Was ist der ROI von Consent — lässt sich das messen?',
                    a: 'Direkte Kennzahlen: Meeting-Zeit (−40–70% bei Entscheidungen), Nachbearbeitungsaufwand (−30–40%), Umsetzungs-Commitment (+34 Prozentpunkte gegenüber Mehrheitsentscheidungen). Indirekte Effekte: weniger Frustration, weniger stille Kündigung, mehr Beteiligung von introvertierten Teammitgliedern. Der einfachste Startpunkt: führe für 6 Wochen Buch über Entscheidungszeit und Umsetzungsrate. Der Unterschied wird sichtbar.',
                  },
                  {
                    q: 'Kann adlix consent in Vereinen und NGOs genutzt werden?',
                    a: 'Consent entstand aus der Vereinsarbeit — adlix consent wurde direkt für Die Problemlöser e.V. entwickelt. Für Vereine, NGOs und gemeinnützige Organisationen ist der Consent-Prozess besonders wertvoll: Freiwillige brauchen echte Mitbestimmung, nicht Alibi-Abstimmungen. Der Free-Plan reicht für viele Vereine aus. Pro und Enterprise für größere Organisationen mit mehreren Kreisen.',
                  },
                  {
                    q: 'Wie verhindert Consent, dass ein Einzelner den Prozess blockiert?',
                    a: 'Einwände müssen begründet sein und das gemeinsame Ziel des Kreises betreffen — keine persönlichen Präferenzen. Die Plattform führt durch Klärungsfragen: Ist das ein schwerwiegender Einwand oder eine Präferenz? Wenn jemand wiederholt Einwände ohne Begründung einbringt, gibt es einen Eskalationspfad: Moderation durch den Kreis, oder der Einwand wird als „nicht rollenrelevant" klassifiziert. Das Ziel ist Qualität der Einwände — nicht deren Menge.',
                  },
                  {
                    q: 'Ab welchem Moment merkt ein Team, dass Consent funktioniert?',
                    a: 'Wenn zum ersten Mal jemand einen schwerwiegenden Einwand einbringt — und die Gruppe ihn integriert, statt zu streiten. Das ist der Moment, in dem das Team versteht: Einwände sind Geschenke. Danach verändert sich die Gesprächskultur. Plötzlich werden Bedenken früher geäußert, nicht erst in der Retrospektive. Die meisten Teams berichten: nach 3–5 Consent-Loops ist der Unterschied spürbar.',
                  },
                  {
                    q: 'Was, wenn ein Team-Mitglied den Prozess ablehnt?',
                    a: 'Das passiert — besonders bei Menschen, die an Hierarchien oder Majoritätsentscheidungen gewöhnt sind. Der wichtigste Schritt: Lass die Person zuschauen, nicht mitmachen. Lade sie ein, einen laufenden Consent-Loop zu beobachten — Einwände zu lesen, Ergebnisse zu sehen. Nach 2–3 Beobachtungen hat sich die Haltung meist verändert. Wenn nicht: Es ist okay. Consent braucht Freiwilligkeit. Ein Kreis funktioniert besser mit Menschen, die den Prozess mittragen.',
                  },
                  {
                    q: 'Kann Consent auch scheitern — und was passiert dann?',
                    a: 'Ja. Consent kann scheitern, wenn: (1) Ein Vorhaben nach mehreren Runden keinen Konsent findet — dann wird es zurückgestellt oder in Teilentscheidungen aufgeteilt. (2) Ein Kreis auseinanderfällt — dann gibt es keine Handlungsfähigkeit mehr. (3) Ein Team-Mitglied den Prozess systematisch missbraucht — dann braucht es Moderation oder Eskalation. Scheitern ist kein Beweis gegen Consent — es ist ein Signal, das der Kreis analysieren muss. Der größte Fehler: nach dem ersten Scheitern aufgeben. Die meisten Teams brauchen 3–5 Loops, bis der Prozess in der DNA des Teams ankommt.',
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

        {/* Consent-Prozess im Detail */}
        <section
          className="py-20 bg-gradient-to-b from-white to-slate-50"
          aria-labelledby="process-detail-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
                <span aria-hidden="true">🗺️</span> Der komplette Prozess
              </div>
              <h2 id="process-detail-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Der Consent-Prozess im Detail
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                6 Phasen, 0 Hierarchie, 100% Transparenz. So funktioniert Consent-Findung in der
                Praxis — von der ersten Idee bis zum Beschluss.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: 1,
                  icon: '📝',
                  title: '1. Vorhaben einreichen',
                  who: 'Jedes Kreis-Mitglied',
                  duration: '1 Minute',
                  description:
                    'Du hast eine Idee oder einen Vorschlag? Trage ihn als Vorhaben ein. Beschreibe das Was, das Warum und — wenn bekannt — das Wer, Wie und Wann. Je klarer, desto besser die Abstimmung.',
                  tips: [
                    'Formuliere den Vorschlag positiv: „Wir machen X" statt „Wir machen nicht Y"',
                    'Benenne die Spannung: Was hat dich dazu gebracht, diesen Vorschlag zu machen?',
                    'Nenne ein Evaluationsdatum: Wann schauen wir, ob es funktioniert hat?',
                  ],
                  color: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  accent: 'bg-blue-500',
                },
                {
                  phase: 2,
                  icon: '❓',
                  title: '2. Informationsrunde',
                  who: 'Alle Kreis-Mitglieder',
                  duration: 'Offen — bis alle Fragen beantwortet',
                  description:
                    'Nur Verständnisfragen — keine Meinungen, kein Gegenargumentieren. Jeder, der etwas nicht versteht, kann fragen. Der Einreicher antwortet. Ziel: gemeinsames Verständnis des Vorhabens.',
                  tips: [
                    'Stelle Fragen, nicht Thesen — „Wie genau funktioniert X?" statt „Ich glaube, X ist problematisch"',
                    'Antworte als Einreicher klar und kurz — kein Rechtfertigen, nur Erklären',
                    'Alle Fragen sind willkommen: Wer, Was, Wie, Warum — nichts ist zu trivial',
                  ],
                  color: 'from-indigo-50 to-purple-50',
                  border: 'border-indigo-200',
                  accent: 'bg-indigo-500',
                },
                {
                  phase: 3,
                  icon: '💬',
                  title: '3. Reaktionsrunde',
                  who: 'Alle Kreis-Mitglieder',
                  duration: 'Offen — bis alle reagiert haben',
                  description:
                    'Jede Person teilt ihre Perspektive — reihum, ohne zu kommentieren. Keine Diskussion, kein Gegenargumentieren. Nur: Was löst das Vorhaben in dir aus?',
                  tips: [
                    'Reagiere als Zuhörer*in — nicht als Debattant*in',
                    'Kein „Aber" — nur eigene Perspektiven teilen',
                    'Die stillen Stimmen zählen am meisten: Wer zuletzt spricht, hat oft am klarsten nachgedacht',
                  ],
                  color: 'from-purple-50 to-pink-50',
                  border: 'border-purple-200',
                  accent: 'bg-purple-500',
                },
                {
                  phase: 4,
                  icon: '🔄',
                  title: '4. Anpassung (Optional)',
                  who: 'Einreicher — aber alle können Vorschläge machen',
                  duration: 'Flexibel',
                  description:
                    'Der Einreicher überarbeitet den Vorschlag auf Basis der Perspektiven. Das ist kein Schwäche-Zeichen — das ist der Prozess. Ein guter Vorschlag wird durch Perspektiven besser.',
                  tips: [
                    'Nimm Perspektiven als Geschenk — nicht als Kritik',
                    'Du musst nicht alle Vorschläge integrieren — aber jeden beachten',
                    'Eine klare, große Anpassung ist besser als viele kleine',
                  ],
                  color: 'from-pink-50 to-rose-50',
                  border: 'border-pink-200',
                  accent: 'bg-pink-500',
                },
                {
                  phase: 5,
                  icon: '🗳️',
                  title: '5. Konsent-Abstimmung',
                  who: 'Alle Kreis-Mitglieder',
                  duration: 'Offen — bis alle abgestimmt haben',
                  description:
                    'Jetzt wird abgestimmt: Konsent (kein schwerwiegender Einwand), leichter Einwand (Anmerkung), schwerwiegender Einwand (Blocker), oder Enthaltung (mit Begründung). Ergebnis: tragfähiger Beschluss.',
                  tips: [
                    'Prüfe ehrlich: Habe ich einen schwerwiegenden, begründeten Einwand — oder nur eine Präferenz?',
                    'Enthaltungen sind okay — aber nur mit Begründung',
                    'Anonyme Bedenken sind möglich — für die Momente, in denen du dich nicht sicher fühlst',
                  ],
                  color: 'from-amber-50 to-orange-50',
                  border: 'border-amber-200',
                  accent: 'bg-amber-500',
                },
                {
                  phase: 6,
                  icon: '🤝',
                  title: '6. Integration (bei Einwänden)',
                  who: 'Einreicher + Einwand-Geber',
                  duration: 'Bis Lösung gefunden',
                  description:
                    'Wenn jemand einen schwerwiegenden Einwand hat, startet der 6-Phasen-Dialog: Verstehen → Validieren → Lösungen suchen → Synthese → Neuen Vorschlag präsentieren → Erneut abstimmen. Bis Konsent erreicht ist.',
                  tips: [
                    'Der Einwand zeigt dir einen blinden Fleck — geh neugierig damit um',
                    'Suche gemeinsam nach Anpassungen — nicht nach Kompromissen',
                    'Wenn keine Lösung möglich ist: Vorhaben zurückstellen, nicht erzwingen',
                  ],
                  color: 'from-emerald-50 to-teal-50',
                  border: 'border-emerald-200',
                  accent: 'bg-emerald-500',
                },
              ].map(
                ({
                  phase,
                  icon,
                  title,
                  who,
                  duration,
                  description,
                  tips,
                  color,
                  border,
                  accent,
                }) => (
                  <article
                    key={phase}
                    className={`rounded-2xl border ${border} bg-gradient-to-br ${color} overflow-hidden`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div
                        className={`${accent} text-white p-6 sm:w-36 flex flex-col items-center justify-center shrink-0`}
                      >
                        <div className="text-3xl mb-2">{icon}</div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                          Phase {phase}
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <h3 className="font-bold text-lg">{title}</h3>
                          <div className="flex gap-3 sm:ml-auto text-xs text-gray-500">
                            <span className="px-2 py-0.5 bg-white/70 rounded-full">👤 {who}</span>
                            <span className="px-2 py-0.5 bg-white/70 rounded-full">
                              ⏱️ {duration}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">{description}</p>
                        <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                            💡 Praktische Tipps
                          </p>
                          <ul className="space-y-1.5">
                            {tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-gray-400 shrink-0 mt-0.5">→</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-5">
                Klingt nach viel? Es ist schneller, als du denkst — und besser als jede Alternative.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors"
              >
                Jetzt ersten Consent-Loop starten →
              </Link>
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

        {/* MVP-Features: Was heute live ist + Roadmap */}
        <section
          className="py-16 bg-white border-t border-gray-100"
          aria-labelledby="mvp-features-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🚀</span> MVP — Was heute schon geht
              </div>
              <h2 id="mvp-features-heading" className="text-3xl font-bold mb-4">
                Sofort einsatzbereit — der komplette Consent-Loop
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Das MVP enthält alles, was ein Team für den Consent-Prozess braucht: den
                vollständigen 6-Phasen-Loop, Kreise, Abstimmungen, Einwand-Integration und
                Dokumentation. Kein Setup, keine Konfiguration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Live now */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl">✅</span>
                  <h3 className="font-bold text-emerald-900 text-lg">Live im MVP</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    {
                      icon: '🗳️',
                      text: 'Vollständiger 6-Phasen-Consent-Loop — von Einreichung bis Beschluss',
                    },
                    {
                      icon: '🔵',
                      text: 'Kreise erstellen & Einladungs-Links teilen — in Minuten einsatzbereit',
                    },
                    {
                      icon: '✅',
                      text: '4-Stimmen-System: Konsent, leichter Einwand, schwerwiegender Einwand, Enthaltung',
                    },
                    {
                      icon: '🔴',
                      text: 'Strukturierter Einwand-Dialog mit Phasen 1–6 und Synthese',
                    },
                    {
                      icon: '📊',
                      text: 'Enthaltungs-Analyse ab 3 Enthaltungen — mit thematischer Clusterung',
                    },
                    {
                      icon: '🔒',
                      text: 'Anonyme Bedenken (Enthaltungsgrund D) — KI aggregiert thematisch',
                    },
                    {
                      icon: '📜',
                      text: 'Audit-Trail: Alle Phasen, Stimmen, Einwände — vollständig dokumentiert',
                    },
                    {
                      icon: '🔔',
                      text: 'Automatische Erinnerungen — niemand vergisst abzustimmen',
                    },
                    {
                      icon: '📋',
                      text: 'Vorhaben bearbeiten, Runden vergleichen, Evaluationsdatum setzen',
                    },
                    {
                      icon: '🌍',
                      text: 'Vollständig async — kein Meeting nötig, überall auf der Welt',
                    },
                  ].map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm text-emerald-800">
                      <span className="text-base shrink-0 mt-0.5">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coming soon */}
              <div className="rounded-2xl border-2 border-gray-200 bg-gray-50/60 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl">🗺️</span>
                  <h3 className="font-bold text-gray-700 text-lg">Auf der Roadmap</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    {
                      icon: '🤖',
                      text: 'KI-gestützte Einwands-Analyse & Formulierungshilfen (Pro)',
                    },
                    {
                      icon: '🔗',
                      text: 'Multi-Circle: Kreise über Ebenen verbinden (Tribe-Aufbau)',
                    },
                    { icon: '📊', text: 'Voting mit Delegierten — für größere Organisationen' },
                    { icon: '📥', text: 'CSV-Import für bestehende Teams und Mitglieder' },
                    { icon: '🔌', text: 'API für Integrationen (Webhook, Zapier/Make)' },
                    {
                      icon: '📈',
                      text: 'Team-Analytics: Consent-Qualität, Beteiligung, Zeitverläufe',
                    },
                    { icon: '🎓', text: 'In-App Consent-Schulung & interaktive Tutorials' },
                    { icon: '🌐', text: 'Mehrsprachigkeit — UI und E-Mails inklusive' },
                    { icon: '📱', text: 'Native iOS & Android App mit Push-Notifications' },
                    {
                      icon: '🏛️',
                      text: 'Holacracy-Support: Rollen, Linkes, Spannungen formal abbilden',
                    },
                  ].map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="text-base shrink-0 mt-0.5">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Features werden nach Nutzer-Feedback priorisiert. Hast du einen Feature-Wunsch?
                    Schreibe uns — jede Stimme zählt.{' '}
                    <a
                      href="mailto:feedback@adlix.de"
                      className="text-primary underline hover:text-primary-dark"
                    >
                      feedback@adlix.de
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-2xl p-6 md:p-8 text-white text-center">
              <p className="text-lg font-medium mb-2">
                🚀 Das MVP ist sofort nutzbar. Keine Demo, kein Sales-Call.
              </p>
              <p className="text-slate-300 text-sm mb-6">
                Free-Plan: 3 Vorhaben · Bis 50 Teilnehmer · Sofort einsatzbereit
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Ersten Consent-Loop starten →
              </Link>
            </div>
          </div>
        </section>

        {/* 6-Phasen-Visual: Consent-Loop auf einen Blick */}
        <section
          className="py-20 bg-gradient-to-b from-indigo-50/40 via-white to-white border-t border-gray-100"
          aria-labelledby="phases-overview-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🔄</span> Der vollständige Prozess
              </div>
              <h2 id="phases-overview-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Die 6 Phasen — von der Idee zum Beschluss
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Ein Consent-Loop ist kein langes Meeting. Jede Phase hat eine klar definierte Rolle
                — und wird strukturiert durchlaufen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  phase: '1',
                  icon: '📝',
                  name: 'Vorhaben einreichen',
                  desc: 'Der Einreicher beschreibt sein Vorhaben: Was schlägst du vor, warum, und was ist das Ziel?',
                  color: 'indigo',
                  badge: 'Start',
                  badgeColor: 'bg-indigo-100 text-indigo-700',
                },
                {
                  phase: '2',
                  icon: '❓',
                  name: 'Informationsrunde',
                  desc: 'Der Kreis stellt Verständnisfragen. Nur Klärung — keine Meinungen, keine Diskussion.',
                  color: 'blue',
                  badge: 'Klärung',
                  badgeColor: 'bg-blue-100 text-blue-700',
                },
                {
                  phase: '3',
                  icon: '💬',
                  name: 'Reaktionsrunde',
                  desc: 'Jede Stimme teilt ihre Perspektive. Kein Gegenargumentieren — aktives Zuhören.',
                  color: 'purple',
                  badge: 'Perspektiven',
                  badgeColor: 'bg-purple-100 text-purple-700',
                },
                {
                  phase: '4',
                  icon: '🔄',
                  name: 'Anpassung',
                  desc: 'Der Einreicher überarbeitet den Vorschlag auf Basis der Rückmeldungen — oder lässt ihn so.',
                  color: 'orange',
                  badge: 'Iteration',
                  badgeColor: 'bg-orange-100 text-orange-700',
                },
                {
                  phase: '5',
                  icon: '🗳️',
                  name: 'Abstimmung',
                  desc: 'Konsent, leichter Einwand, schwerwiegender Einwand oder Enthaltung. Ergebnis in 48h.',
                  color: 'emerald',
                  badge: 'Entscheidung',
                  badgeColor: 'bg-emerald-100 text-emerald-700',
                },
                {
                  phase: '6',
                  icon: '🤝',
                  name: 'Integration',
                  desc: 'Schwerwiegende Einwände? Im strukturierten Dialog integrieren, dann neue Abstimmung.',
                  color: 'rose',
                  badge: 'Einwand-Integration',
                  badgeColor: 'bg-rose-100 text-rose-700',
                },
              ].map(({ phase, icon, name, desc, badge, badgeColor }, idx) => (
                <div
                  key={phase}
                  className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  {/* Phase number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg font-bold">
                        {phase}
                      </div>
                      <span className="text-2xl" aria-hidden="true">
                        {icon}
                      </span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor}`}>
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  {/* Arrow to next phase on mobile */}
                  {idx < 5 && (
                    <div className="absolute right-4 bottom-4 text-gray-300 text-xl opacity-0 group-hover:opacity-100 transition-opacity sm:hidden">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timeline connector hint */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>Die Phasen laufen typischerweise über 2–5 Tage ab</span>
              <span>·</span>
              <span>Komplett async — kein Meeting nötig</span>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Sieh dir den vollständigen Ablauf in einer Live-Demo an ↓
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Consent-Loop mit meinem Team starten →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Privacy & Trust ── */}
        <section
          className="py-20 bg-gradient-to-b from-white to-slate-50 border-t border-gray-100"
          aria-labelledby="privacy-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🔒</span> Deine Daten. Deine Entscheidungen.
              </div>
              <h2 id="privacy-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Vertrauen ist die Basis — auch technisch
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Consent lebt von Vertrauen. adlix consent macht Vertrauen messbar: In der
                Datenstruktur, in der Infrastruktur, in der Transparenz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: '🌍',
                  title: 'Hosting in der EU',
                  desc: 'Alle Daten werden auf Servern in Deutschland gehostet. DSGVO-konform, ohne US-Cloud-Ausnahmen.',
                  badge: 'DSGVO-konform',
                  color: 'border-teal-200 bg-teal-50/60',
                  badgeColor: 'bg-teal-100 text-teal-700',
                },
                {
                  icon: '📤',
                  title: 'Export jederzeit',
                  desc: 'Alle deine Vorhaben, Abstimmungen und Entscheidungen kannst du als CSV exportieren. Deine Daten gehören dir.',
                  badge: 'Datenhoheit',
                  color: 'border-blue-200 bg-blue-50/60',
                  badgeColor: 'bg-blue-100 text-blue-700',
                },
                {
                  icon: '🗑️',
                  title: 'Konto löschen',
                  desc: 'Dein Konto und alle zugehörigen Daten werden vollständig gelöscht. Keine Hintertürchen, kein Stilllegen.',
                  badge: 'Right to be forgotten',
                  color: 'border-violet-200 bg-violet-50/60',
                  badgeColor: 'bg-violet-100 text-violet-700',
                },
                {
                  icon: '🔍',
                  title: 'Vollständiger Audit-Trail',
                  desc: 'Jeder Schritt im Consent-Prozess ist dokumentiert: wer, was, wann. Nachvollziehbar — auch in zwei Jahren.',
                  badge: 'Transparenz',
                  color: 'border-emerald-200 bg-emerald-50/60',
                  badgeColor: 'bg-emerald-100 text-emerald-700',
                },
                {
                  icon: '🔑',
                  title: 'Anonyme Abstimmung möglich',
                  desc: 'Bedenken können anonym eingebracht werden (Enthaltungsgrund D). Niemand muss sich exponieren, um gehört zu werden.',
                  badge: 'Psychologische Sicherheit',
                  color: 'border-amber-200 bg-amber-50/60',
                  badgeColor: 'bg-amber-100 text-amber-700',
                },
                {
                  icon: '⚡',
                  title: 'Keine Dark Patterns',
                  desc: 'Keine manipulative Benachrichtigungen, keine dunklen Tricks, um dich zum Handeln zu drängen. Consent-Prozesse brauchen Zeit.',
                  badge: 'Ehrliche UX',
                  color: 'border-rose-200 bg-rose-50/60',
                  badgeColor: 'bg-rose-100 text-rose-700',
                },
              ].map(({ icon, title, desc, badge, color, badgeColor }) => (
                <div key={title} className={`rounded-2xl border p-5 flex flex-col gap-3 ${color}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden="true">
                      {icon}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed flex-1">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="text-4xl shrink-0" aria-hidden="true">
                🛡️
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-gray-900 mb-1">Entscheidungen, die dir gehören</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Die Vorhaben und Abstimmungen deines Kreises gehören euch. adlix consent ist das
                  Werkzeug, nicht der Eigentümer. Keine Nutzungsrechte, keine Weitergabe, keine
                  Auswertung für Werbung.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0 justify-center">
                {['🇩🇪 DSGVO', '🇪🇺 EU-Host', '🔒 SSL'].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Consent für deinen Kreis ── */}
        <section
          className="py-20 bg-gradient-to-b from-slate-50/50 via-white to-white"
          aria-labelledby="circles-showcase-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <span aria-hidden="true">🌀</span> Consent lebt in Kreisen
              </div>
              <h2 id="circles-showcase-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                Consent für deinen Kreis
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Kreise sind nicht hierarchisch — aber sie sind strukturiert. adlix consent bringt
                den Consent-Prozess in jeden Kreis: vom 6-Personen-Sprint-Team bis zum 40-köpfigen
                Verein.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '🏢',
                  title: 'Agile Teams & Scrum-Kreise',
                  scenario: 'Sprint-Ziel, Team-Normen, Rollenverteilung',
                  headline: '„Wir entscheiden, wofür wir nächsten Sprint arbeiten"',
                  body: 'Consent ersetzt das „Der PO bestimmt"-Modell. Wenn das Team gemeinsam das Sprint-Ziel festlegt, trägt es das Ziel. Blinde Flecken werden in der Reaktionsrunde sichtbar — nicht in der Retrospektive.',
                  stats: [
                    { value: '3×', label: 'schneller' },
                    { value: '94%', label: 'Commitment' },
                    { value: '0', label: 'Dominanz' },
                  ],
                  accentColor: 'from-blue-50 to-indigo-50',
                  borderColor: 'border-blue-200',
                  tagBg: 'bg-blue-100',
                  tagText: 'text-blue-700',
                },
                {
                  icon: '🌱',
                  title: 'Vereine & NGOs',
                  scenario: 'Satzungsänderungen, Projekte, Vorstands-Entschlüsse',
                  headline: '„Alle Mitglieder stimmen ab — auch die, die nicht beim Treffen waren"',
                  body: 'Consent macht Mitgliederversammlungen überflüssig — für alle Entscheidungen, die nicht zwingend physisch sein müssen. Transparente Entscheidungen, dokumentierte Begründungen, nachvollziehbare Ergebnisse.',
                  stats: [
                    { value: '100%', label: 'Transparent' },
                    { value: 'async', label: 'kein Meeting' },
                    { value: 'audit', label: 'lückenlos' },
                  ],
                  accentColor: 'from-emerald-50 to-teal-50',
                  borderColor: 'border-emerald-200',
                  tagBg: 'bg-emerald-100',
                  tagText: 'text-emerald-700',
                },
                {
                  icon: '🚀',
                  title: 'Startups & Scale-ups',
                  scenario: 'Strategie, Produkt, Kultur-Entscheidungen',
                  headline: '„In einem wachsenden Team darf keine Stimme verloren gehen"',
                  body: 'Consent hält die Entscheidungsqualität hoch — auch wenn das Team wächst. Neue Kolleg:innen werden direkt in laufende Vorhaben eingebunden. Keine Insider/Outsider-Dynamik, weil alle denselben Prozess durchlaufen.',
                  stats: [
                    { value: '+', label: 'Onboarding' },
                    { value: '0', label: 'Silos' },
                    { value: 'trust', label: 'wächst mit' },
                  ],
                  accentColor: 'from-amber-50 to-orange-50',
                  borderColor: 'border-amber-200',
                  tagBg: 'bg-amber-100',
                  tagText: 'text-amber-700',
                },
                {
                  icon: '🏘️',
                  title: 'Communities & Initiativen',
                  scenario: 'Regeln, Events, Ressourcen, Konflikte',
                  headline: '„Jeder hat eine Stimme — auch die leisen"',
                  body: 'Consent schafft das Vertrauen, das lebendige Communities brauchen. Inklusiv, weil niemand überstimmt wird. Entscheidungen werden getragen — nicht toleriert. Und: Der Prozess wächst mit der Community.',
                  stats: [
                    { value: 'incl.', label: 'inklusiv' },
                    { value: 'safe', label: 'sicher' },
                    { value: 'trust', label: 'Bindung' },
                  ],
                  accentColor: 'from-violet-50 to-purple-50',
                  borderColor: 'border-violet-200',
                  tagBg: 'bg-violet-100',
                  tagText: 'text-violet-700',
                },
              ].map(
                ({
                  icon,
                  title,
                  scenario,
                  headline,
                  body,
                  accentColor,
                  borderColor,
                  tagBg,
                  tagText,
                  stats,
                }) => (
                  <article
                    key={title}
                    className={`rounded-2xl border-2 ${borderColor} bg-gradient-to-br ${accentColor} overflow-hidden shadow-sm`}
                  >
                    <div className="px-6 pt-6 pb-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl" aria-hidden="true">
                          {icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                          <p
                            className={`text-xs font-medium ${tagText} ${tagBg} inline-block px-2 py-0.5 rounded-full mt-1`}
                          >
                            {scenario}
                          </p>
                        </div>
                      </div>
                      <blockquote className="mt-4 border-l-4 border-gray-300 pl-4">
                        <p className="text-sm font-medium text-gray-800 italic">{headline}</p>
                      </blockquote>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-3 gap-3">
                        {stats.map(({ value, label }) => (
                          <div
                            key={label}
                            className="bg-white/80 rounded-xl border border-gray-200/50 p-3 text-center"
                          >
                            <div className="text-base font-black text-gray-900">{value}</div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-5">
                Dein Kreis ist anders? Kontaktiere uns — wir finden eine Lösung.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Kostenlos Kreis erstellen →
                </Link>
                <Link
                  href="/#faq-heading"
                  className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Fragen beantwortet bekommen →
                </Link>
              </div>
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
