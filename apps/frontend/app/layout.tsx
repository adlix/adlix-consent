import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://consent.adlix.de'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'adlix consent — Gemeinsam entscheiden',
    template: '%s | adlix consent',
  },
  description:
    'adlix consent ist eine Consent-Plattform für faire, transparente und inklusive Gruppenentscheidungen — ohne Hierarchien, mit Stimme für alle.',
  keywords: [
    'Consent',
    'Soziokratie',
    'Gruppenentscheidung',
    'Abstimmung',
    'Einspruch',
    'adlix',
    'Organisationsentwicklung',
  ],
  authors: [{ name: 'adlix', url: siteUrl }],
  creator: 'adlix',
  publisher: 'adlix',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'adlix consent',
    title: 'adlix consent — Gemeinsam entscheiden',
    description:
      'Faire, transparente und inklusive Gruppenentscheidungen mit dem Consent-Verfahren.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'adlix consent — Consent-Plattform für faire Gruppenentscheidungen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'adlix consent — Gemeinsam entscheiden',
    description:
      'Faire, transparente und inklusive Gruppenentscheidungen mit dem Consent-Verfahren.',
    images: ['/og-image.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'adlix',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    'adlix entwickelt Software für kollaborative Entscheidungsfindung auf Basis des Consent-Verfahrens.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'German',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'adlix consent',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: siteUrl,
  description:
    'Consent-Plattform für faire, transparente und inklusive Gruppenentscheidungen.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  inLanguage: 'de',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Zum Hauptinhalt springen
        </a>
        {children}
      </body>
    </html>
  )
}
