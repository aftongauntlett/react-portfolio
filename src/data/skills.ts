export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering & UI',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML/CSS',
      'Responsive Design',
      'Accessibility (WCAG)',
      'Design Systems',
      'Component Architecture',
      'TanStack',
      'Storybook',
      'Jest',
    ],
  },
  {
    title: 'Motion & Interactive Systems',
    skills: [
      'Framer Motion',
      'GSAP',
      'Three.js',
      'CSS Animations',
      'Layout Transitions',
      'SVG Animation',
      'Canvas',
      'WebGL',
      'Interaction Design',
    ],
  },
  {
    title: 'Frameworks, APIs & Tooling',
    skills: [
      'REST APIs',
      'GraphQL',
      'PostgreSQL',
      'Swagger',
      'JSDoc',
      'Git',
      'Docker',
      'Figma',
      'Astro',
      'Vue',
      'Angular',
      'Agile',
      'AI-Augmented Engineering',
    ],
  },
];
