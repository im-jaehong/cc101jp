# 04. 플러그인 추천 설치

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
| **코드 인텔리전스** | `typescript-lsp`, `pyright-lsp` | 타입 오류 실시간 감지, 코드 탐색 |
| **외부 서비스 연동** | `github`, `figma`, `notion` | 외부 서비스를 Claude와 연결 |
| **개발 워크플로** | `commit-commands`, `pr-review-toolkit` | Git 커밋, PR 리뷰 자동화 |
| **출력 스타일** | `explanatory-output-style` | Claude 응답 방식 커스터마이징 |

---

## gptaku_plugins — 한국 입문자 전용 플러그인 모음

> GitHub: [https://github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

**gptaku_plugins**는 한국의 Claude Code 입문자, 비개발자, 바이브코더를 위해 특별히 만들어진 플러그인 모음입니다. 어렵고 낯선 개발 개념들을 Claude가 더 친절하게 안내해주도록 설계되어 있습니다.

### 포함된 플러그인

| 플러그인 이름 | 역할 | 사용 예시 |
|------------|------|---------|
| **docs-guide** | 라이브러리 공식 문서 기반으로 정확한 답변 제공. Claude가 최신 공식 문서를 참고해 할루시네이션 없이 답변 | `/docs-guide:explain React hooks` |
| **git-teacher** | 비개발자를 위한 Git 온보딩 가이드. "커밋이 뭐야?"부터 시작해서 실무 Git 워크플로우까지 단계별 안내 | `/git-teacher:what-is-commit` |
| **vibe-sunsang** | 바이브코더 전용 AI 멘토. 코드를 몰라도 아이디어를 제품으로 만들 수 있도록 격려하고 안내 | `/vibe-sunsang:help` |

---

## 설치 방법

### 1단계: 마켓플레이스 추가 및 플러그인 설치

Claude Code 안에서 다음 명령어를 입력하세요:

```shell
/plugin install https://github.com/fivetaku/gptaku_plugins
```

또는 마켓플레이스를 먼저 추가하고 설치할 수도 있습니다:

```shell
# 마켓플레이스 추가
/plugin marketplace add fivetaku/gptaku_plugins

# 이후 Discover 탭에서 원하는 플러그인 선택하여 설치
/plugin
```

### 2단계: 설치 확인

설치된 플러그인 목록을 확인하세요:

```shell
/plugin list
```

또는 `/plugin` 을 입력 후 **Installed 탭**으로 이동하면 설치된 플러그인 목록을 볼 수 있습니다.

### 3단계: 플러그인 사용해보기

설치가 완료되면 바로 사용할 수 있습니다:

```shell
# git-teacher 사용 예시
/git-teacher:what-is-commit

# docs-guide 사용 예시
/docs-guide:explain useState

# vibe-sunsang 멘토에게 도움 요청
/vibe-sunsang:help
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

## ⭐ GitHub Star 부탁드려요!

gptaku_plugins가 도움이 됐다면, GitHub에서 Star를 눌러주세요.

Star 하나가 이 프로젝트를 계속 발전시키는 큰 힘이 됩니다.

**[→ GitHub에서 Star 누르기](https://github.com/fivetaku/gptaku_plugins)**

> 어렵지 않아요. 링크 클릭 후 오른쪽 상단의 ⭐ Star 버튼만 누르면 됩니다!

---

## 다음 단계

플러그인 설치를 완료했다면, Claude Code가 어떻게 작동하는지 핵심 개념을 이해해봅시다.

→ **[05. 핵심 개념 이해하기](./05-core-concepts.md)**
