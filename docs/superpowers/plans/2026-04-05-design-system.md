# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable design system with Button, Input, and Card components using cva, then refactor existing pages to use them.

**Architecture:** Components live in `components/ui/` using `cva` for variant definitions, `cn()` helper in `lib/utils.ts` for class merging. Existing page components get refactored to use the new primitives.

**Tech Stack:** React 19, Tailwind CSS v4, class-variance-authority, clsx, tailwind-merge

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install cva, clsx, and tailwind-merge**

```bash
npm install class-variance-authority clsx tailwind-merge
```

- [ ] **Step 2: Verify installation**

```bash
npm ls class-variance-authority clsx tailwind-merge
```

Expected: all three packages listed without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add cva, clsx, tailwind-merge for design system"
```

---

### Task 2: Create cn() Helper and Add New Tokens

**Files:**
- Create: `lib/utils.ts`
- Modify: `app/globals.css:23-25` (add warning/info tokens after existing feedback colors)

- [ ] **Step 1: Create lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Add warning and info tokens to globals.css**

In `app/globals.css`, after line 25 (`--color-feedback-error: #E5576F;`), add:

```css
  --color-feedback-warning: #F5A623;
  --color-feedback-info: #5B9FED;
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add lib/utils.ts app/globals.css
git commit -m "feat: add cn() helper and warning/info feedback tokens"
```

---

### Task 3: Create Button Component

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create Button.tsx**

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-surface-base text-text-primary hover:bg-surface-base/90",
        secondary:
          "bg-brand-primary text-text-inverse hover:bg-brand-primary/80",
        ghost: "bg-transparent text-text-secondary hover:text-text-primary",
        outline:
          "bg-transparent border border-border-default text-text-primary hover:bg-surface-soft",
        success:
          "bg-feedback-success text-text-inverse hover:bg-feedback-success/80",
        danger:
          "bg-feedback-error text-text-inverse hover:bg-feedback-error/80",
        warning:
          "bg-feedback-warning text-text-inverse hover:bg-feedback-warning/80",
        info: "bg-feedback-info text-text-inverse hover:bg-feedback-info/80",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export default function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add Button component with cva variants"
```

---

### Task 4: Create Input Component

**Files:**
- Create: `components/ui/Input.tsx`

- [ ] **Step 1: Create Input.tsx**

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-full border px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 placeholder:text-text-secondary/60",
  {
    variants: {
      variant: {
        default: "border-border-default bg-surface-base text-text-primary",
        error: "border-feedback-error bg-surface-base text-text-primary",
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-base",
        lg: "py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    className?: string;
  };

export default function Input({
  variant,
  size,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { inputVariants };
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Input.tsx
git commit -m "feat: add Input component with cva variants"
```

---

### Task 5: Create Card Component

**Files:**
- Create: `components/ui/Card.tsx`

- [ ] **Step 1: Create Card.tsx**

