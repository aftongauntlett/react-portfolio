import type { ReactNode } from 'react';

export type Job = {
  title: string;
  company: string;
  dates: string;
  location?: 'Remote' | 'On-site';
  description: ReactNode;
};

export const jobs: Job[] = [
  {
    title: 'Lead Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2023 – 05/2025',
    location: 'Remote',
    description:
      'I led frontend architecture across a suite of mission-critical production applications, maintaining a shared React component library and Storybook design system as the portfolio scaled. I championed a guided intake flow that replaced a painful Excel-and-email process - the design direction won a contract and earned a Booz Allen award.',
  },
  {
    title: 'Software Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 03/2023',
    location: 'Remote',
    description:
      'Promoted to Lead Engineer within a year. I modernized the frontend toolchain - introducing TanStack Query, enforcing functional components over class-based patterns, and setting up Prettier and ESLint to reduce noisy PRs and keep reviews focused on logic. I contributed to onboarding docs, mentored junior developers, and consistently pushed for tighter ticket scope and better code practices across the team.',
  },
  {
    title: 'Founder',
    company: 'Gauntlet Designs',
    dates: '07/2020 – Present (Freelance)',
    location: 'Remote',
    description:
      'Ran an independent web studio from 2020 to 2025, delivering accessible, production-ready sites for small businesses and larger clients - leading every project from scope through deployment. In 2025 I sunset the business and shifted to volunteer and sliding-scale work exclusively with nonprofits and underserved communities.',
  },
  {
    title: 'UI Developer',
    company: 'IronClad',
    dates: '12/2021 – 03/2022',
    location: 'Remote',
    description:
      'Delivered wireframes and interaction specs that defined the React component architecture for Defense Intelligence Agency web applications. Authored accessibility and UI standards adopted as the shared reference across design and engineering.',
  },
  {
    title: 'Frontend Developer',
    company: 'Global Dimensions',
    dates: '08/2021 – 12/2021',
    location: 'On-site',
    description:
      "My first exposure to a fully structured design and accessibility practice - working alongside dedicated design teams and accessibility auditors on NGA analyst platforms. I built a scroll-driven animated timeline in Vue and GSAP that became the visual standard for the project, and spent significant time doing user research, observing real users, and learning JAWS, keyboard navigation, contrast requirements, and semantic structure. It's where my commitment to accessibility started.",
  },
];
