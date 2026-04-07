# 21. 次のステップ & リソース

> CC101を完了したあなたへ。ここからが本当のスタートです。

---

## ここまでお疲れ様でした

Claude Codeの基礎から高度な自動化まで、全過程を走破しました。簡単な道のりではなかったと思いますが、これでAIベースの自動化ツールを実際の業務に活用できる基盤が整いました。

少し振り返ると、以下のことを学びました：

- Claude Codeとは何か、どのように動作するか
- インストールと認証の設定
- CLAUDE.mdによるプロジェクトのカスタマイズ
- 基本コマンドとワークフロー
- MCPによる外部ツールの接続
- HooksとSkillsによる自動化
- プラグインエコシステムの探索
- コスト管理と最適化
- Headlessモードと CI/CD連携

この知識は単にツール1つを学んだということではありません。AIと協業する新しいワークスタイルを身につけたのです。

---

## 次の学習パス

### 入門完了（今ここ）

```
✅ Claude Codeのインストール & 認証
✅ CLAUDE.mdの作成
✅ 基本コマンド（/help, /cost, /compact, /model）
✅ ファイルの読み込み、内容の修正、ドキュメント生成
✅ プラグインの基本的な使用
```

---

### 中級：実践応用

CC101で学んだ基礎を組み合わせて、実際の業務に適用してみましょう。

**自分だけのワークフロー自動化**
- CLAUDE.md + Hooks + Skillsを組み合わせて繰り返し作業をワンコマンドに短縮
- 例：毎週のレポート自動生成、コードレビュー自動化、議事録整理パイプライン

**プラグインの活用を最大化**
- **show-me-the-prd**で企画 → チーム構成プラグインでリサーチチーム編成 → Claude Codeで実装 -- アイデアからプロトタイプまで1日で
- **deep-research**で市場調査後、**docs-guide**で技術検証 -- 意思決定にAIを活用
- メンタリングプラグインのフィードバックを反映してプロンプト品質を段階的に改善

**マルチセッション & 並列作業**
- 複数のターミナルでClaude Codeを同時実行してタスクを分担
- タスク分担プラグインで並列開発を体験

---

### 上級：CC101の先の世界

このガイドでは扱わなかった発展的なトピックです。

