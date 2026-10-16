# 20. Headless 모드 & GitHub Actions 자동화

> Claude Code를 사람 없이 자동으로 실행하는 방법을 배웁니다.

---

> 📌 **이 섹션은 두 부분으로 나뉩니다**
> - **Headless 모드** (기본 사용법): 비개발자도 활용할 수 있는 자동화 — 뉴스 요약, 주간 보고서, 파일 일괄 처리 등
> - **GitHub Actions 연동** (개발자 심화): 소프트웨어 개발팀 전용 CI/CD 자동화

---

## Headless 모드란?

보통 Claude Code는 터미널에서 대화형으로 사용합니다. 사람이 직접 질문하고, Claude가 답하고, 다시 사람이 피드백을 주는 방식이죠.

**Headless 모드**는 사람 없이 Claude Code를 자동으로 실행하는 방식입니다. 스크립트나 CI/CD 파이프라인에서 Claude Code를 프로그램처럼 호출할 수 있습니다.

> **Headless = 사람 없이 자동 실행**

이전에는 "headless mode"라고 불렸지만, 공식 문서에서는 **Agent SDK를 CLI로 쓰는 방식**(비대화형 모드)이라고 설명합니다. `-p` 플래그와 모든 CLI 옵션은 동일하게 작동합니다.

---

## 언제 사용하나요?

| 상황 | 예시 |
|------|------|
| **일일 브리핑** | 매일 아침 업계 뉴스 요약 파일 자동 생성 |
| **주간 보고서** | 이번 주 회의록을 읽어서 주간 요약 자동 작성 |
| **파일 배치 처리** | 폴더 내 PDF·문서를 한꺼번에 요약 |
| **콘텐츠 초안** | 아이디어 폴더 읽어서 다음 주 콘텐츠 캘린더 생성 |

<details>
<summary>🖥️ 개발자용 활용 예시</summary>

| 상황 | 예시 |
|------|------|
| CI/CD 파이프라인 | PR이 열릴 때마다 자동으로 코드 리뷰 |
| 자동화 스크립트 | 매일 밤 코드 품질 리포트 생성 |
| 배치 처리 | 여러 파일을 한꺼번에 마이그레이션 |
| 반복 작업 | 테스트 실패 시 자동 수정 시도 |

</details>

---

## 기본 사용법

`-p` (또는 `--print`) 플래그를 붙이면 비대화형(non-interactive) 모드로 실행됩니다.

### 가장 간단한 형태

```bash
claude -p "이 프로젝트가 무엇을 하는지 설명해줘"
```

### 도구 권한 허용하기

Claude가 파일을 읽고 저장할 수 있도록 도구를 허용합니다:

```bash
claude -p "~/Downloads의 PDF를 모두 읽어서 요약집.md로 정리해줘" --allowedTools "Read,Write,Bash"
```

도구를 하나씩 나열하는 대신 권한 모드로 기준선을 정할 수도 있습니다:

```bash
# 분류기가 검토하며 진행 (대화형 세션과 같은 Auto 모드)
claude -p "의존성 버전을 올리고 테스트 실행해줘" --permission-mode auto

# 확인이 필요한 행동은 전부 거부 (잠긴 CI 환경용)
claude -p "..." --permission-mode dontAsk

# 아무도 확인 창에 답할 수 없는 무인 실행: 묻게 될 행동은 거부하고 계속 진행
claude -p "..." --permission-mode auto --permission-prompts none
```

### 스크립트·CI에서는 `--bare`

`--bare`를 붙이면 훅, 플러그인, MCP 서버, 자동 메모리, CLAUDE.md 자동 탐색을 모두 건너뛰어 시작이 빠르고, **어느 컴퓨터에서 돌려도 같은 결과**가 나옵니다. 공식 문서가 스크립트와 CI에 권장하는 방식이며, 앞으로 `-p`의 기본값이 될 예정입니다. 구독 로그인은 읽지 않으므로 `ANTHROPIC_API_KEY`가 필요합니다.

```bash
claude --bare -p "README.md 요약해줘" --allowedTools "Read"
```

### JSON 출력 받기

스크립트에서 결과를 파싱하기 쉽도록 JSON 형식으로 출력할 수 있습니다:

```bash
claude -p "이 프로젝트를 요약해줘" --output-format json
```

출력 형식 옵션:
- `text` (기본값): 일반 텍스트
- `json`: JSON 구조체로 결과 반환 (세션 ID, 메타데이터 포함)
- `stream-json`: 실시간 스트리밍 JSON

### 실용적인 예시: 비개발자 자동화 3가지

