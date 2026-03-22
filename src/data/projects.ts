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
      'A frontend dashboard built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. Includes full-text search, multi-filtering, card and list view modes, pagination, dark and light themes, and mobile-first navigation. Built with Astro and TypeScript, deployed on Vercel. Used Traycer and GitHub Copilot Pro+ for architecture planning, component scaffolding, and faster implementation.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel', 'AI Workflows & Agents'],
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
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
  },
  {
    title: 'Potomac Family Dining',
    status: 'Live',
    description:
      'A client website for Potomac Family Dining Group, a multi-state restaurant franchise. Includes an employee portal, career management system, multi-location directory, and contact forms. Built for real-world traffic with a focus on performance and long-term maintainability. No AI tools were used on this project.',
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'HTML/CSS', 'Responsive Design', 'Vercel'],
    demo: 'https://potomacdining.com/',
    external: true,
  },
  {
    title: 'Retro Portfolio Website',
    status: 'Live',
    description:
      'A production portfolio website built as a constraint-driven frontend engineering experiment, testing what shipping for late-90s browser assumptions actually feels like in practice. Core functionality uses HTML 4.0 Transitional markup, table-based layouts, and no-JavaScript-required navigation so the experience stays usable in legacy-style environments, including VM testing. Modern browsers then get progressive enhancement through layered CSS and optional scripting for a cleaner UX. Statically generated with Eleventy and Nunjucks, deployed on Vercel, with an optional serverless SVG visitor counter backed by Upstash Redis.',
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
    tech: [
      'Astro',
      'TypeScript',
      'Tailwind CSS',
      'Accessible UI patterns',
      'SEO',
      'Vercel',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/astrid-beauty',
    demo: 'https://www.byastridbeautysalon.com/',
    external: true,
  },
  {
    title: 'Nyx Felis & Lampyris - JS13k Games Entry',
    status: 'Live',
    description:
      'Built for the JS13k Games 2025 competition under a strict 13 KB size limit using pure HTML, CSS, and JavaScript. Focused on atmosphere and motion design through Canvas 2D rendering, procedural particle systems, and Web Audio API sound. The size constraint shaped every decision toward tight, expressive code.',
    tech: [
      'JavaScript',
      'Canvas 2D',
      'Web Audio API',
      'Game Design',
      'Particle Systems',
      'Vercel',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/js13k-2025',
    demo: 'https://nyx-felis.aftongauntlett.com/',
    playable: true,
    external: true,
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    status: 'Live',
    description:
      'Built as JS13k competition practice with vanilla JavaScript and Canvas 2D. Focused on gameplay mechanics, level design, and intuitive controls within the same strict size constraints. Used AI-assisted workflows for prototyping and iteration.',
    tech: [
      'JavaScript',
      'Canvas 2D',
      'Web Audio API',
      'Game Design',
      'Physics Simulation',
      'Vercel',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com/',
    playable: true,
    external: true,
  },
];
