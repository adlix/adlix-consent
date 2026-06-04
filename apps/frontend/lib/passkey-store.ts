// Challenge Store (in-memory, per instance)
const challengeStore = new Map<string, { challenge: string; expiresAt: number }>()

export function storeChallenge(userId: string, challenge: string) {
  challengeStore.set(userId, { challenge, expiresAt: Date.now() + 5 * 60 * 1000 }) // 5 min
}

export function getAndClearChallenge(userId: string): string | null {
  const entry = challengeStore.get(userId)
  if (!entry) return null
  challengeStore.delete(userId)
  if (entry.expiresAt < Date.now()) return null
  return entry.challenge
}

// Temporary anon-challenge (for authentication without a known user)
export function storeTempChallenge(sessionId: string, challenge: string) {
  challengeStore.set(`anon:${sessionId}`, { challenge, expiresAt: Date.now() + 5 * 60 * 1000 })
}

export function getAndClearTempChallenge(sessionId: string): string | null {
  const key = `anon:${sessionId}`
  const entry = challengeStore.get(key)
  if (!entry) return null
  challengeStore.delete(key)
  if (entry.expiresAt < Date.now()) return null
  return entry.challenge
}

// Cleanup expired challenges
setInterval(
  () => {
    const now = Date.now()
    for (const [key, val] of challengeStore.entries()) {
      if (val.expiresAt < now) challengeStore.delete(key)
    }
  },
  60_000
)
