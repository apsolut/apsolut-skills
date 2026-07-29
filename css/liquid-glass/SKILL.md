---
name: liquid-glass
description: Apply an Apple-style "liquid glass" refractive surface to a UI element — SVG displacement-map refraction with chromatic aberration on Chromium, graceful frosted-glass fallback everywhere else. Use when the user asks for "liquid glass", "glass effect", "glassmorphism", "frosted/refractive surface", or wants a floating pill nav, hero chip, or media overlay with a glass look. Ships drop-in CSS with tiered browser support, a feature detect, and a self-contained demo.
license: MIT
metadata:
  author: apsolut
  version: "1.0.0"
---

# /liquid-glass

Give an element a liquid-glass surface: the backdrop refracts through an SVG displacement map with per-channel chromatic aberration (the "lens" look), wrapped in inset highlights that read as a polished rim. Where the refractive tier isn't supported, the same class degrades to a clean frosted glass — never a broken transparent box.

Files in this skill folder:

- `liquid-glass.css` — the component class, tokens, and both tiers
- `liquid-glass.html` — self-contained demo: SVG filter definition, feature detect, pill + card examples on a gradient background

## The one rule

**Glass is a surface, not a container for reading.** Refraction and frost sit under short labels, icons, numbers, nav pills, media controls — never under paragraphs. If body text needs to sit on it, raise `--glass-frost` until contrast passes, or don't use glass.

## How to apply

1. Copy the `<svg class="liquid-glass-defs">` block from `liquid-glass.html` into the page **once** (it defines `#liquid-glass-filter`; duplicate IDs break every instance).
2. Copy `liquid-glass.css` into the project (or paste the block into the global CSS).
3. Add `class="liquid-glass"` to the element, plus a recipe class for the part you're building. It sizes to its content — no fixed width/height; the radius token defaults to a pill.
4. Add the 4-line feature detect from the demo (or the `liquid-glass--refract` class manually) to enable the refractive tier where it renders.
5. Tune with the tokens: `--glass-frost` (backdrop darkening 0–1), `--glass-saturation`, `--glass-blur` (fallback tier), `--glass-radius`.

## Recipes — parts on the base surface

The base class is the material; recipes are the parts. Current set (grows over time — add recipes to `liquid-glass.css`, never fork the base):

| Recipe | Class | Notes |
|---|---|---|
| Button / pill | `.liquid-glass .liquid-glass-btn` | Interactive: hover tint, press scale, focus ring, pointer-events on |
| Card | `.liquid-glass .liquid-glass-card` | Carries text → frost raised to 0.25, radius softened |
| (later) floating nav, media overlay, input | — | Same pattern: recipe class sets padding/frost/radius, base does the glass |

## Browser support — the part that matters

| Tier | What renders | Where |
|---|---|---|
| Refractive (`.liquid-glass--refract`) | SVG displacement + chromatic aberration + saturation | Chromium (Chrome, Edge, Arc, Brave…) |
| Frosted (baseline `.liquid-glass`) | `blur() saturate()` + frost + rim highlights | Safari, Firefox, everything with `backdrop-filter` |
| Solid (no `backdrop-filter` at all, or `prefers-reduced-transparency`) | Opaque tinted surface, same geometry | Legacy / accessibility |

`backdrop-filter: url(#…)` parses only in Chromium — Safari drops the declaration and Firefox won't render it — which is why the refractive tier is opt-in via class + detect instead of `@supports` (which tests parsing, not rendering). Never ship the refractive tier as the only tier.

## Non-negotiables

1. **One filter definition per page**, ID `liquid-glass-filter`; instances share it.
2. **Baseline first** — the frosted tier is the default class; refraction is additive enhancement.
3. **`prefers-reduced-transparency` gets a solid surface** — the media query ships in the CSS, don't remove it.
4. **Contrast is checked on the worst backdrop**, not the prettiest screenshot — glass over a busy photo can zero out label contrast.
5. **Displacement scale is size-tuned.** The map's `scale` values (−20/−24/−28 per channel) are calibrated for roughly 340×140 pill proportions; extreme aspect ratios distort the rim — retune or increase `--glass-frost` for large panels.
6. **Interactive glass keeps `pointer-events` on** — only purely decorative overlays may disable them.

## Verification

Open `liquid-glass.html` in a Chromium browser (refraction visible at the pill edge, slight RGB fringe), then in Safari or Firefox (clean frosted pill, no missing surface), then toggle OS reduced-transparency (solid tier). Resize to phone width — the pill wraps its content and never overflows the viewport.
