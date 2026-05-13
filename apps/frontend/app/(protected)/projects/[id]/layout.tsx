import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Vorhaben #${id}`,
    description: `Details und Abstimmung zum Consent-Vorhaben #${id}.`,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      title: `Vorhaben #${id} | adlix consent`,
      description: `Details und Abstimmung zum Consent-Vorhaben #${id}.`,
      url: `/projects/${id}`,
    },
  }
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