**일일 뉴스·업계 동향 요약**:
```bash
claude -p "inputs/links.txt를 읽고 오늘의 업계 뉴스 요약을 daily/brief_오늘날짜.md로 저장해줘" \
  --allowedTools "Read,Write"
```

**주간 액션아이템 취합**:
```bash
claude -p "meetings/ 폴더의 지난 7일 회의록을 읽고 미완료 액션아이템만 표로 정리해서 weekly/this-week.md로 저장해줘" \
  --allowedTools "Read,Write"
```

**콘텐츠 캘린더 초안 생성**:
```bash
claude -p "ideas/ 폴더를 읽고 다음 주 평일 5일치 콘텐츠 캘린더를 만들어 drafts/next-week.md로 저장해줘" \
  --allowedTools "Read,Write"
```

<details>
<summary>🖥️ 개발자용 예시: 자동 커밋</summary>

```bash
claude -p "스테이징된 변경 사항을 검토하고 적절한 커밋 메시지로 커밋해줘" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

</details>

### 대화 이어가기

```bash
# 첫 번째 요청
claude -p "이 폴더의 문서들을 분석해줘"

# 이전 대화 이어서
claude -p "그 중에서 핵심 결론 부분만 따로 모아줘" --continue
```

---

<details>
<summary>🖥️ 개발자용: GitHub Actions & GitLab CI/CD 자동화</summary>

## GitHub Actions 연동

GitHub Actions는 PR 생성, 코드 푸시, 이슈 등록 등 GitHub 이벤트에 반응하여 자동으로 작업을 실행하는 서비스입니다. Claude Code를 여기에 연동하면 AI 기반 자동화가 가능합니다.

### 공식 액션 소개

Anthropic이 공식으로 제공하는 GitHub Action이 있습니다:

- **저장소**: [github.com/anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)
- **버전**: `anthropics/claude-code-action@v1`

### 빠른 시작

Claude Code 터미널에서 다음 명령어를 실행하면 설정을 자동으로 안내해줍니다:

```
/install-github-app
```

> 저장소 관리자 권한과 GitHub CLI(`gh auth login` 완료)가 필요하며, github.com 저장소에서만 동작합니다. API 키 대신 **구독 계정으로 인증**할 수도 있습니다: 로컬에서 `claude setup-token`으로 1년짜리 토큰을 만들어 `CLAUDE_CODE_OAUTH_TOKEN` 시크릿으로 등록하면 Actions 실행이 구독 사용량에서 차감됩니다.

### 수동 설정 방법

1. **Claude GitHub 앱 설치**: [github.com/apps/claude](https://github.com/apps/claude)에서 저장소에 앱을 설치합니다.

2. **인증 시크릿 등록**: 저장소 Settings → Secrets에 `ANTHROPIC_API_KEY`(API 키) 또는 `CLAUDE_CODE_OAUTH_TOKEN`(구독 토큰)을 추가합니다.

3. **워크플로우 파일 추가**: `.github/workflows/` 폴더에 YAML 파일을 만듭니다. 공식 예제([examples/claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml))를 그대로 복사해도 됩니다.

---

### 예시 1: @claude 멘션으로 PR 리뷰 자동화

PR 댓글이나 이슈에 `@claude`를 멘션하면 Claude가 자동으로 응답합니다.

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # 구독 토큰을 쓴다면 위 줄 대신:
          # claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          # prompt를 주지 않으면 @claude 멘션에 자동으로 응답
```

사용 예시:
```
@claude 이 PR의 보안 취약점을 검토해줘
@claude 이 함수에 엣지 케이스가 있는지 확인해줘
@claude 이 이슈를 기반으로 기능을 구현해줘
```

---

### 예시 2: PR이 열릴 때 자동 코드 리뷰

```yaml
name: 코드 리뷰
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: "https://github.com/anthropics/claude-code.git"
          plugins: "code-review@claude-code-plugins"
          prompt: "/code-review:code-review --comment ${{ github.repository }}/pull/${{ github.event.pull_request.number }}"
          claude_args: '--allowedTools "mcp__github_inline_comment__create_inline_comment"'
```

> `--comment`가 있어야 리뷰 결과가 PR에 인라인 댓글로 달립니다. 없으면 워크플로 로그에만 남습니다. 워크플로 파일 없이 모든 PR에 자동 리뷰를 받고 싶다면 공식 문서의 **Code Review** 기능을 참고하세요.

---

### 예시 3: 스케줄 기반 코드 분석

```yaml
name: 일일 리포트
on:
  schedule:
    - cron: "0 9 * * *"  # 매일 오전 9시

jobs:
  report:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: read
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "어제의 커밋과 열린 이슈를 요약해줘"
          claude_args: |
            --model claude-sonnet-5-5
            --allowedTools "mcp__github__list_commits,mcp__github__list_issues"
```

