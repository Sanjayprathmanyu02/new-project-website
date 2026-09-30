/**
 * ============================================================
 *  SkySync — From Block Forecasts to Panchayat Truth
 *  script.js  ·  All dynamic behaviour
 * ============================================================
 *  Reads CONFIG from config.js (loaded first in index.html).
 *  Sections built dynamically:
 *    - Hero background
 *    - Photo gallery
 *    - Video player
 *    - Testimonials
 *    - CTA mockup
 *    - Team grid
 *    - Footer strings
 * ============================================================
 */

'use strict';

/* ────────────────────────────────────────────────────────────
   GUARD: ensure CONFIG exists
──────────────────────────────────────────────────────────── */
if (typeof CONFIG === 'undefined') {
  console.error('[SkySync] config.js not loaded. Check script order in index.html.');
}

/* ────────────────────────────────────────────────────────────
   ICON HELPER  (maps config icon names → lucide SVG strings)
──────────────────────────────────────────────────────────── */
const ICON_MAP = {
  'bolt':           `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  'clipboard-list': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  'droplets':       `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`,
  'map-pin':        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  'bar-chart-2':    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
};

function getIconSVG(name) {
  return ICON_MAP[name] || `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
}

/* ────────────────────────────────────────────────────────────
   INIT — runs after DOM is ready
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLogo();         // populate logo and animations
  initMarquee();      // hero marquee background
  initNavbar();
  initGallery();
  initVideo();

  initCTABanner();
  initTeam();
  initFooter();
  initScrollAnimations();
  initActiveNavTracking();
  lucide.createIcons(); // render all data-lucide icons
});

/* ────────────────────────────────────────────────────────────────
   1. HERO MARQUEE
   Populates both scrolling image tracks from CONFIG.images.marquee.
   Each set is duplicated once so the CSS @keyframes loop is seamless.
──────────────────────────────────────────────────────────────── */
function initMarquee() {
  const topTrack = document.getElementById('marquee-top-track');
  const botTrack = document.getElementById('marquee-bot-track');
  const marqueeConfig = CONFIG?.images?.marquee;

  if (!marqueeConfig || !topTrack || !botTrack) return;

  /**
   * Build a track: inject cards for each image, then duplicate
   * the full set so CSS translateX(-50%) creates a seamless loop.
   */
  function buildTrack(trackEl, images, altPrefix) {
    // Build once, then clone for the loop duplicate
    const fragment = document.createDocumentFragment();
    images.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'marquee-card';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${altPrefix} ${i + 1}`;
      img.loading = 'lazy';
      img.draggable = false;
      card.appendChild(img);
      fragment.appendChild(card);
    });

    // Append original set
    trackEl.appendChild(fragment.cloneNode(true));
    // Append duplicate set (for seamless loop)
    trackEl.appendChild(fragment.cloneNode(true));
  }

  buildTrack(topTrack, marqueeConfig.topRow    || [], 'Field photo top row');
  buildTrack(botTrack, marqueeConfig.bottomRow || [], 'Field photo bottom row');

  // Offset the RTL track slightly so the two rows don’t look identical
  botTrack.style.animationDelay = '-8s';

  // Mobile Parallax Effect for Marquee
  const heroMarquee = document.querySelector('.hero-marquee');
  if (heroMarquee) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768 && window.scrollY < window.innerHeight) {
        // Move marquee slightly slower than scroll speed
        const offset = window.scrollY * 0.35;
        heroMarquee.style.transform = `translateY(${offset}px)`;
      } else if (window.innerWidth > 768) {
        // Reset transform on desktop if resized
        heroMarquee.style.transform = 'translateY(0)';
      }
    }, { passive: true });
  }
}

/* ────────────────────────────────────────────────────────────
   2. NAVBAR  (sticky + hamburger)
──────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar      = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav   = document.getElementById('mobile-nav');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Hamburger toggle
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Set nav link URLs from config (if needed)
  const { nav } = CONFIG.links;
  if (nav) {
    const map = {
      'nav-home':  nav.home,
      'nav-field': nav.fieldValidation,
      'nav-team':  nav.team,
      'mnav-home':  nav.home,
      'mnav-field': nav.fieldValidation,
      'mnav-team':  nav.team,
    };
    Object.entries(map).forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el && href) el.href = href;
    });
  }
}

/* ────────────────────────────────────────────────────────────
   3. PHOTO GALLERY
──────────────────────────────────────────────────────────── */
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const viewAllLink = document.getElementById('view-all-photos-link');

  if (viewAllLink && CONFIG.links.viewAllPhotos) {
    viewAllLink.href = CONFIG.links.viewAllPhotos;
    if (!CONFIG.links.viewAllPhotos.startsWith('#')) {
      viewAllLink.target = '_blank';
      viewAllLink.rel = 'noopener noreferrer';
    }
  }

  if (!grid) return;

  const galleryConfig = CONFIG.images.gallery || [];
  const fullGallery = CONFIG.GALLERY_IMAGES || [];
  const totalCount = fullGallery.length;
  const remainingCount = Math.max(0, totalCount - 3);

  const images = [
    galleryConfig[0],
    galleryConfig[1],
    galleryConfig[2],
    fullGallery[3] ? fullGallery[3].src : (galleryConfig[3] || '')
  ];

  const altTexts = [
    'Ground node mounted in village',
    'Local officials and researchers discussing SkySync system',
    'Panchayat village landscape',
    'More field photos',
  ];

  images.forEach((src, i) => {
    if (i === 3) {
      const item = document.createElement('a');
      item.href = CONFIG.links.viewAllPhotos || 'gallery.html';
      item.className = 'gallery-item gallery-more-tile';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <img src="${src}" alt="${altTexts[i]}" loading="lazy" />
        <div class="gallery-more-overlay">
          <div class="more-content">
            <div class="more-count"><span class="more-pulse">+</span><span class="count-val" data-target="${remainingCount}">0</span></div>
            <span class="more-label">more photos</span>
          </div>
        </div>
      `;
      grid.appendChild(item);
    } else {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `<img src="${src}" alt="${altTexts[i] || 'Field photo'}" loading="lazy" />`;
      item.addEventListener('click', () => window.open(src, '_blank'));
      grid.appendChild(item);
    }
  });

  // Re-initialise lucide icons after DOM mutation
  lucide.createIcons();

  // GSAP animation for count up
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const countSpan = document.querySelector('.gallery-more-tile .count-val');
    if (countSpan) {
      gsap.registerPlugin(ScrollTrigger);
      const targetVal = parseInt(countSpan.getAttribute('data-target') || '0', 10);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: targetVal,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: countSpan,
          start: "top 85%"
        },
        onUpdate: () => {
          countSpan.textContent = Math.floor(counter.val);
        }
      });
    }
  }
}

