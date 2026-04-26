/**
 * Onboarding Context
 * State Management für den Onboarding-Flow
 */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface OnboardingContextType {
  step: number
  setStep: (step: number) => void
  userData: {
    name: string
    avatar?: string
  }
  setUserData: (data: { name: string; avatar?: string }) => void
  circleData: {
    name: string
    description?: string
    inviteCode?: string
  }
  setCircleData: (data: { name: string; description?: string; inviteCode?: string }) => void
  isCompleted: boolean
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<{ name: string; avatar?: string }>({ name: '' })
  const [circleData, setCircleData] = useState<{
    name: string
    description?: string
    inviteCode?: string
  }>({ name: '' })
  const [isCompleted, setIsCompleted] = useState(false)

  // Check if onboarding is already completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('onboarding_completed')
      if (completed === 'true') {
        setIsCompleted(true)
      }
    }
  }, [])

  const completeOnboarding = () => {
    setIsCompleted(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true')
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        userData,
        setUserData,
        circleData,
        setCircleData,
        isCompleted,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
