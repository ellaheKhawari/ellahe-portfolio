<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

This repo is a bilingual portfolio site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and a small set of UI/animation libraries.

## Project commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Architecture

- `app/`: route entry points, root layout, global styles, and top-level page composition
- `components/sections/`: landing-page sections such as Hero, About, Skills, Projects, Contact, and Footer
- `components/ui/`: reusable UI primitives and shared visual elements
- `providers/`: application providers, including locale and theme setup
- `lib/`: shared utilities and locale/dictionary logic
- `public/`: static assets
- `types/`: shared typing support

## Core conventions

- Use the `@/*` alias for imports across the app.
- Keep copy in `lib/i18n/dictionaries/en.ts` and `fa.ts`; add new keys in both files and read them via `useDictionary()` instead of hard-coding user-facing strings.
- Locale state lives in `lib/i18n/store.ts`; switching the language updates the document `lang` and `dir` via `LocaleProvider`.
- Prefer Tailwind utility classes and the brand tokens in `app/globals.css` instead of introducing ad hoc CSS or hard-coded colors.
- Keep sections composed in `app/page.tsx` and use the existing layout patterns from the other section components instead of inventing a new structure.
- Reuse the existing motion and icon patterns (`motion/react`, `lucide-react`, GSAP/Three.js where already used) rather than adding multiple new animation stacks.

## When making changes

- If a change affects language copy, update both dictionaries and keep the `Dictionary` interface aligned.
- If a component is visual-only and not user copy, check nearby section components before creating a new pattern or wrapper.
- If a Next.js API is unfamiliar, consult the existing local Next docs under `node_modules/next/dist/docs` before relying on newer or deprecated behavior.
- Keep changes targeted and reversible; this project is mostly static content and section composition rather than complex business logic.

## Useful references

- [README.md](README.md)
- [app/page.tsx](app/page.tsx)
- [app/layout.tsx](app/layout.tsx)
- [lib/i18n/store.ts](lib/i18n/store.ts)
- [lib/i18n/dictionaries/en.ts](lib/i18n/dictionaries/en.ts)
- [lib/i18n/dictionaries/fa.ts](lib/i18n/dictionaries/fa.ts)
- [app/globals.css](app/globals.css)
