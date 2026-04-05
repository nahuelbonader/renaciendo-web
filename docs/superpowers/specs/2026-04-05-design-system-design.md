# Design System — Spec

## Overview

Create a reusable component design system for `renaciendo-web` using `cva` (class-variance-authority) + `clsx` + `tailwind-merge`. Scope: three primitive UI components (Button, Input, Card) plus a skill that enforces DS usage in future work.

## Dependencies

| Package | Purpose |
|---------|---------|
| `class-variance-authority` | Variant definitions with type-safe props |
| `clsx` | Conditional class composition |
| `tailwind-merge` | Resolve Tailwind class conflicts |

## File Structure

```
lib/
  utils.ts              ← cn() helper (clsx + twMerge)
components/
  ui/
    Button.tsx
    Input.tsx
    Card.tsx
    index.ts            ← barrel export
```

## New Design Tokens

Add to `globals.css` under `@theme`:

| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-feedback-warning` | `#F5A623` | Warning states |
| `--color-feedback-info` | `#5B9FED` | Info states |

## cn() Helper

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Component: Button

### Base styles

`rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`

### Variants

| Variant | Styles |
|---------|--------|
| `primary` | `bg-surface-base text-text-primary hover:bg-surface-base/90` |
| `secondary` | `bg-brand-primary text-text-inverse hover:bg-brand-primary/80` |
| `ghost` | `bg-transparent text-text-secondary hover:text-text-primary` |
| `outline` | `bg-transparent border border-border-default text-text-primary hover:bg-surface-soft` |
| `success` | `bg-feedback-success text-text-inverse hover:bg-feedback-success/80` |
| `danger` | `bg-feedback-error text-text-inverse hover:bg-feedback-error/80` |
| `warning` | `bg-feedback-warning text-text-inverse hover:bg-feedback-warning/80` |
| `info` | `bg-feedback-info text-text-inverse hover:bg-feedback-info/80` |

### Sizes

| Size | Styles |
|------|--------|
| `sm` | `px-4 py-2 text-sm` |
| `md` | `px-6 py-3 text-base` |
| `lg` | `px-8 py-3 text-lg` |

### Props

- `variant`: `"primary" | "secondary" | "ghost" | "outline" | "success" | "danger" | "warning" | "info"` — default `"primary"`
- `size`: `"sm" | "md" | "lg"` — default `"md"`
- `className`: optional overrides
- Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Component: Input

### Base styles

`rounded-full border px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 placeholder:text-text-secondary/60`

### Variants

| Variant | Styles |
|---------|--------|
| `default` | `border-border-default bg-surface-base text-text-primary` |
| `error` | `border-feedback-error bg-surface-base text-text-primary` |

### Sizes

| Size | Styles |
|------|--------|
| `sm` | `py-2 text-sm` |
| `md` | `py-3 text-base` |
| `lg` | `py-3 text-lg` |

### Props

- `variant`: `"default" | "error"` — default `"default"`
- `size`: `"sm" | "md" | "lg"` — default `"md"`
- `className`: optional overrides
- Extends `React.InputHTMLAttributes<HTMLInputElement>`

## Component: Card

### Base styles

`rounded-3xl border p-10`

### Variants

| Variant | Styles |
|---------|--------|
| `default` | `bg-surface-base border-border-default` |
| `accent` | Dynamic via `accentColor` prop — applies `bg-{color}/20 border-{color}/40`. `accentColor` accepts theme token names (e.g. `"brand-primary"`, `"brand-tertiary"`, `"brand-secondary"`) |
| `outline` | `bg-transparent border-border-default` |

### Sizes

| Size | Styles |
|------|--------|
| `sm` | `min-h-48` |
| `md` | `min-h-64` |
| `lg` | `min-h-80` |
| `auto` | no min-height constraint |

### Props

- `variant`: `"default" | "accent" | "outline"` — default `"default"`
- `accentColor`: `string` — only applies with variant `accent`
- `size`: `"sm" | "md" | "lg" | "auto"` — default `"md"`
- `hoverable`: `boolean` — default `false` — adds `hover:scale-105 hover:shadow-lg transition-transform`
- `className`: optional overrides
- `children`: `React.ReactNode`
- Extends `React.HTMLAttributes<HTMLDivElement>`

## Refactoring Scope

After creating the components, update existing usage:

1. **Hero.tsx** — replace inline button with `<Button variant="primary" size="lg">`
2. **Subscribe.tsx** — replace inline button with `<Button variant="secondary" size="lg">`, inputs with `<Input>`
3. **Products.tsx** — replace inline card markup with `<Card variant="accent" hoverable>`
4. **Footer.tsx** — replace inline link buttons with `<Button variant="ghost">`

## Skill: Design System

Create a skill at `.claude/skills/design-system.md` that auto-triggers when working on files in `components/` or `globals.css`.

**Rules the skill enforces:**
- Use existing DS components before writing inline classes
- New UI components go in `components/ui/` using `cva`
- New color tokens go in `globals.css` under `@theme`
- Use `cn()` from `lib/utils.ts` to combine classes
- Contains inventory of available components, their variants, and props

## Out of Scope

- SectionContainer, SectionHeading (can be added incrementally)
- Store/blog components (future)
- Visual companion / Storybook
