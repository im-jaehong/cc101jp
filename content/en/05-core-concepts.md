# 07. Understanding Core Concepts

> Understanding how Claude Code works helps you use it far more effectively.

---

## How Does Claude Code Work?

Claude Code is not just a chatbot. When you give it a task, it acts as an **Agent** — it plans, reads files, edits code, and verifies results on its own.

This process is called the **Agentic Loop**.

```
Your instruction
     ↓
1. Gather Context
   - Read files, search code, understand current state
     ↓
2. Take Action
   - Edit files, run commands, search the web
     ↓
3. Verify Results
   - Run tests, check for errors, revise if needed
     ↓
Task complete (or loop back to step 1)
```

For example, if you say "fix the failing tests," Claude Code will:
1. Run the test suite to see what's failing
2. Find and read the relevant source files
3. Edit the code to fix the issue
4. Run the tests again to confirm they pass

All of this happens **automatically**.

---

## 5 Core Concepts

### 1. Context — Claude's Working Memory

**Context** is everything Claude Code is currently "holding in mind": conversation history, file contents it has read, command outputs, CLAUDE.md instructions, and more.

Context has a **token limit** (1 million tokens on all current models). If a conversation gets very long or you load many large files, context can fill up. As you approach the limit, Claude Code automatically summarizes older content (auto-compaction).

```
# See what's using context space
/context

# Compact the conversation (summarize older parts)
/compact

# Compact with a specific focus
/compact focus on the API changes
```

> **Tip**: Put important rules and project info in CLAUDE.md. Claude reads it at the start of every session without consuming your active context budget.

---

### 2. Tools — What Claude Can Actually Do

Claude Code doesn't just talk — it uses **tools** to take real actions.

| Tool Category | What Claude Can Do |
|---------------|-------------------|
| **File operations** | Read files, edit code, create files, rename and reorganize |
| **Search** | Find files by pattern, search content with regex, explore codebases |
| **Execution** | Run shell commands, start servers, run tests, use git |
| **Web** | Search the web, fetch documentation, look up error messages |
| **Code intelligence** | Detect type errors after edits, jump to definitions, find references |
| **Delegation** | Hand side tasks like exploration or verification to a subagent (another Claude) and get just the result back |

---

### 3. Permissions — Control What Claude Is Allowed to Do

Claude Code is powerful, so you have full control over **what it's allowed to do**.

Reading files is allowed by default, but editing files or running shell commands requires your approval.

There are three permission rule types:

| Rule | Behavior |
|------|----------|
| **Allow** | Claude proceeds without asking |
| **Ask** | Claude asks for your approval before acting |
| **Deny** | Claude never performs this action |

```
# View and manage permissions
/permissions
```

> **Priority order**: Deny > Ask > Allow. Deny rules always win.

---

### 4. Memory — Remembering Projects with CLAUDE.md

Claude Code doesn't remember previous sessions. But if you create a **CLAUDE.md** file, Claude reads it automatically at the start of every session to maintain project context.

Think of CLAUDE.md as a **standing instruction sheet** for Claude.