> 일반 텍스트 prompt로 실행할 때는 `claude_args`의 `--allowedTools`로 허용한 도구만 쓸 수 있습니다. 위 예시는 GitHub API 도구 두 개만 허용했기 때문에 checkout 단계가 필요 없습니다.

---

### 워크플로우 파라미터 설명

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}  # 필수
    prompt: "작업 지시사항"        # 선택 (없으면 @claude 멘션에 반응)
    claude_args: "--max-turns 10"  # 선택 (추가 CLI 인자)
```

| 파라미터 | 설명 | 필수 여부 |
|---------|------|----------|
| `anthropic_api_key` | Anthropic API 키 | 둘 중 하나 필수 |
| `claude_code_oauth_token` | 구독 계정 토큰 (`claude setup-token`으로 생성) | 둘 중 하나 필수 |
| `prompt` | Claude에게 전달할 지시사항 (없으면 `@claude` 멘션 대기) | 선택 |
| `claude_args` | 추가 CLI 인자 (`--max-turns`, `--model`, `--allowedTools` 등) | 선택 |
| `plugins` / `plugin_marketplaces` | 실행 전에 설치할 플러그인 | 선택 |
| `trigger_phrase` | 트리거 구문 (기본값: `@claude`) | 선택 |

> 실행을 시작한 사람은 저장소 **쓰기 권한**이 있어야 하고, 봇 계정은 `allowed_bots`에 적지 않는 한 무시됩니다(무한 루프 방지).

---

## GitLab CI/CD 연동 (간략)

GitLab을 사용한다면 `.gitlab-ci.yml`에 Claude Code 작업을 추가할 수 있습니다. 자세한 절차는 [공식 GitLab CI/CD 문서](https://code.claude.com/docs/en/gitlab-ci-cd)를 참고하세요.

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
  before_script:
    - apk add --no-cache git curl bash
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - claude -p "${AI_FLOW_INPUT:-'변경 사항을 검토하고 개선사항을 제안해줘'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write"
```

GitLab CI/CD 변수에 `ANTHROPIC_API_KEY`를 등록하는 것을 잊지 마세요.

</details>

---

## ⚠️ 비용 주의사항

자동화는 **토큰 소모가 매우 큽니다**.

- CI/CD 파이프라인은 사람의 감독 없이 실행되므로 비용이 예상보다 빠르게 쌓일 수 있습니다.
- `--max-turns` 옵션으로 최대 반복 횟수를, `--max-budget-usd`로 한 번 실행의 달러 상한을 제한하세요.
- 워크플로우에 타임아웃을 설정하고, 동시 실행(concurrency)을 제한하세요.
- 불필요한 트리거를 줄이세요.

```yaml
claude_args: "--max-turns 5 --model claude-sonnet-5-5"
```

**API 비용 외에 GitHub Actions 실행 시간 비용도 발생합니다** (GitHub Actions 무료 한도를 초과할 경우).

---

## 보안 주의사항

- **API 키를 코드에 직접 넣지 마세요.** 항상 GitHub Secrets를 사용하세요.

```yaml
# 올바른 방법
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}

# 절대 하지 말 것
anthropic_api_key: "sk-ant-api03-..."
```

- Claude의 제안을 머지하기 전에 항상 검토하세요.
- 액션 권한은 필요한 것만 허용하세요.

---

## 입문자에게

> **이 기능은 지금 당장 필요하지 않습니다.**

Headless 모드와 GitHub Actions 연동은 Claude Code를 어느 정도 익힌 후에 도입하는 것이 좋습니다. 기본 사용법, CLAUDE.md 설정, 그리고 MCP 연동을 먼저 익히고 나서 자동화를 고려하세요.

지금은 "이런 것도 가능하구나"라고 알아두는 것으로 충분합니다.

---

## 핵심 정리

```
Headless 모드: claude -p "작업내용" --output-format json
스크립트/CI:    --bare 로 환경 영향 제거, --permission-prompts none 으로 무인 실행
GitHub Actions: anthropics/claude-code-action@v1 (API 키 또는 구독 토큰)
트리거: @claude 멘션 또는 자동 프롬프트
비용 제어: --max-turns, --max-budget-usd, 타임아웃, 모델 선택
보안: 키·토큰은 반드시 Secrets 사용
```

> 터미널 안에서 간단히 반복만 하고 싶다면 `/loop 30m 새 이슈 있는지 확인하고 요약해줘`처럼 **`/loop`** 로 같은 프롬프트를 주기적으로 실행할 수 있고, 컴퓨터를 꺼둬도 돌아가야 하면 `/schedule`로 클라우드 루틴을 만들 수 있습니다.
