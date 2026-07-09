'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { strapi } from '@/lib/strapi'

type AbstainReason = 'A' | 'B' | 'C' | 'D' | 'E'

interface AbstainReasonModalProps {
  roundId: number
  onSubmit: (data: {
    reason: AbstainReason
    detail?: string
    isObjection?: boolean
    objectionSeverity?: 'minor' | 'major'
  }) => void
  onCancel: () => void
}

const reasons: {
  key: AbstainReason
  label: string
  description: string
  icon: string
  color: string
  bg: string
}[] = [
  {
    key: 'A',
    label: 'Nicht betroffen',
    description: 'Ich bin nicht betroffen oder habe keine Expertise.',
    icon: '🤷',
    color: 'text-gray-700',
    bg: 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300',
  },
  {
    key: 'B',
    label: 'Mehr Infos nötig',
    description: 'Ich brauche mehr Informationen, um mich entscheiden zu können.',
    icon: '📚',
    color: 'text-blue-700',
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300',
  },
  {
    key: 'C',
    label: 'Unklar',
    description: 'Mir ist ein Teil des Vorhabens unklar.',
    icon: '🤔',
    color: 'text-amber-700',
    bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300',
  },
  {
    key: 'D',
    label: 'Anonyme Bedenken',
    description: 'Ich habe Bedenken, möchte sie aber nicht öffentlich äußern.',
    icon: '🔒',
    color: 'text-amber-800',
    bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300',
  },
  {
    key: 'E',
    label: 'Will mich nicht festlegen',
    description: 'Ich möchte mich nicht festlegen.',
    icon: '⏸️',
    color: 'text-purple-700',
    bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300',
  },
]

const reflexionQuestions = [
  'Gibt es einen Teil des Vorhabens, der dir Bauchschmerzen bereitet?',
  'Würde das Vorhaben irgendjemanden betreffen, den du kennst — und wie?',
  'Was bräuchtest du, um wirklich Konsent geben zu können?',
]

