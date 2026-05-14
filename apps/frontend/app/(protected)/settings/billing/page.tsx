'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface Invoice {
  id: string
  number: string | null
  status: string
  amountPaid: number
  currency: string
  created: number
  pdfUrl: string | null
  periodStart: number
  periodEnd: number
}

interface Subscription {
  id: string
  status: string
  currentPeriodEnd: number
  cancelAtPeriodEnd: boolean
}

interface BillingData {
  plan: string
  customerId?: string
  subscription: Subscription | null
  invoices: Invoice[]
}

function BillingContent() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    fetchBilling()
  }, [])

  useEffect(() => {
    if (searchParams.get('success')) {
      // Refresh after successful checkout
      fetchBilling()
    }
  }, [searchParams])

  const fetchBilling = async () => {
    try {
      const res = await fetch('/api/billing/invoices')
      if (res.ok) {
        const billingData = await res.json()
        setData(billingData)
      } else {
        setError('Abrechnungsdaten konnten nicht geladen werden.')
      }
    } catch {
      setError('Verbindungsfehler.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    setCheckoutLoading(true)
    setError('')

    try {
      const res = await fetch('/api/billing/checkout', { method: 'POST' })
      if (res.ok) {
        const { url } = await res.json()
        if (url) {
          window.location.href = url
          return
        }
      }
      setError('Checkout konnte nicht gestartet werden.')
    } catch {
      setError('Verbindungsfehler.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleManage = async () => {
    if (!data?.customerId) return
    setCheckoutLoading(true)

    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: data.customerId }),
      })
      if (res.ok) {
        const { url } = await res.json()
        if (url) {
          window.location.href = url
          return
        }
      }
      setError('Billing-Portal nicht verfügbar.')
    } catch {
      setError('Verbindungsfehler.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'medium',
    }).format(new Date(timestamp * 1000))
  }

  const planLabel = data?.plan === 'pro' ? 'Pro' : 'Kostenlos'
  const planColor = data?.plan === 'pro' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-gray-400">Lädt…</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Abrechnung</h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {searchParams.get('success') && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          ✅ Zahlung erfolgreich! Dein Plan wird aktualisiert.
        </div>
      )}

      {searchParams.get('canceled') && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
          Zahlungsvorgang abgebrochen.
        </div>
      )}

      {/* Current plan */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Aktueller Plan</h2>
            <p className="text-sm text-gray-500 mt-1">
              {data?.plan === 'pro'
                ? 'Unbegrenzte Kreise, KI-Analyse, Prioritäts-Support'
                : '1 Kreis, 5 Vorhaben, Standard-Support'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${planColor}`}>
            {planLabel}
          </span>
        </div>

        {data?.plan !== 'pro' && (
          <button
            onClick={handleUpgrade}
            disabled={checkoutLoading}
            className="mt-4 w-full sm:w-auto py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {checkoutLoading ? 'Wird geladen…' : 'Auf Pro upgraden — 29€/Monat'}
          </button>
        )}

        {data?.subscription && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Abo läuft bis zum <strong>{formatDate(data.subscription.currentPeriodEnd)}</strong>
            </p>
            <button
              onClick={handleManage}
              disabled={checkoutLoading}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Abo verwalten oder kündigen →
            </button>
          </div>
        )}
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Rechnungen</h2>

        {!data?.invoices || data.invoices.length === 0 ? (
          <p className="text-gray-500 text-sm">Noch keine Rechnungen vorhanden.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-gray-600">Nr.</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-600">Datum</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-600">Betrag</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-2 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{inv.number || '—'}</td>
                    <td className="py-2 pr-4">{formatDate(inv.created)}</td>
                    <td className="py-2 pr-4">{formatAmount(inv.amountPaid, inv.currency)}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          inv.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : inv.status === 'open'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inv.status === 'paid'
                          ? 'Bezahlt'
                          : inv.status === 'open'
                            ? 'Offen'
                            : inv.status === 'void'
                              ? 'Storniert'
                              : inv.status}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      {inv.pdfUrl && (
                        <a
                          href={inv.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          PDF
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-400">Lädt…</div>
        </div>
      }
    >
      <BillingContent />
    </Suspense>
  )
}
