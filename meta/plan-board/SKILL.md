---
name: plan-board
description: Render an implementation plan (or any proposal — a design system, a migration, a refactor) as a single-file interactive HTML board the user reviews and approves before any code is written. Use when the user says "visual plan", "plan board", "make this plan reviewable", "render the plan", "show me the plan properly", or when a plan is substantial enough that burying it in chat would waste it. Self-contained port of the visual-plan concept — no hosted app, no MCP: one HTML file with inlined CSS, dark-mode-aware, plus optional Artifact publish for sharing.
license: MIT
metadata:
  author: apsolut
  version: "1.0.0"
---

# Plan Board

Turn a plan that deserves real review into a visual surface instead of a wall of chat text. Output: one self-contained HTML file — summary, file map, diagrams, before/after code, and a single Open Questions section — that the user opens, scans, and approves before implementation starts. Concept ported from [BuilderIO/skills](https://github.com/BuilderIO/skills) `visual-plan` (MIT), rebuilt dependency-free.

Files in this skill folder:

- `reference.md` — block vocabulary, document-quality rules, HTML authoring constraints, pre-handoff checklist
- `board-template.html` — starter single-file board: token block with dark mode, one skeleton per block type

## The one rule

**The board must stand alone.** A reviewer who opens the file cold — no chat history, no prior context — must understand what is being built, why, what it touches, and what is still undecided. If understanding the board requires the conversation that produced it, the board has failed.

## Process

### Step 1: Research before drafting

Inspect the actual codebase: real file paths, real symbols, existing patterns to reuse. A plan naming invented files is fiction. Decide hard-to-reverse bets (data shapes, wire formats, boundaries) now — they are what review exists to catch.

### Step 2: Gate — does this deserve a board?

Boards are for plans with real review value: multi-file changes, architecture decisions, anything with open questions, design systems, migrations. A one-sentence fix gets a sentence, not a board. When in doubt and the user asked for it, build it.

### Step 3: Compose from the block vocabulary

Author the board using the blocks in reference.md §1 — summary header, scope & non-goals, file map, diagram, ordered steps naming real files, before/after code, risks & verification, and exactly one Open Questions block at the bottom. Pick blocks deliberately (§2); skip any block with nothing real to show.

### Step 4: Build the single-file HTML

Start from `board-template.html` — copy it, keep its token block and section skeletons, delete unused blocks. One file, inlined CSS, no external requests, semantic markup, light + dark via `prefers-color-scheme`, all colors through CSS custom properties (§3). Write it to `.apsolut/03-plan/` when the vault exists, else `docs/plans/`, else the session scratchpad.

### Step 5: Deliver and hold

Run the pre-handoff checklist (§4), tell the user the file path (and offer an Artifact publish if sharing/review-on-another-device helps). Then stop — the board *is* the approval gate. No implementation until the user answers the open questions and says go.

### Step 6: Fold feedback back in

The user's answers and comments update the board file in place (answered questions move from Open Questions into the decisions they resolved). The board ends as the record of what was agreed, not a stale draft.

## Deliverables

- One self-contained `.html` plan board at a stated path
- Updated in place as feedback lands; final state = the agreed plan

## Quality bar for this skill itself

Before handing the board to the user, verify:

- [ ] Comprehensible standalone — no reference to "as discussed" or chat context
- [ ] Every file path and symbol named in the board exists in the repo (or is explicitly marked new)
- [ ] Exactly one Open Questions block, at the bottom — no questions scattered elsewhere
- [ ] Scope AND non-goals both present
- [ ] Renders correctly in light and dark; no hardcoded colors outside the token block
- [ ] Zero external requests (fonts, scripts, images) — file works offline
- [ ] No marketing dressing: no hero art, no logos, no adjectives doing the work of facts
