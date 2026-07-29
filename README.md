# apsolut-skills

Various, self collected, self evolved skills for code, design.

Every skill follows the [Agent Skills](https://agentskills.io) open standard — a folder with a `SKILL.md` (YAML frontmatter + markdown instructions) — so they work in [Claude Code](https://code.claude.com/docs/en/skills), claude.ai, the Claude Agent SDK, and any other tool that adopts the standard.

## Skills

Skills are grouped by category. Install the leaf skill folder, not the category — the folder name is the `/command` you type.

### meta — working with AI itself

| Skill | What it does |
|-------|--------------|
| [`apsolut-judge-init`](meta/apsolut-judge-init/) | Initialize an AI project workspace (Claude Project, custom GPT, Gem, repo instructions) judge-first, so it reproduces quality across sessions |
| [`apsolut-judge-care`](meta/apsolut-judge-care/) | Maintain an existing project workspace: turn corrections into rules, prune rule rot, diagnose and fix output drift |
| [`plan-board`](meta/plan-board/) | Render a plan as a single-file HTML review board — file map, diagrams, before/after code, one Open Questions block — approved before any code is written |

### design — design systems & visual language

| Skill | What it does |
|-------|--------------|
| [`design-dna`](design/design-dna/) | Extract a complete design system from a folder of 10–20 screenshots — colors, master font, spacing, components — and package it as a `<brand>-design` skill with Tailwind v4 tokens |
| [`ghibli-design`](design/ghibli-design/) | Apply the Ghibli design system (cornflower blue + slate with teal/coral/gold accents) — drop-in Tailwind v4 + shadcn tokens, dark mode, component recipes |

### reports — report & briefing templates

Named `<style>-<purpose>-<audience>` so the `/command` says what you get. All share one anatomy and one anti-slop content judge; the style skin differs.

| Skill | What it does |
|-------|--------------|
| [`gruvbox-brief-manager`](reports/gruvbox-brief-manager/) | Manager briefing in Gruvbox dark — terminal instrument panel: amber-led stat strips, honest status badges, numbered mono sections; complete HTML template + content judge |
| [`ghibli-brief-manager`](reports/ghibli-brief-manager/) | The same briefing anatomy in Ghibli light — blue-tinted wash, white cards, teal/coral/gold semantics, Figtree + mono instrument labels |

More categories land as skills do — planned: `coding/`, `images/`. Skills can also target a specific reference or project, e.g. `design/stripe-design/` for a design skill modeled on stripe.com — prefix the skill name with its subject so the `/command` stays self-explanatory.

## Install

**Claude Code** — copy a skill folder into:

| Scope | Path | Invoke |
|-------|------|--------|
| Personal (all projects) | `~/.claude/skills/<skill-name>/` | `/<skill-name>` |
| Project | `.claude/skills/<skill-name>/` | `/<skill-name>` |

```bash
git clone https://github.com/apsolut/apsolut-skills.git
cp -r apsolut-skills/meta/apsolut-judge-init ~/.claude/skills/
```

**claude.ai** — zip a skill folder, rename to `<skill-name>.skill`, upload under Settings → Capabilities → Skills.

**Other tools** — any agent supporting the [Agent Skills standard](https://agentskills.io) reads the same `SKILL.md`; check your tool's docs for its skills directory.

## Layout

```
<category>/                  # meta, coding, design, images, ...
└── <skill-name>/            # what you copy into your skills directory
    ├── SKILL.md             # frontmatter (name, description) + instructions
    ├── references/          # templates, manifests, supporting docs (optional)
    └── scripts/             # runnable helpers the skill ships (optional; node/python/sh, dependency-light)
```

Frontmatter stays on standard fields (`name`, `description`, `license`, `metadata`) so nothing breaks outside Claude Code.

## Related

- [apsolut-seshat](https://github.com/apsolut/apsolut-seshat) — project vault scaffolding (`.apsolut/`) these skills pair with

## License

[MIT](LICENSE)
