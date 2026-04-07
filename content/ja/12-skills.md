# 16. Skills & プラグイン作成

> よく行う作業をレシピとして保存 — `/コマンド`一つで呼び出して、チームとも共有できます

---

## Skillsとは？

**Skills**はClaude Codeに新しい能力を追加する再利用可能なワークフローです。`SKILL.md`ファイルを作成すると、Claudeがそれをツールとして認識し、`/スキル名`コマンドで直接実行したり、状況に応じて自動的に起動します。

簡単に言うと、よく使う作業手順をドキュメント化しておけば、次からは一言で実行されます。

> **参考**: 既存の`.claude/commands/`フォルダのカスタムスラッシュコマンドはSkillsに統合されました。既存ファイルはそのまま動作します。

---

## Skills vs 通常の会話の違い

| | 通常の会話 | Skills |
|---|---|---|
| **実行方法** | 毎回説明をタイピング | `/skill-name`一回 |
| **一貫性** | 毎回異なる可能性あり | 常に同じ手順 |
| **チーム共有** | 不可 | Gitコミットで共有 |
| **引数の受け渡し** | 説明の中に含める | `$ARGUMENTS`で明確に |
| **ツール制限** | Claudeの判断 | 明示的に許可されたツールのみ |

---

## Skillsで不要になる手作業

| 繰り返し作業 | Skills設定後 |
|----------|--------------|
| 会議のたびに録音ファイルの整理を依頼 | `/meeting ファイル名`一回で完了 |
| 週次レポートのフォーマットを毎回説明 | `/weekly-report`を実行 |
| 翻訳依頼のたびに言語・形式を指定 | `/translate ko en README.md` |
| 競合分析の依頼のたびにフォーマットを説明 | `/competitor-analysis 企業名` |
| SNS投稿の依頼のたびにブランドトーンを説明 | `/sns-post テーマ` |
| メール作成のたびに会社情報を入力 | `/email-draft 目的` |

---

## 自分のSkillsを作る方法

### Step 1: ディレクトリの作成

```bash
# すべてのプロジェクトで使用する場合（個人用）
mkdir -p ~/.claude/skills/commit

# 現在のプロジェクトでのみ使用する場合
mkdir -p .claude/skills/commit
```

### Step 2: SKILL.mdの作成

`.claude/skills/commit/SKILL.md`:

```yaml
---
name: commit
description: 変更内容を分析して良いコミットメッセージを作成し、コミットします。コミット時に使用。
disable-model-invocation: true
---

現在のstaged変更内容を分析して、Conventional Commits形式でコミットしてください：

1. `git diff --staged`を実行して変更内容を確認
2. 変更タイプを特定（feat/fix/docs/refactor/test/chore）
3. 50文字以内のタイトルを作成
4. 必要に応じて本文に詳細説明を追加
5. `git commit -m "..."`を実行
```

### Step 3: 実行

```
# 直接実行
/commit

# または自然言語で → Claudeが自動検出
"変更内容をコミットして"
```

---

## Skillsファイルの構造

```
my-skill/
├── SKILL.md           # メインの指示内容（必須）
├── template.md        # Claudeが埋めるテンプレート（任意）
├── examples/
│   └── sample.md      # 出力例（任意）
└── scripts/
    └── validate.sh    # Claudeが実行するスクリプト（任意）
```

> **ヒント**: `SKILL.md`は500行以内に抑え、詳細な内容は別ファイルに分離してください。

---

## 主要なFrontmatterオプション

```yaml
---
name: my-skill           # スキル名（ディレクトリ名がデフォルト）
description: 説明        # Claudeがいつこのスキルを使うか判断する基準（必須）
disable-model-invocation: true  # trueならユーザーのみ実行可能（Claude自動実行不可）
user-invocable: false    # falseならメニューに非表示（Claudeのみ自動実行可能）
allowed-tools: Read, Grep, Glob  # このスキル実行中に許可するツールのみ指定
context: fork            # 独立したサブエージェントコンテキストで実行
model: sonnet            # このスキルで使用するモデルを指定
---
```

| Frontmatter | ユーザー実行 | Claude自動実行 | 使用場面 |
|-------------|-----------|----------------|--------|
| （デフォルト） | 可能 | 可能 | 一般的なワークフロー |
| `disable-model-invocation: true` | 可能 | 不可 | デプロイ、送信など副作用のある作業 |
| `user-invocable: false` | 不可 | 可能 | 背景知識、コンベンション |

