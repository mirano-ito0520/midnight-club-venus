/* ============================================
   Dialogue Scene Engine
   ============================================ */

const Dialogue = (() => {
  let lines = [];
  let currentIndex = 0;
  let isTyping = false;
  let fullText = '';
  let onComplete = null;
  let characters = null;
  let dialogueData = null;
  let clickHandler = null;

  async function start({ characterId, difficulty, timing, callback }) {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }

    if (!dialogueData) {
      const dlgRes = await fetch('data/dialogues.json');
      dialogueData = await dlgRes.json();
    }
    const dialogues = dialogueData;

    const charDialogues = dialogues[characterId];
    if (!charDialogues || !charDialogues[difficulty] || !charDialogues[difficulty][timing]) {
      if (callback) callback();
      return;
    }

    lines = charDialogues[difficulty][timing];

    // Developer mode: ミラノ → special VIP lines
    if (isMilanoMode()) {
      const charName = characters[characterId]?.nameJp || characterId;
      if (timing === 'before') {
        lines = [
          { speaker: lines[0].speaker, text: `ミラノさん…！いらしてくださったんですね…♡` },
          { speaker: lines[0].speaker, text: `${charName}、今日はミラノさんのために特別に…全力でお見せしますね♡` },
        ];
      } else {
        lines = [
          { speaker: lines[0].speaker, text: `ミラノさん…いかがでしたか？♡` },
          { speaker: lines[0].speaker, text: `また…いつでもいらしてくださいね。${charName}はいつでもお待ちしてます♡` },
        ];
      }
    }

    currentIndex = 0;
    onComplete = callback;

    // Set up scene
    const charData = characters[characterId];
    const bgKey = charData.background;
    const bgUrl = characters.backgrounds[bgKey];
    const bgEl = document.getElementById('dialogue-bg');
    bgEl.style.backgroundImage = `url('${bgUrl}')`;

    const charEl = document.getElementById('dialogue-character');
    charEl.innerHTML = `<img src="${charData.images.portrait}" alt="${charData.name}">`;

    document.getElementById('dialogue-speaker').textContent = charData.name;

    // Navigate to dialogue scene (NEON uses special BGM per difficulty)
    let bgm = 'dialogue';
    if (characterId === 'neon') {
      const intimateDiffs = ['expert', 'master', 'vip'];
      bgm = intimateDiffs.includes(difficulty) ? 'after-hours' : 'electric-heart';
    }
    App.goTo('dialogue', { bgm });

    // Show first line
    showLine();

    // Click handler
    const sceneEl = document.getElementById('scene-dialogue');
    if (clickHandler) sceneEl.removeEventListener('click', clickHandler);
    clickHandler = handleClick;
    sceneEl.addEventListener('click', clickHandler);

    // Skip button — finish dialogue immediately
    document.getElementById('dialogue-skip-btn').onclick = (e) => {
      e.stopPropagation();
      if (activeTimer) clearInterval(activeTimer);
      activeTimer = null;
      isTyping = false;
      sceneEl.removeEventListener('click', clickHandler);
      clickHandler = null;
      if (onComplete) onComplete();
    };
  }

  function showLine() {
    const playerName = Storage.get('playerName') || 'ゲスト';
    const text = lines[currentIndex].text.replace(/\{playerName\}/g, playerName);
    const textEl = document.getElementById('dialogue-text');
    document.getElementById('dialogue-speaker').textContent = lines[currentIndex].speaker;
    typeText(textEl, text);
  }

  function handleClick() {
    const textEl = document.getElementById('dialogue-text');

    if (isTyping) {
      isTyping = false;
      textEl.textContent = fullText;
      return;
    }

    currentIndex++;
    if (currentIndex < lines.length) {
      showLine();
    } else {
      // Clean up
      const sceneEl = document.getElementById('scene-dialogue');
      sceneEl.removeEventListener('click', clickHandler);
      clickHandler = null;
      if (onComplete) onComplete();
    }
  }

  let activeTimer = null;

  function typeText(el, text, speed = 35) {
    // Clear any previous interval to prevent text corruption
    if (activeTimer) clearInterval(activeTimer);
    isTyping = true;
    fullText = text;
    el.textContent = '';
    let i = 0;
    activeTimer = setInterval(() => {
      if (!isTyping) {
        clearInterval(activeTimer);
        activeTimer = null;
        return;
      }
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        isTyping = false;
        clearInterval(activeTimer);
        activeTimer = null;
      }
    }, speed);
  }

  return { start };
})();
