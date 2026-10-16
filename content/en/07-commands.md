# 09. Command Reference

> A complete quick-reference for every command you need when using Claude Code.

---

## Three Types of Commands

Claude Code commands fall into three categories.

| Type | Where to type | Example |
|------|--------------|---------|
| **CLI commands** | Terminal (outside Claude Code) | `claude`, `claude --version` |
| **Slash commands** | Inside a session | `/help`, `/compact` |
| **Keyboard shortcuts** | Inside a session | `Ctrl+C`, `Shift+Enter` |

---

## CLI Commands (Typed in the Terminal)

These commands launch or control Claude Code from your terminal prompt.

### Basic Launch Commands

| Command | Description | Example |
|---------|-------------|---------|
| `claude` | Start interactive mode | `claude` |
| `claude "question"` | Start with an initial prompt | `claude "explain this project"` |
| `claude -p "question"` | Print response and exit (good for scripting) | `claude -p "explain this function"` |
| `claude -c` | Continue the most recent conversation | `claude -c` |
| `claude --version` or `claude -v` | Show installed version | `claude -v` |
| `claude --help` | Show help | `claude --help` |
| `claude update` | Update to the latest version | `claude update` |

### Specifying a Model

```bash
# Start with a specific model
claude --model claude-opus-5-5

# Short aliases also work
claude --model opus      # latest Opus (currently Opus 5.5) — the default model on every plan
claude --model sonnet    # latest Sonnet (currently Sonnet 5.5)
claude --model haiku     # fastest and cheapest (currently Haiku 5.5)
claude --model fable     # for the hardest, longest-running tasks (currently Fable 5.1, requires separate access)
claude --model opusplan  # Opus while planning, Sonnet while executing
```

> **Model lineup as of October 2026**: Fable 5.1 → Opus 5.5 → Sonnet 5.5 → Haiku 5.5. All four models have a **1 million token** context window.
> Aliases like `opus` and `sonnet` move to newer versions over time, so use a full model name such as `claude-opus-5-5` to pin a version.
>
> Adjust thinking effort with `--effort low|medium|high|xhigh|max`. The default on Opus 5.5 / Sonnet 5.5 / Haiku 5.5 is `medium`.

### Useful Startup Options

```bash
# Start in Plan Mode (read-only — Claude plans but doesn't edit files)
claude --permission-mode plan

# Start in Manual mode, which asks before every action (the default is Auto mode)
claude --permission-mode manual

# Name the session from the start
claude -n my-session-name

# Resume a named session
claude --resume my-session-name

# Pick a session from an interactive list
claude --resume
```

> **Tip**: Just type `claude` to get started. Learn the other flags as you need them.

---

## Slash Commands (Typed During a Session)

Type `/` at the prompt inside Claude Code to access built-in commands.

### Most Useful Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/compact` | Compress the conversation (essential for long sessions!) |
| `/clear` | Clear conversation history and start fresh |
| `/usage` | Show token usage, cost, and plan usage for the current session (`/cost` and `/stats` are aliases) |
| `/effort` | Set the model effort level (low/medium/high/xhigh/max) |
| `/model` | Change the AI model |
| `/fast` | Toggle Fast Mode (up to 2.5× faster Opus responses, billed extra) |
| `/permissions` | View and manage tool permissions |
| `/memory` | Edit CLAUDE.md; view or toggle auto memory |
| `/quit` or `/exit` | Exit Claude Code |
| `/plan [description]` | Enter Plan Mode (add a description to start planning that task right away) |
| `/init` | Generate a CLAUDE.md file for the project |
| `/doctor` | Check installation and configuration health |
| `/theme` | Change the color theme |
| `/config` | Settings screen (editor mode, auto-update channel, theme, and more) |
| `/branch [name]` | Branch the conversation here so you can try a different direction (the original is kept) |
| `/fork` | Copy the conversation into a background session and keep working here |
| `/rewind` | Roll code and conversation back to a checkpoint (or summarize just part of the conversation) |
| `/context` | Visualize context window usage |
| `/rename [name]` | Name the current session (resume with `--resume name`) |
| `/resume [name]` | Switch to another session (by name or from a list) |
| `/diff` | Review everything Claude has changed so far at a glance |
| `/export [filename]` | Export the current conversation as text |
| `/btw [question]` | Ask a side question that isn't kept in the conversation (uses no context) |
| `/goal` | Set a goal — Claude keeps working across turns until it's met |
| `/subtask` | Hand a side task to a subagent and get just the result back |
| `/loop [interval] [prompt]` | Run the same prompt repeatedly on an interval |
| `/insights` | Generate an HTML usage-pattern report from your recent sessions |
| `/release-notes` | View what changed in each version |
| `/powerup` | Learn features through short interactive lessons |
| `/bug` | Send a bug report directly to Anthropic |

