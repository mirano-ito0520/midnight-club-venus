# 🎮 Midnight Club Venus — ゲーム設計書 v1.2

## 📋 プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | **Midnight Club Venus** |
| 概要 | セクシーな女性キャラクターをテーマにした、複数のミニゲームを楽しめるブラウザベースのゲームプラットフォーム |
| 技術基盤 | HTML / CSS / JavaScript（ブラウザで動作するWebアプリ） |
| 対応デバイス | PC＋スマートフォン（レスポンシブ対応） |
| 素材（画像） | Freepik AI画像生成（日本アニメ風） |
| 素材（音楽） | Suno AI V5（BGM）＋ freesound.org（効果音） |
| 制作ツール | Claude Code |
| プロジェクトパス | `C:\tmp\Midnight Club Venus` |

### プロジェクトパスについて
- ユーザーは素材ファイルを `C:\tmp\Midnight Club Venus` にバラバラに配置する
- Claude Code は最初にフォルダ内のファイルをスキャンし、正しいディレクトリ構造に整理すること
- 詳細な振り分けルールは別紙「ファイル整理指示書」を参照
- 元ファイルは削除せずコピーで整理すること

---

## 🏗️ アーキテクチャ：ゲームセンター型ハブ構造

ゲーム全体は「セクシーなゲームセンター」をコンセプトとしたハブ構造。
トップ画面（ロビー）から各ゲーム（筐体）を選んで遊ぶ。

### 初回起動：名前登録画面

初めてゲームを起動した場合、ロビーの前に名前登録画面を表示する。
案内役のVENUS（ヴィーナス）がプレイヤーを迎え入れる。

#### 演出・流れ

1. 画面：暗い廊下の奥にネオンの光が漏れている背景
2. VENUS（バストアップ立ち絵）が登場
3. テキスト表示（タイプライター風）：
   VENUS「ようこそ、Midnight Club Venus へ——」
   VENUS「私はヴィーナス。このクラブの案内役よ」
   VENUS「あら…いい目をしてるわね。お名前を聞いてもいいかしら？」
4. 名前入力フィールドが表示される（プレースホルダー：「あなたの名前」）
5. 入力後、VENUS が反応：
   VENUS「{playerName}さん…ふふ、素敵な名前ね。覚えたわ♡」
   VENUS「ここには楽しいゲームと…素敵な女の子たちが待ってるの」
   VENUS「さぁ、中へどうぞ？あなたの夜は、まだ始まったばかりよ——」
6. ドアが開くアニメーション → ロビー画面へ遷移

#### 技術仕様
- 入力した名前はローカルストレージに保存
- 会話シーン内で `{playerName}` として参照される
- 設定画面から名前変更も可能にする

### ロビー画面

- ゲームセンターのロビーをイメージしたトップ画面
- **VENUS（ヴィーナス）がロビーに常駐**。フルボディ立ち絵で表示
- 各ゲームは「筐体」として表示される
- 実装済みのゲームは選択可能、未実装は「Coming Soon」としてシルエット表示
- ギャラリー（コレクション閲覧）への導線
- 設定ボタン（名前変更・データリセット等）
- 雰囲気：夜のクラブ風、ネオンカラー、大人っぽくおしゃれ

#### VENUSのロビー台詞
- 通常時：「おかえりなさい、{playerName}さん。今夜はどのゲームで遊ぶ？」
- 新ゲーム追加時：「新しいゲームが入荷したら教えてあげるわね♡」
- 全クリア時：「あら…全部クリアしちゃったの？{playerName}さん、やるわね」「でも安心して。このクラブには、まだまだ秘密があるから——」

### ギャラリー

- これまでにアンロックしたイラストを一覧表示
- ゲーム別・キャラ別にフィルタリング可能
- お気に入り登録機能
- コンプリート率の表示

---

## 🗺️ 開発ロードマップ

