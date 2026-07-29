# Gruvbox Brief — Full Reference

Warm terminal instrument panel for internal reports and briefings: Gruvbox dark, amber-led, mono-labeled, built to make numbers the protagonist. Extracted from the author's own report CSS (Tier 0 source), refined for print, readability, and keyboard access. §5 (anatomy) and §6 (the judge) are the shared spine of every `reports/*-brief-*` skill; the light sibling is `reports/ghibli-brief-manager/`.

## 1. Color palette

All Gruvbox dark. Source: `confirmed` (extracted from authored CSS).

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#1d2021` | Page background (hard dark) |
| `--surface` | `#282828` | Cards, tables, stat cells |
| `--surface2` | `#32302f` | Table headers, hover rows, inline-code bg |
| `--surface3` | `#3c3836` | Deepest step (rarely needed) |
| `--text` | `#ebdbb2` | Body text |
| `--dim` | `#a89984` | Secondary text, table headers, nav |
| `--faint` | `#7c6f64` | Tertiary: footer, markers |
| `--border` | `#3c3836` | The single border token, always 1px |
| `--gold` | `#fabd2f` | **Hero accent**: eyebrows, h1 em, stat values, callout rails, links-on-hover |
| `--green` | `#b8bb26` | Positive: live status, improved, up-good |
| `--red` | `#fb4934` | Negative: blocked, declined, risk callouts |
| `--blue` | `#83a598` | Informational: links, new/found, summaries |
| `--orange` | `#fe8019` | Warning-adjacent: ready/staged |
| `--pink` | `#d3869b` | Reserved lane accent (e.g. "Create") |
| `--aqua` | `#8ec07c` | Sixth accent — extra lane/flow rail when the five above are taken |
| `--gray` | `#928374` | Gruvbox's universal gray, identical in dark and print — de-emphasized chips |

**Semantic rule:** amber = brand/attention, green = confirmed-good, red = blocked/declining, blue = informational/new, orange = in-between states. Never use accents decoratively — a colored element is a claim.

**Atmosphere:** two fixed pseudo-element layers — radial washes (amber/blue/orange at 6–10% alpha from the corners) and a 32px × 32px grid of 3%-alpha lines at 35% opacity. Both `pointer-events:none`, both removed in print.

**Print = Gruvbox Light.** `@media print` remaps the same variables: bg `#fbf1c7`, surface `#f2e5bc`, surface2 `#ebdbb2`, text `#3c3836`, dim `#665c54`, border `#d5c4a1`, gold `#b57614`, green `#79740e`, red `#9d0006`, blue `#076678`, orange `#af3a03`, pink `#8f3f71`, aqua `#427b58`. Because every color flows through a variable, the whole page flips with one block.

### The canonical ladder ([morhetz/gruvbox](https://github.com/morhetz/gruvbox/blob/master/colors/gruvbox.vim))

Every token above is verbatim canonical gruvbox; when a new need arises, pick from the source ladder instead of inventing a shade:

- **Surfaces (dark):** `dark0_hard #1d2021` → `dark0 #282828` → `dark0_soft #32302f` → `dark1 #3c3836` → `dark2 #504945` → `dark3 #665c54` → `dark4 #7c6f64`. We use the first four; `dark2` is the spare step if a fourth surface is ever needed.
- **Surfaces (light/print):** `light0_hard #f9f5d7` → `light0 #fbf1c7` → `light0_soft #f2e5bc` → `light1 #ebdbb2` → `light2 #d5c4a1` → `light3 #bdae93` → `light4 #a89984`.
- **Accent tiers — the contrast rule:** each accent exists as `bright_*` / `neutral_*` / `faded_*`. **Bright on dark backgrounds, faded on light backgrounds** (exactly what our print remap does), `neutral_*` (e.g. yellow `#d79921`, blue `#458588`, aqua `#689d6a`) for large fills or borders where the bright tier would shout. Never put a `bright_*` accent on a light surface — that's the gruvbox equivalent of gold-text-on-white.

## 2. Typography

- **JetBrains Mono** (400/500/800) — all headings, eyebrows, labels, table headers, badges, nav, footer, and every number in prose (`.n`)
- **IBM Plex Sans** (200/400/600) — running text only
- Fallbacks: `ui-monospace, monospace` / `system-ui, sans-serif` — the page must survive without the webfonts (offline, CSP)

| Role | Face | Weight | Size | Notes |
|---|---|---|---|---|
| h1 | Mono | 800 | `clamp(2.1rem, 6.5vw, 4.6rem)` | `letter-spacing:-.045em`, line-height .98, one `<em>` in gold |
| h2 | Mono | 800 | `clamp(1.35rem, 3.2vw, 2.1rem)` | tracking −.03em |
| Eyebrow | Mono | 500 | .68rem | `.28em` tracking, uppercase, gold, numbered (`01 —`) |
| Lede | Sans | **200** | `clamp(1.05rem, 2.2vw, 1.35rem)` | thin weight is display-only |
| Body | Sans | **400** | 1rem / .87–.98rem | never 200 at body sizes — ghosts on dark |
| Strong | Sans | 600 | — | renders near-white (`#fff`) |
| Labels/badges | Mono | 500 | .6–.7rem | .1–.15em tracking, uppercase |
| Numbers in prose | Mono | 500 | inherit | wrap in `.n`, gold |

