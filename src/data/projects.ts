export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'React Portfolio Website',
    description:
      'Built a fully accessible, custom-themed portfolio and reusable component library using React 19, Vite, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, and modern development practices with comprehensive testing.',
    tech: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS'],
    image: 'https://placehold.co/480x270/222/fff?text=Portfolio+Screenshot',
    link: 'https://github.com/aftongauntlett/react-portfolio',
    // Current live site
  },
  {
    title: 'React Tutorial Project',
    description:
      'Currently building an interactive, story-driven coding platform inspired by Portal, Half-Life, and The Stanley Parable. Features modular full-stack architecture, adaptive tutorials, and immersive narrative elements. Public alpha launches Summer 2025.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    image: 'https://placehold.co/480x270/10b981/fff?text=Tutorial+Platform',
    link: 'https://github.com/aftongauntlett/react-tutorial',
    // No demo yet - will add when deployed
  },
  {
    title: 'Potomac Dining Corporate Website',
    description:
      'Enterprise website for Potomac Family Dining Group, a $300M annual revenue restaurant franchise operating across 5 states. Features employee portal, career management system, multi-location directory, and contact forms. Handles high-traffic loads with robust performance optimization.',
    tech: ['Vue.js', 'Firebase', 'Responsive Design', 'Corporate Branding'],
    image: 'https://placehold.co/480x270/2563eb/fff?text=Potomac+Dining',
    link: '#', // Private repo
    demo: 'https://potomacdining.com/',
  },
];