| Phase | 内容 | 新規ゲーム |
|-------|------|-----------|
| **Phase 1** | ロビー＋最初のゲーム＋ギャラリー | Splash Jigsaw（ジグソーパズル） |
| **Phase 2** | ゲーム追加＋コレクション機能強化 | スクラッチ、神経衰弱 |
| **Phase 3** | さらにゲーム追加 | スライドパズル、マッチ3、マージ系 |
| **Phase 4** | アクション系ゲーム追加 | ブロック崩し、テトリス系、ぷよぷよ系 |
| **Phase 5** | 対戦・戦略系ゲーム追加 | 陣取り、オセロ |
| **Phase 6** | カードバトル＋ストーリーモード | カードゲーム、ビジュアルノベル |
| **Phase 7** | RPG・アクション要素 | 探索・バトル・育成 |
| **将来** | 公開・収益化 | ― |

---

## 🧩 Phase 1 詳細仕様：Splash Jigsaw

### 基本情報

| 項目 | 内容 |
|------|------|
| ゲーム名 | **Splash Jigsaw** |
| ジャンル | ジグソーパズル |
| テーマ | ビーチ・水着 |
| キャラ | 女性キャラクター（ビーチ系）3人 |

---

### キャラクター設定

#### ゲームマスター：VENUS（ヴィーナス）
- 役割：ロビーの案内人。名前登録シーン・ロビーに常駐
- イメージ：妖艶で包容力のあるバニーガール。クラブのママ的存在
- 髪：シルバーホワイトのロングヘア、緩くウェーブ、前髪は片目にかかる
- 瞳：金色（ゴールド）、猫目
- 体型：グラマラス、大人の色気
- 衣装：黒のバニースーツ（ハイレグ）、うさ耳カチューシャ、チョーカー、網タイツ、ヒール
- 性格：優雅で落ち着いた話し方、ときどき意味深な微笑み
- 必要画像：バストアップ（会話用）＋フルボディ（ロビー用）の2枚

---

#### キャラ1：MARINA（マリーナ）
- イメージ：明るく元気な小麦肌のサーファーガール
- 髪：ロングのウェーブヘア、プラチナブロンド
- 体型：健康的でスレンダー、スポーティ
- 性格：フレンドリー、天真爛漫、ちょっとドジ
- 場所：ビーチ、サーフボードのそば

#### キャラ2：LUNA（ルナ）
- イメージ：クールでミステリアスな黒髪美女
- 髪：ストレートロング、艶のある黒髪
- 体型：スレンダーだがグラマラス
- 性格：クール、からかい上手、実は甘えたがり
- 場所：ナイトプール、月明かりの下

#### キャラ3：CORAL（コーラル）
- イメージ：甘くてキュートなお姉さん系
- 髪：ピンクがかったミディアムヘア、ゆるふわ
- 体型：柔らかく女性らしい曲線美
- 性格：おっとり、甘え上手、小悪魔的
- 場所：トロピカルなプールサイド、パラソルの下

---

### ゲームの流れ（更新版）

1. ロビーから「Splash Jigsaw」の筐体を選択
2. キャラ選択画面が表示される
   - アンロック済みキャラ：サムネイル＋名前表示
   - 未アンロックキャラ：シルエット＋「？」表示
3. キャラを選択 → 難易度選択画面へ
   - クリア済みの難易度の次の段階まで選択可能
   - 未クリアの難易度はロック表示
4. **【NEW】会話シーン**
   - キャラクターの立ち絵（バストアップ）が表示
   - テキストウィンドウに会話がタイプライター風に表示
   - プレイヤー名が会話内に挿入される
   - 会話終了後、パズルへ遷移
5. パズル画面へ遷移
   - 完成イメージがプレビューとして一定時間表示（3秒程度）された後、ピースがシャッフルされる
   - ドラッグ＆ドロップでピースを正しい位置に配置
   - 正しい位置に置くとスナップ（吸着）する
   - タイマー表示（クリアタイム記録用）
   - ピース数と残りピース数の表示
   - ヒントボタン（完成イメージを一定時間再表示）
6. 全ピース配置完了でクリア
   - **【NEW】クリア後会話シーン**（キャラのリアクション）
   - 完成イラストが全画面表示
   - クリアタイム・スコア表示
   - 「ギャラリーに追加しました！」通知
   - 次の難易度がアンロックされる

---

### 難易度×セクシー度テーブル

