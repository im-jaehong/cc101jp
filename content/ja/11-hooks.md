# 15. Hooks — 作業を守る安全装置

> AIが`rm -rf`を実行したり、`git push --force`で履歴を消してしまったら？ Hooksを設定すれば**そのようなことは絶対に起きません。**

---

## なぜHooksが必要なのか？

Claude Codeは強力です。ファイルを作成し、修正し、削除し、Gitコマンドを実行します。しかしバイブコーディング中に、実際にこのようなことが起こります：

- `rm -rf`の一撃でプロジェクトフォルダが消える
- `git reset --hard`でコミットしていない作業がすべて消える
- `git push --force`でチームメンバーのコードが上書きされる
- `DROP TABLE`でデータベースが消える

**Hooksはこのような危険なコマンドをClaudeが実行する前に自動的にブロックします。** LLMの「判断」に頼るのではなく、コードで100%確実に防ぎます。

---

## Hooksとは？

**Hooks**は、Claude Codeの特定のイベントが発生した時に自動的に実行されるシェルコマンドです。

| イベント | 発生タイミング | 主な用途 |
|--------|----------|----------|
| `PreToolUse` | ツール実行の**直前** | 危険なコマンドのブロック |
| `PostToolUse` | ツール実行の直後 | 自動フォーマット、ログ記録 |
| `Stop` | Claudeが応答完了時 | 完了通知 |
| `Notification` | Claudeが通知を送る時 | デスクトップ通知 |
| `SessionStart` | セッション開始/再開時 | コンテキスト注入 |
| `UserPromptSubmit` | プロンプト送信時 | 入力の前処理 |
| `PreCompact` | コンテキスト圧縮前 | 重要情報の保持 |

> 重要: `exit 0` = 許可、`exit 2` = **ブロック**（stderrメッセージがClaudeに伝達されます）

---

## 設定場所

| 場所 | 範囲 | 共有可能 |
|------|------|----------|
| `~/.claude/settings.json` | すべてのプロジェクト | いいえ |
| `.claude/settings.json` | 現在のプロジェクト | はい（Gitコミット） |
| `.claude/settings.local.json` | 現在のプロジェクト | いいえ |

> `/hooks`コマンドでインタラクティブに設定することもできますが、以下の例をコピー＆ペーストする方が早いです。

---

## 必須Hook 1: Safety Hook — 危険なコマンドの自動ブロック

**このHook一つを設定するだけで、ほとんどの事故を防ぐことができます。**

### Step 1: スクリプトファイルの作成

`~/.claude/hooks/block_dangerous.py`ファイルを作成してください：

```python
#!/usr/bin/env python3
"""危険なコマンドを自動ブロックするSafety Hook"""
import json, re, sys

BLOCKED_PATTERNS = [
    # ファイル削除ブロック — rmの代わりにtrashを使用（ゴミ箱に移動、復元可能）
    (r"\brm\s+", "rmの代わりにtrashを使用してください (brew install trash)"),
    (r"\bunlink\s+", "unlinkの代わりにtrashを使用してください"),

    # Git履歴破壊ブロック
    (r"git\s+reset\s+--hard", "git reset --hardはコミットしていない作業を削除します"),
    (r"git\s+push\s+.*--force", "git push --forceはリモート履歴を上書きします"),
    (r"git\s+push\s+.*-f\b", "git push -fはリモート履歴を上書きします"),
    (r"git\s+clean\s+-.*f", "git clean -fは追跡されていないファイルを永久削除します"),
    (r"git\s+checkout\s+\.\s*$", "git checkout .はすべての変更を削除します"),
    (r"git\s+stash\s+drop", "git stash dropはスタッシュを永久削除します"),
    (r"git\s+branch\s+-D", "git branch -Dはブランチを強制削除します"),

    # データベース破壊ブロック
    (r"DROP\s+(DATABASE|TABLE)", "DROPはデータを永久削除します"),
    (r"TRUNCATE\s+TABLE", "TRUNCATEはすべてのデータを削除します"),
]

data = json.load(sys.stdin)
if data.get("tool_name") != "Bash":
    sys.exit(0)

command = data.get("tool_input", {}).get("command", "")
for pattern, reason in BLOCKED_PATTERNS:
    if re.search(pattern, command, re.IGNORECASE):
        print(f"ブロック: {reason}", file=sys.stderr)
        sys.exit(2)

sys.exit(0)
```

