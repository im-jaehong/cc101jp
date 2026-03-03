# 14. Hooks — 자동화의 핵심

> "파일 수정할 때마다 포매터 돌려줘", "작업 끝나면 알림 보내줘" — 이런 걸 자동으로 하게 만드는 기능

---

## Hooks란?

**Hooks**는 Claude Code의 특정 이벤트가 발생할 때 자동으로 실행되는 셸 커맨드입니다.

Claude Code는 코드 수정, 명령어 실행, 작업 완료 등 다양한 이벤트를 발생시킵니다. Hooks를 설정하면 이런 이벤트에 반응해서 **사람 개입 없이 자동으로 원하는 동작을 수행**합니다.

> **핵심**: Hooks는 "Claude가 알아서 해주면 좋겠다"가 아니라 **"반드시 항상 실행되어야 한다"**는 동작을 위한 것입니다. LLM의 판단이 아니라 결정론적 제어입니다.

---

## Hooks로 없어지는 노가다

**업무 / 리서치 / 문서 작업**

| 기존 노가다 | Hooks 설정 후 |
|------------|--------------|
| 작업 끝났는지 터미널 계속 확인 | 완료 시 데스크탑 알림 |
| 세션 시작할 때마다 회사 정보·규칙 다시 설명 | 세션 시작 시 업무 컨텍스트 자동 주입 |
| `customers/`, `invoices/` 폴더 실수 수정 걱정 | 민감 폴더 접근 자동 차단 |
| `final/` 문서에 금지어 들어갔는지 수동 점검 | 저장할 때마다 자동 금지어 검사 |

<details>
<summary>🖥️ 개발자용 자동화 예시</summary>

| 기존 노가다 | Hooks 설정 후 |
|------------|--------------|
| 파일 수정할 때마다 Prettier 수동 실행 | 파일 수정 후 자동으로 포맷 |
| `.env` 파일 실수로 수정될까 걱정 | 보호된 파일 수정 시 자동 차단 |
| 컨텍스트 압축 후 규칙 재설명 | 압축 후 핵심 규칙 자동 재주입 |
| 실행된 명령어 수동 로그 기록 | 모든 Bash 명령어 자동 기록 |

</details>

---

## 주요 Hook 이벤트

| 이벤트 | 발생 시점 | 주요 용도 |
|--------|----------|----------|
| `PreToolUse` | 도구 실행 직전 | 위험한 명령어 차단, 검증 |
| `PostToolUse` | 도구 실행 직후 | 자동 포매팅, 로그 기록 |
| `Stop` | Claude가 응답 완료 시 | 알림 전송, 후처리 |
| `SessionStart` | 세션 시작/재개 시 | 컨텍스트 주입, 초기화 |
| `Notification` | Claude가 알림 보낼 때 | 데스크탑 푸시 알림 |
| `UserPromptSubmit` | 사용자가 프롬프트 제출 시 | 입력 전처리 |
| `SubagentStart` | 서브에이전트 시작 시 | 에이전트 추적 |
| `SubagentStop` | 서브에이전트 종료 시 | 결과 후처리 |
| `PreCompact` | 컨텍스트 압축 전 | 중요 정보 보존 |
| `SessionEnd` | 세션 종료 시 | 정리 작업 |

---

## Hook 설정 위치

Hooks는 `settings.json`의 `hooks` 섹션에 설정합니다:

| 위치 | 범위 | 공유 가능 |
|------|------|----------|
| `~/.claude/settings.json` | 내 모든 프로젝트 | 아니오 |
| `.claude/settings.json` | 현재 프로젝트 | 예 (Git 커밋 가능) |
| `.claude/settings.local.json` | 현재 프로젝트 | 아니오 (gitignore) |

---

## 실용 예시

### 예시 1: 작업 완료 시 알림 받기

Claude가 작업을 끝냈을 때 자리를 비워도 알 수 있습니다. (`~/.claude/settings.json`)

**macOS**:
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"문서 작업이 완료되었습니다\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

**Linux**:
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' '작업이 완료되었습니다'"
          }
        ]
      }
    ]
  }
}
```

### 예시 2: 세션 시작 시 업무 컨텍스트 자동 주입

매 세션마다 회사 정보·이번 달 목표·작업 규칙을 Claude에게 자동으로 전달합니다. 매번 설명할 필요가 없어집니다.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/업무규칙.txt"
          }
        ]
      }
    ]
  }
}
```

> `~/업무규칙.txt`에 회사 소개, 브랜드 톤, 이번 달 목표, 자주 쓰는 형식 등을 저장해두면 됩니다.

### 예시 3: 민감 폴더 보호 + 자동 백업

`customers/`, `invoices/` 같은 민감한 폴더는 Claude가 수정하지 못하게 차단하고, 다른 파일은 수정할 때마다 자동으로 백업합니다.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=\"$(jq -r '.tool_input.file_path // empty')\"; if [[ \"$FILE\" == customers/* || \"$FILE\" == invoices/* ]]; then echo \"차단: 민감 폴더는 수동 검토 후 수정하세요: $FILE\" >&2; exit 2; fi"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=\"$(jq -r '.tool_input.file_path // empty')\"; if [[ -n \"$FILE\" && -f \"$FILE\" ]]; then TS=$(date +\"%Y%m%d-%H%M%S\"); mkdir -p backups; cp \"$FILE\" \"backups/${TS}_$(basename \"$FILE\")\"; fi"
          }
        ]
      }
    ]
  }
}
```

> `exit 2`로 종료하면 Claude가 해당 동작을 차단하고 에러 메시지를 받습니다. `exit 0`은 허용입니다.

---

<details>
<summary>🖥️ 개발자용 Hook 예시 (Prettier / .env 보호 / Safety Hook / 감사 로그)</summary>

### 파일 수정 시 자동 포매팅 (Prettier)

Claude가 파일을 수정할 때마다 Prettier를 자동 실행합니다.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

### 위험한 파일 수정 차단 (.env / package-lock.json)

**Step 1**: 스크립트 파일 생성 (`.claude/hooks/protect-files.sh`):

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "차단: $FILE_PATH 는 보호된 파일입니다 ('$pattern' 패턴)" >&2
    exit 2
  fi
done

exit 0
```

