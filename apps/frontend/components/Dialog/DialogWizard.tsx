'use client'

import { useState, useEffect, useCallback } from 'react'
import { strapi } from '@/lib/strapi'
import Phase1Understand from './Phase1Understand'
import Phase2Validate from './Phase2Validate'
import Phase3Solutions from './Phase3Solutions'
import Phase4Synthesize from './Phase4Synthesize'
import Phase5Present from './Phase5Present'
import Phase6Escalate from './Phase6Escalate'

interface Member {
  id: number
  username?: string
  email?: string
}

interface Beitrag {
  id: number
  type: 'idea' | 'question' | 'support' | 'passe'
  content?: string
  user?: { id: number; username?: string }
}

interface DialogPhase {
  id: number
  phaseNumber: number
  type: string
  status: string
  beitraege?: Beitrag[]
}

interface DialogData {
  id: number
  documentId: string
  currentPhase: number
  status: string
  phases: DialogPhase[]
  objection?: { id: number; reason: string; user?: { id: number; username?: string } }
  project?: { id: number; name: string }
}

interface DialogWizardProps {
  objectionId: number
  objectionReason: string
  objectorName: string
  projectId: number
  roundId: number
  originalProposal: string
  members: Member[]
  currentUserId: number
  jwt: string
  onComplete: () => void
  onEscalate: () => void
}

const PHASE_LABELS = [
  { num: 1, label: 'Verstehen', icon: '🔍', color: 'bg-blue-500' },
  { num: 2, label: 'Validieren', icon: '⚖️', color: 'bg-indigo-500' },
  { num: 3, label: 'Lösungen', icon: '💡', color: 'bg-amber-500' },
  { num: 4, label: 'Synthese', icon: '🔄', color: 'bg-violet-500' },
  { num: 5, label: 'Präsentation', icon: '📋', color: 'bg-teal-500' },
  { num: 6, label: 'Eskalation', icon: '🚨', color: 'bg-red-500' },
]

export default function DialogWizard({
  objectionId,
  objectionReason,
  objectorName,
  projectId,
  roundId,
  originalProposal,
  members,
  currentUserId,
  jwt,
  onComplete,
  onEscalate,
}: DialogWizardProps) {
  const [dialog, setDialog] = useState<DialogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adaptedProposal, setAdaptedProposal] = useState(originalProposal)

  const initDialog = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await strapi.getDialogByObjection(objectionId)
      const existing = (res.data as DialogData[])[0]
      if (existing) {
        setDialog(existing)
      } else {
        const created = await strapi.createDialog({ objection: objectionId, project: projectId })
        setDialog((created as { data: DialogData }).data)
      }
    } catch {
      setError('Dialog konnte nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }, [objectionId, projectId])

  useEffect(() => {
    strapi.setJwt(jwt)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initDialog()
  }, [jwt, initDialog])

  const advance = async () => {
    if (!dialog) return
    try {
      const res = await strapi.advanceDialog(dialog.documentId)
      setDialog((res as { data: DialogData }).data)
    } catch {
      setError('Phasen-Übergang fehlgeschlagen.')
    }
  }

  const addBeitrag = async (type: 'idea' | 'question' | 'support' | 'passe', content?: string) => {
    if (!dialog) return
    const currentPhase = dialog.phases.find((p) => p.phaseNumber === dialog.currentPhase)
    if (!currentPhase) return
    await strapi.createDialogBeitrag({ type, content, phase: currentPhase.id, user: currentUserId })
    const refreshed = await strapi.getDialog(dialog.documentId)
    setDialog((refreshed as { data: DialogData }).data)
  }

  const handleComplete = async () => {
    if (!dialog) return
    // Save adapted proposal back to the round
    if (adaptedProposal !== originalProposal) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        await fetch(`${apiUrl}/api/rounds/${roundId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
          },
          body: JSON.stringify({ data: { proposal: adaptedProposal } }),
        })
      } catch (_) {
        console.error('Failed to save adapted proposal')
      }
    }
    await strapi.completeDialog(dialog.documentId, 'completed')
    onComplete()
  }

  const handleEscalate = async (_option: string) => {
    if (!dialog) return
    await strapi.completeDialog(dialog.documentId, 'escalated')
    onEscalate()
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
        <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
        <p className="text-sm">Dialog wird geladen…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-center gap-3">
        <span className="text-lg">⚠️</span>
        <span className="flex-1">{error}</span>
        <button onClick={initDialog} className="text-red-700 underline font-medium shrink-0">
          Erneut versuchen
        </button>
      </div>
    )
  }

  if (!dialog) return null

  const currentPhaseNum = dialog.currentPhase
  const currentPhase = dialog.phases.find((p) => p.phaseNumber === currentPhaseNum)
  const beitraege = currentPhase?.beitraege || []

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-6 bg-white rounded-xl border shadow-sm p-4">
        <div className="flex justify-between mb-3">
          {PHASE_LABELS.map((p) => {
            const isDone = p.num < currentPhaseNum
            const isActive = p.num === currentPhaseNum
            return (
              <div
                key={p.num}
                className={`flex flex-col items-center text-center flex-1 transition-all ${
                  isDone ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 transition-all ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-700'
                      : isActive
                        ? `${p.color} text-white shadow-md scale-110`
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isDone ? '✓' : p.icon}
                </div>
                <span className="text-xs font-medium hidden sm:block">{p.label}</span>
              </div>
            )
          })}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out"
            style={{ width: `${((currentPhaseNum - 1) / 5) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Phase {currentPhaseNum} von 6 ·{' '}
          <span className="font-medium text-gray-600">
            {PHASE_LABELS[currentPhaseNum - 1]?.label}
          </span>
        </p>
      </div>

      {/* Phase content */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {currentPhaseNum === 1 && (
          <Phase1Understand
            objectionReason={objectionReason}
            onNext={async (_summary) => advance()}
          />
        )}

        {currentPhaseNum === 2 && (
          <Phase2Validate
            members={members}
            currentUserId={currentUserId}
            onNext={async (_result) => advance()}
          />
        )}

        {currentPhaseNum === 3 && (
          <Phase3Solutions
            phaseId={currentPhase?.id || 0}
            currentUserId={currentUserId}
            existingBeitraege={beitraege}
            totalMembers={members.length}
            onAddBeitrag={addBeitrag}
            onNext={advance}
          />
        )}

        {currentPhaseNum === 4 && (
          <Phase4Synthesize
            originalProposal={originalProposal}
            beitraege={dialog.phases.find((p) => p.phaseNumber === 3)?.beitraege || []}
            onNext={async (adapted) => {
              setAdaptedProposal(adapted)
              await advance()
            }}
          />
        )}

        {currentPhaseNum === 5 && (
          <Phase5Present
            originalProposal={originalProposal}
            adaptedProposal={adaptedProposal}
            objectorName={objectorName}
            onResolved={handleComplete}
            onNotResolved={advance}
          />
        )}

        {currentPhaseNum === 6 && <Phase6Escalate onEscalate={handleEscalate} />}
      </div>
    </div>
  )
}
