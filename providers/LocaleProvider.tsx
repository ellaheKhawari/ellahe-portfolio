"use client";

import { useEffect, type ReactNode } from "react";
import { localeMeta, useLanguageStore } from "@/lib/i18n/store";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);

  useEffect(() => {
    const { dir } = localeMeta[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return children;
}
