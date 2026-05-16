export type ProjectStatus = 'Production' | 'Development';

export type Project = {
  title: string;
  status: ProjectStatus;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  playable?: boolean; // Renders "Play Game" instead of "View Live"
  external?: boolean; // For projects that open in new tab
  lastUpdated?: string; // For external collections
};

export const projects: Project[] = [
  {
    title: 'Pretty Pretty Pretty Good - Freelance Studio',
    status: 'Production',
    description:
      'My own freelance studio — a mission-driven practice focused on custom websites for nonprofits, community organizations, artists, and values-aligned people. The model is access-first: free when funding is not available, and sliding-scale when clients can contribute. Built with Astro and deployed on Vercel, with Upstash Redis for lightweight serverless data features.',
    tech: ['Astro', 'TypeScript', 'Upstash Redis', 'Vercel'],
    link: 'https://github.com/aftongauntlett/prettyprettyprettygood',
    demo: 'https://www.prettyprettyprettygood.org/',
    external: true,
  },
  {
    title: 'No Whiteboard Jobs Dashboard',
    status: 'Production',
    description:
      'A frontend dashboard I built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. Includes full-text search, multi-filtering, card and list view modes, pagination, dark and light themes, and mobile-first navigation. Built with Astro and TypeScript, deployed on Vercel.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    external: true,
  },
  {
    title: 'NPC Finder',
    status: 'Development',
    description:
      'My own private social network built around the idea of no ads, no tracking, and no monetization. Combines customizable profiles, closed friend groups with moderation tools, and a virtual town where you can visit friends\u0027 homes and share media together in real time. Privacy and security are the core constraints, with Supabase, PostgreSQL Row-Level Security, and invite-only access. Built with React 19, TypeScript, Framer Motion, and React Query. Currently in active development for a small group of friends.',
    tech: [
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
    ],
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    status: 'Production',
    description:
      'A physics-based puzzle game where you guide electrons into atomic orbitals using electromagnetic attraction and repulsion, inspired by the Aufbau principle. Designed around emergent behavior, requiring players to balance charge interactions, timing, and spatial positioning to reach stable configurations. Built with vanilla JavaScript and Canvas 2D under JS13k-style constraints, with a focus on tight mechanics, readable visual feedback, and efficient simulation.',
    tech: [
      'JavaScript',
      'Canvas 2D',
      'Web Audio API',
      'Game Design',
      'Physics Simulation',
      'Vercel',
    ],
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com/',
    playable: true,
    external: true,
  },
];
