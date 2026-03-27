/* ============================================
   Jigsaw Puzzle — Select & Play
   ============================================ */

/* ---- Character Select ---- */
const CharSelect = (() => {
  let characters = null;

  async function init() {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }
    render();

    document.getElementById('char-select-back').onclick = () => {
      App.SE.play('button-click');
      App.goTo('lobby', { bgm: 'lobby' });
    };
  }

  function render() {
    const grid = document.getElementById('char-select-grid');
    grid.innerHTML = '';

    ['marina', 'luna', 'coral'].forEach(id => {
      const char = characters[id];
      const card = document.createElement('div');
      card.className = 'char-card';
      card.innerHTML = `
        <img src="${char.images.portrait}" alt="${char.name}">
        <div class="char-name">${char.name}</div>
      `;
      card.addEventListener('click', () => {
        App.SE.play('button-click');
        DiffSelect.init(id);
        App.goTo('diff-select');
      });
      grid.appendChild(card);
    });
  }

  return { init };
})();

/* ---- Difficulty Select ---- */
const DiffSelect = (() => {
  let characters = null;
  let selectedCharId = '';

  async function init(characterId) {
    selectedCharId = characterId;
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }
    render();

    document.getElementById('diff-select-back').onclick = () => {
      App.SE.play('button-click');
      App.goBack();
    };
  }

  function render() {
    const char = characters[selectedCharId];
    document.getElementById('diff-select-title').textContent = char.name;

    const grid = document.getElementById('diff-select-grid');
    grid.innerHTML = '';

    const difficulties = characters.difficulties;

    difficulties.filter(d => d.id !== 'vip').forEach((diff, index) => {
      const progress = Storage.getProgress(selectedCharId, diff.id);
      const isCleared = progress?.cleared;

      let isLocked = false;
      if (index > 0) {
        const prevDiff = difficulties[index - 1];
        const prevProgress = Storage.getProgress(selectedCharId, prevDiff.id);
        if (!prevProgress?.cleared) isLocked = true;
      }

      const card = document.createElement('div');
      card.className = 'diff-card' + (isLocked ? ' locked' : '') + (isCleared ? ' cleared' : '');

      let rightContent = '';
      if (isLocked) {
        rightContent = '<span class="diff-lock">🔒</span>';
      } else if (isCleared && progress.bestTime) {
        const t = formatTime(progress.bestTime);
        rightContent = `<span class="diff-best-time">Best: ${t}</span>`;
      }

      card.innerHTML = `
        <div>
          <div class="diff-name">${diff.name}</div>
          <div class="diff-stars">${diff.stars}</div>
        </div>
        <div>${rightContent}</div>
      `;

      if (!isLocked) {
        card.addEventListener('click', () => {
          App.SE.play('button-click');
          Dialogue.start({
            characterId: selectedCharId,
            difficulty: diff.id,
            timing: 'before',
            callback: () => {
              JigsawGame.start(selectedCharId, diff.id, diff.cols);
            }
          });
        });
      }

      grid.appendChild(card);
    });
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return { init };
})();