**Agent SDKで自分だけのAIアプリを作る**
- Anthropicの[Agent SDK](https://docs.anthropic.com/en/docs/agents)を使えば、Claudeをエンジンとした独立したAIアプリケーションを開発できます
- Python/TypeScriptでカスタムエージェントを構築 -- Claude Codeなしでも動作する自動化システム

**Model Context Protocol (MCP) サーバーを自分で作る**
- CC101ではMCPサーバーを「使う」方法を学びましたが、MCPサーバーを自分で「作る」こともできます
- 社内API、社内DB、社内Wikiを MCPサーバーでラップすれば、Claude Codeから直接アクセス可能に
- [MCP公式仕様](https://modelcontextprotocol.io)

**Claude Codeプラグイン開発**
- 自分だけのプラグインを作ってコミュニティに共有
- Skills、Hooks、Agents、MCPサーバーを1つのパッケージにまとめる構成

**チーム単位での導入 & ガバナンス**
- チーム全体がClaude Codeを使用する際の権限管理、コスト配分、セキュリティポリシー
- Enterpriseプランの管理者機能（Admin Controls、Audit Logs）
- 社内コーディング標準をCLAUDE.mdで強制する方法

**プロダクション自動化パイプライン**
- GitHub Actions + Headless Claude CodeでPR自動レビュー、自動テスト生成
- 夜間バッチ処理：毎日深夜にデータ処理、レポート生成、コード品質検査
- モニタリング + アラート連携（Slack、Discord）

---

## 公式リソース

### 公式ドキュメント

| リソース | URL |
|--------|-----|
| **公式ドキュメント（英語）** | [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code) |
| **GitHubリポジトリ** | [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **公式プラグイン** | [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) |
| **Anthropicコンソール** | [platform.claude.com](https://platform.claude.com) |

---

### CC101 & gptaku_pluginsコミュニティ

| リソース | URL | 説明 |
|--------|-----|------|
| **CC101 GitHub** | [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101) | このガイドのリポジトリ。誤字・内容追加の貢献を歓迎します |
| **gptaku_plugins** | [github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins) | バイブコーダー向け8つのプラグインコレクション：企画(show-me-the-prd)、Git管理、メンタリング、リサーチ(deep-research)、並列開発、チーム構成、スキル生成、公式ドキュメント(docs-guide) |

このガイドが役に立ったら**Star**を押してください！更新と改善の大きな励みになります。

---

## Claude Codeをうまく使う方法 & 避けるべきパターン

ツールを学んだら、次はいつ、どう使うかが重要です。

### 相性の良い作業（どんどん活用しましょう）

| 作業 | 理由 |
|------|------|
| 繰り返しのボイラープレートコード生成 | パターンが明確でミスの可能性が低い |
| テストコードの作成 | 関数シグネチャベースで正確に生成 |
| コードリファクタリング（範囲が明確な場合） | 特定のファイル/関数を指定すれば安全 |
| エラーメッセージの分析と修正 | エラーログ + コードコンテキストの組み合わせに優れている |
| ドキュメント化 / コメント追加 | 既存コードベースなのでハルシネーションが少ない |
| 正規表現、SQLクエリ、設定ファイル | 構文が明確な作業に強い |
| 慣れていない言語/フレームワークの探索 | 素早いオンボーディングに非常に効果的 |
| レガシーコードの理解とコメント追加 | コンテキスト把握 + 説明要求に優れている |

### 注意が必要な作業（レビューを徹底してください）

| 作業 | 注意すべき理由 |
|------|----------|
| 認証/セキュリティ関連コード | 微妙な脆弱性が生まれる可能性がある |
| 決済/金融ロジック | 正確性が絶対的に重要 |
| 大規模リファクタリング（複数ファイル同時） | 意図しない副作用のリスク |
| DBスキーマ変更 / マイグレーション | データ損失の可能性 |
| プロダクションデプロイスクリプト | ミス時の影響範囲が大きい |
| 外部API連携とシークレット処理 | キー漏洩、誤ったエンドポイントのリスク |

### 常に守る5つの原則

1. 作業前にgit commit → いつでもロールバック可能な状態を維持
2. 範囲を明確に → 「このファイルのこの関数だけ」のように具体的に
3. 生成されたコードは自分で読む → 理解できないコードは使わない
4. セキュリティ/決済コードは必ず別途レビュー
5. 大きな作業はPlan Modeで計画を先に確認（Shift+Tab）

---

## 初めての実践プロジェクト提案

CC101を終えたら、すぐに実践に飛び込んでみましょう。コーディングの有無に関わらず、すぐ始められるプロジェクトです。

### 1. 議事録自動整理ワークフロー

毎週繰り返される会議の整理作業をClaude Codeに任せてみましょう。

```
"~/Downloads/meeting-250225.mp3 ファイルがあるよ。
 会議内容を変換して、要約 + 担当者別アクションアイテムを整理して
 meeting-250225.md に保存して"
```

録音ファイルのテキスト変換ツールのインストールから整理まで、すべて自動で行います。

---

### 2. 自分の業務用Skillsを作る

毎週繰り返す作業を`/コマンド`1つに短縮してみましょう。

```
"毎週月曜日に先週の作業内容を整理するSkillsを作って。
 GitHubのコミット履歴とメモファイルをベースに週次レポート草案を生成する方式で"
```

---

### 3. 競合分析レポート

興味のある分野の競合を分析してみましょう。

```
"競合A、B、Cのウェブサイトを分析して
 主要機能、価格、ターゲット顧客、差別化ポイントの比較表を作って。
 competitor-analysis.md に保存して"
```

---

### 4. ポートフォリオサイトの作成 🖥️ 開発者向け

```
"HTML/CSS/JSでポートフォリオサイトを作って。
セクション：自己紹介、技術スタック、プロジェクト、お問い合わせ。
ミニマルでダークテーマにして。"
```

---

### 5. 既存コードのリファクタリング 🖥️ 開発者向け

```
"このファイルのコードをレビューして改善して。
可読性、パフォーマンス、エラー処理に集中して。
@src/utils/dataProcessor.js"
```

---

## 困ったときはどうすればいい？

### ステップ1：公式ドキュメントを確認

ほとんどの答えは公式ドキュメントにあります。

```
https://docs.anthropic.com/en/docs/claude-code
```

Claude Codeの中でもヘルプを得ることができます：

```
/help
```

---

### ステップ2：Claude Codeに直接聞く

Claude Code自体が最も強力なヘルプです。

```
"Claude CodeでMCPサーバーを追加する方法を教えて"
"このエラーメッセージの意味を説明して: [エラー内容]"
```

---

### ステップ3：コミュニティ

- **GitHub Issues**：[github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **CC101**：[github.com/fivetaku/cc101](https://github.com/fivetaku/cc101)

---

### ステップ4：Anthropicサポート

アカウントや請求に関する問題は[Anthropicコンソール](https://platform.claude.com)からサポートをリクエストしてください。

---

## 最後に

Claude Codeは急速に進化しているツールです。今日学んだことが数か月後には変わっているかもしれません。重要なのは基本原理を理解することです。

**AIと共に働く**ということは、単にタスクを速く処理することではありません。AIの強み（幅広い知識、繰り返し作業、パターン認識）と人間の強み（判断力、創造性、ドメイン知識）を組み合わせる新しいコラボレーション方式です。

CC101を終えた皆さんは、その第一歩を踏み出しました。これからの旅路が楽しみです。

---

## クイックリファレンスカード

```
公式ドキュメント:   https://docs.anthropic.com/en/docs/claude-code
GitHub:            https://github.com/anthropics/claude-code
プラグイン:        https://github.com/anthropics/claude-plugins-official
gptaku_plugins:    https://github.com/fivetaku/gptaku_plugins
CC101:             https://github.com/fivetaku/cc101
コンソール:        https://platform.claude.com

次の目標:
  バイブコーダー → gptaku_pluginsをインストール、show-me-the-prdで企画
  中級 → MCP設定（Notion/Slack/GitHub）、Hooksカスタマイズ、プラグイン探索
  上級 → 自分だけのSkills制作、Agent Teams
  (開発者) → CI/CD完全自動化、並列開発
```
