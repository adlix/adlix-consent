'use client'

import { useState, useEffect } from 'react'
import { strapi } from '../../lib/strapi'
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
  originalProposal: string
  members: Member[]
  currentUserId: number
  jwt: string
  onComplete: () => void
  onEscalate: () => void
}

const PHASE_LABELS = [
  { num: 1, label: 'Verstehen', icon: '🔍' },
  { num: 2, label: 'Validieren', icon: '⚖️' },
  { num: 3, label: 'Lösungen', icon: '💡' },
  { num: 4, label: 'Synthese', icon: '🔄' },
  { num: 5, label: 'Präsentation', icon: '📋' },
  { num: 6, label: 'Eskalation', icon: '🚨' },
]

export default function DialogWizard({
  objectionId,
  objectionReason,
  objectorName,
  projectId,
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

  useEffect(() => {
    strapi.setJwt(jwt)
    initDialog()
  }, [jwt])

  const initDialog = async () => {
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
    } catch (e) {
      setError('Dialog konnte nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }

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
    await strapi.completeDialog(dialog.documentId, 'completed')
    onComplete()
  }

  const handleEscalate = async (option: string) => {
    if (!dialog) return
    await strapi.completeDialog(dialog.documentId, 'escalated')
    onEscalate()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-500">
        <span className="animate-spin mr-2">⏳</span> Dialog wird geladen…
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
        {error}
        <button onClick={initDialog} className="ml-3 underline">Erneut versuchen</button>
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
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {PHASE_LABELS.map((p) => (
            <div
              key={p.num}
              className={`flex flex-col items-center text-center flex-1 ${
                p.num < currentPhaseNum
                  ? 'text-green-600'
                  : p.num === currentPhaseNum
                  ? 'text-blue-600'
                  : 'text-gray-300'
              }`}
            >
              <span className="text-lg">{p.num < currentPhaseNum ? '✅' : p.icon}</span>
              <span className="text-xs mt-1 hidden sm:block">{p.label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentPhaseNum - 1) / 5) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Phase {currentPhaseNum} von 6 · {PHASE_LABELS[currentPhaseNum - 1]?.label}
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

        {currentPhaseNum === 6 && (
          <Phase6Escalate onEscalate={handleEscalate} />
        )}
      </div>
    </div>
  )
}
