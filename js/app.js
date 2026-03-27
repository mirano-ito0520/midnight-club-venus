/* ============================================
   App — Scene Router & BGM Manager
   ============================================ */

/* ---- BAN System (must load before App.init) ---- */
// URL に ?resetban を付けて開くとBAN解除（例: index.html?resetban）
if (location.search.includes('resetban')) {
  try { localStorage.removeItem('mcv_banned'); } catch {}
  // パラメータを消してリロード
  location.replace(location.pathname);
}

const BAN_KEY = 'mcv_banned';

function isBanned() {
  try { return localStorage.getItem(BAN_KEY) === 'true'; } catch { return false; }
}

function setBanned() {
  try { localStorage.setItem(BAN_KEY, 'true'); } catch {}
}

function showBannedScene() {
  document.querySelectorAll('.scene').forEach(s => {
    s.classList.remove('active');
    s.classList.remove('fade-out');
  });
  const scene = document.getElementById('scene-banned');
  scene.classList.add('active');

  const charEl = document.getElementById('banned-character');
  const textEl = document.getElementById('banned-text');

  charEl.innerHTML = `<img src="assets/images/characters/bodyguard.png" alt="Bodyguard">`;
  textEl.textContent = '当クラブへの入場はお断りしております。\nお引き取りください。';

  scene.onclick = () => {
    textEl.textContent = '…帰れ。';
  };
}

function triggerPunishment() {
  document.getElementById('settings-modal').style.display = 'none';

  const scene = document.getElementById('scene-banned');
  document.querySelectorAll('.scene').forEach(s => {
    s.classList.remove('active');
    s.classList.remove('fade-out');
  });
  scene.classList.add('active');

  const charEl = document.getElementById('banned-character');
  const textEl = document.getElementById('banned-text');

  charEl.innerHTML = `<img src="assets/images/characters/venus/portrait.png" alt="VENUS">`;
  textEl.textContent = '……あら？';

  App.BGM.stop();

  let phase = 0;
  const venusLines = [
    '……あら？',
    'あなた…ミラノさんの名前を…騙っていたの？',
    '……それとも、オーナーの名を捨てるつもり？',
    'どちらにしても……許されることじゃないわ。',
    'このクラブを…舐めないでちょうだい。',
    '……ボディガード。この方をお連れして。',
  ];

  scene.onclick = () => {
    phase++;
    if (phase < venusLines.length) {
      textEl.textContent = venusLines[phase];
    } else if (phase === venusLines.length) {
      charEl.innerHTML = `<img src="assets/images/characters/bodyguard.png" alt="Bodyguard">`;
      textEl.style.color = '#ff4444';
      textEl.textContent = '………。';
      App.SE.play('door-open');
    } else if (phase === venusLines.length + 1) {
      textEl.textContent = '（あなたは店の外に放り出された）';
    } else {
      setBanned();
      Storage.resetAll();
      textEl.textContent = '当クラブへの入場は永久にお断りいたします。';
      setTimeout(() => location.reload(), 2500);
    }
  };
}

