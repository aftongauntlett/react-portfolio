export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
}

export const skills: Skill[] = [
  // Frontend & UI Development
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript (ES6+)', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML5/CSS3', category: 'frontend' },
  { name: 'Responsive Design', category: 'frontend' },
  { name: 'Accessibility (WCAG/508)', category: 'frontend' },

  // Backend & Data
  { name: 'REST APIs', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'TanStack Query', category: 'backend' },
  { name: 'Swagger', category: 'backend' },
  { name: 'Security+ Certified', category: 'backend' },
  { name: 'Jest', category: 'backend' },

  // Development & Design Tools
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Storybook', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Adobe XD', category: 'tools' },
  { name: 'GSAP', category: 'tools' },
  { name: 'Framer', category: 'tools' },
  { name: 'Design Systems', category: 'tools' },
];

export const skillCategories = {
  frontend: 'Frontend & UI Development',
  backend: 'Backend & Data',
  tools: 'Development & Design Tools',
} as const;
