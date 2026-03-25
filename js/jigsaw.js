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

    difficulties.forEach((diff, index) => {
      const progress = Storage.getProgress(selectedCharId, diff.id);
      const isCleared = progress?.cleared;

      // Unlock logic: first difficulty always open, others need previous cleared
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
          // Start dialogue before puzzle
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
  let canvasScale = 1;
  let showingHint = false;

  function start(charId, diffId, numCols) {
    characterId = charId;
    difficultyId = diffId;
    cols = numCols;
    rows = numCols; // Square grid for simplicity matching piece count

    App.goTo('jigsaw', { bgm: 'jigsaw' });

    canvas = document.getElementById('jigsaw-canvas');
    ctx = canvas.getContext('2d');

    // Load puzzle image
    img = new Image();
    img.crossOrigin = 'anonymous';

    // Get character data for image path
    fetch('data/characters.json')
      .then(r => r.json())
      .then(chars => {
        const charData = chars[characterId];
        img.src = charData.images[difficultyId];
        img.onload = () => setupPuzzle();
      });

    // Hint button
    document.getElementById('jigsaw-hint-btn').onclick = showHint;
  }

  function setupPuzzle() {
    const area = document.getElementById('jigsaw-area');
    const maxW = area.clientWidth - 16;
    const maxH = area.clientHeight - 16;

    // Image aspect ratio (9:16)
    const imgAspect = img.width / img.height;
    let canvasW, canvasH;

    if (maxW / maxH < imgAspect) {
      canvasW = maxW;
      canvasH = maxW / imgAspect;
    } else {
      canvasH = maxH;
      canvasW = maxH * imgAspect;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    canvasScale = 1;

    pieceW = canvasW / cols;
    pieceH = canvasH / rows;
    totalPieces = cols * rows;
    placedCount = 0;

    // Create pieces
    pieces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pieces.push({
          id: r * cols + c,
          col: c,
          row: r,
          // Current position (will be shuffled)
          x: c * pieceW,
          y: r * pieceH,
          // Correct position
          correctX: c * pieceW,
          correctY: r * pieceH,
          placed: false,
        });
      }
    }

    // Show preview first
    showPreview(() => {
      shufflePieces();
      draw();
      startTimer();
      bindEvents();
      updateHUD();
    });
  }

  function showPreview(callback) {
    // Show complete image for 3 seconds
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(10, 10, 20, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 20px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('PREVIEW', canvas.width / 2, canvas.height / 2);
    ctx.font = '14px "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#f0e6ff';
    ctx.fillText('3秒後にスタート', canvas.width / 2, canvas.height / 2 + 30);

    setTimeout(callback, 3000);
  }

  function shufflePieces() {
    // Randomly position pieces within canvas bounds
    pieces.forEach(p => {
      p.x = Math.random() * (canvas.width - pieceW);
      p.y = Math.random() * (canvas.height - pieceH);
      p.placed = false;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid guides (subtle)
    ctx.strokeStyle = 'rgba(180, 74, 255, 0.15)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * pieceH);
      ctx.lineTo(canvas.width, r * pieceH);
      ctx.stroke();
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * pieceW, 0);
      ctx.lineTo(c * pieceW, canvas.height);
      ctx.stroke();
    }

    // Draw placed pieces first (so dragging piece is on top)
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
    ctx.strokeStyle = piece.placed ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = highlight ? 2 : 1;
    ctx.strokeRect(piece.x, piece.y, pieceW, pieceH);
    ctx.restore();
  }

  function showHint() {
    if (showingHint) return;
    showingHint = true;
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    setTimeout(() => {
      showingHint = false;
      draw();
    }, 2000);
  }

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
    // Find topmost non-placed piece under pointer
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      if (p.placed) continue;
      if (x >= p.x && x <= p.x + pieceW && y >= p.y && y <= p.y + pieceH) {
        dragging = p;
        dragOffsetX = x - p.x;
        dragOffsetY = y - p.y;
        // Move to end of array (top z-order)
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

    // Snap check
    const snapThreshold = pieceW * 0.3;
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

  function onPuzzleComplete() {
    const elapsed = stopTimer();

    // Unbind events
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.ontouchstart = null;
    canvas.ontouchmove = null;
    canvas.ontouchend = null;

    App.SE.play('puzzle-clear');

    // Save progress
    const prev = Storage.getProgress(characterId, difficultyId);
    const bestTime = prev?.bestTime ? Math.min(prev.bestTime, elapsed) : elapsed;
    Storage.setProgress(characterId, difficultyId, { cleared: true, bestTime });

    // After-clear dialogue, then clear screen
    setTimeout(() => {
      Dialogue.start({
        characterId,
        difficulty: difficultyId,
        timing: 'after',
        callback: () => showClearScreen(elapsed),
      });
    }, 500);
  }

  function showClearScreen(elapsed) {
    App.goTo('jigsaw-clear', { bgm: 'clear' });
    App.SE.play('gallery-add');

    // Load char data for image
    fetch('data/characters.json')
      .then(r => r.json())
      .then(chars => {
        const charData = chars[characterId];
        const imgUrl = charData.images[difficultyId];
        document.getElementById('clear-image').style.backgroundImage = `url('${imgUrl}')`;
      });

    document.getElementById('clear-time').textContent = `Time: ${formatTime(elapsed)}`;

    document.getElementById('clear-next-btn').onclick = () => {
      App.SE.play('button-click');
      // Go back to difficulty select
      App.goTo('diff-select', { bgm: 'jigsaw' });
      DiffSelect.init(characterId);
    };

    document.getElementById('clear-lobby-btn').onclick = () => {
      App.SE.play('button-click');
      App.goTo('lobby', { bgm: 'lobby', noHistory: true });
      Lobby.init();
    };
  }

  return { start };
})();
