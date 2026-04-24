"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

export function useTranslations() {
  return useTranslationContext();
}