/* ────────────────────────────────────────────────────────────
   4. VIDEO PLAYER (Native Modal)
──────────────────────────────────────────────────────────── */
function initVideo() {
  const thumbImg        = document.getElementById('video-thumbnail-img');
  const playBtn         = document.getElementById('play-btn');
  const watchLink       = document.getElementById('watch-video-link');
  const durationDisplay = document.getElementById('video-duration-display');
  const videoBadge      = document.getElementById('video-count-badge');

  // We use the first video in the new CONFIG.VIDEOS array for the homepage
  const totalVideos = CONFIG.VIDEOS ? CONFIG.VIDEOS.length : 1;
  const videoData = (CONFIG.VIDEOS && CONFIG.VIDEOS.length > 0) ? CONFIG.VIDEOS[0] : null;
  if (!videoData) return;

  // Set thumbnail
  if (thumbImg) {
    thumbImg.src = videoData.poster;
  }

  // Set dummy duration (or calculate dynamically if preferred)
  if (durationDisplay) {
    durationDisplay.textContent = `Play Video`;
  }

  // Set badge text
  if (videoBadge) {
    const span = videoBadge.querySelector('span');
    if (span) span.textContent = `1 of ${totalVideos} Videos`;
  }

  // "Watch Video →" link points to videos.html now (already set in HTML)
  if (watchLink) {
    watchLink.innerHTML = `Watch All ${totalVideos} Videos <i data-lucide="arrow-right" aria-hidden="true"></i>`;
    watchLink.href = 'videos.html';
  }

  // GSAP animation for stacked cards reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const videoWrap = document.querySelector('.video-card-wrap');
    const stack1 = document.querySelector('.video-stack-1');
    const stack2 = document.querySelector('.video-stack-2');
    if (videoWrap && stack1 && stack2) {
      gsap.fromTo([stack2, stack1], 
        { x: 0, y: 0, opacity: 0 },
        {
          x: (i, el) => el.classList.contains('video-stack-2') ? 16 : 8,
          y: (i, el) => el.classList.contains('video-stack-2') ? -16 : -8,
          opacity: (i, el) => el.classList.contains('video-stack-2') ? 0.3 : 0.6,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: videoWrap,
            start: "top 80%"
          },
          onComplete: () => {
            gsap.set([stack2, stack1], { clearProps: "all" });
          }
        }
      );
    }
  }

  // Modal elements
  const modal = document.getElementById('video-modal');
  const overlay = document.getElementById('video-modal-overlay');
  const closeBtn = document.getElementById('video-modal-close');
  const player = document.getElementById('native-video-player');
  const loader = document.getElementById('video-loader');

  if (!modal || !player) return;

  function openVideo() {
    player.src = videoData.src;
    player.poster = videoData.poster;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    loader.classList.add('active');
    player.play().catch(e => console.warn("Autoplay blocked:", e));
  }

  function closeVideo() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        player.pause();
        player.src = '';
        player.load();
      }
    }, 300);
  }

  // Player loading states
  player.addEventListener('playing', () => loader.classList.remove('active'));
  player.addEventListener('waiting', () => loader.classList.add('active'));
  player.addEventListener('canplay', () => loader.classList.remove('active'));

  // Listeners
  if (playBtn) playBtn.addEventListener('click', openVideo);
  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  if (overlay) overlay.addEventListener('click', closeVideo);

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeVideo();
    }
  });
}