The `accent` variant uses dynamic Tailwind classes via `accentColor` prop. Since Tailwind needs to see full class names at build time, the accent styles are passed as a `className` override by the consumer (e.g. `"bg-brand-primary/20 border-brand-primary/40"`). The `accent` variant itself only sets base styles.

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-3xl border p-10", {
  variants: {
    variant: {
      default: "bg-surface-base border-border-default",
      accent: "",
      outline: "bg-transparent border-border-default",
    },
    size: {
      sm: "min-h-48",
      md: "min-h-64",
      lg: "min-h-80",
      auto: "",
    },
    hoverable: {
      true: "transition-all duration-300 hover:scale-105 hover:shadow-lg",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hoverable: false,
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    className?: string;
  };

export default function Card({
  variant,
  size,
  hoverable,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, size, hoverable }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { cardVariants };
```

- [ ] **Step 2: Create barrel export**

Create `components/ui/index.ts`:

```ts
export { default as Button, buttonVariants } from "./Button";
export { default as Input, inputVariants } from "./Input";
export { default as Card, cardVariants } from "./Card";
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add Card component and barrel export for UI primitives"
```

---

### Task 6: Refactor Hero.tsx

**Files:**
- Modify: `components/Hero.tsx:23-28`

- [ ] **Step 1: Replace inline button with Button component**

Replace the `<a>` tag at lines 23-28 with:

```tsx
import Button from "@/components/ui/Button";
```

And replace the `<a>` element:

```tsx
<a href="#subscribe">
  <Button variant="primary" size="lg">
    {hero.cta}
  </Button>
</a>
```

Note: The Hero CTA links to `#subscribe`, so we wrap `Button` in an `<a>`. The `focus-visible:ring-surface-base` override from the original is dropped in favor of the DS standard `ring-brand-primary`.

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "refactor: use Button component in Hero"
```

---

### Task 7: Refactor Subscribe.tsx

**Files:**
- Modify: `components/Subscribe.tsx:65-72,77-84,86-92`

- [ ] **Step 1: Replace inline inputs and button**

Add imports:

```tsx
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
```

Replace the name input (lines 65-73) with:

```tsx
<Input
  id="subscribe-name"
  type="text"
  placeholder={content.namePlaceholder}
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  className="text-center"
/>
```

Replace the email input (lines 77-85) with:

```tsx
<Input
  id="subscribe-email"
  type="email"
  placeholder={content.emailPlaceholder}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="text-center"
/>
```

Replace the button (lines 86-92) with:

```tsx
<Button
  type="submit"
  variant="secondary"
  size="lg"
  disabled={status === "loading"}
  className="disabled:opacity-50"
>
  {status === "loading" ? content.loading : content.cta}
</Button>
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/Subscribe.tsx
git commit -m "refactor: use Button and Input components in Subscribe"
```

---

### Task 8: Refactor Products.tsx

**Files:**
- Modify: `components/Products.tsx:4-8,27-37`

- [ ] **Step 1: Replace inline card markup with Card component**

Add import:

```tsx
import { Card } from "@/components/ui";
```

Replace the `accentStyles` array (lines 4-8) with:

```tsx
const accentStyles = [
  "bg-brand-secondary/20 border-brand-secondary/40 hover:shadow-brand-secondary/30",
  "bg-brand-primary/20 border-brand-primary/40 hover:shadow-brand-primary/30",
  "bg-brand-tertiary/20 border-brand-tertiary/40 hover:shadow-brand-tertiary/30",
];
```

Keep this array — it provides the dynamic accent classes. Replace the inner `<div>` (lines 28-37) with:

```tsx
<Card
  variant="accent"
  size="auto"
  hoverable
  className={accentStyles[index % accentStyles.length]}
>
  <div className="text-5xl mb-6">{product.icon}</div>
  <h3 className="text-xl text-text-primary mb-4">
    {product.title}
  </h3>
  <p className="text-text-secondary leading-relaxed">
    {product.description}
  </p>
</Card>
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/Products.tsx
git commit -m "refactor: use Card component in Products"
```

---

### Task 9: Refactor Footer.tsx

**Files:**
- Modify: `components/Footer.tsx:12-19`

- [ ] **Step 1: Replace inline link with Button ghost**

The Footer Instagram link is an `<a>` tag. Since `Button` renders a `<button>`, keep the `<a>` but use `buttonVariants` for consistent styling:

Add import:

```tsx
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
```

Replace the `<a>` tag (lines 12-19) with:

```tsx
<a
  href={footer.instagramUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(buttonVariants({ variant: "ghost" }), "text-text-inverse/70 hover:text-brand-primary")}
>
  {footer.instagramHandle}
</a>
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "refactor: use buttonVariants in Footer link"
```

---

### Task 10: Create Design System Skill

**Files:**
- Create: `.claude/skills/design-system.md`

- [ ] **Step 1: Create the skill file**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/design-system.md
git commit -m "feat: add design-system skill for auto-enforcement"
```

---

### Task 11: Final Verification

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero CTA button renders correctly
- Subscribe form inputs and button render correctly
- Product cards render correctly with accent colors and hover effects
- Footer Instagram link renders correctly

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no new lint errors.
