# 08. Mastering CLAUDE.md

> CLAUDE.md is the most important file for giving Claude Code long-term memory. Let's master it.

---

## What Is CLAUDE.md?

Claude Code forgets everything when a session ends. Start a new session and it's back to square one — no memory of your project.

**CLAUDE.md** solves this problem.

Every time Claude Code starts, it automatically reads your CLAUDE.md file and begins work with full awareness of your project context and rules.

Think of CLAUDE.md as a **standing instruction sheet** you hand to Claude at the start of every session.

```
Instead of saying every time:
"This is a Next.js project, use TypeScript,
 use 2-space indentation, and write commit messages in English..."

→ Write it once in CLAUDE.md and Claude remembers it forever.
```

---

## Where Should You Create It?

The location of CLAUDE.md determines its scope.

| File Location | Scope | Shared with Team? |
|---------------|-------|-------------------|
| `./CLAUDE.md` | Current project | ✅ Committable to git |
| `./.claude/CLAUDE.md` | Current project (hidden folder) | ✅ Committable to git |
| `./.claude/rules/*.md` | Current project, per-topic rule files (can be path-scoped) | ✅ Committable to git |
| `./CLAUDE.local.md` | Current project (you only) | ❌ Add it to `.gitignore` yourself |
| `~/.claude/CLAUDE.md` | All your projects (global) | ❌ Personal only |
| `~/.claude/rules/*.md` | All your projects, per-topic rule files | ❌ Personal only |

> If your repository already has an `AGENTS.md` (an instruction file for other coding agents) and no CLAUDE.md, Claude Code reads `AGENTS.md` instead (v2.1.277+). A CLAUDE.md in a subfolder is loaded on demand, when Claude works with files in that folder.

**Most common location**: `CLAUDE.md` at your project root.

```bash
# Create CLAUDE.md manually
touch CLAUDE.md

# Or let Claude Code generate one for you
/init
```

> Running `/init` makes Claude Code analyze your project and automatically draft a CLAUDE.md for you.

---

## What Should You Write?

There's no required format — CLAUDE.md is just Markdown. The following sections are especially effective.

### Essential Sections

#### 1. Project Description
Help Claude understand what this project is about.

```markdown
## Project Overview
This is an inventory management web app for small business owners.
Built with Next.js 14 + TypeScript + Supabase.
```

#### 2. Tech Stack
Specify what languages, frameworks, and libraries you use.

```markdown
## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: pnpm (never use npm)
```

#### 3. Coding Style and Rules
Specify code style, naming conventions, comment language, and so on.

```markdown
## Coding Rules
- Indentation: 2 spaces (no tabs)
- Quotes: single quotes ('')
- Component file names: PascalCase (e.g., UserCard.tsx)
- Function names: camelCase (e.g., getUserData)
- No `any` types — always use explicit types
- All comments in English
```

#### 4. What Never to Do
Explicitly listing forbidden actions prevents common mistakes.

```markdown
## Never Do This
- Do not leave `console.log` in production code
- Use `pnpm`, never `npm` or `yarn`
- Never hardcode secrets from `.env` into source code
- No `any` types allowed
- Do not use the `pages/` directory (App Router only)
```

#### 5. Common Commands
Save Claude (and yourself) the trouble of looking up commands every time.

```markdown
## Common Commands
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Run tests: `pnpm test`
- Lint: `pnpm lint`
- Type check: `pnpm type-check`
- DB migration: `pnpm db:migrate`
```

---

## Real Example: CLAUDE.md Template for Next.js + TypeScript

Here's a practical, ready-to-use template. Copy it and customize it for your project.

```markdown
# Project Instructions

## Project Overview
[Write a 1–2 sentence description of your project here]

Example: An inventory management SaaS for small business owners.
Built on Next.js 14 App Router + TypeScript + Supabase.

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styles**: Tailwind CSS
- **DB / Backend**: Supabase
- **Package Manager**: pnpm
- **Deployment**: Vercel

---

## Directory Structure
\`\`\`
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
│   ├── ui/       # Base UI elements (Button, Input, etc.)
│   └── features/ # Feature-specific components
├── lib/          # Utilities, Supabase client, etc.
└── types/        # TypeScript type definitions
\`\`\`

---

## Coding Rules

### Style
- Indentation: 2 spaces
- Quotes: single quotes ('')
- Semicolons: always
- No trailing whitespace

### Naming
- Components: PascalCase (UserCard.tsx)
- Functions / variables: camelCase (getUserData)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- Types / interfaces: PascalCase (UserProfile)

### TypeScript
- No `any` types
- Always annotate function return types explicitly
- Define Props using interfaces

---

## Common Commands
\`\`\`bash
pnpm dev          # Dev server (localhost:3000)
pnpm build        # Production build
pnpm test         # Run tests
pnpm lint         # ESLint check
pnpm type-check   # TypeScript type check
\`\`\`

---

## Never Do This
- Use `npm` or `yarn` (always use `pnpm`)
- Use `any` types
- Use the `pages/` directory (App Router only)
- Hardcode environment variables into source code
- Leave `console.log` in production code

---

## Git Commit Rules
- Format: `type: description`
- Types: feat, fix, docs, style, refactor, test, chore
- Example: `feat: add user login page`
- Keep messages concise and in the imperative mood
```