/* ────────────────────────────────────────────────────────────
   7. CTA BANNER
──────────────────────────────────────────────────────────── */
function initCTABanner() {
  const websiteLink  = document.getElementById('main-website-link');
  const mockupImg    = document.getElementById('dashboard-mockup-img');

  if (websiteLink && CONFIG.links.mainWebsite) {
    websiteLink.href = CONFIG.links.mainWebsite;
  }
  if (mockupImg && CONFIG.images.dashboardMockup) {
    mockupImg.src = CONFIG.images.dashboardMockup;
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Text Reveal Stagger
    const reveals = document.querySelectorAll('#cta-banner .cta-reveal');
    const titleWords = document.querySelectorAll('#cta-banner .cta-word');
    
    // Hide initially for GSAP
    gsap.set(reveals, { opacity: 0, y: 30 });
    gsap.set(titleWords, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: "#cta-banner",
      start: "top 75%",
      onEnter: () => {
        // Animate title words with stagger
        gsap.to(titleWords, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
        
        // Animate remaining reveal elements
        gsap.to(reveals, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.3,
          ease: "power3.out"
        });
      }
    });

    // 3D Mockup Tilt-in
    const mockup = document.querySelector('#cta-banner .cta-mockup-floater');
    if (mockup) {
      gsap.fromTo(mockup,
        { opacity: 0, scale: 0.85, rotationY: 15, x: 20 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#cta-banner",
            start: "top 75%"
          },
          onComplete: () => {
            gsap.set(mockup, { clearProps: "transform" });
          }
        }
      );
    }
  }
}

/* ────────────────────────────────────────────────────────────
   8. TEAM GRID
──────────────────────────────────────────────────────────── */
function initTeam() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  const members = CONFIG.team || [];

  members.forEach((m) => {
    const card = document.createElement('div');
    card.className = 'team-card team-reveal';
    card.setAttribute('role', 'listitem');
    
    // Fallback image using placeholder
    const fallbackSrc = `https://placehold.co/400x500/E2E8F0/64748B?text=Team+Member`;
    const photoSrc = m.photo || fallbackSrc;

    card.innerHTML = `
      <a class="team-photo-wrapper" href="${m.linkedin || '#'}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(m.name)} LinkedIn Profile">
        <img class="team-photo"
             src="${photoSrc}"
             alt="Photo of ${escapeHTML(m.name)}"
             loading="lazy"
             onerror="this.src='${fallbackSrc}'" />
        <div class="team-photo-overlay"></div>
        <div class="team-linkedin-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </div>
      </a>
      <div class="team-info">
        <span class="team-name">${escapeHTML(m.name)}<span class="team-name-underline"></span></span>
        <span class="team-role">${escapeHTML(m.role)}</span>
      </div>
    `;

  // 3D Parallax Hover Effect
  if (window.matchMedia("(hover: hover)").matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      // Let CSS handle the smooth return transition
    });
  }

  grid.appendChild(card);
});

// GSAP ScrollTrigger Animation for Team Cards
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  const cards = document.querySelectorAll('.team-reveal');
  if (cards.length > 0) {
    // Set initial state for cards
    gsap.set(cards, { opacity: 0, scale: 0.85, y: 60 });
    
    // Set initial state for photos (blur/dim reveal)
    const photos = document.querySelectorAll('.team-reveal .team-photo');
    if (photos.length > 0) gsap.set(photos, { filter: 'blur(10px) brightness(0.5)' });

    ScrollTrigger.create({
      trigger: "#team-grid",
      start: "top 80%",
      onEnter: () => {
        // Animate Cards
        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          clearProps: "transform" // clear GSAP transform so CSS hover can take over smoothly
        });
        
        // Animate Photos
        if (photos.length > 0) {
          gsap.to(photos, {
            filter: 'blur(0px) brightness(1)',
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "filter"
          });
        }
      }
    });
  }
}
}

