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

  function isCharFullyCleared(charId) {
    const diffs = characters.difficulties;
    const charDiffs = (charId === 'neon') ? diffs : diffs.filter(d => d.id !== 'vip');
    return charDiffs.every(d => Storage.getProgress(charId, d.id)?.cleared);
  }

  function renderFilters() {
    const container = document.getElementById('gallery-filters');
    container.innerHTML = '';

    const filters = [
      { id: 'all', label: 'All' },
      { id: 'marina', label: 'MARINA' },
      { id: 'luna', label: 'LUNA' },
      { id: 'coral', label: 'CORAL' },
      { id: 'neon', label: 'NEON' },
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

    const playableChars = ['marina', 'luna', 'coral', 'neon'];
    const diffs = characters.difficulties;

    playableChars.forEach(charId => {
      // Filter check
      if (currentFilter !== 'all' && currentFilter !== 'favourites' && currentFilter !== charId) return;

      const charData = characters[charId];
      const fullyCleared = isCharFullyCleared(charId);

      // Profile card — appears when all 5 stages cleared
      if (fullyCleared && currentFilter !== 'favourites') {
        const profileEl = document.createElement('div');
        profileEl.className = 'gallery-profile-card';
        profileEl.innerHTML = `
          <img src="${charData.images.portrait}" alt="${charData.name}">
          <div class="profile-badge">COMPLETE</div>
        `;
        profileEl.addEventListener('click', () => openProfile(charId));
        grid.appendChild(profileEl);
      }

      // Difficulty images (VIP only for neon)
      const charDiffs = (charId === 'neon') ? diffs : diffs.filter(d => d.id !== 'vip');
      charDiffs.forEach(diff => {
        const key = `${charId}-${diff.id}`;
        const unlocked = Storage.isGalleryUnlocked(charId, diff.id);
        const isFav = Storage.isFavourite(key);

        if (currentFilter === 'favourites' && !isFav) return;

        const el = document.createElement('div');
        el.className = 'gallery-item' + (unlocked ? '' : ' locked');

        if (unlocked) {
          const imgUrl = charData.images[diff.id];
          el.innerHTML = `
            <img src="${imgUrl}" alt="${charId} ${diff.id}">
            ${isFav ? '<span class="fav-star">♥</span>' : ''}
          `;
          el.addEventListener('click', () => openLightbox({ charId, diffId: diff.id, key }));
        } else {
          el.innerHTML = `<img class="lock-icon" src="assets/images/ui/lock-silhouette.png" alt="Locked">`;
        }

        grid.appendChild(el);
      });
    });
  }

  function renderProgress() {
    const container = document.getElementById('gallery-progress');
    const playableChars = ['marina', 'luna', 'coral', 'neon'];
    const diffs = characters.difficulties;
    let unlocked = 0;
    let total = 0;

    playableChars.forEach(c => {
      const cDiffs = (c === 'neon') ? diffs : diffs.filter(d => d.id !== 'vip');
      cDiffs.forEach(d => {
        if (Storage.isGalleryUnlocked(c, d.id)) unlocked++;
      });
      total += cDiffs.length;
    });

    const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    container.innerHTML = `
      <span>${unlocked} / ${total} (${percent}%)</span>
      <div class="gallery-progress-bar">
        <div class="gallery-progress-fill" style="width: ${percent}%"></div>
      </div>
    `;
  }

  function openProfile(charId) {
    const charData = characters[charId];
    const p = charData.profile;
    const lightbox = document.getElementById('gallery-lightbox');
    const imgEl = document.getElementById('gallery-lightbox-img');
    const favBtn = document.getElementById('lightbox-fav');

    imgEl.src = charData.images.portrait;
    lightbox.style.display = 'flex';
    favBtn.style.display = 'none';

    // Show profile overlay
    let overlay = document.getElementById('profile-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'profile-overlay';
      lightbox.appendChild(overlay);
    }
    overlay.style.display = 'block';
    overlay.innerHTML = `
      <div class="profile-name">${charData.name}</div>
      <div class="profile-name-jp">${charData.nameJp}</div>
      <div class="profile-stats">
        <div class="profile-row"><span class="profile-label">Age</span><span>${p.age}</span></div>
        <div class="profile-row"><span class="profile-label">Height</span><span>${p.height}</span></div>
        <div class="profile-row"><span class="profile-label">Hobby</span><span>${p.hobby}</span></div>
        <div class="profile-row"><span class="profile-label">Likes</span><span>${p.likes}</span></div>
      </div>
      <div class="profile-quote">"${p.quote}"</div>
      <div class="profile-personality">${p.personality}</div>
    `;
  }

  function openLightbox(item) {
    const lightbox = document.getElementById('gallery-lightbox');
    const imgEl = document.getElementById('gallery-lightbox-img');
    const favBtn = document.getElementById('lightbox-fav');

    // Hide profile overlay if it exists
    const overlay = document.getElementById('profile-overlay');
    if (overlay) overlay.style.display = 'none';
    favBtn.style.display = '';

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
    const overlay = document.getElementById('profile-overlay');
    if (overlay) overlay.style.display = 'none';
    document.getElementById('lightbox-fav').style.display = '';
  }

  return { init };
})();
