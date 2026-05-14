'use client'

import { useState } from 'react'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'dauerhaft',
    description: 'Für kleine Gruppen und Projekte',
    features: ['Bis 3 Consent-Projekte', 'Bis 50 Teilnehmer', 'Grundlegende Abstimmung'],
    cta: 'Kostenlos starten',
    highlighted: false,
    action: 'free' as const,
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
    action: 'pro' as const,
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
    action: 'enterprise' as const,
  },
]

export function PricingSection() {
  const [proLoading, setProLoading] = useState(false)
  const [proError, setProError] = useState('')

  const handleProCheckout = async () => {
    setProError('')
    setProLoading(true)

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        redirect: 'manual',
      })

      if (res.status === 401 || res.status === 0 || res.type === 'opaqueredirect') {
        // Nicht eingeloggt → zur Registrierung mit plan=pro
        window.location.href = '/register?plan=pro'
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setProError(data.error || 'Checkout konnte nicht gestartet werden.')
        return
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      }
    } catch {
      setProError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setProLoading(false)
    }
  }

  return (
    <section id="pricing" className="bg-gray-50 py-16" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-4">
          Preise
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Wähle den Plan, der zu dir passt. Alle Pläne inkludieren das vollständige
          Consent-Workflow-Erlebnis.
        </p>

        {proError && <p className="text-center text-sm text-red-600 mb-6">{proError}</p>}

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
                    <span
                      className={plan.highlighted ? 'text-blue-200' : 'text-success'}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.action === 'free' && (
                <Link
                  href="/register"
                  className={`block w-full py-2 px-4 rounded-lg font-medium text-center transition-colors bg-primary text-white hover:bg-primary-dark`}
                  aria-label={`${plan.cta} — Plan: ${plan.name}`}
                >
                  {plan.cta}
                </Link>
              )}

              {plan.action === 'pro' && (
                <button
                  type="button"
                  onClick={handleProCheckout}
                  disabled={proLoading}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-white text-primary hover:bg-gray-100 disabled:opacity-60"
                  aria-label={`${plan.cta} — Plan: ${plan.name}`}
                >
                  {proLoading ? 'Wird gestartet…' : plan.cta}
                </button>
              )}

              {plan.action === 'enterprise' && (
                <a
                  href="mailto:hello@adlix.de?subject=Enterprise-Anfrage"
                  className={`block w-full py-2 px-4 rounded-lg font-medium text-center transition-colors bg-primary text-white hover:bg-primary-dark`}
                  aria-label={`${plan.cta} — Plan: ${plan.name}`}
                >
                  {plan.cta}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
