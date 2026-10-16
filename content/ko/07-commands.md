# 09. 명령어 모음

> Claude Code를 쓸 때 알아야 할 명령어들을 한눈에 정리했습니다.

---

## 명령어 세 가지 종류

Claude Code의 명령어는 크게 세 가지로 나뉩니다.

| 종류 | 어디서 입력? | 예시 |
|------|-------------|------|
| **CLI 명령어** | 터미널 (Claude Code 밖) | `claude`, `claude --version` |
| **슬래시 명령어** | 대화 중 (Claude Code 안) | `/help`, `/compact` |
| **키보드 단축키** | 대화 중 | `Ctrl+C`, `Shift+Enter` |

---

## CLI 명령어 (터미널에서 입력)

Claude Code를 시작하거나 제어하는 명령어입니다. 터미널에서 입력합니다.

### 기본 실행 명령어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `claude` | 대화형 모드 시작 | `claude` |
| `claude "질문"` | 바로 질문하며 시작 | `claude "이 프로젝트 설명해줘"` |
| `claude -p "질문"` | 답변만 출력하고 종료 (자동화에 유용) | `claude -p "이 함수 설명해줘"` |
| `claude -c` | 가장 최근 대화 이어서 시작 | `claude -c` |
| `claude --version` 또는 `claude -v` | 설치된 버전 확인 | `claude -v` |
| `claude --help` | 도움말 보기 | `claude --help` |
| `claude update` | 최신 버전으로 업데이트 | `claude update` |

### 모델 지정 실행

```bash
# 특정 모델로 시작
claude --model claude-opus-5-5

# 또는 짧게 (별칭)
claude --model opus      # 최신 Opus (현재 Opus 5.5) — 모든 플랜의 기본 모델
claude --model sonnet    # 최신 Sonnet (현재 Sonnet 5.5)
claude --model haiku     # 가장 빠르고 저렴 (현재 Haiku 5.5)
claude --model fable     # 가장 어려운 장시간 작업용 (현재 Fable 5.1, 별도 접근 권한 필요)
claude --model opusplan  # 계획은 Opus, 실행은 Sonnet
```

> **2026년 10월 기준 모델 라인업**: Fable 5.1 → Opus 5.5 → Sonnet 5.5 → Haiku 5.5. 네 모델 모두 컨텍스트 창이 **100만 토큰**입니다.
> 별칭(`opus`, `sonnet`)은 시간이 지나면 최신 버전을 가리키도록 바뀌므로, 버전을 고정하려면 `claude-opus-5-5`처럼 정식 모델명을 쓰세요.
>
> 사고 강도는 `--effort low|medium|high|xhigh|max`로 조절합니다. Opus 5.5 / Sonnet 5.5 / Haiku 5.5의 기본값은 `medium`입니다.

### 유용한 시작 옵션

```bash
# Plan Mode로 시작 (파일 수정 없이 계획만)
claude --permission-mode plan

# 매번 확인을 받는 Manual 모드로 시작 (기본은 Auto 모드)
claude --permission-mode manual

# 처음부터 세션에 이름 붙이기
claude -n 세션이름

# 세션 이름으로 이어서 시작
claude --resume 세션이름

# 이전 대화 목록에서 선택해서 이어서 시작
claude --resume
```

> **팁**: 처음엔 그냥 `claude`만 입력해서 시작하면 됩니다. 나머지는 필요할 때 배워도 늦지 않습니다.

---

## 슬래시 명령어 (대화 중 입력)

Claude Code와 대화하는 도중에 `/`로 시작하는 명령어를 입력하면 특별한 기능을 사용할 수 있습니다.

### 자주 쓰는 슬래시 명령어

