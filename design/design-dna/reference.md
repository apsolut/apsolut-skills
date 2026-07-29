# Design DNA — Pipeline Reference

The full spec for turning a folder of screenshots into a `<brand>-design` skill. SKILL.md routes here; each § below is one stage of the pipeline.

## 1. Per-screenshot extraction checklist

Run this fixed list against every image in the detail pass. Record each finding as:

```
value · role · confidence (high/med/low) · seen-in (filenames)
```

Example: `#2f6fed (est.) · primary button fill · high · dashboard.png, settings.png`

**Color**
- Page background, sidebar/nav background, card/surface backgrounds — note tint (pure white? warm? cool wash?)
- Text tiers: heading, body, secondary, muted/placeholder — estimated hex + where each appears
- Brand color(s) and every place they appear (buttons, links, active states, logo)
- Accent colors and their apparent meaning (success, warning, danger, info, decorative)
- Border/divider color and weight; focus ring color

**Typography**
- Font family hypothesis with letterform tells: single vs double-story `a`/`g`, terminal shapes (cut vs rounded), x-height, aperture width, mono/sans/serif, geometric vs humanist
- Weights in use and their roles (body / emphasis / headings / buttons)
- Size + line-height estimates per text role; letter-spacing anomalies (all-caps labels, tight display)

**Geometry & elevation**
- Spacing rhythm: card padding, grid gaps, section gaps, form field spacing
- Border radii per component class (cards vs buttons vs inputs vs pills vs avatars)
- Shadow presence and tiers: which components float, how far, hard or soft

**Components** (for each visible: button, input, card, tab, nav, table, badge, modal)
- Anatomy: padding, height, icon placement, label casing
- States visible in this shot: hover, focus, active, disabled, error, loading, empty

**Layout & voice**
- Content max-width, column count, sidebar widths, header height
- Iconography: library guess (Lucide? Heroicons? custom?), stroke vs fill, sizes
- Imagery/illustration style; data-viz style if present
- Motion hints: skeletons, spinners, transition suggestions in blurred/mid-state shots
- Microcopy tone: terse vs friendly, casing conventions

## 2. Batching protocol

**Pass 1 — inventory (all images, fast).** Read every image once, shallowly. For each: filename, screen type (dashboard / form / marketing / settings / mobile / …), light or dark, breakpoint guess, notable states shown. Build the coverage matrix:

| Coverage question | Yes/No → which file |
|---|---|
| Form with inputs visible? | |
| Error / destructive state? | |
| Empty state? | |
| Dark mode? | |
| Mobile / narrow breakpoint? | |
| Marketing vs app surfaces? | |
| Data viz / charts? | |
| Hover/focus states captured? | |

Every "No" row is a candidate interview question (§5) — never silently invent what was never seen.

**Pass 2 — detail (batches of 3–5).** Run the §1 checklist per image. Append findings to a working table kept in-conversation; for >15 images write it to a session scratchpad file instead so nothing is lost between batches. Rule: never attempt full-detail extraction of 10+ images in one look — the inventory pass exists so detail passes know what to look for.

## 3. Reconciliation rules

Merge per-screenshot findings into one coherent system:

**Colors**
- Cluster estimates that share a hue family within one lightness step — they are the same token seen through different rendering/compression
- Target ≤ 10 chromatic tokens plus one neutral scale. Assign every survivor a role: page wash, card, border, text tiers, brand, brand-hover, brand-light, accents, semantics. A color with no role dies
- Conflicting brand estimates across screenshots → keep the cluster centroid, mark low confidence, queue for interview (§5)

**Typography**
- Commit to one master-font hypothesis, or one display+body pair if the evidence clearly splits (marketing vs app)
- Snap observed sizes to a modular scale (12/14/16/18/20/24/30-style); ≤ 8 sizes
- Map weights to roles (body / emphasized / labels-buttons / headings)

**Spacing** — infer the base unit from the greatest common divisor of repeated gaps; snap to a 4px grid; express as a rhythm sentence ("24px card padding, 24px grid gap, 32px between sections")