export default function AbstainReasonModal({
  roundId,
  onSubmit,
  onCancel,
}: AbstainReasonModalProps) {
  const { data: session } = useSession()
  const [step, setStep] = useState<'reason' | 'detail' | 'reflexion' | 'confirm'>('reason')
  const [selectedReason, setSelectedReason] = useState<AbstainReason | null>(null)
  const [detail, setDetail] = useState('')
  const [reflexionAnswers, setReflexionAnswers] = useState<string[]>(['', '', ''])
  const [finalChoice, setFinalChoice] = useState<
    'abstain' | 'minor' | 'major' | 'anonymous' | null
  >(null)
  const [submitting, setSubmitting] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const reasonConfig = reasons.find((r) => r.key === selectedReason)

  const saveAbstention = async (data: {
    reason: AbstainReason
    detail?: string
    finalChoice?: string
    reflexionAnswers?: string[]
    anonymousConcern?: string
  }) => {
    strapi.setJwt(jwt || null)
    try {
      await strapi.createAbstention({
        reason: data.reason,
        detail: data.detail,
        finalChoice: data.finalChoice,
        reflexionAnswers: data.reflexionAnswers,
        anonymousConcern: data.anonymousConcern,
        round: roundId,
        user: Number(session?.user?.id),
      })
    } catch (err) {
      console.error('Failed to save abstention:', err)
    }
  }

  const handleReasonSelect = (key: AbstainReason) => {
    setSelectedReason(key)
    setDetail('')
    setFinalChoice(null)
    // Reason A goes straight to confirm; B/C/D need detail; E needs reflexion
    if (key === 'A') {
      setStep('confirm')
    } else if (key === 'E') {
      setStep('reflexion')
    } else {
      setStep('detail')
    }
  }

  const handleSubmit = async () => {
    if (!selectedReason) return
    setSubmitting(true)

    // Reason D: anonymous concerns are a form of major objection — user couldn't openly object
    const isObjection = finalChoice === 'minor' || finalChoice === 'major' || selectedReason === 'D'
    const finalChoiceValue =
      finalChoice === 'abstain'
        ? 'abstain'
        : finalChoice === 'minor'
          ? 'minor_objection'
          : finalChoice === 'major'
            ? 'major_objection'
            : finalChoice === 'anonymous'
              ? 'anonymous'
              : selectedReason === 'D'
                ? 'major_objection'
                : undefined

    await saveAbstention({
      reason: selectedReason,
      detail: detail.trim() || undefined,
      finalChoice: finalChoiceValue,
      reflexionAnswers: reflexionAnswers.some((a) => a.trim()) ? reflexionAnswers : undefined,
      anonymousConcern:
        finalChoice === 'anonymous' || selectedReason === 'D' ? detail.trim() || undefined : undefined,
    })

    setSubmitting(false)
    onSubmit({
      reason: selectedReason,
      detail: detail.trim() || undefined,
      isObjection,
      objectionSeverity:
        finalChoice === 'major' || selectedReason === 'D'
          ? 'major'
          : finalChoice === 'minor'
            ? 'minor'
            : undefined,
    })
  }

  const handleCancel = () => {
    setStep('reason')
    setSelectedReason(null)
    setDetail('')
    setReflexionAnswers(['', '', ''])
    setFinalChoice(null)
    onCancel()
  }

  const backLabel = step === 'detail' ? 'Zurück' : 'Nochmal wählen'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="abstain-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h3 id="abstain-modal-title" className="text-lg font-semibold text-gray-900">
              {step === 'reason'
                ? 'Warum enthältst du dich?'
                : step === 'detail'
                  ? `${reasonConfig?.icon} ${reasonConfig?.label}`
                  : step === 'reflexion'
                    ? '💭 Selbstreflexion'
                    : 'Bestätigung'}
            </h3>
            {step !== 'reason' && selectedReason && (
              <p className="text-sm text-gray-500 mt-0.5">
                {step === 'confirm' && 'Überprüfe deine Eingabe'}
                {step === 'reflexion' && 'Optionale Reflexion vor deiner Entscheidung'}
                {step === 'detail' && reasonConfig?.description}
              </p>
            )}
          </div>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors shrink-0 ml-4"
            aria-label="Modal schließen"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* ── Step 1: Reason selection ─────────────────────────────── */}
          {step === 'reason' && (
            <>
              <p className="text-sm text-gray-500 mb-5">
                In der Soziokratie ist Enthaltung kein bequemer Ausweg. Bitte gib einen Grund an.
              </p>
              <div className="space-y-2">
                {reasons.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => handleReasonSelect(r.key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${r.bg}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none mt-0.5 shrink-0">{r.icon}</span>
                      <div>
                        <div className={`font-semibold ${r.color}`}>
                          {r.key} — {r.label}
                        </div>
                        <div className={`text-sm mt-0.5 ${r.color} opacity-75`}>
                          {r.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Step 2: Detail (Reason B/C/D) ──────────────────────── */}
          {step === 'detail' && selectedReason && (
            <>
              {/* Reason B/C */}
              {(selectedReason === 'B' || selectedReason === 'C') && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-xl ${reasonConfig?.bg} border ${reasonConfig?.color.replace('text-', 'border-').replace('-700', '-200').replace('-800', '-200')}`}
                  >
                    <p className={`text-sm ${reasonConfig?.color}`}>
                      Formuliere konkret,{' '}
                      <strong>welche {selectedReason === 'B' ? 'Informationen' : 'Klärung'}</strong>{' '}
                      du brauchst:
                    </p>
                  </div>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    placeholder={
                      selectedReason === 'B'
                        ? 'Beispiel: Ich brauche Infos zur Kostenaufstellung und zur Zeitplanung...'
                        : 'Beispiel: Mir ist nicht klar, wie die Übergabe an das Kernteam funktioniert...'
                    }
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={!detail.trim() || submitting}
                      className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? 'Sende…' : 'Anfrage senden →'}
                    </button>
                    <button
                      onClick={() => {
                        setStep('reason')
                        setSelectedReason(null)
                      }}
                      className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      {backLabel}
                    </button>
                  </div>
                </div>
              )}

              {/* Reason D — anonymous concerns */}
              {selectedReason === 'D' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                    <span className="text-amber-600 text-sm mt-0.5">🔒</span>
                    <p className="text-sm text-amber-800">
                      Deine Bedenken werden <strong>vollständig anonym</strong> an die
                      Kreiskoordination übermittelt. Kein Rückschluss auf dich als Person.
                    </p>
                  </div>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full p-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none text-sm bg-amber-50"
                    rows={4}
                    placeholder="Was bereitet dir Bedenken? Beschreibe es so neutral wie möglich..."
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={!detail.trim() || submitting}
                      className="px-5 py-2.5 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? 'Sende anonym…' : '🔒 Anonym einreichen'}
                    </button>
                    <button
                      onClick={() => {
                        setStep('reason')
                        setSelectedReason(null)
                      }}
                      className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      {backLabel}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Step 3: Reflexion (Reason E) ───────────────────────── */}
          {step === 'reflexion' && selectedReason === 'E' && (
            <>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl mb-5">
                <p className="text-sm text-purple-800">
                  <strong>💡 Soziokratischer Hinweis:</strong> In der Soziokratie trägt jede
                  beteiligte Person Mitverantwortung für Entscheidungen. Enthaltung ohne Grund
                  bedeutet: Du hast keinen Einwand. Hast du vielleicht doch einen — auch einen
                  kleinen?
                </p>
              </div>

              <div className="space-y-4">
                {reflexionQuestions.map((q, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-purple-800 mb-1.5">{q}</label>
                    <textarea
                      value={reflexionAnswers[i]}
                      onChange={(e) => {
                        const a = [...reflexionAnswers]
                        a[i] = e.target.value
                        setReflexionAnswers(a)
                      }}
                      className="w-full p-2.5 border border-purple-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      rows={2}
                      placeholder="Deine Gedanken..."
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Was möchtest du nach der Reflexion tun?
                </p>
                {[
                  {
                    key: 'abstain' as const,
                    label: '⏸️ Enthalten bleiben',
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    color: 'text-gray-700',
                  },
                  {
                    key: 'minor' as const,
                    label: '💛 Leichten Einwand erheben',
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    color: 'text-yellow-700',
                  },
                  {
                    key: 'major' as const,
                    label: '🔴 Schwerwiegenden Einwand erheben',
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    color: 'text-red-700',
                  },
                  {
                    key: 'anonymous' as const,
                    label: '🔒 Anonym Bedenken äußern',
                    bg: 'bg-amber-50',
                    border: 'border-amber-200',
                    color: 'text-amber-700',
                  },
                ].map(({ key, label, bg, border, color }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setFinalChoice(key)
                      setStep('confirm')
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl border ${bg} ${border} hover:shadow-sm transition-all text-sm ${color}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex">
                <button
                  onClick={() => {
                    setStep('reason')
                    setSelectedReason(null)
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← {backLabel}
                </button>
              </div>
            </>
          )}

          {/* ── Step 4: Confirm (Reason A or after reflexion E) ───── */}
          {step === 'confirm' && selectedReason && (
            <>
              <div
                className={`p-4 rounded-xl ${reasonConfig?.bg} border ${reasonConfig?.color.replace('text-', 'border-').replace('-700', '-200').replace('-800', '-200')} mb-4`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{reasonConfig?.icon}</span>
                  <div>
                    <p className={`font-semibold ${reasonConfig?.color}`}>{reasonConfig?.label}</p>
                    <p className={`text-sm ${reasonConfig?.color} opacity-75`}>
                      {reasonConfig?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason E + final choice confirmation */}
              {selectedReason === 'E' && finalChoice && (
                <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  {finalChoice === 'abstain' && (
                    <p className="text-sm text-gray-600">
                      Deine Enthaltung wird gespeichert. Sie ist kein Blocker.
                    </p>
                  )}
                  {finalChoice === 'minor' && (
                    <p className="text-sm text-yellow-700">
                      💛 Du gibst einen <strong>leichten Einwand</strong> ab — mit Anmerkung.
                    </p>
                  )}
                  {finalChoice === 'major' && (
                    <p className="text-sm text-red-700">
                      🔴 Du gibst einen <strong>schwerwiegenden Einwand</strong> ab — muss
                      integriert werden.
                    </p>
                  )}
                  {finalChoice === 'anonymous' && (
                    <div>
                      <p className="text-sm text-amber-700 mb-2">
                        🔒 Dein anonymer Beitrag wird übermittelt:
                      </p>
                      <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className="w-full p-2.5 border border-amber-200 rounded-lg text-sm resize-none bg-amber-50 focus:ring-2 focus:ring-amber-400"
                        rows={3}
                        placeholder="Deine anonymen Bedenken..."
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Consent validation hint for major objection */}
              {finalChoice === 'major' && detail.trim() && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                  <strong>Prüfung vor dem Absenden:</strong> Betrifft dein Einwand das gemeinsame
                  Ziel (nicht persönliche Präferenz)? Basiert er auf konkreter Erfahrung oder einem
                  realen Risiko? Ist er nicht sicher zum Scheitern verurteilt ohne ihn zu
                  integrieren?
                </div>
              )}

              {/* Reason E with major objection needs a reason */}
              {selectedReason === 'E' && finalChoice === 'major' && !detail.trim() && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-red-700 mb-1.5">
                    Begründung (Pflichtfeld) *
                  </label>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full p-3 border border-red-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-red-400 bg-red-50"
                    rows={3}
                    placeholder="Bitte begründe deinen schwerwiegenden Einwand — bezogen auf das gemeinsame Ziel..."
                  />
                  <p className="text-xs text-red-500 mt-1">
                    Ein schwerwiegender Einwand muss begründet sein.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={
                    submitting ||
                    (selectedReason === 'E' && finalChoice === 'major' && !detail.trim()) ||
                    (selectedReason === 'E' && finalChoice === 'anonymous' && !detail.trim())
                  }
                  className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Speichere…' : 'Bestätigen ✓'}
                </button>
                <button
                  onClick={() => {
                    if (selectedReason === 'E') {
                      setStep('reflexion')
                      setFinalChoice(null)
                    } else {
                      setStep('reason')
                      setSelectedReason(null)
                    }
                  }}
                  className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  ← {backLabel}
                </button>
              </div>
            </>
          )}

          {/* ── Global cancel ──────────────────────────────────────── */}
          <button
            onClick={handleCancel}
            className="mt-5 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  )
}
