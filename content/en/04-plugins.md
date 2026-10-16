# 06. Recommended Plugin Installation

> Extend Claude Code's capabilities by installing plugins.

---

## What Are Plugins?

Claude Code is already powerful out of the box, but **plugins** let you do even more.

Think of plugins like apps on your smartphone — you install what you need, and Claude Code gains new abilities.

A single plugin can include:

| Component | Description |
|-----------|-------------|
| **Skills** | Custom commands in the format `/plugin-name:command` |
| **Agents** | AI agents that handle specific roles or tasks |
| **Hooks** | Event handlers that run automatically on file saves or commands |
| **Mods** | JavaScript hook modules that add panels to the screen or change behavior (e.g., playmaker's live goal board) |
| **MCP Servers** | Connections to external services like GitHub, Figma, and more |

> Enabled plugins put their skill and agent names and descriptions into context even in sessions where you don't use them, so they consume a few tokens each. Check the **Context cost** column in the `/plugin` marketplace listing and disable the plugins you aren't using. `/skill-doctor` also shows which skills take up how much space.

---

## Official Plugin Marketplace

Anthropic operates an official marketplace (`claude-plugins-official`) that is **automatically available** when you start Claude Code.

Type `/plugin` inside Claude Code and go to the **Discover tab** to browse official plugins immediately.

### Installing from the Official Marketplace

```shell
/plugin install plugin-name@claude-plugins-official
```

### Official Marketplace Categories

| Category | Notable Plugins | Description |
|----------|----------------|-------------|
| **Code Intelligence** | `typescript-lsp`, `pyright-lsp` | Real-time type error detection, code navigation |
| **External Integrations** | `github`, `figma`, `notion` | Connect Claude to external services |
| **Dev Workflows** | `commit-commands`, `pr-review-toolkit` | Automate Git commits and PR reviews |
| **Output Styles** | `explanatory-output-style` | Customize how Claude responds |

---

## gptaku_plugins — A Plugin Pack for Beginners

> GitHub: [https://github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

**gptaku_plugins** is a plugin collection designed specifically for Claude Code beginners, non-developers, and vibe coders. It helps Claude guide you through unfamiliar concepts with extra patience and clarity.

### Included Plugins

> As of October 2026 the marketplace lists **19 plugins**.

#### Recommended for beginners

| Plugin Name | Role | Example Usage |
|-------------|------|---------------|
| **docs-guide** | Answers grounded in official library documentation (llms.txt, 68 libraries) — no hallucinations, always the latest docs | `/docs-guide:explain React hooks` |
| **git-teacher** | Git/GitHub onboarding for non-developers using a cloud-folder analogy, in 5 phases | `/git-teacher:what-is-commit` |
| **vibe-sunsang** | AI mentor that analyzes your Claude Code conversations and provides growth coaching | `/vibe-sunsang start` |
| **show-me-the-prd** | Turns one sentence straight into drafts of 4 design documents (PRD, data model, phases, project spec), then confirms only the assumptions in one batch | `/show-me-the-prd I want to build a photo organizer app` |
| **insane-research** | Multi-agent deep research — a 7-phase pipeline cross-verifies sources, then produces a cited report | `/insane-research [topic]` |
| **kkirikkiri** | Turns one sentence into an AI team or a deterministic agent pipeline | `/kkirikkiri create a research team` |
| **pumasi** | Claude acts as PM, Codex CLI as parallel developers. Requires Codex CLI | `/pumasi [task description]` |
| **skillers-suda** | 4 persona agents analyze and debate your idea, then build a working skill with auto eval | `/skillers-suda create a translation skill` |

> ⚠️ **`deep-research-kit` is no longer available.** Use its successor, **`insane-research`**.

#### Also available

| Plugin | Description |
|--------|-------------|
| **goaljaby** | Turns a PRD into a `/goal` workflow execution contract — auto-generates review documentation and manages approval gates |
| **playmaker** | Live goal board for goaljaby — track progress in a side panel or on a web board (Paseo) |
| **insane-search** | Reaches sites blocked by WAFs, 403s, CAPTCHAs, or login walls through escalating strategies, no API keys needed |
| **insane-design** | Extracts a design system (colors, typography, spacing) from any URL into tokens and a `design.md` |
| **insane-review** | Bundles your code and has GPT-5.5 Pro review it (requires a logged-in ChatGPT web session) |
| **nopal** | Operates 9 Google Workspace services through natural language (requires a Google account login) |
| **dd** | Drops your clipboard (text or image) into Claude Code without pasting (`/dd`, `/ㅇㅇ`) |
| **gaseo** | Sends the current Claude Code session to the Paseo app so you can continue it there (`/gaseo`) |
| **tikeytaka** | Gathers API keys scattered across `.env` files into one encrypted central vault and keeps them in sync |
| **ddiring** | Completion alerts across multiple sessions, with click-to-jump to the session (macOS; Windows Git Bash is experimental) |
| **sangse** | Generates Korean e-commerce product detail pages from product info alone, with a compliance filter and 3-stage QA (`/sangse`) |

---

## Installation

### Step 1: Register the Marketplace (One-Time)

Inside Claude Code, run:

```shell
/plugin marketplace add https://github.com/fivetaku/gptaku_plugins.git
```

### Step 2: Install Plugins

Once the marketplace is registered, install the plugins you want:

```shell
/plugin install
```

Select the plugin you want from the list, or specify it by name:

```shell
/plugin install show-me-the-prd@gptaku-plugins
```

> **Note**: One plugin installs at a time. Repeat for multiple installations.

### Step 3: Verify Installation

```shell
/plugin list
```

Or type `/plugin` and navigate to the **Installed tab**.

### Step 4: Update

When new versions are available, update with:

```shell
/plugin update
```

> Changes made in the `/plugin` menu take effect as soon as you close the menu. If you installed or updated via command and the new skills don't show up, run `/reload-plugins`. There's no need to restart Claude Code.

### Step 5: Try a Plugin

Once installed, plugins are ready to use immediately:

```shell
# Try git-teacher
/git-teacher:what-is-commit

# Try docs-guide
/docs-guide:explain useState

# Ask vibe-sunsang for help
/vibe-sunsang:help
```

---

## Managing Plugins

| Command | Description |
|---------|-------------|
| `/plugin` | Open plugin manager (Discover / Installed / Marketplaces / Errors tabs) |
| `/plugin list` | List installed plugins |
| `/plugin disable plugin-name` | Temporarily disable a plugin |
| `/plugin enable plugin-name` | Re-enable a disabled plugin |
| `/plugin uninstall plugin-name` | Completely remove a plugin |
| `/reload-plugins` | Apply plugin changes without restarting |

> You choose a scope when installing: **User** (every project on this computer), **Project** (everyone working in this repository — recorded in `.claude/settings.json`), or **Local** (just you, in this repository). Plugins installed from the terminal are also available in the desktop app and the VS Code extension on the same computer.

---

## ⭐ Please Star Us on GitHub!

If gptaku_plugins has been helpful, please give us a star on GitHub.

Your star helps keep this project growing and improving.

**[→ Star on GitHub](https://github.com/fivetaku/gptaku_plugins)**

> It's easy — just click the link and press the ⭐ Star button in the top right!

---

## Next Steps

Now that you have plugins installed, let's understand how Claude Code actually works under the hood.

→ **[05. Core Concepts](./05-core-concepts.md)**
