import { NextResponse } from 'next/server'

// Use the public Strapi URL for browser redirects (not the Docker internal URL)
const STRAPI_PUBLIC_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'

/**
 * Initiate OAuth flow with a Strapi provider.
 * Redirects the user to Strapi's connect endpoint.
 * After the OAuth dance, Strapi's overridden callback controller
 * redirects back to /api/auth/social/<provider>/callback with the JWT.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params

  const validProviders = ['github', 'facebook', 'google', 'apple']
  if (!validProviders.includes(provider)) {
    return NextResponse.json({ error: 'Unbekannter Provider.' }, { status: 400 })
  }

  const strapiConnectUrl = `${STRAPI_PUBLIC_URL}/api/connect/${provider}`

  return NextResponse.redirect(strapiConnectUrl)
}
