import Link from 'next/link'

// Consent Flow Steps
const flowSteps = [
  { label: 'Beschreibung', icon: '📝', description: 'Vorschlag wird vorgestellt' },
  { label: 'Abstimmung', icon: '🗳️', description: 'Zustimmung / Ablehnung' },
  { label: 'Einspruch', icon: '✋', description: 'Bedenken einbringen' },
  { label: 'Diskussion', icon: '💬', description: 'Argumente austauschen' },
  { label: 'Anpassung', icon: '🔄', description: 'Vorschlag überarbeiten' },
  { label: 'Neuer Loop', icon: '🔁', description: 'Zurück zur Abstimmung' },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'dauerhaft',
    description: 'Für kleine Gruppen und Projekte',
    features: ['Bis 3 Consent-Projekte', 'Bis 50 Teilnehmer', 'Grundlegende Abstimmung'],
    cta: 'Kostenlos starten',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29',
    period: 'pro Monat',
    description: 'Für Teams und Organisationen',
    features: [
      'Unbegrenzte Projekte',
      'Bis 500 Teilnehmer',
      'Vollständiger Einspruch-Workflow',
      'Microsoft Teams Integration',
      'Kommentare & Diskussionen',
    ],
    cta: 'Pro starten',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Auf Anfrage',
    period: '',
    description: 'Für große Organisationen',
    features: [
      'Alles in Pro',
      'SSO / SAML',
      'API-Zugang',
      'Dedizierter Support',
      'SLA-Garantie',
      'Custom Integrationen',
    ],
    cta: 'Kontakt aufnehmen',
    highlighted: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              Projekte
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Anmelden
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Entscheidungen mit
            <span className="text-primary"> Consent </span>
            treffen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Fair. Transparent. Inklusiv. adlix consent macht es einfach, gemeinsam zu entscheiden —
            ohne Hierarchien, mit Stimme für alle.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/projects/new"
              className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Neues Projekt starten
            </Link>
            <Link
              href="#pricing"
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Preise ansehen
            </Link>
          </div>
        </section>

        {/* Consent Flow */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">So funktioniert&apos;s</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Der Consent-Prozess: Beschreibung → Abstimmung → Einspruch → Diskussion → Anpassung →
              Neuer Loop
            </p>

            {/* Flow Visualization */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex items-center min-w-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2 shrink-0">
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-center">{step.label}</div>
                    <div className="text-xs text-gray-500 text-center hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-gray-300 mx-2 shrink-0"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Schnell & einfach</h3>
                <p className="text-gray-600">
                  Projekte in Minuten erstellen. Teilnehmer einladen. Abstimmungen in wenigen
                  Klicks.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold mb-2">Jede Stimme zählt</h3>
                <p className="text-gray-600">
                  Niemand wird überstimmt. Einsprüche ermöglichen konstruktive Diskussionen.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Transparent</h3>
                <p className="text-gray-600">
                  Alle Entscheidungen sind nachvollziehbar. Vollständige Historie inklusive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-2xl">📝</div>
                <div>
                  <h3 className="font-semibold mb-1">Projekt-Management</h3>
                  <p className="text-gray-600">
                    Organisiere mehrere Consent-Projekte parallel. Behalte den Überblick über alle
                    laufenden Abstimmungen.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🗳️</div>
                <div>
                  <h3 className="font-semibold mb-1">Abstimmungen</h3>
                  <p className="text-gray-600">
                    Stimme zu, lehne ab oder enthalte dich. Ergebnisse werden transparent angezeigt.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✋</div>
                <div>
                  <h3 className="font-semibold mb-1">Einspruch-Workflow</h3>
                  <p className="text-gray-600">
                    Bedenken einbringen, diskutieren und adressieren. Kein Blocking ohne Grund.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <h3 className="font-semibold mb-1">Diskussionen</h3>
                  <p className="text-gray-600">
                    Kommentare zu jeder Runde. Konstruktiver Austausch vor der Entscheidung.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔔</div>
                <div>
                  <h3 className="font-semibold mb-1">Benachrichtigungen</h3>
                  <p className="text-gray-600">
                    Microsoft Teams Integration für Echtzeit-Updates zu neuen Abstimmungen und
                    Einsprüchen.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold mb-1">Responsive</h3>
                  <p className="text-gray-600">
                    Zugriff von überall: Desktop, Tablet oder Smartphone. Funktioniert überall
                    gleich gut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">Preise</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Wähle den Plan, der zu dir passt. Alle Pläne inkludieren das vollständige
              Consent-Workflow-Erlebnis.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-6 ${
                    plan.highlighted
                      ? 'bg-primary text-white shadow-xl scale-105'
                      : 'bg-white shadow-sm'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span
                        className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}
                      >
                        {' '}
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className={plan.highlighted ? 'text-blue-200' : 'text-success'}>
                          ✓
                        </span>
                        <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗳️</span>
            <span className="font-semibold">adlix consent</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 adlix. Consent trifft Einfachheit.</p>
        </div>
      </footer>
    </div>
  )
}
