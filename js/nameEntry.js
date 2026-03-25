/* ============================================
   Name Entry Scene
   ============================================ */

const NameEntry = (() => {
  let dialogues = [];
  let afterDialogues = [];
  let currentIndex = 0;
  let isTyping = false;
  let fullText = '';
  let phase = 'intro'; // 'intro' | 'input' | 'outro'

  async function init() {
    const res = await fetch('data/dialogues.json');
    const data = await res.json();
    dialogues = data.nameEntry;
    afterDialogues = data.nameEntryAfter;
    currentIndex = 0;
    phase = 'intro';

    const textEl = document.getElementById('name-entry-text');
    const dialogueBox = document.querySelector('.name-entry-dialogue');
    const inputContainer = document.getElementById('name-input-container');
    const nameInput = document.getElementById('player-name-input');
    const submitBtn = document.getElementById('name-submit-btn');

    inputContainer.style.display = 'none';

    // Show first dialogue
    typeText(textEl, dialogues[0].text);

    // Click to advance
    dialogueBox.addEventListener('click', handleAdvance);

    // Name submit
    submitBtn.addEventListener('click', () => submitName(nameInput, textEl));
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitName(nameInput, textEl);
    });
  }

  function handleAdvance() {
    const textEl = document.getElementById('name-entry-text');

    if (isTyping) {
      // Skip typewriter — show full text
      isTyping = false;
      textEl.textContent = fullText;
      return;
    }

    if (phase === 'intro') {
      currentIndex++;
      if (currentIndex < dialogues.length) {
        typeText(textEl, dialogues[currentIndex].text);
      } else {
        // Show name input
        phase = 'input';
        document.getElementById('name-input-container').style.display = 'flex';
        document.getElementById('player-name-input').focus();
      }
    } else if (phase === 'outro') {
      currentIndex++;
      if (currentIndex < afterDialogues.length) {
        const playerName = Storage.get('playerName');
        const text = afterDialogues[currentIndex].text.replace(/\{playerName\}/g, playerName);
        typeText(textEl, text);
      } else {
        // Transition to lobby
        Storage.set('firstLaunch', false);
        App.goTo('lobby', { bgm: 'lobby', noHistory: true });
        Lobby.init();
      }
    }
  }

  function submitName(input, textEl) {
    const name = input.value.trim();
    if (!name) return;

    Storage.set('playerName', name);
    document.getElementById('name-input-container').style.display = 'none';

    phase = 'outro';
    currentIndex = 0;
    const text = afterDialogues[0].text.replace(/\{playerName\}/g, name);
    typeText(textEl, text);

    App.SE.play('button-click');
  }

  function typeText(el, text, speed = 40) {
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

  return { init };
})();
