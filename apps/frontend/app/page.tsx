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
              href="#how-it-works-heading"
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              So funktioniert&apos;s
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

            {/* Omitakuyasin Quote */}
            <div className="mt-12 text-center">
              <blockquote className="text-slate-300 text-lg italic max-w-xl mx-auto">
                &ldquo;Omitakuyasin — Alle meine Verwandten. Wir sind alle verbunden.&rdquo;
              </blockquote>
              <p className="text-slate-500 text-sm mt-2">
                Das stille Fundament — sichtbar in jedem Einwand, der gehört wird.
              </p>
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
                    '„Wir haben aufgehört, endlos zu diskutieren. Seitdem wir Consent nutzen, treffen wir Entscheidungen doppelt so schnell — und alle tragen sie mit."',
                  name: 'Sarah K.',
                  role: 'Agile Coach, Scrum-Team',
                  emoji: '👩‍💼',
                },
                {
                  quote:
                    '„Endlich ein Tool, das den soziokratischen Prozess wirklich abbildet. Kein Kompromiss, kein Überstimmen — echte Consent-Entscheidungen."',
                  name: 'Markus T.',
                  role: 'Kreiskoordinator, NGO',
                  emoji: '🤝',
                },
                {
                  quote:
                    '„Die Enthaltungs-Folgeprozesse haben uns geholfen, versteckte Bedenken im Team sichtbar zu machen. Das war Gold wert."',
                  name: 'Lena R.',
                  role: 'Gründerin, Startup',
                  emoji: '🚀',
                },
              ].map(({ quote, name, role, emoji }) => (
                <figure
                  key={name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col"
                >
                  <blockquote className="flex-1">
                    <p className="text-gray-700 italic text-sm leading-relaxed">{quote}</p>
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
                    q: 'Wer kann einen schwerwiegenden Einwand einbringen?',
                    a: 'Jedes Mitglied des betroffenen Kreises. Ein Einwand muss begründet sein und sich auf das gemeinsame Ziel beziehen — kein persönlicher Geschmack. adlix consent führt durch den Klärungsprozess und hilft dabei, echte Einwände von Präferenzen zu unterscheiden.',
                  },
                  {
                    q: 'Was passiert, wenn jemand sich enthält?',
                    a: 'Enthaltung ist möglich — aber nicht als bequemer Ausweg. Die Plattform fragt nach dem Grund: Nicht betroffen? Brauche mehr Info? Anonyme Bedenken? Je nach Grund gibt es einen eigenen Folgeprozess. Ziel: versteckte Einwände sichtbar machen.',
                  },
                  {
                    q: 'Kann ich Consent-Entscheidungen später revidieren?',
                    a: '„Gut genug für jetzt — sicher genug zum Ausprobieren." Jede Consent-Entscheidung kann mit einem Evaluationsdatum versehen werden. Die Plattform erinnert dich, wenn ein Vorhaben zur Überprüfung fällig ist. Entscheidungen sind bewusst vorläufig.',
                  },
                  {
                    q: 'Für wie große Teams ist adlix consent geeignet?',
                    a: 'Free-Plan: bis 50 Teilnehmer pro Projekt. Pro: bis 500. Enterprise: unbegrenzt. Der Consent-Prozess funktioniert besonders gut in Kreisen von 5–20 Personen — auch größere Gruppen können ihn über Delegierte strukturieren.',
                  },
                  {
                    q: 'Brauche ich Vorkenntnisse in Soziokratie?',
                    a: 'Nein. adlix consent führt durch jeden Schritt — mit Erklärungen, Hinweisen und Leitfragen. Du lernst den Prozess, indem du ihn nutzt. Optional gibt es KI-Unterstützung (Pro), die Einwände analysiert und Formulierungshilfen gibt.',
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
