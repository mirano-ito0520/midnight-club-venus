# 📂 Midnight Club Venus — Claude Code ファイル整理指示書

## 概要

ユーザーが `C:\tmp\Midnight Club Venus` フォルダに素材ファイルをバラバラに配置する。
Claude Code はこのフォルダ内のファイルを自動的に判別し、プロジェクトの正しいディレクトリ構造に整理すること。

---

## プロジェクトルート

```
C:\tmp\Midnight Club Venus\
```

---

## 目標ディレクトリ構造

```
C:\tmp\Midnight Club Venus\
├── index.html
├── css/
│   ├── main.css
│   ├── lobby.css
│   ├── nameEntry.css
│   ├── dialogue.css
│   ├── jigsaw.css
│   └── gallery.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── nameEntry.js
│   ├── dialogue.js
│   ├── lobby.js
│   ├── jigsaw.js
│   └── gallery.js
├── data/
│   ├── characters.json
│   └── dialogues.json
├── assets/
│   ├── images/
│   │   ├── characters/
│   │   │   ├── venus/
│   │   │   │   ├── portrait.png
│   │   │   │   └── fullbody.png
│   │   │   ├── marina/
│   │   │   │   ├── portrait.png
│   │   │   │   ├── easy.jpg
│   │   │   │   ├── normal.jpg
│   │   │   │   ├── hard.jpg
│   │   │   │   ├── expert.jpg
│   │   │   │   └── master.jpg
│   │   │   ├── luna/
│   │   │   │   ├── portrait.png
│   │   │   │   ├── easy.jpg
│   │   │   │   ├── normal.jpg
│   │   │   │   ├── hard.jpg
│   │   │   │   ├── expert.jpg
│   │   │   │   └── master.jpg
│   │   │   └── coral/
│   │   │       ├── portrait.png
│   │   │       ├── easy.jpg
│   │   │       ├── normal.jpg
│   │   │       ├── hard.jpg
│   │   │       ├── expert.jpg
│   │   │       └── master.jpg
│   │   ├── backgrounds/
│   │   │   ├── lobby.jpg
│   │   │   ├── name-entry.jpg
│   │   │   ├── jigsaw-select.jpg
│   │   │   ├── gallery.jpg
│   │   │   ├── dialogue-beach.jpg
│   │   │   ├── dialogue-nightpool.jpg
│   │   │   └── dialogue-tropical.jpg
│   │   └── ui/
│   │       ├── cabinet-jigsaw.png
│   │       ├── cabinet-comingsoon.png
│   │       ├── lock-silhouette.png
│   │       └── title-logo.png
│   └── audio/
│       ├── bgm/
│       │   ├── velvet-midnight.mp3
│       │   ├── tidal-glow.mp3
│       │   ├── closer-to-you.mp3
│       │   ├── burning-silk.mp3
│       │   └── golden-reveal.mp3
│       └── se/
│           ├── piece-snap.mp3
│           ├── puzzle-clear.mp3
│           ├── stage-unlock.mp3
│           ├── text-blip.mp3
│           ├── button-click.mp3
│           ├── door-open.mp3
│           └── gallery-add.mp3
└── README.md
```

---

## ファイル振り分けルール

Claude Code が素材を整理する際の判別ルール。
ユーザーはファイル名にキーワードを含めて保存する想定。

### キャラクター画像の振り分け

ファイル名に含まれるキーワードで判別する：

| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `venus` + `portrait` または `bust` | `assets/images/characters/venus/portrait.png` |
| `venus` + `full` または `lobby` | `assets/images/characters/venus/fullbody.png` |
| `marina` + `portrait` または `bust` | `assets/images/characters/marina/portrait.png` |
| `marina` + `easy` または `1` または `lv1` | `assets/images/characters/marina/easy.jpg` |
| `marina` + `normal` または `2` または `lv2` | `assets/images/characters/marina/normal.jpg` |
| `marina` + `hard` または `3` または `lv3` | `assets/images/characters/marina/hard.jpg` |
| `marina` + `expert` または `4` または `lv4` | `assets/images/characters/marina/expert.jpg` |
| `marina` + `master` または `5` または `lv5` | `assets/images/characters/marina/master.jpg` |
| `luna` + （同上のパターン） | `assets/images/characters/luna/` 配下 |
| `coral` + （同上のパターン） | `assets/images/characters/coral/` 配下 |

