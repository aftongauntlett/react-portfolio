export type Project = {
  title: string;
  status: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
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
    title: 'JS13k 2025 Game Submission – The Cat & The Luminid',
    status: 'Production',
    description:
      'My official JS13k competition entry, built under the strict 13KB size limit. A minimalist browser game featuring unique mouse-driven mechanics and atmospheric design. Focused on performance and bundle optimization, using compression tools (Roadroller, Terser) to fit advanced visuals and animations within the size cap.',
    tech: ['HTML', 'CSS', 'Vanilla JavaScript', 'Canvas 2D', 'Vite'],
    link: 'https://github.com/aftongauntlett/js13k-2025',
    demo: 'https://js13k-2025.vercel.app/',
  },
  {
    title: 'JS13k 2025 Practice – Orbital Order',
    status: 'Production',
    description:
      'A second, completed game developed alongside my official JS13k entry. Explores alternate mechanics and narrative style within the same 13KB constraint, demonstrating rapid prototyping, creative coding, and iterative design.',
    tech: ['HTML', 'CSS', 'Vanilla JavaScript'],
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://js13k-demo.vercel.app',
  },
  {
    title: 'Bloop Museum',
    status: 'Development',
    description:
      'Client website for the Bloop Museum - an electronic entertainment museum dedicated to computers, games, media, and gadgets! Built with retro-inspired design optimized for vintage browsers including Netscape 4.0/Pentium 90 and ProtoWeb.org emulation.',
    tech: ['Eleventy', 'JavaScript', 'HTML', 'CSS', 'Retro Design', 'Vercel'],
    link: 'https://github.com/aftongauntlett/bloop-demo',
    demo: 'https://bloop-demo.vercel.app/',
  },
];
