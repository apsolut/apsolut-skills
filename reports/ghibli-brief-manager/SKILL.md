---
name: ghibli-brief-manager
description: Apply the Ghibli manager-briefing design system (calm light instrument panel — cornflower blue on a blue-tinted page wash with white cards, teal/coral/gold semantic accents, Figtree body + JetBrains Mono labels, stat strips, honest status badges, numbered sections) to any internal report, briefing, or status page. Use when the user asks for "ghibli brief", "light report/briefing", "manager report in ghibli style", or wants a calm, product-toned report that looks authored instead of generic AI output. Ships a complete report-template.html plus the same anti-slop content rules as gruvbox-brief-manager.
license: MIT
metadata:
  author: apsolut
  version: "1.0.0"
---

# /ghibli-brief-manager

Apply the Ghibli briefing system to a new report. Same skeleton as `/gruvbox-brief-manager` — verdict h1, stat strip, numbered mono eyebrows, honest badges, blockers with owners, FAQ — rendered in the [ghibli-design](../../design/ghibli-design/) language: **blue-tinted page wash `#f0f5f9` with white cards, cornflower blue `#3a6ea5` as the hero accent, teal/coral/gold as meaning, Figtree for text with JetBrains Mono kept only for the instrument layer** (labels, numbers, badges), 12px radii, `shadow-sm` elevation.

Files in this skill folder:

- `report-template.html` — the complete single-file template; copy, rename, replace `{{…}}`
- `reference.md` — palette + typography + component translation, report anatomy, the content judge

Sibling style: [`reports/gruvbox-brief-manager/`](../gruvbox-brief-manager/) — same anatomy in the dark Gruvbox terminal look. Pick by audience/mood: ghibli reads calm-product, gruvbox reads technical-operator.

## How to apply

1. Copy `report-template.html` to the destination (filled reports are private — `.apsolut/03-plan/` or internal docs, never a public repo with real data).
2. Read `reference.md` §4–5 before writing — the anatomy and the judge are the identity as much as the palette.
3. Fill the skeleton; delete unused component blocks; never invent new visual patterns when a recipe fits.

## Non-negotiables (the identity of the system)

1. **Blue-tinted page wash `#f0f5f9` with white cards — never a white page.** The wash is the single most recognizable trait.
2. **Cornflower blue `#3a6ea5` is the hero**: eyebrows, h1 em, default stat values, callout rails. Semantic accents carry meaning only — teal = good/live, coral = blocked/declining, gold = pending/staged. Raw red `#ef4444` for destructive only.
3. **Figtree carries the text, mono carries the instruments.** Headings and body in Figtree (weight makes hierarchy, no display face); JetBrains Mono only for eyebrows, stat values/keys, badges, table headers, nav, `.n` numbers.
4. **12px base radius and `shadow-sm`** — cards/lanes/callouts `0.75rem`, badges full pills, nothing floats dramatically.
5. **One border token** `#e2e8f0`, always 1px.
6. **Gold never as text on white** — use its darkened form `#c5922c` for gold text; the bright `#f9c270` lives in chips and fills.
7. **Honest status badges** — `live`, `staged`, `found unused`, `blocked`, `not started`; a status that flatters is a lie.

## Verification

Render and check: page wash vs white cards visible (not a white page), blue hero scarce enough to stay loud, accent semantics correct (teal good / coral bad / gold pending), gold text always darkened, print clean (atmosphere and nav stripped, details expanded), keyboard focus visible, no real credentials if the file travels.
