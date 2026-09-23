import type { Metadata } from "next";
import { fontVariables } from "./fonts/fonts";
import "./globals.css";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { ThemeRegistry } from "@/providers/ThemeRegistry";
import { Toaster } from "sonner";
import { CursorTrailProvider } from "@/providers/CursorTrailProvider";
import CursorTrailBackground from "@/components/backgroundEffects/cursorTrailBackground";

export const metadata: Metadata = {
  title: "Portfolio — Designer & Developer",
  description:
    "A modern, bilingual (EN/FA) portfolio built with Next.js, React, TypeScript and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body className="antialiased" suppressHydrationWarning>
        <CursorTrailProvider>
          <CursorTrailBackground />
          <LocaleProvider>
            <ThemeRegistry>
              {children}
              <Toaster
                position="bottom-right"
                theme="dark"
                toastOptions={{
                  style: {
                    background: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-strong)",
                  },
                }}
              />
            </ThemeRegistry>
          </LocaleProvider>
        </CursorTrailProvider>
      </body>
    </html>
  );
}