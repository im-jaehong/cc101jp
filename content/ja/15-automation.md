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

以前は「headless mode」と呼ばれていましたが、公式には**Agent SDK CLI**とも呼ばれています。`-p`フラグとすべてのCLIオプションは同様に動作します。

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

> リポジトリの管理者権限が必要です。

### 手動設定方法

1. **Claude GitHubアプリのインストール**：[github.com/apps/claude](https://github.com/apps/claude)からリポジトリにアプリをインストールします。

2. **APIキーの登録**：リポジトリのSettings → Secretsに`ANTHROPIC_API_KEY`を追加します。

3. **ワークフローファイルの追加**：`.github/workflows/`フォルダにYAMLファイルを作成します。

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
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # @claudeメンションに自動で応答
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
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "/review"
          claude_args: "--max-turns 5"
```

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
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "昨日のコミットとオープンIssueを要約して"
          claude_args: "--model sonnet"
```

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
| `anthropic_api_key` | Anthropic APIキー | 必須 |
| `prompt` | Claudeに渡す指示内容 | オプション |
| `claude_args` | 追加CLI引数（`--max-turns`、`--model`など） | オプション |
| `trigger_phrase` | トリガーフレーズ（デフォルト：`@claude`） | オプション |

---

## GitLab CI/CD連携（概要）

GitLabを使用している場合は、`.gitlab-ci.yml`にClaude Codeタスクを追加できます。

> GitLab連携は現在ベータ段階です。

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
- `--max-turns`オプションで最大繰り返し回数を制限してください。
- ワークフローにタイムアウトを設定してください。
- 不要なトリガーを減らしてください。

```yaml
claude_args: "--max-turns 5 --model sonnet"
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
GitHub Actions: anthropics/claude-code-action@v1
トリガー: @claudeメンションまたは自動プロンプト
コスト制御: --max-turns、タイムアウト、モデル選択
セキュリティ: APIキーは必ずSecretsを使用
```
