/**
 * Single source of truth for every project surfaced on the site.
 *
 * The homepage renders `getFeaturedProjects()` (concise cards); `/projects`
 * renders `getAllProjects()` (expanded cards). Adding a project here is the
 * only edit required to surface it in both places.
 */

/** A key outcome worth calling out on the card — ideally quantified. */
export interface ProjectHighlight {
  /** Short label, e.g. "p95 latency" or "Users". */
  label: string;
  /** The number or claim itself, e.g. "42ms" or "12k+". */
  value: string;
  /** Optional deep link backing up the claim (benchmark, PR, write-up). */
  href?: string;
}

export interface Project {
  /** Stable, URL-safe id. Used for React keys and `#anchor` links. */
  slug: string;
  title: string;
  /** One-sentence hook. Kept short — it renders as the card subtitle. */
  tagline: string;
  /** One paragraph. Shown in full on `/projects`, clamped on the homepage. */
  description: string;
  /** Key tech/impact metrics to highlight. */
  highlights: ProjectHighlight[];
  /** Technologies, rendered as uniform chips. */
  stack: string[];
  role: string;
  /** Human-readable range, e.g. "2024 — Present". */
  time: string;
  place: string;
  /** One sentence tying this work back to the overall mission. */
  visionLink: string;
  github?: string;
  demo?: string;
  /** Path under `public/`, or a remote URL. */
  image?: string;
  /** Featured projects appear on the homepage, ordered by array position. */
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'atlas-edge-runtime',
    title: 'Atlas Edge Runtime',
    tagline:
      'A zero-cold-start edge runtime that puts application logic within 20ms of every user.',
    description:
      'Atlas is a V8-isolate-based runtime that replaces per-request container boots with warm, sandboxed isolates scheduled across 30 points of presence. I designed the request router and the isolate lifecycle manager, including a snapshot format that restores heap state in under a millisecond. The hardest problem was fair scheduling: a noisy tenant could previously starve neighbours on the same node, so I added a weighted work-stealing queue with per-tenant CPU budgets that kept tail latency flat under 10x load spikes.',
    highlights: [
      { label: 'p95 cold start', value: '0.8ms' },
      { label: 'Edge locations', value: '30' },
      { label: 'Requests/day', value: '48M' },
    ],
    stack: ['Rust', 'V8', 'TypeScript', 'WebAssembly', 'Kubernetes', 'Terraform'],
    role: 'Lead Engineer',
    time: '2024 — Present',
    place: 'Crely',
    visionLink:
      'Fast software is accessible software — latency is a tax paid hardest by users on the worst connections.',
    github: 'https://github.com/aravparikh/atlas-edge-runtime',
    demo: 'https://atlas.example.dev',
    image: '/projects/atlas.png',
    isFeatured: true,
  },
  {
    slug: 'lucid-design-system',
    title: 'Lucid Design System',
    tagline:
      'An accessibility-first component library that made WCAG 2.2 AA the default, not the cleanup task.',
    description:
      'Lucid is a headless React component library and token pipeline used across six product surfaces. Every primitive ships with keyboard interaction, focus management, and screen-reader semantics built in, and the CI pipeline fails a PR if an axe-core violation or a contrast regression is introduced. I built the token system that compiles a single source of truth into CSS variables, Tailwind theme values, and Figma variables, which removed the drift that used to force designers and engineers to reconcile colours by hand every release.',
    highlights: [
      { label: 'Axe violations', value: '0 in CI' },
      { label: 'Components', value: '64' },
      { label: 'Bundle (gzip)', value: '11kb' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook', 'Vitest'],
    role: 'Founding Front-End Engineer',
    time: '2023 — 2024',
    place: 'Crely',
    visionLink:
      'Accessibility belongs in the defaults; if it is opt-in, it is a feature that will eventually be skipped.',
    github: 'https://github.com/aravparikh/lucid',
    demo: 'https://lucid.example.dev',
    image: '/projects/lucid.png',
    isFeatured: true,
  },
  {
    slug: 'signal-observability',
    title: 'Signal',
    tagline:
      'A front-end observability pipeline that traces a slow render back to the commit that caused it.',
    description:
      'Signal instruments real-user sessions and correlates Core Web Vitals with deploy metadata, so a regression in INP surfaces as a named pull request rather than a shrugging dashboard. I wrote the browser SDK — a 4kb collector that batches over the Reporting API and never blocks the main thread — and the ingestion service that aggregates percentiles at write time. Teams cut their median time-to-diagnosis from roughly two days to under an hour because the tool answers "which change did this" instead of only "something got slower".',
    highlights: [
      { label: 'SDK size', value: '4.1kb' },
      { label: 'Time to diagnose', value: '2d → 50m' },
      { label: 'Sessions/mo', value: '9M' },
    ],
    stack: ['TypeScript', 'Go', 'ClickHouse', 'React', 'OpenTelemetry'],
    role: 'Engineer',
    time: '2023',
    place: 'Independent',
    visionLink:
      'You cannot keep an interface fast without a feedback loop that names the exact regression.',
    github: 'https://github.com/aravparikh/signal',
    isFeatured: true,
  },
  {
    slug: 'ledger-cli',
    title: 'Ledger CLI',
    tagline: 'A plain-text accounting tool that reconciles a year of transactions in one pass.',
    description:
      'Ledger CLI parses double-entry journals and reconciles them against bank exports, flagging mismatches with the specific line and suggested correction. I rewrote the parser as a streaming tokenizer, which dropped memory use on a 200MB journal from 1.8GB to about 60MB and made the tool usable on modest hardware.',
    highlights: [
      { label: 'Peak memory', value: '1.8GB → 60MB' },
      { label: 'Parse throughput', value: '240MB/s' },
    ],
    stack: ['Rust', 'Clap', 'Serde'],
    role: 'Author',
    time: '2022 — 2023',
    place: 'Open source',
    visionLink:
      'Tools that respect the machine they run on stay usable long after the hype cycle moves on.',
    github: 'https://github.com/aravparikh/ledger-cli',
    isFeatured: false,
  },
  {
    slug: 'campus-transit',
    title: 'Campus Transit',
    tagline: 'A real-time shuttle tracker built for a campus with patchy cellular coverage.',
    description:
      'Campus Transit shows live shuttle positions and honest arrival estimates, and it keeps working when the network does not. The client is offline-first: it caches the route graph and last-known vehicle states in IndexedDB and degrades to a schedule-based estimate rather than showing a spinner. Around 3,000 students use it weekly during term.',
    highlights: [
      { label: 'Weekly users', value: '3,000' },
      { label: 'Works offline', value: 'Full route data' },
      { label: 'Lighthouse', value: '100 / 100' },
    ],
    stack: ['React', 'TypeScript', 'Service Workers', 'MapLibre', 'Node.js'],
    role: 'Creator',
    time: '2022',
    place: 'University',
    visionLink:
      'Software should degrade gracefully — the worst network conditions are the ones that matter most.',
    github: 'https://github.com/aravparikh/campus-transit',
    demo: 'https://transit.example.dev',
    isFeatured: false,
  },
];

/** Featured projects for the homepage, capped at `limit` (default 3). */
export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}

/** Every project, for the `/projects` archive. */
export function getAllProjects(): Project[] {
  return projects;
}
