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
      'Vitest',
      'Jest',
    ],
  },
  {
    title: 'Motion & Interactive Systems',
    skills: [
      'Framer Motion',
      'GSAP',
      'Three.js',
      'Phaser.js',
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
      'Supabase',
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
    ],
  },
  {
    title: 'AI Workflows & Tooling',
    skills: [
      'Claude',
      'GitHub Copilot',
      'OpenAI API',
      'AI Workflow Design',
      'LLM Integration',
      'Prompt Engineering & Evaluation',
      'AI Output Evaluation',
      'Automation & Agent-Based Systems',
    ],
  },
];