---

## 実用例 4つ

### 例1: 議事録の自動整理

`.claude/skills/meeting/SKILL.md`:

```yaml
---
name: meeting
description: 会議の録音ファイルを受け取り、テキストに変換して議事録とアクションアイテムを整理します。会議後の整理に使用。
argument-hint: [録音ファイルパス]
disable-model-invocation: true
---

$ARGUMENTS ファイルを処理して議事録を作成してください：

1. 音声変換ツール（whisperなど）がなければインストール
2. $ARGUMENTS ファイルをテキストに変換
3. 以下の形式で議事録を作成：
   - 日付 / 参加者
   - 主な議論内容（3〜5行の要約）
   - 決定事項
   - 担当者別アクションアイテム（名前: タスク、期限）
4. 元のファイル名と同じ名前で.mdファイルとして保存
```

実行：
```
/meeting ~/Downloads/meeting-250225.mp3
```

Pythonや変換ツールを知らなくても大丈夫です。Claude Codeが必要なものを自動で準備します。

---

### 例2: SNSコンテンツの自動化

`.claude/skills/sns-post/SKILL.md`:

```yaml
---
name: sns-post
description: 指定された内容をSNS投稿に変換します。ブログ、Instagram、LinkedInへの投稿が必要な時に使用。
argument-hint: [テーマまたは原稿内容]
---

$ARGUMENTSをSNS投稿に変換してください：

1. Instagram版（ハッシュタグ10個、絵文字入り、親しみやすい口調、300文字以内）
2. LinkedIn版（プロフェッショナルな口調、インサイト重視、500文字以内）
3. Twitter/X版（140文字以内、要点のみ簡潔に）

各バージョンを区切り線で分けて出力してください。
```

実行：
```
/sns-post 私たちのチームが新製品のリリースに成功しました。6ヶ月の開発を経て...
```

---

<details>
<summary>🖥️ 開発者向け例: コードレビューの自動化</summary>

`.claude/skills/review/SKILL.md`:

```yaml
---
name: review
description: コードをレビューします。コード品質、セキュリティ、パフォーマンスの観点での検討が必要な時に使用。
---

以下の順序でコードをレビューしてください：

1. `git diff HEAD~1`または`$ARGUMENTS`で指定されたファイルを分析
2. 以下の項目をチェック：
   - コードの可読性と命名規則
   - エラー処理の漏れ
   - セキュリティ脆弱性（SQL injection、XSS、ハードコードされたシークレット）
   - 重複コード
   - テストカバレッジ
3. 優先度別に整理：
   - 🔴 Critical（必ず修正）
   - 🟡 Warning（修正推奨）
   - 🔵 Suggestion（検討事項）
```

実行：
```
/review src/auth/login.ts
```

</details>

<details>
<summary>🖥️ 開発者向け例: GitHubイシューの処理</summary>

`.claude/skills/fix-issue/SKILL.md`:

```yaml
---
name: fix-issue
description: GitHubイシューを実装します。イシュー番号を渡すと分析→実装→テスト→コミットまで進行。
disable-model-invocation: true
allowed-tools: Bash(gh *), Read, Edit, Write
---

GitHubイシュー $ARGUMENTS を処理してください：

1. `gh issue view $ARGUMENTS`でイシュー内容を確認
2. 要件を把握して実装計画を策定
3. 関連ファイルを探してコードを実装
4. テストの作成と実行
5. `gh issue close $ARGUMENTS`後にコミットを作成
```

実行：
```
/fix-issue 123
```

</details>

### 例3: 翻訳の自動化

`.claude/skills/translate/SKILL.md`:

```yaml
---
name: translate
description: ファイルやテキストを翻訳します。
argument-hint: [ファイルパスまたはテキスト] [対象言語]
---

$ARGUMENTS[0]を$ARGUMENTS[1]に翻訳してください。

- 技術用語は原文のまま維持（コード、コマンド、固有名詞）
- マークダウン構造を保持
- 翻訳結果は元のファイル名に言語コードを追加して保存
```

実行：
```
/translate README.md ko
```

---

## 動的コンテキスト注入（上級）

`!` + バッククォート構文で、スキル実行前にシェルコマンドを実行し、結果をコンテキストに注入できます：