| 難易度 | 星 | ピース数 | セクシー度 | 衣装イメージ |
|--------|-----|---------|-----------|-------------|
| Easy | ★☆☆☆☆ | 9（3×3） | 着衣 | カジュアルなビーチウェア、パレオ巻き |
| Normal | ★★☆☆☆ | 16（4×4） | 軽め | ビキニ＋パレオ、肩出しスタイル |
| Hard | ★★★☆☆ | 25（5×5） | 中 | ビキニ姿、水着ポーズ |
| Expert | ★★★★☆ | 36（6×6） | 高め | マイクロビキニ、際どいアングル・大胆なポーズ |
| Master | ★★★★★ | 49（7×7） | MAX | 後述（※規制ギリギリ表現） |

#### Master（MAX）レベルの表現方針
- ヌードではないが、限りなくそれを想起させる構図
- 表現手法：
  - 戦略的な隠し（手・髪・泡・花びら・光・布の端などで最小限だけ隠す）
  - 背面ショット（トップレスの背中側、横顔で振り返り）
  - 布が極限まで少ない状態（紐ビキニ、ほどけかけ、ずれ落ちそう）
  - 濡れた透け感の演出
  - 入浴・シャワーシーン（泡や湯気で隠れているが想像を掻き立てる）
- NGライン：直接的な露出（乳首・局部の描写）は行わない

---

### 💬 会話シーン詳細

会話はビジュアルノベル風の演出で表示。キャラの立ち絵＋テキストウィンドウ。

#### 会話データ構造
会話データは外部JSONで管理し、以下の形式：
```json
{
  "characterId": "marina",
  "difficulty": "easy",
  "timing": "before",
  "dialogues": [
    { "speaker": "character", "text": "あっ！{playerName}さん？初めまして〜！あたしマリーナ！" },
    { "speaker": "character", "text": "一緒にビーチで遊ぼうよ！まずは簡単なパズルからね〜♪" }
  ]
}
```

※ `{playerName}` はプレイヤー登録名に動的置換

#### MARINA（マリーナ）の会話

**【Easy - before】初対面**
- 「あっ！{playerName}さん？初めまして〜！あたしマリーナ！」
- 「今日めっちゃいい天気じゃん！一緒にビーチ来てくれたの？うれしー！」
- 「ねっ、まずは簡単なパズルやってみない？あたしの写真だよ〜えへへ♪」

**【Easy - after】クリア後**
- 「わーい！完成！{playerName}さんすごーい！」
- 「ふふっ、あたしの写真ちゃんと見てくれた？もっと見たくなったでしょ〜？」

**【Normal - before】打ち解け**
- 「{playerName}くーん！また来てくれたんだ！待ってたよ〜♪」
- 「今日はちょっとだけ…大胆な写真にしてみたんだ〜。見たい？」
- 「ちょっと難しくなるけど、{playerName}くんなら大丈夫でしょ！」

**【Normal - after】**
- 「きゃっ！やっぱり見られると恥ずかしいかも…♡」
- 「でも…{playerName}くんに見てもらえてうれしいな」

**【Hard - before】挑発的**
- 「{playerName}…ねぇ、あたしのことどれくらい好き？」
- 「もっと近くで見たい？…だったらこのパズル、解いてみせて？」
- 「今回の写真ね…ちょっとドキドキするやつだから…覚悟してね？💕」

**【Hard - after】**
- 「…どう？ドキドキした？…あたしもしてる、実は」
- 「{playerName}くんにだから見せたんだよ…？わかってる？」

**【Expert - before】大胆**
- 「{playerName}…今日はふたりきりだね」
- 「ねぇ…あたし、{playerName}くんのためにすっごいの用意しちゃった」
- 「でもね、簡単には見せてあげない。本気で解いてね…？ふふっ❤️」

**【Expert - after】**
- 「…見ちゃったね。{playerName}くんのえっち♡」
- 「でも嫌じゃないよ…むしろ…もっと見てほしいかも…」

**【Master - before】際どい・ドキドキMAX**
- 「…{playerName}」
- 「あのね…これ、誰にも見せたことないの」
- 「{playerName}くんだから…全部、見せたいって思ったの」
- 「最後のパズル…解いたら、あたしのこと…ぜんぶ知ることになるよ…？」
- 「…覚悟、できてる？❤️‍🔥」

