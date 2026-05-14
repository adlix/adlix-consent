import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'consent_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 Tage

export interface SessionUser {
  id: string
  email: string
  username: string
  jwt: string
}

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/** Server-Component / Server-Action: aktuelle Session lesen */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const jwt = cookieStore.get(COOKIE_NAME)?.value
  if (!jwt) return null

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const user = await res.json()
    return { id: String(user.id), email: user.email, username: user.username, jwt }
  } catch {
    return null
  }
}

/** Middleware: JWT aus Cookie lesen ohne fetch */
export function getJwtFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null
}

/** Server-Action / Route Handler: Session setzen */
export async function setSession(jwt: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

/** Session löschen */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