> `/vim` has been removed. Turn on vim editing mode under `/config` → Editor mode. Commands like `/clone` and `/half-clone` do not exist.

### How to Use Slash Commands

```
> /compact
→ Compresses the conversation to free up context

> /compact focus on code changes only
→ You can give compaction instructions

> /model
→ Opens the model picker
```

> **Tip**: Type `/` alone to see an autocomplete list of all available commands.

---

## Conversation Branching & Experimentation

These features help you change direction mid-conversation or try risky experiments safely.

### `/branch` — Experiment While Keeping the Original

Branches the conversation from the current point. Branch before attempting a complex refactor or structural change, and even if it fails you won't lose the conversation so far.

```
> /branch streaming-approach-experiment
→ Starts a new branch from this point (omit the name and it's auto-named from the first prompt)
→ The original conversation stays intact → return to it with /resume original-name
```

**Try it when**
- You want to test one of several implementation approaches first
- You're thinking "what if I changed it this way?" but worried it might fail
- You want to compare different approaches to the same problem

### `/fork` — Send a Copy to the Background

Copies the current conversation into a background session while you keep working in this terminal. Useful when you want one branch running in the background while you drive the other yourself.

```
> /fork
→ A copy of the conversation moves to a background session
→ You keep working in the current window as before
```

> If you want to go all the way back to the point where things went wrong, use `/rewind` (or press `Esc` twice with the input box empty). From the menu you can restore **code + conversation / conversation only / code only**, or **summarize** just the conversation after (or before) a given point to free up context.

### `/context` — Check Context Usage

```
> /context
→ [■■■■■■■□□□] 70% (700,000 / 1,000,000 tokens)
```

Shows visually what percentage of the context window the current conversation occupies. Once it passes 80%, consider `/compact` or `/clear`.

> All current models (Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5) have a **1 million (1M) token** context. It compacts automatically as you approach the limit, and you can make it compact earlier with something like `/autocompact 500k`.

### `/rename` — Name Your Session

Naming an important work session makes it easy to resume later.

```
> /rename competitor-research-feb

# Pick it up later from the terminal
$ claude --resume competitor-research-feb
```

---

## Keyboard Shortcuts

Control Claude Code quickly without leaving the keyboard.

### Essential Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel the current operation (stop Claude mid-task). If nothing is running, clears the input; press again to exit |
| `Esc` | Interrupt Claude's response or a running tool (work done so far is kept); close an open dialog |
| `Ctrl+D` | Exit Claude Code (press twice) |
| `Ctrl+L` | Redraw the screen (when the display is garbled; conversation history is kept) |
| `Ctrl+R` | Search through command history |
| `Ctrl+G` | Open current input in your default text editor |
| `Ctrl+O` | View the detailed transcript — see which tools were used and how |
| `Ctrl+T` | Toggle Claude's to-do checklist |
| `Ctrl+S` | Stash the prompt you're writing / bring it back |
| `Ctrl+V` (`Alt+V` on Windows/WSL) | Paste an image from the clipboard |

