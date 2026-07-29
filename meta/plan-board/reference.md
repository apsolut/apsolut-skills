# Plan Board — Reference

Block vocabulary, quality rules, and HTML constraints for building plan boards. Adapted from BuilderIO/skills `visual-plan` (MIT) — the concepts survive; the hosted app, MDX kit, and MCP connector are replaced by one self-contained HTML file.

## 1. Block vocabulary

A board is composed from these blocks, in roughly this order. Every block is optional except Summary, Steps, and Open Questions.

| Block | What it renders | Rules |
|---|---|---|
| **Summary header** | Title, one-paragraph outcome statement, "done means" criteria | Outcome-focused prose, not a feature list |
| **Snapshot** | One concrete example of the end state (a mock screen region, a sample payload, a CLI transcript) | For broad/strategic plans, put this near the top — orient before architecture |
| **Scope & non-goals** | Two short lists | Non-goals are mandatory when anything adjacent could be assumed in |
| **File map** | Tree of files touched, tagged `new` / `edit` / `delete` | Real paths only; group by area, not alphabetically |
| **Diagram** | Architecture, dependency, or data-flow figure as inline SVG or nested flex/grid boxes | Only when relationships are the point; a 3-box flow beats a 12-box mural |
| **Ordered steps** | Numbered implementation sequence naming real files, symbols, data shapes | Each step independently checkable; no "make it work" steps |
| **Code: before/after** | Side-by-side or stacked `<pre>` blocks with the key change highlighted | Real code from the repo on the "before" side, ≤ 30 lines a side |
| **Annotated code** | A code block with margin notes anchored to lines | Use when *why* matters more than *what changed* |
| **Data shapes / API** | Type or endpoint tables (method, path, request, response) | Shapes are hard-to-reverse bets — always surface them |
| **Risks & verification** | What could go wrong; how done-ness is checked end-to-end | Verification = real workflows (run the app, open the page), not just "tests pass" |
| **Open Questions** | The decision form: each question with options and a recommended default | Exactly one, always last — see §2 |
| **Wireframe** (UI plans) | Grayscale semantic-HTML screen regions — boxes, labels, hierarchy | Structure only: no brand styling, no real palette, no logos |

## 2. Document quality rules

- **Standalone.** No "as discussed", no "see above conversation". Cold-open comprehensible.
- **Serious document, not marketing.** No hero art, logos, slogans, or adjective-driven prose. The board convinces with file paths and data shapes.
- **Right altitude.** Separate the reusable core from the motivating example. Use one concrete case to make the plan legible, then mark what is primitive vs adapter vs future work.
- **Include:** objective + done criteria, scope and non-goals, approach with the key decisions *and their rationale*, ordered steps naming real files/symbols/shapes, risks, verification.
- **Exclude:** vague steps, redundant visuals (a diagram restating the file map), anything the reviewer can't act on.
- **Open Questions protocol.** All unresolved decisions live in the single bottom block — never scattered, never duplicated. Each question ships options and a recommended default so "approve with defaults" is one decision. Prose may point down ("two decisions open — see Open Questions") but never restates them.
- **Diagrams earn their place.** Only for architecture/dependencies/flow. Standard top-to-bottom or left-to-right 2D layouts; label every box; no decorative arrows.

## 3. HTML authoring constraints

One file, no dependencies — it must render from disk, offline, forever. Start from `board-template.html` in this skill folder (token block, dark override, and one skeleton per §1 block are pre-built); the rules below are what the template already obeys and what your edits must preserve:

- Inline all CSS in a single `<style>` block; no external fonts, scripts, images, or CDN anything. System font stack (`ui-sans-serif, system-ui, sans-serif`; `ui-monospace, monospace` for code).
- All colors via CSS custom properties defined once in `:root`, with a `@media (prefers-color-scheme: dark)` override block. Never hardcode a color outside the token block — this is what makes the §4 dark-mode check pass mechanically.
- Semantic markup: `<header>`, `<section>` per block, `<nav>` mini table-of-contents when the board exceeds ~4 screens. Wide content (tables, diagrams, code) scrolls inside its own `overflow-x: auto` container.
- Wireframes are grayscale by design — borders, fills at 5–10% foreground opacity, real label text. They show structure, not styling.
- Keep it printable: no fixed-position chrome, sensible page flow.
- Naming: `NNN-<slug>.html` (next free number) in the target folder, matching the vault's numbered-note habit.

**Placement order:** `.apsolut/03-plan/` if the vault exists → `docs/plans/` if the project keeps docs in-repo → session scratchpad (tell the user it's ephemeral). Offer an Artifact publish when the user wants to review on another device or share — the file is already self-contained, so it publishes as-is.

## 4. Pre-handoff checklist

Open the file (or render it mentally section by section) and verify before telling the user it's ready:

- [ ] No overlapping elements, no giant dead whitespace, no clipped code blocks
- [ ] Dark mode: readable in both schemes — no white panels burning through dark, no dark-on-dark text
- [ ] Every diagram legible at 100% zoom; labels don't overflow their boxes
- [ ] All colors come from the `:root` token block
- [ ] File opens correctly from disk (no network-dependent anything)
- [ ] Open Questions block is last, complete, and each question has a recommended default

## 5. Relation to the original

BuilderIO's `visual-plan` renders MDX through their hosted Plans app with commenting and feedback threads (`npx @agent-native/skills@latest add --skill visual-plan`). Install it alongside this skill if you want the hosted review surface — the two coexist; this one exists for zero-dependency, local-first, vault-native planning. Feedback here flows through the conversation and Step 6's fold-back instead of comment threads.
