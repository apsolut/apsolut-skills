---
name: gruvbox-brief-manager
description: Apply the Gruvbox manager-briefing design system (dark terminal instrument panel — warm amber/green/red on deep umber, JetBrains Mono display + IBM Plex Sans body, stat strips, honest status badges, numbered sections) to any internal report, briefing, or status page. Use when the user asks for "my report style", "gruvbox brief", "manager report/briefing", "dark briefing page", or wants a report/status HTML that looks authored instead of generic AI output. Ships a complete report-template.html plus content rules that make the report read authored, not generated.
license: MIT
metadata:
  author: apsolut
  version: "1.1.0"
---

# /gruvbox-brief-manager

Apply the apsolut report system to a new report. The look is a **warm terminal instrument panel**: Gruvbox dark palette (amber `#fabd2f` accent on `#1d2021`/`#282828` umber surfaces), JetBrains Mono for display/labels/numbers, IBM Plex Sans for body, a faint 32px grid overlay with radial washes, numbered sections with uppercase mono eyebrows, stat strips, honest status badges, and a details-based FAQ. Dark by design — print flips to Gruvbox Light automatically.

Files in this skill folder:

- `report-template.html` — the complete single-file template: full CSS plus one skeleton section per component; copy, rename, replace `{{…}}`
- `reference.md` — full spec: palette, typography, report anatomy, component recipes, content rules (the anti-slop judge), do/don't

Sibling style: [`reports/ghibli-brief-manager/`](../ghibli-brief-manager/) — same anatomy and judge in the light Ghibli palette. Pick by audience/mood: gruvbox reads technical-operator, ghibli reads calm-product.

## How to apply

1. Copy `report-template.html` to the destination (reports are usually private — `.apsolut/03-plan/`, an internal docs folder, or wherever the team keeps briefings; **never a public repo with real data**).
2. Read `reference.md` §5–6 before writing content — the anatomy and the content rules are as much the identity as the palette.
3. Fill the skeleton: header (eyebrow · date · h1 with one `<em>` accent · lede · stat strip), numbered sections, blockers table with named owners, FAQ, footer with verification line.
4. Delete unused component blocks; never invent new visual patterns when a recipe in §4 fits.

The file is self-contained except the two Google Fonts; the stacks fall back to `ui-monospace`/system sans, so it degrades cleanly offline or under a strict CSP.

## Non-negotiables (the identity of the system)

1. **Gruvbox dark, amber-led.** Page `#1d2021`, cards `#282828`, amber `#fabd2f` as the one hero accent. Green/red/blue/orange/pink only as semantic colors, never decorative.
2. **Two typefaces, strict roles.** JetBrains Mono: headings, eyebrows, labels, numbers, badges. IBM Plex Sans: running text. Numbers in prose always mono via `.n`.
3. **Numbered mono eyebrows** (`01 — The operating principle`) over every section; sticky mono nav mirrors them.
4. **Every stat in a stat strip**, never in prose-only form; movement colored semantically (green up-good, red down-bad).
5. **Honest status badges** — `live`, `staged`, `found unused`, `blocked`, `not started`. A status that flatters is a lie; "not started" is a valid badge.
6. **Flat, bordered, square-ish.** 1px `#3c3836` borders, 0–3px radii, no shadows — elevation comes from surface steps, not glow.
7. **Thin weight is display-only.** Lede/h1 may use weight 200; body text stays 400 — 200 at small sizes on dark ghosts out.

## Verification

Render the finished report and check: dark identity intact (no stray light surfaces), print preview shows the Gruvbox Light remap (readable on paper), every number in the header stat strip appears again with context in a section, all status badges truthful, keyboard focus visible on nav/summary/buttons, and no real credentials or internal identifiers if the file will travel.
