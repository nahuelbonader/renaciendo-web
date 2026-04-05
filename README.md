# Renaciendo en Sol Mayor — Web

Landing page for **Renaciendo en Sol Mayor**, a project that fuses nature and writing.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** with semantic design system tokens
- **Google Fonts** — Gowun Dodum
- **Deploy** — Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

Brand colors and all visual tokens are defined in `app/globals.css` using Tailwind v4's `@theme` block. Components use semantic classes like `bg-brand-primary`, `text-text-secondary`, etc. — never raw hex values.
