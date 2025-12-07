export type Project = {
  title: string;
  status: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  gameDemo?: string; // For standalone game demos (separate from competition pages)
  external?: boolean; // For projects that open in new tab
  lastUpdated?: string; // For external collections
};

export const projects: Project[] = [
  {
    title: 'NPC Finder',
    status: 'In Development',
    description:
      'A full-stack application that manages media libraries, task systems, recipe workflows, and friend recommendations under a unified, privacy-focused architecture. Built with React 19, TypeScript, Vite, Tailwind, Framer Motion, and Supabase with PostgreSQL Row-Level Security. Implements forward-only migrations, React Query caching layers, reusable UI primitives, accessibility auditing, and a growing Vitest testing suite. Designed for self-hosting and long-term maintainability.',
    tech: [
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
    ],
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
  },
  {
    title: 'Personal Portfolio',
    status: 'Production',
    description:
      'Built a fully accessible, custom-themed portfolio and reusable component library using React 19, Vite, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, and modern development practices with comprehensive testing. Designed to showcase frontend architecture and component design patterns.',
    tech: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/aftongauntlett/react-portfolio',
  },
  {
    title: 'Gauntlet Designs',
    status: 'Production',
    description:
      'Professional closure website for Gauntlet Designs business, originally built with Vue 2 and evolved through many iterations over several years. Final version rebuilt with Vue 3, Vite, and Tailwind CSS featuring modern composition API, dark/light theme system, and accessible design. Serves as a graceful farewell while promoting ongoing freelance services.',
    tech: ['Vue 3', 'Vite', 'TypeScript', 'Tailwind CSS', 'CSS Custom Properties', 'Vercel'],
    link: 'https://github.com/gauntletdesigns/gauntlet-designs-vue',
    demo: 'https://gauntletdesigns.com/',
  },
  {
    title: 'Potomac Family Dining',
    status: 'Production',
    description:
      'Enterprise client website for Potomac Family Dining Group, a $300M annual revenue restaurant franchise operating across 5 states. Built comprehensive web platform featuring employee portal, career management system, multi-location directory, and contact forms. Engineered for high-traffic loads with robust performance optimization.',
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'HTML/CSS', 'Responsive Design'],
    link: '#',
    demo: 'https://potomacdining.com/',
  },
  {
    title: 'Nyx Felis & Lampyris - JS13k Games Entry',
    status: 'Production',
    description:
      'Created for the JS13k Games 2025 competition, this browser-based experience was engineered entirely under a 13 KB limit using pure HTML, CSS, and JavaScript. Focused on atmosphere and motion design, it uses Canvas 2D rendering, procedural particle systems, and Web Audio API sound design to deliver an expressive, optimized micro-game. Built to explore creative coding and constraint-driven development while demonstrating follow-through, polish, and efficient code craftsmanship.',
    tech: ['JavaScript', 'Canvas 2D', 'Web Audio API', 'Game Design', 'Particle Systems'],
    link: 'https://github.com/aftongauntlett/js13k-2025',

    demo: 'https://js13kgames.com/2025/games/nyx-felis-and-lampyris',
    external: true,
  },
];
