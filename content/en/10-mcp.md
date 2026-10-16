# 14. MCP & External Tool Integrations

> The standard protocol that lets Claude directly operate GitHub, Slack, databases, and browsers

---

## What is MCP?

**MCP (Model Context Protocol)** is an open standard that lets Claude Code connect to external tools and data sources.

By default, Claude Code only works with your local files and terminal. Connect an MCP server, and Claude can open GitHub PRs directly, read Slack messages, query your database, and interact with the outside world — no copy-pasting required.

> **Analogy**: MCP is like giving Claude a USB port. Plug in any compatible tool and Claude can use it natively.

---

## Manual work MCP eliminates

| Without MCP | With MCP |
|-------------|----------|
| Copy JIRA ticket content, paste it to Claude | "Implement ENG-4521" — one sentence |
| Manually copy Sentry stack traces | "Analyze top errors from the last 24 hours" |
| Explain your DB schema, then ask for a query | "Find users with no purchase in 90 days" |
| Read Figma designs and code them by hand | "Update the email template from the latest Figma designs" |
| Copy PR content and request a review | "Review PR #456" — done |

---

## What you can do with MCP

### GitHub — Direct PR and issue operations

```bash
# Add the GitHub MCP server
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Once connected
> "Review PR #456 and suggest improvements"
> "Create a new issue for the bug we just found"
> "Show me all open PRs assigned to me"
```

### Sentry — Production error analysis

```bash
# Add Sentry
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# After authenticating with /mcp
> "What are the most common errors in the last 24 hours?"
> "Show me the stack trace for error ID abc123"
> "Which deployment introduced these new errors?"
```

### PostgreSQL — Query your database directly

```bash
# Add the DB server (read-only recommended)
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"

# Once connected
> "What's our total revenue this month?"
> "Show me the schema for the orders table"
> "Find customers who haven't made a purchase in 90 days"
```

### Slack — Read and send messages

With the Slack integration, Claude receives the full thread context from your workspace. When a bug report appears in a channel, Claude can read that thread and start coding immediately — with all the context already included.

### Notion, Asana, Figma, and more

Anthropic's reviewed connector directory ([claude.ai/directory](https://claude.ai/directory)) lists hundreds of MCP servers including Notion, Asana, and Figma. You can also [build your own](https://modelcontextprotocol.io/quickstart/server) using the open-source MCP SDK.

---

## Installing MCP servers

### Option 1: Remote HTTP server (recommended)

```bash
# Basic syntax
claude mcp add --transport http <name> <url>

# Example: Connect to Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# With a Bearer token
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

> The older SSE transport (`--transport sse`) is no longer recommended. Claude Code tries HTTP first and falls back to SSE automatically (v2.1.265+), so use `--transport http` unless you have a specific reason not to.

### Option 2: Local stdio server

Runs as a local process on your machine. Ideal for tools that need direct system access or custom scripts.

```bash
# Basic syntax
claude mcp add [options] <name> -- <command> [args...]

# Example: Add Airtable
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server
```

### Managing your servers

```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get github

# Remove a server
claude mcp remove github

# Import servers configured in the Claude Desktop app (macOS / WSL)
claude mcp add-from-claude-desktop

# Check status, authenticate, and toggle servers inside Claude Code
/mcp
```

> Even with many MCP servers connected, tool definitions **don't enter your context until they're actually used** (only tool names and server descriptions are loaded). That said, CLI tools like `gh` or `aws` use less context than MCP, so prefer the CLI when both are available. Use `/context` to see what's taking up space.

---

## Configuration scopes

MCP server settings are stored in one of three places depending on who should use them:

| Scope | Location | Purpose |
|-------|----------|---------|
| **Local** (default) | `~/.claude.json` | This project only, private |
| **Project** | `.mcp.json` (project root) | Shared with the team via version control |
| **User** | `~/.claude.json` | All your projects |

```bash
# Add as project scope (shared with team)
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp

# Add as user scope (all your projects)
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

For team projects, commit `.mcp.json` to Git so every team member gets the same MCP servers automatically.

---

## Top 3 MCP servers to start with

Recommended by practical value for most developers:

### 1. GitHub MCP

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

**Eliminates**: copying PR content, manually browsing issues, assembling code review context

### 2. PostgreSQL / DB MCP

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@localhost:5432/mydb"
```

**Eliminates**: explaining schema by hand, copying query results, running queries separately

### 3. Sentry MCP

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

**Eliminates**: copying stack traces, manually correlating errors to deploys

---

## Automatic claude.ai connector sync

If you sign into Claude Code with a Claude.ai account, the connectors you've linked at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) (Notion, Slack, Google Drive, Gmail, and so on) are automatically available in Claude Code. They appear in `/mcp` with a claude.ai label; you can disable them individually, or turn them all off by adding `"disableClaudeAiConnectors": true` to your settings.

- Connectors are not imported if you log in with an API key or use an external platform such as Bedrock.
- If you've added a server with the same URL locally, the local configuration takes precedence.

---

## Authenticating with OAuth-protected servers

Many cloud MCP servers require OAuth authentication:

```bash
# Step 1: Add the server
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# Step 2: Authenticate from inside Claude Code
> /mcp

# A browser window opens → log in → done
```

Authentication tokens are stored securely and refresh automatically.

---

## Using MCP prompts as slash commands

When an MCP server exposes prompts, you can run them directly as `/mcp__servername__promptname`:

```
> /mcp__github__list_prs
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "Login bug" high
```

---

## MCP resources with @ mentions

MCP servers can expose resources you reference with `@`:

```
> Can you analyze @github:issue://123 and suggest a fix?
> Compare @postgres:schema://users with @docs:file://database/user-model
```

Type `@` in your prompt to see all available resources from connected servers.

---

## ⚠️ Security warning

**Do not install MCP servers from untrusted sources.**

- MCP servers can access your file system, databases, and external services through Claude
- Servers that fetch external content are particularly risky — they can expose you to **prompt injection attacks**
- [claude.ai/directory](https://claude.ai/directory) collects connectors reviewed by Anthropic. For any other server, always review the source code and who operates it before installing

```bash
# Project-scoped (.mcp.json) servers prompt each teammate for approval on first use
# (a built-in safety check for shared configurations). To reset those choices:
claude mcp reset-project-choices
```

---

## One-line summary

> MCP = plug-in ports for Claude. Connect GitHub, databases, and Slack so Claude operates them directly — eliminating the copy-paste work between tools.

Next section: automate Claude Code's behavior with Hooks.
