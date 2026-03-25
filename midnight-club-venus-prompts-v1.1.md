# 🎨🎵 Midnight Club Venus — 素材プロンプト集 v1.1

Freepik AI画像生成プロンプト＋Suno AI音楽生成プロンプトの完全版。
設計書 v1.1 と合わせて使用すること。

---

# PART 1: Freepik AI 画像プロンプト

---

## 📐 共通設定

- アスペクト比：9:16（スマホ縦画面想定）※背景画像は16:9
- スタイル：Japanese anime style（日本アニメ風）
- 同一キャラの一貫性を保つため、**必ず立ち絵（portrait）を最初に生成し、それを参照画像（@img1）として残りの画像を生成する**

### 生成の順番（重要！）
1. まず **立ち絵（portrait）** を生成する（@img1 なし）
2. 生成した立ち絵を参照画像として登録
3. Easy〜Masterの5枚を `@img1` 付きで生成する

### スタイル指定の共通文
立ち絵用：`Japanese anime style, anime cel shading, high quality detailed`
5段階画像用：`@img1 Japanese anime style, anime cel shading, high quality detailed`

---

## 🐰 ゲームマスター：VENUS（ヴィーナス）

### キャラクター設定
- 名前：VENUS（ヴィーナス）
- イメージ：妖艶で包容力のあるバニーガール。クラブのママ的存在
- 髪：シルバーホワイトのロングヘア、緩くウェーブ、前髪は片目にかかる
- 瞳：金色（ゴールド）、猫目
- 体型：グラマラス、大人の色気
- 衣装：黒のバニースーツ（ハイレグ）、うさ耳カチューシャ、チョーカー、網タイツ、ヒール
- 性格：優雅で落ち着いた話し方、ときどき意味深な微笑み

---

### VENUS 立ち絵（会話用・バストアップ）★最初に生成！
```
beautiful mature woman with long wavy silver-white hair partially covering one eye, golden cat-like eyes, warm seductive smile with slightly parted lips, wearing a black high-cut bunny suit with black bunny ear headband, black choker with a small diamond pendant, upper body portrait from waist up, one hand raised near her face in an inviting gesture, soft neon pink and purple lighting from the side, dark background with subtle bokeh lights, Japanese anime style, anime cel shading, high quality detailed
```

### VENUS フルボディ（ロビー用）※立ち絵を @img1 に設定してから生成
```
@img1 beautiful mature woman with long wavy silver-white hair partially covering one eye, golden cat-like eyes, seductive confident smile, wearing a black high-cut bunny suit with matching black bunny ear headband, black choker with a small diamond pendant, sheer black fishnet stockings, black high heels, holding a cocktail glass in one hand, the other hand on her hip, full body shot, standing in an elegant confident pose, dark purple and black gradient background with soft neon pink and purple light accents, Japanese anime style, anime cel shading, glamorous alluring atmosphere, high quality detailed
```

### VENUS の会話テキスト

**【名前登録シーン】**
- 「ようこそ、Midnight Club Venus へ——」
- 「私はヴィーナス。このクラブの案内役よ」
- 「あら…いい目をしてるわね。お名前を聞いてもいいかしら？」
- （名前入力後）
- 「{playerName}さん…ふふ、素敵な名前ね。覚えたわ♡」
- 「ここには楽しいゲームと…素敵な女の子たちが待ってるの」
- 「さぁ、中へどうぞ？あなたの夜は、まだ始まったばかりよ——」

**【ロビー（通常）】**
- 「おかえりなさい、{playerName}さん。今夜はどのゲームで遊ぶ？」
- 「新しいゲームが入荷したら教えてあげるわね♡」

**【ロビー（全クリア時）】**
- 「あら…全部クリアしちゃったの？{playerName}さん、やるわね」
- 「でも安心して。このクラブには、まだまだ秘密があるから——」

---

## 🏠 背景画像プロンプト

### ロビー背景（16:9）
```
interior of a luxurious futuristic nightclub arcade, dark ambient lighting with neon purple pink and cyan lights, sleek black marble floor with reflections, several glowing arcade cabinets and game machines arranged in a spacious room, a stylish bar counter in the background with bottles and neon signs, velvet rope barriers, holographic menu displays floating in the air, purple and magenta ambient fog near the floor, ceiling with recessed LED strips in purple, overall atmosphere is mysterious glamorous and adult-only, no people, Japanese anime background style, anime cel shading, wide shot, high quality detailed, 16:9 aspect ratio
```