/* ---- Jigsaw Game Engine ---- */
const JigsawGame = (() => {
  let canvas, ctx;
  let pieces = [];
  let cols = 3;
  let rows = 0;
  let pieceW = 0;
  let pieceH = 0;
  // Grid area (where pieces snap to)
  let gridX = 0;
  let gridY = 0;
  let gridW = 0;
  let gridH = 0;
  // Tray area (where pieces start)
  let trayY = 0;
  let trayH = 0;
  let img = null;
  let characterId = '';
  let difficultyId = '';
  let placedCount = 0;
  let totalPieces = 0;
  let timerStart = 0;
  let timerInterval = null;
  let dragging = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let showingHint = false;

  function start(charId, diffId, numCols) {
    cleanup();

    characterId = charId;
    difficultyId = diffId;
    cols = numCols;
    rows = numCols;

    App.goTo('jigsaw', { bgm: 'jigsaw' });

    canvas = document.getElementById('jigsaw-canvas');
    ctx = canvas.getContext('2d');

    img = new Image();
    img.crossOrigin = 'anonymous';

    fetch('data/characters.json')
      .then(r => r.json())
      .then(chars => {
        const charData = chars[characterId];
        img.src = charData.images[difficultyId];
        img.onload = () => setupPuzzle();
      });

    document.getElementById('jigsaw-hint-btn').onclick = showHint;

    // Exit button — back to difficulty select
    document.getElementById('jigsaw-back-btn').onclick = () => {
      App.SE.play('button-click');
      cleanup();
      App.goTo('diff-select', { bgm: 'jigsaw' });
      DiffSelect.init(characterId);
    };
  }

  function setupPuzzle() {
    const area = document.getElementById('jigsaw-area');
    const areaW = area.clientWidth;
    const areaH = area.clientHeight;

    canvas.width = areaW;
    canvas.height = areaH;
    canvas.style.width = areaW + 'px';
    canvas.style.height = areaH + 'px';

    const imgAspect = img.width / img.height;
    const margin = 8;
    const gap = 12;
    // Tray: at least 22% of area or 110px
    const minTrayH = Math.max(110, areaH * 0.22);

    const maxGridW = areaW - margin * 2;
    const maxGridH = areaH - margin - gap - minTrayH;

    // Fit grid maintaining image aspect ratio
    if (maxGridW / maxGridH < imgAspect) {
      gridW = maxGridW;
      gridH = maxGridW / imgAspect;
    } else {
      gridH = maxGridH;
      gridW = maxGridH * imgAspect;
    }

    gridX = (areaW - gridW) / 2;
    gridY = margin;

    trayY = gridY + gridH + gap;
    trayH = areaH - trayY - margin;

    pieceW = gridW / cols;
    pieceH = gridH / rows;
    totalPieces = cols * rows;
    placedCount = 0;

    // Create pieces — correct positions are within the grid
    pieces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pieces.push({
          id: r * cols + c,
          col: c,
          row: r,
          x: 0,
          y: 0,
          correctX: gridX + c * pieceW,
          correctY: gridY + r * pieceH,
          placed: false,
        });
      }
    }

    // Show mosaic preview, then start
    showMosaicPreview(() => {
      shufflePiecesToTray();
      draw();
      startTimer();
      bindEvents();
      updateHUD();
    });
  }

  /* ---- Mosaic Preview ---- */
  function showMosaicPreview(callback) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGridOutline();

    // Draw pixelated mosaic of the image
    const pixelSize = 12;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const smallW = Math.ceil(gridW / pixelSize);
    const smallH = Math.ceil(gridH / pixelSize);
    tempCanvas.width = smallW;
    tempCanvas.height = smallH;
    tempCtx.drawImage(img, 0, 0, smallW, smallH);

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, gridX, gridY, gridW, gridH);
    ctx.imageSmoothingEnabled = true;
    ctx.restore();

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(10, 10, 20, 0.3)';
    ctx.fillRect(gridX, gridY, gridW, gridH);

    // Text
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 18px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PREVIEW', gridX + gridW / 2, gridY + gridH / 2 - 12);
    ctx.font = '13px "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#f0e6ff';
    ctx.fillText('3秒後にスタート', gridX + gridW / 2, gridY + gridH / 2 + 16);
    ctx.textBaseline = 'alphabetic';

    setTimeout(callback, 3000);
  }

  /* ---- Grid Outline ---- */
  function drawGridOutline() {
    // Grid background
    ctx.fillStyle = 'rgba(180, 74, 255, 0.05)';
    ctx.fillRect(gridX, gridY, gridW, gridH);

    // Grid cell lines
    ctx.strokeStyle = 'rgba(180, 74, 255, 0.2)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(gridX, gridY + r * pieceH);
      ctx.lineTo(gridX + gridW, gridY + r * pieceH);
      ctx.stroke();
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(gridX + c * pieceW, gridY);
      ctx.lineTo(gridX + c * pieceW, gridY + gridH);
      ctx.stroke();
    }

    // Grid outer border
    ctx.strokeStyle = 'rgba(180, 74, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(gridX, gridY, gridW, gridH);

    // Tray area indicator
    ctx.strokeStyle = 'rgba(180, 74, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    const trayPad = 4;
    ctx.strokeRect(trayPad, trayY, canvas.width - trayPad * 2, trayH);
    ctx.setLineDash([]);

    // Tray label
    ctx.fillStyle = 'rgba(180, 74, 255, 0.25)';
    ctx.font = '11px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('PIECES', trayPad + 8, trayY + 14);
  }

  /* ---- Shuffle to Tray ---- */
  function shufflePiecesToTray() {
    const pad = 4;
    const trayW = canvas.width - pad * 2;
    pieces.forEach(p => {
      p.x = pad + Math.random() * (trayW - pieceW);
      p.y = trayY + 4 + Math.random() * Math.max(0, trayH - pieceH - 8);
      p.placed = false;
    });
  }

  /* ---- Draw ---- */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGridOutline();

    // Draw placed pieces (in grid), then unplaced, then dragging on top
    pieces.filter(p => p.placed).forEach(p => drawPiece(p));
    pieces.filter(p => !p.placed && p !== dragging).forEach(p => drawPiece(p));
    if (dragging) drawPiece(dragging, true);
  }

  function drawPiece(piece, highlight = false) {
    const sx = piece.col * (img.width / cols);
    const sy = piece.row * (img.height / rows);
    const sw = img.width / cols;
    const sh = img.height / rows;

    ctx.save();
    if (highlight) {
      ctx.shadowColor = 'rgba(255, 45, 155, 0.6)';
      ctx.shadowBlur = 10;
    }

    ctx.drawImage(img, sx, sy, sw, sh, piece.x, piece.y, pieceW, pieceH);

    // Border
    ctx.strokeStyle = piece.placed
      ? 'rgba(255, 215, 0, 0.4)'
      : 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = highlight ? 2 : 1;
    ctx.strokeRect(piece.x, piece.y, pieceW, pieceH);
    ctx.restore();
  }

  /* ---- Hint (mosaic) ---- */
  function showHint() {
    if (showingHint) return;
    showingHint = true;

    const pixelSize = 10;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const smallW = Math.ceil(gridW / pixelSize);
    const smallH = Math.ceil(gridH / pixelSize);
    tempCanvas.width = smallW;
    tempCanvas.height = smallH;
    tempCtx.drawImage(img, 0, 0, smallW, smallH);

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, gridX, gridY, gridW, gridH);
    ctx.imageSmoothingEnabled = true;
    ctx.restore();

    setTimeout(() => {
      showingHint = false;
      draw();
    }, 2000);
  }

  /* ---- Input Events ---- */
  function bindEvents() {
    canvas.onmousedown = (e) => onPointerDown(e.offsetX, e.offsetY);
    canvas.onmousemove = (e) => onPointerMove(e.offsetX, e.offsetY);
    canvas.onmouseup = () => onPointerUp();
    canvas.onmouseleave = () => onPointerUp();

    canvas.ontouchstart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      onPointerDown(t.clientX - rect.left, t.clientY - rect.top);
    };
    canvas.ontouchmove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      onPointerMove(t.clientX - rect.left, t.clientY - rect.top);
    };
    canvas.ontouchend = () => onPointerUp();
  }

  function onPointerDown(x, y) {
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      if (p.placed) continue;
      if (x >= p.x && x <= p.x + pieceW && y >= p.y && y <= p.y + pieceH) {
        dragging = p;
        dragOffsetX = x - p.x;
        dragOffsetY = y - p.y;
        pieces.splice(i, 1);
        pieces.push(p);
        draw();
        break;
      }
    }
  }

  function onPointerMove(x, y) {
    if (!dragging) return;
    dragging.x = x - dragOffsetX;
    dragging.y = y - dragOffsetY;
    draw();
  }

  function onPointerUp() {
    if (!dragging) return;

    const snapThreshold = pieceW * 0.35;
    const dx = Math.abs(dragging.x - dragging.correctX);
    const dy = Math.abs(dragging.y - dragging.correctY);

    if (dx < snapThreshold && dy < snapThreshold) {
      dragging.x = dragging.correctX;
      dragging.y = dragging.correctY;
      dragging.placed = true;
      placedCount++;
      App.SE.play('piece-snap');
      updateHUD();

      if (placedCount >= totalPieces) {
        onPuzzleComplete();
      }
    }

    dragging = null;
    draw();
  }

  /* ---- HUD & Timer ---- */
  function updateHUD() {
    document.getElementById('jigsaw-pieces').textContent = `${placedCount} / ${totalPieces}`;
  }

  function startTimer() {
    timerStart = Date.now();
    clearInterval(timerInterval);
    const timerEl = document.getElementById('jigsaw-timer');
    timerInterval = setInterval(() => {
      const elapsed = (Date.now() - timerStart) / 1000;
      timerEl.textContent = formatTime(elapsed);
    }, 100);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    return (Date.now() - timerStart) / 1000;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  /* ---- Puzzle Complete ---- */
  function onPuzzleComplete() {
    const elapsed = stopTimer();

    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.ontouchstart = null;
    canvas.ontouchmove = null;
    canvas.ontouchend = null;

    App.SE.play('puzzle-clear');

    const prev = Storage.getProgress(characterId, difficultyId);
    const bestTime = prev?.bestTime ? Math.min(prev.bestTime, elapsed) : elapsed;
    Storage.setProgress(characterId, difficultyId, { cleared: true, bestTime });

    // Show completed image in grid briefly
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, gridX, gridY, gridW, gridH);

    setTimeout(() => {
      Dialogue.start({
        characterId,
        difficulty: difficultyId,
        timing: 'after',
        callback: () => showClearScreen(elapsed),
      });
    }, 800);
  }

  function showClearScreen(elapsed) {
    // Set image BEFORE scene transition so old image never shows
    document.getElementById('clear-image').style.backgroundImage = `url('${img.src}')`;
    document.getElementById('clear-time').textContent = `Time: ${formatTime(elapsed)}`;

    App.goTo('jigsaw-clear', { bgm: 'clear' });
    App.SE.play('gallery-add');

    document.getElementById('clear-next-btn').onclick = () => {
      App.SE.play('button-click');
      App.goTo('diff-select', { bgm: 'jigsaw' });
      DiffSelect.init(characterId);
    };

    document.getElementById('clear-lobby-btn').onclick = () => {
      App.SE.play('button-click');
      App.goTo('lobby', { bgm: 'lobby', noHistory: true });
      Lobby.init();
    };
  }

  /* ---- Cleanup ---- */
  function cleanup() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (canvas) {
      canvas.onmousedown = null;
      canvas.onmousemove = null;
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
      canvas.ontouchstart = null;
      canvas.ontouchmove = null;
      canvas.ontouchend = null;
    }
    dragging = null;
  }

  return { start, cleanup };
})();