```yaml
---
name: pr-summary
description: PRサマリーを作成します。
context: fork
allowed-tools: Bash(gh *)
---

## PRコンテキスト
- 変更内容: !`gh pr diff`
- PRコメント: !`gh pr view --comments`
- 変更ファイル: !`gh pr diff --name-only`

上記の内容に基づいて明確なPRサマリーを作成してください。
```

Claudeがこのスキルを実行すると：
1. バッククォート内のコマンドが先に実行される
2. 実際のデータがプロンプトに挿入される
3. Claudeが実際のPR内容を見てサマリーを作成

---

## Skillsの保存場所

| 場所 | パス | 適用範囲 |
|------|------|----------|
| エンタープライズ | マネージド設定 | 組織全体 |
| 個人 | `~/.claude/skills/<名前>/SKILL.md` | すべてのプロジェクト |
| プロジェクト | `.claude/skills/<名前>/SKILL.md` | このプロジェクトのみ |
| プラグイン | `<プラグイン>/skills/<名前>/SKILL.md` | プラグイン有効化時 |

同じ名前のスキルが複数の場所にある場合、**エンタープライズ > 個人 > プロジェクト**の順に優先されます。

---

## スキル作成が難しい場合：スキラーズの雑談

直接SKILL.mdを書くのが難しいと感じたら、**スキラーズの雑談（skillers-suda）**プラグインが代わりに作成してくれます。

```
/skillers-suda 翻訳スキルを作って
```

4人の専門家（企画者/ユーザー/専門家/検収者）が内部で議論した後：

1. **インタビュー** — 3〜5個の質問で核心情報を収集
2. **ワークフロー設計** — 6種類のステップタイプ（プロンプト/スクリプト/API・MCP/RAG/レビュー/生成）を組み合わせ
3. **ファイル生成** — `SKILL.md` + `scripts/` + `references/`の全体構造を自動生成
4. **テスト + 改善** — 作成したスキルをすぐにテストし、対話で継続的に改善

コードを知らなくても「翻訳スキルを作って」「議事録整理スキルを作って」のように言えば、プロレベルのスキルが生成されます。

スキラーズの雑談のインストール：プラグインインストールセクションのgptaku_pluginsを参照

---

## プラグインとしてパッケージ化する

チーム全体に配布したり、コミュニティと共有するにはプラグインとしてパッケージ化します。

### プラグインの構造

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # プラグインメタデータ
├── skills/
│   ├── review/
│   │   └── SKILL.md
│   └── commit/
│       └── SKILL.md
└── hooks/
    └── hooks.json         # プラグイン専用Hooks
```

### plugin.json

```json
{
  "name": "my-plugin",
  "description": "チーム共通ワークフロー集",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### ローカルテスト

```bash
# プラグインディレクトリで実行
claude --plugin-dir ./my-plugin

# スキル実行（プラグインネームスペース付き）
/my-plugin:review
/my-plugin:commit
```

### Standalone vs プラグインの選択基準

| 状況 | 推奨方式 |
|------|----------|
| 個人ワークフロー、素早い実験 | Standalone（`.claude/skills/`） |
| チームと共有、複数プロジェクト | プラグイン |
| コミュニティ配布 | プラグイン + マーケットプレイス |

---

## Skillsの自動検出の仕組み

Claudeは`description`フィールドを見て、どのような状況でスキルを使うべきか判断します：

```yaml
# 良いdescriptionの例
description: コードをレビューします。PRレビュー、コード品質検査、セキュリティ分析が必要な時に使用。

# 不十分なdescriptionの例
description: review tool
```

- 「どのような状況で使うのか」を明確に記述するほど、Claudeがより正確に検出します
- `disable-model-invocation: true`を設定すると、Claudeが自動的に実行しなくなります

---

## トラブルシューティング

| 問題 | 解決策 |
|------|--------|
| スキルがトリガーされない | descriptionにユーザーが実際に使う表現を含める |
| スキルが頻繁に実行されすぎる | descriptionをより具体的に修正 |
| Claudeがスキルを認識しない | `/context`でコンテキスト上限超過を確認 |
| 自動実行を止めたい | `disable-model-invocation: true`を追加 |

---

## 一行まとめ

> Skills = よく行う作業を`/コマンド`一つにまとめるもの。チームに配布するにはプラグインとしてパッケージ化すればよい。

Skillsを作ったら、Sub-agentsでそのSkillsを複数のClaudeが同時に実行できるようになります。
