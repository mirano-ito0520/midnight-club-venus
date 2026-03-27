/* ============================================
   Secret Games — Slots, Quiz, Roulette, King, Ban
   ============================================ */

/* BAN_KEY, isBanned, setBanned, showBannedScene, triggerPunishment are in app.js */

/* ---- King Service (Milano VIP tap) ---- */
const KingService = (() => {
  const kingImages = {
    marina: 'assets/images/characters/king/marina.png',
    luna: 'assets/images/characters/king/luna.png',
    coral: 'assets/images/characters/king/coral.png',
    venus: 'assets/images/characters/king/venus.png',
    neon: 'assets/images/characters/king/neon.png',
  };

  const serviceLines = {
    marina: [
      { speaker: 'MARINA', text: 'ミラノさん…♡ 今日はあたしが特別にお世話させてもらいますね…' },
      { speaker: 'MARINA', text: 'オーナーさんだけの…特別サービス。受け取ってくれますか…？♡' },
    ],
    luna: [
      { speaker: 'LUNA', text: 'ミラノさん…こうして二人きりになれるなんて…' },
      { speaker: 'LUNA', text: '今夜は…私のすべてでお仕えします。……覚悟してくださいね♡' },
    ],
    coral: [
      { speaker: 'CORAL', text: 'ミラノさん♡ お姉さんがぜーんぶしてあげる…' },
      { speaker: 'CORAL', text: 'オーナーさんだけに見せる特別な姿…見てくれますか…？♡' },
    ],
    venus: [
      { speaker: 'VENUS', text: 'ミラノさん……。いつもこのクラブを見守ってくれてありがとう。' },
      { speaker: 'VENUS', text: '今夜だけは……ヴィーナスとしてではなく、一人の女として——あなたの傍に♡' },
    ],
    neon: [
      { speaker: 'NEON', text: 'ミラノさん…♡ 今夜はあたしが専属DJだよ…' },
      { speaker: 'NEON', text: 'この曲…ミラノさんだけのために作ったの。…聴いて♡' },
    ],
  };

  function show(charId) {
    const lines = serviceLines[charId];
    const kingImg = kingImages[charId];
    const portraitImg = charId === 'venus'
      ? 'assets/images/characters/venus/portrait.png'
      : `assets/images/characters/${charId}/portrait.png`;

    // Preload king image so it shows instantly later
    const preload = new Image();
    preload.src = kingImg;

    // Remove any previous king overlay
    const old = document.getElementById('king-overlay');
    if (old) old.remove();

    // Create a full-screen overlay that sits on top of everything
    const overlay = document.createElement('div');
    overlay.id = 'king-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9999',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'background:rgba(5,0,15,0.97)',
    ].join(';');
    document.body.appendChild(overlay);

    // Character portrait
    const img = document.createElement('img');
    img.src = portraitImg;
    img.style.cssText = [
      'max-height:55vh', 'max-width:85%', 'object-fit:contain',
      'filter:drop-shadow(0 0 20px rgba(255,215,0,0.3))',
      'margin-bottom:12px',
    ].join(';');
    overlay.appendChild(img);

    // Dialogue box
    const dlg = document.createElement('div');
    dlg.style.cssText = [
      'position:absolute', 'bottom:0', 'left:0', 'right:0',
      'padding:20px 16px 36px',
      'background:linear-gradient(to top,rgba(10,10,20,0.97) 60%,transparent)',
    ].join(';');
    overlay.appendChild(dlg);

    let lineIdx = 0;

    function renderLine() {
      dlg.innerHTML = `
        <div style="font-family:'Cinzel',serif;font-size:13px;color:#d4af37;letter-spacing:2px;margin-bottom:6px;">${lines[lineIdx].speaker}</div>
        <div style="font-size:14px;line-height:1.8;color:#eee;">${lines[lineIdx].text}</div>
        <div style="font-size:11px;color:#888;text-align:right;margin-top:8px;">Tap ▶</div>
      `;
    }
    renderLine();

    // Handle advancing — use a tap zone covering the whole overlay
    function advance() {
      lineIdx++;
      if (lineIdx < lines.length) {
        // Next dialogue line
        renderLine();
      } else if (lineIdx === lines.length) {
        // Swap to king image
        img.src = kingImg;
        img.style.filter = 'drop-shadow(0 0 30px rgba(255,215,0,0.5))';
        dlg.innerHTML = `
          <div style="text-align:center;padding:12px;">
            <div style="font-size:12px;color:#d4af37;letter-spacing:3px;margin-bottom:8px;">👑 KING SERVICE 👑</div>
            <div style="font-size:11px;color:#888;">Tap to close</div>
          </div>
        `;
      } else {
        // Close
        overlay.remove();
      }
    }

    // Delay listener attachment to avoid the triggering tap
    setTimeout(() => {
      overlay.addEventListener('click', advance);
      overlay.addEventListener('touchend', (e) => {
        e.preventDefault();   // prevent ghost click
        advance();
      }, { passive: false });
    }, 350);
  }

  return { show, kingImages };
})();

