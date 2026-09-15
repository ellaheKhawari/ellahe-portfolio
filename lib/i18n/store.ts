"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import en from "./dictionaries/en";
import fa from "./dictionaries/fa";

export type Locale = "en" | "fa";

export const dictionaries = { en, fa } as const;

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; label: string; nativeLabel: string }> = {
  en: { dir: "ltr", label: "English", nativeLabel: "English" },
  fa: { dir: "rtl", label: "Persian", nativeLabel: "فارسی" },
};

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === "en" ? "fa" : "en" }),
    }),
    { name: "portfolio-locale" },
  ),
);

export function useDictionary() {
  const locale = useLanguageStore((s) => s.locale);
  return { locale, t: dictionaries[locale], dir: localeMeta[locale].dir };
}
