'use client'

import { useState } from 'react'

interface Member {
  id: number
  username?: string
  email?: string
}

interface Phase2Props {
  members: Member[]
  currentUserId: number
  onNext: (result: 'sachlich' | 'praeferenz') => void
}

type Vote = 'sachlich' | 'praeferenz' | null

export default function Phase2Validate({ members, currentUserId, onNext }: Phase2Props) {
  const [votes, setVotes] = useState<Record<number, Vote>>({})
  const [myVote, setMyVote] = useState<Vote>(null)

  const handleVote = (vote: Vote) => {
    setMyVote(vote)
    setVotes((prev) => ({ ...prev, [currentUserId]: vote }))
  }

  const sachlichCount = Object.values(votes).filter((v) => v === 'sachlich').length
  const praeferenzCount = Object.values(votes).filter((v) => v === 'praeferenz').length
  const totalVoted = sachlichCount + praeferenzCount
  const allVoted = totalVoted === members.length

  const handleAdvance = async () => {
    const result = majority || 'sachlich'
    await onNext(result)
  }

  const majority =
    totalVoted > 0
      ? sachlichCount > praeferenzCount
        ? 'sachlich'
        : praeferenzCount > sachlichCount
          ? 'praeferenz'
          : null
      : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Einwand validieren</h3>
        <p className="text-sm text-gray-600">
          Ist dies ein sachlicher Einwand (betrifft das Vorhaben objektiv) oder eine Präferenz
          (persönlicher Wunsch)?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleVote('sachlich')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            myVote === 'sachlich'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-xl mb-1">🎯</p>
          <p className="font-medium">Sachlicher Einwand</p>
          <p className="text-xs text-gray-500 mt-1">Betrifft objektive Wirkung des Vorhabens</p>
        </button>

        <button
          onClick={() => handleVote('praeferenz')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            myVote === 'praeferenz'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-orange-300'
          }`}
        >
          <p className="text-xl mb-1">💭</p>
          <p className="font-medium">Präferenz</p>
          <p className="text-xs text-gray-500 mt-1">Persönlicher Wunsch ohne objektiven Schaden</p>
        </button>
      </div>

      {/* Member participation */}
      <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Teilnehmer-Status ({totalVoted}/{members.length})
        </p>
        <div className="space-y-1.5">
          {members.map((member) => {
            const vote = votes[member.id]
            const isMe = member.id === currentUserId
            return (
              <div key={member.id} className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    vote === 'sachlich'
                      ? 'bg-blue-100 text-blue-700'
                      : vote === 'praeferenz'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {vote === 'sachlich' ? '🎯' : vote === 'praeferenz' ? '💭' : '○'}
                </div>
                <span
                  className={`text-sm ${isMe ? 'font-semibold text-gray-800' : 'text-gray-600'}`}
                >
                  {member.username || member.email || `User ${member.id}`}
                  {isMe ? ' (du)' : ''}
                </span>
                {vote && (
                  <span
                    className={`text-xs ml-auto px-2 py-0.5 rounded-full font-medium ${
                      vote === 'sachlich'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {vote === 'sachlich' ? 'Sachlich' : 'Präferenz'}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {totalVoted > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium mb-3">
            Zwischenergebnis ({totalVoted} Stimme{totalVoted !== 1 ? 'n' : ''})
          </p>
          <div className="flex gap-4 text-sm">
            <span className="text-blue-700">🎯 Sachlich: {sachlichCount}</span>
            <span className="text-orange-700">💭 Präferenz: {praeferenzCount}</span>
          </div>
          {majority && (
            <div
              className={`mt-3 p-3 rounded-lg text-sm font-medium ${
                majority === 'sachlich'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-orange-100 text-orange-800'
              }`}
            >
              {majority === 'sachlich'
                ? 'Mehrheit: Sachlicher Einwand — Dialog wird fortgesetzt.'
                : 'Mehrheit: Präferenz — Einwand kann als Leichter Einwand behandelt werden.'}
            </div>
          )}
          {allVoted && (
            <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 flex items-center gap-2">
              <span>✅</span>
              Alle Kreis-Mitglieder haben abgestimmt.
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleAdvance}
        disabled={!myVote}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
      >
        Weiter zum Lösungsraum →
      </button>
    </div>
  )
}
