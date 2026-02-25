# 06. CLAUDE.md 완전 정복

> Claude Code의 장기 기억을 설정하는 가장 중요한 파일, CLAUDE.md를 마스터해봅시다.

---

## CLAUDE.md가 뭔가요?

Claude Code는 세션이 끝나면 대화 내용을 잊어버립니다. 다음에 다시 시작하면 처음 만난 사이처럼 아무것도 모릅니다.

**CLAUDE.md**는 이 문제를 해결합니다.

Claude Code를 시작할 때마다 CLAUDE.md 파일을 자동으로 읽어서, 프로젝트에 대한 맥락과 규칙을 기억한 채로 작업을 시작합니다.

CLAUDE.md는 Claude에게 주는 **지시서이자 프로젝트 설명서**입니다.

```
사람: "이 프로젝트는 Next.js로 만들었고, TypeScript를 써야 해.
       탭 대신 스페이스 2칸을 사용하고, 한국어로 커밋 메시지를 써줘."

→ 이걸 매번 말하는 대신, CLAUDE.md에 한 번 써두면 영원히 기억합니다.
```

---

## 어디에 만드나요?

CLAUDE.md 파일의 위치에 따라 적용 범위가 달라집니다.

| 파일 위치 | 적용 범위 | 팀 공유 여부 |
|----------|---------|------------|
| `./CLAUDE.md` | 현재 프로젝트 | ✅ Git으로 팀 공유 가능 |
| `./.claude/CLAUDE.md` | 현재 프로젝트 (숨김 폴더) | ✅ Git으로 팀 공유 가능 |
| `./CLAUDE.local.md` | 현재 프로젝트 (나만) | ❌ .gitignore에 자동 추가 |
| `~/.claude/CLAUDE.md` | 내 모든 프로젝트 (전역) | ❌ 나만 적용 |

**가장 일반적인 위치**: 프로젝트 루트 디렉토리의 `CLAUDE.md`

```bash
# 프로젝트 폴더에서 CLAUDE.md 생성
touch CLAUDE.md

# 또는 Claude Code가 자동으로 만들어주게 하기
/init
```

> `/init` 명령어를 실행하면 Claude Code가 현재 프로젝트를 분석해서 CLAUDE.md 초안을 자동으로 생성해줍니다.

---

## 무엇을 써야 하나요?

CLAUDE.md에 정해진 형식은 없습니다. 마크다운으로 자유롭게 작성하면 됩니다. 다음 항목들을 포함하면 특히 효과적입니다.

### 필수 항목

#### 1. 프로젝트 설명
Claude가 이 프로젝트가 무엇인지 파악할 수 있도록 짧게 설명합니다.

```markdown
## 프로젝트 개요
이 프로젝트는 소상공인을 위한 재고 관리 웹앱입니다.
Next.js 14 + TypeScript + Supabase로 구성되어 있습니다.
```

#### 2. 기술 스택
어떤 언어, 프레임워크, 라이브러리를 쓰는지 명시합니다.

```markdown
## 기술 스택
- **프론트엔드**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **백엔드**: Next.js API Routes
- **데이터베이스**: Supabase (PostgreSQL)
- **패키지 매니저**: pnpm (npm 사용 금지)
```

#### 3. 코딩 스타일 / 규칙
코드 스타일, 네이밍 규칙, 주석 언어 등을 지정합니다.

```markdown
## 코딩 규칙
- 들여쓰기: 스페이스 2칸 (탭 사용 금지)
- 따옴표: 작은따옴표('') 사용
- 컴포넌트 파일명: PascalCase (예: UserCard.tsx)
- 함수명: camelCase (예: getUserData)
- 주석은 한국어로 작성
- `any` 타입 사용 금지, 항상 명시적 타입 사용
```

#### 4. 하지 말아야 할 것들 (금지 사항)
실수를 방지하기 위해 명시적으로 금지 사항을 적어두면 효과적입니다.

```markdown
## 절대 하지 말 것
- `console.log` 프로덕션 코드에 남기지 말 것
- `npm` 대신 반드시 `pnpm` 사용
- `.env` 파일에 있는 키를 코드에 하드코딩하지 말 것
- `any` 타입 사용 금지
- `pages/` 디렉토리 방식 사용 금지 (App Router만 사용)
```

#### 5. 자주 쓰는 명령어
매번 명령어를 검색하는 수고를 덜 수 있습니다.

```markdown
## 자주 쓰는 명령어
- 개발 서버 실행: `pnpm dev`
- 빌드: `pnpm build`
- 테스트: `pnpm test`
- 린트: `pnpm lint`
- 타입 체크: `pnpm type-check`
- DB 마이그레이션: `pnpm db:migrate`
```

---

## 실제 예시: Next.js + TypeScript 프로젝트용 CLAUDE.md 템플릿

아래는 한국 개발환경에 맞게 작성된 실용적인 템플릿입니다. 복사해서 바로 사용하세요.

