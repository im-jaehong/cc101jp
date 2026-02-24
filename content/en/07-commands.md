# 07. Command Reference

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
claude --model claude-opus-4-5

# Short aliases also work
claude --model opus
claude --model sonnet
claude --model haiku
```

### Useful Startup Options

```bash
# Start in Plan Mode (read-only — Claude plans but doesn't edit files)
claude --permission-mode plan

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
| `/cost` | Show token usage for the current session |
| `/model` | Change the AI model |
| `/permissions` | View and manage tool permissions |
| `/memory` | Edit CLAUDE.md memory files |
| `/quit` or `/exit` | Exit Claude Code |
| `/plan` | Enter Plan Mode |
| `/init` | Generate a CLAUDE.md file for the project |
| `/doctor` | Check installation health |
| `/stats` | View usage statistics (subscription users) |
| `/vim` | Toggle vim editing mode |
| `/theme` | Change the color theme |
| `/rename <name>` | Name the current session for easy resumption |
| `/rewind` | Restore conversation and code to a previous state |

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

## Keyboard Shortcuts

Control Claude Code quickly without leaving the keyboard.

### Essential Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel the current operation (stop Claude mid-task) |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear the terminal screen (conversation history is kept) |
| `Ctrl+R` | Search through command history |
| `Ctrl+G` | Open current input in your default text editor |
| `Ctrl+T` | Toggle the task list |

### Input Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Enter` | Insert a newline (for multi-line prompts) |
| `Option+Enter` (macOS) | Insert a newline (macOS default) |
| `\` + `Enter` | Insert a newline (works in all terminals) |
| `↑` / `↓` arrow keys | Navigate command history |
| `Esc` + `Esc` (double) | Rewind to a previous conversation state |

### Mode Switching Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Tab` | Toggle between Plan Mode and normal mode |
| `Option+P` (macOS) / `Alt+P` | Switch model |
| `Option+T` (macOS) / `Alt+T` | Toggle extended thinking |

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

### 5. `/cost` — Check Token Usage

```
> /cost
```

Shows how much you have spent in the current session. (For API key users. Subscription users should use `/stats`.)

---

## Quick Reference Card

```
Terminal (before starting):
  claude              → Start
  claude -v           → Check version
  claude --help       → Help
  claude -c           → Continue last conversation

Inside a session:
  /help               → All commands
  /compact            → Compress conversation (use often!)
  /clear              → Reset conversation
  /cost               → Check usage cost
  /model              → Change model
  /quit               → Exit

Keyboard shortcuts:
  Ctrl+C              → Cancel current action
  Ctrl+D              → Exit
  Shift+Enter         → New line in prompt
  ↑↓ arrows           → Navigate history
  Esc Esc             → Rewind to previous state
```
