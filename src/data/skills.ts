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
      'Astro',
      'Angular',
      'Tailwind CSS',
      'HTML/CSS',
      'Responsive Design',
      'Accessibility (WCAG)',
      'i18n',
      'Component Architecture',
      'Storybook',
      'Vitest',
      'Jest',
      'React Testing Library',
      'TanStack Query',
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
      'Canvas',
      'WebGL',
      'Figma',
    ],
  },
  {
    title: 'Infrastructure & Tooling',
    skills: [
      'Supabase',
      'PostgreSQL',
      'Vite',
      'AWS',
      'Cloudflare',
      'REST APIs',
      'GraphQL',
      'Postman',
      'Vercel',
      'Docker',
      'Git',
      'Claude / Anthropic API',
      'OpenAI API',
    ],
  },
];