### Input Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Enter` | Insert a newline (for multi-line prompts; if it doesn't work, run `/terminal-setup`) |
| `Option+Enter` (macOS) | Insert a newline (macOS default) |
| `\` + `Enter` | Insert a newline (works in all terminals) |
| `↑` / `↓` arrow keys | Navigate command history |
| `Esc` + `Esc` (double) | Opens the rewind menu when the input box is empty; clears the input when there's text |
| `@` | File path autocomplete (`@filename` passes the file into the conversation) |
| `!` (at the start) | Run a shell command directly and add its output to the conversation |
| `?` (in an empty input box) | Toggle the keyboard shortcut help panel |

### Mode Switching Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Tab` | Cycle permission modes (Auto → Manual → Accept Edits → Plan → Auto) |
| `Option+P` (macOS) / `Alt+P` | Switch model |
| `Option+O` (macOS) / `Alt+O` | Toggle Fast Mode |
| `Option+T` (macOS) / `Alt+T` | Toggle extended thinking (no effect on Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fable — it's always on) |
| `Ctrl+B` | Send a running command or agent to the background and keep chatting |
| `Ctrl+X` then `Ctrl+K` | Stop all background subagents (both presses within 3 seconds) |

---

## Top 5 Commands for Beginners

If you're just starting out, memorize these five first.

### 1. `/compact` — The Most Important Command

```
> /compact
```

As a session grows longer, Claude slows down and may forget earlier context. `/compact` compresses the conversation and restores performance. **Use it regularly during long work sessions.**

### 2. `Ctrl+C` — Stop Immediately

Press this whenever Claude is heading in the wrong direction or you realize you made a mistake in your prompt. It stops Claude immediately.

### 3. `/clear` — Start Fresh

```
> /clear
```

Use this when switching to a completely different task. All previous conversation history is erased.

### 4. `Shift+Enter` — Write Multi-Line Prompts

For detailed instructions that don't fit on one line, use `Shift+Enter` to add new lines.

```
(Example of multi-line input with Shift+Enter)
Create a login page with:
- Email and password fields
- Show/hide password toggle
- Login button with loading state
- Form validation with error messages
```

### 5. `/usage` — Check Token Usage

```
> /usage
```

Shows how much you have used in the current session. (`/cost` and `/stats` are aliases for the same command. Subscription users also see plan usage bars here, along with which skills, subagents, and MCP servers accounted for the most usage.)

> If you hit a usage limit, `/rate-limit-options` shows your options. You can have Claude wait for the limit to reset and continue automatically, or turn on extra usage (usage credits) with `/usage-credits`.

---

## Terminal Aliases (Shortcut Commands)

Instead of typing long commands every time, add short aliases to save time.

### macOS / Linux (zsh)

Add to `~/.zshrc`:

```bash
alias cc='claude'
alias ccd='claude --dangerously-skip-permissions'
alias ccr='claude --resume --dangerously-skip-permissions'
```

Then apply:

```bash
source ~/.zshrc
```

### Windows (PowerShell)

Add to `$PROFILE`:

```powershell
function cc { claude @args }
function ccd { claude --dangerously-skip-permissions @args }
function ccr { claude --resume --dangerously-skip-permissions @args }
```

Restart PowerShell to apply.

### What Each Alias Does

| Alias | Meaning | When to Use |
|-------|---------|-------------|
| `cc` | Basic start | Always |
| `ccd` | Auto-approve all permissions | Trusted projects, fast iteration |
| `ccr` | Resume last session + auto-approve | Picking up where you left off |

> ⚠️ **Warning**: `--dangerously-skip-permissions` auto-approves all file edits, command execution, and other actions without asking. Only use it in projects you trust and environments you control.
>
> 💡 Sessions now start in **Auto mode** by default (a classifier reviews actions and most prompts go away), so there's rarely a real need for an alias like `ccd`. Unless you're in an isolated container, `--permission-mode auto` is the safer choice.

---

## Quick Reference Card

```
Terminal (before starting):
  claude              → Start
  claude -v           → Check version
  claude --help       → Help
  claude -c           → Continue last conversation
  claude -n [name]    → Start with a name
  claude --resume [name] → Resume a named session
  claude --add-dir [path] → Include an extra directory
  claude --permission-mode plan → Start in Plan Mode

Aliases (after setup):
  cc                  → claude (basic)
  ccd                 → auto-approve all permissions
  ccr                 → resume last session + auto-approve

Inside a session:
  /help               → All commands
  /compact            → Compress conversation (use often!)
  /clear              → Reset conversation
  /usage (= /cost)    → Check usage and cost
  /model              → Change model
  /effort             → Set model effort level
  /fast               → Toggle Fast Mode
  /diff               → Review changes
  /rename [name]      → Name the session
  /bug                → Send a bug report
  /quit               → Exit

Keyboard shortcuts:
  Ctrl+C / Esc        → Cancel current action
  Ctrl+D              → Exit
  Ctrl+B              → Send running task to background
  Shift+Tab           → Cycle permission modes
  Shift+Enter         → New line in prompt
  ↑↓ arrows           → Navigate history
  Esc Esc             → Rewind menu (when input box is empty)
```
