/**
 * Seed-Script: Abo-Pläne anlegen
 *
 * Legt die Abo-Pläne für adlix consent an, sofern sie noch nicht existieren.
 * Verwendet documentId (Strapi 5).
 *
 * Ausführen:
 *   node scripts/seed-abos.js
 *
 * Oder via Makefile:
 *   make seed-abos
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN

if (!API_TOKEN) {
  console.error('❌  STRAPI_API_TOKEN nicht gesetzt.')
  process.exit(1)
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_TOKEN}`,
}

const abos = [
  {
    name: 'Free',
    slug: 'free',
    description: 'Consent-Loop für kleine Kreise. Kein KI-Support.',
    price: 0,
    currency: 'EUR',
    interval: 'month',
    planKey: 'free',
    maxCircles: 1,
    maxVorhaben: 5,
    hasKI: false,
    hasAnonymization: false,
    isActive: true,
    sortOrder: 1,
    features: [
      '1 Kreis',
      'Bis zu 5 Vorhaben',
      'Voller Consent-Loop',
      'Audit-Trail',
    ],
  },
  {
    name: 'Consent Pro',
    slug: 'consent-pro',
    description:
      'Unbegrenzte Kreise, KI-gestützte Einwand-Analyse und Anonymisierung. Für Teams, die Consent ernstnehmen.',
    price: 9.9,
    currency: 'EUR',
    interval: 'month',
    planKey: 'pro',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || null,
    maxCircles: null, // unbegrenzt
    maxVorhaben: null, // unbegrenzt
    hasKI: true,
    hasAnonymization: true,
    isActive: true,
    sortOrder: 2,
    features: [
      'Unbegrenzte Kreise',
      'Unbegrenzte Vorhaben',
      'KI-Einwand-Analyse',
      'Anonymisierungspfad',
      'Agile Tribes',
      'Audit-Trail',
      'E-Mail-Erinnerungen',
    ],
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    description: 'Teams-Integration, SSO, Audit-Log, unbegrenzt. Für Organisationen.',
    price: 0, // Preis auf Anfrage
    currency: 'EUR',
    interval: 'month',
    planKey: 'enterprise',
    maxCircles: null,
    maxVorhaben: null,
    hasKI: true,
    hasAnonymization: true,
    isActive: false, // noch nicht aktiv
    sortOrder: 3,
    features: [
      'Alles aus Pro',
      'SSO / Teams-Integration',
      'Dediziertes Onboarding',
      'SLA',
      'Preis auf Anfrage',
    ],
  },
]

async function seed() {
  console.log('🌱 Seede Abo-Pläne…\n')

  for (const abo of abos) {
    // Check if already exists
    const checkRes = await fetch(
      `${STRAPI_URL}/api/abos?filters[slug][$eq]=${abo.slug}&publicationState=preview`,
      { headers }
    )
    const checkData = await checkRes.json()

    if (checkData?.data?.length > 0) {
      const existing = checkData.data[0]
      console.log(`⏭️  "${abo.name}" existiert bereits (documentId: ${existing.documentId})`)
      continue
    }

    // Create
    const res = await fetch(`${STRAPI_URL}/api/abos`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          ...abo,
          publishedAt: new Date().toISOString(),
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error(`❌  Fehler beim Anlegen von "${abo.name}":`, err)
      continue
    }

    const created = await res.json()
    const documentId = created?.data?.documentId
    console.log(`✅  "${abo.name}" angelegt — documentId: ${documentId}`)

    if (abo.slug === 'consent-pro') {
      console.log(`\n   👉 STRIPE_PRO_PRICE_ID in .env setzen:`)
      console.log(`      documentId für Referenzen: ${documentId}\n`)
    }
  }

  console.log('\n✅ Seeding abgeschlossen.')
}

seed().catch((err) => {
  console.error('❌ Seed-Fehler:', err)
  process.exit(1)
})
