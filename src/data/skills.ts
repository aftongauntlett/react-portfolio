export interface Skill {
  name: string;
  category: 'frontend' | 'supporting';
}

export const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript (ES6+)', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },
  { name: 'Responsive Design', category: 'frontend' },
  { name: 'Accessibility (WCAG)', category: 'frontend' },
  { name: 'Design Systems', category: 'frontend' },
  { name: 'Component Architecture', category: 'frontend' },
  { name: 'TanStack', category: 'frontend' },
  { name: 'Storybook', category: 'frontend' },
  { name: 'Jest', category: 'frontend' },

  { name: 'REST APIs', category: 'supporting' },
  { name: 'GraphQL', category: 'supporting' },
  { name: 'PostgreSQL', category: 'supporting' },
  { name: 'Swagger', category: 'supporting' },
  { name: 'JSDoc', category: 'supporting' },

  { name: 'Git', category: 'supporting' },
  { name: 'Docker', category: 'supporting' },
  { name: 'Figma', category: 'supporting' },
  { name: 'GSAP', category: 'supporting' },
  { name: 'Framer', category: 'supporting' },
  { name: 'Agile', category: 'supporting' },
  { name: 'AI-Assisted Workflow', category: 'supporting' },
];

export const skillCategories = {
  frontend: 'Frontend Engineering & UI',
  supporting: 'Supporting Technologies & Workflow',
} as const;
