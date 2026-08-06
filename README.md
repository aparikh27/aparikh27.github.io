# Personal Portfolio Website

A high-performance, design-forward personal portfolio built with **Astro**, **React**, **TypeScript**, **Tailwind CSS**, and **WebGL / GSAP**. Designed with an editorial, minimalist aesthetic featuring a warm cream-and-navy palette and fluid canvas scroll interactions.

---

## Design & Aesthetic

- **Color Palette:**
  - **Canvas Primary:** Warm Soft Cream (`#FBF9F5`)
  - **Card / Surface:** Warm Almond / Sand (`#EAE3D2` / `#E8E1D5`)
  - **Text / Typography:** Deep Soft Navy (`#0A1120`)
  - **Accent / Micro-interactions:** Muted Slate (`#475569`) & Indigo
- **Typography:** Modern geometric sans-serif for body/headers paired with monospace (`JetBrains Mono`) for technical metadata and stack badges.
- **Interactivity:** WebGL scroll canvas shader transitions, GSAP ScrollTrigger kinetic typography, and fluid displacement motion across section boundaries.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (SSG, zero client-side JavaScript by default)
- **UI Components:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) + [Three.js](https://threejs.org/) / WebGL Canvas
- **Deployment:** [Vercel](https://vercel.com/) / Netlify

---

## Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── assets/              # Images, resume PDF, and static assets
├── src/
│   ├── components/
│   │   ├── ScrollCanvas.astro # Three.js / WebGL scroll displacement engine
│   │   ├── Hero.tsx         # Headline, mission, quick links & photo slot
│   │   ├── ProjectCard.tsx  # Modular card component for homepage & archive
│   │   ├── Navbar.tsx       # Minimal floating header
│   │   └── Footer.tsx       # Contact details & social links
│   ├── data/
│   │   └── projects.ts      # Strongly typed project objects & metadata
│   ├── layouts/
│   │   └── Layout.astro     # Global layout wrapper & meta tags
│   ├── pages/
│   │   ├── index.astro      # Main page (Hero, Vision, Top 3 Projects, Experience)
│   │   └── projects.astro   # Deep-dive full project archive
│   └── styles/
│       └── global.css       # Custom utility classes & CSS variables
├── tailwind.config.mjs      # Custom theme, colors, and typography config
└── astro.config.mjs
```

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your system.

### 2. Installation

```bash
# Clone repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 3. Development Server

Run the local development server with hot-module reloading:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to preview the site.

---

---

## 📦 Build & Deployment

Build the static production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
