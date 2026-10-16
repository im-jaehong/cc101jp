# 20. Headlessモード & GitHub Actions自動化

> Claude Codeを人の手を介さず自動で実行する方法を学びます。

---

> 📌 **このセクションは2つのパートに分かれています**
> - **Headlessモード**（基本的な使い方）：非開発者でも活用できる自動化 -- ニュース要約、週次レポート、ファイル一括処理など
> - **GitHub Actions連携**（開発者向け応用）：ソフトウェア開発チーム向けCI/CD自動化

---

## Headlessモードとは？

通常、Claude Codeはターミナルで対話的に使用します。ユーザーが直接質問し、Claudeが回答し、またユーザーがフィードバックを返す方式です。

**Headlessモード**は、人の手を介さずにClaude Codeを自動で実行する方式です。スクリプトやCI/CDパイプラインからClaude Codeをプログラムのように呼び出せます。

> **Headless = 人の手を介さず自動実行**

以前は「headless mode」と呼ばれていましたが、公式ドキュメントでは**Agent SDKをCLIで使う方式**（非対話型モード）と説明されています。`-p`フラグとすべてのCLIオプションは同様に動作します。

---

## いつ使うのか？

| 場面 | 例 |
|------|------|
| **デイリーブリーフィング** | 毎朝、業界ニュース要約ファイルを自動生成 |
| **週次レポート** | 今週の議事録を読んで週次要約を自動作成 |
| **ファイルバッチ処理** | フォルダ内のPDF・ドキュメントを一括要約 |
| **コンテンツ草案** | アイデアフォルダを読んで来週のコンテンツカレンダーを生成 |

<details>
<summary>🖥️ 開発者向け活用例</summary>

| 場面 | 例 |
|------|------|
| CI/CDパイプライン | PRが作成されるたびに自動でコードレビュー |
| 自動化スクリプト | 毎晩コード品質レポートを生成 |
| バッチ処理 | 複数のファイルを一括でマイグレーション |
| 繰り返し作業 | テスト失敗時に自動修正を試行 |

</details>

---

## 基本的な使い方

`-p`（または`--print`）フラグを付けると、非対話型（non-interactive）モードで実行されます。

### 最もシンプルな形

```bash
claude -p "このプロジェクトが何をしているか説明して"
```

### ツール権限を許可する

Claudeがファイルを読み書きできるようにツールを許可します：

```bash
claude -p "~/DownloadsのPDFをすべて読んで要約集.mdにまとめて" --allowedTools "Read,Write,Bash"
```

ツールを一つずつ列挙する代わりに、権限モードで基準線を決めることもできます：

```bash
# 分類器が検討しながら進行（対話型セッションと同じAutoモード）
claude -p "依存関係のバージョンを上げてテストを実行して" --permission-mode auto

# 確認が必要な行動はすべて拒否（ロックされたCI環境用）
claude -p "..." --permission-mode dontAsk

# 誰も確認ダイアログに答えられない無人実行：確認が必要になる行動は拒否して続行
claude -p "..." --permission-mode auto --permission-prompts none
```

### スクリプト・CIでは`--bare`

`--bare`を付けると、フック、プラグイン、MCPサーバー、自動メモリ、CLAUDE.mdの自動探索をすべてスキップするので起動が速く、**どのコンピュータで実行しても同じ結果**になります。公式ドキュメントがスクリプトとCIに推奨している方式で、今後`-p`のデフォルトになる予定です。サブスクリプションのログインは読まないため、`ANTHROPIC_API_KEY`が必要です。

```bash
claude --bare -p "README.mdを要約して" --allowedTools "Read"
```

### JSON出力を受け取る

スクリプトで結果をパースしやすいようにJSON形式で出力できます：

```bash
claude -p "このプロジェクトを要約して" --output-format json
```

出力形式オプション：
- `text`（デフォルト）：プレーンテキスト
- `json`：JSON構造体で結果を返す（セッションID、メタデータ含む）
- `stream-json`：リアルタイムストリーミングJSON

### 実用的な例：非開発者向け自動化3選

