# 06. おすすめプラグインのインストール

> Claude Codeの機能を拡張するプラグインをインストールして活用します。

---

## プラグインとは？

Claude Codeは基本機能だけでも十分強力ですが、**プラグイン（Plugin）**をインストールすると、さらに多くのことができるようになります。

プラグインとは、簡単に言えば**Claude Codeに追加機能パックをインストールすること**です。スマートフォンにアプリをインストールするように、Claude Codeに必要な機能をプラグインで追加できます。

1つのプラグインには以下の要素が含まれている場合があります：

| 構成要素 | 説明 |
|----------|------|
| **Skills（スキル）** | `/プラグイン名:コマンド` 形式のカスタムコマンド |
| **Agents（エージェント）** | 特定の役割を実行するAIエージェント |
| **Hooks（フック）** | ファイル保存やコマンド実行時に自動で動作するイベントハンドラ |
| **MCPサーバー** | GitHub、Figmaなど外部サービスとの連携 |

---

## 公式プラグインマーケットプレイス

Anthropicが運営する公式マーケットプレイス（`claude-plugins-official`）は、Claude Codeを起動すると**自動的に利用可能な状態**になっています。

Claude Code内で `/plugin` と入力すると、**Discoverタブ**からすぐに公式プラグインを閲覧できます。

### 公式マーケットからプラグインをインストール

```shell
/plugin install プラグイン名@claude-plugins-official
```

### 公式マーケットで提供されている主なプラグインカテゴリ

| カテゴリ | 代表的なプラグイン | 説明 |
|---------|------------|------|
| **外部サービス連携** | `notion`, `slack`, `github` | Notion、Slack、GitHubなどの外部サービスをClaudeと直接接続 |
| **出力スタイル** | `explanatory-output-style` | Claudeの応答方式をカスタマイズ（要約形式、チェックリストなど） |
| **開発ワークフロー** | `commit-commands`, `pr-review-toolkit` | Gitコミット、PRレビューの自動化 |

<details>
<summary>🖥️ 開発者向けコードインテリジェンスプラグイン</summary>

| カテゴリ | 代表的なプラグイン | 説明 |
|---------|------------|------|
| **コードインテリジェンス** | `typescript-lsp`, `pyright-lsp` | 型エラーのリアルタイム検出、コードナビゲーション |

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

</details>

---

## gptaku_plugins — 入門者向けプラグイン集

