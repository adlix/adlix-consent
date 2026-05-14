import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies
  const jwt = cookieStore.get('consent_session')?.value

  if (!jwt) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 })
  }

  try {
    // Get user from Strapi
    const userRes = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 401 })
    }

    const user = await userRes.json()
    const customerId = user.stripeCustomerId as string | undefined
    const plan = (user.plan as string) || 'free'

    if (!customerId) {
      return NextResponse.json({
        plan,
        invoices: [],
      })
    }

    // Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 24,
    })

    const formattedInvoices = invoices.data.map((inv) => ({
      id: inv.id,
      number: inv.number,
      status: inv.status,
      amountPaid: inv.amount_paid,
      currency: inv.currency,
      created: inv.created,
      pdfUrl: inv.invoice_pdf,
      periodStart: inv.period_start,
      periodEnd: inv.period_end,
    }))

    // Also get current subscription status
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      limit: 5,
    })

    const activeSub = subscriptions.data.find((s) => s.status === 'active')

    return NextResponse.json({
      plan: activeSub ? 'pro' : plan,
      customerId,
      subscription: activeSub
        ? {
            id: activeSub.id,
            status: activeSub.status,
            // Stripe v22 uses camelCase for TypeScript types
            currentPeriodEnd: (activeSub as unknown as Record<string, unknown>)
              .current_period_end as number,
            cancelAtPeriodEnd: activeSub.cancel_at_period_end,
          }
        : null,
      invoices: formattedInvoices,
    })
  } catch (err: unknown) {
    console.error('Stripe invoices error:', err)
    return NextResponse.json({ error: 'Rechnungen konnten nicht geladen werden.' }, { status: 500 })
  }
}