**Radii** — ≤ 4 tiers derived from a single base value (see ghibli's `--radius` math). **Shadows** — ≤ 3 tiers with usage rules (default / dropdown / modal)

**Components** — consolidate per-screenshot anatomy notes into one recipe per component; contradictions (two button paddings, two card radii) → interview queue, don't average silently

## 4. Ground-truthing tiers & confidence policy

Vision estimates colors with perceptual error — it cannot eyedrop. Get exact values from the best available tier:

**Tier 0 — source of truth (exact).** Check these before trusting any pixel:
- Target project files: CSS custom properties, Tailwind config, existing theme/token files, brand assets — these override estimates without asking
- Live URL: read computed styles directly (browser tooling / a JS snippet over `getComputedStyle` and `document.styleSheets`), or run a one-command extractor such as `npx`-run [extract-design-system](https://github.com/arvindrk/extract-design-system) (W3C tokens.json + tokens.css) or [dembrandt](https://github.com/dembrandt/dembrandt)
- Figma: if designs live there and a Figma MCP is connected, variable definitions are exact tokens

When Tier 0 exists, screenshots demote to the style-judgment source (roles, rhythm, tone) — values come from the source.

**Tier 1 — shipped pixel sampler (exact pixels, screenshot-only).** When only screenshots exist and a Node runtime is available, run the sampler this skill ships at `scripts/sample.mjs` (needs sharp: `npm i sharp` once, in the scratchpad or any temp dir — not in the target project unless it already uses Node):

```bash
node scripts/sample.mjs dashboard.png            # 12 dominant swatches with coverage %
node scripts/sample.mjs dashboard.png 340 210    # exact hex at x,y (repeatable pairs)
```

Workflow: identify the semantic target visually ("primary button fill in `dashboard.png`, roughly x=340 y=210"), sample the exact pixel (sample flat fills away from edges — anti-aliasing lies), and tag the result `sampled`. The no-coords mode prints a quantized dominant palette per screenshot to cross-check clustering. Sampling gives *precision*; role assignment stays model work.

**Tier 2 — vision estimate.** No runtime, no source: estimate, tag `estimated`, and put the value on the interview list.

**Precedence:** `source-file > sampled > user-confirmed > high-confidence estimate > derived`. Every table in the generated reference.md carries a Source column with one of these tags. Low-confidence values that survive to output are marked `(estimated)` and listed under Open gaps. (Dedicated color MCPs exist — e.g. coolors-mcp — but are immature as of mid-2026; treat as optional future upgrade, not a dependency.)

## 5. Interview question bank

Batch via AskUserQuestion. **≤ 2 rounds, ≤ 4 questions each, every question ships a sensible default.** Never ask what a screenshot, a source file, or a sampled pixel already answered.

**Mandatory (always ask):**

1. **Canonical brand hexes** — present the clustered/sampled estimates as the default option ("use these values"), plus "I'll paste exact values" and "there's a brand file / style guide at …"
2. **Master font** — state the hypothesis with its letterform evidence; ask for exact name, weights owned/licensed, and the fallback stack
3. **Brand/system name** — drives the `<brand>-design` folder and skill name
4. **Dark mode** (when unseen in the matrix) — derive-and-label / skip for now / user supplies values

**Conditional (only when the §2 coverage matrix shows the gap):**

- Semantic colors unseen (success/warning/destructive): derive from the palette and label, or user supplies
- Missing component states (error, disabled, empty, mobile): derive-and-label or defer to Open gaps
- Framework target if not detectable from the project — default Tailwind v4 + shadcn (ghibli's path)
- Output location if the target has no `.claude/` directory (§6 fallbacks)
- **Non-negotiables blessing**: propose 4–6 identity rules extracted from the evidence (the ghibli "blue-tinted page, never white" analogue) and have the user confirm or edit them — these become the generated skill's Non-negotiables section

## 6. Output & installation

**Placement.** Default: `.claude/skills/<brand>-design/` in the target project — it becomes a live `/<brand>-design` command with zero wiring, travels with the repo, and keeps private brands out of any public skill collection. Fallbacks: `~/.claude/skills/` when the user wants it across projects; a repo `design/` category folder only when the target *is* a skill collection.

**Files.** Generate all three from `output-template.md`: SKILL.md (Template A), reference.md (Template B), theme.css (Template C). The theme.css may additionally be *copied* into the app's CSS entry per the generated SKILL.md's integration instructions — the skill folder stays the source of truth.

**Re-runs.** Running design-dna again with new screenshots **updates** the existing `<brand>-design` skill: diff new findings against the recorded system, resolve conflicts (interview if needed), bump `metadata.version`, and update Open gaps. Never fork a second skill for the same brand.

**Verification (Step 8).** Preferred: build a sample page in the target project — card grid, one form, heading stack, one chart if the system has data-viz — and render it in light and dark mode; check page-vs-card contrast, primary button color, accent semantics, border consistency. Fallback: pick the most representative screenshot and walk the generated reference.md against it section by section — any contradiction is a bug in the extraction, not in the screenshot.

## 7. Preview board (Step 6)

Render the reconciled system as one self-contained HTML file the user reviews *before* final generation. This is the approval gate: corrections land on swatches, not on a shipped skill. (Concept from BuilderIO's visual-plan; the `plan-board` skill in this collection carries the full HTML constraints — one file, inlined CSS, no external requests, light + dark via `prefers-color-scheme`, colors only through `:root` custom properties — and ships `board-template.html` as a starting skeleton. For this board, replace the template's neutral tokens with the extracted palette itself: the board should be the first thing ever rendered in the new system.)

Board sections, top to bottom:

1. **Identity line** — the one-sentence system summary that will head the generated SKILL.md
2. **Palette** — one swatch per token: color chip, name, hex, role, and its Source tag (`confirmed`/`source-file`/`sampled`/`estimated`) rendered as a small badge; `estimated` badges visually loud (this is what the user is here to correct)
3. **Type ramp** — every size/weight role set in the master font if loadable locally, else the fallback stack with a note; show real UI strings, not lorem
4. **Geometry specimens** — spacing scale bars, radius tiles, shadow tiles, one bordered divider
5. **Component samples** — the observed components (button variants + states, input, card, badge, tabs) built purely from the proposed tokens
6. **Dark mode** — same board sections in the derived/extracted dark values (side-by-side or scheme-switched)
7. **Open questions & gaps** — the §5 interview leftovers and §2 coverage gaps, each with the current stand-in and a recommended default, as the single last section

Write to the target project's scratchpad or `.apsolut/03-plan/` if the vault exists; tell the user the path; fold their corrections back into the working table before Step 7 generation. Skip the board only if the user explicitly says "just generate".
