# Design DNA — Output Templates

Skeletons for the three artifacts design-dna generates. Replace every `{{placeholder}}`, delete the `<!-- instruction -->` comments, and drop anything marked OPTIONAL that the extracted system doesn't need. Structure is modeled 1:1 on `design/ghibli-design/` — keep it, so every generated skill reads the same way.

Conventions carried into every artifact:
- Every value that isn't user-confirmed or source-derived keeps its tag: `(sampled)` or `(estimated)`
- `{{brand}}` is the kebab-case brand name from the interview; `{{Brand}}` the display form

## Template A — `{{brand}}-design/SKILL.md`

Target ≤ 80 lines. Canonical frontmatter — no `trigger:` field, no `license` (private project output).

````markdown
---
name: {{brand}}-design
description: Apply the {{Brand}} design system ({{one-line palette summary, e.g. "indigo + warm gray with amber accents"}}) to any project. Use when the user asks for "{{Brand}} design", "{{Brand}} theme", or wants this design language applied to a new or existing app, page, or component. Ships drop-in {{framework, e.g. Tailwind v4 + shadcn}} tokens, dark mode, typography, and component recipes.
metadata:
  author: {{author}}
  version: "1.0.0"
  generated-by: design-dna
  source: {{screenshots folder or URL}}, {{extraction date}}
---

# /{{brand}}-design