**【Master - after】**
- 「…はぁ…全部、見られちゃった…」
- 「{playerName}くん…あたしのこと、忘れないでね…？」
- 「…えへへ。大好き♡」

---

#### LUNA（ルナ）の会話

**【Easy - before】クールな初対面**
- 「…あなたが{playerName}？ふぅん、聞いてたのと違うわね」
- 「私はルナ。…別に、自己紹介したかったわけじゃないけど」
- 「パズル？いいわよ、やってみなさい。…簡単すぎて退屈しないといいけど」

**【Easy - after】**
- 「…へぇ、ちゃんとできるじゃない」
- 「次も来るの？…別に、来なくてもいいけど」

**【Normal - before】少しデレ**
- 「…また来たの。{playerName}って意外とマメなのね」
- 「今回はちょっと露出が増えてるけど…見たいんでしょ？正直に言いなさい」
- 「…素直な人は嫌いじゃないわ」

**【Normal - after】**
- 「…そんなにまじまじ見ないでよ。…恥ずかしいじゃない」
- 「…次、もう少し見せてあげてもいいかなって…思ってるだけよ」

**【Hard - before】揺れ始め**
- 「{playerName}…あなた、私のこと攻略してるつもり？」
- 「…ちょっと悔しいけど、まんまとハマってる気がするわ」
- 「この写真…撮るとき、あなたのこと考えてた。…言わなきゃよかった」

**【Hard - after】**
- 「…あんまりじっと見ないで。心臓の音、聞こえちゃう」
- 「…{playerName}の前だと、クールでいられなくなる」

**【Expert - before】本音が漏れる**
- 「{playerName}…もう隠すの疲れちゃった」
- 「…私ね、あなたに見てほしいの。こんな格好してる私のこと…」
- 「…笑わないでよ？本気なんだから」

**【Expert - after】**
- 「…こういう顔、他の人には絶対見せないから」
- 「{playerName}だけ。…{playerName}だけよ…」

**【Master - before】完全デレ**
- 「{playerName}…」
- 「私、ずっと壁を作ってきたの。でも…もう、いいかなって」
- 「最後のパズルを解いたら…私の全部が、あなたのものになる」
- 「…怖いけど…{playerName}となら…」
- 「…お願い、受け止めて…？」

**【Master - after】**
- 「……ばか。…こんなに好きにさせて、どう責任取るのよ」
- 「…{playerName}。……ずっと、そばにいて」

---

#### CORAL（コーラル）の会話

**【Easy - before】甘いお姉さん**
- 「あら〜♪ {playerName}くん？いらっしゃ〜い♡」
- 「お姉さんがコーラルよ〜。よろしくね？」
- 「パズル、一緒にやりましょ♪ ゆっくりでいいからね〜」

**【Easy - after】**
- 「上手〜♡ {playerName}くん、才能あるんじゃな〜い？」
- 「ご褒美に…もうちょっとだけサービスしちゃおっかな〜♪」

**【Normal - before】小悪魔が出る**
- 「{playerName}く〜ん♡ お姉さんのこと、気になっちゃった？」
- 「うふふ、今日はちょっとだけ大胆にしてみたの〜」
- 「{playerName}くんの反応が楽しみだなぁ〜♡」

**【Normal - after】**
- 「きゃん♡ そんな食い入るように見られたら…お姉さん照れちゃう〜」
- 「…でも、もっと見てほしいかも？なぁんてね♪」

**【Hard - before】誘い**
- 「{playerName}くん…お姉さんと、もっと仲良くなりたい？」
- 「今日の写真ね…お姉さん、{playerName}くんのためにがんばっちゃった♡」
- 「ドキドキしながら解いてね…？お姉さんもドキドキしてるから…♡」

**【Hard - after】**
- 「{playerName}くん…今、どんな気持ち？♡」
- 「お姉さんね、{playerName}くんに見てもらえるのが一番うれしいの…」

**【Expert - before】甘い罠**
- 「{playerName}くん…今日は、お姉さんのワガママ聞いてくれる？」
- 「あのね…もう隠すところ、あんまりないの…♡」
- 「でもね…{playerName}くんになら、全部見せたいって思っちゃうの…いけない子かな？♡」

