# 🎧 Midnight Club Venus — 追加コンテンツ：NEON ＆ Neon Run

設計書 v1.2 / プロンプト集 v1.1 への追加分。

---

## 👾 新キャラクター：NEON（ネオン）

### キャラクター設定

| 項目 | 内容 |
|------|------|
| 名前 | NEON（ネオン） |
| イメージ | エネルギッシュでクールなDJガール |
| 髪 | ショートの非対称ボブ、ピンク→パープルのグラデーション |
| 瞳 | 鮮やかなマゼンタ（明るいピンク系） |
| 体型 | スレンダーで引き締まったスポーティ体型 |
| 衣装（基本） | エレクトリックピンク＆パープルのクロップドフーディー、黒レザーのハイウエストショーツ、LEDライト付きニーハイブーツ、サイアングローのヘッドフォン、フィンガーレスグローブ |
| 性格 | ハイテンション、ストレート、挑戦的、でも認めた相手にはデレる。「アガる」ものが好き |
| 場所 | クラブのDJブース、ネオンが飛び交うダンスフロア |
| 所属ゲーム | Neon Run（ランゲーム） |

---

## 🏃‍♀️ 新ゲーム：Neon Run

### 基本情報

| 項目 | 内容 |
|------|------|
| ゲーム名 | **Neon Run** |
| ジャンル | ランゲーム（エンドレスランナー） |
| テーマ | ネオンシティ・サイバーパンク・クラブ |
| キャラ | NEON（ネオン） |
| 難易度 | 6段階（Easy / Normal / Hard / Expert / Master / VIP） |

### ゲームの流れ

1. ロビーから「Neon Run」の筐体を選択
2. 難易度選択画面（前の難易度クリアで次が解放）
3. **会話シーン（NEONとの会話）**
4. ランゲーム開始
   - 横スクロール or 奥スクロールのランナー
   - 障害物を避けながら走る（スワイプ/キー操作）
   - コインやアイテムを集める
   - 一定距離を走りきったらクリア（エンドレスではなくステージ制）
5. **クリア後会話シーン**
6. イラスト開放 → ギャラリーに追加

### ステージ設計

| 難易度 | スピード | 障害物 | 必要距離 | セクシー度 |
|--------|---------|--------|---------|-----------|
| ★☆☆☆☆☆ Easy | 遅い | 少ない・単純 | 短い | 着衣（フルDJ装備） |
| ★★☆☆☆☆ Normal | やや速い | 増加 | やや長い | 軽め（露出増） |
| ★★★☆☆☆ Hard | 速い | 複合障害物 | 長い | 中（大胆な衣装） |
| ★★★★☆☆ Expert | かなり速い | 高密度 | かなり長い | 高め（際どい） |
| ★★★★★☆ Master | 最速 | 高密度＋ギミック | 最長 | MAX（規制ギリギリ） |
| ★★★★★★ VIP | Master＋特殊演出 | 変化パターン＋ボス的演出 | 特別 | 超MAX（VIP限定特別イラスト） |

### VIPランクについて

VIPはMasterをクリアした後に解放される特別ステージ。
- Masterまでの全難易度をクリアすることが解放条件
- ゲーム性：Masterベースだが、途中でスピード変化・演出変化がある特別仕様
- 報酬イラスト：最も特別な「VIP限定」イラスト。他の難易度とは一線を画す特別感
- ギャラリーでも「VIP」マーク付きで表示

---

## 🎨 NEON 衣装×セクシー度テーブル

| 難易度 | 衣装イメージ |
|--------|-------------|
| Easy | フルDJ装備（クロップドフーディー＋レザーショーツ＋ブーツ＋ヘッドフォン） |
| Normal | フーディーの前を開けてスポーツブラ見え、ショーツがよりショートに |
| Hard | スポーツブラ＋超ミニのレザースカート、ニーハイブーツ、汗ばんだ肌 |
| Expert | ネオングロウするマイクロビキニ的なトップ＋ハイレグレザーボトム、身体にネオンペイント |
| Master | トップレス背面、ネオンペイントが身体を流れるように覆う、戦略的に隠す構図 |
| VIP | 完全特別構図。ネオンライトと煙だけで身体を包む。DJブースの向こうで振り返る究極の1枚 |

### Master・VIPレベルの表現方針
- ヌードではないが、限りなくそれを想起させる構図
- Masterの表現手法：
  - 背面ショット＋ネオンペイントが身体に流れるように光る
  - ヘッドフォンだけを身につけた状態、腕やライトで最小限隠す
