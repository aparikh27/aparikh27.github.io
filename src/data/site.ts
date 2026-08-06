/** Site-wide profile and metadata. Edit here, not in components. */

export interface ExperienceEntry {
  role: string;
  org: string;
  time: string;
  place: string;
  summary: string;
}

export const site = {
  name: 'Arav Parikh',
  /** Used in <title> and structured data. */
  jobTitle: 'Software Engineer',
  url: 'https://aravparikh.dev',
  description:
    'Software engineer building fast, accessible interfaces and the systems underneath them.',

  headline:
    'I build interfaces that stay fast under real conditions — and the systems underneath them that make that possible.',
  /** The mission statement rendered in its own Hero panel. */
  mission:
    'Most software is fast on a new laptop and slow everywhere else. I care about the gap: the render that blocks on a slow connection, the control a screen reader cannot reach, the dashboard that shows a regression without naming its cause. My work is aimed squarely at that gap — performance and accessibility treated as defaults rather than as cleanup.',

  headshot: {
    src: '/headshot.jpg',
    alt: 'Portrait of Arav Parikh',
  },

  links: {
    github: 'https://github.com/aravparikh',
    linkedin: 'https://www.linkedin.com/in/aravparikh',
    email: 'arav.parikh@crely.ai',
    /** Served from `public/`, so the browser downloads it directly. */
    resume: '/Arav-Parikh-Resume.pdf',
  },

  experience: [
    {
      role: 'Lead Engineer',
      org: 'Crely',
      time: '2024 — Present',
      place: 'Remote',
      summary:
        'Lead the edge runtime team: isolate scheduling, request routing, and the performance budget that gates every release.',
    },
    {
      role: 'Founding Front-End Engineer',
      org: 'Crely',
      time: '2023 — 2024',
      place: 'Remote',
      summary:
        'Built the design system and token pipeline used across six product surfaces, with accessibility checks enforced in CI.',
    },
    {
      role: 'Engineer',
      org: 'Independent',
      time: '2022 — 2023',
      place: 'Remote',
      summary:
        'Shipped developer tooling for front-end observability and plain-text accounting, focused on low-overhead instrumentation.',
    },
  ] satisfies ExperienceEntry[],
} as const;

export type Site = typeof site;
