"use client";

import { type ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLanguageStore, localeMeta } from "@/lib/i18n/store";

export function ThemeRegistry({ children }: { children: ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);
  const dir = localeMeta[locale].dir;

  const theme = useMemo(
    () =>
      createTheme({
        direction: dir,
        palette: {
          mode: "dark",
          background: { default: "#171717", paper: "#262626" },
          primary: { main: "#aabbc5" },
          secondary: { main: "#676b6c" },
          text: { primary: "#f2f3f3", secondary: "#9aa0a1" },
        },
        typography: {
          fontFamily: "var(--font-body)",
        },
        shape: { borderRadius: 10 },
      }),
    [dir],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