/* ────────────────────────────────────────────────────────────
   9. FOOTER TEXT FROM CONFIG
──────────────────────────────────────────────────────────── */
function initFooter() {
  const quoteEl     = document.getElementById('footer-quote-text');
  const copyrightEl = document.getElementById('footer-copyright-text');
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('footer-btt-link');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Floating Back to Top Button
  const floatingBtt = document.getElementById('floating-btt');
  if (floatingBtt) {
    window.addEventListener('scroll', () => {
      // Show when scrolled past 300px
      const isPastThreshold = window.scrollY > 300;
      
      // Hide when near the bottom (where the footer inline back-to-top is)
      // We use -100px as a safe threshold before the absolute bottom
      const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;

      if (isPastThreshold && !isNearBottom) {
        floatingBtt.classList.add('visible');
      } else {
        floatingBtt.classList.remove('visible');
      }
    }, { passive: true });

    floatingBtt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Social Links
  const githubLink = document.getElementById('social-github');
  const linkedinLink = document.getElementById('social-linkedin');
  const emailLink = document.getElementById('social-email');

  if (CONFIG.social) {
    if (githubLink && CONFIG.social.github) githubLink.href = CONFIG.social.github;
    if (linkedinLink && CONFIG.social.linkedin) linkedinLink.href = CONFIG.social.linkedin;
    if (emailLink && CONFIG.social.email) emailLink.href = CONFIG.social.email;
  }

  if (quoteEl && CONFIG.brand.quote) {
    quoteEl.innerHTML = `<em>"${escapeHTML(CONFIG.brand.quote)}"</em>`;
  }
  if (copyrightEl && CONFIG.brand.copyright) {
    copyrightEl.textContent = CONFIG.brand.copyright;
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const footerCols = document.querySelectorAll('.footer-reveal');
    const socialIcons = document.querySelectorAll('.social-icon-wrapper');

    if (footerCols.length > 0) {
      gsap.set(footerCols, { opacity: 0, y: 40 });
      if (socialIcons.length > 0) gsap.set(socialIcons, { opacity: 0, scale: 0.8 });

      ScrollTrigger.create({
        trigger: "#footer",
        start: "top 85%",
        onEnter: () => {
          gsap.to(footerCols, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          });
          
          if (socialIcons.length > 0) {
            gsap.to(socialIcons, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.5,
              ease: "back.out(1.5)"
            });
          }
        }
      });
    }
  }
}

/* ────────────────────────────────────────────────────────────
   10. SCROLL ANIMATIONS (Intersection Observer)
──────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll('.fade-in')]
            : [entry.target];
          const order = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(order * 80, 400)}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────────────────────
   11. ACTIVE NAV LINK (scroll spy)
──────────────────────────────────────────────────────────── */
function initActiveNavTracking() {
  const sections = [
    { id: 'hero',             navId: 'nav-home'  },
    { id: 'field-validation', navId: 'nav-field' },
    { id: 'team',             navId: 'nav-team'  },
  ];

  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const sec = sections.find(s => s.id === entry.target.id);
        if (!sec) return;

        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.getElementById(sec.navId);
        if (active) active.classList.add('active');
      });
    },
    { rootMargin: '-50% 0px -45% 0px' }
  );

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ────────────────────────────────────────────────────────────
   12. LOGO & ANIMATIONS
──────────────────────────────────────────────────────────── */
function initLogo() {
  const logoSrc = CONFIG?.images?.logo;
  if (!logoSrc) return;

  // Set SRC for all logo images
  document.querySelectorAll('.logo-image').forEach(img => {
    img.src = logoSrc;
  });

  if (typeof gsap === 'undefined') return;

  // 1. Entrance Animation for Hero Logo
  const heroLogo = document.querySelector('.hero-leaf-icon');
  if (heroLogo) {
    // Adding a slight delay so it happens after the loading screen
    gsap.fromTo(heroLogo, 
      { scale: 0.7, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)', delay: 0.4 }
    );
  }

  // 2. Hover Interaction for Navbar Logo
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    const navLogoIcon = navLogo.querySelector('.logo-icon');
    const navLogoImg = navLogo.querySelector('.logo-image');
    
    navLogo.addEventListener('mouseenter', () => {
      gsap.to(navLogoIcon, { scale: 1.1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      if (navLogoImg) gsap.to(navLogoImg, { filter: 'brightness(1.2)', duration: 0.3, overwrite: 'auto' });
    });
    navLogo.addEventListener('mouseleave', () => {
      gsap.to(navLogoIcon, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      if (navLogoImg) gsap.to(navLogoImg, { filter: 'brightness(1)', duration: 0.3, overwrite: 'auto' });
    });
  }

  // 3. Scroll-Based Shrink for Navbar Logo
  const navIcon = document.querySelector('.nav-logo .logo-icon');
  if (navIcon && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(navIcon, {
      scale: 0.85,
      scrollTrigger: {
        trigger: 'body',
        start: 'top -100',
        end: 'top -100',
        toggleActions: 'play none reverse none',
      }
    });
  }
}

/* ────────────────────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────────────────────── */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

function getInitials(name) {
  if (!name) return 'T';
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