**デイリーニュース・業界動向の要約**：
```bash
claude -p "inputs/links.txtを読んで今日の業界ニュース要約をdaily/brief_今日の日付.mdに保存して" \
  --allowedTools "Read,Write"
```

**週次アクションアイテムの集約**：
```bash
claude -p "meetings/フォルダの過去7日分の議事録を読んで未完了のアクションアイテムだけ表にまとめてweekly/this-week.mdに保存して" \
  --allowedTools "Read,Write"
```

**コンテンツカレンダー草案の作成**：
```bash
claude -p "ideas/フォルダを読んで来週の平日5日分のコンテンツカレンダーを作成してdrafts/next-week.mdに保存して" \
  --allowedTools "Read,Write"
```

<details>
<summary>🖥️ 開発者向け例：自動コミット</summary>

```bash
claude -p "ステージングされた変更をレビューして適切なコミットメッセージでコミットして" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

</details>

### 会話を継続する

```bash
# 最初のリクエスト
claude -p "このフォルダのドキュメントを分析して"

# 前の会話を引き継いで
claude -p "その中から重要な結論部分だけまとめて" --continue
```

---

<details>
<summary>🖥️ 開発者向け：GitHub Actions & GitLab CI/CD自動化</summary>

## GitHub Actions連携

GitHub Actionsは、PRの作成、コードのプッシュ、Issue登録などのGitHubイベントに反応して自動でタスクを実行するサービスです。Claude Codeをここに連携すると、AIベースの自動化が実現できます。

### 公式Actionの紹介

Anthropicが公式に提供するGitHub Actionがあります：

- **リポジトリ**：[github.com/anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)
- **バージョン**：`anthropics/claude-code-action@v1`

### クイックスタート

Claude Codeターミナルで以下のコマンドを実行すると、設定を自動でガイドしてくれます：

```
/install-github-app
```

> リポジトリの管理者権限とGitHub CLI（`gh auth login`済み）が必要で、github.comのリポジトリでのみ動作します。APIキーの代わりに**サブスクリプションアカウントで認証**することもできます：ローカルで`claude setup-token`を実行して1年間有効なトークンを作成し、`CLAUDE_CODE_OAUTH_TOKEN`シークレットとして登録すると、Actionsの実行がサブスクリプションの使用量から差し引かれます。

### 手動設定方法

1. **Claude GitHubアプリのインストール**：[github.com/apps/claude](https://github.com/apps/claude)からリポジトリにアプリをインストールします。

2. **認証シークレットの登録**：リポジトリのSettings → Secretsに`ANTHROPIC_API_KEY`（APIキー）または`CLAUDE_CODE_OAUTH_TOKEN`（サブスクリプショントークン）を追加します。

3. **ワークフローファイルの追加**：`.github/workflows/`フォルダにYAMLファイルを作成します。公式の例（[examples/claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml)）をそのままコピーしても構いません。

---

### 例1：@claudeメンションでPRレビューを自動化

PRコメントやIssueで`@claude`をメンションすると、Claudeが自動で応答します。

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
          # サブスクリプショントークンを使うなら上の行の代わりに：
          # claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          # promptを指定しなければ@claudeメンションに自動で応答
```

使用例：
```
@claude このPRのセキュリティ脆弱性をレビューして
@claude この関数にエッジケースがないか確認して
@claude このIssueに基づいて機能を実装して
```

---

### 例2：PRが作成されたときに自動コードレビュー

```yaml
name: コードレビュー
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

> `--comment`があって初めてレビュー結果がPRにインラインコメントとして付きます。なければワークフローのログにしか残りません。ワークフローファイルなしですべてのPRに自動レビューを受けたいなら、公式ドキュメントの**Code Review**機能を参照してください。

---

### 例3：スケジュールベースのコード分析

```yaml
name: デイリーレポート
on:
  schedule:
    - cron: "0 9 * * *"  # 毎日午前9時

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
          prompt: "昨日のコミットとオープンIssueを要約して"
          claude_args: |
            --model claude-sonnet-5-5
            --allowedTools "mcp__github__list_commits,mcp__github__list_issues"