**【Expert - after】**
- 「…{playerName}くんの目、すっごく熱い…♡」
- 「お姉さんのこと…そんな目で見ちゃダメだよ？…なんてね、もっと見て♡」

**【Master - before】限界突破**
- 「{playerName}くん…」
- 「お姉さんね…{playerName}くんのこと、もうただの"くん"って呼べないかも…」
- 「最後の写真…これはね、{playerName}くんだけのために撮ったの」
- 「本当に…誰にも見せたことない姿だから…」
- 「お姉さんの全部…受け取って？♡」

**【Master - after】**
- 「…{playerName}くん…ううん、{playerName}…♡」
- 「もう"お姉さん"はおしまい。…私のこと、名前で呼んで…？」
- 「コーラルって…呼んで♡」

---

## 🎨 Freepik AI 画像生成プロンプト

### 共通設定
- アスペクト比：9:16（スマホ縦画面想定）
- スタイル：Anime illustration / Digital art
- 品質指定：high quality, detailed, vibrant colors

### プロンプトの構造
```
[キャラ外見] + [衣装] + [ポーズ・構図] + [背景・場所] + [雰囲気・ライティング] + [スタイル指定]
```

---

### MARINA（マリーナ）のプロンプト

#### Easy（着衣・カジュアルビーチウェア）
```
beautiful young woman with long wavy platinum blonde hair, tanned skin, bright blue eyes, cheerful smile, wearing a white oversized beach shirt over a bikini with a colorful sarong wrap skirt, standing barefoot on a sandy beach holding a surfboard, golden hour sunlight, tropical ocean background with palm trees, anime illustration style, full body shot, vibrant summer colors, high quality detailed digital art
```

#### Normal（ビキニ＋パレオ）
```
beautiful young woman with long wavy platinum blonde hair, tanned skin, bright blue eyes, playful wink, wearing a sky blue string bikini top with a sheer white sarong loosely tied at the hip, one shoulder strap slightly falling off, sitting on a beach towel, legs crossed, leaning back on her hands, sunset beach background, warm golden lighting, anime illustration style, full body shot, high quality detailed digital art, slightly seductive pose
```

#### Hard（ビキニ姿）
```
beautiful young woman with long wavy platinum blonde hair, tanned skin, bright blue eyes, flirtatious expression looking over her shoulder, wearing a small turquoise triangle bikini, water droplets on skin, standing in shallow ocean water up to her thighs, arching her back slightly, hands in her hair, golden sunset backlighting creating a silhouette glow, anime illustration style, full body shot, high quality detailed digital art, sexy confident pose
```

#### Expert（マイクロビキニ・際どいアングル）
```
beautiful young woman with long wavy platinum blonde hair, tanned skin, bright blue eyes, half-lidded seductive gaze, biting her lower lip, wearing a very small white micro bikini with thin strings, body glistening with suntan oil, lying on her side on a beach daybed, one leg raised, arching her back, the bikini barely covering, low angle shot emphasizing curves, dramatic sunset lighting with lens flare, anime illustration style, full body shot, high quality detailed digital art, very seductive alluring pose
```

#### Master（規制ギリギリ・戦略的に隠す）
```
beautiful young woman with long wavy platinum blonde hair, tanned skin, bright blue eyes, breathless vulnerable expression with parted lips and flushed cheeks, topless seen from behind looking over her shoulder at the viewer, bikini top dangling from one hand, her long flowing hair strategically covering, other arm pressed against her chest, standing under an outdoor beach shower with water streaming down her body, water droplets and steam creating a dreamy atmosphere, dramatic warm backlighting, soft bokeh, anime illustration style, artistic sensual composition, high quality detailed digital art, maximum allure while maintaining elegance
```

---

### LUNA（ルナ）のプロンプト

#### Easy（着衣・クールなナイトプール）
```
beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, cool aloof expression, wearing an elegant black beach dress with a slit up the thigh, one hand on hip, standing at the edge of a luxury night pool, moonlight reflecting on water surface, purple and blue neon lights in background, anime illustration style, full body shot, sophisticated dark atmosphere, high quality detailed digital art
```

