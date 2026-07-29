# AGENTS.md — apsolut-skills

Public collection of self-collected, self-evolved Codex skills for code and design.

**Stack:** Markdown + optional shipped scripts (Codex skills: `SKILL.md` + `references/` + `scripts/`)

## Vault (davinci profile — local only, gitignored)

`.apsolut/` is the project brain on the davinci track. It is **not** in the public repo.

- Raw capture / stream of consciousness: `.apsolut/01-thinking/`
- Exploration, options, comparisons: `.apsolut/02-ideas/`
- Blueprints, broken-down plans: `.apsolut/03-plan/`
- Markdown reading room (excerpts, transcripts, snippets): `.apsolut/04-library/`
- Locked-in decisions and rationale: `.apsolut/05-decisions/`
- Reference: concepts, glossary, learned material: `.apsolut/06-knowledge/`
- Cold binaries (PDFs, audio, exports): `.apsolut/07-files/` — `000-template.md` is a manifest; read it to find the one file a task needs, never scan the folder
- Hot images: `.apsolut/08-screenshots/` — manifest + intent subfolders `inspiration/` (keep) and `bugs/` (ephemeral)

## Guardrails (public repo)

This repo is **public**. Everything committed is visible to the world.

- **Never commit sensitive data** — no API keys, tokens, passwords, private URLs, client names, emails, machine paths with usernames, or anything from `.apsolut/`. When writing skill examples, use obvious placeholders (`YOUR_API_KEY`, `example.com`).
- **Only skill content belongs in the repo.** Allowed formats: `.md` (skills: `<category>/<skill-name>/SKILL.md` + supporting markdown, standalone `.md` when genuinely needed), `.css` and `.html` when a skill ships them (e.g. drop-in theme tokens, HTML templates), and text-based scripts a skill ships to do real work (`.mjs`, `.js`, `.ts`, `.py`, `.sh`, plus `.json` manifests) — put them in the skill's `scripts/` subfolder. The only other exceptions are repo meta files: `LICENSE` and `.gitignore`. Still banned: binaries, images, and data files — those live in the private vault.
- **Shipped scripts are read by strangers and executed by agents.** Keep them small, readable, and dependency-light (prefer zero deps or one well-known package); no network calls unless that is the script's stated purpose; placeholder values only. A script that needs explaining belongs in the SKILL.md that ships it.
- **The pre-commit hook enforces this** (`.git/hooks/pre-commit`): it rejects staged files outside the allowed formats, anything under `.apsolut/`, and content matching common secret patterns. It is a local backstop, not permission to be careless — and it doesn't survive a fresh clone, so re-create it if missing.
- Before committing, scan the diff yourself for secrets and non-markdown files; don't rely on the hook alone. Never use `git add -f` to bypass `.gitignore`, and never weaken the hook to get a commit through.

## Commands

```bash
# No build — validate a skill by reading its SKILL.md.
# Shipped scripts are plain node/python/sh, no toolchain; smoke-test them directly, e.g.:
node design/design-dna/scripts/sample.mjs --help
```

## Don'ts

- Don't read `.apsolut/01-thinking/` — raw capture, not for CC
- Don't preload files — fetch only what the current task needs
- Don't sprinkle binaries across `.apsolut/` markdown folders — they belong in `.apsolut/08-screenshots/` (hot) or `.apsolut/07-files/` (cold)
- Don't bulk-load a binary folder — read its `000-template.md` manifest, then open only that file
- Don't hoard dead alternatives. Once a decision in `05-decisions/` records its "options considered", the rejected option files + their exploration notes are dead weight — propose deleting them and remove on the user's OK. The vault holds what's true now; git is the archive
- Never commit `.apsolut/` — this repo is public, the vault is private
