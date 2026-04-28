'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { strapi } from '../../lib/strapi'

interface ThematicGroup {
  [theme: string]: string[]
}

interface AnonymousConcernsData {
  roundId: number
  totalConcerns: number
  thematicGroups: ThematicGroup
  summary: string
}

interface AnonymousConcernsViewProps {
  roundId: number
  isOwner: boolean
}

export default function AnonymousConcernsView({ roundId, isOwner }: AnonymousConcernsViewProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<AnonymousConcernsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const jwt = (session as unknown as { jwt?: string })?.jwt

  const fetchConcerns = async () => {
    setLoading(true)
    strapi.setJwt(jwt || null)
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      const res = await fetch(`${STRAPI_URL}/api/abstentions/${roundId}/anonymous-concerns`, {
        headers: {
          'Content-Type': 'application/json',
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const result = await res.json()
      setData(result.data)
      setExpanded(true)
    } catch (err) {
      console.error('Failed to load anonymous concerns:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOwner) return null

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-amber-800 flex items-center gap-2">
          🔒 Anonyme Bedenken
        </h4>
        {!expanded && (
          <button
            onClick={fetchConcerns}
            disabled={loading}
            className="text-sm px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? 'Lade…' : 'Anzeigen'}
          </button>
        )}
      </div>

      {data && expanded && (
        <div className="space-y-3">
          <p className="text-sm text-amber-700">{data.summary}</p>

          {data.totalConcerns === 0 ? (
            <p className="text-sm text-gray-500">Keine anonymen Bedenken eingereicht.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(data.thematicGroups).map(([theme, concerns]) => (
                <div key={theme} className="bg-white rounded-lg p-3 border border-amber-100">
                  <h5 className="text-sm font-medium text-amber-900 mb-1">
                    {theme} ({concerns.length})
                  </h5>
                  <ul className="space-y-1">
                    {concerns.map((c, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-amber-600 hover:text-amber-800"
          >
            Ausblenden
          </button>
        </div>
      )}
    </div>
  )
}
