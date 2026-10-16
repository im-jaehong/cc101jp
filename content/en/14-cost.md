# 19. Cost Management & Saving Tips

> Learn how to use Claude Code smarter and cheaper.

---

## Cost Structure at a Glance

Claude Code has two main pricing models:

| Type | Model | Details |
|------|-------|---------|
| **Claude.ai Pro / Max** | Flat-rate subscription | Fixed monthly fee, no separate API costs |
| **Anthropic API** | Pay-as-you-go | Charges based on tokens consumed |

**Claude.ai Pro/Max subscribers** have Claude Code usage included in their subscription — no additional API charges. The dollar figure shown by `/usage` (`/cost` is an alias) is intended for API users, so subscribers can treat it as informational only; the same screen shows plan usage bars.

**API users** are charged based on usage. According to official documentation (as of October 2026), the average cost is approximately **$13 per developer per active day and $150–$250 per month**, staying under $30 per active day for 90% of users.

Subscribers who exhaust their plan limits can turn on **extra usage (usage credits)** to keep working on a pay-as-you-go basis. `/usage-credits` opens the settings page, where you can set a monthly spend cap.

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

### 3. Using High-Power Models or High Effort Levels

Opus is more capable than Sonnet, but it also costs more per token. Using Opus for routine tasks is inefficient. Raising the effort level (`/effort`) to `xhigh` or `max` likewise increases the thinking tokens (billed as output tokens).

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
| **Haiku 5.5** | Quick questions, summaries, simple tasks, sub-agents | Very low (1/40 of Opus) |
| **Sonnet 5.5** | General coding and document work | Medium (1/2 of Opus) |
| **Opus 5.5** | Complex design, difficult reasoning — default model on every plan | High |
| **Fable 5.1** | The hardest, longest-running autonomous work (separate access required) | Very high |

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

**Lower the effort level**: Without switching models, `/effort low` or `/effort medium` reduces how much Claude thinks. The default on Opus 5.5 / Sonnet 5.5 / Haiku 5.5 is `medium`, and `low` is often enough for simple repetitive work. (These models can't turn extended thinking off entirely — you only adjust the level.)

---

### Tip 4: Use Fast Mode Wisely

The `/fast` command enables Fast Mode, making Opus respond up to 2.5x faster. It is supported on **Opus 5.5, Opus 5, and Opus 4.8** (Opus 5.5 is the default from Claude Code v2.1.280). It is not available on Sonnet or Haiku.

```
/fast
```

However, Fast Mode has **higher per-token pricing** ($8 input / $40 output per MTok on Opus 5.5 — twice the standard Opus 5.5 rate). Use it when speed matters (rapid iteration, live debugging) and turn it off for long autonomous tasks where latency is less critical. While it's on, a `↯` icon appears next to the prompt, and running `/fast` again shows whether it's on or off. Turning it on mid-conversation re-reads the entire context up to that point at Fast Mode rates, so if you're going to use it, enabling it at the start of a session is cheaper.

> **Note**: Fast Mode is not included in your subscription's standard usage — it draws from **extra usage (usage credits)**. If you haven't enabled extra usage, `/fast` reports "Fast mode requires usage credits." Fast Mode is still a research preview, so pricing and conditions may change.

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

Subscribers also see plan usage bars and an attribution breakdown (skills, subagents, plugins, MCP servers, plus usage-inflating habits such as long context or cache misses) on the same screen. `/stats` jumps straight to the Stats tab of that screen.

You can also configure the status line to display context usage in real time (`/statusline`). If you're curious about *how* you're working rather than raw token counts, `/insights` generates an analysis report of your recent sessions.

> **Long sessions get expensive quietly.** Even a one-line question resends the entire conversation on every request. If you step away for more than an hour, the cache expires and the full context is reprocessed — which is why Pro/Max users resuming a large session are asked whether to "resume from summary." When a task is done, `/clear`; if you're continuing it, `/compact`.

---

## Model Cost Comparison (Summary)

(List API pricing as of October 2026, per million tokens, input / output)

| Model | Characteristics | Context | Input / Output |
|-------|----------------|---------|----------------|
| Haiku 5.5 | Fastest and cheapest, simple tasks and sub-agents | 1M | $0.10 / $0.50 (prompts over 100K tokens: $0.50 / $2.50) |
| Sonnet 5.5 | Best speed-to-intelligence balance, everyday coding | 1M | $2 / $10 |
| Opus 5.5 | Complex agentic coding and reasoning (default model) | 1M | $4 / $20 |
| Fable 5.1 | Hardest, longest-running autonomous work | 1M | $10 / $50 |
| Opus 5.5 (Fast Mode) | Up to 2.5x faster Opus 5.5 | 1M | $8 / $40 |

> The previous generation (Opus 5 $5/$25, Sonnet 5 $2/$10, Haiku 4.5 $1/$5, 200K) is still available, but the aliases (`opus`, `sonnet`, `haiku`) all point to the 5.5 generation.
> For current pricing, see the [Anthropic pricing page](https://claude.com/pricing) and the [API pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).

---

## The Advantage of Claude.ai Max

Claude.ai Pro and Max subscribers can use Claude Code **without pay-as-you-go API charges**.

- Claude Code usage is included in the monthly subscription
- No API key required
- Freedom to experiment without watching per-token costs
- Max plan includes higher usage limits

> **Note: Fast Mode draws from extra usage (usage credits), separate from your subscription limits.** If you hit your plan limit (which resets on a 5-hour and a weekly cycle), you can wait for the reset or enable extra usage with `/usage-credits` to keep going.

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
✅ Use Haiku for simple tasks, or lower the effort level with /effort low or medium
✅ Enable Fast Mode only when speed is critical (draws from usage credits)
✅ Check /usage (= /cost) regularly
✅ Set compact instructions in CLAUDE.md
```
