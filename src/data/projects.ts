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
    title: 'Siren Song Shop',
    status: 'Production',
    description:
      'My own curated recommendation platform — an editorial-first alternative to affiliate storefronts, where every listing is hand-vetted for trust, ethics, and practical usefulness. Includes structured content collections, admin-authenticated publishing workflows, accessible component architecture, and lightweight atmospheric motion that respects reduced-motion preferences. Built with Astro and TypeScript, with Keystatic-powered content modeling and validation via Zod.',
    tech: ['Astro', 'TypeScript', 'Keystatic', 'Zod', 'React Islands', 'Vitest', 'Vercel'],
    link: 'https://github.com/aftongauntlett/siren-song-shop',
    demo: 'https://www.sirensongshop.com/',
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
    title: 'Ghostbusters Virginia — Community Franchise Website',
    status: 'Development',
    description:
      'A full redesign and rebuild of the Ghostbusters Virginia community website, replacing a legacy WordPress setup with a modern static architecture. Includes an event calendar with countdowns, photo gallery, press coverage page, appearance request flow, and a donation meter. Built with Astro, React Islands, and Markdoc, with content and layout cleanly separated so the team can update copy independently of design.',
    tech: ['Astro', 'TypeScript', 'React Islands', 'Markdoc', 'Vitest', 'Vercel'],
    link: 'https://github.com/ghostbustersvirginia/ghostbustersva',
    demo: '  https://gbva-site.vercel.app/',
    external: true,
  },
  {
    title: 'Astrid Beauty Hair Salon',
    status: 'Production',
    description:
      'A production website for Astrid Beauty Salon, originally hand-built for a client with real customers. Rebuilt in 2026 as a full refactor and redesign on the original foundation. Focused on clear service presentation, pricing guidance, and a low-friction path to booking. Built with Astro and Tailwind on a performance-first, mobile-responsive layout with accessible markup and SEO-friendly structure.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Accessible UI patterns', 'SEO', 'Vercel'],
    link: 'https://github.com/aftongauntlett/astrid-beauty',
    demo: 'https://www.byastridbeautysalon.com/',
    external: true,
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