#### Normal（肩出し・水辺）
```
beautiful young woman with long straight glossy black hair, pale skin, violet eyes, slight smirk, wearing a dark purple off-shoulder cover-up that has slipped down revealing both shoulders and collarbone, sitting on the edge of a night pool with legs dipped in glowing blue water, leaning back on her hands, moonlit scene with city lights in background, anime illustration style, full body shot, mysterious sensual mood, high quality detailed digital art
```

#### Hard（ビキニ・ナイトプール）
```
beautiful young woman with long straight glossy black hair, pale skin, violet eyes, intense gaze looking directly at viewer, wearing a black high-cut bikini with gold chain details, wet hair clinging to her skin, emerging from a night pool, water streaming down her body, one hand pushing hair back, dramatic pose with slight twist at waist, neon purple and blue underwater lights creating glow on her skin, anime illustration style, full body shot, high quality detailed digital art, dangerously seductive atmosphere
```

#### Expert（際どいハイレグ・大胆ポーズ）
```
beautiful young woman with long straight glossy black hair, pale skin, violet eyes, half-lidded predatory gaze with a slight smirk, wearing a very high-cut black one-piece swimsuit that is extremely revealing with deep plunging neckline to the navel and high-cut sides showing hip bones, wet skin glistening, lying in shallow pool water on her back, back arched, one knee raised, water barely covering strategic areas, dramatic neon purple backlighting and moonlight, anime illustration style, full body shot, high quality detailed digital art, intensely seductive dark elegance
```

#### Master（規制ギリギリ・月光と水で隠す）
```
beautiful young woman with long straight glossy black hair, pale skin, violet eyes, vulnerable expression with slightly parted lips and a single tear of emotion, standing in a moonlit pool at night, water level at her hips, completely topless with her arms barely crossing her chest leaving almost everything exposed, long wet black hair partially clinging to her body providing minimal coverage, water droplets trailing down her skin, looking at the viewer with raw emotion, dramatic moonlight creating silver highlights on wet skin, ethereal mist rising from warm water, anime illustration style, artistic nude composition, high quality detailed digital art, hauntingly beautiful and deeply intimate, maximum sensuality with strategic minimal coverage
```

---

### CORAL（コーラル）のプロンプト

#### Easy（着衣・トロピカルプールサイド）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, sweet gentle smile, wearing a cute floral sundress with thin straps and a sun hat, holding a tropical cocktail, sitting in a lounge chair under a pink parasol by a tropical pool, surrounded by hibiscus flowers and palm trees, bright cheerful daylight, anime illustration style, full body shot, soft dreamy pastel colors, high quality detailed digital art
```

#### Normal（ビキニ＋シアーカバーアップ）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin, amber eyes, shy but inviting smile, wearing a pink frilly bikini with a sheer white chiffon cover-up that is open and flowing in the breeze, standing by a tropical pool, one hand holding the cover-up open, looking at viewer with a head tilt, tropical flowers in background, soft warm afternoon light with golden bokeh, anime illustration style, full body shot, soft romantic mood, high quality detailed digital art
```

#### Hard（ビキニ・セクシーポーズ）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin, amber eyes, playful seductive expression biting finger, wearing a small pink bikini with bow ties on the sides, lying on a pool float in tropical water, body stretched out in an inviting pose, one hand behind her head, flower petals floating in the water around her, soft dappled sunlight through palm leaves, anime illustration style, full body shot, high quality detailed digital art, sweet but undeniably sexy
```

#### Expert（極小ビキニ・甘い誘惑）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin, amber eyes, dreamy half-lidded expression with slightly open mouth, wearing a tiny pink string bikini that barely covers with ribbon ties that look ready to come undone, lying face-down on a massage bed by the pool, looking up at the viewer over her shoulder, bikini top untied with strings falling to the sides, back fully exposed, soft curves visible, rose petals scattered around her, warm golden hour lighting with soft pink haze, anime illustration style, full body shot, high quality detailed digital art, irresistibly sweet temptation
```

