# 05. インストール & 認証

> ターミナルでコマンド1つでインストール、ブラウザでログインすれば完了です。

---

> 💡 **ターミナルが初めての方へ** 以下のコマンドをそのまま**コピー＆ペースト（Cmd+VまたはCtrl+V）**してEnterを押すだけです。コマンドの意味を理解する必要はありません。
> - **macOS**: `Cmd+Space` → 「terminal」と検索 → Enter
> - **Windows**: `Win+R` → 「powershell」と入力 → Enter
>
> ターミナル自体に抵抗がある場合は、**Claudeデスクトップアプリ**（macOS / Windows / Ubuntu・Debianはベータ）をインストールして**Code**タブを押すだけで使えます。アプリの中にClaude Codeが組み込まれているのでCLIを別途インストールする必要がなく、変更内容を画面上ですぐ確認できます。

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
- CPU: x64またはARM64
- シェル: Bash、Zsh、PowerShell、CMDのいずれか
- インターネット接続が必要

### Node.jsは必要？

**いいえ。** Claude Codeはネイティブインストール方式を採用しています。Node.jsを別途インストールする必要はありません。

> 💡 **npmによるインストールも引き続きサポートされています。** `npm install -g @anthropic-ai/claude-code` は以下のネイティブインストールと**同じバイナリ**をインストールします（Node.js 22以降が必要）。ただし公式推奨は以下のネイティブ方式なので、特別な理由がなければそちらを使ってください。

---

## インストール方法

### macOS / Linux / WSL（Windows Subsystem for Linux）

ターミナルを開き、以下のコマンドを貼り付けてください：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Homebrewを使っている場合：

```bash
brew install --cask claude-code          # 安定（stable）チャンネル: 約1週間遅れるが、大きなリグレッションのある版はスキップ
brew install --cask claude-code@latest   # 最新（latest）チャンネル: 新バージョンが出たらすぐ
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

> Windowsでの[Git for Windows](https://git-scm.com/downloads/win)は**任意ですが推奨**です。インストールするとClaude CodeがGit BashでBashツールを使い、ない場合はPowerShellツールで代替動作します。

### Alpine Linux 追加パッケージ

```bash
apk add bash curl libgcc libstdc++ ripgrep
```

---

## インストール後の認証（ログイン）

インストールが完了したら、ターミナルで以下のコマンドを実行してください：

```bash
claude
```

初回起動時に**ブラウザが自動的に開き、OAuthログイン画面**が表示されます。Claude.aiアカウントでログインすると自動的に認証が完了し、ターミナルに `Login successful` と表示されます。

> ⚠️ **無料（Free）プランではClaude Codeを利用できません。** Pro、Max、Team、EnterpriseまたはConsole（API）アカウントが必要です。
>
> ブラウザが自動的に開かない場合は、ターミナルで `c` を押してログインURLをコピーし、ブラウザに直接貼り付けてください。WSL2、SSH、コンテナのように、ブラウザからターミナルへ戻れない環境ではブラウザに**ログインコード**が表示されるので、そのコードをターミナルの `Paste code here if prompted` の欄に貼り付けてください。

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
- Linux / Windows: `~/.claude/.credentials.json`（Windowsは `%USERPROFILE%\.claude\.credentials.json`）に、自分のアカウントだけが読める権限で保存されます。
- 再ログインが必要な場合: `claude` を実行後、`/login` と入力。アカウントを切り替えるには `/logout` の後に再ログイン
- ログインの期限切れ3日前から、起動時に `run /login to renew` という警告が表示されます。事前に `/login` を実行して更新してください。

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

> Homebrew、WinGet、Linuxのパッケージマネージャーでインストールした場合は自動アップデートされません。`brew upgrade claude-code`、`winget upgrade Anthropic.ClaudeCode` などを自分で実行してください。（Homebrew・WinGetは、設定に `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` を入れておくと、Claude Codeが代わりにアップグレードコマンドを実行してくれます。）

手動でアップデートする場合：

```bash
claude update
```

### アップデートチャンネルを選ぶ

新機能をすぐ受け取れる**latest**（デフォルト）と、約1週間遅れるものの大きなリグレッションのあるバージョンはスキップする**stable**から選べます。`/config` → **Auto-update channel**で変更するか、`~/.claude/settings.json`に書きます：

```json
{
  "autoUpdatesChannel": "stable"
}
```

> リリース直後のモデルは、stableチャンネルより新しいバージョンを要求することがあります。新しいモデルをすぐ試したい場合はlatestのままにしてください。

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

### 問題3: WindowsでBashツールがない、またはGit Bashが見つからないという案内が出る

**原因**: Git for Windowsがないと、Claude CodeはBashの代わりに**PowerShellツール**でコマンドを実行します。動作自体に問題はありませんが、一部のシェルスクリプトの例やプラグインはBashを前提にしています。

**解決法**: [git-scm.com](https://git-scm.com/downloads/win)からGit for Windowsをインストール後、再起動してください。インストールしても見つからない場合は、`~/.claude/settings.json`にパスを指定します：

```json
{
  "env": { "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe" }
}
```

---

### 問題4: `claude --version` が古いバージョンを表示する

**原因**: npm、Homebrew、ネイティブインストールが混在していて、別のインストール版が先に参照されている場合。

**解決法**: `claude doctor` でインストールタイプを確認し、使っていないインストール版は削除してください（`npm uninstall -g @anthropic-ai/claude-code`、`brew uninstall --cask claude-code` など）。

---

## 次のステップ

インストールと認証が完了したら、作業フォルダに移動してすぐに始めましょう：

```bash
# 作業フォルダに移動して実行
claude
```

> **どんなフォルダでも構いません。** コードプロジェクトに限らず、ドキュメントフォルダ、リサーチフォルダ、業務資料フォルダなど、どこからでもClaude Codeを起動できます。

Claude Codeがフォルダを解析し、何をお手伝いするか待機します。
