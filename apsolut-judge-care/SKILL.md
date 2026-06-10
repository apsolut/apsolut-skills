---
name: apsolut-judge-care
description: Maintain, evolve, and de-drift an existing AI project workspace (Claude Project, custom GPT, Gemini Gem, or per-repo instructions) — its instructions, files, exemplars, and backlog — so quality compounds instead of rotting. Use this skill whenever the user works inside an established project and wants to update instructions, add or prune project files, says the outputs "feel off", "feel samey", "got worse", wants to add a rule after correcting a draft, finishes/publishes a deliverable, asks for a project review or cleanup, or mentions that the project has been running for a while. Trigger it proactively after a deliverable ships or whenever the user corrects the same thing twice.
license: MIT
metadata:
  author: apsolut
  version: "1.0.0"
---

# Project Steward

Keep an existing project workspace sharp over time. Works for any system that pairs persistent instructions with attached files: Claude Projects, custom GPTs, Gemini Gems, or a repo's agent instructions (CLAUDE.md, AGENTS.md). A project is a living system: without maintenance it fails in one of two ways, silent drift (outputs converge to a safe template that technically passes every check) or rule rot (instructions accumulate until none are followed). This skill is the feedback loop that prevents both.

## The one rule

**Every correction becomes a rule, or is consciously discarded. Never just fixed.** When the user corrects a draft, the fix repairs one output; the rule repairs all future outputs. After any correction, propose the one-line rule it implies and where it belongs (instructions, judge checklist, or a file). If the user declines, fine, that was a conscious discard. What is forbidden is silently absorbing the correction and letting the next session repeat the mistake.

## Maintenance operations

### 1. Capture (after every shipped deliverable)

When a deliverable is finished or published:

- Harvest corrections from the session into proposed rules, one line each, and show them to the user for approval before editing instructions.
- Ask whether this deliverable should become or replace an exemplar file. Only the best 2 to 3 outputs stay; rotating exemplars upward is how the project's ceiling rises.
- Move the corresponding backlog entry to published/done with date and link.

### 2. Prune (whenever editing instructions, and on any review)

Instructions only grow unless actively cut, and a bloated instruction set gets skimmed, not followed.

- One-in-one-out pressure: when adding a rule, look for a rule that has stopped earning its place (never relevant, always overridden, duplicated by an exemplar).
- Merge overlapping rules. Three similar bans become one stronger ban.
- Kill backlog entries that no longer feel true. A backlog that only grows is unevaluated inventory.
- Files: re-justify each project file's context cost. Distill anything large into a one-page version. Remove files whose content the exemplars now carry implicitly.

### 3. De-drift (when outputs feel samey or quality sags)

Drift is the silent failure: every output passes the judge, yet they all feel alike. Diagnosis:

- Compare the last 3 outputs side by side. If structure, openings, or signature moves are near-identical, the anatomy template has become a mold. Loosen it: convert one or two structural MUSTs into options, and add a variety rule ("never open two consecutive pieces the same way").
- Goodhart check: if the checklist passes but the user is less happy, the judge is measuring the wrong thing. Ask the user what feels off, convert the answer into a new check, and consider retiring a check that everything trivially passes.
- Exemplar staleness: if all exemplars are old, the project is imitating its past. Rotate in the newest strong output.

### 4. Review ritual (periodic, or on request)

A structured pass over the whole project. Output a short report, not a rewrite, then edit only what the user approves:

1. Instructions: which rules fired recently, which never fire, which conflict.
2. Judge: which checks catch real problems, which pass trivially (candidates for sharpening or retirement).
3. Files: context cost vs value of each, staleness of exemplars.
4. Backlog: stale entries to kill, parking-lot items ready for promotion.
5. One suggested experiment: a deliberate variation for the next deliverable to fight template convergence.

### 5. Versioning

Maintain a short changelog at the bottom of the instructions document: date plus one line per change ("2026-06: added ban on rhetorical-question transitions, retired duplicate hook rule"). This keeps the instructions auditable and makes regressions findable when a change made things worse. When a change does make things worse, roll it back, the changelog is the rollback path.

## Boundaries

- Never edit instructions, files, or the judge without showing the proposed change and getting approval. The steward proposes, the user gates.
- Preserve the user's hard preferences verbatim through every edit.
- Prefer the smallest edit that fixes the issue. A review that rewrites everything destroys the calibration the project has accumulated.

## Quality bar for this skill itself

Before finishing any stewardship pass, verify:

- [ ] Every correction from the session was either converted to a proposed rule or consciously discarded
- [ ] Anything added is paired with a prune candidate or an explicit "nothing to prune" statement
- [ ] No instruction/file edit was applied without user approval
- [ ] The changelog was updated for every applied change
- [ ] If drift was the complaint, the diagnosis named which of the three causes it was (template mold, Goodhart judge, stale exemplars)
