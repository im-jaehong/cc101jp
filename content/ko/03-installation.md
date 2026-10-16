# 05. 설치 & 인증

> 터미널에서 명령어 하나로 설치, 브라우저에서 로그인하면 끝입니다.

---

> 💡 **터미널이 처음이신가요?** 아래 명령어를 그대로 **복사해서 붙여넣기(Cmd+V 또는 Ctrl+V)** 한 후 Enter만 누르면 됩니다. 명령어의 의미를 이해할 필요가 없습니다.
> - **macOS**: `Cmd+Space` → "terminal" 검색 → Enter
> - **Windows**: `Win+R` → "powershell" 입력 → Enter
>
> 터미널 자체가 부담스럽다면 **Claude 데스크탑 앱**(macOS / Windows / Ubuntu·Debian 베타)을 설치하고 **Code** 탭을 누르면 됩니다. 앱 안에 Claude Code가 들어 있어 CLI를 따로 설치하지 않아도 되고, 변경 내용을 화면에서 바로 확인할 수 있습니다.

---

## 설치 전 확인사항

### 지원 운영체제

| OS | 지원 버전 |
|---|---|
| **macOS** | 13.0 이상 |
| **Linux** | Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ |
| **Windows** | Windows 10 (1809+) 또는 Windows Server 2019+ |

### 하드웨어 요구사항

- RAM: 4GB 이상
- CPU: x64 또는 ARM64
- 셸: Bash, Zsh, PowerShell, CMD 중 하나
- 인터넷 연결 필수

### Node.js가 필요한가요?

**아닙니다.** Claude Code는 네이티브(Native) 설치 방식을 사용합니다. Node.js를 따로 설치할 필요가 없습니다.

> 💡 **npm 설치도 여전히 지원됩니다.** `npm install -g @anthropic-ai/claude-code`는 아래 네이티브 설치와 **동일한 바이너리**를 설치합니다(단, Node.js 22 이상 필요). 다만 공식 권장은 아래 네이티브 설치 방식이므로, 특별한 이유가 없다면 네이티브 설치를 사용하세요.

---

## 설치 방법

### macOS / Linux / WSL (Windows Subsystem for Linux)

터미널을 열고 아래 명령어를 붙여넣으세요:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

또는 Homebrew를 사용한다면:

```bash
brew install --cask claude-code          # 안정(stable) 채널: 약 1주 늦지만 큰 회귀는 건너뜀
brew install --cask claude-code@latest   # 최신(latest) 채널: 새 버전이 나오는 즉시
```

### Windows

**방법 1 — PowerShell 사용 (권장):**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**방법 2 — WinGet 사용:**

```powershell
winget install Anthropic.ClaudeCode
```

