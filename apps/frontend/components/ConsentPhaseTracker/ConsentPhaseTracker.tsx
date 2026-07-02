'use client'

import { useMemo } from 'react'

interface Vote {
  id: number
  choice: 'consent' | 'minor_objection' | 'major_objection' | 'abstain'
  user?: { id: number; username?: string }
}

interface Objection {
  id: number
  reason: string
  severity: string
  status: string
  user?: { id: number; username?: string }
}

interface Phase {
  key: string
  label: string
  icon: string
  description: string
}

interface ConsentPhaseTrackerProps {
  currentPhase: string
  phases: Phase[]
  votes: Vote[]
  objections: Objection[]
  participantCount: number
  className?: string
}

const PHASE_COLORS: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  information: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    ring: 'ring-indigo-200',
    dot: 'bg-indigo-500',
  },
  reaction: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    ring: 'ring-purple-200',
    dot: 'bg-purple-500',
  },
  adjustment: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    dot: 'bg-amber-500',
  },
  voting: { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'ring-blue-200', dot: 'bg-blue-500' },
  integration: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    ring: 'ring-orange-200',
    dot: 'bg-orange-500',
  },
  completed: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    ring: 'ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  default: { bg: 'bg-gray-100', text: 'text-gray-700', ring: 'ring-gray-200', dot: 'bg-gray-400' },
}

const VOTE_ICONS: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  consent: { icon: '✅', label: 'Konsent', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  minor_objection: { icon: '💛', label: 'Anmerkung', color: 'text-amber-700', bg: 'bg-amber-50' },
  major_objection: { icon: '🔴', label: 'Einwand', color: 'text-red-700', bg: 'bg-red-50' },
  abstain: { icon: '⏸️', label: 'Enthaltung', color: 'text-gray-700', bg: 'bg-gray-50' },
}

function getPhaseColor(phase: string) {
  return PHASE_COLORS[phase] ?? PHASE_COLORS['default']
}

export default function ConsentPhaseTracker({
  currentPhase,
  phases,
  votes,
  objections,
  participantCount,
  className = '',
}: ConsentPhaseTrackerProps) {
  const phaseOrder = phases.map((p) => p.key)
  const currentIndex = phaseOrder.indexOf(currentPhase)

  // ── Vote breakdown ───────────────────────────────────────────────────
  const voteBreakdown = useMemo(() => {
    const counts = { consent: 0, minor_objection: 0, major_objection: 0, abstain: 0 }
    votes.forEach((v) => {
      if (v.choice in counts) counts[v.choice as keyof typeof counts]++
    })
    return counts
  }, [votes])

  const votedCount = votes.length
  const remaining = Math.max(0, participantCount - votedCount)
  const majorOpen = objections.filter((o) => o.severity === 'major' && o.status === 'open').length

  // ── Consensus gauge (0–100) ─────────────────────────────────────────
  const consensusPct =
    participantCount > 0 ? Math.round((voteBreakdown.consent / participantCount) * 100) : 0

  const gaugeColor =
    consensusPct >= 80
      ? 'bg-emerald-500'
      : consensusPct >= 50
        ? 'bg-amber-400'
        : consensusPct >= 1
          ? 'bg-red-400'
          : 'bg-gray-300'

  const gaugeTextColor =
    consensusPct >= 80
      ? 'text-emerald-600'
      : consensusPct >= 50
        ? 'text-amber-600'
        : consensusPct >= 1
          ? 'text-red-600'
          : 'text-gray-500'

  return (
    <div className={`space-y-5 ${className}`}>
      {/* ── Phase Timeline ─────────────────────────────────────────── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span aria-hidden="true">🗺️</span> Consent-Prozess
        </h3>

        {/* Horizontal scrollable timeline */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1">
          {phases.map((phase, idx) => {
            const isCompleted = idx < currentIndex
            const isActive = idx === currentIndex
            const isPending = idx > currentIndex
            const colors = getPhaseColor(phase.key)

            return (
              <div key={phase.key} className="flex items-center min-w-0">
                {/* Node */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center text-base mb-1 shrink-0
                      transition-all duration-400
                      ${isCompleted ? `${colors.bg} ${colors.dot} shadow-sm` : ''}
                      ${isActive ? `${colors.bg} ${colors.dot} ring-4 ${colors.ring} shadow-md scale-110` : ''}
                      ${isPending ? 'bg-gray-100 text-gray-300' : ''}
                    `}
                    title={phase.label}
                    aria-label={phase.label}
                  >
                    {isCompleted ? '✓' : phase.icon}
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight whitespace-nowrap ${
                      isActive ? colors.text : isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>

                {/* Connector */}
                {idx < phases.length - 1 && (
                  <div
                    className={`h-0.5 w-4 sm:w-6 mx-0.5 shrink-0 transition-colors duration-300 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-gray-200'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Active phase description */}
        {phases[currentIndex] && (
          <p className="mt-2 text-xs text-gray-500 italic">
            {phases[currentIndex].icon} {phases[currentIndex].description}
          </p>
        )}
      </div>

      {/* ── Voting Summary Card ─────────────────────────────────────── */}
      {votes.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span aria-hidden="true">🗳️</span> Abstimmungsstand
            </h4>
            <span className="text-xs text-gray-400">
              {votedCount}/{participantCount} abgestimmt
              {remaining > 0 ? ` · ${remaining} ausstehend` : ''}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${participantCount > 0 ? Math.round((votedCount / participantCount) * 100) : 0}%`,
                  backgroundColor:
                    consensusPct >= 80 ? '#10b981' : consensusPct >= 50 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
          </div>

          {/* Consensus gauge */}
          <div className="mb-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Konsent-Score</span>
                <span className={`text-sm font-bold ${gaugeTextColor}`}>{consensusPct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${gaugeColor}`}
                  style={{ width: `${Math.max(consensusPct, 5)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Vote breakdown chips */}
          <div className="flex flex-wrap gap-2">
            {(Object.entries(voteBreakdown) as [string, number][]).map(([choice, count]) => {
              if (count === 0) return null
              const config = VOTE_ICONS[choice]
              return (
                <div
                  key={choice}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
                >
                  <span aria-hidden="true">{config.icon}</span>
                  <span>
                    {count}× {config.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Major objection alert */}
          {majorOpen > 0 && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <span className="text-red-500 text-base shrink-0 mt-0.5">🚨</span>
              <div>
                <p className="text-xs font-semibold text-red-700">
                  {majorOpen} schwerwiegender{majorOpen > 1 ? 'e' : ''} Einwand
                  {majorOpen > 1 ? 'wände' : ''} offen
                </p>
                <p className="text-xs text-red-600 mt-0.5">
                  Dialog zur Lösungsfindung erforderlich.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── What happens next ──────────────────────────────────────── */}
      {votes.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">
            🔔 Abstimmung noch nicht gestartet — die erste Runde wird vorbereitet.
          </p>
        </div>
      )}
    </div>
  )
}
