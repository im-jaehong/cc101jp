# 09. 자주 하는 실수 & 해결법

> 초보자가 Claude Code를 쓰면서 자주 겪는 문제 10가지를 Q&A 형식으로 정리했습니다.

---

## Q1. `claude` 명령어를 못 찾는다고 한다 (command not found)

### 증상

```bash
$ claude
zsh: command not found: claude
```

### 원인 & 해결법

설치는 됐지만 터미널이 `claude` 명령어 위치를 모르는 상황입니다.

**방법 1: 네이티브 설치 사용 (가장 확실)**

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
```

설치 후 터미널을 완전히 닫고 새로 열어보세요.

**방법 2: PATH 확인**

```bash
# claude가 어디 설치됐는지 확인
which claude

# PATH 확인
echo $PATH
```

`~/.local/bin`이 PATH에 없으면 shell 설정 파일(`.zshrc` 또는 `.bashrc`)에 추가:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

추가 후 `source ~/.zshrc` 실행.

**방법 3: 설치 상태 점검**

```bash
claude doctor
```

---

## Q2. 로그인이 안 된다

### 증상

- 브라우저가 열리지 않음
- 인증 화면에서 멈춤
- 로그인 후에도 인증 오류

### 해결법

**브라우저 팝업이 안 열릴 때**

`claude` 실행 후 `c`를 눌러 인증 URL을 복사한 뒤, 브라우저에 직접 붙여넣기 하세요.

**로그아웃 후 재인증**

```bash
# Claude Code 안에서
> /logout

# 또는 인증 파일 직접 삭제
rm -rf ~/.config/claude-code/auth.json
claude
```

**여전히 안 된다면**

```bash
# 모든 설정 초기화 후 재시작
rm ~/.claude.json
rm -rf ~/.claude/
claude
```

> 주의: 이렇게 하면 모든 설정과 세션 기록이 삭제됩니다.

---

## Q3. 너무 느리다 / 응답이 늦다

### 원인

대화가 길어질수록 Claude가 처리해야 할 내용(컨텍스트)이 쌓여서 느려집니다. 이는 정상적인 동작입니다.

### 해결법

**방법 1: `/compact`로 컨텍스트 정리 (가장 효과적)**

```
> /compact
```

대화 내용을 압축해서 속도를 회복합니다.

**방법 2: `/clear`로 초기화**

완전히 새로 시작해도 되는 경우:

```
> /clear
```

**방법 3: 더 빠른 모델로 변경**

복잡한 작업이 아니라면 Haiku나 Sonnet이 Opus보다 훨씬 빠릅니다.

```
> /model
```

모델 선택 화면에서 변경하세요.

**방법 4: MCP 서버 줄이기**

불필요한 MCP 서버가 많으면 느려질 수 있습니다.

```
> /mcp
```

사용하지 않는 서버를 비활성화하세요.

---

## Q4. 내가 원하는 대로 안 고쳐준다

### 원인

지시가 모호하거나, Claude가 프로젝트 맥락을 모르거나, 같은 말을 계속 반복해서 Claude가 혼란스러운 경우입니다.

### 해결법

**방법 1: 더 구체적으로 지시하기**

```
# 모호한 지시
> 코드 개선해줘

# 구체적인 지시
> auth.js의 login 함수에서 이메일 유효성 검사가 빠져있어.
  정규식으로 이메일 형식 확인하는 코드를 42번 줄 다음에 추가해줘
```

**방법 2: CLAUDE.md에 규칙 추가**

자주 반복되는 요구사항은 프로젝트 규칙으로 저장하세요.

```
> /memory
```

또는 CLAUDE.md 파일에 직접 추가:

```markdown
# 코드 스타일
- 에러 메시지는 항상 한글로 작성
- 함수마다 JSDoc 주석 필수
- var 사용 금지, const/let만 사용
```

**방법 3: 같은 실수가 두 번 반복되면 초기화**

```
> /clear
```

새로 시작해서 더 명확한 지시로 다시 요청하세요.

---

## Q5. 파일을 수정했는데 실수인 것 같다

### 해결법

**방법 1: Claude Code 안에서 되감기 (가장 빠름)**

```
Esc 키를 두 번 연속으로 누르기
또는
> /rewind
```

이전 상태로 대화와 코드를 함께 되돌립니다.

**방법 2: git으로 복구**

```bash
# 변경된 내용 확인
git diff

# 특정 파일만 되돌리기
git checkout -- src/auth/login.js

