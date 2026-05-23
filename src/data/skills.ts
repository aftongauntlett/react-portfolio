export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      'TypeScript',
      'React',
      'Astro',
      'Tailwind CSS',
      'WCAG 2.2 AA',
      'Section 508',
      'Storybook',
    ],
  },
  {
    title: 'Motion',
    skills: ['Framer Motion', 'GSAP', 'CSS Animations', 'Canvas', 'Interaction Design', 'Three.js'],
  },
  {
    title: 'Tooling',
    skills: ['Supabase', 'PostgreSQL', 'Vercel', 'Git', 'AWS', 'GitHub Copilot'],
  },
];
