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
  jobTitle: 'Computer Science & Engineering, UCLA',
  url: 'https://aparikh27.github.io',
  description:
    'Engineer building AI-driven systems — from multi-agent robotics to genomic deep learning — aimed at closing gaps in access to technology.',

  headline:
    'I build AI-driven systems, from multi-agent robotics to genomic deep learning, aimed at closing the gap between opportunity and access.',
  /**
   * The mission statement rendered in its own Hero panel, one entry per
   * paragraph. Kept as an array rather than a single string so Hero can
   * render true paragraph breaks instead of one dense block.
   */
  mission: [
    'My motivation for pursuing Computer Science and Engineering at UCLA stems from seeing how technology can mean the difference between opportunity and limitation. Early experiences revealed how communities are left behind not for lack of talent, but for lack of access to innovation. This drives my mission: to apply engineering as a tool for equity by developing scalable and accessible technologies that close global gaps.',
    'At the intersection of computer science, AI, and global development, I aim to tackle interdisciplinary challenges by incorporating diversity of thought — combining a wide range of racial, socio-economic, and academic perspectives into the problem-solving process — to cultivate inclusivity and drive innovation. I’m eager to apply my experience in AI research, software engineering, and collaborative problem-solving to challenge the status quo, expand access to technology, and help billions reach their goals.',
  ],

  headshot: {
    src: '/headshot.jpg',
    alt: 'Portrait of Arav Parikh',
  },

  links: {
    github: 'https://github.com/aparikh27',
    linkedin: 'https://www.linkedin.com/in/aravparikh',
    email: 'aparikh27@g.ucla.edu',
    /** Served from `public/`, so the browser downloads it directly. */
    resume: '/Arav-Parikh-Resume.pdf',
  },

  /** Reverse-chronological. Rendered as a quick-scan timeline on the homepage;
   *  the same roles get full case-study treatment in `projects.ts`. */
  experience: [
    {
      role: 'Founder & Lead Engineer',
      org: 'BAI',
      time: 'June 2026 — Present',
      place: 'BAI',
      summary:
        'Building a multi-agent robotics stack pairing an event-driven agent framework with a C++20 embedded runtime, coordinating vision, speech, planning, and execution agents in real time.',
    },
    {
      role: 'Full Stack Developer',
      org: 'Crely Inc',
      time: 'January 2026 — Present',
      place: 'Remote',
      summary:
        'Engineering ML pipelines that classify, detect, and forecast arrhythmias from real-time cardiac sensor streams, for continuous, personalized monitoring.',
    },
    {
      role: 'Full Stack Developer, Academic Chair',
      org: 'Biomedical Engineering Society',
      time: 'October 2025 — Present',
      place: 'Biomedical Engineering Society',
      summary:
        'Architected an end-to-end IoT ecosystem for a smart post-operative knee brace — BLE sensor streaming, a Django/AWS backend, and clinician-facing React dashboards.',
    },
    {
      role: 'Computational Biology Research Intern',
      org: 'The Ernst Lab, UCLA',
      time: 'October 2025 — Present',
      place: 'The Ernst Lab, UCLA',
      summary:
        'Fine-tuning genomic foundation models (DNABERT-2, Enformer) to predict chromatin states from raw DNA sequence at gigabyte scale.',
    },
    {
      role: 'Mathematics Instructor',
      org: 'Ardent Academy',
      time: 'October 2025 — Present',
      place: 'Ardent Academy',
      summary:
        'One-on-one and Olympiad-track math instruction for 1st–10th grade students, from foundational arithmetic through competitive problem-solving.',
    },
    {
      role: 'Robotics Intern',
      org: 'Yolo Basin Foundation',
      time: 'August 2024 — June 2025',
      place: 'Yolo Basin Foundation',
      summary:
        'Prototyped a solar-powered IoT sensor platform running on-device computer vision for real-time wildlife tracking in remote habitats.',
    },
    {
      role: 'Data Science Research Intern',
      org: 'The Roncali Lab, UC Davis',
      time: 'June 2024 — January 2025',
      place: 'The Roncali Lab, UC Davis',
      summary:
        'Built an asynchronous pipeline for gigabyte-scale 3D dosimetry, interfacing Python with C++ Monte Carlo simulation for radiation therapy planning.',
    },
    {
      role: 'Co-Founder',
      org: 'E=MC² Math Enrichment Program',
      time: 'August 2022 — August 2025',
      place: 'E=MC² Math Enrichment Program',
      summary:
        'Co-founded and ran an after-school math enrichment program for 400+ district students, measuring a 70%+ average diagnostic performance gain.',
    },
    {
      role: 'AI Research Intern',
      org: 'Stanford Center for AI in Medicine and Imaging',
      time: 'June 2023',
      place: 'Stanford Center for AI in Medicine and Imaging',
      summary:
        'Built a multi-modal ML pipeline to verify spatial alignment across 10,000+ medical images, shipping a ResNet50 model at 0.8623 AUROC.',
    },
  ] satisfies ExperienceEntry[],
} as const;

export type Site = typeof site;
