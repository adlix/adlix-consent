import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neues Vorhaben einreichen',
  description:
    'Reiche ein neues Vorhaben ein und starte den Consent-Prozess in deinem Kreis.',
  alternates: { canonical: '/projects/new' },
  openGraph: {
    title: 'Neues Vorhaben einreichen | adlix consent',
    description: 'Reiche ein neues Vorhaben ein und starte den Consent-Prozess in deinem Kreis.',
    url: '/projects/new',
  },
}

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
