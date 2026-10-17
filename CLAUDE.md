# CC101 — Claude Code Korean Beginner Guide

## Project Overview

Next.js 16 (App Router) 기반의 Claude Code 한국어/영어/일본어 입문 가이드 사이트.
콘텐츠는 마크다운 파일 + `sections.json`으로 관리되며, 코드 수정 없이 콘텐츠 추가/수정 가능.

- **URL**: https://cc101jp.vercel.app/ja (원작: https://cc101.axwith.com, 출처 표기는 ATTRIBUTION.md 참고)
- **Routing**: `/ko`, `/en`, `/ja` (path-based i18n, SSG). `/`는 `/ja`로 리다이렉트

## Tech Stack

- Next.js 16.1.6 (App Router, Turbopack, RSC)
- React 19, TypeScript 5 (strict)
- Tailwind CSS v4 + `@tailwindcss/typography`
- MDX: `next-mdx-remote/rsc` + `remark-gfm`
- Content parsing: `gray-matter`
- Package manager: pnpm
- Analytics: GA4 (`G-DXL98QN89J`)

## Commands

```bash
pnpm dev        # 개발 서버 (Turbopack)
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버
pnpm lint       # ESLint
npx tsc --noEmit  # 타입 체크
```

테스트 프레임워크는 설정되어 있지 않음. `lint` + `tsc --noEmit`이 유일한 품질 체크.

## Project Structure

```
content/
├── sections.json          # 전체 섹션 메타데이터 (single source of truth)
├── ko/                    # 한국어 마크다운 (21개, 원본)
├── en/                    # 영어 마크다운 (21개, ko/ 미러)
└── ja/                    # 일본어 마크다운 (21개, ko/ 미러)
src/
├── app/
│   ├── layout.tsx         # Root layout: 폰트, GA4, 글로벌 메타데이터
│   ├── page.tsx           # / → /ja 리다이렉트
│   ├── globals.css        # Tailwind v4 import + 다크모드 + prose 오버라이드
│   └── [lang]/
│       ├── layout.tsx     # LangSetter 렌더링
│       ├── page.tsx       # 서버 컴포넌트: 섹션 로딩 + MDX 렌더링
│       ├── LangSetter.tsx # document.documentElement.lang 동기화
│       ├── opengraph-image.tsx  # 언어별 OG 이미지 (빌드 타임 생성, 1200x630)
│       └── twitter-image.tsx    # OG 이미지 재사용
├── assets/
│   └── og-fonts/          # OG 이미지용 Noto Sans JP/KR 서브셋 (SIL OFL 1.1, OFL.txt 동봉)
├── components/            # UI 컴포넌트 (모두 named export)
├── lib/
│   ├── content.ts         # 서버: sections.json + 마크다운 파일 읽기
│   ├── analytics.ts       # GA4 이벤트 래퍼
│   └── og-text.json       # OG 이미지 문구 (언어별 제목·설명·배지·크레딧)
├── hooks/
│   └── useLang.ts         # 클라이언트 lang 상태
└── types/
    └── index.ts           # Lang, SectionMeta, SectionsConfig 등
scripts/
└── og-fonts.mjs           # og-text.json 기준으로 폰트 서브셋 재생성
```

## Architecture

### Content-Driven Rendering

```
sections.json → lib/content.ts → [lang]/page.tsx → SectionBlock + MDXRemote
```

- `sections.json`: 21개 섹션의 id, order, tier, slug, 제목, 설명, 파일 경로 관리
- `lib/content.ts`: 빌드 타임에 JSON + 마크다운 파일을 읽어 정렬된 배열 반환
- 영문/일문 파일 없으면 한국어로 fallback

### Routing

- `/ko`, `/en`, `/ja`: `generateStaticParams`로 SSG
- 지원하지 않는 언어 경로 → `notFound()` (404)
- 언어 전환: `router.push('/{lang}', { scroll: false })`

### Styling

- Tailwind v4: `@import "tailwindcss"` (v3의 `@tailwind` 아님)
- 다크모드: `html.dark` 클래스 기반, 기본값 dark, localStorage 저장
- 다크 variant: `@variant dark (&:where(.dark, .dark *))`
- 색상: zinc(neutral) + orange-500(브랜드 액센트)
- 타이포: `prose prose-zinc dark:prose-invert`

## OG 이미지 문구 바꾸는 법

OG 이미지(`[lang]/opengraph-image.tsx`)는 `src/lib/og-text.json`의 문구와
`src/assets/og-fonts/`의 **서브셋 폰트**로 빌드 타임에 생성된다. 폰트는 og-text.json에 쓰인
글자만 포함하므로, **문구를 바꾸면 반드시 폰트를 재생성**해야 한다 (안 하면 새 글자가 빈칸으로 렌더링됨).

```bash
node scripts/og-fonts.mjs   # Google Fonts에서 서브셋 다시 받기 (네트워크 필요)
pnpm build                  # .next/server/app/{lang}/opengraph-image.body 로 결과 확인
```

섹션 수는 `sections.json`의 `sections.length`에서 자동 계산되므로 손댈 필요 없음.
`dynamicParams = false`라서 ko/en/ja 이외 경로는 정적 404 (온디맨드 렌더링 없음).

## Content 추가하는 법

1. `content/sections.json`에 새 섹션 엔트리 추가 (id, order, tier, file paths, 제목 등)
2. `content/ko/{filename}.md`, `content/en/{filename}.md`, `content/ja/{filename}.md` 생성
3. `tiers` 객체의 `count` 값 업데이트
4. **코드 수정 필요 없음** — 섹션은 JSON에서 자동 디스커버리

## Conventions

- 컴포넌트: named export (Next.js page/layout만 default export)
- 클라이언트 컴포넌트: `'use client'` 디렉티브 필수
- import alias: `@/` → `src/`
- 인라인 TypeScript 인터페이스 사용
- `gray-matter`는 `next.config.ts`에서 `serverExternalPackages`에 반드시 포함

## Supported Languages

`ko`, `en`, `ja`를 지원. 새 언어 추가 시:
1. `src/types/index.ts`의 `Lang` 타입 확장
2. `[lang]/page.tsx`의 `SUPPORTED_LANGS`와 `generateStaticParams` 업데이트
3. `content/{lang}/` 디렉토리에 마크다운 파일 추가
4. `sections.json`에 해당 언어 필드 추가
