export type Project = {
  title: string;
  status: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  external?: boolean; // For projects that open in new tab
  lastUpdated?: string; // For external collections
};

export const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    status: 'Production',
    description:
      'Built a fully accessible, custom-themed portfolio and reusable component library using React 19, Vite, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, and modern development practices with comprehensive testing. Uses Claude Opus 4 and Sonnet 4 via GitHub Copilot Pro+ (2025 release) for deep code generation and debugging.',
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
    title: 'Technical Blog',
    status: 'Collection',
    description:
      'In-depth technical writing covering development insights, post-mortems from game jams, and lessons learned from building complex frontend applications. Features markdown-based content, responsive design, and optimized reading experience.',
    tech: ['Career', 'Tech', 'Gaming', 'Development', 'Insights'],
    demo: '/blog',
    external: true,
    lastUpdated: 'September 2025',
  },
  {
    title: 'Interactive Games',
    status: 'Collection',
    description:
      'Creative coding projects and game development experiments, including entries from JS13k game jams and interactive web experiences showcasing advanced JavaScript techniques. Features canvas animations, game physics, and creative UI/UX.',
    tech: ['Phaser', 'Unity', 'JS13k', 'GMTK', 'Canvas', 'WebGL'],
    demo: '/games',
    external: true,
    lastUpdated: 'August 2025',
  },
];