> GitHub: [https://github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

**gptaku_plugins**は、Claude Codeの入門者、非開発者、バイブコーダー向けに特別に作られたプラグイン集です。難しくて馴染みのない開発概念を、Claudeがより親切にガイドしてくれるよう設計されています。

### 含まれているプラグイン

> 2026年8月時点で**合計15個**のプラグインが登録されています。

#### 入門者にまずおすすめ

| プラグイン名 | 役割 | 使用例 |
|------------|------|---------|
| **docs-guide** | ライブラリの公式ドキュメント（llms.txt）に基づいた正確な回答を提供。ハルシネーションなしで最新ドキュメントを参照 | `/docs-guide:explain React hooks` |
| **git-teacher** | 非開発者向けのGit/GitHubオンボーディング。クラウドフォルダの比喩で5段階に案内 | `/git-teacher:what-is-commit` |
| **vibe-sunsang** | Claude Codeの対話を分析して成長コーチングを提供。4種のワークスペースタイプに対応 | `/vibe-sunsang 開始` |
| **show-me-the-prd** | ドラフト優先のPRD生成器。4種のデザインドキュメント（PRD、データモデル、Phase分離、プロジェクトスペック）をすぐ作成し、前提をまとめて確認 | `/show-me-the-prd 写真整理アプリを作りたい` |
| **insane-research** | マルチエージェントによるディープリサーチ。7段階パイプラインでソースをクロス検証し、構造化レポートを生成 | `/insane-research [テーマ]` |
| **kkirikkiri** | 自然言語の一言でAIチーム、または決定論的なエージェントパイプラインを構成 | `/kkirikkiri リサーチチームを作って` |
| **pumasi** | 並列コーディングのオーケストレーション + Codex画像生成（`/pumasi:image`） | `/pumasi [タスクの説明]` |
| **skillers-suda** | 4つのペルソナエージェントが分析・議論し、動作するスキルを自動評価付きで構築 | `/skillers-suda 翻訳スキルを作って` |

> ⚠️ **`deep-research-kit`は提供終了しました。** 後継の**`insane-research`**を使用してください。

#### その他のプラグイン

| プラグイン | 説明 |
|---------|------|
| **goaljaby** | PRDを`/goal`ワークフローの実行契約書に変換。レビュー文書の自動生成と承認ゲート管理 |
| **insane-search** | APIキーなしでブロックされたサイトへ適応的にアクセスする戦略を提供 |
| **insane-design** | デザインシステムの抽出・適用・構築。任意のURLを分析して自分のプロジェクトに適用 |
| **insane-review** | repomix + ブラウザ自動化でClaude Code内からChatGPT Pro級のコード分析を活用 |
| **nopal** | Google Workspaceを自然言語で操作（Opal不要） |
| **dd** | クリップボードのテキスト・画像を貼り付けずに投入（`/dd`、`/ㅇㅇ`） |
| **gaseo** | 現在のClaude CodeセッションをPaseoアプリに登録し、アプリ側で継続 |

---

## インストール方法

### ステップ1：マーケットプレイスの登録（初回のみ）

Claude Code内で以下のコマンドを入力してください：

```shell
/plugin marketplace add https://github.com/fivetaku/gptaku_plugins.git
```

### ステップ2：プラグインのインストール

マーケットプレイスを登録したら、希望のプラグインをインストールします：

```shell
/plugin install
```

リストから希望のプラグインを選択するか、名前を直接指定することもできます：

```shell
/plugin install show-me-the-prd@gptaku-plugins
```

> **注意**：プラグインは一度に1つずつインストールされます。複数インストールする場合は繰り返してください。

### ステップ3：インストールの確認

```shell
/plugin list
```

または `/plugin` と入力後、**Installedタブ**に移動すると、インストール済みのプラグイン一覧を確認できます。

### ステップ4：アップデート

新しいバージョンがリリースされたら、以下のコマンドでアップデートできます：

```shell
/plugin update
```

> **重要**：プラグインのインストールまたはアップデート後は、Claude Codeを再起動してください。

### ステップ5：プラグインを使ってみよう

インストールが完了したら、すぐに使用できます：

```shell
# 企画書の自動生成
/show-me-the-prd タスク管理アプリを作りたい

# AIエージェントチームの自動構成
/kkirikkiri リサーチチームを作って

# スキルの自動生成
/skillers-suda 翻訳スキルを作って

# Gitオンボーディング
/git-teacher:what-is-commit

# 公式ドキュメントベースの回答
/docs-guide:explain React hooks

# AI活用パターン分析
/vibe-sunsang 開始
```

---

## プラグイン管理

| コマンド | 説明 |
|--------|------|
| `/plugin` | プラグインマネージャーを開く（Discover/Installed/Marketplaces/Errorsタブ） |
| `/plugin list` | インストール済みプラグインの一覧確認 |
| `/plugin disable プラグイン名` | プラグインを一時的に無効化 |
| `/plugin enable プラグイン名` | 無効化したプラグインを再度有効化 |
| `/plugin uninstall プラグイン名` | プラグインを完全に削除 |

---

## コミュニティプラグインをもっと見る

公式マーケットプレイス以外にも、コミュニティが作成したプラグインをGitHubから直接インストールできます。機能が多様な分、インストール前にコードを確認し、信頼できるリポジトリかどうか事前に確認してください。

### oh-my-claudecode

Claude Codeコミュニティで最も使われているサードパーティプラグインです。単なる拡張ではなく、Claude Code自体を**オーケストレーター**に変貌させてくれます。

主な機能：
- **Autopilot**：「作って」と言うだけで、計画→実装→検証まで自動実行
- **33の専門エージェント**：コードレビュー、セキュリティ分析、テスト、ドキュメント化など役割別AIエージェント
- **外部AI連携**：Codex（OpenAI）、Gemini（Google）と協業して多角的に分析
- **Skillsシステム**：よく使うワークフローを再利用可能なコマンドとして保存

インストール：GitHubリポジトリ（[github.com/wshf/oh-my-claudecode](https://github.com/wshf/oh-my-claudecode)）のREADMEを参照

<details>
<summary>🖥️ 開発者向けコミュニティプラグイン（LSP / chrome-devtools）</summary>

### LSPプラグイン（コードインテリジェンス）

Language Server Protocolを統合し、型エラーの検出、定義へのジャンプ、参照の検索をClaude Code内で直接使用できます。

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

### chrome-devtools MCP

ChromeブラウザのDevToolsをClaude Codeから直接制御します。コンソールログの読み込み、DOMの検査、ネットワークリクエストの分析をAIと一緒に処理でき、フロントエンドのデバッグフローが大きく変わります。

</details>

### supermemory

Claudeの長期記憶を強化するMCPサーバーです。新しい会話を開始しても、以前の作業コンテキスト、プロジェクトの決定事項、よく使うパターンを自動的に読み込みます。同じプロジェクトで長く作業するほど効果が大きくなります。

> **インストール前の確認事項**：コミュニティプラグインはAnthropicの検証を受けていません。GitHubリポジトリのコードとREADMEを事前に確認し、メンテナンスが活発か、Issue対応がされているか確認してください。

---

## ⭐ CC101が役に立ったらStarをお願いします！

このガイドが役に立ったら、GitHubでStarを押してください。

Starひとつが、このガイドを発展させ続ける大きな力になります。

**[→ CC101 GitHubでStarを押す](https://github.com/im-jaehong/cc101jp)**

> 難しくありません。リンクをクリックして、右上の ⭐ Starボタンを押すだけです！

---

## 次のステップ

プラグインのインストールまで完了したら、準備は万端です。次はClaude Codeがどのように動作するのか、仕組みを見ていきましょう。
