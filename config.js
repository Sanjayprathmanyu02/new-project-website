/**
 * ============================================================
 *  SkySync — From Block Forecasts to Panchayat Truth
 *  CONFIG FILE  ·  config.js
 * ============================================================
 *  Edit ALL images, links, videos, and text content here.
 *  You never need to touch index.html, styles.css, or script.js
 *  to swap out media or update copy.
 * ============================================================
 */

const CONFIG = {

  /* ──────────────────────────────────────────────────────────
     BRAND
  ────────────────────────────────────────────────────────── */
  brand: {
    name: 'SkySync',
    tagline: 'From Block Forecasts to Panchayat Truth',
    team: 'SenseiSquad',
    copyright: '© 2026 SkySync | SenseiSquad',
    quote: 'From block forecasts to panchayat truth.',
  },

  /* ──────────────────────────────────────────────────────────
     IMAGES
     Replace any value with a new URL or relative path.
     e.g.  hero: 'https://example.com/my-hero.jpg'
  ────────────────────────────────────────────────────────── */
  images: {
    // Hero section background (kept as fallback color only; marquee is the new hero BG)
    hero: 'images/hero_bg.jpg',

    // Main logo used across the site
    logo: 'images/logo.png', // LOGO_PLACEHOLDER — new SkySync logo to be added

    /* ── HERO MARQUEE IMAGES ─────────────────────────────────────
       Top row scrolls LEFT→RIGHT, bottom row scrolls RIGHT→LEFT.
       Each array is duplicated internally for seamless looping.
       Replace any path with your real project photos.
    ──────────────────────────────────────────────────────────── */
    marquee: {
      topRow: [
        'images/gallery_device.jpg',      // IoT device close-up
        'images/gallery_farmers.jpg',     // Farmers with device
        'images/gallery_landscape.jpg',   // Field landscape
        'images/video_thumbnail.jpg',     // Cinematic field shot
        'images/aerial_farm.jpg',         // Aerial drone view
      ],
      bottomRow: [
        'images/hero_bg.jpg',             // Sunset field + device
        'images/dashboard_mockup.jpg',    // Dashboard on laptop
        'images/soil_closeup.jpg',        // Ground node close-up
        'images/solar_panel.jpg',         // Solar panel close-up
        'images/gallery_landscape.jpg',   // Second landscape shot
      ],
    },


    // Photo gallery (4 images — Field Validation section)
    gallery: [
      'images/gallery_device.jpg',      // IoT device in field
      'images/gallery_farmers.jpg',     // Farmers group photo
      'images/gallery_landscape.jpg',   // Field landscape
      // 4th image — replace with your own photo
      'https://placehold.co/400x300/1a2e4a/4a9eff?text=Field+Close-up',
    ],

    // Video section thumbnail (shown before play)
    videoThumbnail: 'images/video_thumbnail.jpg',

    // Testimonial avatars  (index matches TESTIMONIALS array below)
    testimonialAvatars: [
      'https://placehold.co/60x60/2d5a27/ffffff?text=RS',    // Srinivasan
      'https://placehold.co/60x60/1a3a5c/ffffff?text=MV',   // Dr. M. Vasudevan
    ],

    // CTA banner — laptop+phone mockup
    dashboardMockup: 'images/dashboard_mockup.jpg',

    // Team member avatars (index matches TEAM array below)
    teamAvatars: [
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=SP',  // Sanjay
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=VV',  // Vigneshwaran
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=GS',  // Gokul
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=HS',  // Hariharan
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=SS',  // Shreya
      'https://placehold.co/120x120/0B1A2E/3B82F6?text=DB',  // Dharshan
    ],
  },

  /* ──────────────────────────────────────────────────────────
     LINKS
  ────────────────────────────────────────────────────────── */
  links: {
    // "View All Photos" link in Field Validation gallery
    viewAllPhotos: 'gallery.html',

    // Field video — YouTube embed ID OR direct mp4 URL
    video: {
      type: 'youtube',           // 'youtube' | 'mp4'
      id: 'dQw4w9WgXcQ',       // YouTube video ID (replace with your actual video ID)
      src: '',                  // Direct mp4 path (only used when type = 'mp4')
      duration: '1:24',
    },


    // "Open SkySync Website" button in CTA banner
    mainWebsite: 'https://skysync-smart-agriculture.vercel.app/',

    // Nav links (smooth scroll targets)
    nav: {
      home: '#hero',
      fieldValidation: '#field-validation',

      team: '#team',
    },

    // Social links for footer
    social: {
      github: 'https://github.com/Sanjayprathmanyu02',
      linkedin: 'https://www.linkedin.com/in/s-sanjay-prathmanyu/',
      email: 'mailto:sanjayprathmanyu@gmail.com',
    },
  },

  /* ──────────────────────────────────────────────────────────
     TESTIMONIALS
     Add or remove objects freely — the site adapts automatically.
  ────────────────────────────────────────────────────────── */
  testimonials: [
    {
      quote: '[Placeholder — insert a real quote from a panchayat officer, farmer, or advisor who has seen the SkySync concept/demo, once available]',
      name: '[Name Placeholder]',
      role: '[Role Placeholder]',
      theme: 'green',   // 'green' | 'blue'
    },
    {
      quote: '[Placeholder — insert a real quote from a panchayat officer, farmer, or advisor who has seen the SkySync concept/demo, once available]',
      name: '[Name Placeholder]',
      role: '[Role Placeholder]',
      theme: 'blue',
    },
    // Add more testimonials here — they appear automatically
  ],

  /* ──────────────────────────────────────────────────────────

     TEAM MEMBERS
     Add or remove members freely — grid adapts automatically.
  ────────────────────────────────────────────────────────── */
  team: [
    {
      name: 'Sanjay Prathmanyu S',
      role: 'Team Leader, Product and System Architecture',
      photo: 'images/team/team-01-sanjay.jpg',
      linkedin: 'https://www.linkedin.com/in/s-sanjay-prathmanyu/'
    },
    {
      name: 'Akshaya AS',
      role: 'Data Science, AI and Impact, Research',
      photo: 'images/team/team-02-akshaya.jpeg',
      linkedin: 'https://www.linkedin.com/in/akshaya-a-s-677a25384/'
    },
    {
      name: 'Dhivyasri J',
      role: 'Hardware and Embedded System',
      photo: 'images/team/team-03-dhivyasri.jpeg',
      linkedin: 'https://www.linkedin.com/in/dhivyasri-jayaram-329230332/'
    },
    {
      name: 'Thaniska B',
      role: 'Research, Validation and Documentation',
      photo: 'images/team/team-04-thaniska.jpeg',
      linkedin: 'https://www.linkedin.com/in/thaniska-balajagadeesan-4b9467369/'
    },
    {
      name: 'Kirubaasree PG',
      role: 'Frontend & User Experience',
      photo: 'images/team/team-05-kirubaasree.jpeg',
      linkedin: 'https://www.linkedin.com/in/kirubaasree-p-g-238220355/'
    },
    {
      name: 'Swathi S',
      role: 'Backend & Data Infrastructure',
      photo: 'images/team/team-06-swathi.jpeg',
      linkedin: 'https://www.linkedin.com/in/swathi-senthilkumar-5a9548339/'
    }
  ],

  /* ──────────────────────────────────────────────────────────
     FULL PHOTO GALLERY (30 Images for gallery.html)
  ────────────────────────────────────────────────────────── */
  GALLERY_IMAGES: Array.from({ length: 49 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      src: `images/gallery/gallery-${num}.jpg`,
      caption: `Field deployment photo ${i + 1} detailing system setup and node deployment.`
    };
  }),

  /* ──────────────────────────────────────────────────────────
     SELF-HOSTED VIDEOS (For videos.html and homepage modal)
  ────────────────────────────────────────────────────────── */
  VIDEOS: [
    {
      src: 'videos/video-01.mp4',
      poster: 'images/video-thumbs/video-thumb-01.png',
      title: 'Field Video 1',
      description: 'Field deployment footage — description to be added'
    },
    {
      src: 'videos/video-02.mp4',
      poster: 'images/video-thumbs/video-thumb-02.jpg',
      title: 'Field Video 2',
      description: 'Field deployment footage — description to be added'
    },
    {
      src: 'videos/video-03.mp4',
      poster: 'images/video-thumbs/video-thumb-03.jpg',
      title: 'Field Video 3',
      description: 'Field deployment footage — description to be added'
    },
    {
      src: 'videos/video-04.mp4',
      poster: 'images/video-thumbs/video-thumb-04.jpg',
      title: 'Field Video 4',
      description: 'Field deployment footage — description to be added'
    }
  ],
};
