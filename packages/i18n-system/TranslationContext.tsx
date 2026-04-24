"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface TranslationContextValue {
  t: (code: string, page?: string) => string;
  locale: string;
  translations: Record<string, string>;
}

const TranslationContext = createContext<TranslationContextValue>({
  t: (code) => code,
  locale: "de",
  translations: {},
});

interface TranslationProviderProps {
  locale?: string;
  children: React.ReactNode;
}

export function TranslationProvider({
  locale = "de",
  children,
}: TranslationProviderProps) {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const pendingRegistrations = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function loadTranslations() {
      try {
        const res = await fetch(`/api/translations?locale=${locale}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data: Record<string, string> = await res.json();
        if (!cancelled) {
          setTranslations(data);
        }
      } catch {
        // Stille Fehler — App ist ohne Übersetzungen noch nutzbar
      }
    }

    loadTranslations();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  function t(code: string, page?: string): string {
    if (code in translations) {
      return translations[code];
    }

    // Fire-and-forget: fehlenden Key registrieren (einmalig pro Session)
    if (!pendingRegistrations.current.has(code)) {
      pendingRegistrations.current.add(code);

      fetch("/api/translations/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, ...(page ? { page } : {}) }),
      })
        .then(async (res) => {
          if (!res.ok) return;
          const data = await res.json();
          if (data?.registered) {
            setTranslations((prev) => ({ ...prev, [code]: code }));
          }
        })
        .catch(() => {
          // Ignorieren — Fallback bleibt der Code selbst
        });
    }

    return code;
  }

  return (
    <TranslationContext.Provider value={{ t, locale, translations }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext(): TranslationContextValue {
  return useContext(TranslationContext);
}