### 名前登録画面 背景（16:9）
```
a long dark corridor leading to a distant glowing doorway, the door emits warm neon pink and purple light, dark walls with subtle velvet texture, floor has faint neon reflections, a single elegant sign above the door reads "Midnight Club Venus" in glowing cursive neon letters, mysterious fog at floor level, dramatic depth of field with the bright doorway in focus, no people, Japanese anime background style, anime cel shading, cinematic composition, high quality detailed, 16:9 aspect ratio
```

### Splash Jigsaw 背景（キャラ選択画面）（16:9）
```
a beautiful tropical beach at golden sunset, warm orange and pink sky blending into deep purple twilight, calm turquoise ocean with gentle waves, silhouettes of palm trees framing the scene, soft lens flare from the setting sun, distant sailboat on the horizon, bioluminescent blue glow beginning to appear in the shallow water, dreamy and romantic atmosphere, no people, Japanese anime background style, anime cel shading, wide panoramic shot, high quality detailed, 16:9 aspect ratio
```

### ギャラリー背景（16:9）
```
interior of a luxurious private gallery or museum hall, dark navy walls with elegant gold frame outlines where artwork would hang, polished dark wood floor with reflections, soft warm spotlights illuminating empty gold frames, a long corridor perspective creating depth, velvet bench in the center, subtle purple and gold ambient lighting, sophisticated and intimate atmosphere, no people, no artwork in the frames, Japanese anime background style, anime cel shading, wide shot, high quality detailed, 16:9 aspect ratio
```

### 会話シーン背景：ビーチ（昼・MARINA用）（16:9）
```
a bright sunny tropical beach scene, crystal clear turquoise water, white sand, colorful surfboards stuck in the sand, palm trees with coconuts, a beach bar with thatched roof in the background, beach towels and umbrellas, bright blue sky with fluffy white clouds, cheerful vibrant summer atmosphere, no people, Japanese anime background style, anime cel shading, high quality detailed, 16:9 aspect ratio
```

### 会話シーン背景：ナイトプール（LUNA用）（16:9）
```
a luxury rooftop infinity pool at night, city skyline glittering in the background, pool water glowing with underwater blue and purple LED lights, steam rising from the warm water surface, modern minimalist architecture with glass railings, moonlight reflecting on the water, elegant pool loungers with white towels, purple and blue ambient lighting, sophisticated and mysterious nighttime atmosphere, no people, Japanese anime background style, anime cel shading, high quality detailed, 16:9 aspect ratio
```

### 会話シーン背景：トロピカルプールサイド（CORAL用）（16:9）
```
a tropical resort poolside during golden afternoon, infinity pool surrounded by lush tropical plants and hibiscus flowers, pink and white parasols over lounge chairs, floating pink flamingo pool toys, tropical cocktails on a side table, warm soft sunlight filtering through palm fronds creating dappled shadows, bougainvillea vines climbing nearby pillars, dreamy romantic and sweet atmosphere, pastel color palette, no people, Japanese anime background style, anime cel shading, high quality detailed, 16:9 aspect ratio
```

---

## 👩 MARINA（マリーナ） — キャラクタープロンプト

### 外見の共通記述（全プロンプトにコピペ）
```
beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body
```

### MARINA 立ち絵（会話用・バストアップ）★最初に生成！
```
beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, cheerful bright smile, wearing a white crop top and denim shorts, portrait from waist up, one hand making a peace sign near her face, bright sunny beach background blurred with bokeh, wind blowing her hair, Japanese anime style, anime cel shading, energetic and cheerful atmosphere, high quality detailed
```

### MARINA Easy（着衣・カジュアルビーチウェア）
```
@img1 beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, cheerful smile, wearing a white oversized beach shirt over a bikini with a colorful sarong wrap skirt, standing barefoot on a sandy beach holding a surfboard, golden hour sunlight, tropical ocean background with palm trees, Japanese anime style, anime cel shading, full body shot, vibrant summer colors, high quality detailed
```

### MARINA Normal（ビキニ＋パレオ）
```
@img1 beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, playful wink, wearing a sky blue string bikini top with a sheer white sarong loosely tied at the hip, one shoulder strap slightly falling off, sitting on a beach towel, legs crossed, leaning back on her hands, sunset beach background, warm golden lighting, Japanese anime style, anime cel shading, full body shot, slightly seductive pose, high quality detailed
```

