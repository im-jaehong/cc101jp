# 20. Headless Mode & GitHub Actions Automation

> Learn how to run Claude Code automatically without human interaction.

---

## What Is Headless Mode?

Normally, Claude Code runs interactively in a terminal — you ask a question, Claude responds, you give feedback, and so on.

**Headless mode** lets you run Claude Code automatically, without a person in the loop. You can call it from scripts or CI/CD pipelines just like any other command-line tool.

> **Headless = automated execution without human interaction**

The feature was previously called "headless mode"; the official docs now describe it as **using the Agent SDK via the CLI** (non-interactive mode). The `-p` flag and all CLI options work exactly the same way.

---

## When Would You Use This?

| Situation | Example |
|-----------|---------|
| CI/CD pipelines | Automatically review code every time a PR is opened |
| Automation scripts | Generate a nightly code quality report |
| Batch processing | Migrate multiple files at once |
| Repetitive tasks | Attempt auto-fixes when tests fail |

---

## Basic Usage

Add the `-p` (or `--print`) flag to run Claude Code non-interactively.

### Simplest form

```bash
claude -p "What does this project do?"
```

### Allow tools

Let Claude read and edit files by specifying allowed tools:

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

Instead of listing tools one by one, you can set a baseline with a permission mode:

```bash
# Proceed with a classifier reviewing actions (same Auto mode as interactive sessions)
claude -p "Bump dependency versions and run the tests" --permission-mode auto

# Deny every action that would need confirmation (for locked-down CI environments)
claude -p "..." --permission-mode dontAsk

# Unattended runs where nobody can answer prompts: deny anything that would ask, and keep going
claude -p "..." --permission-mode auto --permission-prompts none
```

### Use `--bare` for scripts and CI

Adding `--bare` skips hooks, plugins, MCP servers, auto memory, and CLAUDE.md auto-discovery, so startup is faster and **you get the same result on any machine**. It's the approach the official docs recommend for scripts and CI, and it's slated to become the default for `-p`. It doesn't read your subscription login, so `ANTHROPIC_API_KEY` is required.

```bash
claude --bare -p "Summarize README.md" --allowedTools "Read"
```

### Get structured JSON output

For easy parsing in scripts, use JSON output format:

```bash
claude -p "Summarize this project" --output-format json
```

Output format options:
- `text` (default): plain text
- `json`: structured JSON with result, session ID, and metadata
- `stream-json`: real-time streaming JSON

### Practical example: automated commit

```bash
claude -p "Review my staged changes and create a commit with an appropriate message" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

### Continue a conversation

```bash
# First request
claude -p "Review this codebase for performance issues"

# Continue the previous conversation
claude -p "Now focus on the database queries" --continue
```

---

## GitHub Actions Integration

GitHub Actions automatically runs tasks in response to GitHub events — PR creation, code pushes, issue creation, and more. Integrating Claude Code here enables AI-powered automation in your development workflow.

### The Official Action

Anthropic provides an official GitHub Action:

- **Repository**: [github.com/anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)
- **Version**: `anthropics/claude-code-action@v1`

### Quick Setup

Run this command inside Claude Code to be guided through setup automatically:

```
/install-github-app
```

> Requires repository admin access and the GitHub CLI (with `gh auth login` completed), and only works with github.com repositories. You can also **authenticate with your subscription account** instead of an API key: run `claude setup-token` locally to create a one-year token and register it as the `CLAUDE_CODE_OAUTH_TOKEN` secret, and Actions runs will draw from your subscription usage.

### Manual Setup

1. **Install the Claude GitHub App**: Visit [github.com/apps/claude](https://github.com/apps/claude) and install it on your repository.

2. **Add an authentication secret**: Go to repository Settings → Secrets and add `ANTHROPIC_API_KEY` (API key) or `CLAUDE_CODE_OAUTH_TOKEN` (subscription token).

3. **Create a workflow file**: Add a YAML file inside `.github/workflows/`. You can copy the official example ([examples/claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml)) as-is.

---

### Example 1: Automated PR Review via @claude Mention

Claude automatically responds when someone mentions `@claude` in a PR comment or issue.

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # If you use a subscription token, replace the line above with:
          # claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          # With no prompt given, responds to @claude mentions automatically
```

Usage in comments:
```
@claude review this PR for security vulnerabilities
@claude check if this function handles edge cases correctly
@claude implement a feature based on this issue description
```

