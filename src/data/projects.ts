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
    status: 'Production',
    description:
      'A production-grade frontend dashboard built on top of the open-source Hiring Without Whiteboards dataset, transforming a large markdown-based company list into a fast, accessible, searchable web experience. Features full-text search, multi-filtering, responsive card and list views, pagination, dark and light themes, and mobile-first navigation. Built using AI agent workflows with Claude and GitHub Copilot for rapid development and consistent architecture.',
    tech: [
      'Astro',
      'TypeScript',
      'Tailwind CSS',
      'Accessible UI patterns',
      'Vercel',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    external: true,
  },
  {
    title: 'NPC Finder',
    status: 'Maintenance',
    description:
      'A large full-stack application for managing media libraries, task systems, recipe workflows, and friend recommendations under a privacy-focused architecture. Built with React 19, TypeScript, Vite, Tailwind, Framer Motion, and Supabase with PostgreSQL Row-Level Security. Includes forward-only migrations, React Query caching layers, reusable UI primitives, and accessibility-focused patterns. Developed using AI agent workflows for architecture planning, code generation, and iteration. Currently in maintenance mode while serving as a flagship architecture and systems-design project.',
    tech: [
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
  },
  {
    title: 'Potomac Family Dining',
    status: 'Production',
    description:
      'Enterprise client website for Potomac Family Dining Group, a multi-state restaurant franchise. Built a comprehensive web platform featuring an employee portal, career management system, multi-location directory, and contact forms. Engineered for high-traffic reliability with performance optimization and long-term maintainability.',
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'HTML/CSS', 'Responsive Design'],
    demo: 'https://potomacdining.com/',
    external: true,
  },
  {
    title: 'Astrid Beauty',
    status: 'Production',
    description:
      'A production website for Astrid Beauty Salon, originally hand-built for a client and used by real customers at scale. Rebuilt in 2026 using AI agent workflows as a full refactor and redesign on the original foundation. Focused on clear service presentation, pricing guidance, and a low-friction path to booking and contact. Built with a performance-first, mobile-responsive layout, accessibility-minded UI, SEO-friendly structure, and maintainable content updates.',
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
    status: 'Production',
    description:
      'Created for the JS13k Games 2025 competition, this browser-based experience was engineered entirely under a 13 KB limit using pure HTML, CSS, and JavaScript. Focused on atmosphere and motion design, it uses Canvas 2D rendering, procedural particle systems, and Web Audio API sound design to deliver an expressive, optimized micro-game. Developed with AI agent workflows to accelerate iteration within strict constraint-driven limits.',
    tech: [
      'JavaScript',
      'Canvas 2D',
      'Web Audio API',
      'Game Design',
      'Particle Systems',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/js13k-2025',
    demo: 'https://nyx-felis.aftongauntlett.com/',
    playable: true,
    external: true,
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    status: 'Production',
    description:
      'Built for JS13K competition practice with vanilla JavaScript and Canvas 2D. Focused on core gameplay mechanics, level design, and intuitive controls within strict size constraints. Developed with AI agent workflows for rapid iteration and creative problem-solving under limitations.',
    tech: [
      'JavaScript',
      'Canvas 2D',
      'Web Audio API',
      'Game Design',
      'Physics Simulation',
      'AI Workflows & Agents',
    ],
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com/',
    playable: true,
    external: true,
  },
];
