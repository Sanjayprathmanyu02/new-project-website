/**
 * ============================================================
 *  AgriSpike — Evidence & Documentation Hub
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
    name: 'AgriSpike',
    tagline: 'Evidence & Documentation Hub',
    team: 'SenseiSquad',
    copyright: '© 2026 AgriSpike | SenseiSquad',
    quote: 'Technology in the field. For a better tomorrow.',
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
    logo: 'images/logo.png',

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
        'images/dashboard_mockup.png',    // Dashboard on laptop
        'images/soil_closeup.jpg',        // Soil sensor close-up
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
    dashboardMockup: 'images/dashboard_mockup.png',

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

    // Technical documentation — one URL per document card
    documents: [
      'docs/component-power-report.pdf',   // Card 1: Component & Power Report
      'docs/bill-of-materials.pdf',        // Card 2: Bill of Materials
      'docs/water-yield-estimator.pdf',    // Card 3: Water & Yield Impact Estimator
      'docs/field-zoning-report.pdf',      // Card 4: Field Zoning Report
      'docs/business-model-report.pdf',    // Card 5: Business Model Report
    ],

    // "Open AgriSpike Website" button in CTA banner
    mainWebsite: 'https://agri-spike.vercel.app/#/login',   // Replace with your live URL

    // Nav links (smooth scroll targets)
    nav: {
      home: '#hero',
      fieldValidation: '#field-validation',
      techDocs: '#tech-docs',
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
      quote: 'The idea genuinely addresses a real problem we face — knowing our field\'s condition without physically checking it every day. If this works as shown, it could save a lot of time and water.',
      name: 'R. Srinivasan',
      role: 'Farmer, Appakudal',
      theme: 'green',   // 'green' | 'blue'
    },
    {
      quote: 'The system shows great potential in real-time monitoring and smart irrigation. It is a valuable step towards precision agriculture in our region.',
      name: 'Dr. M. Vasudevan',
      role: 'Associate Professor, AG , BIT',
      theme: 'blue',
    },
    // Add more testimonials here — they appear automatically
  ],

  /* ──────────────────────────────────────────────────────────
     TECHNICAL DOCUMENTS (grid cards)
  ────────────────────────────────────────────────────────── */
  documents: [
    {
      title: 'Component & Power Report',
      subtitle: 'Sensing & Power System Justification Report',
      desc: 'Sensor-by-sensor engineering rationale, LoRa+ESP32 architecture, and a calculated 57-day zero-solar battery autonomy with 5.8× solar surplus.',
      fileUrl: 'docs/doc-01-sensing-power-justification.pdf',
      fileType: 'pdf',
      icon: 'battery-charging',
      buttonStyle: 'style-a'
    },
    {
      title: 'Bill of Materials',
      subtitle: 'AgriSpike SIH BOM',
      desc: 'Full 4-zone prototype costing — ₹5,381.64 in priced, required components — itemized by category with sourcing and quotation status.',
      fileUrl: 'docs/doc-02-bill-of-materials.xlsx',
      fileType: 'xlsx',
      icon: 'list',
      buttonStyle: 'style-b'
    },
    {
      title: 'Water & Yield Impact Estimator',
      desc: 'FAO-56/FAO-33 based model comparing zone-precision irrigation against uniform irrigation, with every input traceable — projected, pending full-season field validation.',
      fileUrl: 'docs/doc-03-water-yield-impact-estimator.xlsx',
      fileType: 'xlsx',
      icon: 'droplets',
      buttonStyle: 'style-c'
    },
    {
      title: 'Farmer Interview Reports',
      subtitle: 'Farmers_Report',
      desc: 'First-hand accounts from three farmers on current irrigation practices, soil testing gaps, and willingness to adopt automated soil-sensing and fertigation.',
      fileUrl: 'docs/doc-04-farmer-interview-reports.pdf',
      fileType: 'pdf',
      icon: 'users',
      buttonStyle: 'style-d'
    },
    {
      title: 'Patent & Prior-Art Research Report',
      desc: 'An honest preliminary IP study — identifies existing prior art and defines exactly where AgriSpike\'s novelty claim is focused, rather than claiming blanket originality.',
      fileUrl: 'docs/doc-05-patent-prior-art-research.pdf',
      fileType: 'pdf',
      icon: 'shield',
      buttonStyle: 'style-a'
    },
    {
      title: 'Individual Plant & Crop Requirements',
      desc: 'A crop-by-crop knowledge base (Tomato, Chilli, Brinjal, Onion, Banana) mapping soil, nutrient, and environmental needs to AgriSpike\'s automated recommendation logic.',
      fileUrl: 'docs/doc-06-plant-crop-requirements.pdf',
      fileType: 'pdf',
      icon: 'leaf',
      buttonStyle: 'style-b'
    },
    {
      title: 'LoRa Field Telemetry Report',
      desc: 'A decoded, real sensor-packet readout from a deployed node — soil moisture, battery health, irrigation flags — showing the system\'s live data output, not just its design.',
      fileUrl: 'docs/doc-07-lora-field-telemetry.pdf',
      fileType: 'pdf',
      icon: 'radio',
      buttonStyle: 'style-c'
    }
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
  GALLERY_IMAGES: Array.from({ length: 30 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      src: `images/gallery/gallery-${num}.jpg`,
      caption: `Field deployment photo ${i + 1} detailing system setup and crop health.`
    };
  }),

  /* ──────────────────────────────────────────────────────────
     SELF-HOSTED VIDEOS (For videos.html and homepage modal)
  ────────────────────────────────────────────────────────── */
  VIDEOS: [
    {
      src: 'videos/video-01.mp4',
      poster: 'images/video-thumbs/video-thumb-01.jpg',
      title: 'Farmer Interview — Vaniputhur',
      description: 'Everyday irrigation decisions, walked through with a local farmer'
    },
    {
      src: 'videos/video-02.mp4',
      poster: 'images/video-thumbs/video-thumb-02.jpg',
      title: 'Farmer Interview — Vembathi Field Session',
      description: 'Real-time soil and irrigation insights, reviewed on-site with the farmer'
    },
    {
      src: 'videos/video-03.mp4',
      poster: 'images/video-thumbs/video-thumb-03.jpg',
      title: 'Farmer Interview — Vembathi',
      description: 'Adoption experience, water savings, and yield impact — in the farmer\'s own words'
    },
    {
      src: 'videos/video-04.mp4',
      poster: 'images/video-thumbs/video-thumb-04.jpg',
      title: 'AgriSpike Node — Field-Deployed',
      description: 'The finished sensor spike, installed and running in real farm soil'
    },
    {
      src: 'videos/video-05.mp4',
      poster: 'images/video-thumbs/video-thumb-05.jpg',
      title: 'Prototype Overview',
      description: 'Full walkthrough of the hardware prototype: components, sensors, architecture'
    },
    {
      src: 'videos/video-06.mp4',
      poster: 'images/video-thumbs/video-thumb-06.jpg',
      title: 'Live Hardware Check — In the Field',
      description: 'Circuit and connectivity verified on-site, not just on the bench'
    }
  ],
};
