import { NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || 'http://localhost:3000'

/**
 * OAuth callback handler.
 * Strapi redirects here with ?access_token=<jwt> on success
 * or ?error=... on failure.
 * The [provider] dynamic segment is in the path but we handle all providers the same way.
 */
export async function GET(
  _req: Request,
  { params: _params }: { params: Promise<{ provider: string }> }
) {
  const { searchParams } = new URL(_req.url)

  const error = searchParams.get('error')
  if (error) {
    const loginUrl = new URL('/login', APP_URL)
    loginUrl.searchParams.set(
      'error',
      error === 'access_denied' ? 'abgelehnt' : 'social_login_failed'
    )
    return NextResponse.redirect(loginUrl)
  }

  // Strapi passes the JWT as access_token or in the fragment
  const jwt = searchParams.get('access_token')

  if (!jwt) {
    const loginUrl = new URL('/login', APP_URL)
    loginUrl.searchParams.set('error', 'no_token')
    return NextResponse.redirect(loginUrl)
  }

  // Set session and redirect to dashboard
  const response = NextResponse.redirect(new URL('/dashboard', APP_URL))
  response.cookies.set('consent_session', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return response
}
