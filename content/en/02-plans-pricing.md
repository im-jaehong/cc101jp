# 04. Plans & Pricing

> There are 3 ways to use Claude Code. Beginners should start with the Max $100 plan.

---

## 3 Ways to Use Claude Code

### Option 1. Claude.ai Subscription (Pro / Max) — Recommended for individuals

The simplest option. Subscribe to Claude.ai and Claude Code is included immediately. You pay a fixed monthly fee without tracking token usage.

### Option 2. Anthropic API — For developers and automation

Obtain an API key from the Anthropic Console and connect it to Claude Code. You are billed per token (unit of text processed). Best suited for automation pipelines and CI/CD integrations.

### Option 3. Enterprise Cloud — For teams with security requirements

Use Claude Code through Amazon Bedrock, Google Vertex AI, or Microsoft Foundry. Your data stays within your company's cloud infrastructure.

---

## Pro vs Max Plan Comparison

> Prices below are current as of **August 2026**. Check the latest at [claude.com/pricing](https://claude.com/pricing).

| | **Pro** | **Max (5x)** | **Max (20x)** |
|---|---|---|---|
| **Monthly price** | $20 ($17 billed annually) | $100 | $200 |
| **Usage limit** | Standard | 5× Pro | 20× Pro |
| **Claude Code included** | Yes | Yes | Yes |
| **Claude.ai web included** | Yes | Yes | Yes |
| **Best for** | Occasional use, exploration | Regular Claude Code users | Heavy users, large projects |

> **The Free plan does not include Claude Code.** You need a Pro, Max, Team, Enterprise, or Console (API) account.
>
> For teams, **Team** ($25/seat monthly, $20 billed annually) and **Enterprise** (custom pricing) also include Claude Code.

### Recommended for Beginners: Max $100

If you plan to use Claude Code seriously, the **Max $100 plan** is the recommended starting point. Here's why:

- The Pro ($20) usage limit fills up quickly when using Claude Code intensively.
- Direct API usage carries per-token billing, which can lead to unexpected charges.
- Max $100 is sufficient for most individual developers based on average daily usage.

According to official documentation (as of August 2026), average API costs run approximately **$13 per developer per active day, or $150–$250 per month**, staying under $30 per active day for 90% of users — with significant variation based on usage intensity.

---

## How Billing Works

### Subscription Plans (Pro / Max)

```
Pay monthly → Use freely within your usage limit
If limit is reached → Responses are throttled (no extra charge)
```

- No need to track token counts
- Usage limit resets after a period

### Direct API Usage

```
Charged per token consumed (input tokens + output tokens)
Rate varies by model (Sonnet < Opus)
```

- Use the `/usage` command to check current session costs (`/cost` is an alias for `/usage`)
- Set spending limits in the Console for team or automated usage

---

## ⚠️ Cost Warnings

### Watch Out When Using the API

```
⚠️ API usage is billed based on what you consume.
```

- Long working sessions on large projects can drain tokens quickly.
- The Agent Teams feature (running multiple AI instances simultaneously) uses approximately **7× more tokens** than standard sessions. It is currently **experimental and disabled by default** (enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).
- Background operations such as conversation summarization consume a small amount of tokens even when idle (typically under $0.04 per session).

### Tips to Reduce Costs

| Method | Description |
|---|---|
| Run `/clear` between tasks | Clears conversation context to save tokens |
| Use Sonnet model first | Cheaper than Opus and sufficient for most tasks |
| Write specific requests | Specify the exact file or function instead of "improve the entire codebase" |
| Minimize MCP servers | Disable connections you are not actively using |

---

## Which Plan Should You Start With?

```
Just want to try it out         → Pro ($20) to explore
Ready to use it seriously       → Max $100 (strongly recommended)
Automation or team use          → API or Enterprise
Organization with compliance    → Bedrock / Vertex / Foundry
```

---

## Pricing Page

For the latest pricing and plan comparison: [https://claude.com/pricing](https://claude.com/pricing)
