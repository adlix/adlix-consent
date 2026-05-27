'use client'

import { useState } from 'react'

export type ConsentChoice = 'consent' | 'minor_objection' | 'major_objection' | 'abstain'

interface Vote {
  id: number
  choice: ConsentChoice
  reason?: string
  user?: { id: number; username?: string }
}

interface ConsentVotePanelProps {
  /** Already cast votes (all participants) */
  votes: Vote[]
  /** Has the current user already voted? */
  userHasVoted: boolean
  /** Current user's id (for matching their vote) */
  currentUserId?: number
  /** Total participant count for "X of Y voted" display */
  participantCount: number
  /** Is a submission in progress? */
  submitting?: boolean
  /** Called when the user confirms a vote (non-abstain) */
  onVote: (choice: ConsentChoice, reason?: string) => void
  /** Called when user clicks Enthalten — triggers the abstain modal */
  onAbstain: () => void
  /** Called when user wants to change their existing vote */
  onChangeVote?: () => void
}

const CHOICES = [
  {
    key: 'consent' as ConsentChoice,
    emoji: '✅',
    label: 'Konsent',
    sublabel: 'Kein Einwand',
    description: 'Ich sehe kein schwerwiegendes Problem. Das Vorhaben kann so umgesetzt werden.',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-300',
    colorBorderHover: 'hover:border-emerald-400',
    colorSelected: 'border-emerald-500 bg-emerald-100 ring-2 ring-emerald-200',
    colorText: 'text-emerald-800',
    colorBadge: 'bg-emerald-100 text-emerald-700',
    colorButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
  {
    key: 'minor_objection' as ConsentChoice,
    emoji: '💛',
    label: 'Leichter Einwand',
    sublabel: 'Anmerkung',
    description:
      'Ich trage die Entscheidung mit, habe aber eine Anmerkung, die dokumentiert werden sollte.',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-300',
    colorBorderHover: 'hover:border-amber-400',
    colorSelected: 'border-amber-500 bg-amber-100 ring-2 ring-amber-200',
    colorText: 'text-amber-800',
    colorBadge: 'bg-amber-100 text-amber-700',
    colorButton: 'bg-amber-600 hover:bg-amber-700 text-white',
    requiresReason: false,
    reasonPlaceholder: 'Optionale Anmerkung — was möchtest du festhalten?',
  },
  {
    key: 'major_objection' as ConsentChoice,
    emoji: '🔴',
    label: 'Schwerwiegender Einwand',
    sublabel: 'Blocker',
    description: 'Dieser Einwand muss integriert werden, bevor das Vorhaben umgesetzt werden kann.',
    colorBg: 'bg-red-50',
    colorBorder: 'border-red-300',
    colorBorderHover: 'hover:border-red-400',
    colorSelected: 'border-red-500 bg-red-100 ring-2 ring-red-200',
    colorText: 'text-red-800',
    colorBadge: 'bg-red-100 text-red-700',
    colorButton: 'bg-red-600 hover:bg-red-700 text-white',
    requiresReason: true,
    reasonPlaceholder:
      'Bitte begründe deinen Einwand — bezogen auf das gemeinsame Ziel, nicht persönliche Präferenz.',
  },
  {
    key: 'abstain' as ConsentChoice,
    emoji: '⏸️',
    label: 'Enthalten',
    sublabel: 'Folgeprozess',
    description:
      'Enthaltung ist möglich, aber nicht als bequemer Ausweg. Du wirst nach dem Grund gefragt.',
    colorBg: 'bg-slate-50',
    colorBorder: 'border-slate-300',
    colorBorderHover: 'hover:border-slate-400',
    colorSelected: 'border-slate-500 bg-slate-100 ring-2 ring-slate-200',
    colorText: 'text-slate-700',
    colorBadge: 'bg-slate-100 text-slate-600',
    colorButton: 'bg-slate-600 hover:bg-slate-700 text-white',
  },
]

export default function ConsentVotePanel({
  votes,
  userHasVoted,
  currentUserId,
  participantCount,
  submitting,
  onVote,
  onAbstain,
  onChangeVote,
}: ConsentVotePanelProps) {
  const [selected, setSelected] = useState<ConsentChoice | null>(null)
  const [reason, setReason] = useState('')

  const selectedChoice = CHOICES.find((c) => c.key === selected)
  const canSubmit =
    selected !== null &&
    selected !== 'abstain' &&
    (selectedChoice?.requiresReason ? reason.trim().length > 0 : true)

  const handleSelect = (key: ConsentChoice) => {
    if (key === 'abstain') {
      onAbstain()
      return
    }
    setSelected(key)
    setReason('')
  }

  const handleConfirm = () => {
    if (!selected || selected === 'abstain') return
    onVote(selected, reason.trim() || undefined)
    setSelected(null)
    setReason('')
  }

  const votesCount = votes.length
  const remaining = Math.max(0, participantCount - votesCount)

  // --- Already voted state ---
  if (userHasVoted) {
    const myVote = currentUserId
      ? votes.find((v) => v.user?.id === currentUserId)
      : undefined
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-medium text-emerald-800 text-sm">Du hast abgestimmt.</p>
            {myVote?.reason && (
              <p className="text-xs text-emerald-600 mt-0.5">Begründung: {myVote.reason}</p>
            )}
          </div>
          {onChangeVote && (
            <button
              onClick={onChangeVote}
              className="ml-auto text-xs text-emerald-700 underline hover:text-emerald-900 shrink-0"
            >
              Ändern
            </button>
          )}
        </div>
        <VoteResults votes={votes} participantCount={participantCount} />
      </div>
    )
  }

  // --- Confirmation step (choice selected, not yet submitted) ---
  if (selected) {
    const choice = CHOICES.find((c) => c.key === selected)!
    return (
      <div className="space-y-4">
        {/* Selected card preview */}
        <div className={`p-4 rounded-xl border-2 ${choice.colorSelected} transition-all`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none mt-0.5">{choice.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-semibold text-base ${choice.colorText}`}>
                  {choice.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${choice.colorBadge}`}
                >
                  {choice.sublabel}
                </span>
              </div>
              <p className={`text-sm ${choice.colorText} opacity-80`}>{choice.description}</p>
            </div>
          </div>
        </div>

        {/* Reason field */}
        {'reasonPlaceholder' in choice && (
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${choice.colorText}`}>
              {choice.requiresReason ? 'Begründung (Pflichtfeld) *' : 'Begründung (optional)'}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={choice.reasonPlaceholder}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-shadow"
              autoFocus
            />
            {choice.requiresReason && !reason.trim() && (
              <p className="text-xs text-red-500 mt-1">
                Begründung ist bei einem schwerwiegenden Einwand erforderlich.
              </p>
            )}
          </div>
        )}

        {/* Consent validation hint for major objection */}
        {selected === 'major_objection' && reason.trim() && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
            <strong>Prüfung:</strong> Betrifft dein Einwand das gemeinsame Ziel (nicht persönliche
            Präferenz)? Basiert er auf konkreter Erfahrung oder einem realen Risiko? Ist er nicht
            sicher zum Scheitern verurteilt ohne ihn zu integrieren?
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!canSubmit || submitting}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${choice.colorButton}`}
          >
            {submitting ? 'Sende Abstimmung…' : `${choice.emoji} ${choice.label} bestätigen`}
          </button>
          <button
            onClick={() => {
              setSelected(null)
              setReason('')
            }}
            className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Zurück
          </button>
        </div>
      </div>
    )
  }

  // --- Initial vote selection ---
  return (
    <div className="space-y-4">
      {/* Reminder: waiting votes */}
      {remaining > 0 && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <span className="text-base">⏰</span>
          <span>
            <strong>{remaining}</strong> {remaining === 1 ? 'Person hat' : 'Personen haben'} noch
            nicht abgestimmt.
          </span>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Konsent bedeutet: <em>Niemand hat einen schwerwiegenden, begründeten Einwand.</em>
        Wähle deine Position:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CHOICES.map((choice) => (
          <button
            key={choice.key}
            onClick={() => handleSelect(choice.key)}
            className={`group text-left p-4 rounded-xl border-2 transition-all duration-150 ${choice.colorBg} ${choice.colorBorder} ${choice.colorBorderHover} hover:shadow-sm`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl leading-none shrink-0 group-hover:scale-110 transition-transform">
                {choice.emoji}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`font-semibold text-sm ${choice.colorText}`}>
                    {choice.label}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${choice.colorBadge}`}
                  >
                    {choice.sublabel}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{choice.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Vote results preview (while voting is open) */}
      {votes.length > 0 && <VoteResults votes={votes} participantCount={participantCount} />}
    </div>
  )
}

