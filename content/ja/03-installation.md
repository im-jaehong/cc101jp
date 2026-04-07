# 05. インストール & 認証

> ターミナルでコマンド1つでインストール、ブラウザでログインすれば完了です。

---

> 💡 **ターミナルが初めての方へ** 以下のコマンドをそのまま**コピー＆ペースト（Cmd+VまたはCtrl+V）**してEnterを押すだけです。コマンドの意味を理解する必要はありません。
> - **macOS**: `Cmd+Space` → 「terminal」と検索 → Enter
> - **Windows**: `Win+R` → 「powershell」と入力 → Enter

---

## インストール前の確認事項

### 対応OS

| OS | 対応バージョン |
|---|---|
| **macOS** | 13.0以降 |
| **Linux** | Ubuntu 20.04+、Debian 10+、Alpine Linux 3.19+ |
| **Windows** | Windows 10（1809+）またはWindows Server 2019+ |

### ハードウェア要件

- RAM: 4GB以上
- インターネット接続が必要

### Node.jsは必要？

**いいえ。** Claude Codeはネイティブインストール方式を採用しています。Node.jsを別途インストールする必要はありません。

> ⚠️ **npmによるインストールは非推奨です。** 以前は `npm install -g @anthropic-ai/claude-code` でインストールしていましたが、現在は以下の方法が公式に推奨されています。npm方式は使わないでください。

---

## インストール方法

### macOS / Linux / WSL（Windows Subsystem for Linux）

ターミナルを開き、以下のコマンドを貼り付けてください：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Homebrewを使っている場合：

```bash
brew install --cask claude-code
```

### Windows

**方法1 — PowerShellを使用（推奨）：**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**方法2 — WinGetを使用：**

```powershell
winget install Anthropic.ClaudeCode
```

**方法3 — CMDを使用：**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> Windowsでローカルセッションを使用するには、[Git for Windows](https://git-scm.com/downloads/win)のインストールが必要です。

### Alpine Linux 追加パッケージ

```bash
apk add libgcc libstdc++ ripgrep
```

---

## インストール後の認証（ログイン）

インストールが完了したら、ターミナルで以下のコマンドを実行してください：

```bash
claude
```

初回起動時に**ブラウザが自動的に開き、OAuthログイン画面**が表示されます。Claude.aiアカウント（ProまたはMaxサブスクリプション）でログインすると、自動的に認証が完了します。

### 認証フローの概要

```
ターミナルでclaude を実行
       ↓
ブラウザが自動で開く（OAuthページ）
       ↓
Claude.aiアカウントでログイン
       ↓
ターミナルに自動で戻る → 認証完了
```

### 資格情報のセキュリティ

- macOS: APIキーとOAuthトークンは**macOS Keychain（暗号化ストレージ）**に安全に保存されます。
- 再ログインが必要な場合: `claude` を実行後、`/login` と入力

---

## 初回起動の確認

インストールと認証が完了しているか確認するには：

```bash
claude --version
```

バージョン番号が表示されれば、正常にインストールされています。インストール状態の診断には：

```bash
claude doctor
```

このコマンドで、インストールタイプ、バージョン、環境の状態を一度に確認できます。

---

## 自動アップデート

Claude Codeは**自動的に最新バージョンへアップデート**されます。起動時にアップデートを確認し、バックグラウンドでダウンロードします。次回起動時に新しいバージョンが適用されます。

手動でアップデートする場合：

```bash
claude update
```

---

## よくあるインストールの問題と解決法

### 問題1: `curl: command not found`（curlが見つからないエラー）

**原因**: curlがインストールされていない場合（まれですが、一部のLinux環境で発生）。

**解決法**:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# Alpine
apk add curl
```

その後、インストールコマンドを再度実行します。

---

### 問題2: `claude: command not found`（インストール後にコマンドが見つからない場合）

**原因**: インストールパスがシェルのPATHに登録されていない場合。

**解決法**:
```bash
# 現在のシェルセッションにPATHを即時反映
source ~/.bashrc
# zshの場合
source ~/.zshrc
```

それでも解決しない場合は、ターミナルを完全に閉じて再度開いてください。

---

### 問題3: WindowsでGitが見つからないエラー

**原因**: ローカルセッションの実行にGitが必要です。

**解決法**: [git-scm.com](https://git-scm.com/downloads/win)からGit for Windowsをインストール後、再試行してください。

---

## 次のステップ

インストールと認証が完了したら、作業フォルダに移動してすぐに始めましょう：

```bash
# 作業フォルダに移動して実行
claude
```

> **どんなフォルダでも構いません。** コードプロジェクトに限らず、ドキュメントフォルダ、リサーチフォルダ、業務資料フォルダなど、どこからでもClaude Codeを起動できます。

Claude Codeがフォルダを解析し、何をお手伝いするか待機します。
