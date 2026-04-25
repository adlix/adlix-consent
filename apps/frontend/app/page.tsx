import type { Metadata } from 'next'
import Link from 'next/link'

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
      <header className="border-b border-gray-200" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🗳️</span>
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold mb-6">
            Entscheidungen mit
            <span className="text-primary"> Consent </span>
            treffen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Fair. Transparent. Inklusiv. adlix consent macht es einfach, gemeinsam zu entscheiden —
            ohne Hierarchien, mit Stimme für alle.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
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
        <section className="bg-gray-50 py-16" aria-labelledby="how-it-works-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-center mb-4">So funktioniert&apos;s</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Der Consent-Prozess: Beschreibung → Abstimmung → Einspruch → Diskussion → Anpassung →
              Neuer Loop
            </p>

            {/* Flow Visualization */}
            <ol aria-label="Consent-Prozess Schritte" className="flex items-center justify-between gap-2 overflow-x-auto pb-4 list-none">
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
                    <div className="w-8 sm:w-16 h-0.5 bg-gray-300 mx-2 shrink-0" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Schnell & einfach</h3>
                <p className="text-gray-600">
                  Projekte in Minuten erstellen. Teilnehmer einladen. Abstimmungen in wenigen
                  Klicks.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">🤝</div>
                <h3 className="text-lg font-semibold mb-2">Jede Stimme zählt</h3>
                <p className="text-gray-600">
                  Niemand wird überstimmt. Einsprüche ermöglichen konstruktive Diskussionen.
                </p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4" aria-hidden="true">📊</div>
                <h3 className="text-lg font-semibold mb-2">Transparent</h3>
                <p className="text-gray-600">
                  Alle Entscheidungen sind nachvollziehbar. Vollständige Historie inklusive.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: '📝', title: 'Projekt-Management', text: 'Organisiere mehrere Consent-Projekte parallel. Behalte den Überblick über alle laufenden Abstimmungen.' },
                { icon: '🗳️', title: 'Abstimmungen', text: 'Stimme zu, lehne ab oder enthalte dich. Ergebnisse werden transparent angezeigt.' },
                { icon: '✋', title: 'Einspruch-Workflow', text: 'Bedenken einbringen, diskutieren und adressieren. Kein Blocking ohne Grund.' },
                { icon: '💬', title: 'Diskussionen', text: 'Kommentare zu jeder Runde. Konstruktiver Austausch vor der Entscheidung.' },
                { icon: '🔔', title: 'Benachrichtigungen', text: 'Microsoft Teams Integration für Echtzeit-Updates zu neuen Abstimmungen und Einsprüchen.' },
                { icon: '📱', title: 'Responsive', text: 'Zugriff von überall: Desktop, Tablet oder Smartphone. Funktioniert überall gleich gut.' },
              ].map(({ icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="text-2xl shrink-0" aria-hidden="true">{icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-gray-50 py-16" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-4">Preise</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Wähle den Plan, der zu dir passt. Alle Pläne inkludieren das vollständige
              Consent-Workflow-Erlebnis.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  aria-label={`Plan: ${plan.name}`}
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
                  <ul className="space-y-3 mb-6" aria-label={`Features im ${plan.name}-Plan`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className={plan.highlighted ? 'text-blue-200' : 'text-success'} aria-hidden="true">
                          ✓
                        </span>
                        <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                    aria-label={`${plan.cta} — Plan: ${plan.name}`}
                  >
                    {plan.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🗳️</span>
            <span className="font-semibold">adlix consent</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 adlix. Consent trifft Einfachheit.</p>
        </div>
      </footer>
    </div>
  )
}
