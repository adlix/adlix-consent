'use client'

import { useEffect, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  const { id, type, message, duration = 4000 } = toast

  const dismiss = useCallback(() => onDismiss(id), [id, onDismiss])

  useEffect(() => {
    const timer = setTimeout(dismiss, duration)
    return () => clearTimeout(timer)
  }, [dismiss, duration])

  const styles: Record<ToastType, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const icons: Record<ToastType, string> = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  }

  const ariaLabels: Record<ToastType, string> = {
    success: 'Erfolg',
    error: 'Fehler',
    info: 'Information',
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-md ${styles[type]} animate-in slide-in-from-right`}
    >
      <span aria-hidden="true" className="text-lg shrink-0">{icons[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{ariaLabels[type]}</p>
        <p className="text-sm mt-0.5">{message}</p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Benachrichtigung schließen"
        className="shrink-0 text-current opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1 rounded"
      >
        ✕
      </button>
    </div>
  )
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null

  return (
    <div
      aria-label="Benachrichtigungen"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
