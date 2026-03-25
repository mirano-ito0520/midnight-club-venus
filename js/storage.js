/* ============================================
   Storage Manager — localStorage wrapper
   ============================================ */

const Storage = (() => {
  const KEY = 'mcv_save';

  const defaultData = () => ({
    playerName: '',
    bgmVolume: 50,
    seVolume: 70,
    // Per-character, per-difficulty clear status
    // e.g. { marina: { easy: { cleared: true, bestTime: 45 } } }
    progress: {},
    // Gallery: unlocked images
    // e.g. { "marina-easy": true }
    gallery: {},
    // Favourites in gallery
    favourites: {},
    // First launch flag
    firstLaunch: true,
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultData();
      const data = JSON.parse(raw);
      // Merge with defaults for forward-compatibility
      return { ...defaultData(), ...data };
    } catch {
      return defaultData();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function get(key) {
    const data = load();
    return data[key];
  }

  function set(key, value) {
    const data = load();
    data[key] = value;
    save(data);
  }

  function getProgress(characterId, difficulty) {
    const data = load();
    return data.progress?.[characterId]?.[difficulty] || null;
  }

  function setProgress(characterId, difficulty, info) {
    const data = load();
    if (!data.progress[characterId]) data.progress[characterId] = {};
    data.progress[characterId][difficulty] = info;
    // Also unlock gallery
    const galleryKey = `${characterId}-${difficulty}`;
    data.gallery[galleryKey] = true;
    save(data);
  }

  function isGalleryUnlocked(characterId, difficulty) {
    const data = load();
    return !!data.gallery[`${characterId}-${difficulty}`];
  }

  function toggleFavourite(key) {
    const data = load();
    data.favourites[key] = !data.favourites[key];
    save(data);
    return data.favourites[key];
  }

  function isFavourite(key) {
    const data = load();
    return !!data.favourites[key];
  }

  function resetAll() {
    localStorage.removeItem(KEY);
  }

  return {
    load, save, get, set,
    getProgress, setProgress,
    isGalleryUnlocked, toggleFavourite, isFavourite,
    resetAll, defaultData,
  };
})();