### Step 2: 実行権限の付与

ターミナルで実行してください：

```bash
chmod +x ~/.claude/hooks/block_dangerous.py
```

### Step 3: Hookの登録

`~/.claude/settings.json`に追加してください：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ]
  }
}
```

### 動作の仕組み

Claudeが`rm -rf node_modules`を実行しようとすると：

1. `PreToolUse`イベント発生 → `block_dangerous.py`が実行
2. コマンドが`rm`パターンにマッチ
3. `exit 2`で**ブロック** + 「rmの代わりにtrashを使用してください」というメッセージを伝達
4. Claudeがメッセージを受け取り、`trash node_modules`で代替実行

> **trash**はファイルをゴミ箱に送るので、間違えても復元できます。`brew install trash`（macOS）または`npm install -g trash-cli`でインストールしてください。

### ブロックパターンを追加したい場合

`BLOCKED_PATTERNS`リストに追加したいパターンを加えるだけです：

```python
# 例: chmod 777のブロック
(r"chmod\s+777", "chmod 777はセキュリティ上危険です"),

# 例: 本番サーバーSSHのブロック
(r"ssh\s+.*prod", "本番サーバーへのアクセスがブロックされました"),
```

---

## 必須Hook 2: 完了通知

Claudeが作業を終えるとサウンドで通知します。バイブコーディング中に他のウィンドウを見ていても見逃しません。

### macOS — システムサウンド

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> `Stop`と`Notification`に**異なるサウンド**を使うと、「完了」vs「確認が必要」をサウンドだけで区別できます。

利用可能なmacOSシステムサウンドの確認：

```bash
ls /System/Library/Sounds/
```

### macOS — デスクトップ通知ポップアップ

サウンドの代わりに（または併用して）画面に通知ポップアップを表示することもできます：

```json
{
  "type": "command",
  "command": "osascript -e 'display notification \"作業が完了しました\" with title \"Claude Code\"'"
}
```

### Linux

```json
{
  "type": "command",
  "command": "notify-send 'Claude Code' '作業が完了しました'"
}
```

---

## 2つのHookを統合して設定する

Safety Hook + 完了通知を1つの`settings.json`にまとめるとこのようになります：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> すでに`settings.json`に他の設定がある場合は、`hooks`キーのみ追加またはマージしてください。`/hooks`コマンドで確認できます。

---

<details>
<summary>もっと詳しく: 追加Hookの活用例</summary>

### 機密フォルダの保護

`customers/`、`invoices/`などのフォルダをClaudeが変更できないようにブロック：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=\"$(jq -r '.tool_input.file_path // empty')\"; if [[ \"$FILE\" == customers/* || \"$FILE\" == invoices/* ]]; then echo \"ブロック: 機密フォルダです\" >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

### セッション開始時に業務コンテキストを自動注入

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/業務ルール.txt"
          }
        ]
      }
    ]
  }
}
```

### プロンプトベースのHook（上級）

判断が必要な状況では`type: "prompt"`のHookを使用します：

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "すべてのタスクが完了したか確認してください。未完了の項目がある場合は作業を続けてください。"
          }
        ]
      }
    ]
  }
}
```

</details>

---

## トラブルシューティング

| 問題 | 解決策 |
|------|--------|
| Hookが実行されない | `/hooks`でイベントを確認、matcherの大文字小文字を確認 |
| スクリプトが実行されない | `chmod +x`で実行権限を付与 |
| JSONパースエラー | `~/.zshrc`のecho文をインタラクティブシェル条件付きで囲む |
| すべてのファイル変更がブロックされる | `PreToolUse` Hookの`exit 2`条件を確認 |

デバッグ: `claude --debug`または`Ctrl+O`でHook実行ログを確認

---

## 一行まとめ

> **Safety Hook + 完了通知** — この2つを設定するだけでバイブコーディングがはるかに安全で快適になります。`rm`の一撃でプロジェクトが消える事故を未然に防ぎましょう。

次のセクションでは、繰り返し作業をSkillsで自動化する方法を学びます。
