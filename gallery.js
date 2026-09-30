/**
 * ============================================================
 * SkySync — Photo Gallery Logic
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined' || !CONFIG.GALLERY_IMAGES) {
    console.error('[SkySync] GALLERY_IMAGES not found in config.js');
    return;
  }

  const grid = document.getElementById('full-gallery-grid');
  if (!grid) return;

  const images = CONFIG.GALLERY_IMAGES;
  
  // 1. Render Grid
  images.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-grid-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View image ${index + 1}`);
    item.dataset.index = index;

    item.innerHTML = `
      <div class="gallery-shimmer"></div>
      <img src="${imgData.src}" alt="${imgData.caption || 'Gallery image ' + (index+1)}" loading="lazy" />
      <div class="gallery-hover-overlay">
        <div class="gallery-hover-label"><i data-lucide="search"></i> View</div>
      </div>
    `;
    
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(item);
  });

  // Re-init icons for the grid only
  lucide.createIcons({ root: grid });

  // 2. GSAP ScrollTrigger + Shimmer Loading + Counter
  gsap.registerPlugin(ScrollTrigger);

  const counterBadge = document.getElementById('gallery-counter');
  let counterText = document.getElementById('gallery-counter-text');
  let loadedCount = 0;
  const totalImages = images.length;

  function updateCounter(newLoaded) {
    if (!counterBadge) return;
    loadedCount += newLoaded;
    
    if (loadedCount < totalImages) {
      if (counterText) counterText.textContent = `Showing ${loadedCount} of ${totalImages} photos`;
    } else {
      counterBadge.classList.add('completed');
      counterBadge.innerHTML = `<i data-lucide="check-circle" class="gallery-counter-icon"></i> <span id="gallery-counter-text">All ${totalImages} photos loaded 🎉</span>`;
      lucide.createIcons({ root: counterBadge });
      const newIcon = counterBadge.querySelector('svg');
      if (newIcon) {
        gsap.fromTo(newIcon, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
      }
    }
  }

  const items = document.querySelectorAll('.gallery-grid-item');

  ScrollTrigger.batch(items, {
    interval: 0.12,
    batchMax: 8,
    onEnter: (batch) => {
      batch.forEach((item, i) => {
        const img = item.querySelector('img');
        const shimmer = item.querySelector('.gallery-shimmer');
        const delay = i * 0.08;

        // Animate card container in
        gsap.fromTo(item,
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            opacity: 1, y: 0, scale: 1, 
            duration: 0.6, 
            ease: "power3.out", 
            delay: delay,
            onComplete: () => {
              gsap.set(item, { clearProps: "transform" });
              item.classList.add('revealed');
            }
          }
        );

        // Fade out shimmer and fade in image shortly after card enters
        const imgDelay = delay + 0.3;
        gsap.to(shimmer, { opacity: 0, duration: 0.4, delay: imgDelay });
        gsap.fromTo(img,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: imgDelay }
        );
      });
      
      updateCounter(batch.length);
    },
    start: "top 85%",
  });


  // 3. Lightbox Logic
  let currentIndex = 0;
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbCounter = document.getElementById('lightbox-counter');
  
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const overlay = document.getElementById('lightbox-overlay');

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Optional: wait for transition before clearing src
    setTimeout(() => {
      if (!lightbox.classList.contains('active')) {
        lbImg.src = '';
      }
    }, 300);
  }

  function updateLightbox() {
    const data = images[currentIndex];
    lbImg.src = data.src;
    lbImg.alt = data.caption || '';
    lbCaption.textContent = data.caption || '';
    lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  // Event Listeners
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) nextImage();
    if (touchEndX > touchStartX + swipeThreshold) prevImage();
  }

});
