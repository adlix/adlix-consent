/**
 * Onboarding Steps
 * Schrittweiser Onboarding-Flow für neue Benutzer
 */
'use client'

import { useState } from 'react'
import { useOnboarding } from './OnboardingContext'

// Progress Bar
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Schritt {current + 1} von {total}
      </p>
    </div>
  )
}

// Welcome Step
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Willkommen bei adlix-consent</h1>
      <p className="text-gray-600 mb-8">
        Der Weg zu echter Entscheidungsfindung — mit Herz und Verstand.
      </p>
      <div className="space-y-4 text-left max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2">Was dich erwartet:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>✅ Kreise erstellen und verwalten</li>
          <li>✅ Vorhaben konsentbasiert entscheiden</li>
          <li>✅ Einwände integrieren, nicht bekämpfen</li>
          <li>✅ Gemeinsam wachsen</li>
        </ul>
      </div>
      <button
        onClick={onNext}
        className="mt-8 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Loslegen →
      </button>
    </div>
  )
}

// Profile Setup Step
function ProfileStep({ onNext }: { onNext: () => void }) {
  const { userData, setUserData } = useOnboarding()
  const [name, setName] = useState(userData.name)
  const [avatar, setAvatar] = useState(userData.avatar || '')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Bitte gib einen Namen ein')
      return
    }
    setUserData({ name: name.trim(), avatar })
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Über dich</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Dein Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wie heißt du?"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Avatar (optional)</label>
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">URL zu einem Bild</p>
      </div>

      <button
        type="submit"
        className="w-full px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Weiter →
      </button>
    </form>
  )
}

// Circle Setup Step
function CircleStep({ onNext }: { onNext: () => void }) {
  const { circleData, setCircleData } = useOnboarding()
  const [name, setName] = useState(circleData.name)
  const [description, setDescription] = useState(circleData.description || '')
  const [joinMode, setJoinMode] = useState<'create' | 'join'>('create')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (joinMode === 'create') {
      if (!name.trim()) {
        setError('Bitte gib einen Kreis-Namen ein')
        return
      }
      setCircleData({ name: name.trim(), description: description.trim() })
    } else {
      if (!inviteCode.trim()) {
        setError('Bitte gib einen Einladungscode ein')
        return
      }
      setCircleData({ name: '', inviteCode: inviteCode.trim() })
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Dein Kreis</h2>

      {/* Mode Toggle */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setJoinMode('create')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            joinMode === 'create' ? 'bg-white shadow text-green-600' : 'text-gray-600'
          }`}
        >
          Neuen Kreis erstellen
        </button>
        <button
          type="button"
          onClick={() => setJoinMode('join')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            joinMode === 'join' ? 'bg-white shadow text-green-600' : 'text-gray-600'
          }`}
        >
          Einladungscode
        </button>
      </div>

      {joinMode === 'create' ? (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Kreis-Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Die Problemlöser"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Beschreibung (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Worum geht es in diesem Kreis?"
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Einladungscode</label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="XYZ-ABC-123"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        {joinMode === 'create' ? 'Kreis erstellen' : 'Kreis beitreten'}
      </button>
    </form>
  )
}

// Complete Step
function CompleteStep({ onComplete }: { onComplete: () => void }) {
  const { userData, circleData } = useOnboarding()

  return (
    <div className="text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-4">Fast fertig!</h2>
      <p className="text-gray-600 mb-8">Wir richten jetzt deinen Circle ein...</p>

      <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto mb-8">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Kreis:</strong> {circleData.name || 'wird beigetreten'}
        </p>
      </div>

      <button
        onClick={onComplete}
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Zum Dashboard →
      </button>
    </div>
  )
}

// Main Onboarding Component
const STEPS = [WelcomeStep, ProfileStep, CircleStep, CompleteStep]

export function OnboardingFlow() {
  const { step, setStep, completeOnboarding } = useOnboarding()
  const totalSteps = STEPS.length

  const CurrentStep = STEPS[step]

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    }
  }

  const handleComplete = async () => {
    completeOnboarding()
    // API call to complete onboarding would go here
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <ProgressBar current={step} total={totalSteps} />
      <CurrentStep onNext={handleNext} onComplete={handleComplete} />
    </div>
  )
}

export { ProgressBar, WelcomeStep, ProfileStep, CircleStep, CompleteStep }