const ROULETTE_IMGS = {
  marina: 'assets/images/characters/roulette/marina.png',
  luna: 'assets/images/characters/roulette/luna.png',
  coral: 'assets/images/characters/roulette/coral.png',
  neon: 'assets/images/characters/roulette/neon.png',
  venus: 'assets/images/characters/roulette/venus.png',
};

// Weighted symbol pool: venus is rare (8%), neon slightly rare (17%)
const REEL_POOL = [
  'marina','marina','marina',
  'luna','luna','luna',
  'coral','coral','coral',
  'neon','neon', // 2 out of 12
  'venus', // 1 out of 12 ≈ 8%
];

function randomSymbol() {
  return REEL_POOL[Math.floor(Math.random() * REEL_POOL.length)];
}

/* ---- Slot Machine (VIP / QUEEN入場) ---- */
const SlotMachine = (() => {
  let spinning = false;
  let spinCount = 0;

  function start() {
    App.goTo('slots', { bgm: 'gallery' });
    spinning = false;
    spinCount = 0;

    document.getElementById('slots-venus-msg').textContent = '「運命を試してみる？♡」';
    document.getElementById('slots-count').textContent = '';
    for (let i = 0; i < 3; i++) {
      const r = document.getElementById(`reel-${i}`);
      r.innerHTML = '<span style="font-size:28px;color:var(--text-muted);">?</span>';
      r.className = 'slots-reel';
    }

    document.getElementById('slots-spin-btn').onclick = spin;
    document.getElementById('slots-back-btn').onclick = () => {
      App.SE.play('button-click');
      openVenusProfile();
    };
  }

  function setReelImg(index, symbol) {
    const r = document.getElementById(`reel-${index}`);
    r.innerHTML = `<img src="${ROULETTE_IMGS[symbol]}" alt="${symbol}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    spinCount++;
    App.SE.play('button-click');

    const msgEl = document.getElementById('slots-venus-msg');
    msgEl.textContent = '「回して…♡」';

    // Spinning animation
    for (let i = 0; i < 3; i++) {
      document.getElementById(`reel-${i}`).className = 'slots-reel spinning';
    }

    const spinInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        setReelImg(i, randomSymbol());
      }
    }, 100);

    // Determine results
    const results = [randomSymbol(), randomSymbol(), randomSymbol()];

    // Stop reels one by one
    setTimeout(() => stopReel(0, results[0], spinInterval), 800);
    setTimeout(() => stopReel(1, results[1], null), 1400);
    setTimeout(() => finishSpin(results), 2100);

    function stopReel(idx, symbol, interval) {
      if (interval) clearInterval(interval);
      setReelImg(idx, symbol);
      document.getElementById(`reel-${idx}`).className = 'slots-reel';
      App.SE.play('piece-snap');
    }
  }

  function finishSpin(results) {
    // Stop last reel
    setReelImg(2, results[2]);
    document.getElementById('reel-2').className = 'slots-reel';
    App.SE.play('piece-snap');

    spinning = false;
    document.getElementById('slots-count').textContent = `Spins: ${spinCount}`;

    const msgEl = document.getElementById('slots-venus-msg');
    const allSame = results[0] === results[1] && results[1] === results[2];
    const isVenusJackpot = allSame && results[0] === 'venus';
    const isGirlJackpot = allSame && results[0] !== 'venus';

    if (isVenusJackpot) {
      // VENUS×3 = QUEEN直行！
      for (let i = 0; i < 3; i++) {
        document.getElementById(`reel-${i}`).className = 'slots-reel jackpot';
      }
      App.SE.play('puzzle-clear');
      msgEl.innerHTML = '「！！！……まさか、VENUSを3つ…？<br>あなた…特別中の特別よ——QUEEN\'s CHAMBERへ♡」';
      Storage.set('vipUnlocked', true);
      Storage.set('vip_marina', true);
      Storage.set('vip_luna', true);
      Storage.set('vip_coral', true);
      Storage.set('vip_neon', true);
      Storage.set('queenUnlocked', true);
      setTimeout(() => openQueenGallery(), 3000);
    } else if (isGirlJackpot) {
      // Girls×3 = その子だけVIP解放
      for (let i = 0; i < 3; i++) {
        document.getElementById(`reel-${i}`).className = 'slots-reel jackpot';
      }
      App.SE.play('puzzle-clear');
      const charId = results[0];
      const name = charId.toUpperCase();
      Storage.set('vipUnlocked', true);
      Storage.set(`vip_${charId}`, true);
      msgEl.textContent = `「${name}が3つ…！おめでとう♡ ${name}のVIPを解放するわ」`;
      setTimeout(() => openSecretGallery(), 2500);
    } else {
      // ハズレ
      const matchCount = Math.max(
        results.filter(s => s === results[0]).length,
        results.filter(s => s === results[1]).length,
      );
      if (matchCount === 2) {
        const hasPair = results.filter(s => s === 'venus').length === 2;
        if (hasPair) {
          msgEl.textContent = '「VENUS2つ…！あと一つで奇跡が…♡」';
        } else {
          msgEl.textContent = '「惜しい…！あと一つだったのに♡」';
        }
      } else {
        const msgs = [
          '「残念…でも諦めないで？」',
          '「ふふ、焦らないで♡」',
          '「運命はまだ微笑んでないわね」',
          '「次こそ…かもよ？♡」',
        ];
        msgEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
      }
    }
  }

  return { start };
})();

/* ---- Profile Quiz (QUEEN入場 Step 1&2) ---- */
const ProfileQuiz = (() => {
  let questions = [];
  let currentQ = 0;
  let phase = '';
  let onComplete = null;

  const characterQuestions = [
    { q: 'MARINAの趣味に含まれるのは？', options: ['サーフィン', 'ピアノ', '読書', 'ヨガ'], answer: 0 },
    { q: 'LUNAの瞳の色は？', options: ['ブルー', 'グリーン', 'バイオレット', 'ゴールド'], answer: 2 },
    { q: 'CORALの好きなものに含まれるのは？', options: ['海', '月明かり', 'ピンク色のもの全部', 'ミステリー小説'], answer: 2 },
    { q: 'MARINAの性格として正しいのは？', options: ['クール', '天真爛漫', 'おっとり', '意味深'], answer: 1 },
    { q: 'LUNAの身長は？', options: ['158cm', '163cm', '168cm', '172cm'], answer: 2 },
    { q: 'CORALの年齢は？', options: ['19歳', '20歳', '21歳', '22歳'], answer: 3 },
    { q: 'MARINAの好きなものに含まれるのは？', options: ['ワイン', 'トロピカルジュース', 'スイーツ', 'カクテル'], answer: 1 },
    { q: 'LUNAの趣味に含まれるのは？', options: ['ガーデニング', 'ビーチバレー', '夜景巡り', 'お菓子作り'], answer: 2 },
    { q: 'CORALの趣味に含まれるのは？', options: ['サーフィン', '人間観察', 'アロマテラピー', '読書'], answer: 2 },
  ];

  const venusQuestions = [
    { q: 'VENUSの瞳の色は？', options: ['バイオレット', 'ゴールド', 'ブルー', 'シルバー'], answer: 1 },
    { q: 'VENUSの身長は？', options: ['163cm', '168cm', '172cm', '175cm'], answer: 2 },
    { q: 'VENUSの趣味に含まれるのは？', options: ['サーフィン', '占い', 'ガーデニング', 'ヨガ'], answer: 1 },
    { q: 'VENUSの好きなものに含まれるのは？', options: ['太陽', 'ピンク色', '月夜', 'スイーツ'], answer: 2 },
    { q: 'VENUSの年齢は？', options: ['25歳', '???', '22歳', '永遠の21歳'], answer: 1 },
    { q: 'VENUSの衣装は？', options: ['メイド服', 'バニースーツ', 'チャイナドレス', 'ナース服'], answer: 1 },
  ];

  function startCharacterQuiz(callback) {
    phase = 'characters';
    questions = shuffle([...characterQuestions]).slice(0, 5);
    currentQ = 0;
    onComplete = callback;
    App.goTo('quiz');
    showQuestion();
  }

  function startVenusQuiz(callback) {
    phase = 'venus';
    questions = shuffle([...venusQuestions]).slice(0, 4);
    currentQ = 0;
    onComplete = callback;
    showQuestion();
  }

  function showQuestion() {
    document.getElementById('quiz-title').textContent = phase === 'characters' ? 'CHARACTER QUIZ' : 'VENUS QUIZ';
    document.getElementById('quiz-progress').textContent = `${currentQ + 1} / ${questions.length}`;
    document.getElementById('quiz-question').textContent = questions[currentQ].q;
    document.getElementById('quiz-result').textContent = '';

    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';

    questions[currentQ].options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      optContainer.appendChild(btn);
    });
  }

  function selectAnswer(index, btn) {
    const correct = questions[currentQ].answer;
    const resultEl = document.getElementById('quiz-result');
    const allBtns = document.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (index === correct) {
      btn.className = 'quiz-option-btn correct';
      resultEl.style.color = '#00e676';
      resultEl.textContent = '正解！';
      App.SE.play('piece-snap');

      setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
          showQuestion();
        } else if (phase === 'characters') {
          resultEl.textContent = 'キャラクタークイズ クリア！次はVENUSクイズ…';
          resultEl.style.color = 'var(--neon-gold)';
          setTimeout(() => startVenusQuiz(onComplete), 1500);
        } else {
          resultEl.textContent = '全問正解！最後の試練へ…';
          resultEl.style.color = 'var(--neon-gold)';
          App.SE.play('stage-unlock');
          setTimeout(() => { if (onComplete) onComplete(); }, 1500);
        }
      }, 1000);
    } else {
      btn.className = 'quiz-option-btn wrong';
      allBtns[correct].className = 'quiz-option-btn correct';
      resultEl.style.color = '#ff4444';
      resultEl.textContent = '不正解…最初からやり直し';
      App.SE.play('button-click');
      setTimeout(() => startCharacterQuiz(onComplete), 2000);
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return { startCharacterQuiz };
})();

/* ---- Midnight Roulette (QUEEN入場 Step 3) ---- */
const MidnightRoulette = (() => {
  let streak = 0;
  const GOAL = 10;

  const msgs = {
    correct: [
      '「正解…♡ やるわね」',
      '「ふふ、勘がいいのね」',
      '「続けて…次はどう？」',
      '「あら、すごいじゃない」',
      '「まだまだよ…♡」',
    ],
    wrong: [
      '「残念…ハズレよ♡」',
      '「ふふ、甘いわね」',
      '「運命は気まぐれよ」',
    ],
    almost: '「あと少し…集中して♡」',
    win: '「……まさか、本当にクリアするなんて。\nあなた、特別ね——QUEENの間へどうぞ♡」',
  };

  function start() {
    streak = 0;
    App.goTo('roulette', { bgm: 'gallery' });
    updateUI();
    document.getElementById('roulette-msg').textContent = '「右か左か…運命を選んで？」';

    document.getElementById('roulette-left').onclick = () => choose('left');
    document.getElementById('roulette-right').onclick = () => choose('right');
    document.getElementById('roulette-back-btn').onclick = () => {
      App.SE.play('button-click');
      openSecretGallery();
    };
  }

  function choose(side) {
    const answer = Math.random() < 0.5 ? 'left' : 'right';
    const leftBtn = document.getElementById('roulette-left');
    const rightBtn = document.getElementById('roulette-right');
    leftBtn.disabled = true;
    rightBtn.disabled = true;

    const msgEl = document.getElementById('roulette-msg');

    if (side === answer) {
      streak++;
      App.SE.play('piece-snap');

      if (streak >= GOAL) {
        msgEl.style.whiteSpace = 'pre-line';
        msgEl.textContent = msgs.win;
        document.getElementById('roulette-streak').textContent = `${streak} / ${GOAL} ✨`;
        App.SE.play('puzzle-clear');
        Storage.set('queenUnlocked', true);
        setTimeout(() => openQueenGallery(), 3000);
        return;
      }

      msgEl.textContent = streak >= 7 ? msgs.almost : msgs.correct[Math.floor(Math.random() * msgs.correct.length)];
    } else {
      msgEl.textContent = msgs.wrong[Math.floor(Math.random() * msgs.wrong.length)];
      App.SE.play('button-click');
      streak = 0;
    }

    setTimeout(() => {
      leftBtn.disabled = false;
      rightBtn.disabled = false;
      updateUI();
    }, 800);
  }

  function updateUI() {
    document.getElementById('roulette-streak').textContent = `${streak} / ${GOAL}`;
  }

  return { start };
})();

/* ---- Developer Mode: ミラノ ---- */
function isMilanoMode() {
  return Storage.get('playerName') === 'ミラノ';
}

function applyMilanoMode() {
  if (!isMilanoMode()) return;
  // Unlock absolutely everything
  const chars = ['marina', 'luna', 'coral', 'neon'];
  const diffs = ['easy', 'normal', 'hard', 'expert', 'master'];
  chars.forEach(c => diffs.forEach(d => Storage.setProgress(c, d, { cleared: true, bestTime: 1, bestScore: 99999 })));
  Storage.set('vipUnlocked', true);
  Storage.set('queenUnlocked', true);
  // VIP個別フラグはセットしない（ミラノモードはisMilanoMode()で常時全解放）
}

/* ---- VENUS Profile (entry point) ---- */
function openVenusProfile() {
  const modal = document.getElementById('venus-profile-modal');
  const info = document.getElementById('venus-profile-info');
  const hint = document.getElementById('venus-secret-hint');

  fetch('data/characters.json').then(r => r.json()).then(chars => {
    const v = chars.venus.profile;
    info.innerHTML = `
      <div class="profile-name">VENUS</div>
      <div class="profile-name-jp">ヴィーナス</div>
      <div class="profile-stats">
        <div class="profile-row"><span class="profile-label">Age</span><span>${v.age}</span></div>
        <div class="profile-row"><span class="profile-label">Height</span><span>${v.height}</span></div>
        <div class="profile-row"><span class="profile-label">Hobby</span><span>${v.hobby}</span></div>
        <div class="profile-row"><span class="profile-label">Likes</span><span>${v.likes}</span></div>
      </div>
      <div class="profile-quote">"${v.quote}"</div>
      <div class="profile-personality">${v.personality}</div>
    `;
  });

  hint.textContent = '';
  let venusTaps = 0;
  const portraitImg = modal.querySelector('.venus-profile-img');
  portraitImg.onclick = () => {
    venusTaps++;
    if (venusTaps === 3) {
      hint.innerHTML = '<div style="color:var(--neon-pink);font-size:12px;">「あら…何か探してるの？♡」</div>';
      setTimeout(() => {
        modal.style.display = 'none';
        SlotMachine.start();
      }, 800);
    }
  };

  modal.style.display = 'flex';
  document.getElementById('venus-profile-close').onclick = () => {
    modal.style.display = 'none';
    portraitImg.onclick = null;
  };
}

/* ---- VIP Gallery ---- */
function openSecretGallery() {
  App.goTo('secret-gallery', { bgm: 'gallery' });

  const grid = document.getElementById('secret-gallery-grid');
  grid.innerHTML = '';

  const items = [
    { label: 'MARINA — VIP', src: 'assets/images/characters/vip/marina-vip.png', charId: 'marina' },
    { label: 'LUNA — VIP', src: 'assets/images/characters/vip/luna-vip.png', charId: 'luna' },
    { label: 'CORAL — VIP', src: 'assets/images/characters/vip/coral-vip.png', charId: 'coral' },
    { label: 'NEON — VIP', src: 'assets/images/characters/vip/neon-vip.png', charId: 'neon' },
  ];

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'secret-gallery-item';
    // ミラノモードは全解放、通常は個別フラグで判定
    const unlocked = isMilanoMode() || Storage.get(`vip_${item.charId}`) === true;

    if (unlocked) {
      el.innerHTML = `
        <img src="${item.src}" alt="${item.label}">
        <div class="secret-item-label">${item.label}</div>
      `;
      el.addEventListener('click', () => {
        if (isMilanoMode() && item.charId) {
          KingService.show(item.charId);
        } else {
          openSecretLightbox(item.src);
        }
      });
    } else {
      el.style.border = '1px dashed var(--neon-pink)';
      el.style.opacity = '0.5';
      el.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:8px;padding:16px;">
          <span style="font-size:28px;">🔒</span>
          <span style="font-size:11px;color:var(--neon-pink);text-align:center;">${item.label}<br>Spin to unlock</span>
        </div>
      `;
    }
    grid.appendChild(el);
  });

  // QUEEN entry (doubles as VENUS King service in Milano mode)
  const queenEntry = document.createElement('div');
  queenEntry.className = 'secret-gallery-item';
  if (Storage.get('queenUnlocked')) {
    queenEntry.innerHTML = `
      <img src="assets/images/characters/queen/venus-queen.png" alt="QUEEN">
      <div class="secret-item-label">👑 QUEEN</div>
    `;
    queenEntry.addEventListener('click', () => {
      if (isMilanoMode()) {
        // Milano: VENUS king service first, then queen image
        KingService.show('venus');
      } else {
        openSecretLightbox('assets/images/characters/queen/venus-queen.png');
      }
    });
  } else {
    queenEntry.style.border = '1px dashed var(--neon-pink)';
    queenEntry.style.opacity = '0.6';
    queenEntry.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:8px;padding:16px;">
        <span style="font-size:32px;">👑</span>
        <span style="font-size:11px;color:var(--neon-pink);text-align:center;">QUEEN's CHAMBER<br>Tap to challenge</span>
      </div>
    `;
    queenEntry.addEventListener('click', () => {
      App.SE.play('button-click');
      ProfileQuiz.startCharacterQuiz(() => {
        MidnightRoulette.start();
      });
    });
  }
  grid.appendChild(queenEntry);

  document.getElementById('secret-gallery-back').onclick = () => {
    App.SE.play('button-click');
    App.goTo('lobby', { bgm: 'lobby', noHistory: true });
    Lobby.init();
  };
}

/* ---- QUEEN Gallery (lightbox) ---- */
function openQueenGallery() {
  openSecretLightbox('assets/images/characters/queen/venus-queen.png');
}

/* ---- Shared lightbox for secret galleries ---- */
function openSecretLightbox(src) {
  const lightbox = document.getElementById('gallery-lightbox');
  document.getElementById('gallery-lightbox-img').src = src;
  document.getElementById('lightbox-fav').style.display = 'none';
  const overlay = document.getElementById('profile-overlay');
  if (overlay) overlay.style.display = 'none';
  lightbox.style.display = 'flex';
  document.getElementById('lightbox-close').onclick = () => {
    lightbox.style.display = 'none';
    document.getElementById('lightbox-fav').style.display = '';
  };
}
