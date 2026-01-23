export type Project = {
  title: string;
  status: string;
  description: string;
  tech: string[];
  link?: string;
  caseStudy?: string;
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
    title: 'No Whiteboard Jobs Dashboard',
    status: 'Production',
    description:
      'A production-grade frontend dashboard built on top of the open-source Hiring Without Whiteboards dataset, transforming a large markdown-based company list into a fast, accessible, searchable web experience. Features full-text search, multi-filtering, responsive card and list views, pagination, dark and light themes, and mobile-first navigation. Built to make alternative interview processes easy to discover while preserving the original community-maintained data source.',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Accessible UI patterns', 'Vercel'],
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    external: true,
  },
  {
    title: 'Bloop Museum',
    status: 'In Development',
    description:
      'A retro-styled static website for the Bloop Museum, presenting museum information, collections, visiting and contact pages, and donor content. Optimized to render on vintage setups (Netscape 4.0 / Pentium 90) while maintaining modern browser compatibility through progressive enhancement. Built with Eleventy, Nunjucks templates, HTML 4.0 Transitional, and conservative CSS, featuring a table-based 760px layout and custom image optimization via Node.js.',
    tech: ['Eleventy', 'Nunjucks', 'HTML 4.0 Transitional', 'CSS', 'Node.js'],
    caseStudy: '/projects/bloop-museum-design-process',
    demo: 'https://bloop-demo.vercel.app/',
    external: true,
  },
  {
    title: 'Water App (Hydration Tracker)',
    status: 'In Progress',
    description:
      'A calm, mobile-first hydration tracker built with React Native + Expo. Users start a “drink moment” with a short countdown, log water intake when complete, and see a daily summary including drink count, total milliliters, and recent entries. Data is stored locally for a fast, offline-friendly experience, with a clean architecture separating UI, hooks, domain services, and storage. Includes a token-based dark theme, typed navigation, and accessibility-minded UI components.',
    tech: [
      'Expo (SDK 54)',
      'React Native',
      'TypeScript',
      'AsyncStorage',
    ],
    link: 'https://github.com/aftongauntlett/water-app',
    demo: '',
    external: true,
  },
  {
    title: 'Nyx Felis & Lampyris - JS13k Games Entry',
    status: 'Production',
    description:
      'Created for the JS13k Games 2025 competition, this browser-based experience was engineered entirely under a 13 KB limit using pure HTML, CSS, and JavaScript. Focused on atmosphere and motion design, it uses Canvas 2D rendering, procedural particle systems, and Web Audio API sound design to deliver an expressive, optimized micro-game. Built to explore creative coding and constraint-driven development while demonstrating follow-through, polish, and efficient code craftsmanship.',
    tech: ['JavaScript', 'Canvas 2D', 'Web Audio API', 'Game Design', 'Particle Systems'],
    caseStudy: '/blog/js13k-2025-post-mortem',
    link: 'https://github.com/aftongauntlett/js13k-2025',
    external: true,
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    status: 'Production',
    description:
      'Built for JS13K competition practice with vanilla JavaScript and Canvas 2D. Focused on core gameplay mechanics, level design, and intuitive controls within strict size constraints. Showcases efficient coding techniques and creative problem-solving under limitations.',
    tech: ['JavaScript', 'Canvas 2D', 'Web Audio API', 'Game Design', 'Physics Simulation'],
    caseStudy: '/blog/orbital-order-post-mortem',
    link: 'https://github.com/aftongauntlett/js13k-demo',
    external: true,
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
];
