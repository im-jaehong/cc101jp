# 06. 플러그인 추천 설치

> Claude Code의 기능을 확장하는 플러그인을 설치해봅시다.

---

## 플러그인이란?

Claude Code는 기본 기능만으로도 충분히 강력하지만, **플러그인(Plugin)**을 설치하면 더 많은 것을 할 수 있습니다.

플러그인은 쉽게 말하면 **Claude Code에 추가 기능 꾸러미를 설치하는 것**입니다. 스마트폰에 앱을 설치하듯, Claude Code에 필요한 기능을 플러그인으로 추가할 수 있습니다.

플러그인 하나에는 다음 요소들이 들어있을 수 있습니다:

| 구성 요소 | 설명 |
|----------|------|
| **Skills (스킬)** | `/플러그인명:명령어` 형태의 커스텀 명령어 |
| **Agents (에이전트)** | 특정 역할을 수행하는 AI 에이전트 |
| **Hooks (훅)** | 파일 저장, 명령 실행 시 자동으로 동작하는 이벤트 핸들러 |
| **MCP 서버** | GitHub, Figma 등 외부 서비스 연동 |

---

## 공식 플러그인 마켓플레이스

Anthropic이 운영하는 공식 마켓플레이스(`claude-plugins-official`)는 Claude Code를 시작하면 **자동으로 사용 가능한 상태**입니다.

Claude Code 안에서 `/plugin` 을 입력하면 **Discover 탭**에서 바로 공식 플러그인들을 둘러볼 수 있습니다.

### 공식 마켓에서 플러그인 설치하기

```shell
/plugin install 플러그인이름@claude-plugins-official
```

### 공식 마켓에서 제공하는 주요 플러그인 카테고리

| 카테고리 | 대표 플러그인 | 설명 |
|---------|------------|------|
| **외부 서비스 연동** | `notion`, `slack`, `github` | Notion, Slack, GitHub 등 외부 서비스를 Claude와 직접 연결 |
| **출력 스타일** | `explanatory-output-style` | Claude 응답 방식 커스터마이징 (요약 형식, 체크리스트 등) |
| **개발 워크플로** | `commit-commands`, `pr-review-toolkit` | Git 커밋, PR 리뷰 자동화 |

<details>
<summary>🖥️ 개발자용 코드 인텔리전스 플러그인</summary>

| 카테고리 | 대표 플러그인 | 설명 |
|---------|------------|------|
| **코드 인텔리전스** | `typescript-lsp`, `pyright-lsp` | 타입 오류 실시간 감지, 코드 탐색 |

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

</details>

---

## gptaku_plugins — 한국 입문자 전용 플러그인 모음

