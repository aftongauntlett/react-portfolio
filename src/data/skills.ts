export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['TypeScript', 'React', 'Astro', 'Tailwind CSS', 'Storybook'],
  },
  {
    title: 'Motion',
    skills: ['Framer Motion', 'GSAP', 'Three.js'],
  },
  {
    title: 'Tooling',
    skills: ['Supabase', 'PostgreSQL', 'Vercel', 'Git', 'AWS', 'GitHub Copilot'],
  },
];
