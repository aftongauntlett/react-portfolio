export type Project = {
  title: string;
  status: string;
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
    title: 'No Whiteboard Jobs Dashboard',
    status: 'Live',
    description:
      'A frontend dashboard built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. Includes full-text search, multi-filtering, card and list view modes, pagination, dark and light themes, and mobile-first navigation. Built with Astro and TypeScript, deployed on Vercel.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    external: true,
  },
  {
    title: 'NPC Finder',
    status: 'In Development',
    description:
      'A private social network built around the idea of no ads, no tracking, and no monetization. Combines customizable profiles, closed friend groups with moderation tools, and a virtual town where you can visit friends\u0027 homes and share media together in real time. Privacy and security are the core constraints, with Supabase, PostgreSQL Row-Level Security, and invite-only access. Built with React 19, TypeScript, Framer Motion, and React Query. Currently in active development for a small group of friends.',
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
    title: 'Potomac Family Dining',
    status: 'Live',
    description:
      'A client website for Potomac Family Dining Group, a multi-state restaurant franchise. Includes an employee portal, career management system, multi-location directory, and contact forms. Built for real-world traffic with a focus on performance and long-term maintainability.',
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'HTML/CSS', 'Responsive Design', 'Vercel'],
    demo: 'https://potomacdining.com/',
    external: true,
  },
  {
    title: 'Retro Portfolio Website',
    status: 'Live',
    description:
      'A production portfolio built as a constraint-driven experiment around late-90s browser assumptions. Uses HTML 4.0, table-based layouts, and no-JS navigation to ensure baseline functionality, with progressive enhancement layered on for modern browsers. Statically generated with Eleventy and deployed on Vercel, with an optional serverless visitor counter backed by Upstash Redis.',
    tech: [
      'Eleventy (11ty)',
      'Nunjucks',
      'JavaScript (ES Modules)',
      'HTML/CSS',
      'Progressive Enhancement',
      'Vercel',
      'Serverless Functions',
      'Upstash Redis',
      'Node.js',
    ],
    link: 'https://github.com/aftongauntlett/retro-portfolio',
    demo: 'https://afton-retro-portfolio.vercel.app/',
    external: true,
  },
  {
    title: 'Astrid Beauty Hair Salon',
    status: 'Live',
    description:
      'A production website for Astrid Beauty Salon, originally hand-built for a client with real customers. Rebuilt in 2026 as a full refactor and redesign on the original foundation. Focused on clear service presentation, pricing guidance, and a low-friction path to booking. Built with Astro and Tailwind on a performance-first, mobile-responsive layout with accessible markup and SEO-friendly structure.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Accessible UI patterns', 'SEO', 'Vercel'],
    link: 'https://github.com/aftongauntlett/astrid-beauty',
    demo: 'https://www.byastridbeautysalon.com/',
    external: true,
  },
  {
    title: 'Nyx Felis & Lampyris - JS13k Games Entry',
    status: 'Live',
    description:
      'Built for the JS13k Games 2025 competition under a strict 13 KB size limit using pure HTML, CSS, and JavaScript. Focused on atmosphere and motion design through Canvas 2D rendering, procedural particle systems, and Web Audio API sound. The size constraint shaped every decision toward tight, expressive code.',
    tech: ['JavaScript', 'Canvas 2D', 'Web Audio API', 'Game Design', 'Particle Systems', 'Vercel'],
    link: 'https://github.com/aftongauntlett/js13k-2025',
    demo: 'https://nyx-felis.aftongauntlett.com/',
    playable: true,
    external: true,
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    status: 'Live',
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