### MARINA Hard（ビキニ姿）
```
@img1 beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, flirtatious expression looking over her shoulder, wearing a small turquoise triangle bikini, water droplets on skin, standing in shallow ocean water up to her thighs, arching her back slightly, hands in her hair, golden sunset backlighting creating a silhouette glow, Japanese anime style, anime cel shading, full body shot, sexy confident pose, high quality detailed
```

### MARINA Expert（マイクロビキニ・際どいアングル）
```
@img1 beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, half-lidded seductive gaze, biting her lower lip, wearing a very small white micro bikini with thin strings, body glistening with suntan oil, lying on her side on a beach daybed, one leg raised, arching her back, the bikini barely covering, low angle shot emphasizing curves, dramatic sunset lighting with lens flare, Japanese anime style, anime cel shading, full body shot, very seductive alluring pose, high quality detailed
```

### MARINA Master（規制ギリギリ）
```
@img1 beautiful young woman with long wavy platinum blonde hair, tanned sun-kissed skin, bright blue eyes, athletic slender body, breathless vulnerable expression with parted lips and flushed cheeks, topless seen from behind looking over her shoulder at the viewer, bikini top dangling from one hand, her long flowing hair strategically covering, other arm pressed against her chest, standing under an outdoor beach shower with water streaming down her body, water droplets and steam creating a dreamy atmosphere, dramatic warm backlighting, soft bokeh, Japanese anime style, anime cel shading, artistic sensual composition, maximum allure while maintaining elegance, high quality detailed
```

---

## 🌙 LUNA（ルナ） — キャラクタープロンプト

### 外見の共通記述（全プロンプトにコピペ）
```
beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions
```

### LUNA 立ち絵（会話用・バストアップ）★最初に生成！
```
beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, cool composed expression with a slight knowing smirk, wearing an elegant black halter top, portrait from waist up, one hand lightly touching her hair, night city lights blurred in background with purple and blue bokeh, moonlight highlighting her features, Japanese anime style, anime cel shading, mysterious and sophisticated atmosphere, high quality detailed
```

### LUNA Easy（着衣・クールなナイトプール）
```
@img1 beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, cool aloof expression, wearing an elegant black beach dress with a slit up the thigh, one hand on hip, standing at the edge of a luxury night pool, moonlight reflecting on water surface, purple and blue neon lights in background, Japanese anime style, anime cel shading, full body shot, sophisticated dark atmosphere, high quality detailed
```

### LUNA Normal（肩出し・水辺）
```
@img1 beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, slight smirk, wearing a dark purple off-shoulder cover-up that has slipped down revealing both shoulders and collarbone, sitting on the edge of a night pool with legs dipped in glowing blue water, leaning back on her hands, moonlit scene with city lights in background, Japanese anime style, anime cel shading, full body shot, mysterious sensual mood, high quality detailed
```

### LUNA Hard（ビキニ・ナイトプール）
```
@img1 beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, intense gaze looking directly at viewer, wearing a black high-cut bikini with gold chain details, wet hair clinging to her skin, emerging from a night pool, water streaming down her body, one hand pushing hair back, dramatic pose with slight twist at waist, neon purple and blue underwater lights creating glow on her skin, Japanese anime style, anime cel shading, full body shot, dangerously seductive atmosphere, high quality detailed
```

### LUNA Expert（際どいハイレグ・大胆ポーズ）
```
@img1 beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, half-lidded predatory gaze with a slight smirk, wearing a very high-cut black one-piece swimsuit that is extremely revealing with deep plunging neckline to the navel and high-cut sides showing hip bones, wet skin glistening, lying in shallow pool water on her back, back arched, one knee raised, water barely covering strategic areas, dramatic neon purple backlighting and moonlight, Japanese anime style, anime cel shading, full body shot, intensely seductive dark elegance, high quality detailed
```

### LUNA Master（規制ギリギリ）
```
@img1 beautiful young woman with long straight glossy black hair, pale porcelain skin, sharp violet eyes, slender yet glamorous body with elegant proportions, vulnerable expression with slightly parted lips and a single tear of emotion, standing in a moonlit pool at night, water level at her hips, completely topless with her arms barely crossing her chest leaving almost everything exposed, long wet black hair partially clinging to her body providing minimal coverage, water droplets trailing down her skin, looking at the viewer with raw emotion, dramatic moonlight creating silver highlights on wet skin, ethereal mist rising from warm water, Japanese anime style, anime cel shading, artistic sensual composition, hauntingly beautiful and deeply intimate, maximum sensuality with strategic minimal coverage, high quality detailed
```

---

## 🌸 CORAL（コーラル） — キャラクタープロンプト

