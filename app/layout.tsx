import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { ThemeRegistry } from "@/providers/ThemeRegistry";
import { Toaster } from "sonner";
import { CursorTrailProvider } from "@/components/CursorTrailProvider";
import CursorTrailBackground from "@/components/backgroundEffects/cursorTrailBackground";

const fontEn = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

const fontFa = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-fa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Designer & Developer",
  description:
    "A modern, bilingual (EN/FA) portfolio built with Next.js, React, TypeScript and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${fontEn.variable} ${fontFa.variable} antialiased`}
        suppressHydrationWarning
      >
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