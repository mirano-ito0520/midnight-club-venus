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
  let clickHandler = null;

  async function start({ characterId, difficulty, timing, callback }) {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }

    const dlgRes = await fetch('data/dialogues.json');
    const dialogues = await dlgRes.json();

    const charDialogues = dialogues[characterId];
    if (!charDialogues || !charDialogues[difficulty] || !charDialogues[difficulty][timing]) {
      if (callback) callback();
      return;
    }

    lines = charDialogues[difficulty][timing];
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

    // Navigate to dialogue scene
    App.goTo('dialogue', { bgm: 'dialogue' });

    // Show first line
    showLine();

    // Click handler
    const sceneEl = document.getElementById('scene-dialogue');
    if (clickHandler) sceneEl.removeEventListener('click', clickHandler);
    clickHandler = handleClick;
    sceneEl.addEventListener('click', clickHandler);
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

  function typeText(el, text, speed = 35) {
    isTyping = true;
    fullText = text;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (!isTyping) {
        clearInterval(timer);
        return;
      }
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        isTyping = false;
        clearInterval(timer);
      }
    }, speed);
  }

  return { start };
})();
