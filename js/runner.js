/* ============================================
   Midnight Run — Side-scrolling Runner Game
   ============================================ */

/* ---- Difficulty Select ---- */
const RunnerDiffSelect = (() => {
  let characters = null;

  async function init() {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }
    render();
  }

  function render() {
    const grid = document.getElementById('runner-diff-grid');
    grid.innerHTML = '';

    const diffs = characters.difficulties;
    const TARGETS = { easy: 3000, normal: 6000, hard: 10000, expert: 15000, master: 25000, vip: 35000 };

    diffs.forEach((diff, idx) => {
      // VIP is NEON-only (skip for jigsaw chars that don't have it)
      if (diff.id === 'vip') return;

      const progress = Storage.getProgress('neon', diff.id);
      const cleared = progress?.cleared;
      const prevCleared = idx === 0 || Storage.getProgress('neon', diffs[idx - 1].id)?.cleared;

      const card = document.createElement('div');
      card.className = 'runner-diff-card' + (cleared ? ' cleared' : '') + (!prevCleared ? ' locked' : '');
      card.innerHTML = `
        <div class="runner-diff-left">
          <div class="runner-diff-name">${diff.name}</div>
          <div class="runner-diff-stars">${diff.stars}</div>
        </div>
        <div class="runner-diff-right">
          <div class="runner-diff-target">TARGET: ${TARGETS[diff.id].toLocaleString()}</div>
          ${progress?.bestScore ? `<div class="runner-diff-best">BEST: ${progress.bestScore.toLocaleString()}</div>` : ''}
        </div>
      `;

      if (prevCleared) {
        card.addEventListener('click', () => {
          App.SE.play('button-click');
          RunnerGame.start(diff.id, TARGETS[diff.id]);
        });
      }

      grid.appendChild(card);
    });

    // VIP card — unlocked after all 5 difficulties cleared
    const allCleared = ['easy','normal','hard','expert','master'].every(
      d => Storage.getProgress('neon', d)?.cleared
    );
    const vipProgress = Storage.getProgress('neon', 'vip');
    const vipCard = document.createElement('div');
    vipCard.className = 'runner-diff-card' + (vipProgress?.cleared ? ' cleared' : '') + (!allCleared ? ' locked' : '');
    vipCard.style.borderColor = allCleared ? 'var(--neon-gold)' : '';
    vipCard.innerHTML = `
      <div class="runner-diff-left">
        <div class="runner-diff-name" style="color:var(--neon-gold);">★ VIP ★</div>
        <div class="runner-diff-stars">★★★★★★</div>
      </div>
      <div class="runner-diff-right">
        <div class="runner-diff-target">TARGET: ${TARGETS.vip.toLocaleString()}</div>
        ${vipProgress?.bestScore ? `<div class="runner-diff-best">BEST: ${vipProgress.bestScore.toLocaleString()}</div>` : ''}
      </div>
    `;
    if (allCleared) {
      vipCard.addEventListener('click', () => {
        App.SE.play('button-click');
        RunnerGame.start('vip', TARGETS.vip);
      });
    }
    grid.appendChild(vipCard);

    document.getElementById('runner-diff-back').onclick = () => {
      App.SE.play('button-click');
      App.goTo('lobby', { bgm: 'lobby', noHistory: true });
      Lobby.init();
    };
  }

  return { init };
})();