- VIPの表現手法：
  - DJブース越しの構図で、ネオンの光と煙（ヘイズ）が身体を包む
  - ブースの機材やライトが戦略的に配置され、見えそうで見えない
  - 表情は無防備で幸福感に満ちた「音楽に没入した」顔
- NGライン：直接的な露出（乳首・局部の描写）は行わない

---

## 🎨 Freepik AI 画像プロンプト：NEON

### 外見の共通記述（全プロンプトにコピペ）
```
young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body
```

### NEON 立ち絵（会話用・バストアップ）★最初に生成！
```
young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, confident smirk with one eyebrow raised, wearing a sleek cropped hoodie in electric pink and purple with glowing neon accents, large stylish headphones around her neck glowing cyan, fingerless gloves, portrait from waist up, one hand doing a peace sign near her face, dark nightclub background with colorful neon lights and bokeh, Japanese anime style, anime cel shading, energetic cool atmosphere, high quality detailed
```

### NEON Easy（フルDJ装備）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, confident energetic pose with one hand on her hip, wearing a sleek cropped hoodie in electric pink and purple with glowing neon accents, high-waisted black leather shorts, thigh-high boots with LED light strips, large stylish headphones around her neck glowing cyan, fingerless gloves, standing behind a DJ booth with turntables and mixing equipment, neon city nightclub background with laser lights and LED screens, Japanese anime style, anime cel shading, full body shot, vibrant neon color palette, high quality detailed
```

### NEON Normal（前開けフーディー＋露出増）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, playful confident expression sticking tongue out slightly, wearing an unzipped cropped hoodie in electric pink and purple hanging open to reveal a black sports bra underneath, very short black leather shorts with neon trim showing more leg, thigh-high boots with LED light strips, headphones on her ears glowing cyan, fingerless gloves, leaning against a DJ booth with one hand on the turntable, sweat glistening on her collarbone, neon purple and pink club lights in background, Japanese anime style, anime cel shading, full body shot, high quality detailed
```

### NEON Hard（スポーツブラ＋ミニスカート）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, fierce seductive expression with half-lidded eyes, wearing only a small neon pink sports bra and an ultra-short black leather mini skirt with a high slit, thigh-high boots with LED glow, headphones around her neck, sweat-glistened skin under neon lights, dancing on a club stage with arms raised above her head showing toned midriff, laser beams and smoke effects in the background, Japanese anime style, anime cel shading, full body shot, dynamic sexy pose, high quality detailed
```

### NEON Expert（ネオンペイント＋ハイレグ）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, intense seductive gaze looking directly at viewer biting lower lip, wearing a tiny neon-glowing bikini-like top that barely covers with LED strip accents and a high-cut black leather bottom showing hip bones, glowing neon body paint lines running along her arms and torso in cyan and magenta patterns, headphones on ears, lying across the DJ booth on her side in a provocative pose, one leg extended, neon lights reflecting off her sweat-glistened skin, heavy club atmosphere with smoke and lasers, Japanese anime style, anime cel shading, full body shot, extremely seductive, high quality detailed
```

