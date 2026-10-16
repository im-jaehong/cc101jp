# 05. Installation & Authentication

> One command in the terminal to install, then log in through your browser — that's it.

---

> 💡 **New to the terminal?** Just **copy and paste (Cmd+V or Ctrl+V)** the commands below exactly as written and press Enter. You don't need to understand what they mean.
> - **macOS**: `Cmd+Space` → search "terminal" → Enter
> - **Windows**: `Win+R` → type "powershell" → Enter
>
> If the terminal itself feels intimidating, install the **Claude desktop app** (macOS / Windows / Ubuntu·Debian beta) and click the **Code** tab. Claude Code is built into the app, so there's no separate CLI to install, and you can see changes right on screen.

---

## Before You Install

### Supported Operating Systems

| OS | Supported Versions |
|---|---|
| **macOS** | 13.0 or later |
| **Linux** | Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ |
| **Windows** | Windows 10 (1809+) or Windows Server 2019+ |

### Hardware Requirements

- RAM: 4 GB or more
- CPU: x64 or ARM64
- Shell: Bash, Zsh, PowerShell, or CMD
- Active internet connection required

### Do I Need Node.js?

**No.** Claude Code uses a native installation. You do not need to install Node.js separately.

> 💡 **npm installation is still supported.** `npm install -g @anthropic-ai/claude-code` installs the **same native binary** as the installer below (it requires Node.js 22 or later). The native install is still the recommended path, so use it unless you have a specific reason not to.

---

## Installation

### macOS / Linux / WSL (Windows Subsystem for Linux)

Open your terminal and paste the following command:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Or, if you use Homebrew:

```bash
brew install --cask claude-code          # stable channel: about a week behind, but skips major regressions
brew install --cask claude-code@latest   # latest channel: every new version as soon as it ships
```

### Windows

**Option 1 — PowerShell (recommended):**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Option 2 — WinGet:**

```powershell
winget install Anthropic.ClaudeCode
```

**Option 3 — CMD:**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> On Windows, [Git for Windows](https://git-scm.com/downloads/win) is **optional but recommended**. With it installed, Claude Code uses the Bash tool through Git Bash; without it, it falls back to the PowerShell tool.

### Alpine Linux Additional Packages

```bash
apk add bash curl libgcc libstdc++ ripgrep
```

---

## Authentication (Logging In)

Once installation is complete, run the following in your terminal:

```bash
claude
```

On first launch, **your browser opens automatically to an OAuth login page**. Log in with your Claude.ai account, authentication completes automatically, and the terminal shows `Login successful`.

> ⚠️ **The free Claude.ai plan does not include Claude Code.** You need a Pro, Max, Team, Enterprise, or Console (API) account.
>
> If the browser doesn't open on its own, press `c` in the terminal to copy the login URL and paste it into a browser yourself. In environments where the browser can't hand control back to the terminal (WSL2, SSH, containers), the browser shows a **login code** instead — paste that code into the terminal at the `Paste code here if prompted` prompt.

### Authentication Flow

```
Run claude in terminal
       ↓
Browser opens automatically (OAuth page)
       ↓
Log in with your Claude.ai account
       ↓
Returns to terminal → Authentication complete
```

### Credential Security

- **macOS**: API keys and OAuth tokens are stored securely in the **encrypted macOS Keychain**.
- **Linux / Windows**: stored in `~/.claude/.credentials.json` (`%USERPROFILE%\.claude\.credentials.json` on Windows) with permissions that only your own account can read.
- To re-authenticate: run `claude` and type `/login`. To switch accounts, run `/logout` and log in again.
- Starting 3 days before your login expires, you'll see a `run /login to renew` warning at startup. Run `/login` ahead of time to renew it.

---

## Verify Your Installation

To confirm installation and authentication succeeded:

```bash
claude --version
```

If a version number is printed, the installation is working correctly. To run a full environment check:

```bash
claude doctor
```

This command shows your installation type, version, and environment health in one step.

---

## Automatic Updates

The native install **updates itself automatically**. It checks for updates at startup, downloads in the background, and applies the new version the next time you launch it.

> Installs made through Homebrew, WinGet, or a Linux package manager do not auto-update. Run `brew upgrade claude-code`, `winget upgrade Anthropic.ClaudeCode`, or the equivalent yourself. (For Homebrew and WinGet, setting `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` in your settings lets Claude Code run the upgrade command for you.)

To update manually:

```bash
claude update
```

### Choosing an Update Channel

You can pick between **latest** (the default), which gets new features right away, and **stable**, which runs about a week behind but skips versions with major regressions. Change it under `/config` → **Auto-update channel**, or set it in `~/.claude/settings.json`:

```json
{
  "autoUpdatesChannel": "stable"
}
```

> A freshly released model may require a newer version than the stable channel offers. If you want to try new models as soon as they come out, stay on latest.

---

## Common Installation Problems & Fixes

### Problem 1: `curl: command not found`

**Cause**: curl is not installed (rare, mainly on minimal Linux environments).

**Fix**:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# Alpine
apk add curl
```

Then re-run the installation command.

---

### Problem 2: `claude: command not found` after installation

**Cause**: The installation path is not registered in your shell's PATH.

**Fix**:
```bash
# Reload your shell config immediately
source ~/.bashrc
# Or for zsh users
source ~/.zshrc
```

If that does not work, close the terminal completely and reopen it.

---

### Problem 3: Windows says there's no Bash tool or can't find Git Bash

**Cause**: Without Git for Windows, Claude Code runs commands through the **PowerShell tool** instead of Bash. It works fine, but some shell-script examples and plugins expect Bash.

**Fix**: Download and install [Git for Windows](https://git-scm.com/downloads/win), then restart. If it still can't be found after installing, set the path in `~/.claude/settings.json`:

```json
{
  "env": { "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe" }
}
```

---

### Problem 4: `claude --version` shows an old version

**Cause**: npm, Homebrew, and native installs are mixed together, and a different install is being picked up first.

**Fix**: Run `claude doctor` to check the installation type, then remove the installs you don't use (`npm uninstall -g @anthropic-ai/claude-code`, `brew uninstall --cask claude-code`, etc.).

---

## Next Steps

Once installation and authentication are complete, navigate to your project folder and start:

```bash
cd your-project-folder
claude
```

Claude Code will analyze your project and wait to help you.