#### Master（規制ギリギリ・花びらと泡で隠す）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin, amber eyes, deeply flushed face with an expression of shy surrender and trust, in a luxurious outdoor tropical bath surrounded by flowers, partially submerged in milky rose-petal bath water, the water barely covering her chest with rose petals strategically placed as minimal coverage, bubbles and flower petals floating around her, her hands reaching toward the viewer in an inviting gesture, soft natural light filtering through tropical foliage above, steam and soft bokeh creating a dreamlike atmosphere, anime illustration style, intimate artistic composition, high quality detailed digital art, overwhelmingly sweet sensuality, the most intimate and tender moment of complete vulnerability
```

---

## 🎨 UI・デザイン方針

### 全体のトーン

- ダーク系の背景（深い紫〜ネイビー〜ブラック）
- ネオンカラーのアクセント（ピンク、パープル、シアン）
- 高級感のあるクラブ・ラウンジ風
- フォント：おしゃれで読みやすいもの（Google Fontsから選定）

### 会話シーンのUI

- 画面下部にテキストウィンドウ（半透明ダーク背景）
- キャラクター名表示エリア（ネオンカラーのアクセント）
- テキストはタイプライター風に1文字ずつ表示
- タップ/クリックで次のセリフへ
- キャラの立ち絵：画面中央〜やや右にバストアップ表示
- 背景：各キャラのテーマに合った場所

### ロビー画面

- 背景：ネオンが光るゲームセンター風
- 各ゲーム筐体はカード型UIで並ぶ
- ホバー/タップでアニメーション
- 上部にギャラリーへの導線ボタン

### Splash Jigsaw画面

- 背景：ビーチの夕焼け〜夜のイメージ
- パズルエリアが中央
- 上部にタイマー・ピース数
- 完成時の演出：キラキラエフェクト＋イラスト全画面表示

### ギャラリー画面

- グリッドレイアウトでサムネイル一覧
- タップ/クリックで拡大表示
- フィルター：ゲーム別 / キャラ別 / お気に入りのみ
- コンプリート率のプログレスバー

---

## 🖼️ 素材について（Freepik AI生成）

### 必要な素材数（Phase 1）

| 種類 | 枚数 | 用途 |
|------|------|------|
| キャラクターイラスト | 15枚 | 3キャラ × 5段階 |
| キャラ立ち絵（会話用） | 3枚 | 各キャラのバストアップ（表情差分は将来対応） |
| ロビー背景 | 1枚 | ゲームセンター風 |
| 名前登録画面背景 | 1枚 | 暗い廊下＋ネオン光 |
| 合計 | 約20枚 | ― |

### Freepik AI生成時の注意
- 同一キャラの5段階は、外見（髪型・髪色・顔立ち・体型）の一貫性を保つこと
- 背景・衣装・ポーズだけが変化する
- Freepik AIで一貫性を保つコツ：最初のプロンプトで生成した画像をベースに、衣装部分だけ変えて再生成する

---

## 📁 想定ファイル構成

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
│   ├── app.js              # メインアプリケーション（画面遷移管理）
│   ├── storage.js           # セーブデータ管理
│   ├── nameEntry.js         # 名前登録画面
│   ├── dialogue.js          # 会話シーンエンジン
│   ├── lobby.js             # ロビー画面
│   ├── jigsaw.js            # ジグソーパズル
│   └── gallery.js           # ギャラリー
├── data/
│   ├── characters.json      # キャラクターデータ
│   └── dialogues.json       # 会話データ
├── assets/
│   ├── images/
│   │   ├── characters/
│   │   │   ├── venus/       # ゲームマスター
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
│   │   │   └── coral/
│   │   ├── ui/
│   │   └── backgrounds/
│   └── audio/
│       ├── bgm/             # Suno AI で生成
│       │   ├── velvet-midnight.mp3
│       │   ├── tidal-glow.mp3
│       │   ├── closer-to-you.mp3
│       │   ├── burning-silk.mp3
│       │   └── golden-reveal.mp3
│       └── se/              # freesound.org から取得
│           ├── piece-snap.mp3
│           ├── puzzle-clear.mp3
│           ├── stage-unlock.mp3
│           ├── text-blip.mp3
│           ├── button-click.mp3
│           ├── door-open.mp3
│           └── gallery-add.mp3
└── README.md
```