### NEON Master（規制ギリギリ・ネオンペイント）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, breathless expression with parted lips and flushed cheeks eyes half closed in ecstasy, seen from behind looking over her shoulder at the viewer, topless with elaborate glowing neon body paint in cyan and magenta swirling patterns covering her back and flowing around to strategically cover her chest from the side view, wearing only a tiny black thong, headphones the only remaining accessory, one arm reaching up adjusting headphones the other hand on the DJ mixer, her body illuminated by dramatic neon backlighting creating an ethereal glow outline, smoke and laser beams in dark club environment, Japanese anime style, anime cel shading, artistic sensual composition, maximum allure, high quality detailed
```

### NEON VIP（超MAX・究極の1枚）
```
@img1 young female anime character with short asymmetrical bob haircut in gradient pink to purple, bright magenta eyes, athletic slender body, blissful vulnerable expression with closed eyes and serene smile as if completely lost in the music, standing behind the DJ booth facing the viewer, her body visible from the waist up above the booth equipment, appearing to wear nothing but the glowing headphones on her ears, swirling neon smoke and haze in cyan pink and purple wrapping around her body like ethereal fabric providing strategic coverage, booth equipment and vinyl records placed at perfect angles to hide below the frame, dramatic volumetric neon lighting from behind creating a goddess-like silhouette, light rays and particles floating in the air, an intimate private after-hours club scene, Japanese anime style, anime cel shading, the most artistic and intimate composition, transcendent sensuality, high quality detailed
```

---

## 💬 NEON 会話シーン

### 【Easy - before】初対面・テンション高い
- 「おっ！新入り？…{playerName}ってヤツか」
- 「あたしはネオン。このフロアのサウンドは全部あたしが支配してんの」
- 「ゲーム？いいじゃん、やってみなよ。…ビートに乗れるかな？笑」

### 【Easy - after】
- 「へぇ〜、なかなかやるじゃん{playerName}！」
- 「ちょっとだけ見直したかも。…ちょっとだけね？」

### 【Normal - before】認め始め
- 「{playerName}じゃん。また来たの？…嫌いじゃないよ、そういうの」
- 「今回はちょっとテンポ上げてくからね。ついてこれる？」
- 「あたしのこと…もうちょい近くで見たい？だったらクリアしてみせなよ💗」

### 【Normal - after】
- 「お〜やるやる！{playerName}、ノリいいじゃん！」
- 「…ちょっとだけ、サービスしてあげよっか。次の曲、特別だよ？」

### 【Hard - before】距離が縮まる
- 「{playerName}…あんた、マジでしつこいね。…好きだけど、そういうの」
- 「ねぇ、今日のあたし見た？ちょっと気合い入れてきちゃった」
- 「このステージ、ガチで速いからね。…あたしのために全力で走ってよ？」

### 【Hard - after】
- 「…はぁはぁ…やば、あんた本気じゃん…」
- 「…{playerName}にだけ言うけど、あたし今めっちゃアガってる」

### 【Expert - before】本気モード
- 「{playerName}…あんたさ、あたしのこと攻略してるつもり？」
- 「…まぁいいけど。正直、あたしも…ちょっとハマってきてるし」
- 「今日の衣装ね…あんたのために選んだって言ったら…引く？」
- 「引かないでよ？…走って。あたしの全部、見せてあげるから❤️」

### 【Expert - after】
- 「…{playerName}…あんた、マジでヤバい」
- 「こんな気持ち…あたしの曲でも表現できないかも…」

### 【Master - before】全てを曝け出す
- 「…{playerName}」
- 「あたしさ、ずっとDJブースの向こう側にいたじゃん」
- 「みんなを盛り上げて、みんなに音楽届けて…でも、いつもひとりで」
- 「あんたが来てから…初めて、ブースから降りたいって思った」
- 「最後のステージ…あたしの全部かけて走るから」
- 「…あんたも、全力で来いよ…？」

### 【Master - after】
- 「…はぁ…はぁ……やば……」
- 「{playerName}……あたし、もう音楽だけじゃ足りない」
- 「あんたがいないと…ビートが刻めないんだよ…」

### 【VIP - before】VIP限定・特別な夜
- 「…{playerName}。今夜は特別」
- 「クラブはもう閉まった。…あたしたちだけのアフターアワーズ」
- 「これ…誰にも見せたことない。あんただけの、プライベートセット」
- 「音楽もあたし自身も…全部、{playerName}だけのもの」
- 「…最後まで、目、逸らさないでね…？」

### 【VIP - after】
- 「……{playerName}」
- 「…あたしの音楽、あたしの全部…受け取ってくれた」
- 「…ありがと。…大好き」
- 「…って！今の忘れろ！！…忘れんなよ？…ばか❤️」

---

## 🏠 背景画像プロンプト：Neon Run 追加分

### Neon Run 背景（ゲームプレイ中）（16:9）
```
a futuristic neon-lit city street at night for a side-scrolling runner game, cyberpunk aesthetic, dark road with glowing neon pink purple and cyan light strips on the ground, tall buildings with holographic billboards and neon signs on both sides, fog and smoke at ground level, laser beams crossing in the distance, seamless tileable horizontal background, no people, Japanese anime background style, anime cel shading, high quality detailed, 16:9 aspect ratio
```

### 会話シーン背景：DJブース・クラブ内（NEON用）（16:9）
```
interior of a dark futuristic nightclub with a large DJ booth in the center, turntables and mixing equipment with glowing LED displays, massive LED screen wall behind the booth showing abstract neon visuals, laser beams in purple pink and cyan cutting through smoke and haze, dance floor with reflective surface, speaker stacks on both sides, VIP booth area with velvet ropes visible, dark atmosphere with intense neon lighting, no people, Japanese anime background style, anime cel shading, high quality detailed, 16:9 aspect ratio
```

### ゲーム筐体アイコン：Neon Run（正方形 1:1）
```
a stylized arcade cabinet icon glowing with neon magenta and cyan light, the screen shows a running figure silhouette with speed lines, electric pink and purple lightning bolt decorative elements, retro arcade cabinet shape with modern neon glow effects, dark background, Japanese anime game UI style, anime cel shading, icon design, vibrant neon colors, high quality detailed, 1:1 square aspect ratio
```

---

## 🎵 Suno AI 追加BGMプロンプト

### BGM 6: Neon Run プレイ中「Neon Dash」

ランゲームのプレイ中BGM。テンポ速め、エレクトロ、走ってる感。

#### 🎵 Suno AI Prompt (V5)

**【Title】**
Neon Dash

**【Style of Music】**
drum and bass, cyberpunk, driving synth bass, fast arpeggios, glitchy hi-hats, pulsing neon energy, high tempo, instrumental only, no vocals

**【Lyrics】**
[Intro]
[Instrumental]

[Verse 1]
[Instrumental]

[Build]
[Instrumental]

[Drop]
[Instrumental]

[Breakdown]
[Instrumental Break]

[Build]
[Instrumental]

[Drop]
[Instrumental]

[Outro]
[Instrumental] [Fade Out]

**【Exclude Styles】**
acoustic, slow, ballad, country, folk, jazz, children's music

#### 補足
- BPM: 140-170のハイテンポ
- ドラムンベース寄りの疾走感あるサウンド
- 走ってるときに気持ちいいドライブ感が大事
- 難易度によってBGMの速度変化を実装する場合は、Sunoで複数BPMバージョンを生成するのもアリ

---

### BGM 7: Neon Run 会話シーン「Electric Heart」

NEONとの会話シーンで流れるBGM。クールだけどドキドキ。

#### 🎵 Suno AI Prompt (V5)

**【Title】**
Electric Heart

**【Style of Music】**
synthwave, emotional, warm analog synth pads, gentle arpeggios, soft 808 bass, dreamy atmosphere, retro-futuristic, instrumental only, no vocals

**【Lyrics】**
[Intro]
[Instrumental]

[Verse 1]
[Instrumental]

[Chorus]
[Instrumental]

[Verse 2]
[Instrumental]

[Bridge]
[Instrumental Break]

[Chorus]
[Instrumental]

[Outro]
[Instrumental] [Fade Out]

**【Exclude Styles】**
rock, metal, acoustic, fast tempo, aggressive, country

#### 補足
- BPM: 85-100
- シンセウェーブの懐かしくてエモい雰囲気
- NEONのクールだけど実は感情的なキャラに合うサウンド

---

### BGM 8: Neon Run 会話シーン Expert〜VIP用「After Hours」

高難易度の会話シーンで切り替わる、クラブ閉店後の親密なBGM。

#### 🎵 Suno AI Prompt (V5)

**【Title】**
After Hours

**【Style of Music】**
dark synthwave, intimate, deep sub bass, ethereal pad layers, slow glitchy beats, whispered atmosphere, late-night confession, instrumental only, no vocals

**【Lyrics】**
[Intro]
[Instrumental]

[Verse 1]
[Instrumental]

[Chorus]
[Instrumental]

[Verse 2]
[Instrumental]

[Bridge]
[Instrumental Break]

[Chorus]
[Instrumental]

[Outro]
[Instrumental] [Fade Out]

**【Exclude Styles】**
upbeat, cheerful, fast, rock, metal, acoustic, pop, country

#### 補足
- BPM: 65-80の超スロー
- クラブが閉まった後の静けさと親密さ
- VIPの「あたしたちだけのアフターアワーズ」の空気感にぴったり

---

## 📊 NEON 追加素材チェックリスト

### キャラクター画像（8枚）

| # | 種類 | @img1 | ファイル名 |
|---|------|-------|-----------|
| 1 | バストアップ（会話用） | ★なし | neon/portrait.png |
| 2 | Easy | ☆あり | neon/easy.jpg |
| 3 | Normal | ☆あり | neon/normal.jpg |
| 4 | Hard | ☆あり | neon/hard.jpg |
| 5 | Expert | ☆あり | neon/expert.jpg |
| 6 | Master | ☆あり | neon/master.jpg |
| 7 | VIP | ☆あり | neon/vip.jpg |

※立ち絵は先にユーザーが生成済みの画像があるため、そちらを portrait として使用可能

### 背景画像（3枚）
| # | 種類 | ファイル名 |
|---|------|-----------|
| 8 | Neon Run ゲーム背景 | backgrounds/neonrun-stage.jpg |
| 9 | 会話背景：DJブース | backgrounds/dialogue-club.jpg |

### UI素材（1枚）
| # | 種類 | ファイル名 |
|---|------|-----------|
| 10 | 筐体アイコン：Neon Run | ui/cabinet-neonrun.png |

### BGM（3曲）
| # | 曲名 | 用途 |
|---|------|------|
| 11 | Neon Dash | ランゲームプレイ中 |
| 12 | Electric Heart | 会話シーン（Easy〜Hard） |
| 13 | After Hours | 会話シーン（Expert〜VIP） |

**NEON追加分合計：画像10枚＋BGM 3曲**
**プロジェクト全体合計：画像42枚＋BGM 8曲＋SE 7種**

### 生成順序

```
NEON: ①portrait（★）→ ②easy（☆@img1=①）→ ③normal → ④hard → ⑤expert → ⑥master → ⑦vip
```

---

## 📂 ファイル整理指示書 追加ルール

### キャラクター画像
| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `neon` + `portrait` または `bust` | `assets/images/characters/neon/portrait.png` |
| `neon` + `easy` または `1` または `lv1` | `assets/images/characters/neon/easy.jpg` |
| `neon` + `normal` または `2` または `lv2` | `assets/images/characters/neon/normal.jpg` |
| `neon` + `hard` または `3` または `lv3` | `assets/images/characters/neon/hard.jpg` |
| `neon` + `expert` または `4` または `lv4` | `assets/images/characters/neon/expert.jpg` |
| `neon` + `master` または `5` または `lv5` | `assets/images/characters/neon/master.jpg` |
| `neon` + `vip` または `6` または `lv6` | `assets/images/characters/neon/vip.jpg` |

### 背景画像
| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `neonrun` または `run-bg` または `runner` | `assets/images/backgrounds/neonrun-stage.jpg` |
| `dialogue` + `club` または `neon-bg` または `dj` | `assets/images/backgrounds/dialogue-club.jpg` |

### UI素材
| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `cabinet` + `neon` または `run` | `assets/images/ui/cabinet-neonrun.png` |

### BGM
| ファイル名に含むキーワード | 振り分け先 |
|---------------------------|-----------|
| `neon-dash` または `run-bgm` | `assets/audio/bgm/neon-dash.mp3` |
| `electric` または `neon-dialogue` | `assets/audio/bgm/electric-heart.mp3` |
| `after-hours` または `neon-sensual` | `assets/audio/bgm/after-hours.mp3` |

---

## 🔧 Claude Code 実装ノート：Neon Run

### ランゲームの基本仕様
- 横スクロール型ランナー（左から右へ走る）
- 操作：ジャンプ（タップ or スペースキー）、スライド（下スワイプ or 下キー）
- 障害物：ネオンバリア（上）→ ジャンプで回避、レーザー（下）→ スライドで回避
- コイン収集：ネオンコインを集めてスコア加算
- 背景：ネオンシティを疾走する演出、スクロール速度は難易度に連動
- クリア条件：一定距離を走りきる（難易度ごとに必要距離が変わる）

### 難易度ごとの変化
| 難易度 | スクロール速度 | 障害物密度 | 必要距離 | 特殊要素 |
|--------|-------------|-----------|---------|---------|
| Easy | 1.0x | 低 | 500m | なし |
| Normal | 1.3x | やや高 | 800m | なし |
| Hard | 1.6x | 高 | 1200m | 2種類の障害物が同時に出現 |
| Expert | 2.0x | 非常に高 | 1500m | 加速ゾーン追加 |
| Master | 2.5x | 最高 | 2000m | 加速ゾーン＋反転ゾーン |
| VIP | 2.5x＋変動 | 変化あり | 2500m | 速度変化＋特別演出＋ボス的障害物パターン |

### VIPの特別仕様
- 途中でスピードが変化する（加速→減速→再加速）
- 背景演出が豪華（花火、レーザーショー的な演出）
- 最後にNEONのDJプレイ演出が入ってフィニッシュ
- クリア後の会話＋イラストが最も特別

---

## 📝 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-03-26 | v1.0 | 初版。NEONキャラクター設定、Neon Runゲーム設計、Freepikプロンプト8枚、会話シーン全文、SunoBGM 3曲分を収録 |