| 명령어 | 설명 |
|--------|------|
| `/help` | 사용 가능한 명령어 전체 목록 보기 |
| `/compact` | 대화 내용 압축 (긴 세션에서 필수!) |
| `/clear` | 대화 초기화 (완전히 새로 시작) |
| `/usage` | 현재 세션의 토큰 사용량·비용과 플랜 사용량 확인 (`/cost`, `/stats`는 같은 명령의 별칭) |
| `/effort` | 모델의 사고 강도 조절 (low/medium/high/xhigh/max) |
| `/model` | 사용 중인 AI 모델 변경 |
| `/fast` | Fast Mode 켜기/끄기 (Opus 응답 속도 최대 2.5배, 추가 과금) |
| `/permissions` | 권한 설정 확인 및 관리 |
| `/memory` | CLAUDE.md 편집, 자동 메모리 보기/켜고 끄기 |
| `/quit` 또는 `/exit` | Claude Code 종료 |
| `/plan [설명]` | Plan Mode 진입 (설명을 붙이면 바로 그 작업의 계획 시작) |
| `/init` | 프로젝트에 CLAUDE.md 파일 생성 |
| `/doctor` | 설치·설정 상태 점검 |
| `/theme` | 색상 테마 변경 |
| `/config` | 설정 화면 (편집기 모드, 자동 업데이트 채널, 테마 등) |
| `/branch [이름]` | 현재 지점에서 대화를 분기 (다른 방향을 시도해도 원본 유지) |
| `/fork` | 현재 대화를 백그라운드 세션으로 복사하고 여기서 계속 작업 |
| `/rewind` | 코드와 대화를 이전 체크포인트로 되돌리기 (또는 일부 구간만 요약) |
| `/context` | 컨텍스트 창 토큰 사용량 시각화 |
| `/rename [이름]` | 세션에 이름 붙이기 (`--resume 이름`으로 재개) |
| `/resume [이름]` | 다른 세션으로 전환 (이름이나 목록에서 선택) |
| `/diff` | Claude가 지금까지 고친 내용을 한눈에 검토 |
| `/export [파일명]` | 현재 대화를 텍스트로 내보내기 |
| `/btw [질문]` | 대화에 남기지 않는 곁다리 질문 (컨텍스트를 소모하지 않음) |
| `/goal` | 목표를 정해두면 조건이 충족될 때까지 Claude가 계속 작업 |
| `/subtask` | 곁가지 작업을 서브에이전트에 맡기고 결과만 받기 |
| `/loop [간격] [프롬프트]` | 같은 프롬프트를 주기적으로 반복 실행 |
| `/insights` | 최근 세션들을 분석한 사용 패턴 보고서(HTML) 생성 |
| `/release-notes` | 버전별 변경 사항 보기 |
| `/powerup` | 짧은 인터랙티브 강의로 기능 익히기 |
| `/bug` | Anthropic에 버그 리포트 직접 전송 |

> `/vim`은 제거되었습니다. Vim 편집 모드는 `/config` → Editor mode에서 켭니다. `/clone`, `/half-clone` 같은 명령어는 존재하지 않습니다.

### 슬래시 명령어 사용법

```
> /compact
→ 대화 내용을 요약해서 컨텍스트를 줄여줍니다

> /compact 코드 변경 사항 위주로 정리해줘
→ 압축 방향을 직접 지정할 수 있습니다

> /model
→ 모델 선택 화면이 나타납니다
```

> **팁**: 대화창에서 `/`만 입력하면 사용 가능한 명령어 목록이 자동완성으로 나타납니다.

---

## 대화 분기 & 실험 전략

대화 중간에 방향을 바꾸거나 위험한 실험을 안전하게 시도할 때 활용할 수 있는 기능들입니다.

### `/branch` — 원본 유지하며 실험하기

현재 지점에서 대화를 분기합니다. 복잡한 리팩토링이나 구조적인 변경을 시도하기 전에 분기해두면, 실패해도 지금까지의 대화를 잃지 않습니다.

```
> /branch 스트리밍-방식-실험
→ 현재 지점에서 새 분기 시작 (이름을 생략하면 첫 프롬프트로 자동 작명)
→ 원래 대화는 그대로 남음 → /resume 원래이름 으로 돌아갈 수 있음
```

**이럴 때 써보세요**
- 여러 구현 방법 중 하나를 먼저 시험해보고 싶을 때
- "이렇게 고치면 어떨까" 싶은데 실패가 걱정될 때
- 같은 문제를 서로 다른 접근으로 비교해보고 싶을 때

### `/fork` — 복사본을 백그라운드로 넘기기

현재 대화를 백그라운드 세션으로 복사하고, 지금 터미널에서는 하던 작업을 계속합니다. 한 갈래는 백그라운드에서 굴리면서 다른 갈래를 직접 진행할 때 유용합니다.

```
> /fork
→ 대화 복사본이 백그라운드 세션으로 이동
→ 현재 창에서는 그대로 작업 계속
```

> 실수한 지점으로 아예 되돌리고 싶다면 `/rewind`(또는 입력창이 빈 상태에서 `Esc` 두 번)를 쓰세요. 메뉴에서 **코드+대화 / 대화만 / 코드만** 되돌리기를 고르거나, 특정 지점 이후(또는 이전)의 대화만 **요약**해서 컨텍스트를 비울 수도 있습니다.

### `/context` — 컨텍스트 사용량 확인

```
> /context
→ [■■■■■■■□□□] 70% (700,000 / 1,000,000 tokens)
```

현재 대화가 컨텍스트 창의 몇 %를 차지하는지 시각적으로 보여줍니다. 80% 이상 차면 `/compact`나 `/clear`를 고려하세요.

