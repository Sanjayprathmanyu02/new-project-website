# AgriSpike — Evidence & Documentation Hub
**Built by SenseiSquad · SIH 2026**

---

## Project Structure

```
Sensei_Squad_Website/
├── index.html          ← Main page (semantic HTML5, no hardcoded content)
├── styles.css          ← Full stylesheet (CSS custom properties, responsive)
├── script.js           ← All dynamic rendering & interactions
├── config.js           ← ★ EDIT THIS FILE to change images, links & text
├── images/
│   ├── hero_bg.jpg           ← Hero section background
│   ├── gallery_device.jpg    ← Gallery photo 1
│   ├── gallery_farmers.jpg   ← Gallery photo 2
│   ├── gallery_landscape.jpg ← Gallery photo 3
│   ├── video_thumbnail.jpg   ← Video player thumbnail
│   └── dashboard_mockup.jpg  ← CTA banner laptop/phone mockup
└── docs/
    ├── component-power-report.pdf   ← (place your PDF here)
    ├── bill-of-materials.pdf
    ├── water-yield-estimator.pdf
    ├── field-zoning-report.pdf
    └── business-model-report.pdf
```

---

## How to Edit Content (config.js)

Open **`config.js`** — this is the single source of truth for all content.

### Swap Images

```js
images: {
  hero: 'images/hero_bg.jpg',          // ← replace with your farm photo
  gallery: [
    'images/gallery_device.jpg',       // ← 4 gallery photos
    'images/gallery_farmers.jpg',
    'images/gallery_landscape.jpg',
    'https://placehold.co/...',        // ← add your 4th photo here
  ],
  videoThumbnail: 'images/video_thumbnail.jpg',
  dashboardMockup: 'images/dashboard_mockup.jpg',
  testimonialAvatars: ['path/to/murugan.jpg', 'path/to/vasudevan.jpg'],
  teamAvatars: ['path/sanjay.jpg', 'path/vignesh.jpg', ...],
}
```

### Change the Field Video

```js
links: {
  video: {
    type: 'youtube',          // 'youtube' or 'mp4'
    id:   'YOUR_YT_ID',       // YouTube video ID from the URL
    src:  '',                 // OR path to local/hosted mp4
    duration: '1:24',         // shown in the player bar
  },
}
```

### Link Technical Documents

```js
links: {
  documents: [
    'docs/component-power-report.pdf',  // Card 1
    'docs/bill-of-materials.pdf',       // Card 2
    'https://drive.google.com/...',     // Card 3 (can be external URL)
    'docs/field-zoning-report.pdf',     // Card 4
    'docs/business-model-report.pdf',   // Card 5
  ],
}
```

### Update the Main Website Link

```js
links: {
  mainWebsite: 'https://your-agrispike-url.com',
}
```

### Add / Edit Testimonials

```js
testimonials: [
  {
    quote: 'Your testimonial text here.',
    name:  'Name of person',
    role:  'Role, Location',
    theme: 'green',  // 'green' or 'blue' card background
  },
  // Add more objects here ↓
],
```
Testimonial avatars: add matching image path to `images.testimonialAvatars[]` at the same array index.

### Add / Edit Team Members

```js
team: [
  {
    name:        'Full Name',
    role:        'Role Title',
    description: 'Short responsibilities',
    link:        'https://linkedin.com/in/...',  // or '' to disable
  },
  // Add more members here ↓
],
```
Team avatars: add matching image path to `images.teamAvatars[]` at the same array index.

---

## Viewing the Site Locally

Simply open `index.html` in any modern browser:

```
Right-click index.html → Open with → Chrome / Firefox / Edge
```

Or use VS Code's **Live Server** extension for auto-refresh.

> **Note:** If images don't load when opened directly (`file://` protocol), serve with a local server:
> ```
> npx serve .
> ```
> Then visit `http://localhost:3000`

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| ≥ 1100px   | Full desktop (5-col docs, 6-col team) |
| 900–1100px | 3-col docs, 3-col team |
| 768–900px  | 2-col docs, 2-col team, stacked hero |
| < 768px    | Mobile (hamburger menu, 1-col docs) |

---

## Replacing Placeholder Images

All placeholder images use `https://placehold.co`. Replace them with real photos by updating `config.js`:

| Placeholder | Replace in config.js |
|-------------|----------------------|
| Team avatars | `images.teamAvatars[n]` |
| Testimonial avatars | `images.testimonialAvatars[n]` |
| 4th gallery photo | `images.gallery[3]` |

---

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, Grid, Flexbox, smooth animations
- **Vanilla JS** — no frameworks, no build step needed
- **Lucide Icons** — loaded via CDN
- **Google Fonts** — Inter + Poppins

---

*© 2026 AgriSpike | SenseiSquad*