/* ---- Runner Game Engine ---- */
const RunnerGame = (() => {
  const DIFF_CONFIG = {
    easy:   { baseSpeed: 4,   speedUp: 0.0008, obsDensity: 0.012, itemDensity: 0.015 },
    normal: { baseSpeed: 5,   speedUp: 0.0012, obsDensity: 0.015, itemDensity: 0.013 },
    hard:   { baseSpeed: 6,   speedUp: 0.0016, obsDensity: 0.018, itemDensity: 0.011 },
    expert: { baseSpeed: 7,   speedUp: 0.0020, obsDensity: 0.022, itemDensity: 0.010 },
    master: { baseSpeed: 8.5, speedUp: 0.0025, obsDensity: 0.026, itemDensity: 0.009 },
    vip:    { baseSpeed: 8.5, speedUp: 0.003,  obsDensity: 0.028, itemDensity: 0.008 },
  };

  const GRAVITY = 0.6;
  const JUMP_FORCE = -13;
  const HOLD_BOOST = -0.4;
  const MAX_JUMP_VY = -18;
  const CHAR_W = 60;
  const CHAR_H = 80;
  const GROUND_OFFSET = 50;

  const OBS_TYPES = [
    { name: 'chair', w: 40, h: 35, color: '#ff6b6b', emoji: '🪑' },
    { name: 'drunk', w: 35, h: 55, color: '#ffa94d', emoji: '🕺' },
    { name: 'rope',  w: 55, h: 25, color: '#e599f7', emoji: '🚧' },
  ];

  const ITEM_TYPES = [
    { name: 'crystal',  value: 100,  weight: 60, color: '#00e5ff', emoji: '💎', size: 22 },
    { name: 'cocktail', value: 300,  weight: 30, color: '#ff69b4', emoji: '🍸', size: 24 },
    { name: 'crown',    value: 1000, weight: 10, color: '#ffd700', emoji: '👑', size: 26 },
  ];

  // State
  let canvas, ctx, animId;
  let diffId, targetScore, config;
  let charX, charY, charVY, groundY, isJumping, holdingJump;
  let speed, score, bestScore, gameOver, targetReached;
  let obstacles, items, particles;
  let frameCount;
  let runImg, jumpImg, stageImg, galleryImg;
  let galleryAlpha, galleryFadeDir, galleryTimer;
  let bgScrollX;

  function loadImg(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function start(diff, target) {
    diffId = diff;
    targetScore = target;
    config = DIFF_CONFIG[diff];

    Dialogue.start({
      characterId: 'neon',
      difficulty: diff,
      timing: 'before',
      callback: () => startGame(),
    });
  }

  async function startGame() {
    // Load all images
    [runImg, jumpImg, stageImg] = await Promise.all([
      loadImg('assets/images/characters/neon/run.png'),
      loadImg('assets/images/characters/neon/jump.png'),
      loadImg('assets/images/backgrounds/neonrun-stage.png'),
    ]);

    // Preload gallery reward image
    galleryImg = null;
    galleryAlpha = 0;
    galleryFadeDir = 0; // 0=inactive, 1=fading in, -1=fading out
    galleryTimer = 0;
    const galSrc = `assets/images/characters/neon/${diffId}.png`;
    loadImg(galSrc).then(img => { galleryImg = img; });

    // Switch to runner scene with BGM
    App.goTo('runner', { bgm: 'runner' });

    // Setup canvas
    canvas = document.getElementById('runner-canvas');
    const area = document.getElementById('runner-area');
    canvas.width = area.clientWidth;
    canvas.height = area.clientHeight;
    ctx = canvas.getContext('2d');

    // Init state
    groundY = canvas.height - GROUND_OFFSET;
    charX = 60;
    charY = groundY - CHAR_H;
    charVY = 0;
    isJumping = false;
    holdingJump = false;
    speed = config.baseSpeed;
    score = 0;
    const progress = Storage.getProgress('neon', diffId);
    bestScore = progress?.bestScore || 0;
    gameOver = false;
    targetReached = false;
    obstacles = [];
    items = [];
    particles = [];
    frameCount = 0;
    bgScrollX = 0;

    updateHUD();
    bindInput();
    bindExit();
    animId = requestAnimationFrame(gameLoop);
  }

  // ---- Input ----
  let inputBound = false;
  function bindInput() {
    if (inputBound) return;
    inputBound = true;
    canvas.addEventListener('touchstart', onPress, { passive: false });
    canvas.addEventListener('touchend', onRelease, { passive: false });
    canvas.addEventListener('mousedown', onPress);
    canvas.addEventListener('mouseup', onRelease);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  function unbindInput() {
    inputBound = false;
    canvas.removeEventListener('touchstart', onPress);
    canvas.removeEventListener('touchend', onRelease);
    canvas.removeEventListener('mousedown', onPress);
    canvas.removeEventListener('mouseup', onRelease);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
  }

  function onPress(e) { e.preventDefault(); if (!gameOver) { jump(); holdingJump = true; } }
  function onRelease(e) { if (e.preventDefault) e.preventDefault(); holdingJump = false; }
  function onKeyDown(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault(); if (!gameOver) { jump(); holdingJump = true; }
    }
  }
  function onKeyUp(e) { if (e.code === 'Space' || e.code === 'ArrowUp') holdingJump = false; }

  function jump() {
    if (charY >= groundY - CHAR_H - 2) {
      charVY = JUMP_FORCE;
      isJumping = true;
      App.SE.play('piece-snap');
    }
  }

  // ---- Game Loop ----
  function gameLoop() {
    if (gameOver) return;
    update();
    draw();
    animId = requestAnimationFrame(gameLoop);
  }

  function update() {
    frameCount++;
    speed += config.speedUp;
    score += Math.floor(speed * 0.5);

    // Background scroll
    bgScrollX = (bgScrollX + speed * 0.5) % (stageImg ? stageImg.width : canvas.width);

    // Physics
    if (isJumping) {
      if (holdingJump && charVY < 0) {
        charVY += HOLD_BOOST;
        if (charVY < MAX_JUMP_VY) charVY = MAX_JUMP_VY;
      }
      charVY += GRAVITY;
      charY += charVY;
      if (charY >= groundY - CHAR_H) {
        charY = groundY - CHAR_H;
        charVY = 0;
        isJumping = false;
      }
    }

    // Spawn
    if (Math.random() < config.obsDensity && canSpawn()) spawnObstacle();
    if (Math.random() < config.itemDensity && canSpawn()) spawnItem();

    // Move
    obstacles.forEach(o => { o.x -= speed; });
    obstacles = obstacles.filter(o => o.x + o.w > -20);
    items.forEach(i => { i.x -= speed; });
    items = items.filter(i => i.x + i.size > -20);

    // Particles
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; });
    particles = particles.filter(p => p.life > 0);

    // Collision: obstacles
    const hb = { x: charX + 8, y: charY + 8, w: CHAR_W - 16, h: CHAR_H - 12 };
    for (const o of obstacles) {
      if (aabb(hb, { x: o.x + 4, y: o.y + 4, w: o.w - 8, h: o.h - 8 })) {
        endGame();
        return;
      }
    }

    // Collision: items
    items = items.filter(i => {
      if (aabb(hb, { x: i.x, y: i.y, w: i.size, h: i.size })) {
        score += i.value;
        App.SE.play('piece-snap');
        for (let p = 0; p < 6; p++) {
          particles.push({
            x: i.x + i.size / 2, y: i.y + i.size / 2,
            vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
            color: i.color, life: 20,
          });
        }
        return false;
      }
      return true;
    });

    // Target score reached — trigger gallery image
    if (!targetReached && score >= targetScore) {
      targetReached = true;
      galleryFadeDir = 1; // start fade in
      galleryAlpha = 0;
      galleryTimer = 0;
      const prev = Storage.getProgress('neon', diffId);
      const best = Math.max(score, prev?.bestScore || 0);
      Storage.setProgress('neon', diffId, { cleared: true, bestScore: best });
      App.SE.play('puzzle-clear');
    }

    // Gallery image fade logic: fade in → hold 2.5s → fade out
    if (galleryFadeDir === 1) {
      galleryAlpha += 0.02;
      if (galleryAlpha >= 0.6) {
        galleryAlpha = 0.6;
        galleryFadeDir = 2; // hold phase
        galleryTimer = 0;
      }
    } else if (galleryFadeDir === 2) {
      galleryTimer++;
      if (galleryTimer >= 150) { // ~2.5 seconds at 60fps
        galleryFadeDir = -1; // start fade out
      }
    } else if (galleryFadeDir === -1) {
      galleryAlpha -= 0.015;
      if (galleryAlpha <= 0) {
        galleryAlpha = 0;
        galleryFadeDir = 0; // done
      }
    }

    updateHUD();
  }

  function canSpawn() {
    if (obstacles.length === 0) return true;
    const last = obstacles[obstacles.length - 1];
    return last.x < canvas.width - 180 / (speed / config.baseSpeed);
  }

  function spawnObstacle() {
    const type = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
    obstacles.push({
      x: canvas.width + 20, y: groundY - type.h,
      w: type.w, h: type.h, color: type.color, emoji: type.emoji,
    });
  }

  function spawnItem() {
    const roll = Math.random() * 100;
    let cumulative = 0, type = ITEM_TYPES[0];
    for (const t of ITEM_TYPES) { cumulative += t.weight; if (roll < cumulative) { type = t; break; } }
    const airborne = Math.random() < 0.4;
    items.push({
      x: canvas.width + 20,
      y: airborne ? groundY - CHAR_H - 30 - Math.random() * 40 : groundY - type.size - 5,
      size: type.size, value: type.value, color: type.color, emoji: type.emoji,
    });
  }

  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ---- Draw ----
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawGalleryReward();
    drawGround();
    obstacles.forEach(o => drawObstacle(o));
    items.forEach(i => drawItem(i));
    drawParticles();
    drawCharacter();
  }

  function drawBackground() {
    if (stageImg) {
      // Scrolling stage background image
      const scale = canvas.height / stageImg.height;
      const scaledW = stageImg.width * scale;
      const x = -(bgScrollX * scale) % scaledW;
      ctx.drawImage(stageImg, x, 0, scaledW, canvas.height);
      ctx.drawImage(stageImg, x + scaledW, 0, scaledW, canvas.height);
      if (x + scaledW * 2 < canvas.width) {
        ctx.drawImage(stageImg, x + scaledW * 2, 0, scaledW, canvas.height);
      }
    } else {
      // Fallback gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0a0015');
      grad.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function drawGalleryReward() {
    if (galleryAlpha <= 0 || !galleryImg) return;
    ctx.save();
    ctx.globalAlpha = galleryAlpha;
    // Cover-fit the image
    const imgR = galleryImg.width / galleryImg.height;
    const canR = canvas.width / canvas.height;
    let dw, dh, dx, dy;
    if (imgR > canR) {
      dh = canvas.height; dw = dh * imgR;
      dx = (canvas.width - dw) / 2; dy = 0;
    } else {
      dw = canvas.width; dh = dw / imgR;
      dx = 0; dy = (canvas.height - dh) / 2;
    }
    ctx.drawImage(galleryImg, dx, dy, dw, dh);
    ctx.restore();
  }

  function drawGround() {
    ctx.fillStyle = 'rgba(20, 5, 40, 0.7)';
    ctx.fillRect(0, groundY, canvas.width, GROUND_OFFSET);
    // Neon strip
    const stripOff = (frameCount * speed * 0.5) % 40;
    ctx.fillStyle = '#a855f7';
    for (let x = -stripOff; x < canvas.width; x += 40) ctx.fillRect(x, groundY, 20, 2);
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(0, groundY + 2, canvas.width, 1);
  }

  function drawCharacter() {
    const sprite = isJumping ? jumpImg : runImg;
    if (sprite) {
      ctx.drawImage(sprite, charX, charY, CHAR_W, CHAR_H);
    } else {
      ctx.fillStyle = '#ff69b4';
      ctx.fillRect(charX, charY, CHAR_W, CHAR_H);
    }
  }

  function drawObstacle(o) {
    ctx.save();
    ctx.shadowColor = o.color; ctx.shadowBlur = 10;
    ctx.fillStyle = o.color + '40';
    ctx.fillRect(o.x, o.y, o.w, o.h);
    ctx.restore();
    ctx.strokeStyle = o.color; ctx.lineWidth = 2;
    ctx.strokeRect(o.x, o.y, o.w, o.h);
    ctx.font = `${Math.min(o.w, o.h) - 4}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(o.emoji, o.x + o.w / 2, o.y + o.h / 2);
  }

  function drawItem(i) {
    ctx.save();
    ctx.shadowColor = i.color; ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(i.x + i.size / 2, i.y + i.size / 2, i.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = i.color + '30'; ctx.fill();
    ctx.restore();
    ctx.font = `${i.size}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(i.emoji, i.x + i.size / 2, i.y + i.size / 2);
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life / 20;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  function updateHUD() {
    const scoreEl = document.getElementById('runner-score');
    const targetEl = document.getElementById('runner-target');
    if (scoreEl) scoreEl.textContent = score.toLocaleString();
    if (targetEl) {
      if (targetReached) {
        targetEl.textContent = '✨ UNLOCKED!';
        targetEl.style.color = 'var(--neon-gold)';
      } else {
        targetEl.textContent = `TARGET: ${targetScore.toLocaleString()}`;
        targetEl.style.color = '';
      }
    }
  }

  // ---- Game Over ----
  function endGame() {
    gameOver = true;
    cancelAnimationFrame(animId);
    unbindInput();

    const prev = Storage.getProgress('neon', diffId);
    const wasCleared = prev?.cleared || false;
    const newBest = Math.max(score, prev?.bestScore || 0);
    bestScore = newBest;
    Storage.setProgress('neon', diffId, { cleared: wasCleared || targetReached, bestScore: newBest });

    showGameOver();
  }

  function showGameOver() {
    const area = document.getElementById('runner-area');
    const overlay = document.createElement('div');
    overlay.className = 'runner-gameover';

    const title = targetReached ? 'CLEAR!' : 'GAME OVER';
    const msg = targetReached
      ? 'Gallery に追加しました！'
      : score >= targetScore * 0.7 ? '「惜しい…！もうちょっとだったのに！」' : '「ドンマイ！また走ろうよ！」';

    overlay.innerHTML = `
      <h2>${title}</h2>
      <div class="runner-gameover-score">SCORE: ${score.toLocaleString()}</div>
      <div class="runner-gameover-best">BEST: ${bestScore.toLocaleString()}</div>
      <div class="runner-gameover-msg">${msg}</div>
      <div class="runner-gameover-actions">
        <button class="neon-btn" id="runner-retry">Retry</button>
        <button class="neon-btn" id="runner-to-lobby">Lobby</button>
      </div>
    `;
    area.appendChild(overlay);

    document.getElementById('runner-retry').onclick = () => { overlay.remove(); startGame(); };
    document.getElementById('runner-to-lobby').onclick = () => {
      overlay.remove();
      if (targetReached) {
        Dialogue.start({
          characterId: 'neon', difficulty: diffId, timing: 'after',
          callback: () => { App.goTo('lobby', { bgm: 'lobby', noHistory: true }); Lobby.init(); },
        });
      } else {
        App.goTo('lobby', { bgm: 'lobby', noHistory: true });
        Lobby.init();
      }
    };
  }

  // Exit button
  function bindExit() {
    const btn = document.getElementById('runner-exit');
    if (btn) {
      btn.onclick = () => {
        gameOver = true;
        cancelAnimationFrame(animId);
        unbindInput();
        App.goTo('runner-diff-select');
        RunnerDiffSelect.init();
      };
    }
  }

  return { start };
})();
