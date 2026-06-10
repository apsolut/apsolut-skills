---
name: ghibli-design
description: "Apply the Ghibli design system (cornflower blue + slate with teal/coral/gold accents, muted film-inspired tones) to any project. Use when the user asks for 'Ghibli design', 'Ghibli theme', 'apsolut style', or wants this palette/design language applied to a new or existing app, landing page, dashboard, or component. Ships drop-in Tailwind v4 + shadcn tokens, dark mode, typography, component recipes, and chart colors."
trigger: /ghibli-design
---

# /ghibli-design

Apply the Ghibli design system to the current project. The system is a muted, film-inspired aesthetic: **cornflower blue (`#3a6ea5`) + slate neutrals, with teal (`#7bb3a8`) / coral (`#e08e6d`) / gold (`#f9c270`) accents**, a blue-tinted page wash (`#f0f5f9`) with white cards, Figtree typography, 12px base radius, and restrained `shadow-sm` elevation.

Files in this skill folder:

- `theme.css` — drop-in design tokens (Tailwind v4 CSS-first + shadcn variable names, light + dark mode)
- `reference.md` — full spec: palette tables, typography, spacing, component recipes, chart colors, do/don't

## How to apply

Read `reference.md` first when doing any substantial styling work. Then pick the integration path that matches the target project:

### 1. Tailwind v4 + shadcn/ui (preferred)

Copy `theme.css` from this skill folder into the project (e.g. `app/theme.css` or the project's existing theme location) and import it from the global CSS entry alongside `@import "tailwindcss";`. It uses standard shadcn variable names (`--background`, `--primary`, `--card`, …) so shadcn components restyle automatically, plus named accent utilities (`bg-teal`, `text-coral`, `bg-gold-light`, `bg-brand-light`).

If the project already has a shadcn theme file, **merge** — replace the `:root` and `.dark` variable values with the ones from `theme.css` and add the accent token blocks; don't duplicate `@theme` mappings the project already declares.

### 2. Tailwind v3

Translate the `:root`/`.dark` variables into `tailwind.config` `theme.extend.colors` entries pointing at CSS variables, and put the variable definitions in the global CSS. Keep the same names (`brand`, `teal`, `coral`, `gold`, plus shadcn semantics).

### 3. Plain CSS / other frameworks

Use the `:root`/`.dark` blocks from `theme.css` directly as custom properties; apply the hex values from the palette table in `reference.md`.

### Typography

Load **Figtree** (weights 300–700) as the sans font. In Next.js:

```tsx
const sansFont = Figtree({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-sans" });
```

Elsewhere, a Google Fonts `<link>` works. Fallback to the system UI stack — never a heavy display face.

## Non-negotiables (the identity of the system)

1. **Blue-tinted page background** `#f0f5f9` with white cards — never a white page.
2. **Semantic accents:** teal = success/positive, coral = warning/negative, gold = pending/notification, blue = brand/active. Raw red only for destructive.
3. **One border token** (`#e2e8f0`, 1px) everywhere; `shadow-sm` default elevation.
4. **12px base radius** (`rounded-xl` cards, `rounded-full` pills).
5. **No saturated/neon colors**; max text darkness `#1e293b` in light mode.
6. Spacing rhythm: `p-6` card padding, `gap-6` grids, `mt-8` sections.

## Component & chart guidance

For cards, metric cards, tabs (default/pills/underline), sidebar layout, progress bars, and Recharts/shadcn chart configs, follow the recipes in `reference.md` §4–6 verbatim — they are the proven patterns from the source codebases. Mirror the host project's component library (shadcn, raw Radix, plain JSX) but keep the token usage identical.

## Verification

After applying, render a representative page (or build a quick sample with a card grid + one chart + tabs) in both light and dark mode and check: page wash vs card contrast, primary button color, accent semantics, border consistency. If the project has a screenshot helper, capture both modes.
