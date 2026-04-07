# 14. MCP & 外部ツール連携

> Notion、Slack、Google Sheets、GitHub、DBなどの外部ツールをClaudeが直接操作できるようにする標準プロトコル

---

## MCPとは？

**MCP（Model Context Protocol）** は、Claudeが外部ツールやデータソースに接続できるようにするオープン標準です。

簡単に言えば、Claude Codeは基本的にファイルとターミナルしか扱えません。MCPを接続すると、ClaudeがNotionのドキュメントを直接読んだり、Slackメッセージを要約したり、Google Sheetsを更新するなど、外部ツールとやり取りできるようになります。

開発者であれば、GitHub PRレビュー、データベースへの直接クエリ、Sentryエラー分析なども可能です。

> **たとえ**: MCPはClaudeにUSBポートを取り付けるようなものです。どんなツールでも接続すれば使えるようになります。

---

## MCPでなくなる手間

MCPがなければ、こうした作業をすべて手動で行う必要があります：

**業務・リサーチユーザー**

| 従来の手間 | MCP接続後 |
|------------|------------|
| Notionの議事録ページをコピーしてClaudeに貼り付け | 「今日の会議内容をNotionページにまとめて」の一言で完了 |
| Google Sheetsにデータを一つずつ手入力 | 「このデータをSheetsに自動で整理して」 |
| Webサイトを訪問して情報をコピー＆ペースト | 「この5つのWebサイトを分析して比較表を作って」 |
| Slackスレッドの内容をコピーして要約依頼 | 「#マーケティングチャンネルの今日の議論を要約してお知らせ草案を書いて」 |

<details>
<summary>🖥️ 開発者向け：手間の解消例</summary>

| 従来の手間 | MCP接続後 |
|------------|------------|
| JIRAチケットの内容をコピーしてClaudeに貼り付け | 「ENG-4521の実装をお願い」の一言で完了 |
| Sentryのエラースタックトレースを手動でコピー | 「過去24時間の主要エラーを分析して」 |
| DBスキーマをClaudeに説明してクエリ依頼 | 「usersテーブルから90日間未ログインのユーザーを探して」 |
| PRの内容をコピーしてレビュー依頼 | 「PR #456をレビューして」の一言で完了 |

</details>

---

## MCPでできること

### GitHub — PR/Issueの直接操作

```bash
# GitHub MCPサーバーの接続
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 接続後、このようなリクエストが可能になります
> "PR #456をレビューして改善点を提案して"
> "さっき見つけたバグのIssueを新規作成して"
> "自分にアサインされているオープンPRの一覧を見せて"
```

### Sentry — プロダクションエラー分析

```bash
# Sentryの接続
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# /mcp コマンドで認証完了後
> "過去24時間の主要エラーは何？"
> "エラーID abc123のスタックトレースを見せて"
> "これらのエラーはどのデプロイで発生した？"
```

### PostgreSQL — DBへの直接クエリ

```bash
# DB接続（読み込み専用推奨）
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"

# 接続後
> "今月の総売上はいくら？"
> "ordersテーブルのスキーマを見せて"
> "90日間購入していない顧客を探して"
```

### Slack — メッセージの読み書き

Slack連携により、SlackチャンネルのコンテキストをそのままClaudeに渡すことができます。チームの会話でバグレポートが上がったら、Claudeが該当スレッドの内容を読み込み、すぐにコーディング作業を開始できます。

### Notion、Asana、Figmaなど

