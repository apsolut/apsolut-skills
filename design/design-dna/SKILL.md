---
name: design-dna
description: Extract a complete, reusable design system from a folder of 10-20 product/brand screenshots — colors with roles, master font and type scale, spacing grid, radii, shadows, component recipes — and package it as a <brand>-design project skill (SKILL.md + reference.md + theme.css, Tailwind v4 + shadcn) so future sessions never need the screenshots again. Use when the user says "extract the design system from these screenshots", "turn these screenshots into a theme/skill/tokens", "build design tokens from my screenshots", "stop me having to re-show you how this looks", or points at a folder of UI screenshots and asks for guidelines, a palette, or a brand skill. Asks structured questions for anything ambiguous or missing.
license: MIT
metadata:
  author: apsolut
  version: "1.0.0"
---

# Design DNA

Distill a product's design DNA from screenshots into a durable design system. Input: a folder path (passed as the argument) holding 10–20 UI screenshots. Output: a `<brand>-design` skill folder in the target project, shaped exactly like [ghibli-design](../ghibli-design/) — a short SKILL.md router, a reference.md with the full spec tables, and a drop-in theme.css. After this runs once, the generated skill replaces re-showing screenshots forever.

Files in this skill folder:

- `reference.md` — the pipeline spec: extraction checklist, batching protocol, reconciliation rules, ground-truthing tiers, interview bank, output rules
- `output-template.md` — skeletons for the three generated artifacts
- `scripts/sample.mjs` — pixel sampler: exact hex at coordinates + dominant-palette swatches per screenshot (needs `npm i sharp`)

## The one rule

**Never present an estimated value as canonical.** Vision cannot eyedrop — every color, font, and size read from pixels is a hypothesis carrying a confidence tag until a source file, a measurement tool, or the user confirms it. The generated system must label every unconfirmed value. Precise-looking made-up hexes are worse than honest ranges.

## Process

### Step 1: Intake & ground truth

Validate the folder path, count and list the images. Then hunt for existing truth before trusting pixels (reference.md §4): CSS custom properties, Tailwind config, or brand assets in the target project; ask whether the UI is live at a URL or exists in Figma — if yes, exact values come from the DOM/Figma (Tier 0) and screenshots become the style-judgment source, not the value source.

### Step 2: Inventory pass

One fast pass over all images (§2): classify each (screen type, light/dark, breakpoint, states shown), build the coverage matrix and gap list. Never skip this — detail passes need to know what to look for.

### Step 3: Detail extraction

Work in batches of 3–5 images against the §1 checklist, recording every finding as `value · role · confidence · seen-in`. Never attempt full detail on 10+ images in one look. Where exact hexes matter and no Tier 0 truth exists, run `scripts/sample.mjs` (§4) on the coordinates you identified.

### Step 4: Reconciliation

Merge per-screenshot findings into one system (§3): cluster near-identical colors and assign every survivor a role, pick the master-font hypothesis, snap sizes to a modular scale, derive the spacing base unit, radius tiers, shadow tiers. Contradictions go to the interview queue.

### Step 5: Gap interview

Ask the user via AskUserQuestion (§5): mandatory set (canonical brand hexes, master font, brand name, dark mode) plus whatever the coverage matrix flagged. Max 2 rounds, never ask what a screenshot or file already answered.

### Step 6: Preview board

Before writing final files, render the reconciled system as a single-file HTML preview board (§7): palette swatches with Source tags, type ramp in the actual (or closest available) font, spacing/radius/shadow specimens, sample components built from the tokens, and the open-gaps list. The user approves or corrects against this — catching a wrong blue on a swatch board is cheap; catching it after the skill ships is not. If the `plan-board` skill is installed, use its HTML constraints; otherwise §7 is self-sufficient.

### Step 7: Generate deliverables

Load `output-template.md` and produce the three artifacts with confirmed + tagged values. Install per §6 — default `.claude/skills/<brand>-design/` in the target project. Re-runs update the existing skill, never fork a second one.

### Step 8: Verify

If the project can build, render a sample page (card grid + form + headings) against the tokens in light and dark mode. Otherwise walk one representative screenshot against the generated reference.md and confirm nothing contradicts.

## Deliverables

One skill folder, three files (the guidelines doc and the token drop are the skill's own parts):

- `<brand>-design/SKILL.md` — router with the system's identity summary and non-negotiables
- `<brand>-design/reference.md` — the guidelines: palette with roles and Source column, typography, spacing, component recipes, open gaps
- `<brand>-design/theme.css` — drop-in Tailwind v4 + shadcn tokens, light + dark

## Quality bar for this skill itself

Before delivering a generated design system, verify:

- [ ] Every hex is tagged `confirmed`, `source-file`, `sampled`, or `estimated` — no untagged values
- [ ] No palette color without a stated role; ≤ 10 chromatic tokens plus a neutral scale
- [ ] Type scale has ≤ 8 sizes and one master font (or one blessed display+body pair)
- [ ] Interview took ≤ 2 rounds and never asked something a screenshot already answered
- [ ] Generated SKILL.md is ≤ 80 lines with canonical frontmatter (no `trigger:` field)
- [ ] Preview board was rendered and user-approved (or the user explicitly said "just generate")
- [ ] Dark mode is extracted, derived-and-labeled, or explicitly deferred — never silently invented
- [ ] "Open gaps" section exists in the generated reference.md, even if empty
