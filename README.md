# Portfolio Site

A responsive, bilingual (English / فارسی) portfolio built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4**, **MUI**, **Zustand**, **Sonner**, **Three.js**, **Motion**, and **GSAP**.

## Stack

| Purpose            | Library                          |
| ------------------ | --------------------------------- |
| Framework           | Next.js 16 (App Router)          |
| UI                  | React 19 + TypeScript             |
| Styling             | Tailwind CSS v4                   |
| Components          | MUI (theme only, for future forms/inputs) |
| State (language)    | Zustand (persisted to localStorage) |
| Toasts              | Sonner                            |
| 3D                  | Three.js (vanilla, hero background)|
| Animation           | Motion (Framer Motion) + GSAP     |
| Icons               | lucide-react                      |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx        Root layout: fonts, providers, metadata
  page.tsx           Composes all sections
  globals.css         Design tokens (brand colors) as Tailwind v4 @theme
  not-found.tsx       404 page
components/
  navbar/             Fullscreen GSAP-driven navigation (+ navbar.css)
  sections/           Hero, About, Skills, Projects, Experience, Contact, Footer
  three/              Vanilla Three.js hero background scene
  ui/                 Small shared UI (404 glitch text, etc.)
lib/
  i18n/
    dictionaries/     en.ts / fa.ts — all copy lives here
    store.ts          Zustand store: current locale + toggle, drives <html dir/lang>
  utils.ts            cn() helper + shared easing curves
providers/
  LocaleProvider.tsx  Syncs <html lang/dir> with the language store
  ThemeRegistry.tsx   MUI theme wired to the brand palette
```

## Internationalization (EN ⇄ FA)

- Language state lives in a Zustand store (`lib/i18n/store.ts`), persisted to `localStorage`, so the choice survives a refresh.
- Switching language flips `<html dir="rtl|ltr" lang="fa|en">`, so Tailwind's logical properties (`ps-`, `pe-`, `start-`, `end-`, etc. — already used throughout) mirror automatically. No separate RTL stylesheet needed.
- All copy is centralized in `lib/i18n/dictionaries/en.ts` and `fa.ts`, typed against the same `Dictionary` interface so the two files can never drift out of sync (TypeScript will error if a key is missing).
- Two fonts are loaded: **Inter** for Latin text, **Vazirmatn** for Persian — swapped automatically via a CSS variable based on the active locale.
- To add a new piece of copy: add the key to the `Dictionary` interface in `en.ts`, fill in both dictionaries, then read it anywhere via `useDictionary()`.

## Brand colors

Defined once in `app/globals.css` and exposed as Tailwind utilities (`bg-ink`, `bg-steel`, `bg-mist`, plus derived tokens like `bg-background`, `text-muted-foreground`, `border-border-strong`):

- `--ink: #262626`
- `--steel: #676b6c`
- `--mist: #aabbc5`

## Notes on the provided component code

Your Footer, Contact ("Let's work together"), 404 (`NotFoundGlitch`), and Navbar snippets were all ported in and adapted to:
- TypeScript strict typing
- The shared brand color tokens (CSS variables) instead of hard-coded shadcn tokens
- The i18n dictionary (all copy now comes from `en.ts` / `fa.ts`)
- lucide-react's current icon set (a few brand icons like `Facebook`/`Instagram`/`Youtube`/`Linkedin` were removed upstream from lucide-react, so those were swapped for neutral equivalents — happy to swap in custom SVGs instead if you'd rather keep literal brand marks)

## Git

This repo is initialized with git from the first commit so every change you make from here is tracked. Suggested next commit workflow:

```bash
git add .
git commit -m "your message"
```

## What still needs your input

- Real project images/screenshots for the **Projects** section (currently text-only cards)
- Real copy/bio, social links, and contact email
- A booking link for "Book a call" in Contact (currently a placeholder `cal.com` link)
- Whether you want a light theme too, or to keep the single dark brand theme