const App = (() => {
  let currentScene = 'loading';
  const sceneHistory = [];

  /* ---- Scene Router ---- */
  function goTo(sceneId, options = {}) {
    const oldEl = document.getElementById(`scene-${currentScene}`);
    const newEl = document.getElementById(`scene-${sceneId}`);
    if (!newEl) {
      console.error(`Scene not found: scene-${sceneId}`);
      return;
    }

    // Push to history for back navigation (unless told not to)
    if (!options.noHistory && currentScene !== 'loading') {
      sceneHistory.push(currentScene);
    }

    // Fade out old scene
    if (oldEl) {
      oldEl.classList.add('fade-out');
      oldEl.classList.remove('active');
      setTimeout(() => oldEl.classList.remove('fade-out'), 800);
    }

    // Activate new scene
    newEl.classList.add('active');
    currentScene = sceneId;

    // Fire scene-specific init
    if (options.onEnter) options.onEnter();

    // BGM change
    if (options.bgm) BGM.play(options.bgm);
  }

  function goBack() {
    const prev = sceneHistory.pop();
    if (prev) goTo(prev, { noHistory: true });
  }

  function getCurrentScene() {
    return currentScene;
  }

  /* ---- BGM Manager ---- */
  const BGM = (() => {
    const player = () => document.getElementById('bgm-player');
    let currentTrack = '';
    let pendingTrack = '';
    let fadeOutInterval = null;
    let fadeInInterval = null;

    const tracks = {
      lobby: 'assets/audio/bgm/velvet-midnight.mp3',
      jigsaw: 'assets/audio/bgm/tidal-glow.mp3',
      dialogue: 'assets/audio/bgm/closer-to-you.mp3',
      gallery: 'assets/audio/bgm/burning-silk.mp3',
      clear: 'assets/audio/bgm/golden-reveal.mp3',
      runner: 'assets/audio/bgm/neon-dash.mp3',
      'electric-heart': 'assets/audio/bgm/electric-heart.mp3',
      'after-hours': 'assets/audio/bgm/after-hours.mp3',
    };

    function getTargetVolume() {
      const vol = Storage.get('bgmVolume');
      return (vol !== null && vol !== undefined ? vol : 50) / 100;
    }

    function play(trackName) {
      const src = tracks[trackName];
      if (!src || currentTrack === trackName) return;

      clearInterval(fadeInInterval);
      const el = player();

      // Immediately switch track (must stay in user gesture context)
      currentTrack = trackName;
      pendingTrack = '';
      el.src = src;
      el.volume = getTargetVolume();
      if (getMuted()) return; // Don't play if muted
      el.play().catch(() => {
        pendingTrack = trackName;
      });
    }

    // Retry pending audio on user gesture
    function retryPending() {
      if (!pendingTrack || getMuted()) return;
      const el = player();
      if (el.paused && el.src) {
        el.volume = getTargetVolume();
        el.play().then(() => {
          pendingTrack = '';
        }).catch(() => {});
      }
    }

    // Listen on multiple events for robust autoplay handling
    ['click', 'touchstart', 'keydown'].forEach(evt => {
      document.addEventListener(evt, retryPending, { passive: true });
    });

    function setVolume(percent) {
      const el = player();
      el.volume = percent / 100;
      Storage.set('bgmVolume', percent);
    }

    function stop() {
      clearInterval(fadeInInterval);
      const el = player();
      el.pause();
      el.volume = 0;
      currentTrack = '';
      pendingTrack = '';
    }

    return { play, stop, setVolume, tracks };
  })();

  /* ---- SE Manager ---- */
  const SE = (() => {
    const sounds = {
      'piece-snap': 'assets/audio/se/piece-snap.mp3',
      'puzzle-clear': 'assets/audio/se/puzzle-clear.mp3',
      'stage-unlock': 'assets/audio/se/stage-unlock.mp3',
      'text-blip': 'assets/audio/se/text-blip.mp3',
      'button-click': 'assets/audio/se/button-click.mp3',
      'door-open': 'assets/audio/se/door-open.mp3',
      'gallery-add': 'assets/audio/se/gallery-add.mp3',
    };
    const cache = {};

    function play(name) {
      if (getMuted()) return;
      const src = sounds[name];
      if (!src) return;
      try {
        if (!cache[name]) cache[name] = new Audio(src);
        const audio = cache[name];
        const vol = Storage.get('seVolume');
        audio.volume = (vol !== null && vol !== undefined ? vol : 70) / 100;
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {
        // SE not available — silent fail
      }
    }

    function setVolume(percent) {
      Storage.set('seVolume', percent);
    }

    return { play, setVolume };
  })();

  /* ---- Mute State ---- */
  let isMuted = false;

  function initMute() {
    isMuted = Storage.get('muted') || false;
    const btn = document.getElementById('mute-toggle');
    updateMuteUI(btn);

    btn.addEventListener('click', () => {
      isMuted = !isMuted;
      Storage.set('muted', isMuted);
      updateMuteUI(btn);
      if (isMuted) {
        document.getElementById('bgm-player').pause();
      } else {
        const el = document.getElementById('bgm-player');
        if (el.src) el.play().catch(() => {});
      }
    });
  }

  function updateMuteUI(btn) {
    btn.textContent = isMuted ? '🔇' : '🔊';
    btn.classList.toggle('muted', isMuted);
  }

  function getMuted() { return isMuted; }

  /* ---- Initialization ---- */
  function init() {
    // Check BAN status first (persists through data reset)
    if (isBanned()) {
      showBannedScene();
      initKonami(); // Konami code is the only escape from BAN
      return;       // Block everything else
    }

    // Pause/resume audio when app goes to background
    document.addEventListener('visibilitychange', () => {
      const el = document.getElementById('bgm-player');
      if (document.hidden) {
        el.pause();
      } else if (!isMuted && BGM.tracks && el.src) {
        el.play().catch(() => {});
      }
    });

    // Mute toggle
    initMute();

    // Settings modal wiring
    initSettings();

    // Decide which scene to show
    const isFirst = Storage.get('firstLaunch');
    if (isFirst) {
      // First visit: show loading + name entry
      simulateLoading(() => {
        goTo('name-entry', { noHistory: true, bgm: 'dialogue' });
        NameEntry.init();
      });
    } else {
      // 2nd visit+: skip loading, go straight to lobby
      goTo('lobby', { noHistory: true, bgm: 'lobby' });
      Lobby.init();
    }

    initKonami();
  }

  function simulateLoading(callback) {
    const fill = document.querySelector('.loading-bar-fill');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        fill.style.width = '100%';
        clearInterval(interval);
        setTimeout(callback, 400);
      } else {
        fill.style.width = progress + '%';
      }
    }, 200);
  }

  function initSettings() {
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('settings-close');
    const settingsBtn = document.getElementById('settings-btn');
    const nameInput = document.getElementById('settings-name');
    const nameSaveBtn = document.getElementById('settings-name-save');
    const bgmSlider = document.getElementById('settings-bgm-vol');
    const seSlider = document.getElementById('settings-se-vol');
    const resetBtn = document.getElementById('settings-reset');

    settingsBtn.addEventListener('click', () => {
      nameInput.value = Storage.get('playerName') || '';
      const bgmVol = Storage.get('bgmVolume');
      bgmSlider.value = bgmVol !== null && bgmVol !== undefined ? bgmVol : 50;
      const seVol = Storage.get('seVolume');
      seSlider.value = seVol !== null && seVol !== undefined ? seVol : 70;
      modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    nameSaveBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) return;
      Storage.set('playerName', name);
      Lobby.updateSpeech();
    });

    bgmSlider.addEventListener('input', (e) => BGM.setVolume(Number(e.target.value)));
    seSlider.addEventListener('input', (e) => SE.setVolume(Number(e.target.value)));

    resetBtn.addEventListener('click', () => {
      if (confirm('本当にすべてのデータをリセットしますか？')) {
        // Stop audio first
        BGM.stop();
        // Clear save data
        Storage.resetAll();
        // Clear service worker cache to ensure clean restart
        if ('caches' in window) {
          caches.keys().then(keys => {
            keys.forEach(k => caches.delete(k));
          });
        }
        // Unregister service worker
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(r => r.unregister());
          });
        }
        // Reload after a short delay to allow cleanup
        setTimeout(() => location.reload(), 300);
      }
    });

    // --- Secret Code: tap "Settings" title 5 times to reveal ---
    let secretTaps = 0;
    const settingsTitle = document.getElementById('settings-title');
    const secretRow = document.getElementById('secret-row');
    const secretMsg = document.getElementById('secret-msg');
    const secretInput = document.getElementById('secret-code-input');
    const secretSubmit = document.getElementById('secret-submit');

    settingsTitle.addEventListener('click', () => {
      secretTaps++;
      if (secretTaps >= 5) {
        secretRow.style.display = 'flex';
        secretMsg.style.display = 'none';
      }
    });

    // Reset tap count when modal closes
    closeBtn.addEventListener('click', () => { secretTaps = 0; secretRow.style.display = 'none'; });

    secretSubmit.addEventListener('click', () => handleSecretCode(secretInput, secretMsg));
    secretInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSecretCode(secretInput, secretMsg);
    });
  }

  function handleSecretCode(input, msgEl) {
    const code = input.value.trim().toUpperCase();
    input.value = '';
    msgEl.style.display = 'block';

    if (code === 'VENUS') {
      msgEl.textContent = '';
      document.getElementById('settings-modal').style.display = 'none';
      openVenusProfile();
    } else if (code === 'MIDNIGHT') {
      if (isEverythingUnlocked()) {
        msgEl.textContent = '';
        document.getElementById('settings-modal').style.display = 'none';
        SlotMachine.start();
      } else {
        msgEl.innerHTML = '💋 VENUSより：<br>「ふふ…秘密のパスワードを知ってるのね。<br>でも、まだ早いわ。全部クリアしてからね♡」';
        msgEl.style.color = 'var(--neon-pink)';
      }
    } else {
      msgEl.textContent = '…？ 違うみたいよ';
      msgEl.style.color = 'var(--text-muted)';
    }
  }

  function isEverythingUnlocked() {
    const chars = ['marina', 'luna', 'coral', 'neon'];
    const diffs = ['easy', 'normal', 'hard', 'expert', 'master'];
    return chars.every(c => diffs.every(d => Storage.getProgress(c, d)?.cleared));
  }

  // unlockAll is used by both secret.js and konami code
  // Unlocks all stages but NOT VIP room individual flags (those are slot-machine only)
  function unlockAll() {
    const chars = ['marina', 'luna', 'coral', 'neon'];
    const diffs = ['easy', 'normal', 'hard', 'expert', 'master'];
    chars.forEach(c => {
      diffs.forEach(d => {
        Storage.setProgress(c, d, { cleared: true, bestTime: 99 });
      });
    });
  }

  // --- Konami Code (keyboard + touch swipe) ---
  const konamiSeq = ['up','up','down','down','left','right','left','right','tap','tap'];
  let konamiIdx = 0;
  let konamiTimer = null;

  function advanceKonami(input) {
    if (input === konamiSeq[konamiIdx]) {
      konamiIdx++;
      clearTimeout(konamiTimer);
      konamiTimer = setTimeout(() => { konamiIdx = 0; }, 3000);
      if (konamiIdx >= konamiSeq.length) {
        konamiIdx = 0;
        clearTimeout(konamiTimer);

        if (isBanned()) {
          // BAN解除 — 唯一の救済措置
          try { localStorage.removeItem(BAN_KEY); } catch {}
          const bannedText = document.getElementById('banned-text');
          if (bannedText) {
            bannedText.style.color = '#d4af37';
            bannedText.textContent = '……特別に、もう一度だけチャンスをあげる。';
          }
          setTimeout(() => location.reload(), 2000);
        } else if (getCurrentScene() === 'lobby') {
          // ロビーでコナミ → オーナー認証フロー
          App.SE.play('stage-unlock');
          showOwnerAuth();
        }
      }
    } else {
      konamiIdx = 0;
    }
  }

  function initKonami() {
    // Keyboard (PC)
    const keyMap = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right' };
    document.addEventListener('keydown', (e) => {
      const dir = keyMap[e.key];
      if (dir) { advanceKonami(dir); return; }
      if (e.key === 'b' || e.key === 'a') advanceKonami('tap');
    });

    // Touch swipe + tap (mobile)
    let touchStartX = 0, touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const threshold = 40;

      if (absDx < threshold && absDy < threshold) {
        advanceKonami('tap');
      } else if (absDx > absDy) {
        advanceKonami(dx > 0 ? 'right' : 'left');
      } else {
        advanceKonami(dy > 0 ? 'down' : 'up');
      }
    }, { passive: true });
  }

  /* ---- Owner Authentication (Konami in Lobby) ---- */
  function showOwnerAuth() {
    // Hide cabinets, make VENUS prominent
    const cabinets = document.getElementById('lobby-cabinets');
    const header = document.querySelector('.lobby-header');
    const speechEl = document.getElementById('lobby-venus-speech');
    if (cabinets) cabinets.style.display = 'none';
    if (header) header.style.display = 'none';

    // VENUS asks for password
    speechEl.textContent = '……あら。その合図を知っているのは——\n合言葉をどうぞ。';
    speechEl.style.whiteSpace = 'pre-line';

    // Create input overlay
    const lobby = document.getElementById('scene-lobby');
    const inputBox = document.createElement('div');
    inputBox.id = 'owner-auth-box';
    inputBox.style.cssText = 'position:absolute;bottom:100px;left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:8px;align-items:center;';
    inputBox.innerHTML = `
      <input type="text" id="owner-auth-input" class="name-input" placeholder="合言葉" maxlength="20" autocomplete="off" style="width:160px;">
      <button class="neon-btn-sm" id="owner-auth-submit">Enter</button>
    `;
    lobby.appendChild(inputBox);

    const input = document.getElementById('owner-auth-input');
    const submit = document.getElementById('owner-auth-submit');

    function tryAuth() {
      const code = input.value.trim();
      if (!code) return;
      inputBox.remove();

      if (code === 'ミラノ') {
        // SUCCESS — activate owner mode
        activateMilanoMode();
        speechEl.style.color = '#d4af37';
        speechEl.textContent = 'ようこそ、オーナー様。\n当クラブのすべてはあなたのために——♡';
        App.SE.play('puzzle-clear');
        setTimeout(() => {
          speechEl.style.color = '';
          speechEl.style.whiteSpace = '';
          if (cabinets) cabinets.style.display = '';
          if (header) header.style.display = '';
          Lobby.init();
        }, 2500);
      } else {
        // WRONG — punishment
        speechEl.textContent = '……違うわね。偽物は、許さない。';
        speechEl.style.color = '#ff4444';
        setTimeout(() => {
          speechEl.style.color = '';
          speechEl.style.whiteSpace = '';
          if (cabinets) cabinets.style.display = '';
          if (header) header.style.display = '';
          triggerPunishment();
        }, 1500);
      }
    }

    submit.addEventListener('click', tryAuth);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAuth(); });
    input.focus();
  }

  return { init, goTo, goBack, getCurrentScene, BGM, SE };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