### 背景画像の振り分け

| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `lobby` または `ロビー` | `assets/images/backgrounds/lobby.jpg` |
| `name` または `entry` または `corridor` | `assets/images/backgrounds/name-entry.jpg` |
| `jigsaw` または `select` または `beach-bg` | `assets/images/backgrounds/jigsaw-select.jpg` |
| `gallery` または `ギャラリー` | `assets/images/backgrounds/gallery.jpg` |
| `dialogue` + `beach` または `marina-bg` | `assets/images/backgrounds/dialogue-beach.jpg` |
| `dialogue` + `night` または `luna-bg` | `assets/images/backgrounds/dialogue-nightpool.jpg` |
| `dialogue` + `tropical` または `coral-bg` | `assets/images/backgrounds/dialogue-tropical.jpg` |

### UI素材の振り分け

| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `cabinet` + `jigsaw` または `puzzle-icon` | `assets/images/ui/cabinet-jigsaw.png` |
| `cabinet` + `coming` または `soon` | `assets/images/ui/cabinet-comingsoon.png` |
| `lock` または `silhouette` | `assets/images/ui/lock-silhouette.png` |
| `logo` または `title` | `assets/images/ui/title-logo.png` |

### 音声ファイルの振り分け

| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `velvet` または `lobby-bgm` | `assets/audio/bgm/velvet-midnight.mp3` |
| `tidal` または `puzzle-bgm` | `assets/audio/bgm/tidal-glow.mp3` |
| `closer` または `dialogue-bgm` | `assets/audio/bgm/closer-to-you.mp3` |
| `burning` または `sensual-bgm` | `assets/audio/bgm/burning-silk.mp3` |
| `golden` または `clear-bgm` または `gallery-bgm` | `assets/audio/bgm/golden-reveal.mp3` |
| `snap` または `piece` または `カチッ` | `assets/audio/se/piece-snap.mp3` |
| `clear` または `fanfare` または `クリア` | `assets/audio/se/puzzle-clear.mp3` |
| `unlock` または `アンロック` | `assets/audio/se/stage-unlock.mp3` |
| `blip` または `text` または `ポポポ` | `assets/audio/se/text-blip.mp3` |
| `click` または `button` または `ボタン` | `assets/audio/se/button-click.mp3` |
| `door` または `ドア` | `assets/audio/se/door-open.mp3` |
| `gallery` + `add` または `キラーン` | `assets/audio/se/gallery-add.mp3` |

---

## Claude Code への実行指示

### ファイル整理タスク

以下の手順で実行すること：

1. `C:\tmp\Midnight Club Venus` フォルダ内の全ファイルをスキャン
2. 上記の振り分けルールに基づいて、各ファイルの配置先を判定
3. 判定結果を一覧表示し、**ユーザーに確認を取ってから実行**する
4. 必要なサブディレクトリを作成
5. ファイルをコピー（元ファイルは削除しない。移動ではなくコピー）
6. 判別できなかったファイルは `_unsorted/` フォルダにまとめる
7. 完了後、配置結果のレポートを表示

### 注意事項

- 元ファイルは絶対に削除しない（コピーのみ）
- 同名ファイルが既に存在する場合は上書き確認を取る
- 画像ファイルの拡張子は .jpg / .jpeg / .png / .webp を許容する
- 音声ファイルの拡張子は .mp3 / .wav / .ogg / .m4a を許容する
- 判別できないファイルは `_unsorted/` に移動し、ユーザーに手動振り分けを依頼する
- ファイル名の判別は大文字小文字を区別しない（case-insensitive）
- 日本語ファイル名にも対応すること

---

## 画像の最適化（任意）

ファイル整理後、以下の最適化を実施することを推奨：

| 用途 | 推奨サイズ | 形式 |
|------|-----------|------|
| キャラクターイラスト（パズル用） | 長辺 1920px | JPEG（品質85%） |
| 立ち絵（会話用） | 長辺 1200px | PNG（透過対応） |
| 背景画像 | 1920×1080px | JPEG（品質80%） |
| UIアイコン | 512×512px | PNG（透過対応） |
| タイトルロゴ | 1920×1080px | PNG（透過対応） |

※ 最適化は整理完了後に別タスクとして実行。ユーザーの確認を取ってから実行すること。

---

## 📝 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-03-26 | v1.0 | 初版作成 |
