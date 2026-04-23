'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

// Translations
const translations: Record<string, Record<string, string>> = {
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.circles': 'Kreise',
    'nav.proposals': 'Vorhaben',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',

    // Dashboard
    'dashboard.welcome': 'Willkommen zurück!',
    'dashboard.myCircles': 'Meine Kreise',
    'dashboard.activeProposals': 'Aktive Vorhaben',
    'dashboard.recentActivity': 'Letzte Aktivitäten',
    'dashboard.quickActions': 'Schnellaktionen',
    'dashboard.noCircles': 'Du bist noch in keinem Kreis',
    'dashboard.noProposals': 'Keine aktiven Vorhaben',
    'dashboard.noActivity': 'Keine aktuellen Aktivitäten',

    // Actions
    'action.create': 'Erstellen',
    'action.join': 'Beitreten',
    'action.vote': 'Abstimmen',
    'action.share': 'Teilen',
    'action.cancel': 'Abbrechen',
    'action.save': 'Speichern',
    'action.submit': 'Einreichen',

    // Roles
    'role.admin': 'Admin',
    'role.member': 'Member',

    // Phases
    'phase.description': 'Beschreibung',
    'phase.reaction': 'Reaktionsrunde',
    'phase.voting': 'Abstimmung',
    'phase.integration': 'Integration',

    // Consent
    'consent.yes': 'Konsent',
    'consent.objection': 'Einwand',
    'consent.abstain': 'Enthaltung',
    'consent.abstain_reason': 'Begründung',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.circles': 'Circles',
    'nav.proposals': 'Proposals',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Dashboard
    'dashboard.welcome': 'Welcome back!',
    'dashboard.myCircles': 'My Circles',
    'dashboard.activeProposals': 'Active Proposals',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.noCircles': "You're not in any circle yet",
    'dashboard.noProposals': 'No active proposals',
    'dashboard.noActivity': 'No recent activity',

    // Actions
    'action.create': 'Create',
    'action.join': 'Join',
    'action.vote': 'Vote',
    'action.share': 'Share',
    'action.cancel': 'Cancel',
    'action.save': 'Save',
    'action.submit': 'Submit',

    // Roles
    'role.admin': 'Admin',
    'role.member': 'Member',

    // Phases
    'phase.description': 'Description',
    'phase.reaction': 'Reaction Round',
    'phase.voting': 'Voting',
    'phase.integration': 'Integration',

    // Consent
    'consent.yes': 'Consent',
    'consent.objection': 'Objection',
    'consent.abstain': 'Abstain',
    'consent.abstain_reason': 'Reason',
  },
}

type TranslationKey = keyof typeof translations.de

interface I18nContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
  children,
  initialLocale = 'de',
}: {
  children: React.ReactNode
  initialLocale?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocaleState] = useState(initialLocale)

  useEffect(() => {
    async function applyLocale() {
      const stored = localStorage.getItem('locale')
      const urlMatch = pathname.match(/^\/(de|en)\//)
      if (urlMatch) {
        setLocaleState(urlMatch[1])
      } else if (stored) {
        setLocaleState(stored)
      }
    }
    applyLocale()
  }, [pathname])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)

    // Update URL
    const newPath = pathname.replace(/^\/(de|en)\//, `/${newLocale}/`)
    router.push(newPath)
  }

  const t = (key: TranslationKey): string => {
    return translations[locale]?.[key] || translations.de[key] || key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLocale('de')}
        className={`px-2 py-1 text-sm rounded ${
          locale === 'de' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-2 py-1 text-sm rounded ${
          locale === 'en' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export { translations }
