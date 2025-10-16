export type Project = {
  title: string;
  status: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  external?: boolean; // For projects that open in new tab
  lastUpdated?: string; // For external collections
  postMortem?: string; // Link to blog post-mortem (for games)
};

export const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    status: 'Production',
    description:
      'Built a fully accessible, custom-themed portfolio and reusable component library using React 19, Vite, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, and modern development practices with comprehensive testing. Uses Claude Opus 4 and Sonnet 4 via GitHub Copilot Pro+ (2025 release) for deep code generation and debugging.',
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
    title: 'Nyx Felis & Lampyrus',
    status: 'Production',
    description:
      'JS13k 2025 competition entry - a calm, atmospheric collector with timing mechanics. Guide fireflies, evolve them with well-timed shields, and keep Nyx curious through the night. Built in vanilla JavaScript with Canvas 2D, procedural Web Audio, and particle effects under 13KB.',
    tech: ['JavaScript', 'Canvas 2D', 'Web Audio API', 'Game Design', 'Particle Systems'],
    link: 'https://github.com/aftongauntlett/js13k-2025',
    demo: 'https://nyx-felis.aftongauntlett.com',
    postMortem: '#projects/game-dev/js13k-2025-post-mortem',
  },
  {
    title: 'Orbital Order',
    status: 'Production',
    description:
      'JS13k 2025 practice project - a physics-based puzzle about guiding electrons into atomic orbitals following real chemistry rules. Features procedural audio, smooth particle motion, and orbital mechanics. Built in vanilla JavaScript under 13KB as a warm-up challenge.',
    tech: ['JavaScript', 'Canvas 2D', 'Physics Simulation', 'Procedural Audio'],
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com',
    postMortem: '#projects/game-dev/orbital-order-post-mortem',
  },
];
