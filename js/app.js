/* ============================================
   App — Scene Router & BGM Manager
   ============================================ */

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
    let isStarted = false;

    const tracks = {
      lobby: 'assets/audio/bgm/velvet-midnight.mp3',
      jigsaw: 'assets/audio/bgm/tidal-glow.mp3',
      dialogue: 'assets/audio/bgm/closer-to-you.mp3',
      gallery: 'assets/audio/bgm/burning-silk.mp3',
      clear: 'assets/audio/bgm/golden-reveal.mp3',
    };

    function play(trackName) {
      const src = tracks[trackName];
      if (!src || currentTrack === trackName) return;

      const el = player();
      // Fade out, switch, fade in
      fadeOut(() => {
        el.src = src;
        el.volume = 0;
        currentTrack = trackName;
        el.play().then(() => fadeIn()).catch(() => {});
      });
    }

    function fadeOut(callback) {
      const el = player();
      const step = 0.05;
      const interval = setInterval(() => {
        if (el.volume > step) {
          el.volume = Math.max(0, el.volume - step);
        } else {
          el.volume = 0;
          clearInterval(interval);
          if (callback) callback();
        }
      }, 50);
    }

    function fadeIn() {
      const el = player();
      const targetVol = (Storage.get('bgmVolume') || 50) / 100;
      const step = 0.05;
      const interval = setInterval(() => {
        if (el.volume < targetVol - step) {
          el.volume = Math.min(1, el.volume + step);
        } else {
          el.volume = targetVol;
          clearInterval(interval);
        }
      }, 50);
    }

    function setVolume(percent) {
      const el = player();
      el.volume = percent / 100;
      Storage.set('bgmVolume', percent);
    }

    function stop() {
      fadeOut(() => {
        player().pause();
        currentTrack = '';
      });
    }

    // Ensure audio is started by user gesture
    function ensureStarted() {
      if (isStarted) return;
      isStarted = true;
      const el = player();
      if (el.paused && currentTrack) {
        el.play().catch(() => {});
      }
    }

    return { play, stop, setVolume, ensureStarted, tracks };
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
      const src = sounds[name];
      if (!src) return;
      try {
        if (!cache[name]) cache[name] = new Audio(src);
        const audio = cache[name];
        audio.volume = (Storage.get('seVolume') || 70) / 100;
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

  /* ---- Initialization ---- */
  function init() {
    // User gesture listener for audio autoplay policy
    document.addEventListener('click', () => BGM.ensureStarted(), { once: true });
    document.addEventListener('touchstart', () => BGM.ensureStarted(), { once: true });

    // Settings modal wiring
    initSettings();

    // Simulate loading then decide which scene
    simulateLoading(() => {
      const isFirst = Storage.get('firstLaunch');
      if (isFirst) {
        goTo('name-entry', { noHistory: true, bgm: 'dialogue' });
        NameEntry.init();
      } else {
        goTo('lobby', { noHistory: true, bgm: 'lobby' });
        Lobby.init();
      }
    });
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
      bgmSlider.value = Storage.get('bgmVolume') || 50;
      seSlider.value = Storage.get('seVolume') || 70;
      modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    nameSaveBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name) {
        Storage.set('playerName', name);
        Lobby.updateSpeech();
      }
    });

    bgmSlider.addEventListener('input', (e) => BGM.setVolume(Number(e.target.value)));
    seSlider.addEventListener('input', (e) => SE.setVolume(Number(e.target.value)));

    resetBtn.addEventListener('click', () => {
      if (confirm('本当にすべてのデータをリセットしますか？')) {
        Storage.resetAll();
        location.reload();
      }
    });
  }

  return { init, goTo, goBack, getCurrentScene, BGM, SE };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
