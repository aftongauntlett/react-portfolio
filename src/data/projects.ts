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
      'Modern React 19 portfolio showcasing responsive design, TypeScript integration, and advanced animations. Features custom theme system, mobile-first approach, and interactive Skills section with hover group effects. Built with Vite, Tailwind CSS, and modern React patterns.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    image: 'https://placehold.co/480x270/222/fff?text=Portfolio+Screenshot',
    link: 'https://github.com/aftongauntlett/react-portfolio',
    // No demo - they're already viewing it live!
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
  {
    title: 'Interactive Code Tutorial Platform',
    description:
      'Stanley Parable/Portal and Half-Life-inspired learning platform teaching programming concepts through narrative-driven scenarios. Features terminal simulation, typewriter effects, responsive settings system, and Express/MySQL backend. Currently expanding with additional scenarios and deployment optimization.',
    tech: ['React', 'TypeScript', 'Express', 'MySQL', 'Docker', 'Custom Animations'],
    image: 'https://placehold.co/480x270/10b981/fff?text=Tutorial+Platform',
    link: 'https://github.com/aftongauntlett/react-tutorial',
    // No demo yet - will add when deployed
  },
];
