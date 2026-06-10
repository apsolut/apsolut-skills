# Ghibli Design System — Full Reference

Muted, film-inspired palette: cornflower blue + slate base with teal/coral/gold accents. No saturated colors, generous whitespace, subtle elevation. Originated in apsolut v1, ported to shadcn/Tailwind v4 in apsolut v2.

## 1. Color palette

### Core brand colors

| Name | Hex | Role |
|---|---|---|
| Ghibli Blue | `#3a6ea5` | Primary. Headings, active states, primary buttons, links, brand color |
| Blue hover | `#2d5a8a` | Hover state for primary |
| Blue light | `#e8f0f8` | Selected/active backgrounds, secondary surfaces |
| Blue muted | `#6b9bc3` | Dark-mode primary; muted brand accents |
| Ghibli Teal | `#7bb3a8` | Success, positive sentiment, "you" in comparisons |
| Teal light | `#e6f3f1` | Success backgrounds, badges |
| Ghibli Coral | `#e08e6d` | Warnings, negative sentiment, due dates, alerts |
| Coral light | `#fdf0eb` | Warning backgrounds, badges |
| Ghibli Gold | `#f9c270` | Notifications, planning/pending states |
| Gold light | `#fef7e8` | Notification backgrounds, badges |

**Semantic rule:** teal = positive/success, coral = negative/warning, gold = pending/notification, blue = brand/neutral-active. Reserve raw red (`#ef4444`) for destructive actions only.

### Neutrals (slate scale)

Standard Tailwind slate: page background `#f0f5f9` (a blue-tinted wash, NOT white), sidebar `#f8fafc`, cards `#ffffff`, borders `#e2e8f0` (or light-blue `#d4e4f2` for brand-tinted borders), body text `#1e293b`, secondary text `#475569`, muted text `#94a3b8`.

The blue-tinted page background with white cards on top is a signature of the system — don't use a white page background.

### Dark mode

Deep slate base (`#0f172a` bg, `#1e293b` cards/borders), primary lightened to `#6b9bc3` for contrast. Accent hues (teal/coral/gold) stay identical; their `-light` variants become dark tinted surfaces (`#1f3b36`, `#3b251e`, `#3b2f17`).

## 2. Typography

- **Font:** Figtree (Google Fonts), weights 300/400/500/600/700, as `--font-sans`. Fallback: system UI stack. No custom display typeface — hierarchy comes from weight and size.
- **Weights:** 400 body, 500 emphasized, 600 subheadings/labels/buttons, 700 page headings.
- **Sizes:** xs 12px labels · sm 14px body/buttons · base 16px primary text · lg 18px card titles · xl 20px section headings · 2xl 24px page headings · 3xl 30px display.
- Card/section titles are often set in the brand blue: `text-lg font-semibold text-primary`.

Next.js font setup:

```tsx
import { Figtree } from "next/font/google";

const sansFont = Figtree({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-sans",
});
```

## 3. Spacing, radius, borders, shadows

- **Spacing:** 24px (`p-6`) card padding, 24px (`gap-6`) card grid gap, 32px (`mt-8`) between sections. Breathing room without sparseness.
- **Radius:** base `0.75rem` (12px). Cards/modals `rounded-xl`, buttons/inputs `rounded-md`/`rounded-lg`, pills & avatars `rounded-full`.
- **Borders:** always 1px, `border-border` (`#e2e8f0`); every structural element uses the same border. Brand-tinted dividers use `#d4e4f2`.
- **Shadows:** restrained. `shadow-sm` is the default for cards; `shadow-md` for dropdowns; `shadow-lg` only for modals/popovers. Nothing floats dramatically.

## 4. Component recipes

### Card (the workhorse)

```tsx
<div className="bg-card rounded-xl shadow-sm border border-border p-6">
	<h2 className="text-lg font-semibold text-primary">{title}</h2>
	{children}
	<div className="mt-4 pt-4 border-t border-border">{footer}</div>
</div>
```

### Metric card variants

Value color by meaning: primary → `text-primary`, success → `text-teal`, warning → `text-[#c5922c]` (darkened gold for contrast on white), danger → `text-coral`. Icon chip:

```tsx
<div className="p-2 rounded-lg bg-brand-light text-primary">{icon}</div>
```

Progress bars: track `bg-muted h-2 rounded-full overflow-hidden`, fill colored by state with `transition-all duration-500`.

### Tabs — three variants

1. **default** — segmented control: list `bg-[#d4e4f2]`, triggers `text-primary`, active `data-[state=active]:bg-white`
2. **pills** — `bg-muted p-1 rounded-lg inline-flex gap-1`, triggers `px-4 py-2 rounded-md`, active gets white bg + shadow-sm
3. **underline** — `px-4 py-2 rounded-t-lg`, active gets `border-b-2 border-primary text-primary`

### Layout

Double sidebar pattern: 48px icon rail + 200px expandable submenu; header bar carries search/notifications/user menu. Page content sits on the `#f0f5f9` wash with white cards.

## 5. Charts (Recharts / shadcn chart.tsx)

- Primary series: Ghibli Blue `#3a6ea5` (stroke + `fillOpacity={0.3}` for areas/radar)
- Comparison ("them" vs "you"): you = `#3a6ea5`, others = `#7bb3a8`
- Sentiment: positive = teal, neutral = slate gray, negative = red
- Axes: `tick={{ fill: "#666", fontSize: 11 }}`, `axisLine={false}`, `tickLine={false}` — minimal chrome
- Tooltips: card background + standard border, never black

shadcn `ChartConfig` (HSL form, light/dark aware):

```tsx
const config: ChartConfig = {
	primarySeries: {
		label: "…",
		theme: { light: "hsl(220 70% 50%)", dark: "hsl(220 80% 65%)" },
	},
	positive: { label: "Positive", theme: { light: "hsl(160 60% 40%)", dark: "hsl(160 60% 55%)" } },
	neutral: { label: "Neutral", theme: { light: "hsl(220 10% 60%)", dark: "hsl(220 10% 55%)" } },
	negative: { label: "Negative", theme: { light: "hsl(0 70% 50%)", dark: "hsl(0 75% 60%)" } },
};
```

## 6. Icons

Lucide React throughout, sized 16–20px, colored with the semantic tokens (`text-primary`, `text-teal`, `text-coral`). No custom illustration set — color does the storytelling.

## 7. Do / Don't

- **Do** use the blue-tinted `#f0f5f9` page background with white cards — it's the most recognizable trait.
- **Do** map meaning to accents consistently (teal good, coral bad, gold pending).
- **Do** keep shadows at `shadow-sm` by default.
- **Don't** introduce saturated/neon colors or pure-black text (`#1e293b` max darkness in light mode).
- **Don't** mix border colors — one border token everywhere.
- **Don't** use heavy display fonts; Figtree weights carry the hierarchy.
