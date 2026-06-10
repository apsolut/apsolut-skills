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

More categories land as skills do — planned: `coding/`, `design/`, `images/`. Skills can also target a specific reference or project, e.g. `design/stripe-design/` for a design skill modeled on stripe.com — prefix the skill name with its subject so the `/command` stays self-explanatory.

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
    └── references/          # templates, manifests, supporting docs (optional)
```

Frontmatter stays on standard fields (`name`, `description`, `license`, `metadata`) so nothing breaks outside Claude Code.

## Related

- [apsolut-seshat](https://github.com/apsolut/apsolut-seshat) — project vault scaffolding (`.apsolut/`) these skills pair with

## License

[MIT](LICENSE)
