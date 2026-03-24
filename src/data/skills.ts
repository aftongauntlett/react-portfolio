export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend & UI',
    skills: [
      'TypeScript',
      'JavaScript (ES6+)',
      'React',
      'Next.js',
      'Vue',
      'Angular',
      'Astro',
      'Tailwind CSS',
      'HTML/CSS',
      'Responsive Design',
      'Design Systems',
      'Accessibility (WCAG)',
      'Section 508',
      'Component Architecture',
      'Storybook',
      'Vitest',
      'Jest',
      'TanStack',
    ],
  },
  {
    title: 'Motion & Creative',
    skills: [
      'Framer Motion',
      'GSAP',
      'Lottie',
      'CSS Animations',
      'Layout Transitions',
      'Interaction Design',
      'Three.js',
      'Phaser.js',
      'Canvas',
      'WebGL',
      'Figma',
      'Adobe XD',
    ],
  },
  {
    title: 'Infrastructure & Tooling',
    skills: [
      'Supabase',
      'PostgreSQL',
      'Vite',
      'REST APIs',
      'GraphQL',
      'Postman',
      'Vercel',
      'Docker',
      'Git',
      'GitHub Copilot',
      'AI-Assisted Development',
    ],
  },
];