---

### Example 2: Automatic Code Review on PR Open

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: "https://github.com/anthropics/claude-code.git"
          plugins: "code-review@claude-code-plugins"
          prompt: "/code-review:code-review --comment ${{ github.repository }}/pull/${{ github.event.pull_request.number }}"
          claude_args: '--allowedTools "mcp__github_inline_comment__create_inline_comment"'
```

> `--comment` is what makes the review findings appear as inline comments on the PR. Without it, they only show up in the workflow log. If you want automatic reviews on every PR without maintaining a workflow file, see the **Code Review** feature in the official docs.

---

### Example 3: Scheduled Code Analysis

```yaml
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"  # Every day at 9am

jobs:
  report:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: read
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a summary of yesterday's commits and open issues"
          claude_args: |
            --model claude-sonnet-5-5
            --allowedTools "mcp__github__list_commits,mcp__github__list_issues"
```

> When running with a plain-text prompt, Claude can only use the tools allowed via `--allowedTools` in `claude_args`. The example above allows just two GitHub API tools, so no checkout step is needed.

---

### Workflow Parameters Reference

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}  # Required
    prompt: "Your instructions here"       # Optional
    claude_args: "--max-turns 10"          # Optional CLI arguments
```

| Parameter | Description | Required |
|-----------|-------------|----------|
| `anthropic_api_key` | Your Anthropic API key | One of the two |
| `claude_code_oauth_token` | Subscription account token (created with `claude setup-token`) | One of the two |
| `prompt` | Instructions for Claude (without one, waits for an `@claude` mention) | No |
| `claude_args` | Additional CLI arguments (`--max-turns`, `--model`, `--allowedTools`, etc.) | No |
| `plugins` / `plugin_marketplaces` | Plugins to install before running | No |
| `trigger_phrase` | Custom trigger phrase (default: `@claude`) | No |

> The person who triggers a run must have **write access** to the repository, and bot accounts are ignored unless listed in `allowed_bots` (prevents infinite loops).

---

## GitLab CI/CD Integration (Brief Overview)

If you use GitLab, you can add a Claude Code job to `.gitlab-ci.yml`. For the full procedure, see the [official GitLab CI/CD docs](https://code.claude.com/docs/en/gitlab-ci-cd).

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
  before_script:
    - apk add --no-cache git curl bash
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - claude -p "${AI_FLOW_INPUT:-'Review changes and suggest improvements'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write"
```

Don't forget to add `ANTHROPIC_API_KEY` as a masked CI/CD variable in your GitLab project settings.

---

## ⚠️ Cost Warning

Automation **consumes a large number of tokens**.

- CI/CD pipelines run without human oversight, so costs can accumulate faster than expected.
- Use `--max-turns` to cap the number of conversation turns, and `--max-budget-usd` to cap the dollar spend of a single run.
- Set workflow-level timeouts to prevent runaway jobs, and limit concurrency.
- Avoid triggering workflows unnecessarily.

```yaml
claude_args: "--max-turns 5 --model claude-sonnet-5-5"
```

**In addition to API token costs, you'll also incur GitHub Actions compute minutes** if you exceed your plan's free tier.

---

## Security Best Practices

- **Never put API keys directly in code.** Always use GitHub Secrets.

```yaml
# Correct
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}

# Never do this
anthropic_api_key: "sk-ant-api03-..."
```

- Always review Claude's suggestions before merging.
- Grant only the minimum permissions your action needs.

---

## A Note for Beginners

> **You don't need this feature right now.**

Headless mode and GitHub Actions integration are best introduced after you're comfortable with Claude Code basics. Get familiar with interactive use, CLAUDE.md configuration, and MCP first — then consider automation.

For now, it's enough to know this capability exists and bookmark it for later.

---

## Quick Reference

```
Headless mode:    claude -p "task description" --output-format json
Scripts/CI:       --bare to remove environment effects, --permission-prompts none for unattended runs
GitHub Actions:   anthropics/claude-code-action@v1 (API key or subscription token)
Trigger:          @claude mention or automatic prompt
Cost control:     --max-turns, --max-budget-usd, timeout, model selection
Security:         Always use Secrets for keys and tokens
```

> If you just want simple repetition inside the terminal, **`/loop`** runs the same prompt on an interval — for example `/loop 30m check for new issues and summarize them` — and if it needs to keep running while your computer is off, `/schedule` creates a cloud routine.
