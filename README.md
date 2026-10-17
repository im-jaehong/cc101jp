# CC101 — Claude Code 한국어 입문 가이드

> **Claude Code를 가장 쉽게 시작하는 한국어 가이드**

🌐 **사이트**: [cc101jp.vercel.app/ja](https://cc101jp.vercel.app/ja) (한국어 `/ko`, English `/en`)
📦 **GitHub**: [github.com/im-jaehong/cc101jp](https://github.com/im-jaehong/cc101jp)

> **Based on** [CC101](https://github.com/fivetaku/cc101) by fivetaku ([cc101.axwith.com](https://cc101.axwith.com)) · CC BY-NC 4.0
> 이 저장소는 원본 CC101을 바탕으로 일본어 번역, 2026년 기준 정보 갱신, 내용 수정·추가를 더한 **개작판**입니다. 자세한 출처 표기는 [ATTRIBUTION.md](./ATTRIBUTION.md)를 참고하세요.

---

## 소개

CC101은 Claude Code를 처음 접하는 한국어 사용자를 위한 입문 가이드입니다.
공식 문서 기반으로 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 단계별로 정리했습니다.

[Codex 101](https://swhan0329.github.io/codex-101/)에서 영감을 받아 Claude Code 버전으로 제작했습니다.

---

## 주요 기능

- 📖 **21개 섹션** — 설치부터 고급 활용까지 단계별 가이드
- 🌐 **한국어 / 영어 / 일본어** — 언어 전환 지원 (`/ko`, `/en`, `/ja`)
- 🌙 **다크 / 라이트 모드** — 테마 전환 지원
- 📱 **반응형 디자인** — 모바일 최적화
- ⚡ **빠른 로딩** — Next.js SSG 기반

---

## 기술 스택

| 기술 | 버전 |
|-----|------|
| Next.js | 16.x (App Router) |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| next-mdx-remote | 최신 |

---

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 콘텐츠 수정

섹션 콘텐츠는 `content/` 폴더에 Markdown으로 작성합니다:

```
content/
├── sections.json        # 섹션 목차 설정
├── ko/                  # 한국어 콘텐츠 (원본)
│   ├── 01-what-is-cc.md
│   ├── 02-plans-pricing.md
│   └── ...
├── en/                  # 영어 콘텐츠 (ko/ 미러)
│   └── ...
└── ja/                  # 일본어 콘텐츠 (ko/ 미러)
    └── ...
```

---

## 기여하기

이 가이드는 **공개 문서 프로젝트**입니다(코드와 콘텐츠 모두 CC BY-NC 4.0, 단 `src/assets/og-fonts/`의 폰트는 SIL OFL 1.1). 잘못된 내용 수정, 새 섹션 추가, 번역 개선 모두 환영합니다!

### 기여 방법

1. 이 저장소를 Fork합니다
2. 브랜치를 생성합니다 (`git checkout -b fix/오류수정`)
3. 변경사항을 커밋합니다 (`git commit -m 'fix: 오류 수정'`)
4. 브랜치에 Push합니다 (`git push origin fix/오류수정`)
5. Pull Request를 생성합니다

### 기여 가능한 내용

- 오탈자 / 문법 오류 수정
- 공식 문서 업데이트 반영
- 영어 콘텐츠 보완
- 새로운 섹션 제안
- UI/UX 개선

---

## 라이선스 및 출처

이 프로젝트는 **fivetaku**가 만든 [CC101](https://github.com/fivetaku/cc101)([cc101.axwith.com](https://cc101.axwith.com))을 기반으로 한 **개작판**입니다. 원본에서 다음 내용이 변경되었습니다.

- 일본어 번역 (`content/ja/`)
- 2026년 기준 Claude Code 정보로 갱신 (모델, 가격, 권한 모드, 명령어, 플러그인 등)
- 설명·예제·문제 해결 내용 수정 및 추가
- 일본 사용자를 위한 표현과 사이트 환경 조정

| 역할 | 담당 | 링크 |
|------|------|------|
| 원작 (CC101) | fivetaku | [저장소](https://github.com/fivetaku/cc101) · [사이트](https://cc101.axwith.com) |
| 일본어 번역, 2026년 갱신, 수정·추가 | im-jaehong | [저장소](https://github.com/im-jaehong/cc101jp) · [사이트](https://cc101jp.vercel.app/ja) |

**라이선스**: 원본 저장소는 README에 MIT, LICENSE 파일에 CC BY-NC 4.0으로 표기되어 있어 서로 다릅니다. 원작자에게 확인을 받기 전까지 이 저장소는 원본과 개작 부분 모두를 더 보수적인 **[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/legalcode)** 기준으로 배포합니다. 자세한 내용은 [LICENSE](./LICENSE)와 [ATTRIBUTION.md](./ATTRIBUTION.md)를 참고하세요.

- 재배포·재가공 시 원작 크레딧 `CC101 by fivetaku (cc101.axwith.com)`과 변경 사실을 함께 표기해야 합니다.
- 상업적 이용이나 영리기업 내부 활용은 별도 허가가 필요할 수 있습니다. 해당 용도라면 사전에 원작자에게 확인하세요.
- 이 개작판은 원작자가 보증하거나 공식 승인한 것이 아닙니다.

---

⭐ 이 가이드가 도움이 됐다면 **Star**를 눌러주세요!
Star 하나가 가이드를 계속 발전시키는 큰 힘이 됩니다.
