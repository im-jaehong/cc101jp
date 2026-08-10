# 19. Cost Management & Saving Tips

> Learn how to use Claude Code smarter and cheaper.

---

## Cost Structure at a Glance

Claude Code has two main pricing models:

| Type | Model | Details |
|------|-------|---------|
| **Claude.ai Pro / Max** | Flat-rate subscription | Fixed monthly fee, no separate API costs |
| **Anthropic API** | Pay-as-you-go | Charges based on tokens consumed |

**Claude.ai Pro/Max subscribers** have Claude Code usage included in their subscription — no additional API charges. The dollar figure shown by `/usage` (formerly `/cost`) is intended for API users, so subscribers can treat it as informational only; the same screen shows plan usage bars.

**API users** are charged based on usage. According to official documentation (as of August 2026), the average cost is approximately **$13 per developer per active day and $150–$250 per month**, staying under $30 per active day for 90% of users.

---

## What Is a Token?

A **token** is the unit Claude uses to process text.

- English: roughly 1 word = 1–2 tokens
- A useful rule of thumb: **~4 characters ≈ 1 token**

In practice, tokens are consumed every time Claude reads a file, receives your message, or sends a response. The longer your conversation context grows, the more tokens each message costs.

---

## When Costs Run High

### 1. Repeatedly Reading Large Files

Every time Claude reads a file, it consumes tokens. Reading a 10,000-line log file in full can cost tens of thousands of tokens in one shot.

### 2. Keeping Context Open Too Long

As a conversation grows, all prior content stays in context. Continuing unrelated tasks in the same session causes irrelevant information to accumulate, driving up costs unnecessarily.

### 3. Using High-Power Models for Simple Tasks

Opus is more capable than Sonnet, but it also costs more per token. Using Opus for routine tasks is inefficient.

### 4. Uncontrolled Automation (CI/CD)

When running Claude Code through GitHub Actions or similar pipelines without guardrails, large volumes of tokens can be consumed without anyone noticing.

---

## 5 Tips to Save Costs

### Tip 1: Compress Context with `/compact`

When a conversation grows long, run `/compact` to summarize prior content and reduce context size.

```
/compact Focus on code changes and test results
```

This preserves the important information while compressing unnecessary conversation history.

You can also set compaction behavior in advance in your CLAUDE.md:

```markdown
# Compact instructions

When you are using compact, please focus on test output and code changes
```

> **Also useful**: `/clear` resets context entirely. Great when switching to a completely different task.

---

### Tip 2: Avoid Unnecessary File References

Vague requests cause Claude to read far more files than needed.

| Inefficient | Efficient |
|-------------|-----------|
| "Improve this codebase" | "Add input validation to the login function in auth.ts" |
| "Find the bug" | "Check src/auth/ for a login failure that happens after session expiry" |

Specific requests mean Claude reads only what it needs — fewer tokens consumed.

---

### Tip 3: Use the Haiku Model for Simple Tasks

Not every task needs the most powerful model.

| Model | Best For | Cost |
|-------|----------|------|
| **Haiku** | Quick questions, summaries, simple tasks | Lowest |
| **Sonnet** | General coding tasks (recommended default) | Medium |
| **Opus** | Complex architecture, difficult reasoning | Highest |

Switch models during a session:

```
/model haiku
```

Or specify at startup:

```bash
claude --model haiku
```

**`opusplan` mode**: A hybrid that automatically uses Opus during planning and Sonnet during execution — best of both worlds.

```
/model opusplan
```

---

### Tip 4: Use Fast Mode Wisely

The `/fast` command enables Fast Mode, making Opus respond approximately 2.5x faster. It is supported on **Opus 5 and Opus 4.8** (Opus 5 is the default from Claude Code v2.1.219).

```
/fast
```

However, Fast Mode has **higher per-token pricing** ($10 input / $50 output per MTok on Opus 5 — twice the standard Opus 5 rate). Use it when speed matters (rapid iteration, live debugging) and turn it off for long autonomous tasks where latency is less critical. Run `/fast` again at any time to check whether it's on or off.

> **Note**: Fast Mode is billed as extra usage and is not included in your subscription's standard rate limits.

---

### Tip 5: Check Costs Regularly with `/usage`

Check token usage for the current session at any time (`/cost` is an alias for the same command):

```
/usage
```

Example output:
```
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

Subscribers also see plan usage bars and an attribution breakdown (skills, subagents, plugins, MCP servers) on the same screen; `/stats` shows session statistics.

You can also configure the status line to display context usage in real time.

---

## Model Cost Comparison (Summary)

(List API pricing as of August 2026, per million tokens, input / output)

| Model | Characteristics | Context | Input / Output |
|-------|----------------|---------|----------------|
| Haiku 4.5 | Fastest and cheapest, simple tasks | 200K | $1 / $5 |
| Sonnet 5 | Best speed-to-intelligence balance, everyday coding | 1M | $3 / $15 |
| Opus 5 | Complex agentic coding and reasoning | 1M | $5 / $25 |
| Fable 5 | Hardest, longest-running autonomous work | 1M | $10 / $50 |
| Opus 5 (Fast Mode) | 2.5x faster Opus 5 | 1M | $10 / $50 |

> Sonnet 5 has **introductory pricing of $2 / $10 through August 31, 2026**.
> For current pricing, see the [Anthropic pricing page](https://claude.com/pricing) and the [API pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).

---

## The Advantage of Claude.ai Max

Claude.ai Pro and Max subscribers can use Claude Code **without pay-as-you-go API charges**.

- Claude Code usage is included in the monthly subscription
- No API key required
- Freedom to experiment without watching per-token costs
- Max plan includes higher usage limits

> **Note**: Fast Mode and usage beyond your plan's limit may be billed as extra usage (usage credits) even on subscription plans.

---

## Team Cost Management

For teams using the API:

- **Set workspace spend limits**: Configure team-wide spending caps in the [Anthropic Console](https://platform.claude.com).
- **Usage dashboard**: View per-member cost and usage data in the Console.
- **Watch out for Agent Teams**: Running multiple Claude instances simultaneously (Agent Teams) uses approximately 7x more tokens than standard sessions. The feature is **experimental and disabled by default** — enable it with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `settings.json`.

---

## Summary: Cost-Saving Checklist

```
✅ Run /clear between unrelated tasks
✅ Start a new session when switching topics
✅ Specify exact file names and function names in prompts
✅ Use Haiku for simple tasks
✅ Enable Fast Mode only when speed is critical
✅ Check /usage (= /cost) regularly
✅ Set compact instructions in CLAUDE.md
```