> 현재 모델(Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5)은 모두 **100만(1M) 토큰** 컨텍스트입니다. 한계에 가까워지면 자동으로 압축되며, `/autocompact 500k`처럼 더 일찍 압축되도록 조정할 수 있습니다.

### `/rename` — 세션 이름 붙이기

중요한 작업 세션에 이름을 붙여두면 나중에 쉽게 재개할 수 있습니다.

```
> /rename 경쟁사-리서치-2월

# 나중에 터미널에서 이어서 시작
$ claude --resume 경쟁사-리서치-2월
```

---

## 키보드 단축키

대화 도중 손가락 몇 개로 빠르게 제어할 수 있습니다.

### 핵심 단축키

| 단축키 | 설명 |
|--------|------|
| `Ctrl+C` | 현재 작업 취소 (Claude가 뭔가 하는 도중에 멈추고 싶을 때). 아무것도 실행 중이 아니면 입력창을 비우고, 한 번 더 누르면 종료 |
| `Esc` | Claude 응답·도구 실행 중단 (지금까지 한 작업은 유지), 열린 대화상자 닫기 |
| `Ctrl+D` | Claude Code 종료 (두 번 누름) |
| `Ctrl+L` | 화면 다시 그리기 (표시가 깨졌을 때. 대화 내용은 유지됨) |
| `Ctrl+R` | 이전에 입력한 명령어 검색 |
| `Ctrl+G` | 현재 입력 중인 내용을 외부 텍스트 에디터에서 편집 |
| `Ctrl+O` | 상세 기록(transcript) 보기 — 어떤 도구를 어떻게 썼는지 확인 |
| `Ctrl+T` | Claude의 할 일 체크리스트 보기/숨기기 |
| `Ctrl+S` | 작성 중인 프롬프트를 잠시 치워두기 / 다시 꺼내기 |
| `Ctrl+V` (Windows/WSL은 `Alt+V`) | 클립보드의 이미지 붙여넣기 |

### 입력 관련 단축키