### 外見の共通記述（全プロンプトにコピペ）
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body
```

### CORAL 立ち絵（会話用・バストアップ）★最初に生成！
```
beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, sweet gentle smile with a slight head tilt, wearing a cute off-shoulder pink blouse with a ribbon, portrait from waist up, both hands clasped together near her chest, soft warm lighting with pink and golden bokeh in background, tropical flowers blurred behind her, Japanese anime style, anime cel shading, sweet romantic dreamy atmosphere, high quality detailed
```

### CORAL Easy（着衣・トロピカルプールサイド）
```
@img1 beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, sweet gentle smile, wearing a cute floral sundress with thin straps and a sun hat, holding a tropical cocktail, sitting in a lounge chair under a pink parasol by a tropical pool, surrounded by hibiscus flowers and palm trees, bright cheerful daylight, Japanese anime style, anime cel shading, full body shot, soft dreamy pastel colors, high quality detailed
```

### CORAL Normal（ビキニ＋シアーカバーアップ）
```
@img1 beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, shy but inviting smile, wearing a pink frilly bikini with a sheer white chiffon cover-up that is open and flowing in the breeze, standing by a tropical pool, one hand holding the cover-up open, looking at viewer with a head tilt, tropical flowers in background, soft warm afternoon light with golden bokeh, Japanese anime style, anime cel shading, full body shot, soft romantic mood, high quality detailed
```

### CORAL Hard（ビキニ・セクシーポーズ）
```
@img1 beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, playful seductive expression biting finger, wearing a small pink bikini with bow ties on the sides, lying on a pool float in tropical water, body stretched out in an inviting pose, one hand behind her head, flower petals floating in the water around her, soft dappled sunlight through palm leaves, Japanese anime style, anime cel shading, full body shot, sweet but undeniably sexy, high quality detailed
```

### CORAL Expert（極小ビキニ・甘い誘惑）
```
@img1 beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, dreamy half-lidded expression with slightly open mouth, wearing a tiny pink string bikini that barely covers with ribbon ties that look ready to come undone, lying face-down on a massage bed by the pool, looking up at the viewer over her shoulder, bikini top untied with strings falling to the sides, back fully exposed, soft curves visible, rose petals scattered around her, warm golden hour lighting with soft pink haze, Japanese anime style, anime cel shading, full body shot, irresistibly sweet temptation, high quality detailed
```

### CORAL Master（規制ギリギリ）
```
@img1 beautiful young woman with medium-length soft wavy pinkish hair, fair skin with rosy cheeks, warm amber eyes, soft curvy feminine body, deeply flushed face with an expression of shy surrender and trust, in a luxurious outdoor tropical bath surrounded by flowers, partially submerged in milky rose-petal bath water, the water barely covering her chest with rose petals strategically placed as minimal coverage, bubbles and flower petals floating around her, her hands reaching toward the viewer in an inviting gesture, soft natural light filtering through tropical foliage above, steam and soft bokeh creating a dreamlike atmosphere, Japanese anime style, anime cel shading, intimate artistic composition, overwhelmingly sweet sensuality, the most intimate and tender moment of complete vulnerability, high quality detailed
```

---

## 🎮 UI素材プロンプト

### ゲーム筐体アイコン：Splash Jigsaw（正方形 1:1）
```
a stylized arcade cabinet icon glowing with neon cyan and turquoise light, the screen shows a jigsaw puzzle piece shape, tropical beach scene visible through the puzzle piece silhouette, palm tree and ocean wave decorative elements, retro arcade cabinet shape with modern neon glow effects, dark background, Japanese anime game UI style, anime cel shading, icon design, vibrant neon colors, high quality detailed, 1:1 square aspect ratio
```

### ゲーム筐体アイコン：Coming Soon（正方形 1:1）
```
a dark silhouette of an arcade cabinet with a glowing question mark on the screen, faint purple neon outline, text "COMING SOON" in small neon letters below the screen, mysterious foggy dark background, locked padlock icon floating near the cabinet, Japanese anime game UI style, anime cel shading, icon design, muted colors with subtle neon accents, high quality detailed, 1:1 square aspect ratio
```

### ギャラリー用ロックアイコン（正方形 1:1）
```
a silhouette of a female figure in a mysterious pose, completely blacked out with no visible details, surrounded by a faint glowing pink and purple neon border, a small elegant golden padlock icon at the bottom center, dark background with subtle sparkles, Japanese anime style, anime cel shading, icon design, high quality detailed, 1:1 square aspect ratio
```

### タイトルロゴ（16:9）
```
elegant glowing neon text logo reading "Midnight Club Venus" in stylish cursive script, the word "Venus" is larger and more prominent with a venus symbol integrated into the design, neon pink and purple glow with subtle cyan accents, dark black background, small sparkle and star effects around the text, nightclub sign aesthetic, high quality detailed, logo design, 16:9 aspect ratio
```

---

## 📊 素材一覧チェックリスト

### キャラクター画像（24枚）

**★ = 最初に生成（参照画像なし）/ ☆ = @img1 参照あり**

| # | キャラ | 種類 | @img1 | ファイル名 |
|---|--------|------|-------|-----------|
| 1 | VENUS | バストアップ（会話用） | ★なし | venus/portrait.png |
| 2 | VENUS | フルボディ（ロビー用） | ☆あり | venus/fullbody.png |
| 3 | MARINA | バストアップ（会話用） | ★なし | marina/portrait.png |
| 4 | MARINA | Easy | ☆あり | marina/easy.jpg |
| 5 | MARINA | Normal | ☆あり | marina/normal.jpg |
| 6 | MARINA | Hard | ☆あり | marina/hard.jpg |
| 7 | MARINA | Expert | ☆あり | marina/expert.jpg |
| 8 | MARINA | Master | ☆あり | marina/master.jpg |
| 9 | LUNA | バストアップ（会話用） | ★なし | luna/portrait.png |
| 10 | LUNA | Easy | ☆あり | luna/easy.jpg |
| 11 | LUNA | Normal | ☆あり | luna/normal.jpg |
| 12 | LUNA | Hard | ☆あり | luna/hard.jpg |
| 13 | LUNA | Expert | ☆あり | luna/expert.jpg |
| 14 | LUNA | Master | ☆あり | luna/master.jpg |
| 15 | CORAL | バストアップ（会話用） | ★なし | coral/portrait.png |
| 16 | CORAL | Easy | ☆あり | coral/easy.jpg |
| 17 | CORAL | Normal | ☆あり | coral/normal.jpg |
| 18 | CORAL | Hard | ☆あり | coral/hard.jpg |
| 19 | CORAL | Expert | ☆あり | coral/expert.jpg |
| 20 | CORAL | Master | ☆あり | coral/master.jpg |

### 生成順序ガイド

```
VENUS:  ①portrait（★）→ ②fullbody（☆@img1=①）