**Step 2**: `chmod +x .claude/hooks/protect-files.sh`

**Step 3**: Hook 등록:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

### 컨텍스트 압축 후 규칙 재주입

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo '규칙: npm 대신 Bun 사용. 커밋 전 bun test 실행. 현재 스프린트: 인증 리팩토링.'"
          }
        ]
      }
    ]
  }
}
```

### Safety Hook — 위험한 명령어 자동 차단

`git reset --hard`, `git push --force`, `rm -rf`, `DROP DATABASE` 등을 자동 차단합니다.

**스크립트** (`~/.claude/hooks/block_dangerous.py`):

```python
#!/usr/bin/env python3
import json, re, sys

BLOCKED_PATTERNS = [
    (r"git\s+reset\s+--hard", "커밋되지 않은 작업을 삭제합니다"),
    (r"git\s+push\s+.*--force", "원격 히스토리를 덮어씁니다"),
    (r"git\s+clean\s+-.*f", "추적되지 않은 파일을 영구 삭제합니다"),
    (r"\brm\s+-rf\s+[/~]", "시스템/홈 디렉토리를 삭제합니다"),
    (r"DROP\s+(DATABASE|TABLE)", "데이터베이스/테이블을 삭제합니다"),
    (r"TRUNCATE\s+TABLE", "모든 데이터를 삭제합니다"),
]

data = json.load(sys.stdin)
if data.get("tool_name") != "Bash":
    sys.exit(0)
command = data.get("tool_input", {}).get("command", "")
for pattern, reason in BLOCKED_PATTERNS:
    if re.search(pattern, command, re.IGNORECASE):
        print(f"🚫 차단됨: {reason}", file=sys.stderr)
        sys.exit(2)
sys.exit(0)
```

**Hook 등록** (`~/.claude/settings.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "python3 ~/.claude/hooks/block_dangerous.py" }]
      }
    ]
  }
}
```

### Bash 명령어 감사 로그

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' >> ~/.claude/command-log.txt"
          }
        ]
      }
    ]
  }
}
```

</details>

---

## Hook 첫 설정하는 가장 쉬운 방법

Claude Code 내에서 `/hooks` 커맨드를 실행하면 인터랙티브 메뉴가 열립니다:

```
/hooks
```

1. 원하는 이벤트 선택
2. matcher 설정 (`*`는 전체, `Edit|Write`는 파일 수정만)
3. 실행할 셸 커맨드 입력
4. 저장 위치 선택 (User settings → 모든 프로젝트 적용)

---

## 고급: 프롬프트 기반 Hook

판단이 필요한 상황에는 `type: "prompt"` Hook을 사용합니다. LLM이 yes/no 결정을 내립니다:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "모든 태스크가 완료되었는지 확인하세요. 미완료 항목이 있으면 {\"ok\": false, \"reason\": \"남은 작업\"} 형식으로 응답하세요."
          }
        ]
      }
    ]
  }
}
```

파일을 읽거나 명령어를 실행해야 하는 검증은 `type: "agent"` Hook을 사용합니다 (서브에이전트가 실제로 코드베이스를 확인합니다).

---

## Hook 트러블슈팅

| 문제 | 해결책 |
|------|--------|
| Hook이 실행 안 됨 | `/hooks`에서 이벤트 확인, matcher 대소문자 확인 |
| 스크립트가 실행 안 됨 | `chmod +x` 로 실행 권한 부여 |
| Stop hook이 무한루프 | `stop_hook_active` 필드 체크 추가 |
| JSON 파싱 오류 | `~/.zshrc`의 echo 구문을 인터랙티브 셸 조건부로 감싸기 |

디버그 모드: `claude --debug` 또는 `Ctrl+O`로 verbose 출력 확인

---

## ⚠️ 주의사항

- Hooks는 강력합니다. **`PreToolUse`에서 `exit 2`를 잘못 설정하면 Claude가 아무 파일도 수정하지 못하게 됩니다**
- `PostToolUse` Hook은 이미 실행된 도구를 되돌릴 수 없습니다
- `PermissionRequest` Hook은 비대화형 모드(`-p`)에서 실행되지 않습니다 → 자동화 스크립트에서는 `PreToolUse` 사용
- 설정 파일을 직접 수정했다면 `/hooks` 메뉴를 한 번 열거나 세션을 재시작해야 적용됩니다

---

## 한 줄 요약

> Hooks = Claude Code 이벤트에 자동으로 반응하는 셸 커맨드. "파일 고칠 때마다 포매팅", "완료되면 알림", "위험한 파일 차단" — 이런 게 LLM 판단 없이 100% 실행됩니다.

다음 섹션에서는 반복 작업을 Skills로 자동화하는 방법을 배웁니다.
