---
name: apsolut-judge-init
description: Initialize a new AI project workspace (Claude Project, custom GPT, Gemini Gem, or per-repo instructions) judge-first, for any recurring kind of work (writing, content, coding, analysis, client deliverables), so it produces consistently high-quality output across sessions. Use this skill whenever the user wants to create a new project workspace, says "make a project for X", "master instructions for X", "set up a workspace for X", asks how to make the assistant write or build something "this good in the future", or wants to turn a successful one-off result into a repeatable system. Use it even if the user only vaguely gestures at wanting repeatability.
license: MIT
metadata:
  author: apsolut
  version: "1.1.0"
---

# Apsolut Judge Init

Turn a kind of work into a project workspace that reproduces quality across sessions, built judge-first. Works for any system that pairs persistent instructions with attached files: Claude Projects, custom GPTs, Gemini Gems, or a repo's agent instructions (CLAUDE.md, AGENTS.md). The core insight: a project is not a folder of instructions, it is a judge plus a maker plus an evolution plan. Most projects fail because they only build the maker. This skill builds the judge first and everything else around it.

## The one rule

**Define the judge before writing the instructions.** Before any voice rules, formats, or process steps, establish: what does a great output look like for this project, and how would you check it? The judge becomes a mandatory checklist section in the instructions. If the user cannot articulate what separates great from passable output, help them extract it from a concrete example before proceeding. Do not write instructions without a judge.

## Process

### Step 1: Extract from evidence, not imagination

The best source for project instructions is a real output the user already loves, usually from the current conversation. If one exists, reverse-engineer it: what is its structure, voice, length, signature moves, what did the user correct along the way? Every correction the user made during its creation is a rule candidate. If no exemplar exists, ask for one or create one together first. Instructions written from imagination produce generic projects.

### Step 2: Define the judge

Write the quality checklist FIRST, before the style guide. 6 to 10 binary checks a draft must pass before being shown to the user. Good checks are specific and falsifiable ("does the close restate the rule in its shortest form"), not vibes ("is it engaging"). Include at least one check that guards against blandness, e.g. "would a skeptical expert find at least one claim to argue with". End the judge section with: "If any item fails, fix it before showing the user."

### Step 3: Write the instructions

Structure that works, in this order:

1. **Identity and audience.** Who the user is, who reads the output, what the audience punishes (e.g. "they can smell generic AI content instantly").
2. **The one rule above all.** The single principle that defines quality for this project, stated memorably.
3. **Voice / style rules.** Concrete and bannable, not adjectival. "Never say delve, leverage, robust" beats "sound human". Include the user's hard preferences (e.g. formatting bans) explicitly.
4. **Anatomy of the deliverable.** The structural template with target lengths per section, derived from the exemplar.
5. **Platform/domain best practices.** The mechanics specific to where the output lives (publishing rules, technical constraints, export formats).
6. **Anti-pattern bans.** Explicit list of what marks bad output in this domain. Bans outperform aspirations.
7. **Working process.** How sessions should run: what to confirm before producing (e.g. "propose the core idea first, do not draft until confirmed"), what format deliverables take, what companion assets exist.
8. **The judge.** The checklist from step 2.
9. **Conflict rule.** "When these instructions conflict with a chat request, the chat request wins" plus "if a request breaks these rules, point it out once, then comply."

Keep total instructions tight enough to be read every session. If it cannot fit, move detail into project files and keep pointers.

### Step 4: Choose project files (few, each earns its place)

Files load every session, so each must justify its context cost. The standard set, in priority order:

1. **The exemplar.** The best real published/shipped output. Models imitate samples far more faithfully than they follow rules. Cap at 2 to 3 exemplars, rotate as better ones ship.
2. **The worldview source.** The doctrine, philosophy, or domain knowledge the outputs must stay consistent with, so the project argues what the user believes instead of riffing generically.
3. **The backlog.** Future work items pre-shaped so sessions start at production, not brainstorming. Each entry carries the core idea plus the hook plus known assets. Include status fields and a kill rule.
4. **The system reference.** Reusable mechanics: style tokens, templates, generator scripts, an inventory of existing assets marked "reuse, do not recreate".

Leave out: large research dumps (distill to one page first), redundant style docs (the instructions own style), and individual assets covered by an inventory.

### Step 5: Set the evolution expectation

Tell the user explicitly: instructions transfer the recipe, not the conversation that produced it. The first two or three sessions are calibration, judge the output hard and feed corrections back as added rules. Recommend the companion apsolut-judge-care skill (or its practices) for ongoing maintenance.

## Deliverables

Produce as files the user can paste/upload, not chat text:

- The instructions document (for the project's custom instructions field, or the repo's agent instructions file)
- Any missing project files from step 4 (offer, then create the ones the user wants)

Offer, do not auto-produce, extras like backlog seeding or asset inventories. Ask which the user wants.

## Quality bar for this skill itself

Before delivering an initialized project, verify:

- [ ] The judge section exists and was derived before the style rules
- [ ] At least half the style rules are concrete bans or measurable targets, not adjectives
- [ ] The anatomy section is derived from a real exemplar, not invented
- [ ] File recommendations are 5 or fewer, each with a stated reason
- [ ] The user's stated hard preferences appear verbatim in the instructions
- [ ] The conflict rule and the evolution expectation are present
