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
  const [userData, setUserData] = useState({ name: '', avatar: '' })
  const [circleData, setCircleData] = useState({ name: '', description: '' })
  const [isCompleted, setIsCompleted] = useState(false)

  // Check if onboarding is already completed
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const res = await fetch('/api/user/onboarding-status')
        if (res.ok) {
          const data = await res.json()
          if (data.completed) {
            setIsCompleted(true)
          }
        }
      } catch (e) {
        // Ignore
      }
    }
    checkOnboarding()
  }, [])

  const completeOnboarding = () => {
    setIsCompleted(true)
    // Save to localStorage as backup
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