> GitHub: [https://github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

**gptaku_plugins**는 한국의 Claude Code 입문자, 비개발자, 바이브코더를 위해 특별히 만들어진 플러그인 모음입니다. 어렵고 낯선 개발 개념들을 Claude가 더 친절하게 안내해주도록 설계되어 있습니다.

### 포함된 플러그인

> 2026년 8월 기준 **총 15개** 플러그인이 등록되어 있습니다.

#### 입문자에게 먼저 추천

| 플러그인 이름 | 역할 | 사용 예시 |
|------------|------|---------|
| **docs-guide** | 라이브러리 공식 문서(llms.txt) 기반으로 정확한 답변 제공. 할루시네이션 없이 최신 문서를 참고 | `/docs-guide:explain React hooks` |
| **바르다 깃선생** (git-teacher) | 비개발자를 위한 Git 온보딩. 클라우드 폴더 비유로 5단계 안내 | `/git-teacher:what-is-commit` |
| **바선생** (vibe-sunsang) | Claude Code 대화를 분석해 성장 코칭 제공. 4종 워크스페이스 타입 지원 | `/vibe-sunsang 시작` |
| **쇼미더피알디** (show-me-the-prd) | 초안 우선 PRD 생성기. 4종 설계 문서(PRD, 데이터 모델, Phase 분리, 프로젝트 스펙)를 바로 작성하고 가정을 한 번에 확인 | `/show-me-the-prd 사진 정리 앱 만들고 싶어` |
| **insane-research** | 멀티에이전트 딥리서치. 7단계 파이프라인으로 출처를 교차검증한 뒤 구조화된 보고서 생성 | `/insane-research [주제]` |
| **끼리끼리** (kkirikkiri) | 자연어 한마디로 AI 팀 또는 결정형 에이전트 파이프라인을 구성 | `/kkirikkiri 리서치 팀 만들어줘` |
| **품앗이** (pumasi) | 병렬 코딩 오케스트레이션 + Codex 이미지 생성(`/pumasi:image`) | `/pumasi [작업 설명]` |
| **스킬러들의 수다** (skillers-suda) | 4개 페르소나 에이전트가 분석·토론해 동작하는 스킬을 만들고 자동 평가까지 수행 | `/skillers-suda 번역 스킬 만들어줘` |

> ⚠️ **`deep-research-kit`는 더 이상 제공되지 않습니다.** 후속인 **`insane-research`**를 사용하세요.

#### 그 외 플러그인

| 플러그인 | 설명 |
|---------|------|
| **goaljaby** | PRD를 `/goal` 워크플로 실행 계약서로 변환. 검토 문서 자동 생성 + 승인 게이트 관리 |
| **insane-search** | API 키 없이 차단된 사이트에 적응적으로 접근하는 전략 제공 |
| **insane-design** | 디자인 시스템 추출·적용·생성. 임의의 URL을 분석해 내 프로젝트에 적용 |
| **insane-review** | repomix + 브라우저 자동화로 Claude Code 안에서 ChatGPT Pro 수준의 코드 분석 활용 |
| **nopal** | Google Workspace를 자연어로 조작 (Opal 불필요) |
| **dd** | 클립보드의 텍스트·이미지를 붙여넣기 없이 바로 투입 (`/dd`, `/ㅇㅇ`) |
| **gaseo** | 현재 Claude Code 세션을 Paseo 앱에 등록해 앱에서 이어서 작업 |

---

## 설치 방법

### 1단계: 마켓플레이스 등록 (최초 1회)

Claude Code 안에서 다음 명령어를 입력하세요:

```shell
/plugin marketplace add https://github.com/fivetaku/gptaku_plugins.git
```

### 2단계: 플러그인 설치

마켓플레이스를 등록했으면 원하는 플러그인을 설치합니다:

```shell
/plugin install
```

목록에서 원하는 플러그인을 선택하거나, 이름을 직접 지정할 수도 있습니다:

```shell
/plugin install show-me-the-prd@gptaku-plugins
```

> **참고**: 플러그인은 한 번에 하나씩 설치됩니다. 여러 개를 설치하려면 반복하세요.

### 3단계: 설치 확인

```shell
/plugin list
```

또는 `/plugin` 을 입력 후 **Installed 탭**으로 이동하면 설치된 플러그인 목록을 볼 수 있습니다.

### 4단계: 업데이트

새 버전이 나오면 다음 명령어로 업데이트할 수 있습니다:

```shell
/plugin update
```

> **중요**: 플러그인 설치 또는 업데이트 후에는 Claude Code를 재시작하세요.

### 5단계: 플러그인 사용해보기

설치가 완료되면 바로 사용할 수 있습니다:

```shell
# 기획서 자동 생성
/show-me-the-prd 할 일 관리 앱 만들고 싶어

# AI 에이전트 팀 자동 구성
/kkirikkiri 리서치 팀 만들어줘

# 스킬 자동 생성
/skillers-suda 번역 스킬 만들어줘

# Git 온보딩
/git-teacher:what-is-commit

# 공식 문서 기반 답변
/docs-guide:explain React hooks

# AI 사용 패턴 분석
/vibe-sunsang 시작
```

---

## 플러그인 관리

| 명령어 | 설명 |
|--------|------|
| `/plugin` | 플러그인 매니저 열기 (Discover/Installed/Marketplaces/Errors 탭) |
| `/plugin list` | 설치된 플러그인 목록 확인 |
| `/plugin disable 플러그인명` | 플러그인 임시 비활성화 |
| `/plugin enable 플러그인명` | 비활성화된 플러그인 다시 활성화 |
| `/plugin uninstall 플러그인명` | 플러그인 완전 삭제 |

---

## 커뮤니티 플러그인 더 보기

공식 마켓플레이스 외에도 커뮤니티에서 만든 플러그인을 직접 GitHub에서 설치할 수 있습니다. 기능이 다양한 만큼, 설치 전 코드를 확인하고 신뢰할 수 있는 저장소인지 먼저 살펴보세요.

### oh-my-claudecode

Claude Code 커뮤니티에서 가장 많이 쓰이는 서드파티 플러그인입니다. 단순한 확장이 아니라 Claude Code 자체를 **오케스트레이터**로 탈바꿈시켜 줍니다.

주요 기능:
- **Autopilot**: "만들어줘"라고 하면 계획 → 구현 → 검증까지 자동 수행
- **33개 전문 에이전트**: 코드 리뷰, 보안 분석, 테스트, 문서화 등 역할별 AI 에이전트
- **외부 AI 연동**: Codex(OpenAI), Gemini(Google)와 협업해 다각도 분석
- **Skills 시스템**: 자주 쓰는 워크플로를 재사용 가능한 명령어로 저장

설치: GitHub 저장소([github.com/wshf/oh-my-claudecode](https://github.com/wshf/oh-my-claudecode))의 README 참조

<details>
<summary>🖥️ 개발자용 커뮤니티 플러그인 (LSP / chrome-devtools)</summary>

### LSP 플러그인 (코드 인텔리전스)

Language Server Protocol을 통합해 타입 에러 감지, 정의 이동, 참조 찾기를 Claude Code 안에서 직접 사용할 수 있습니다.

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

### chrome-devtools MCP

크롬 브라우저의 개발자 도구를 Claude Code에서 직접 제어합니다. 콘솔 로그 읽기, DOM 검사, 네트워크 요청 분석을 AI와 함께 처리할 수 있어 프론트엔드 디버깅 흐름이 크게 달라집니다.

</details>

### supermemory

Claude의 장기 기억을 강화하는 MCP 서버입니다. 대화가 새로 시작되어도 이전 작업 맥락, 프로젝트 결정 사항, 자주 쓰는 패턴을 자동으로 불러옵니다. 같은 프로젝트를 오래 작업할수록 효과가 커집니다.

> **설치 전 확인 사항**: 커뮤니티 플러그인은 Anthropic의 검증을 거치지 않습니다. GitHub 저장소의 코드와 README를 먼저 확인하고, 유지보수가 활발한지, 이슈 대응이 되는지 살펴보세요.

---

## ⭐ CC101이 도움이 됐다면 Star 부탁드려요!

이 가이드가 도움이 됐다면, GitHub에서 Star를 눌러주세요.

Star 하나가 이 가이드를 계속 발전시키는 큰 힘이 됩니다.

**[→ CC101 GitHub에서 Star 누르기](https://github.com/im-jaehong/cc101jp)**

> 어렵지 않아요. 링크 클릭 후 오른쪽 상단의 ⭐ Star 버튼만 누르면 됩니다!

---

## 다음 단계

플러그인까지 설치했다면 준비는 끝났습니다. 이제 Claude Code가 어떻게 작동하는지 들여다볼 차례입니다.