MARINA: ③portrait（★）→ ④easy（☆@img1=③）→ ⑤normal → ⑥hard → ⑦expert → ⑧master

LUNA:   ⑨portrait（★）→ ⑩easy（☆@img1=⑨）→ ⑪normal → ⑫hard → ⑬expert → ⑭master

CORAL:  ⑮portrait（★）→ ⑯easy（☆@img1=⑮）→ ⑰normal → ⑱hard → ⑲expert → ⑳master
```

### 背景画像（7枚）
| # | 種類 | ファイル名 |
|---|------|-----------|
| 21 | ロビー背景 | backgrounds/lobby.jpg |
| 22 | 名前登録画面背景 | backgrounds/name-entry.jpg |
| 23 | Splash Jigsaw キャラ選択背景 | backgrounds/jigsaw-select.jpg |
| 24 | ギャラリー背景 | backgrounds/gallery.jpg |
| 25 | 会話背景：ビーチ昼（MARINA用） | backgrounds/dialogue-beach.jpg |
| 26 | 会話背景：ナイトプール（LUNA用） | backgrounds/dialogue-nightpool.jpg |
| 27 | 会話背景：トロピカルプール（CORAL用） | backgrounds/dialogue-tropical.jpg |

### UI素材（4枚）
| # | 種類 | ファイル名 |
|---|------|-----------|
| 28 | 筐体アイコン：Splash Jigsaw | ui/cabinet-jigsaw.png |
| 29 | 筐体アイコン：Coming Soon | ui/cabinet-comingsoon.png |
| 30 | ギャラリーロックアイコン | ui/lock-silhouette.png |
| 31 | タイトルロゴ | ui/title-logo.png |

**合計：31枚**

---
---

# PART 2: Suno AI 音楽プロンプト

---

## 🎵 BGM 1: ロビーテーマ「Velvet Midnight」

ゲームセンターのロビーで流れるBGM。大人の夜遊び感、ラウンジミュージック。
ループ再生を想定。

### 🎵 Suno AI Prompt (V5)

**【Title】**
Velvet Midnight

**【Style of Music】**
lo-fi house, chill lounge, smooth deep bass, mellow synth pads, subtle jazzy piano chords, late-night vibes, instrumental only, no vocals

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
rock, metal, aggressive, fast tempo, acoustic guitar, country, children's music

### 補足
- BPM: 90-105あたりのゆったりテンポ
- ネオンが光るクラブの雰囲気に合う、おしゃれで落ち着いたサウンド
- ループしても違和感がないよう、イントロとアウトロが自然につながる構成を意識
- 3〜5バージョン生成して、一番ループに合うやつを選ぶのがオススメ

---

## 🎵 BGM 2: パズルプレイ中「Tidal Glow」

パズルを解いてる時のBGM。ビーチ感＋集中できる心地よさ。

### 🎵 Suno AI Prompt (V5)

**【Title】**
Tidal Glow

**【Style of Music】**
tropical chill, lo-fi beats, soft steel drums, ambient ocean waves, warm synth pads, mellow ukulele, instrumental only, no vocals

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
rock, metal, aggressive, heavy drums, distortion, rap, harsh sounds

### 補足
- BPM: 80-95のリラックステンポ
- 波の音やトロピカル楽器で「ビーチにいる感」を演出
- パズルに集中できるよう、メロディは控えめでアンビエント寄りに

---

## 🎵 BGM 3: 会話シーン Easy〜Hard「Closer to You」

キャラとの会話シーンで流れるBGM。ドキドキ感＋親密さ。

### 🎵 Suno AI Prompt (V5)

**【Title】**
Closer to You

**【Style of Music】**
romantic R&B, intimate atmosphere, soft piano, gentle bass, warm pad synths, subtle finger snaps, dreamy, instrumental only, no vocals

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
rock, metal, EDM, fast tempo, aggressive, distortion, country

### 補足
- BPM: 70-85のスローテンポ
- キャラとの距離が縮まるドキドキ感を演出

---

## 🎵 BGM 4: 会話シーン Expert〜Master「Burning Silk」

高難易度の会話シーンで切り替わる、よりセクシーなBGM。

### 🎵 Suno AI Prompt (V5)

**【Title】**
Burning Silk

**【Style of Music】**
sensual R&B, dark intimate, breathy atmosphere, slow deep bass, sultry saxophone, soft reverb piano, whispered textures, instrumental only, no vocals

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
rock, metal, upbeat, cheerful, fast tempo, acoustic, country, children's music

### 補足
- BPM: 60-75の超スローテンポ
- サックスの色気が効いた大人のムード
- 「あ、BGM変わった…」ってプレイヤーが気づいてドキドキするのが狙い

---

## 🎵 BGM 5: クリア＋ギャラリー「Golden Reveal」

クリア演出やギャラリー閲覧時のBGM。達成感＋ご褒美感。

### 🎵 Suno AI Prompt (V5)

**【Title】**
Golden Reveal

**【Style of Music】**
future funk, disco pop, bright synths, funky bass guitar, sparkling arpeggios, celebratory mood, uplifting energy, instrumental only, no vocals

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
metal, sad, melancholic, slow, dark, aggressive, acoustic

### 補足
- BPM: 115-125のやや速めの気持ちいいテンポ
- 「やったー！」感のあるキラキラサウンド
- ギャラリーで眺めてるときも心地よく流れる

---

## 🎵 SE（効果音）について

Sunoは楽曲向きなので、効果音は別のフリー素材サイトから取得するのがオススメ：

| # | 効果音 | 用途 | 推奨サイト |
|---|--------|------|-----------|
| 1 | ピース配置音（カチッ） | ジグソーでピースが正しい位置にハマった時 | freesound.org |
| 2 | パズルクリアファンファーレ | パズル完成時のジングル（3〜5秒） | freesound.org |
| 3 | ステージアンロック音 | 次の難易度が解放された時 | freesound.org |
| 4 | テキスト表示音（ポポポ…） | 会話シーンの文字表示音 | freesound.org |
| 5 | ボタンクリック音 | UI操作時 | freesound.org |
| 6 | ドアオープン音 | 名前登録後のロビー遷移 | freesound.org |
| 7 | ギャラリー追加音（キラーン） | イラストがコレクションに追加された時 | freesound.org |

---

## 📝 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-03-26 | v1.0 | 初版作成 |
| 2026-03-26 | v1.1 | スタイルを日本アニメ風に変更。立ち絵以外に @img1 参照を追加。生成順序ガイドを追記 |
