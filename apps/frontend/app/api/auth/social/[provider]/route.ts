import { NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || 'http://localhost:3000'

/**
 * Initiate OAuth flow with a Strapi provider.
 * Redirects the user to Strapi's connect endpoint, which handles the OAuth dance
 * and redirects back with a JWT.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params

  const validProviders = ['github', 'facebook', 'google']
  if (!validProviders.includes(provider)) {
    return NextResponse.json({ error: 'Unbekannter Provider.' }, { status: 400 })
  }

  // Redirect to Strapi's provider connect URL
  // Strapi will handle the OAuth flow and redirect to our callback URL
  const callbackUrl = `${APP_URL}/api/auth/social/${provider}/callback`
  const strapiConnectUrl = `${STRAPI_URL}/api/connect/${provider}?redirect_to=${encodeURIComponent(callbackUrl)}`

  return NextResponse.redirect(strapiConnectUrl)
}