---

## Global Memory: Apply to All Projects

Create `~/.claude/CLAUDE.md` to set rules that apply across **all your projects**.

```bash
# Edit global CLAUDE.md
nano ~/.claude/CLAUDE.md
```

Good things to put in your global CLAUDE.md:

```markdown
# Global Settings (all projects)

## My Preferences
- Always explain what you're about to do before making changes
- Ask for confirmation before large or risky changes
- Keep explanations concise

## Universal Coding Style
- Keep functions short (under 20 lines where possible)
- Use meaningful variable names
- Prefer readable code over clever code
```

---

## How Multiple Files Are Loaded Together

When multiple CLAUDE.md files exist, they **don't override each other — they are all concatenated** into context. They are loaded in this order:

```
Loading order:
1. Organization-managed CLAUDE.md (company-wide policy, cannot be turned off)
2. ~/.claude/CLAUDE.md (global settings)
3. ./CLAUDE.md, .claude/rules/, CLAUDE.local.md — from parent folders down to the current folder
```

Claude generally follows the more specific (project-level) instruction, but if two files contradict each other, **there is no guarantee which one wins**. Avoid conflicts like "2-space indent" in your global settings and "use tabs" in your project, and run `/doctor prompt-audit` periodically to clean up stale or contradictory instructions.

---

## Auto Memory: Notes Claude Writes for Itself

If CLAUDE.md is the instruction sheet you write, **auto memory** is the set of notes Claude writes for itself as it works. It records the corrections and patterns you've given it per repository — things like "this project uses pnpm" or "this person prefers commit messages in Korean" — and reads them back at the start of every session (the first 200 lines of `MEMORY.md`).

- It's on by default; use `/memory` to turn it on or off and to view what's been saved.
- Storage location: `~/.claude/projects/<project>/memory/`
- For anything you want **enforced** as a rule, don't rely on auto memory — write it directly in CLAUDE.md. Both are "reference material," not enforcement mechanisms, so block actions that must never happen with Hooks.

---

## Useful Tips

### Use the `/memory` Command
To edit CLAUDE.md during a session:

```shell
/memory
```

A file picker opens so you can edit your CLAUDE.md directly. The same screen lets you toggle auto memory on or off and view its contents.

### Split by Topic: `.claude/rules/`

When CLAUDE.md gets long, split it into per-topic files in the `.claude/rules/` folder (`testing.md`, `writing-style.md`, and so on). Add `paths:` at the top of a file to have it loaded only when Claude works with matching files, which saves context the rest of the time.

```markdown
---
paths:
  - "drafts/**/*.md"
---
# Drafting Rules
- Propose 3 title options; body should have 4–6 subheadings
```

> Aim to keep CLAUDE.md **under 200 lines**. The longer it gets, the more tokens it uses and the less closely its instructions are followed. Move detailed procedures that only matter for specific tasks into Skills, so they're read only when that task comes up.

### File Imports
You can reference other files from within CLAUDE.md:

```markdown
# Project Instructions

For the project overview, see @README.md.
For available scripts, see @package.json.

## Additional Rules
- Git workflow: @docs/git-guide.md
```

### Start Every New Project with CLAUDE.md

When starting a new project, **create CLAUDE.md first**.

```shell
# Let Claude generate a CLAUDE.md for your project
/init
```

Or just ask Claude directly:

```
"I'm building a Next.js 14 + TypeScript + Tailwind project.
 I use pnpm as the package manager and want all comments
 and commit messages in English.
 Please create a CLAUDE.md file based on these preferences."
```

---

## Summary: CLAUDE.md at a Glance

| Item | Details |
|------|---------|
| **Role** | Claude's long-term memory / standing instruction sheet |
| **Location** | `CLAUDE.md` at project root |
| **Global settings** | `~/.claude/CLAUDE.md` |
| **Split by topic** | `.claude/rules/*.md` (can be path-scoped) |
| **Auto-generate** | Use the `/init` command |
| **Edit mid-session** | Use `/memory` or any text editor |
| **Audit** | `/doctor prompt-audit` (finds stale or contradictory instructions) |
| **Format** | Free-form Markdown, under 200 lines recommended |
| **Auto memory** | Notes Claude writes for itself, managed via `/memory` |

**One CLAUDE.md eliminates the need to re-explain your project every session. Make Claude Code feel like a real team member.**

---

## Next Steps

You've completed the core setup. Now let's see Claude Code in action with real-world examples!

→ **[07. Practical Examples](./07-practical-examples.md)** (coming soon)