| File Location | Scope |
|---------------|-------|
| `./CLAUDE.md` | Current project only (shareable with team via git) |
| `~/.claude/CLAUDE.md` | All your projects (global preferences) |
| `./CLAUDE.local.md` | Personal project-specific settings (add it to `.gitignore` so it isn't committed) |
| `.claude/rules/*.md` | Rules split into per-topic files (can be limited to specific file paths) |

On top of this there is **auto memory**: Claude writes its own notes about corrections and preferences you've given it and reads them back in the next session. It's on by default; use `/memory` to view the notes or turn it off.

> CLAUDE.md is covered in depth in **[08. Mastering CLAUDE.md](./06-claude-md.md)**.

---

### 5. Session — From Start to Finish

A **session** is one continuous Claude Code conversation from when you launch it to when you exit.

- Starting a new session clears previous conversation history (CLAUDE.md is always preserved)
- Everything done during a session is saved

```bash
# Resume the most recent session
claude --continue

# Choose from recent sessions to resume
claude --resume

# Start with a name from the beginning (resume later with claude --resume name)
claude -n competitor-research

# Fork a session to try a different approach
claude --continue --fork-session
```

Mid-conversation, use `/rename name` to name the session and `/branch` to branch the conversation from the current point.

---

## "Why Does Claude Sometimes Pause and Ask for Confirmation?"

When Claude Code stops and asks for your approval, that's an **intentional safety feature**.

Before modifying files or running commands, it checks that the action is what you intended — especially important for hard-to-reverse operations like deleting files or deploying code.

---

## 4 Permission Modes Every Beginner Should Know

Press `Shift+Tab` to cycle through permission modes. The status bar below the prompt shows the current mode, such as `auto mode on` or `manual mode on`.

| Mode | On-screen label | Behavior | Best For |
|------|-----------------|----------|----------|
| **Auto** | `⏵⏵ auto mode on` | A separate checker model (classifier) reviews each action in the background and runs it without asking when it's not risky. **The default starting mode for new sessions** | Long tasks, reducing prompt fatigue |
| **Manual** | `⏸ manual mode on` | Asks before every file edit and shell command (config value is `default`) | When you want to see exactly what Claude does, sensitive work |
| **Accept Edits** | `⏵⏵ accept edits on` | Automatically allows file edits and basic file commands like `mkdir` and `mv`; still asks for other shell commands | Quickly fixing code you're reviewing |
| **Plan Mode** | `⏸ plan mode on` | Read-only — analyzes but never modifies anything | When you want to review the plan before committing |

> **Note (as of October 2026)**: Starting with Claude Code **v2.1.283, terminal sessions start in Auto mode on every plan**. Auto mode is not a "never ask" mode — it's a mode where a classifier reviews actions instead of you. It blocks actions that go beyond what you asked for, access to unfamiliar servers, and actions driven by external content Claude has read, and it still asks you when it can't decide. It is not a safety guarantee, so switch to Manual mode and check things yourself for sensitive work.
>
> If your model doesn't support Auto mode or your organization has disabled it, sessions start in Manual mode instead.

### How to Switch Modes

```
# Press Shift+Tab in the terminal to cycle through modes:
# Auto → Manual → Accept Edits → Plan Mode → Auto → ...

# Or enter Plan Mode directly (add a description to start planning that task right away)
/plan
/plan plan the migration of our auth system to OAuth2

# Start in a specific mode from the beginning
claude --permission-mode plan
claude --permission-mode manual
```

> If a shell-command prompt offers **"Yes, and switch to auto mode"**, choosing it allows that command and switches you to Auto mode at the same time.

### Mode Comparison Example

```
"Delete all console.log statements from every JavaScript file"

Auto mode:
  → Edits files and runs tests right away; blocks or asks about actions like `git push --force`

Manual mode:
  → Asks "Can I modify this file?" before each file edit

Accept Edits mode:
  → Edits files automatically; still asks before running git commit

Plan mode:
  → Shows "I plan to remove line 42 in src/utils.js" — but makes no actual changes
```

> **Recommendation**: For the first few days, press `Shift+Tab` to switch to **Manual mode** and watch what Claude Code does as you learn. Once the flow feels familiar, go back to the default **Auto mode**, and switch to Manual only for hard-to-reverse work like payments, deployments, or deletions.
>
> In every mode, edits to protected paths like `.git` and `.claude` and destructive commands like `rm -rf` on your home folder or root are never auto-approved.

---

## Checkpoints: You Can Always Undo

Before editing any file, Claude Code **automatically takes a snapshot** of the current state.

If something goes wrong:
- With the input box empty, press `Esc` twice in a row or type `/rewind` to open the rewind menu. You can roll back just the code, just the conversation, or both to an earlier point.
- Or just tell Claude: "undo what you just did"

> Rewind only tracks files Claude changed through its edit tools. Files changed by shell commands like `rm` or `mv` can't be restored, so make a git commit before big jobs as well.

---

## Next Steps

Now let's master CLAUDE.md — Claude Code's long-term memory system.

→ **[08. Mastering CLAUDE.md](./06-claude-md.md)**
