---
name: design-system
description: Enforces usage of the project's design system (components/ui/) when creating or modifying UI components. Auto-triggers on work involving components/ or globals.css.
globs:
  - "components/**/*.tsx"
  - "app/globals.css"
---

# Design System

This project has a design system in `components/ui/`. You MUST use it when building or modifying UI.

## Available Components

### Button (`components/ui/Button.tsx`)
- **Variants:** `primary`, `secondary`, `ghost`, `outline`, `success`, `danger`, `warning`, `info`
- **Sizes:** `sm`, `md`, `lg`
- Import: `import Button from "@/components/ui/Button"`
- For `<a>` tags that need button styling, use `buttonVariants()` from the same file.

### Input (`components/ui/Input.tsx`)
- **Variants:** `default`, `error`
- **Sizes:** `sm`, `md`, `lg`
- Import: `import Input from "@/components/ui/Input"`

### Card (`components/ui/Card.tsx`)
- **Variants:** `default`, `accent`, `outline`
- **Sizes:** `sm`, `md`, `lg`, `auto`
- **Hoverable:** `boolean`
- For `accent` variant, pass accent colors via `className` (e.g. `"bg-brand-primary/20 border-brand-primary/40"`)
- Import: `import { Card } from "@/components/ui"`

## Rules

1. **Use DS components first.** Before writing inline Tailwind for buttons, inputs, or cards, check if a DS component covers the need.
2. **New UI primitives go in `components/ui/`** using `cva` for variants.
3. **New color tokens go in `app/globals.css`** under the `@theme` block.
4. **Use `cn()` from `lib/utils.ts`** to combine/override classes.
5. **Barrel export:** Add new components to `components/ui/index.ts`.