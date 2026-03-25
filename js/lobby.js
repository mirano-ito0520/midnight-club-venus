/* ============================================
   Lobby Scene
   ============================================ */

const Lobby = (() => {
  let characters = null;

  async function init() {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }
    renderCabinets();
    updateSpeech();
  }

  function updateSpeech() {
    const speechEl = document.getElementById('lobby-venus-speech');
    const playerName = Storage.get('playerName') || 'ゲスト';
    const data = Storage.load();

    // Check if all puzzles cleared
    const playableChars = ['marina', 'luna', 'coral'];
    const diffs = ['easy', 'normal', 'hard', 'expert', 'master'];
    let totalCleared = 0;
    const totalPuzzles = playableChars.length * diffs.length;

    playableChars.forEach(c => {
      diffs.forEach(d => {
        if (data.progress?.[c]?.[d]?.cleared) totalCleared++;
      });
    });

    let speech;
    if (totalCleared >= totalPuzzles) {
      speech = `あら…全部クリアしちゃったの？${playerName}さん、やるわね。\nでも安心して。このクラブには、まだまだ秘密があるから——`;
    } else {
      speech = `おかえりなさい、${playerName}さん。今夜はどのゲームで遊ぶ？`;
    }
    speechEl.textContent = speech;
  }

  function renderCabinets() {
    const grid = document.getElementById('lobby-cabinets');
    grid.innerHTML = '';

    // Splash Jigsaw cabinet
    const jigsawCard = createCabinetCard({
      icon: 'assets/images/ui/cabinet-jigsaw.png',
      name: 'Splash Jigsaw',
      locked: false,
      onClick: () => {
        App.SE.play('button-click');
        App.goTo('char-select', { bgm: 'jigsaw' });
        CharSelect.init();
      },
    });
    grid.appendChild(jigsawCard);

    // Coming Soon cabinets
    for (let i = 0; i < 3; i++) {
      const card = createCabinetCard({
        icon: 'assets/images/ui/cabinet-comingsoon.png',
        name: 'Coming Soon',
        locked: true,
      });
      grid.appendChild(card);
    }

    // Gallery button
    document.getElementById('gallery-btn').onclick = () => {
      App.SE.play('button-click');
      App.goTo('gallery', { bgm: 'gallery' });
      Gallery.init();
    };
  }

  function createCabinetCard({ icon, name, locked, onClick }) {
    const card = document.createElement('div');
    card.className = 'cabinet-card' + (locked ? ' locked' : '');
    card.innerHTML = `
      <img src="${icon}" alt="${name}">
      <span class="cabinet-name">${name}</span>
    `;
    if (onClick && !locked) card.addEventListener('click', onClick);
    return card;
  }

  return { init, updateSpeech };
})();
