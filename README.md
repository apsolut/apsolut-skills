# apsolut-skills

Various, self collected, self evolved skills for code, design.

Every skill follows the [Agent Skills](https://agentskills.io) open standard — a folder with a `SKILL.md` (YAML frontmatter + markdown instructions) — so they work in [Claude Code](https://code.claude.com/docs/en/skills), claude.ai, the Claude Agent SDK, and any other tool that adopts the standard.

## Skills

| Skill | What it does |
|-------|--------------|
| [`apsolut-judge-init`](apsolut-judge-init/) | Set up a new AI project workspace (Claude Project, custom GPT, Gem, repo instructions) that reproduces quality across sessions — judge first, then instructions, then files |
| [`apsolut-judge-care`](apsolut-judge-care/) | Maintain an existing project workspace: turn corrections into rules, prune rule rot, diagnose and fix output drift |

## Install

**Claude Code** — copy a skill folder into:

| Scope | Path | Invoke |
|-------|------|--------|
| Personal (all projects) | `~/.claude/skills/<skill-name>/` | `/<skill-name>` |
| Project | `.claude/skills/<skill-name>/` | `/<skill-name>` |

```bash
git clone https://github.com/apsolut/apsolut-skills.git
cp -r apsolut-skills/apsolut-judge-init ~/.claude/skills/
```

**claude.ai** — zip a skill folder, rename to `<skill-name>.skill`, upload under Settings → Capabilities → Skills.

**Other tools** — any agent supporting the [Agent Skills standard](https://agentskills.io) reads the same `SKILL.md`; check your tool's docs for its skills directory.

## Layout

```
<skill-name>/
├── SKILL.md          # frontmatter (name, description) + instructions
└── references/       # templates, manifests, supporting docs (optional)
```

Frontmatter stays on standard fields (`name`, `description`, `license`, `metadata`) so nothing breaks outside Claude Code.

## Related

- [apsolut-seshat](https://github.com/apsolut/apsolut-seshat) — project vault scaffolding (`.apsolut/`) these skills pair with

## License

[MIT](LICENSE)
