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
| **MCP Servers** | Connections to external services like GitHub, Figma, and more |

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

| Plugin Name | Role | Example Usage |
|-------------|------|---------------|
| **docs-guide** | Answers questions based on official library documentation — no hallucinations, just accurate info | `/docs-guide:explain React hooks` |
| **git-teacher** | Git onboarding for non-developers. Guides you step by step from "what is a commit?" to real-world workflows | `/git-teacher:what-is-commit` |
| **vibe-sunsang** | An AI mentor for vibe coders. Encourages and guides you to turn ideas into products, even without coding knowledge | `/vibe-sunsang:help` |

---

## Installation

### Step 1: Add the Marketplace and Install Plugins

Inside Claude Code, run:

```shell
/plugin install https://github.com/fivetaku/gptaku_plugins
```

Or add the marketplace first and browse:

```shell
# Add the marketplace
/plugin marketplace add fivetaku/gptaku_plugins

# Then open the plugin manager and go to the Discover tab
/plugin
```

### Step 2: Verify Installation

Check your installed plugins:

```shell
/plugin list
```

Or type `/plugin` and navigate to the **Installed tab**.

### Step 3: Try a Plugin

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