**방법 3 — CMD 사용:**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> **방법 4 — 패키지 매니저 (Linux):** Debian/Ubuntu는 `apt`, Fedora/RHEL은 `dnf`, Alpine은 `apk` 공식 저장소로도 설치할 수 있습니다. 자세한 절차는 [공식 설치 문서](https://code.claude.com/docs/en/setup)를 참고하세요.

> Windows에서 [Git for Windows](https://git-scm.com/downloads/win)는 **선택 사항이지만 권장**됩니다. 설치하면 Claude Code가 Git Bash로 Bash 도구를 사용하고, 없으면 PowerShell 도구로 대체 동작합니다.

### Alpine Linux 추가 패키지

Alpine에는 `bash`와 `curl`이 기본 포함되어 있지 않아 설치 명령이 실패합니다. 먼저 아래 패키지를 설치하세요:

```bash
apk add bash curl libgcc libstdc++ ripgrep
```

설치 후 `~/.claude/settings.json`에 아래 설정을 추가합니다:

```json
{
  "env": { "USE_BUILTIN_RIPGREP": "0" }
}
```

---

## 설치 후 인증 (로그인)

설치가 완료되면 터미널에서 아래 명령어를 실행하세요:

```bash
claude
```

처음 실행하면 **브라우저가 자동으로 열리면서 OAuth 로그인 화면**이 나타납니다. Claude.ai 계정으로 로그인하면 자동으로 인증이 완료되고, 터미널에 `Login successful`이 표시됩니다.

> ⚠️ **무료(Free) 플랜은 Claude Code를 지원하지 않습니다.** Pro, Max, Team, Enterprise 또는 Console(API) 계정이 필요합니다.
>
> 브라우저가 자동으로 열리지 않으면 터미널에서 `c`를 눌러 로그인 URL을 복사해 직접 붙여넣으세요. WSL2, SSH, 컨테이너처럼 브라우저가 터미널로 돌아올 수 없는 환경에서는 브라우저에 **로그인 코드**가 표시되는데, 이 코드를 터미널의 `Paste code here if prompted` 자리에 붙여넣으면 됩니다.

### 인증 흐름 요약

```
터미널에서 claude 실행
       ↓
브라우저 자동 오픈 (OAuth 페이지)
       ↓
Claude.ai 계정으로 로그인
       ↓
터미널로 자동 복귀 → 인증 완료
```

### 자격 증명 보안

- macOS: API 키와 OAuth 토큰은 **macOS Keychain(암호화 저장소)**에 안전하게 저장됩니다.
- Linux / Windows: `~/.claude/.credentials.json` (Windows는 `%USERPROFILE%\.claude\.credentials.json`)에 본인 계정만 읽을 수 있는 권한으로 저장됩니다.
- 재로그인이 필요한 경우: `claude` 실행 후 `/login` 입력. 계정을 바꾸려면 `/logout` 후 다시 로그인
- 로그인 만료 3일 전부터 시작 시 `run /login to renew` 경고가 뜹니다. 미리 `/login`을 실행해 갱신하세요.

---

## 첫 실행 확인

설치와 인증이 완료되었는지 확인하려면:

```bash
claude --version
```

버전 번호가 출력되면 정상 설치된 것입니다. 또는 설치 진단을 위해:

```bash
claude doctor
```

이 명령어로 설치 타입, 버전, 환경 상태를 한 번에 확인할 수 있습니다.

---

## 자동 업데이트

네이티브 설치는 **자동으로 최신 버전으로 업데이트**됩니다. 시작 시 업데이트를 확인하고 백그라운드에서 다운로드합니다. 다음 실행 시 새 버전이 적용됩니다.

> Homebrew, WinGet, Linux 패키지 매니저로 설치한 경우에는 자동 업데이트되지 않습니다. `brew upgrade claude-code`, `winget upgrade Anthropic.ClaudeCode` 등을 직접 실행하세요. (Homebrew·WinGet은 설정에 `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1`을 넣으면 Claude Code가 대신 업그레이드 명령을 실행해 줍니다.)

수동으로 업데이트하려면:

```bash
claude update
```

### 업데이트 채널 고르기

새 기능을 바로 받는 **latest**(기본값)와, 약 1주 늦지만 큰 회귀가 있는 버전은 건너뛰는 **stable** 중에서 고를 수 있습니다. `/config` → **Auto-update channel**에서 바꾸거나 `~/.claude/settings.json`에 적습니다:

```json
{
  "autoUpdatesChannel": "stable"
}
```

> 막 출시된 모델은 stable 채널보다 새로운 버전을 요구할 수 있습니다. 새 모델을 바로 써보고 싶다면 latest를 유지하세요.

---

## 흔한 설치 문제 & 해결법

### 문제 1: `curl: command not found` (curl이 없다는 오류)

**원인**: curl이 설치되어 있지 않은 경우 (드물지만 일부 Linux 환경).

**해결법**:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# Alpine
apk add curl
```

이후 설치 명령어 다시 실행.

---

### 문제 2: `claude: command not found` (설치 후에도 명령어를 못 찾는 경우)

**원인**: 설치 경로가 셸의 PATH에 등록되지 않은 경우.

**해결법**:
```bash
# 현재 셸 세션에 PATH 즉시 반영
source ~/.bashrc
# 또는 zsh 사용자라면
source ~/.zshrc
```

그래도 안 되면 터미널을 완전히 닫고 다시 열기.

---

### 문제 3: Windows에서 Bash 도구가 없다거나 Git Bash를 못 찾는다는 안내

**원인**: Git for Windows가 없으면 Claude Code는 Bash 대신 **PowerShell 도구**로 명령을 실행합니다. 동작에는 문제가 없지만, 일부 셸 스크립트 예제나 플러그인은 Bash를 기대합니다.

**해결법**: [git-scm.com](https://git-scm.com/downloads/win)에서 Git for Windows 설치 후 재시작. 설치했는데도 못 찾으면 `~/.claude/settings.json`에 경로를 지정합니다:

```json
{
  "env": { "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe" }
}
```

---

### 문제 4: `claude --version`이 예전 버전을 보여준다

**원인**: npm, Homebrew, 네이티브 설치가 섞여 있어 다른 설치본이 먼저 잡히는 경우.

**해결법**: `claude doctor`로 설치 타입을 확인하고, 쓰지 않는 설치본은 제거하세요(`npm uninstall -g @anthropic-ai/claude-code`, `brew uninstall --cask claude-code` 등).

---

## 다음 단계

설치와 인증이 완료되었다면, 작업할 폴더로 이동해서 바로 시작해 보세요:

```bash
# 작업할 폴더로 이동 후 실행
claude
```

> **어떤 폴더든 괜찮습니다.** 코드 프로젝트뿐 아니라 문서 폴더, 리서치 폴더, 업무 자료 폴더 어디서나 Claude Code를 시작할 수 있습니다.

Claude Code가 폴더를 분석하고 무엇을 도와드릴지 기다립니다.
