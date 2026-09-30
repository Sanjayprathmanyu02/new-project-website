/**
 * ============================================================
 * SkySync — Videos Page Logic
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined' || !CONFIG.VIDEOS) {
    console.error('[SkySync] VIDEOS not found in config.js');
    return;
  }

  const grid = document.getElementById('videos-grid');
  if (!grid) return;

  const videos = CONFIG.VIDEOS;

  // 1. Render Grid
  videos.forEach((vidData, index) => {
    const card = document.createElement('div');
    card.className = 'video-card-item';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Play video: ${vidData.title}`);
    
    card.innerHTML = `
      <div class="video-card-thumb-wrap">
        <img src="${vidData.poster}" alt="${vidData.title} thumbnail" class="video-card-thumb" loading="lazy" />
        <button class="video-card-play-btn" aria-label="Play" tabindex="-1"><i data-lucide="play"></i></button>
      </div>
      <div class="video-card-content">
        <h3 class="video-card-title">${vidData.title}</h3>
        <p class="video-card-desc">${vidData.description}</p>
      </div>
    `;
    
    card.addEventListener('click', () => openVideoModal(vidData.src, vidData.poster));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoModal(vidData.src, vidData.poster);
      }
    });

    grid.appendChild(card);
  });

  // Re-init icons only within the newly added grid to prevent duplicating global icons
  lucide.createIcons({ root: grid });

  // 2. Video Modal Logic
  const modal = document.getElementById('video-modal');
  const overlay = document.getElementById('video-modal-overlay');
  const closeBtn = document.getElementById('video-modal-close');
  const player = document.getElementById('native-video-player');
  const loader = document.getElementById('video-loader');

  function openVideoModal(src, poster) {
    player.src = src;
    player.poster = poster;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show loader initially if waiting
    loader.classList.add('active');
    
    player.play().catch(err => {
      console.warn("Autoplay prevented or video not ready", err);
    });
  }

  function closeVideoModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause and clear after transition
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        player.pause();
        player.src = '';
        player.load();
      }
    }, 300);
  }

  // Loader events
  player.addEventListener('playing', () => loader.classList.remove('active'));
  player.addEventListener('waiting', () => loader.classList.add('active'));
  player.addEventListener('canplay', () => loader.classList.remove('active'));

  // Close events
  closeBtn.addEventListener('click', closeVideoModal);
  overlay.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeVideoModal();
    }
  });

});
