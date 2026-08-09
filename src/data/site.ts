/** Site-wide profile and metadata. Edit here, not in components. */

export const site = {
  name: 'Arav Parikh',
  /** Used in <title> and structured data. */
  jobTitle: 'UCLA, Bachelor of Science in Computer Science & Engineering',
  url: 'https://aparikh27.github.io',
  description:
    'Engineer building AI-driven systems aimed at closing gaps in access to technology.',

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
} as const;

export type Site = typeof site;