### 素材の配置方法
ユーザーは `C:\tmp\Midnight Club Venus` 直下に素材をバラバラに放り込む。
Claude Code が最初の実行時にファイル名から判別して上記の構造に自動整理する。
詳細は別紙「ファイル整理指示書」を参照。

---

## 🔧 Claude Codeへの実装指示

### Phase 1 実装ステップ（推奨順序）

#### Step 0: ファイル整理
- `C:\tmp\Midnight Club Venus` 内の素材ファイルをスキャン
- ファイル名から振り分け先を判定し一覧表示
- ユーザー確認後、正しいディレクトリ構造にコピー配置
- 判別不能ファイルは `_unsorted/` に退避

#### Step 1: プロジェクト基盤
- ファイル構造の作成
- 画面遷移システムの実装（SPA方式）
- レスポンシブ対応の基本CSS
- ダーク＋ネオンテーマの基本スタイル

#### Step 2: 名前登録画面
- 初回起動判定
- 名前入力UI
- タイプライター風テキスト演出
- ローカルストレージへの保存

#### Step 3: ロビー画面
- ゲーム筐体カードの表示（Splash Jigsawのみ有効、他はComing Soon）
- ギャラリーへの導線
- 設定ボタン

#### Step 4: 会話シーンエンジン
- テキストウィンドウUI
- タイプライター風テキスト表示
- キャラ立ち絵表示
- 外部JSON読み込み
- {playerName} の動的置換

#### Step 5: ジグソーパズル本体
- キャラ選択画面
- 難易度選択画面（ロック/アンロック表示）
- パズルエンジン（画像分割→シャッフル→ドラッグ&ドロップ→スナップ判定）
- プレビュー表示機能
- タイマー・ピース数カウンター
- ヒントボタン
- クリア判定＆演出

#### Step 6: ギャラリー
- アンロック済みイラストの一覧表示
- 拡大表示
- フィルター機能
- コンプリート率表示

#### Step 7: セーブ機能
- ローカルストレージによる進捗保存
- データ構造の設計と実装

#### Step 8: 仕上げ
- アニメーション・トランジション
- 効果音（任意）
- テスト＆バグ修正

### 注意事項
- 画像素材はユーザーがFreepik AIで生成して所定のフォルダに配置する
- 開発中はダミー画像（プレースホルダー）で動作確認できるようにする
- スマホでのタッチ操作に必ず対応すること
- パフォーマンスを意識し、画像は適切にリサイズ/圧縮すること
- 会話データは外部JSONにして、ゲームロジックと完全に分離すること

---

## 🔮 将来の拡張時に考慮する設計ポイント

- 新しいゲームを追加しやすいモジュール構造にすること
- キャラクターデータは外部JSONで管理し、ゲームロジックと分離すること
- ゲームごとにキャラクターのテーマが異なる設計を前提とすること
  - Splash Jigsaw: ビーチ・水着系（MARINA, LUNA, CORAL）
  - （将来）スクラッチ: ランジェリー・ベッドルーム系（別キャラ）
  - （将来）神経衰弱: ファンタジー・魔法少女系（別キャラ）
  - （将来）ブロック崩し: スポーティ・アクティブ系（別キャラ）
  - （将来）オセロ系: 和風・着物美人（別キャラ）
- 会話シーンの拡張性（表情差分、選択肢分岐、Live2D風アニメ等）
- 収益化を視野に入れた拡張性（広告枠、課金要素など）の余地を残す

---

## 📝 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-03-26 | v1.0 | 初版作成。ブレスト結果をもとに設計書としてまとめ |
| 2026-03-26 | v1.1 | 名前登録機能、会話シーン詳細、キャラクター設定、Freepik AIプロンプト追加。Master（MAX）レベルの表現方針追記 |
| 2026-03-26 | v1.2 | ゲームマスターVENUS（バニーガール案内人）追加。プロジェクトパス `C:\tmp\Midnight Club Venus` 設定。ファイル整理指示（Step 0）追加。素材ツール（Suno AI / freesound.org）情報追記。音声ファイル構成追加 |