| 단축키 | 설명 |
|--------|------|
| `Shift+Enter` | 줄바꿈 (긴 지시사항 여러 줄로 입력할 때. 안 되면 `/terminal-setup` 실행) |
| `Option+Enter` (macOS) | 줄바꿈 (macOS 기본) |
| `\` + `Enter` | 줄바꿈 (모든 터미널에서 작동) |
| `↑` / `↓` 화살표 | 이전/다음 명령어 탐색 |
| `Esc` + `Esc` (두 번) | 입력창이 비어 있으면 되감기 메뉴, 글자가 있으면 입력 지우기 |
| `@` | 파일 경로 자동완성 (`@파일명`으로 파일을 대화에 넘김) |
| `!` (맨 앞) | 셸 명령어를 직접 실행하고 결과를 대화에 추가 |
| `?` (빈 입력창에서) | 단축키 도움말 패널 켜기/끄기 |

### 모드 전환 단축키

| 단축키 | 설명 |
|--------|------|
| `Shift+Tab` | 권한 모드 순환 (Auto → Manual → Accept Edits → Plan → Auto) |
| `Option+P` (macOS) / `Alt+P` | 모델 변경 |
| `Option+O` (macOS) / `Alt+O` | Fast Mode 켜기/끄기 |
| `Option+T` (macOS) / `Alt+T` | 확장 사고 모드 켜기/끄기 (Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fable은 항상 켜져 있어 효과 없음) |
| `Ctrl+B` | 실행 중인 명령어·에이전트를 백그라운드로 보내고 계속 대화 |
| `Ctrl+X` 다음 `Ctrl+K` | 백그라운드 서브에이전트 모두 중지 (3초 안에 두 번) |

---

## 초보자가 자주 쓰는 명령어 TOP 5

막 시작했다면 이 다섯 개만 외워도 충분합니다.

### 1. `/compact` — 가장 중요한 명령어

```
> /compact
```

대화가 길어지면 Claude가 느려지거나 오래된 내용을 잊어버립니다. 이럴 때 `/compact`를 입력하면 대화를 압축해서 속도를 회복합니다. **긴 작업 중간중간에 습관적으로 사용하세요.**

### 2. `Ctrl+C` — 멈추고 싶을 때

Claude가 엉뚱한 방향으로 가고 있을 때, 또는 실수로 위험한 명령을 허가했을 때 즉시 멈춥니다.

### 3. `/clear` — 새로 시작할 때

```
> /clear
```

완전히 다른 주제로 넘어갈 때 사용합니다. 이전 대화 내용이 모두 지워집니다.

### 4. `Shift+Enter` — 긴 지시사항 입력

한 줄로 다 쓰기 어려운 긴 요청은 `Shift+Enter`로 줄바꿈하면서 입력하세요.

```
(Shift+Enter로 여러 줄 입력 예시)
로그인 페이지를 만들어줘.
- 이메일과 비밀번호 필드
- 비밀번호 보기/숨기기 버튼
- 로그인 버튼 (로딩 상태 포함)
```

### 5. `/usage` — 사용량 확인

```
> /usage
```

현재 세션에서 얼마나 썼는지 확인합니다. (`/cost`와 `/stats`는 같은 명령의 별칭입니다. 구독 사용자는 여기서 플랜 사용량 막대와, 어떤 스킬·서브에이전트·MCP 서버가 사용량을 많이 차지했는지도 함께 볼 수 있습니다.)

> 사용량 한도에 걸리면 `/rate-limit-options`로 선택지를 볼 수 있습니다. 한도가 풀릴 때까지 기다렸다가 자동으로 이어서 작업하게 하거나, `/usage-credits`로 추가 사용량(usage credits)을 켤 수 있습니다.

---

<details>
<summary>🖥️ 개발자용: 터미널 Alias 설정 (단축 명령어)</summary>

매번 긴 명령어를 입력하는 대신, 짧은 alias를 등록해두면 훨씬 편합니다.

### macOS / Linux (zsh)

`~/.zshrc` 파일에 추가:

```bash
alias cc='claude'
alias ccd='claude --dangerously-skip-permissions'
alias ccr='claude --resume --dangerously-skip-permissions'
```

추가 후 적용:

```bash
source ~/.zshrc
```

### Windows (PowerShell)

`$PROFILE` 파일에 추가:

```powershell
function cc { claude @args }
function ccd { claude --dangerously-skip-permissions @args }
function ccr { claude --resume --dangerously-skip-permissions @args }
```

PowerShell을 재시작하면 적용됩니다.

### 각 Alias 설명

| 명령어 | 의미 | 사용 시점 |
|--------|------|----------|
| `cc` | 기본 실행 | 항상 |
| `ccd` | 권한 확인 자동 승인 | 신뢰하는 프로젝트, 빠른 작업 |
| `ccr` | 이전 세션 재개 + 권한 자동 승인 | 어제 하던 작업 이어서 |

> ⚠️ **주의**: `--dangerously-skip-permissions`는 파일 수정, 명령어 실행 등 모든 권한 확인을 자동으로 승인합니다. 본인이 만든 프로젝트, 신뢰하는 환경에서만 사용하세요.
>
> 💡 지금은 세션이 기본적으로 **Auto 모드**(분류기가 검토하며 대부분 확인 창 없이 진행)로 시작하므로, `ccd` 같은 별칭이 꼭 필요한 경우는 많지 않습니다. 격리된 컨테이너가 아니라면 `--permission-mode auto`를 쓰는 편이 안전합니다.

</details>

---

## 빠른 참고표

```
터미널 입력:
  claude                    → 시작
  claude -v                 → 버전 확인
  claude --help             → 도움말
  claude -c                 → 마지막 세션 이어서
  claude -n [이름]          → 이름 붙여서 시작
  claude --resume [이름]    → 이름 붙인 세션 재개
  claude --add-dir [경로]   → 추가 디렉토리 포함
  claude --permission-mode plan → Plan Mode로 시작

Alias (설정 후):
  cc                        → claude (기본)
  ccd                       → 권한 자동 승인
  ccr                       → 이전 세션 재개 + 권한 자동 승인

대화 중 입력:
  /help               → 전체 명령어 목록
  /compact            → 대화 압축 (자주 쓰기!)
  /clear              → 대화 초기화
  /branch             → 현재 지점에서 대화 분기
  /fork               → 대화 복사본을 백그라운드 세션으로
  /rewind             → 코드·대화를 체크포인트로 되돌리기
  /context            → 컨텍스트 사용량 확인
  /usage (= /cost)    → 사용량·비용 확인
  /model              → 모델 변경
  /effort             → 사고 강도 조절
  /fast               → Fast Mode 켜기/끄기
  /diff               → 변경 내용 검토
  /rename [이름]       → 세션 이름 붙이기
  /bug                → 버그 리포트 전송
  /quit               → 종료

키보드 단축키:
  Ctrl+C / Esc        → 작업 취소
  Ctrl+D              → 종료
  Ctrl+B              → 실행 중인 작업을 백그라운드로
  Shift+Tab           → 권한 모드 순환
  Shift+Enter         → 줄바꿈
  ↑↓ 화살표           → 이전 명령어 탐색
  Esc Esc             → 되감기 메뉴 (입력창이 비어 있을 때)
```