```markdown
# 프로젝트 지침

## 프로젝트 개요
[여기에 프로젝트 설명을 1-2줄로 작성하세요]

예시: 소상공인을 위한 재고 관리 SaaS 서비스.
Next.js 14 App Router + TypeScript + Supabase 기반.

---

## 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript (strict 모드)
- **스타일**: Tailwind CSS
- **DB/백엔드**: Supabase
- **패키지 매니저**: pnpm
- **배포**: Vercel

---

## 디렉토리 구조
\`\`\`
src/
├── app/          # Next.js App Router 페이지
├── components/   # 재사용 가능한 UI 컴포넌트
│   ├── ui/       # 기본 UI 요소 (Button, Input 등)
│   └── features/ # 기능별 컴포넌트
├── lib/          # 유틸리티, Supabase 클라이언트 등
└── types/        # TypeScript 타입 정의
\`\`\`

---

## 코딩 규칙

### 스타일
- 들여쓰기: 스페이스 2칸
- 따옴표: 작은따옴표('')
- 세미콜론: 사용 (항상)
- 줄 끝 공백: 허용 안 함

### 네이밍
- 컴포넌트: PascalCase (UserCard.tsx)
- 함수/변수: camelCase (getUserData)
- 상수: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- 타입/인터페이스: PascalCase (UserProfile)

### TypeScript
- `any` 타입 사용 금지
- 모든 함수 반환 타입 명시
- Props 타입은 인터페이스로 정의

---

## 자주 쓰는 명령어
\`\`\`bash
pnpm dev          # 개발 서버 (localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm test         # 테스트 실행
pnpm lint         # ESLint 검사
pnpm type-check   # TypeScript 타입 검사
\`\`\`

---

## 절대 하지 말 것
- `npm` 또는 `yarn` 사용 (반드시 `pnpm` 사용)
- `any` 타입 사용
- `pages/` 디렉토리 방식 사용 (App Router만)
- 환경 변수를 코드에 하드코딩
- `console.log`를 프로덕션 코드에 남기기

---

## Git 커밋 규칙
- 한국어로 커밋 메시지 작성
- 형식: `타입: 변경 내용`
- 타입 예시: feat(기능), fix(수정), docs(문서), style(스타일), refactor(리팩토링)
- 예시: `feat: 사용자 로그인 페이지 추가`
```

---

## 전역 메모리: 모든 프로젝트에 적용하기

`~/.claude/CLAUDE.md` 파일을 만들면, 내 모든 프로젝트에서 공통으로 적용되는 규칙을 설정할 수 있습니다.

```bash
# 전역 CLAUDE.md 편집
nano ~/.claude/CLAUDE.md
```

전역 CLAUDE.md에 넣기 좋은 내용:

```markdown
# 전역 설정 (모든 프로젝트 공통)

## 내 개인 선호
- 설명은 항상 한국어로 해줘
- 코드 변경 전에 무엇을 할지 먼저 설명해줘
- 중요한 변경사항은 실행 전에 한 번 더 확인해줘

## 코딩 스타일 (공통)
- 함수는 가능하면 짧게 (20줄 이하)
- 변수명은 의미가 명확하게
- 주석보다는 코드 자체가 읽기 쉽도록
```

---

## 메모리 우선순위

여러 CLAUDE.md 파일이 있을 때, 더 구체적인 파일이 우선합니다.

```
우선순위 (높음 → 낮음):
1. CLAUDE.local.md (나만의 프로젝트 설정)
2. ./CLAUDE.md (프로젝트 설정)
3. ~/.claude/CLAUDE.md (전역 설정)
4. 조직 관리 CLAUDE.md (회사 설정)
```

예를 들어, 전역 설정에서 "스페이스 2칸"으로 설정했더라도, 프로젝트의 CLAUDE.md에서 "탭 사용"으로 설정하면 프로젝트 설정이 우선 적용됩니다.

---

## 유용한 팁

### `/memory` 명령어 활용
세션 중에 CLAUDE.md를 직접 편집하고 싶다면:

```shell
/memory
```

파일 선택기가 열려서 CLAUDE.md를 바로 편집할 수 있습니다.

### 파일 가져오기 (Import)
CLAUDE.md에서 다른 파일을 참조할 수 있습니다:

```markdown
# 프로젝트 지침

프로젝트 개요는 @README.md 를 참고하세요.
사용 가능한 npm 스크립트는 @package.json 을 참고하세요.

## 추가 규칙
- Git 워크플로우: @docs/git-guide.md
```

### 처음 시작할 때는 CLAUDE.md부터!

새 프로젝트를 시작한다면, **첫 번째 작업으로 CLAUDE.md를 만드세요**.

```shell
# 프로젝트 시작 시 Claude에게 CLAUDE.md 자동 생성 요청
/init
```

또는 직접 Claude에게 부탁할 수도 있습니다:

```
"이 프로젝트는 Next.js 14 + TypeScript + Tailwind로 만들 거야.
 한국어 주석과 커밋 메시지를 사용하고, pnpm을 패키지 매니저로 써.
 이 내용을 바탕으로 CLAUDE.md 파일을 만들어줘."
```

---

## 정리: CLAUDE.md 핵심 요약

| 항목 | 내용 |
|------|------|
| **역할** | Claude의 장기 기억 / 프로젝트 지시서 |
| **위치** | 프로젝트 루트의 `CLAUDE.md` |
| **전역 설정** | `~/.claude/CLAUDE.md` |
| **자동 생성** | `/init` 명령어 사용 |
| **편집** | `/memory` 명령어 또는 일반 텍스트 편집기 |
| **형식** | 자유로운 마크다운 |

**CLAUDE.md 하나로 매번 설명하는 수고를 없애고, Claude Code를 진짜 팀원처럼 만들어보세요.**

---

CLAUDE.md 하나 잘 써두는 것만으로도 매 세션마다 설명하는 수고가 없어집니다. 진짜 팀원처럼 쓰게 됩니다.