// ─── Vote Results sub-component ─────────────────────────────────────────────

function VoteResults({ votes, participantCount }: { votes: Vote[]; participantCount: number }) {
  const countFor = (c: ConsentChoice) => votes.filter((v) => v.choice === c).length
  const total = votes.length

  return (
    <div className="pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Bisherige Stimmen</h4>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {total} / {participantCount}
        </span>
      </div>

      {/* Bar per choice */}
      <div className="space-y-2 mb-4">
        {CHOICES.map(({ key, emoji, label, colorButton }) => {
          const count = countFor(key)
          const pct = participantCount > 0 ? (count / participantCount) * 100 : 0
          return (
            <div key={key} className="flex items-center gap-3 text-sm">
              <span className="text-base w-6 shrink-0 text-center">{emoji}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colorButton.split(' ')[0]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-4 text-right text-gray-600 font-medium shrink-0">{count}</span>
              <span className="text-gray-400 text-xs w-16 shrink-0">{label}</span>
            </div>
          )
        })}
      </div>

      {/* Individual votes with reasons */}
      {votes.filter((v) => v.reason).length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Begründungen</p>
          {votes
            .filter((v) => v.reason)
            .map((v) => {
              const c = CHOICES.find((ch) => ch.key === v.choice)
              return (
                <div key={v.id} className="flex items-start gap-2 text-xs">
                  <span>{c?.emoji}</span>
                  <span className="font-medium text-gray-600">{v.user?.username || 'Anonym'}:</span>
                  <span className="text-gray-500">{v.reason}</span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