# 모든 변경 취소
git checkout .
```

**방법 3: 작업 전 git commit 습관 들이기**

Claude Code로 큰 작업을 시작하기 전에 항상:

```bash
git add .
git commit -m "작업 전 백업 $(date +%Y%m%d-%H%M)"
```

---

## Q6. 갑자기 비용이 많이 나왔다

### 원인

- 대화가 너무 길어짐 (컨텍스트가 클수록 토큰 소모 증가)
- 파일이 많은 프로젝트를 전체 분석 요청
- Opus 모델을 계속 사용
- 에이전트 팀 기능 사용

### 해결법

**현재 비용 확인**

```
> /cost
```

API 사용자용. 구독 사용자는 `/stats`로 사용량 확인.

**비용 줄이는 방법**

1. `/compact` 자주 사용해서 컨텍스트 관리
2. 단순 작업은 Sonnet이나 Haiku 사용 (`/model`로 변경)
3. 큰 파일/폴더 전체를 맥락 없이 읽히지 않기
4. 관련 없는 작업 사이에는 `/clear`로 초기화

**예산 한도 설정 (자동화 사용 시)**

```bash
claude -p --max-budget-usd 1.00 "질문"
```

---

## Q7. 권한 요청이 너무 많이 뜬다

### 상황

Claude가 파일을 수정하거나 명령어를 실행할 때마다 허가를 요청합니다.

### 해결법

**방법 1: 자주 쓰는 도구는 항상 허용으로 설정**

```
> /permissions
```

권한 관리 화면에서 특정 도구를 Always Allow로 설정합니다.

**방법 2: 파일 수정을 자동 허용**

```
Shift+Tab을 눌러 Auto-Accept Edit Mode 선택
```

현재 세션 동안 파일 수정 요청을 자동으로 허용합니다.

**방법 3: 각 권한 모드 이해하기**

| 모드 | 설명 | 언제 쓰나 |
|------|------|----------|
| 기본 모드 | 첫 사용 시 허가 요청 | 일반 사용 |
| Plan Mode | 파일 수정 불가, 계획만 | 안전하게 탐색할 때 |
| Auto-Accept | 파일 수정 자동 허용 | 신뢰할 수 있는 작업 |

**`--dangerously-skip-permissions` 사용 주의**

이 옵션은 모든 권한 확인을 건너뜁니다. 격리된 컨테이너 환경이 아니면 사용하지 마세요. 실수로 시스템 파일을 수정하거나 삭제할 위험이 있습니다.

---

## Q8. 한글이 깨진다 / 이상한 문자가 나온다

### 원인

터미널이 UTF-8 인코딩을 사용하지 않을 때 발생합니다.

### 해결법

**macOS / Linux**

shell 설정 파일(`.zshrc` 또는 `.bashrc`)에 추가:

```bash
export LANG=ko_KR.UTF-8
export LC_ALL=ko_KR.UTF-8
```

추가 후 `source ~/.zshrc` 실행.

**터미널 앱 설정 확인**

- **iTerm2**: Preferences → Profiles → Terminal → Character Encoding → UTF-8
- **macOS 기본 터미널**: 환경설정 → 프로파일 → 고급 → 문자 인코딩 → Unicode(UTF-8)
- **VS Code 터미널**: 자동으로 UTF-8 사용 (대부분 문제없음)

**Windows (WSL)**

```bash
# WSL에서 실행
sudo locale-gen ko_KR.UTF-8
```

---

## Q9. 맥락을 잃어버렸다 (세션이 초기화됐다)

### 상황

- Claude가 이전에 한 작업을 기억하지 못함
- 세션이 갑자기 끊김
- 터미널을 닫았다 다시 열었음

### 해결법

**방법 1: 이전 세션 이어서 시작**

```bash
# 가장 최근 세션 이어서
claude --continue

# 세션 목록에서 선택
claude --resume

# 이름으로 이어서 (이름을 미리 저장했을 때)
claude --resume auth-refactor
```

**방법 2: 세션에 이름 붙여두기 (예방책)**

중요한 작업을 시작할 때:

```
> /rename 로그인기능-개발
```

**방법 3: CLAUDE.md에 중요 정보 저장**

세션이 끊겨도 유지되어야 할 정보는 CLAUDE.md에:

```
> /memory
```

```markdown
# 현재 진행 중인 작업
- 목표: OAuth2 인증 시스템 구현
- 완료: 기본 로그인/로그아웃
- 진행 중: 소셜 로그인 (Google, Kakao)
- 사용 기술: Next.js, Prisma, NextAuth.js
```

---

## Q10. 코드가 너무 많이 바뀌었다 (예상치 못한 대규모 변경)

### 상황

"간단히 수정해줘"라고 했는데 Claude가 관련 없는 파일까지 대거 수정하는 경우.

### 해결법

**방법 1: 즉시 멈추기**

Claude가 작업 중이면 바로:

```
Ctrl+C
```

또는 `Esc`를 눌러 현재 작업 중단.

**방법 2: 이전 상태로 되감기**

```
Esc 두 번 연속
또는
> /rewind
```

**방법 3: git으로 확인 및 복구**

```bash
# 변경된 파일 목록 확인
git status

# 변경 내용 상세 확인
git diff

# 특정 파일만 복구
git checkout -- 파일경로

# 전부 취소
git checkout .
```

**방법 4: Plan Mode로 먼저 확인 (예방책)**

큰 작업 전에는 Plan Mode에서 계획을 먼저 검토하세요.

```
Shift+Tab (두 번)
```

또는

```bash
claude --permission-mode plan
```

**방법 5: 지시를 더 구체적으로**

```
# 범위를 명확하게 지정
> auth.js 파일의 login 함수만 수정해줘. 다른 파일은 건드리지 마

# 금지 사항 명시
> 리팩토링은 하지 말고 버그만 수정해줘
```

---

## 요약: 자주 하는 실수 방지 체크리스트

```
Claude Code 시작 전:
□ 프로젝트 폴더로 이동했나? (cd 내프로젝트)
□ 중요한 작업이면 git commit 했나?
□ CLAUDE.md에 프로젝트 규칙이 있나?

작업 중:
□ 지시가 충분히 구체적인가?
□ 한 번에 너무 많이 요청하지 않았나?
□ 대화가 길어지면 /compact 사용했나?
□ 뭔가 이상하면 Ctrl+C로 바로 멈췄나?

작업 후:
□ 변경 내용을 확인했나? (git diff)
□ 테스트가 통과하는가?
□ 중요한 세션이면 이름을 저장했나? (/rename)
```

---

> 문제가 해결되지 않으면 Claude Code 안에서 `/doctor`를 실행해 설치 상태를 점검하거나, `/bug`를 입력해 Anthropic에 직접 문제를 보고할 수 있습니다.