## 3. Layout & rhythm

- Content column `max-width: 64rem`, `1.5rem` side padding
- Sections: `3.2rem` vertical padding, separated by a 1px top border — rules, not cards, divide the page
- Header: `4.5rem` top padding; footer mono at .72rem with a verification line
- **Sticky nav**: mono uppercase .7rem links, blurred `rgba` backdrop, mirrors section eyebrows; `scroll-padding-top` matches its height
- Radii: 0 for structural blocks (sections, tables, lanes), 2–3px for badges/code/buttons only. **No shadows anywhere** — depth = surface steps
- Motion: single `rise` keyframe (fade + 18px translate), staggered ~.06–.07s via `--i`; fully disabled under `prefers-reduced-motion`
- Focus: visible `:focus-visible` outline in gold on nav links, summaries, and buttons

## 4. Component recipes

All live in `report-template.html` — copy from there, don't rebuild. Inventory and rules:

- **Stat strip** (`.stats`/`.stat`) — the signature. 1px-gapped grid over the border color; each cell: mono 800 1.6rem value (gold default; `.g`/`.r`/`.b` semantic variants) over a .62rem uppercase key. Header carries one strip; sections may repeat with local stats.
- **Flow steps** (`.flow`/`.step`) — numbered process cards, 3px left rail cycling gold → blue → pink → green → orange, mono step label + sans description.
- **Data tables** (`.wrap > table`) — `.wrap` owns the border and horizontal scroll; `min-width` on the table so columns never crush. Mono uppercase headers on `--surface2`, row hover, `.mono` cells for ids/owners.
- **Status badges** (`.b`) — mono .6rem uppercase chips: `live` (green), `ready`/`staged` (orange), `block` (red), `new` (blue), `off` (muted). Tinted bg at ~15% alpha + 35%-alpha border of the same hue.
- **Lanes** (`.lanes`/`.lane`) — 3-up comparison columns with 3px top rails (blue/pink/green), mono kicker under the lane title, gold list markers.
- **Callouts** (`.call`, `.call.r`) — 3px gold (or red) left rail, mono uppercase heading. Use for "the find", "the honest limit", "why X is deterministic" — one idea per callout.
- **Details/FAQ** (`details`/`summary`) — collapsible with mono `▸/▾` summary, blue → gold when open. Body copy inside `.dbody`. Print opens them all.
- **Copy button** (`button.cp`) — mono chip with clipboard JS and `✓ copied` feedback; pair with an id'd `<code>` value.

## 5. Report anatomy

The recurring skeleton — sections may drop, order holds:

1. **Header** — eyebrow (`Internal briefing · date · project`), h1 with exactly one gold `<em>` phrase, 1–2 sentence lede, muted sub, stat strip (4–6 numbers)
2. **01 · Principle** — the operating rule, often with a flow strip and one callout explaining a design decision
3. **02 · Coverage / current state** — honest status table ("'Live' means it runs unattended — nothing here is aspirational")
4. **03 · The machine / what exists** — inventory table with business-value column
5. **04 · Deep dive** — this period's discovery; "the find" callout, local stat strip, capability-by-question table
6. **05 · Data to action** — lanes (e.g. Predict · Create · Decide), closed by "the honest limit" callout
7. **06 · Blockers** — table: blocker / what it costs us / what's needed / **named owner**; red callout for the cheapest unlock
8. **07 · FAQ** — `details` blocks answering the questions the audience will actually ask, including "what's the single next step?"
9. **Footer** — generation date + verification line ("figures verified live against X on that date") + companion-doc pointers

## 6. Content rules — the judge

The look only lands if the writing holds. Before shipping, every check passes:

- [ ] Every number traces to a source; the header stats each reappear in a section with context
- [ ] Statuses are honest — at least one badge admits `blocked`/`not started`; no aspirational "live"
- [ ] One "honest limit" (or equivalent) callout exists — what this does NOT do
- [ ] Every blocker names an owner (a role or person, not "the team")
- [ ] Section titles are claims ("We were using two of seventeen capabilities"), not labels ("Tool Analysis")
- [ ] Tables answer a question a manager would ask, phrased as that question where it helps
- [ ] The FAQ contains the uncomfortable question, answered plainly
- [ ] A concrete "single next step" exists and is cheap
- [ ] No hedge-prose: "significantly improved" without a number gets cut or measured
- [ ] If the file travels: no credentials, internal hostnames, or personal identifiers

## 7. Do / Don't

- **Do** lead the h1 with a verdict ("We stopped guessing. Now we act on data.") — the report argues, then proves
- **Do** keep amber scarce enough to stay loud — if everything glows gold, nothing does
- **Do** use `details` to bury depth instead of deleting it — scanners scroll, skeptics expand
- **Don't** add shadows, gradients-as-decoration on components, or rounded cards — flat and bordered is the identity
- **Don't** let body text go thin (200) or gray below `--dim` — legibility outranks elegance
- **Don't** ship a report with real secrets/identifiers into any shared or public location — the template carries placeholders for a reason
