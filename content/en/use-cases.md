# 02. What You Can Do with Claude Code

> This entire site (CC101) was built without writing a single line of code. Claude Code is not a coding tool — it's a terminal-based AI agent with access to your file system.

---

## First: How Is It Different from the Web UI (Claude.ai)?

| | Claude.ai (Web) | Claude Code (Terminal) |
|--|----------------|----------------------|
| File access | Attach files only | Read & modify entire folders |
| Work scope | One conversation | Dozens of files simultaneously |
| External execution | Not possible | Run terminal commands directly |
| Automation | Manual every time | Automate with Skills & Hooks |
| Memory | Within conversation only | Permanent memory via CLAUDE.md |

In short: **If Claude.ai is a conversation partner, Claude Code is an AI colleague working inside your computer.**

---

## What You Can Do

### Development
Write code, fix bugs, refactor, test, review
→ Covered throughout many sections of this guide

### Research & Analysis
- Read multiple web pages simultaneously and organize into markdown
- Competitor analysis, market research, tech trend tracking
- Batch summarize dozens of PDFs and documents

### Documents & Content Creation
- Blog posts, newsletters, social media content drafts
- Proposals, reports, presentation outlines
- Korean ↔ English translation saved directly to files

### Data Processing
- Analyze and convert CSV, Excel files — **no Python required**
- Batch process hundreds of files (rename, convert, organize)
- Parse and transform JSON, XML data

### Learning Assistant
- Structure and summarize lecture materials or books
- Auto-generate quizzes and flashcards
- Concepts + examples + practice problems

### Business Workflows
- Meeting transcripts → summary + decisions + action items per person
- Weekly/monthly report automation
- Email drafts, customer response templates

### Personal AI Workspace
Define roles and rules in CLAUDE.md, and you have **your own AI agent system** — not just a chat tool.
→ Covered in detail in Advanced Section 17

---

## Real Example: How CC101 Was Built

> **Not a single line of code was written by hand**

**Planning**
"I want to build a Korean Claude Code guide like Codex 101"
→ 3 AIs (Claude, Codex, Gemini) debated section structure, UX, and tech stack in an ideation workspace
→ 20-section structure decided

**Content**
57 official docs collected → Claude extracted key content → structured into Korean & English markdown

**Development**
Full Next.js site code → written by Claude Code
Dark/light mode, language toggle, mobile support → all through conversation

**Deployment**
Vercel deployment, Cloudflare DNS setup, domain connection → handled by Claude Code

**Operations & Refinement**
After the first draft, the user reviewed the content and kept improving it through conversation — "add this part", "rewrite this differently"
**This very conversation is a CC101 update session**

---

## Real Non-Developer Use Case

```
Situation: Need to write up meeting notes every week after team calls

Old way:
  Meeting ends → organize notes 30 min → write email 10 min → share

Claude Code way:
  Paste meeting transcript
  → "Summarize, list decisions, and sort action items by person"
  → Saved as markdown file + email draft generated automatically
  Total time: 3 minutes
```

---

## Try It Today

Once installed, you can start right now:

```
1. Summarize a document
   Put a PDF or text file in a folder and say:
   "Summarize the key points of this document in 3 sentences"

2. Draft an email
   "Write an email draft for this situation: [describe situation]"

3. Process data
   Put a CSV in a folder and say:
   "Sort by [column name] and give me a summary of this data"
```

No coding experience required.

---

> The rest of this guide is about "how to use it better." Start by installing and trying it out.
