# Ghibli Brief — Full Reference

The manager-briefing anatomy rendered in the Ghibli design language: calm, film-toned, light. Structure and content rules are shared with `reports/gruvbox-brief-manager/`; this document owns the visual translation. Token source of truth: `design/ghibli-design/` (`confirmed`).

## 1. Color palette

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#f0f5f9` | Page wash (blue-tinted — never white) |
| `--surface` | `#ffffff` | Cards, tables, stat cells |
| `--surface2` | `#f8fafc` | Table headers, hover rows, code bg |
| `--brand-light` | `#e8f0f8` | Selected/active tints, icon chips |
| `--text` | `#1e293b` | Body text (max darkness) |
| `--dim` | `#475569` | Secondary text |
| `--faint` | `#94a3b8` | Tertiary: footer, markers |
| `--border` | `#e2e8f0` | The single border token, always 1px |
| `--brand` | `#3a6ea5` | **Hero**: eyebrows, h1 em, stat default, callout rails, links |
| `--brand-hover` | `#2d5a8a` | Hover/open states |
| `--brand-muted` | `#6b9bc3` | Informational stat variant (`.b`) |
| `--teal` / `--teal-light` | `#7bb3a8` / `#e6f3f1` | Good: live, improved, up-good |
| `--coral` / `--coral-light` | `#e08e6d` / `#fdf0eb` | Bad: blocked, declined, risk callouts |
| `--gold` / `--gold-light` | `#f9c270` / `#fef7e8` | Pending: staged, ready, notification |
| `--gold-dark` | `#c5922c` | Gold as *text* on white (contrast) |
| destructive | `#ef4444` | Raw red, destructive only — never status color |

**Semantic rule:** blue = brand/attention, teal = confirmed-good, coral = blocked/declining, gold = in-between states. Colored element = claim, never decoration.

**Atmosphere:** the wash itself plus two soft fixed radials (brand at 6%, teal at 5% alpha) from the top corners. No grid overlay — the terminal grid is gruvbox identity; ghibli stays soft. Both stripped in print.

## 2. Typography

- **Figtree** (300/400/600/700) — headings AND body. Ghibli rule: no display face; hierarchy comes from weight and size. Fallback: system UI stack.
- **JetBrains Mono** (400/500/800) — the instrument layer only: eyebrows, stat values/keys, badges, table headers, nav, footer, `.n` numbers in prose. Fallback: `ui-monospace`.

| Role | Face | Weight | Size | Notes |
|---|---|---|---|---|
| h1 | Figtree | 700 | `clamp(2.1rem, 6vw, 4rem)` | tracking −.03em, one `<em>` in brand blue |
| h2 | Figtree | 700 | `clamp(1.3rem, 3vw, 1.9rem)` | often `color: var(--brand)` (ghibli card-title habit) |
| Eyebrow | Mono | 500 | .68rem | .28em tracking, uppercase, brand blue, numbered |
| Lede | Figtree | 300 | `clamp(1.05rem, 2.2vw, 1.3rem)` | light weight is display-only |
| Body | Figtree | 400 | 1rem / .87–.98rem | strong = 600, stays `#1e293b` |
| Stat value | Mono | 800 | 1.6rem | default brand; `.g` teal, `.r` coral, `.b` brand-muted |
| Labels/badges | Mono | 500 | .6–.7rem | uppercase, tracked |

## 3. Component translation

Same inventory as the gruvbox brief; what changes:

- **Radii:** cards, lanes, callouts, details, `.wrap` tables → `0.75rem`; stat strip cells square inside a `0.75rem` clipped frame; badges → full pills (`border-radius:999px`); buttons `0.5rem`.
- **Elevation:** `shadow-sm` (`0 1px 2px rgba(15,23,42,.06)`) on every white block; nothing stronger — depth is wash-vs-white, not glow.
- **Stat strip:** same 1px-gap grid trick over `--border`; values default brand blue.
- **Badges:** `live` teal-light bg + teal-dark text `#4a8577`; `ready/staged` gold-light bg + `--gold-dark` text; `block` coral-light bg + coral-dark text `#b5593a`; `new` brand-light bg + brand text; `off` surface2 + faint. Tinted-surface chips (ghibli style), not alpha overlays (gruvbox style).
- **Flow steps / lanes / callouts:** 3px rails recolored — cycle brand → teal → gold → coral → brand-muted; callout default rail brand, `.r` coral. Lane rails: brand / gold / teal.
- **Details/FAQ:** summary in brand, open state brand-hover; `▸/▾` markers stay (they are briefing identity, not gruvbox identity).
- **Nav:** light blur `rgba(240,245,249,.93)`, hover = brand on brand-light.
- **Focus:** 2px brand outline on nav links, summaries, buttons.
- **Print:** palette is already paper-friendly — strip atmosphere/nav/copy-buttons, force white page, `break-inside:avoid` on blocks, `beforeprint` opens all details.

## 4. Report anatomy

Identical to `gruvbox-brief-manager` reference §5 — header (eyebrow · verdict h1 with one brand `<em>` · lede · stat strip) → numbered sections (principle / coverage / deep dive / data-to-action / blockers with named owners / FAQ) → footer with verification line. The template carries the skeleton; drop sections, keep order.

## 5. Content rules — the judge

Shared verbatim with `gruvbox-brief-manager` reference §6. The shortlist: every number traces to a source and header stats reappear with context; statuses honest (at least one admits `blocked`/`not started`); one "honest limit" callout; every blocker has a named owner; section titles are claims, not labels; the FAQ contains the uncomfortable question; a cheap "single next step" exists; no unmeasured hedge-prose; no credentials/identifiers if the file travels.

## 6. Do / Don't

- **Do** keep the wash-vs-white contrast visible in every viewport — it is the identity
- **Do** let weight carry hierarchy — Figtree 700 headings over 400 body, no second text face
- **Do** use tinted-surface chips (`*-light` bg + darkened text) for all badges
- **Don't** use bright gold `#f9c270` as text on white — `--gold-dark` exists for that
- **Don't** import the gruvbox grid overlay, hard-square corners, or shadow-free flatness — those are the other skin
- **Don't** use raw red for anything but destructive; coral owns "bad news"
