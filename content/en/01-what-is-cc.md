# 01. What Is Claude Code?

> An AI coding assistant that runs in your terminal — reads your codebase, edits files, and executes commands directly.

---

## One-Line Definition

**Claude Code** is an AI-powered coding tool that runs in your terminal (command line). It reads your code, edits files directly, runs tests, and even creates Git commits. Think of it as "an AI development partner that works inside your computer."

---

## Claude.ai Web vs Claude Code vs Cursor — Key Differences

| | Claude.ai Web | Claude Code | Cursor |
|---|---|---|---|
| **Where it runs** | Browser | Terminal / Desktop app / IDE | IDE (editor) |
| **Edits files directly** | No (copy-paste required) | Yes (automatic) | Yes |
| **Runs commands** | No | Yes (tests, builds, etc.) | Limited |
| **Understands full codebase** | Manual paste required | Reads automatically | Reads automatically |
| **Git integration** | No | Yes (commits, PRs) | Limited |
| **Pricing** | Included in subscription | Subscription or API billing | Separate subscription |

**The core difference**: Claude.ai web shows you code suggestions in a chat window. Claude Code actually opens files, modifies them, saves them, and runs them.

---

## Why Running in the CLI Makes It Powerful

Claude Code running in the terminal is not just a design choice. The terminal is the gateway to everything your computer can do.

### What Claude Code Can Do Directly

| Capability | Description |
|---|---|
| **Read & write files** | Reads all files in your project and edits them directly |
| **Execute commands** | Run tests, builds, start servers, and more |
| **Search** | Find files by name, search code content, explore the codebase with regex |
| **Git operations** | Stage changes, commit, create branches, open pull requests |
| **Web search** | Look up error messages, fetch documentation |
| **Code intelligence** | Detect type errors, jump to definitions, find references |

### How It Actually Works (Examples)

**Example 1: Fixing a bug**

```
User: "My tests are failing, please fix them"

What Claude Code does:
1. Runs the test suite → identifies failures
2. Reads error output
3. Searches for relevant source files
4. Reads files to understand the code
5. Edits files (applies bug fix)
6. Runs tests again → confirms they pass
```

**Example 2: Adding a new feature**

```
User: "Add input validation to the login form"

What Claude Code does:
1. Understands the project structure
2. Finds the existing form code
3. Writes validation logic and inserts it into the file
4. Writes related tests
5. Creates a descriptive Git commit
```

---

## Who Is Claude Code For?

### Great Fit

| User Type | Why |
|---|---|
| **Vibe coders** | Developers who want to focus on direction rather than writing every line |
| **Non-developer founders** | People who want to turn ideas into real code without deep technical knowledge |
| **Beginner developers** | Those learning to code while building real projects simultaneously |
| **Solo developers** | Building full-stack products fast, alone |
| **Developers with repetitive tasks** | Automating tests, lint fixes, dependency updates, and similar work |

### Also a Good Fit For

- Non-technical people who "know what code is but can't write it"
- People unfamiliar with the terminal who want to learn (a desktop app is available)
- Startup team members who need to ship an MVP quickly

### May Not Be the Best Fit

- People who only need writing, translation, or analysis → Claude.ai web is sufficient
- People who prefer working exclusively inside a specific IDE → Consider Cursor or the VS Code extension

---

## Where Can You Use Claude Code?

Claude Code is not limited to the terminal.

| Environment | Description |
|---|---|
| **Terminal (CLI)** | The most powerful default environment |
| **Desktop app** | GUI with visual diffs, no terminal required |
| **VS Code / Cursor extension** | Use directly inside your editor |
| **JetBrains plugin** | IntelliJ, PyCharm, WebStorm, and more |
| **Web browser** | Run at claude.ai/code with no local setup |

---

## One-Line Summary

> Claude Code = "An AI developer that accesses your project folder directly, writes code, runs tests, and commits changes"

The next section covers which plan to start with.