MCPレジストリ（[api.anthropic.com/mcp-registry/docs](https://api.anthropic.com/mcp-registry/docs)）で数百種類のMCPサーバーを見つけることができます。

---

## MCPサーバーのインストール方法

### 方法1: リモートHTTPサーバー（推奨）

```bash
# 基本構文
claude mcp add --transport http <名前> <URL>

# 例: Notionの接続
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 認証ヘッダーが必要な場合
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### 方法2: ローカルstdioサーバー

自分のコンピュータで実行されるサーバーです。システムへの直接アクセスやカスタムスクリプトに適しています。

```bash
# 基本構文
claude mcp add [オプション] <名前> -- <コマンド> [引数...]

# 例: Airtableの接続
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server
```

### MCPサーバー管理コマンド

```bash
# 設定済みサーバー一覧の確認
claude mcp list

# 特定サーバーの詳細確認
claude mcp get github

# サーバーの削除
claude mcp remove github

# Claude Code内でステータス確認
/mcp
```

---

## 設定ファイルの場所（スコープ）

MCPサーバーの設定は、使用範囲に応じて3箇所に保存されます：

| スコープ | 保存場所 | 用途 |
|--------|----------|------|
| **ローカル**（デフォルト） | `~/.claude.json` | 現在のプロジェクトのみ、個人設定 |
| **プロジェクト** | `.mcp.json`（プロジェクトルート） | チーム全体で共有、バージョン管理に含める |
| **ユーザー** | `~/.claude.json` | すべてのプロジェクトで使用 |

```bash
# チーム共有用のプロジェクトスコープで追加
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp

# すべてのプロジェクトで使うユーザースコープで追加
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

チームプロジェクトでは、`.mcp.json`をGitにコミットすることで、チームメンバー全員が同じMCPサーバーを使用できます。

---

## 入門者におすすめのMCP 3選

実用性を基準に、最初に試してみるべきMCPサーバーです：

### 1. Notion MCP

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**なくなる手間**: 議事録やリサーチ結果の手動コピー、ページ内容の貼り付け、データベースの逐一更新

**活用例**:
- 「Notionの『議事録』DBから過去7日間の項目を取得して、決定事項・アクションアイテムだけをまとめてweekly.mdを作って」
- 「このリサーチ結果をNotionの『競合分析』ページに追加して」

### 2. Slack MCP

claude.aiアカウント接続後、[claude.ai/settings/connectors](https://claude.ai/settings/connectors)からすぐに設定可能

**なくなる手間**: チャンネルスレッドの手動閲覧、要約依頼のためのコピペ、お知らせ草案の手動作成

**活用例**:
- 「#マーケティングチャンネルの今日のスレッドを読んで、論点3つと合意された次のアクションを整理してSlackお知らせ草案を作って」

### 3. Google Chrome（Webリサーチ）

claude.aiアカウント接続後、[claude.ai/settings/connectors](https://claude.ai/settings/connectors)からすぐに設定可能

**なくなる手間**: Webサイトを訪問しての手動情報収集、複数サイト比較のための繰り返しタブ切り替え

**活用例**:
- 「指定した5社の競合サイトを巡回して、今日の主な変更・新機能・価格変更だけを表にまとめて」

---

<details>
<summary>🖥️ 開発者向けおすすめMCP 3選（GitHub / PostgreSQL / Sentry）</summary>

### GitHub MCP

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

**なくなる手間**: PR内容のコピペ、Issueの手動確認、コードレビューのコンテキスト伝達

### PostgreSQL / DB MCP

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@localhost:5432/mydb"
```

**なくなる手間**: スキーマの説明、データ照会結果のコピペ、SQL作成後の手動実行

### Sentry MCP

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

**なくなる手間**: エラースタックトレースのコピペ、エラー発生時点の手動確認

</details>

---

## Claude Code公式コネクター

Claude.aiアカウントでClaude Codeにログインしている場合、[claude.ai/settings/connectors](https://claude.ai/settings/connectors)で設定したMCPサーバーがClaude Codeに自動的に接続されます。

公式にサポートされているコネクター：
- **Slack**: チャンネルメッセージの読み書き
- **Google Chrome**: ブラウザ自動化（Playwrightベース）

---

## OAuth認証が必要なサーバーの接続方法

Sentry、GitHubなどのクラウドサーバーはOAuth認証が必要です：

```bash
# ステップ1: サーバーの追加
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# ステップ2: Claude Code内で認証
> /mcp

# ブラウザが開く → ログイン → 完了
```

認証トークンは自動的に保存・更新されます。

---

## MCPプロンプトをコマンドとして使う

MCPサーバーがプロンプトを提供している場合、Claude Codeで`/mcp__サーバー名__プロンプト名`の形式で直接実行できます：

```
> /mcp__github__list_prs
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "ログインバグ" high
```

---

## ⚠️ 注意事項

**信頼できないMCPサーバーを安易にインストールしないでください。**

- MCPサーバーはClaudeを通じてファイルシステム、DB、外部サービスにアクセスできます
- 特に**外部コンテンツを取得するMCPサーバー**はプロンプトインジェクションのリスクがあります
- Anthropicが直接検証したサーバーのみが公式MCPレジストリに登録されています
- 出所が不明なサーバーはインストール前にソースコードを必ず確認してください

```bash
# プロジェクトスコープのサーバーはチームメンバーに確認リクエストが表示されます
# （セキュリティレビューのための安全装置）
```

---

## GPTakuプラグインとMCP

皆さんがすでにインストールしたGPTakuプラグインも、内部的にMCPを活用しています：

| プラグイン | 使用するMCP | 役割 |
|---------|-------------|------|
| **docs-guide** | Context7 MCP | 公式ドキュメントをリアルタイムで参照し正確な回答を提供 |
| **品あい** | Codex MCP（オプション） | ClaudeがPM役、Codexがあれば並列開発 / なければClaudeだけで動作 |
| **deep-research** | Web検索MCP | マルチエージェントが複数ソースを同時に調査 |

> 💡 プラグインをインストールすると、MCP設定が自動的に追加されます。別途MCPを設定する必要はなく、プラグインが自動で処理します。

---

## 一言まとめ

> MCP = Claudeに外部世界を接続するプラグイン。GitHub、DB、SlackをClaudeが直接操作できるようにして「コピー＆ペースト」の手間をなくす。

MCPが「外部世界との接続」だとすれば、次のHooksは「Claude Code自体の動作を自動化」するものです。
