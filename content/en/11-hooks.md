# 15. Hooks — The Core of Automation

> "Format every file Claude edits", "Notify me when the task is done", "Block edits to .env" — all of this runs automatically with Hooks

---

## What are Hooks?

**Hooks** are user-defined shell commands that execute automatically at specific points in Claude Code's lifecycle.

Claude Code generates events when it edits files, runs commands, finishes a task, and more. Hooks let you react to these events with **deterministic, guaranteed actions** — no LLM judgment involved.

> **Key insight**: Hooks are not for things you want Claude to "try to do." They are for things that **must always happen**, regardless of what Claude decides. Think of them as invariants on Claude's behavior.

---

## Manual work Hooks eliminate

| Without Hooks | With Hooks configured |
|---------------|----------------------|
| Run Prettier manually after every file edit | Auto-format on every file write |
| Keep watching the terminal for task completion | Desktop notification when done |
| Worry about Claude accidentally editing `.env` | Protected files blocked automatically |
| Re-explain coding rules after context compaction | Rules auto-injected after compaction |
| Manually log every command Claude runs | All Bash commands logged automatically |

---

## Hook events reference

| Event | When it fires | Common uses |
|-------|--------------|-------------|
| `PreToolUse` | Before a tool executes | Block dangerous commands, validate inputs |
| `PostToolUse` | After a tool succeeds | Auto-format, log activity |
| `Stop` | When Claude finishes responding | Send notifications, run post-processing |
| `SessionStart` | When a session begins or resumes | Inject context, initialize state |
| `Notification` | When Claude sends a notification | Desktop push notifications |
| `UserPromptSubmit` | When you submit a prompt | Pre-process input |
| `SubagentStart` | When a subagent is spawned | Track agent usage |
| `SubagentStop` | When a subagent finishes | Post-process results |
| `PreCompact` | Before context compaction | Preserve critical information |
| `SessionEnd` | When a session terminates | Clean up temp files |

---

## Where to put your Hook configuration

| Location | Scope | Shareable |
|----------|-------|-----------|
| `~/.claude/settings.json` | All your projects | No |
| `.claude/settings.json` | Current project | Yes (commit to Git) |
| `.claude/settings.local.json` | Current project | No (gitignored) |

---

## Practical examples

### Example 1: Auto-format files after every edit

Run Prettier automatically on every file Claude writes or modifies:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

> The `matcher` field filters which tools trigger the hook. `Edit|Write` fires only on file edits and writes.

### Example 2: Desktop notification when Claude finishes

Get notified when Claude completes a task, even if you've switched windows:

**macOS** (`~/.claude/settings.json`):
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

**Linux**:
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Claude Code needs your attention'"
          }
        ]
      }
    ]
  }
}
```

### Example 3: Block edits to protected files

Prevent Claude from modifying `.env`, `package-lock.json`, or anything in `.git/`:

**Step 1**: Create the hook script (`.claude/hooks/protect-files.sh`):

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

**Step 2**: Make it executable:
```bash
chmod +x .claude/hooks/protect-files.sh
```

**Step 3**: Register the hook (`.claude/settings.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

> Exit code `2` blocks the action and sends the stderr message to Claude. Exit code `0` allows it. Any other exit code lets the action proceed but only logs the error.

### Example 4: Re-inject context after compaction

When Claude's context window fills up, it compacts automatically. Re-inject critical rules when that happens:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing. Current sprint: auth refactor.'"
          }
        ]
      }
    ]
  }
}
```

### Example 5: Audit log of every Bash command

Record every command Claude runs to a file:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' >> ~/.claude/command-log.txt"
          }
        ]
      }
    ]
  }
}
```

---

## The easiest way to set up your first hook

Run `/hooks` inside Claude Code to open the interactive menu:

```
/hooks
```

1. Select the event you want to react to
2. Set the matcher (`*` for all, `Edit|Write` for file edits only)
3. Enter the shell command to run
4. Choose storage location (User settings → applies to all projects)

Changes from the `/hooks` menu take effect immediately.

---

## How hooks communicate with Claude Code

Hooks receive a JSON payload on **stdin** describing the event. They communicate back through **exit codes** and **stdout/stderr**:

```json
{
  "session_id": "abc123",
  "cwd": "/Users/sarah/myproject",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm test"
  }
}
```

| Exit code | Behavior |
|-----------|----------|
| `0` | Action proceeds. Stdout is added to Claude's context (for `SessionStart` and `UserPromptSubmit`) |
| `2` | Action is **blocked**. Stderr is sent to Claude as feedback |
| Any other | Action proceeds. Stderr is logged but not shown to Claude |

---

## Advanced: Prompt-based hooks

For decisions that need judgment rather than rules, use `type: "prompt"`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains\"}."
          }
        ]
      }
    ]
  }
}
```

For verification that requires reading files or running commands, use `type: "agent"` — a subagent with full tool access checks the actual state of the codebase.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Hook not firing | Run `/hooks` to confirm it appears; check matcher casing (case-sensitive) |
| Script not executing | Run `chmod +x ./my-hook.sh` |
| Stop hook loops forever | Parse `stop_hook_active` from input JSON and `exit 0` if `true` |
| JSON validation failed | Wrap `echo` statements in `~/.zshrc` with an interactive shell check |

Debug mode: `claude --debug` or press `Ctrl+O` to see hook output in the transcript.

---

## ⚠️ Cautions

- Hooks are powerful. **A `PreToolUse` hook with `exit 2` misconfigured can block Claude from editing any file**
- `PostToolUse` hooks cannot undo an action — the tool has already run
- `PermissionRequest` hooks do not fire in non-interactive mode (`-p`) — use `PreToolUse` for automated pipelines instead
- If you edit settings files directly while Claude Code is running, changes won't take effect until you visit `/hooks` or restart the session

---

## One-line summary

> Hooks = shell commands that fire automatically on Claude Code events. Format files, send notifications, block dangerous operations — all guaranteed to run, no LLM judgment required.

Next section: package repeatable workflows into Skills.
