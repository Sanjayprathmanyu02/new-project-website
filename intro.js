/**
 * ════════════════════════════════════════════════════════════════
 *  AgriSpike — Loading Screen  ·  intro.js  (v2 — Progress + Flash)
 *  Requires: GSAP 3 (loaded synchronously BEFORE this script)
 *  Requires: CONFIG object (config.js loaded before this script)
 * ════════════════════════════════════════════════════════════════
 *
 *  Sequence:
 *   0.0s – 3.0s  → Background slideshow (Ken Burns crossfade) + 0→100% progress bar
 *   3.0s – 3.15s → Lightning bolt streaks flicker onto screen
 *   3.15s – 3.35s → Radial white flash bursts from center + 2–4px screen shake
 *   3.35s – 3.6s  → Flash fades, overlay removed, homepage revealed
 *
 *  sessionStorage key prevents replay within the same browser session.
 *  Skip button triggers the lightning flash sequence immediately.
 * ════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     CONFIG & SESSION GUARD
  ───────────────────────────────────────────────────────────── */
  const SKIP_KEY    = 'agrispike_intro_v2';
  const TOTAL_SECS  = 3.0;   // progress bar duration

  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  /* Mark body so CSS hides scroll */
  document.body.classList.add('intro-active');

  /* If already played this session → instant exit */
  if (sessionStorage.getItem(SKIP_KEY)) {
    fastExit();
    return;
  }

  /* ─────────────────────────────────────────────────────────────
     GUARD: wait for GSAP if still loading (async CDN)
  ───────────────────────────────────────────────────────────── */
  waitForGSAP(init);

  /* ─────────────────────────────────────────────────────────────
     INIT: preload images then start the sequence
  ───────────────────────────────────────────────────────────── */
  function init() {

    /* Gather slideshow images from config */
    const imgSrcs = [
      CONFIG?.images?.gallery?.[0],
      CONFIG?.images?.gallery?.[1],
      CONFIG?.images?.gallery?.[2],
      CONFIG?.images?.videoThumbnail,
      CONFIG?.images?.dashboardMockup,
      CONFIG?.images?.marquee?.topRow?.[4],     // aerial_farm
      CONFIG?.images?.marquee?.bottomRow?.[2],  // soil_closeup
      CONFIG?.images?.marquee?.bottomRow?.[3],  // solar_panel
    ].filter(Boolean);

    /* Build slides before preloading so the div exists */
    buildSlides(imgSrcs);

    /* Preload all images, then kick off the animation */
    preloadImages(imgSrcs, startSequence);
  }

  /* ─────────────────────────────────────────────────────────────
     BUILD SLIDES
  ───────────────────────────────────────────────────────────── */
  function buildSlides(srcs) {
    const container = document.getElementById('intro-slideshow');
    if (!container) return;

    srcs.forEach((src, i) => {
      const div = document.createElement('div');
      div.className  = 'intro-slide';
      div.style.backgroundImage = `url('${src}')`;
      div.style.opacity = i === 0 ? '1' : '0';   /* first slide visible */
      div.style.transform = 'scale(1)';
      container.appendChild(div);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     START SEQUENCE (runs after images are preloaded)
  ───────────────────────────────────────────────────────────── */
  let slideshowTimer = null;

  function startSequence() {
    const fill       = document.getElementById('intro-bar-fill');
    const percentEl  = document.getElementById('intro-percent');
    const leafEl     = document.getElementById('intro-leaf');
    const slides     = document.querySelectorAll('.intro-slide');

    /* ── 1. Leaf pulse (infinite, gentle) ── */
    gsap.to(leafEl, {
      scale: 1.06,
      duration: 1.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    /* ── 2. Slideshow: Ken Burns crossfade ── */
    if (slides.length > 1) {
      let cur = 0;

      /* Ken Burns on first slide immediately */
      gsap.to(slides[0], { scale: 1.08, duration: TOTAL_SECS + 0.8, ease: 'none' });

      slideshowTimer = setInterval(function crossfade() {
        const prev = cur;
        cur = (cur + 1) % slides.length;

        /* Fade new slide in, start its Ken Burns */
        gsap.fromTo(slides[cur],
          { opacity: 0, scale: 1 },
          { opacity: 1, scale: 1.08, duration: 0.45, ease: 'power1.out' }
        );
        /* Fade old slide out */
        gsap.to(slides[prev], { opacity: 0, duration: 0.4, ease: 'power1.in' });
      }, 370);   /* ms per image — 370ms = ~8 images cycle in 3s */
    }

    /* ── 3. Progress bar: 0 → 100% (power2.inOut) ── */
    const obj = { v: 0 };
    gsap.to(obj, {
      v: 100,
      duration: TOTAL_SECS,
      ease: 'power2.inOut',
      onUpdate: function () {
        const pct = Math.round(obj.v);
        if (fill)      fill.style.width = pct + '%';
        if (percentEl) percentEl.textContent = pct + '%';
      },
      onComplete: function () {
        triggerFlash();
      },
    });
  }

  /* ─────────────────────────────────────────────────────────────
     ALL-SIDES FLASH REVEAL

     Phase 1 (0 – 0.30s)  : Four warm-white panels expand from top, bottom,
                             left, & right edges, converging to the center.
                             (power3.in — punchy, urgent)
     Phase 2 (0.30 – 0.475s): Solid-white hold so the flash registers.
     Phase 3 (0.475 – 0.875s): The four panels scale back to their edges.
                             Because they shrink toward the outer bounds, the
                             centre clears first — revealing the homepage
                             from the middle outward to all four sides.
                             (power2.out — smooth, deliberate reveal)
  ───────────────────────────────────────────────────────────── */
  function triggerFlash() {
    const flashTop    = document.getElementById('intro-flash-top');
    const flashBottom = document.getElementById('intro-flash-bottom');
    const flashLeft   = document.getElementById('intro-flash-left');
    const flashRight  = document.getElementById('intro-flash-right');

    /* Stop slideshow immediately */
    if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }

    const tl = gsap.timeline({ onComplete: completeIntro });

    /* ── Phase 1: panels close in from all 4 edges (≈ 300ms) ── */
    tl.to([flashTop, flashBottom], {
      scaleY: 1,
      duration: 0.30,
      ease: 'power3.in',
    }, 0)
    .to([flashLeft, flashRight], {
      scaleX: 1,
      duration: 0.30,
      ease: 'power3.in',
    }, 0)

    /* ── Phase 2: hold while fully white (175ms gap before next tween) ── */

    /* ── Phase 3: panels retreat to edges — centre clears first (≈ 400ms) ── */
    .to([flashTop, flashBottom], {
      scaleY: 0,
      duration: 0.40,
      ease: 'power2.out',
    }, 0.475)
    .to([flashLeft, flashRight], {
      scaleX: 0,
      duration: 0.40,
      ease: 'power2.out',
    }, 0.475);
  }

  /* ─────────────────────────────────────────────────────────────
     SKIP BUTTON
  ───────────────────────────────────────────────────────────── */
  const skipBtn = document.getElementById('intro-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      /* Kill any running tweens, skip straight to flash */
      gsap.killTweensOf('*');
      if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }

      /* Instant fill to 100% */
      const fill = document.getElementById('intro-bar-fill');
      const percentEl = document.getElementById('intro-percent');
      if (fill)      fill.style.width = '100%';
      if (percentEl) percentEl.textContent = '100%';

      triggerLightningFlash();
    });
  }

  /* ─────────────────────────────────────────────────────────────
     COMPLETE — remove overlay, restore scroll
  ───────────────────────────────────────────────────────────── */
  function completeIntro() {
    /* Reset any leftover transform from shake */
    overlay.style.transform = '';
    overlay.style.display   = 'none';
    document.body.classList.remove('intro-active');
    sessionStorage.setItem(SKIP_KEY, '1');

    /* Re-trigger intersection observer on visible elements */
    window.dispatchEvent(new Event('scroll'));
  }

  function fastExit() {
    overlay.style.display = 'none';
    document.body.classList.remove('intro-active');
  }

  /* ─────────────────────────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────────────────────────── */
  function preloadImages(srcs, cb) {
    if (!srcs.length) { cb(); return; }
    let n = 0;
    srcs.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = function () {
        if (++n === srcs.length) cb();
      };
      img.src = src;
    });
  }

  function waitForGSAP(cb) {
    if (typeof gsap !== 'undefined') { cb(); return; }
    /* Poll every 20ms (handles async GSAP script loading edge cases) */
    const id = setInterval(function () {
      if (typeof gsap !== 'undefined') {
        clearInterval(id);
        cb();
      }
    }, 20);
  }

})();
