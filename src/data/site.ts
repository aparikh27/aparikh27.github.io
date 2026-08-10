/** Site-wide profile and metadata. Edit here, not in components. */

export const site = {
  name: 'Arav Parikh',
  /** Used in <title> and structured data. */
  jobTitle: 'UCLA, Bachelor of Science in Computer Science & Engineering',
  url: 'https://aparikh27.github.io',
  description:
    'Engineer building AI-driven systems aimed at closing gaps in access to technology.',

  headline:
    "I don't want to build technology that only works for the people who already understand it. I want to build technology that works for people.",
  /**
   * The mission statement rendered in its own Hero panel, one entry per
   * paragraph. Kept as an array rather than a single string so Hero can
   * render true paragraph breaks instead of one dense block.
   */
  mission: [
    'I am a Computer Science and Engineering student at UCLA, exploring AI, software, robotics, and embedded systems. What connects these areas for me is the challenge of taking something difficult and turning it into something useful, intuitive, and accessible.',
    'I enjoy working on problems where the underlying technology is complicated but the final experience is not. Whether I am thinking about an AI system, a software product, a robotic system, or an embedded device, I keep coming back to the same question: How can I make this powerful technology simpler to use and more useful to the people who need it?',
    'That is the kind of engineer I want to become.',
    'I want to spend my career taking ambitious ideas, stripping away unnecessary complexity, and turning them into technology that people can actually use in their everyday lives.'
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