Apply the {{Brand}} design system to the current project. The system is: **{{identity summary — lead colors with hexes, neutral family, accent roles, page treatment, font, base radius, elevation style — one dense sentence like ghibli's}}**.

Files in this skill folder:

- `theme.css` — drop-in design tokens ({{framework}}, light + dark mode)
- `reference.md` — full spec: palette tables, typography, spacing, component recipes, do/don't, open gaps

## How to apply

Read `reference.md` first for any substantial styling work. Then pick the integration path:

### 1. {{Primary framework, e.g. Tailwind v4 + shadcn/ui}} (preferred)

Copy `theme.css` into the project and import it from the global CSS entry alongside `@import "tailwindcss";`. It uses standard shadcn variable names so components restyle automatically, plus named brand/accent utilities ({{e.g. `bg-brand`, `text-accent1`}}). If the project already has a theme file, **merge** the `:root`/`.dark` values — don't duplicate `@theme` mappings.

### 2. Tailwind v3

Translate the `:root`/`.dark` variables into `tailwind.config` `theme.extend.colors` entries pointing at CSS variables; keep the same token names.

### 3. Plain CSS / other frameworks

Use the `:root`/`.dark` blocks as custom properties directly; hexes live in `reference.md` §1.

### Typography

Load **{{Master Font}}** (weights {{weights}}) as the primary face. {{Loading snippet for the project's stack — next/font, Google Fonts link, or self-hosted @font-face.}} Fallback: {{fallback stack}}.

## Non-negotiables (the identity of the system)

<!-- The 4–6 user-blessed identity rules from the interview. Concrete and bannable, hexes inline. -->

1. **{{rule 1}}**
2. **{{rule 2}}**
3. **{{rule 3}}**
4. **{{rule 4}}**

## Verification

After applying, render a representative page (or a quick sample: card grid + form + headings{{+ chart if applicable}}) in light and dark mode. Check: {{the system's own signature checks — page vs card contrast, primary button color, accent semantics, border consistency}}.
````

## Template B — `{{brand}}-design/reference.md`

The guidelines doc. Every table carries a **Source** column: `confirmed` (user), `source-file`, `sampled`, or `estimated`.

````markdown
# {{Brand}} Design System — Full Reference

{{Two-sentence character summary: palette temperament, density, elevation style, where it came from.}}

Extracted by design-dna from {{N}} screenshots ({{folder or URL}}) on {{date}}.

## 1. Color palette

### Core brand colors

| Name | Hex | Role | Source |
|---|---|---|---|
| {{Brand primary}} | `{{#hex}}` | Primary buttons, links, active states | {{confirmed}} |
| {{Brand hover}} | `{{#hex}}` | Hover state for primary | {{sampled}} |
| {{Accent …}} | `{{#hex}}` | {{meaning}} | {{estimated}} |

**Semantic rule:** {{which color means success / warning / danger / info, and what raw red is reserved for}}.

### Neutrals

| Surface | Hex | Source |
|---|---|---|
| Page background | `{{#hex}}` | |
| Card | `{{#hex}}` | |
| Border/divider | `{{#hex}}` | |
| Body text | `{{#hex}}` | |
| Secondary text | `{{#hex}}` | |
| Muted text | `{{#hex}}` | |

### Dark mode

{{Extracted values, OR "Derived from the light palette (hues constant, lightness inverted) — labeled derived throughout", OR "Deferred — see Open gaps".}}

## 2. Typography

- **Font:** {{Master Font}} ({{source/foundry}}), weights {{list}}. Fallback: {{stack}}. Source: {{confirmed}}
- **Weights:** {{role map, e.g. 400 body, 500 emphasis, 600 labels/buttons, 700 headings}}
- **Sizes:** {{modular scale with roles, e.g. xs 12px labels · sm 14px body · … — ≤ 8 sizes}}
- {{Distinctive habits: all-caps labels? tight display tracking? heading color?}}

## 3. Spacing, radius, borders, shadows

- **Spacing:** {{base unit}} grid — {{rhythm sentence: card padding, grid gap, section gap}}
- **Radius:** base `{{value}}` — {{tier map: cards, buttons/inputs, pills}}
- **Borders:** {{width, token, usage rule}}
- **Shadows:** {{≤ 3 tiers with usage: default / dropdown / modal}}

## 4. Component recipes

<!-- One recipe per component actually observed. Class-string or CSS form, tokens not raw hexes. -->

### {{Component, e.g. Card}}

```
{{markup/class recipe}}
```

### {{Component, e.g. Buttons}}

{{variants and states — including which states were derived rather than observed}}

## 5. Charts (OPTIONAL — only if data-viz was observed)

{{Series color assignments, axis/chrome style, tooltip treatment.}}

## 6. Icons & imagery

{{Icon library + stroke/fill + sizes; illustration/photo style; empty-state treatment.}}

## 7. Do / Don't

- **Do** {{signature trait to preserve}}
- **Do** {{…}}
- **Don't** {{observed anti-pattern or rule violation}}
- **Don't** {{…}}

## 8. Open gaps

<!-- Everything still hypothesis. Keep even when empty so future sessions know it was considered. -->

| Gap | Current stand-in | How to resolve |
|---|---|---|
| {{e.g. Error states never observed}} | {{derived from coral, labeled}} | {{screenshot a form error, re-run design-dna}} |
````

## Template C — `{{brand}}-design/theme.css`

Mirror ghibli's `theme.css` structure exactly: `@layer base` with `:root` + `.dark` using standard shadcn variable names, named brand/accent tokens, then the `@theme` mapping block and radius math.

````css
/*
 * {{Brand}} design system — design tokens (Tailwind v4 CSS-first)
 *
 * {{One-line character summary.}}
 * Generated by design-dna from {{folder or URL}} on {{date}}.
 * Unconfirmed values are marked with their tag — see reference.md §8.
 *
 * Usage: import from your Tailwind v4 entry CSS, or paste the blocks into an
 * existing theme file. Uses standard shadcn variable names.
 */

@layer base {
	:root {
		--border: {{#hex}};
		--input: {{#hex}};
		--ring: {{#hex}};
		--background: {{#hex}};
		--foreground: {{#hex}};
		--primary: {{#hex}};
		--primary-foreground: {{#hex}};
		--secondary: {{#hex}};
		--secondary-foreground: {{#hex}};
		--destructive: {{#hex}};
		--destructive-foreground: {{#hex}};
		--muted: {{#hex}};
		--muted-foreground: {{#hex}};
		--accent: {{#hex}};
		--accent-foreground: {{#hex}};
		--popover: {{#hex}};
		--popover-foreground: {{#hex}};
		--card: {{#hex}};
		--card-foreground: {{#hex}};
		--radius: {{value}};

		/* Named brand/accent tokens — utility classes (bg-brand, bg-{{accent1}}, …) */
		--brand: {{#hex}};
		--brand-hover: {{#hex}};
		--brand-light: {{#hex}};
		--{{accent1}}: {{#hex}};
		--{{accent1}}-light: {{#hex}};
	}

	.dark {
		/* {{extracted | derived (hues constant, lightness inverted) — see reference.md}} */
		{{same variable set with dark values}}
	}
}

@theme {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-destructive-foreground: var(--destructive-foreground);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);

	--color-brand: var(--brand);
	--color-brand-hover: var(--brand-hover);
	--color-brand-light: var(--brand-light);
	--color-{{accent1}}: var(--{{accent1}});
	--color-{{accent1}}-light: var(--{{accent1}}-light);

	--radius-sm: calc(var(--radius) * 0.6);
	--radius-md: calc(var(--radius) * 0.8);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) * 1.4);
	--radius-2xl: calc(var(--radius) * 1.8);
}
````
