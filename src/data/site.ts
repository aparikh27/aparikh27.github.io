/** Site-wide profile and metadata. Edit here, not in components. */

export const site = {
  name: 'Arav Parikh',
  /** Used in <title> and structured data. */
  jobTitle: 'UCLA, Bachelor of Science in Computer Science & Engineering',
  url: 'https://aparikh27.github.io',
  description:
    'Engineer building AI-driven systems aimed at closing gaps in access to technology.',

  headline:
    "I don't want to build technology that only works for the people who already understand it. I want to build technology that works for everyone.",
  /**
   * The mission statement rendered in its own Hero panel, one entry per
   * paragraph. Kept as an array rather than a single string so Hero can
   * render true paragraph breaks instead of one dense block.
   */
  mission: [
    "I'm a Computer Science and Engineering student at UCLA, exploring AI, software, robotics, and embedded systems. What connects these areas for me is the challenge of taking something difficult and turning it into something useful, intuitive, and accessible.",
    "I enjoy working on problems where the underlying technology is complicated but the final experience isn’t. Whether I'm thinking about an AI system, a software product, a robotic system, or an embedded device, I keep coming back to the same question: How can I make this simpler to use and more accessible to the people who need it?",
    "That's what engineering is for me. ",
  ],

  headshot: {
    src: '/headshot.png',
    alt: 'Portrait of Arav Parikh',
  },

  links: {
    github: 'https://github.com/aparikh27',
    linkedin: 'https://www.linkedin.com/in/aravparikh',
    email: 'aparikh27@g.ucla.edu',
    /** Served from `public/`, so the browser downloads it directly. */
    resume: '/resume.pdf',
  },
} as const;

export type Site = typeof site;
