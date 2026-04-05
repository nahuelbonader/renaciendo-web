<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Renaciendo en Sol Mayor — Agent Guidelines

## Project Overview

Landing page for a nature + writing brand ("Renaciendo en Sol Mayor") by Sol Maria Comas. The site is a single-page landing with anchor-based navigation, deployed on Vercel with multiple domain redirects to `renaciendoensolmayor.com.ar`.

**Planned future work:** online store, blog, Instagram feed integration, Supabase for subscriber persistence.

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js 16 (App Router)          |
| UI           | React 19, Server Components      |
| Styling      | Tailwind CSS v4 (`@theme` tokens)|
| Animations   | Framer Motion 12                  |
| Language     | TypeScript 5 (strict mode)        |
| Linting      | ESLint 9 (flat config, Next.js)   |
| Deployment   | Vercel                            |

## Architecture

```
app/
  layout.tsx          # Root layout (Gowun Dodum font, Navbar)
  page.tsx            # Single landing page composing all sections
  globals.css         # Tailwind v4 @theme tokens + base styles
  api/subscribe/      # POST endpoint for email subscriptions

components/           # One file per section, mostly server components
  Hero | About | Products | Quote | Team | Subscribe | Footer
  Navbar | ScrollReveal | WaveDivider

content/
  landing.ts          # Single source of truth for all UI text

public/images/        # Logo variants (sun + text, 4 color each)
```

## Coding Conventions

### Language

- **All code in English** — variable names, comments, component names, git messages.
- **UI text in Spanish** — all user-facing copy lives in `content/landing.ts`, never hardcoded in components.

### Components

- **Server components by default.** Only add `"use client"` when strictly needed (event handlers, hooks, browser APIs).
- **One component per file** in `components/`. Named exports matching the filename.
- Props are destructured inline. No separate `Props` type unless the interface is complex.

### Styling

- **Use only semantic design tokens** — `bg-brand-primary`, `text-text-secondary`, etc.
- **Never use raw hex/rgb values** in components. All colors are defined in `globals.css` under `@theme`.
- Tailwind v4 uses CSS-native `@theme` blocks, not `tailwind.config.js`. Check `globals.css` for available tokens.

### Design Tokens (defined in `globals.css`)

| Token                  | Value     | Usage                    |
| ---------------------- | --------- | ------------------------ |
| `brand-primary`        | `#E2A9F1` | Purple — primary accent  |
| `brand-secondary`      | `#FFDE59` | Yellow — secondary accent|
| `brand-tertiary`       | `#6FE5CC` | Mint — tertiary accent   |
| `surface-base`         | `#FFFFFF` | White backgrounds        |
| `surface-soft`         | `#FFF9F0` | Cream/warm backgrounds   |
| `surface-muted`        | `#F5F0EB` | Muted beige backgrounds  |
| `text-primary`         | `#2D2A26` | Main body text           |
| `text-secondary`       | `#6B6560` | Secondary/muted text     |
| `text-inverse`         | `#FFFFFF` | Text on dark backgrounds |
| `feedback-success`     | `#6FE5CC` | Success states           |
| `feedback-error`       | `#E5576F` | Error states             |

### Content Management

- **All text is centralized** in `content/landing.ts` as a single `landing` object.
- When adding new sections, extend this object. Components import and destructure from it.
- Never hardcode Spanish text in JSX.

### Imports

- Use the `@/*` path alias for all imports from root (e.g., `@/components/Hero`, `@/content/landing`).

### Images

- Local assets go in `public/images/`.
- Remote images (Unsplash) are allowed via `next.config.ts` `remotePatterns`.
- Use Next.js `<Image>` component for all images.

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build (use to verify before deploy)
npm run lint    # Run ESLint
```

## Key Decisions

- **Font:** Gowun Dodum (Google Fonts) — loaded in `layout.tsx`.
- **Animations:** `ScrollReveal` component wraps sections for fade-in-on-scroll via Framer Motion.
- **Subscribe endpoint:** Currently uses in-memory `Set` — will migrate to Supabase.
- **Domain strategy:** 10 domain variants all 301-redirect to canonical `.com.ar` (see `vercel.json`).
- **No testing framework yet.** Add one when the project grows beyond the landing page.

## What NOT to Do

- Do not create `tailwind.config.js` — Tailwind v4 uses `@theme` in CSS.
- Do not add `"use client"` to components unless they need interactivity.
- Do not hardcode text strings in components — use `content/landing.ts`.
- Do not use color values directly — use design tokens.
- Do not add unnecessary dependencies — keep the bundle minimal.
- Do not create README, docs, or markdown files unless explicitly asked.