```

> プレーンテキストのpromptで実行するときは、`claude_args`の`--allowedTools`で許可したツールしか使えません。上の例はGitHub APIツールを2つだけ許可しているので、checkoutステップは不要です。

---

### ワークフローパラメータの説明

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}  # 必須
    prompt: "タスクの指示内容"        # オプション（なければ@claudeメンションに反応）
    claude_args: "--max-turns 10"  # オプション（追加CLI引数）
```

| パラメータ | 説明 | 必須かどうか |
|---------|------|----------|
| `anthropic_api_key` | Anthropic APIキー | どちらか一方が必須 |
| `claude_code_oauth_token` | サブスクリプションアカウントのトークン（`claude setup-token`で生成） | どちらか一方が必須 |
| `prompt` | Claudeに渡す指示内容（なければ`@claude`メンションを待機） | オプション |
| `claude_args` | 追加CLI引数（`--max-turns`、`--model`、`--allowedTools`など） | オプション |
| `plugins` / `plugin_marketplaces` | 実行前にインストールするプラグイン | オプション |
| `trigger_phrase` | トリガーフレーズ（デフォルト：`@claude`） | オプション |

> 実行を開始した人はリポジトリの**書き込み権限**を持っている必要があり、ボットアカウントは`allowed_bots`に記載しない限り無視されます（無限ループ防止）。

---

## GitLab CI/CD連携（概要）

GitLabを使用している場合は、`.gitlab-ci.yml`にClaude Codeタスクを追加できます。詳しい手順は[公式GitLab CI/CDドキュメント](https://code.claude.com/docs/en/gitlab-ci-cd)を参照してください。

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
    - claude -p "${AI_FLOW_INPUT:-'変更をレビューして改善点を提案して'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write"
```

GitLab CI/CD変数に`ANTHROPIC_API_KEY`を登録することを忘れないでください。

</details>

---

## ⚠️ コストに関する注意事項

自動化は**トークン消費が非常に大きくなります**。

- CI/CDパイプラインは人の監視なしに実行されるため、コストが予想以上に早く膨らむ可能性があります。
- `--max-turns`オプションで最大繰り返し回数を、`--max-budget-usd`で1回の実行のドル上限を制限してください。
- ワークフローにタイムアウトを設定し、同時実行（concurrency）を制限してください。
- 不要なトリガーを減らしてください。

```yaml
claude_args: "--max-turns 5 --model claude-sonnet-5-5"
```

**API費用に加えて、GitHub Actionsの実行時間コストも発生します**（GitHub Actionsの無料枠を超過した場合）。

---

## セキュリティに関する注意事項

- **APIキーをコードに直接記述しないでください。**必ずGitHub Secretsを使用してください。

```yaml
# 正しい方法
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}

# 絶対にやってはいけないこと
anthropic_api_key: "sk-ant-api03-..."
```

- Claudeの提案をマージする前に必ずレビューしてください。
- Actionの権限は必要なものだけ許可してください。

---

## 入門者の方へ

> **この機能は今すぐ必要ではありません。**

HeadlessモードとGitHub Actions連携は、Claude Codeをある程度使いこなしてから導入するのがおすすめです。基本的な使い方、CLAUDE.mdの設定、そしてMCP連携をまず身につけてから自動化を検討してください。

今は「こういうこともできるんだ」と知っておくだけで十分です。

---

## まとめ

```
Headlessモード: claude -p "タスク内容" --output-format json
スクリプト/CI:   --bare で環境の影響を排除、--permission-prompts none で無人実行
GitHub Actions: anthropics/claude-code-action@v1（APIキーまたはサブスクリプショントークン）
トリガー: @claudeメンションまたは自動プロンプト
コスト制御: --max-turns、--max-budget-usd、タイムアウト、モデル選択
セキュリティ: キー・トークンは必ずSecretsを使用
```

> ターミナルの中で簡単に繰り返すだけでよければ、`/loop 30m 新しいIssueがないか確認して要約して`のように**`/loop`** で同じプロンプトを定期的に実行でき、コンピュータを閉じていても動かす必要があるなら`/schedule`でクラウドルーチンを作成できます。
