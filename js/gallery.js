/* ============================================
   Gallery Scene
   ============================================ */

const Gallery = (() => {
  let characters = null;
  let currentFilter = 'all';

  async function init() {
    if (!characters) {
      const res = await fetch('data/characters.json');
      characters = await res.json();
    }
    renderFilters();
    renderGrid();
    renderProgress();

    document.getElementById('gallery-back').onclick = () => {
      App.SE.play('button-click');
      App.goTo('lobby', { bgm: 'lobby', noHistory: true });
      Lobby.init();
    };

    document.getElementById('lightbox-close').onclick = closeLightbox;
    document.getElementById('gallery-lightbox').onclick = (e) => {
      if (e.target === document.getElementById('gallery-lightbox')) closeLightbox();
    };
  }

  function renderFilters() {
    const container = document.getElementById('gallery-filters');
    container.innerHTML = '';

    const filters = [
      { id: 'all', label: 'All' },
      { id: 'marina', label: 'MARINA' },
      { id: 'luna', label: 'LUNA' },
      { id: 'coral', label: 'CORAL' },
      { id: 'favourites', label: '♥ Favourites' },
    ];

    filters.forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'gallery-filter-btn' + (currentFilter === f.id ? ' active' : '');
      btn.textContent = f.label;
      btn.addEventListener('click', () => {
        currentFilter = f.id;
        renderFilters();
        renderGrid();
      });
      container.appendChild(btn);
    });
  }

  function renderGrid() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    const playableChars = ['marina', 'luna', 'coral'];
    const diffs = characters.difficulties;

    const items = [];
    playableChars.forEach(charId => {
      diffs.forEach(diff => {
        const key = `${charId}-${diff.id}`;
        const unlocked = Storage.isGalleryUnlocked(charId, diff.id);
        const isFav = Storage.isFavourite(key);

        // Apply filter
        if (currentFilter === 'favourites' && !isFav) return;
        if (currentFilter !== 'all' && currentFilter !== 'favourites' && currentFilter !== charId) return;

        items.push({ charId, diffId: diff.id, key, unlocked, isFav });
      });
    });

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'gallery-item' + (item.unlocked ? '' : ' locked');

      if (item.unlocked) {
        const charData = characters[item.charId];
        const imgUrl = charData.images[item.diffId];
        el.innerHTML = `
          <img src="${imgUrl}" alt="${item.charId} ${item.diffId}">
          ${item.isFav ? '<span class="fav-star">♥</span>' : ''}
        `;
        el.addEventListener('click', () => openLightbox(item));
      } else {
        el.innerHTML = `<img class="lock-icon" src="assets/images/ui/lock-silhouette.png" alt="Locked">`;
      }

      grid.appendChild(el);
    });
  }

  function renderProgress() {
    const container = document.getElementById('gallery-progress');
    const playableChars = ['marina', 'luna', 'coral'];
    const diffs = characters.difficulties;
    let unlocked = 0;
    const total = playableChars.length * diffs.length;

    playableChars.forEach(c => {
      diffs.forEach(d => {
        if (Storage.isGalleryUnlocked(c, d.id)) unlocked++;
      });
    });

    const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    container.innerHTML = `
      <span>${unlocked} / ${total} (${percent}%)</span>
      <div class="gallery-progress-bar">
        <div class="gallery-progress-fill" style="width: ${percent}%"></div>
      </div>
    `;
  }

  function openLightbox(item) {
    const lightbox = document.getElementById('gallery-lightbox');
    const imgEl = document.getElementById('gallery-lightbox-img');
    const favBtn = document.getElementById('lightbox-fav');

    const charData = characters[item.charId];
    imgEl.src = charData.images[item.diffId];
    lightbox.style.display = 'flex';

    favBtn.className = 'lightbox-fav' + (Storage.isFavourite(item.key) ? ' active' : '');
    favBtn.onclick = () => {
      const newState = Storage.toggleFavourite(item.key);
      favBtn.className = 'lightbox-fav' + (newState ? ' active' : '');
      renderGrid();
    };
  }

  function closeLightbox() {
    document.getElementById('gallery-lightbox').style.display = 'none';
  }

  return { init };
})();
