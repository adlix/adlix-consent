'use client'

/**
 * InfoRequestReplyPanel
 *
 * Shows the project owner all open B/C info-request abstentions for a round
 * and lets them write an answer. After answering, the requester gets notified
 * (Teams webhook) and can re-cast their vote.
 */

import { useState, useEffect } from 'react'
import { strapi } from '@/lib/strapi'

interface InfoRequest {
  id: number
  reason: 'B' | 'C'
  detail?: string
  answered: boolean
  ownerAnswer?: string
  answeredAt?: string
  user?: {
    id: number
    username?: string
    email?: string
  }
}

interface InfoRequestReplyPanelProps {
  roundId: number | string
  /** Is the current user the project owner? */
  isOwner: boolean
}

const REASON_LABELS: Record<'B' | 'C', { icon: string; label: string; color: string }> = {
  B: {
    icon: '📚',
    label: 'Mehr Informationen benötigt',
    color: 'border-orange-200 bg-orange-50',
  },
  C: {
    icon: '🤔',
    label: 'Klärungsbedarf',
    color: 'border-amber-200 bg-amber-50',
  },
}

export default function InfoRequestReplyPanel({ roundId, isOwner }: InfoRequestReplyPanelProps) {
  const [requests, setRequests] = useState<InfoRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitting, setSubmitting] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({})
  const [error, setError] = useState<Record<number, string>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const res = await strapi.getAbstentions(roundId)
        const all = (res.data as InfoRequest[]) || []
        // Only B and C reasons
        const bcRequests = all.filter((a) => a.reason === 'B' || a.reason === 'C')
        setRequests(bcRequests)
      } catch {
        // Silently fail — not critical
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [roundId])

  const handleAnswer = async (requestId: number) => {
    const answer = answers[requestId]?.trim()
    if (!answer) {
      setError((prev) => ({ ...prev, [requestId]: 'Bitte schreibe eine Antwort.' }))
      return
    }

    setSubmitting((prev) => ({ ...prev, [requestId]: true }))
    setError((prev) => ({ ...prev, [requestId]: '' }))

    try {
      await strapi.answerInfoRequest(requestId, answer)
      setSubmitted((prev) => ({ ...prev, [requestId]: true }))
      // Update local state
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? { ...r, answered: true, ownerAnswer: answer, answeredAt: new Date().toISOString() }
            : r
        )
      )
    } catch {
      setError((prev) => ({ ...prev, [requestId]: 'Antwort konnte nicht gespeichert werden.' }))
    } finally {
      setSubmitting((prev) => ({ ...prev, [requestId]: false }))
    }
  }

  if (loading) return null

  const openRequests = requests.filter((r) => !r.answered)
  const answeredRequests = requests.filter((r) => r.answered)

  if (requests.length === 0) return null

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-5 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl" aria-hidden="true">
          📬
        </span>
        <h3 className="font-bold text-gray-900 text-base">
          Info-Anfragen{' '}
          <span className="text-sm font-normal text-gray-500">
            ({openRequests.length} offen, {answeredRequests.length} beantwortet)
          </span>
        </h3>
      </div>

      <p className="text-sm text-gray-600">
        Teilnehmende haben Enthaltung mit Informationsbedarf gewählt. Deine Antwort ermöglicht
        ihnen, erneut abzustimmen.
      </p>

      {/* Open requests */}
      {openRequests.length > 0 && isOwner && (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
            Offene Anfragen
          </p>
          {openRequests.map((req) => {
            const meta = REASON_LABELS[req.reason]
            const requesterName = req.user?.username || req.user?.email || `Person #${req.id}`
            return (
              <div key={req.id} className={`rounded-xl border-2 ${meta.color} p-4 space-y-3`}>
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{meta.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">{meta.label}</span>
                  <span className="text-xs text-gray-500 ml-auto">von {requesterName}</span>
                </div>

                {req.detail && (
                  <blockquote className="border-l-4 border-orange-300 pl-3 text-sm text-gray-700 italic">
                    {req.detail}
                  </blockquote>
                )}

                <div>
                  <label
                    htmlFor={`answer-${req.id}`}
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Deine Antwort
                  </label>
                  <textarea
                    id={`answer-${req.id}`}
                    rows={3}
                    value={answers[req.id] || ''}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [req.id]: e.target.value }))}
                    placeholder="Beantworte die Anfrage so konkret wie möglich..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                  />
                  {error[req.id] && <p className="text-xs text-red-600 mt-1">{error[req.id]}</p>}
                </div>

                <button
                  onClick={() => handleAnswer(req.id)}
                  disabled={submitting[req.id] || submitted[req.id]}
                  className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting[req.id]
                    ? 'Wird gesendet...'
                    : submitted[req.id]
                      ? '✅ Gesendet'
                      : 'Antwort senden →'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Non-owner view of open requests */}
      {openRequests.length > 0 && !isOwner && (
        <div className="text-sm text-gray-600 bg-white/60 rounded-xl border border-orange-100 p-3">
          <span className="font-medium">{openRequests.length} Anfrage(n)</span> warten auf Antwort
          des Einreichers.
        </div>
      )}

      {/* Answered requests */}
      {answeredRequests.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Beantwortet
          </p>
          {answeredRequests.map((req) => {
            const meta = REASON_LABELS[req.reason]
            const requesterName = req.user?.username || req.user?.email || `Person #${req.id}`
            return (
              <div
                key={req.id}
                className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true">{meta.icon}</span>
                  <span className="font-medium text-gray-700">{meta.label}</span>
                  <span className="text-gray-400 text-xs ml-auto">von {requesterName}</span>
                </div>
                {req.detail && (
                  <p className="text-xs text-gray-600 italic border-l-2 border-green-300 pl-2">
                    {req.detail}
                  </p>
                )}
                {req.ownerAnswer && (
                  <div className="bg-white rounded-lg border border-green-200 px-3 py-2">
                    <p className="text-xs font-semibold text-green-700 mb-1">✅ Antwort</p>
                    <p className="text-sm text-gray-700">{req.ownerAnswer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
