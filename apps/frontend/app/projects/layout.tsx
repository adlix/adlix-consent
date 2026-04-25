import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projekte',
  description:
    'Alle Consent-Projekte auf einen Blick. Starte neue Abstimmungsprozesse oder verfolge laufende Vorhaben.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projekte | adlix consent',
    description:
      'Alle Consent-Projekte auf einen Blick. Starte neue Abstimmungsprozesse oder verfolge laufende Vorhaben.',
    url: '/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
