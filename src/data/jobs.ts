import type { ReactNode } from 'react';

export type Job = {
  title: string;
  company: string;
  dates: string;
  location?: 'Remote' | 'Hybrid' | 'On-site';
  description: ReactNode[];
};

export const jobs: Job[] = [
  {
    title: 'Lead Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2023 – 05/2025',
    location: 'Hybrid',
    description: [
      'Mentored junior developers through code reviews and pair programming, reducing review cycles and improving code quality across the team.',
      'Built interactive Figma prototypes that won client confidence over competing bids, securing the contract and setting a clear direction that reduced implementation rework.',
      'Partnered with MLOps to deploy an air-gapped LLM environment under compliance constraints and led the chatbot interface redesign for a more trustworthy, usable experience.',
      'Delivered an accessible stepper-driven data portal replacing a manual Excel/email workflow, reducing support tickets and showing measurable user and business value.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 03/2023',
    location: 'Hybrid',
    description: [
      'Led the full revamp of a core government platform, driving the shift from Angular/Node to React with TypeScript for cleaner code and future-proof features.',
      'Introduced shared frontend standards and tooling (Prettier, ESLint, Husky) and led a shift from class-based to functional components, adopting TanStack Query to make data and state handling more consistent and predictable across the UI.',
      'Authored comprehensive onboarding guides and accessibility docs, making it easier for new hires to get up to speed while embedding WCAG/508 compliance.',
    ],
  },
  {
    title: 'Founder',
    company: 'Gauntlet Designs',
    dates: '07/2020 – Present (Freelance)',
    location: 'Hybrid',
    description: [
      'Founded and ran a small web studio through 2025, now continuing as independent freelance and volunteer work for nonprofits, small businesses, and community organizations.',
      'Design accessible, mobile-friendly, and visually engaging sites — matching the stack to the audience, performance needs, and long-term maintainability rather than defaulting to one approach.',
      'Built and maintained an employee portal and scheduling platform for a multi-location restaurant group, still in active daily use years after launch.',
    ],
  },
  {
    title: 'UI Developer',
    company: 'IronClad Technology Services',
    dates: '12/2021 – 03/2022',
    location: 'Remote',
    description: [
      'Evaluated and recommended frontend frameworks used to modernize scalable web applications for the Defense Intelligence Agency.',
      'Designed and delivered detailed Figma wireframes, laying the foundation for modern, accessible UI architecture.',
      'Authored documentation and design standards that set clear expectations for accessibility, usability, and consistency across teams.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Global Dimensions',
    dates: '08/2021 – 12/2021',
    location: 'On-site',
    description: [
      "Built a custom interactive scroll-driven timeline for the National Geospatial-Intelligence Agency, extending Vuetify with CSS and GSAP to match a motion-heavy design spec - praised by the team and used as a reference for the project's visual standard.",
      'Facilitated alignment between design and development, translating design vision into practical, developer-friendly guidelines. ',
      'Drove accessibility improvements by partnering with design and compliance experts, delivering interfaces ready for 508/WCAG audits.',
      'Prototyped motion-driven UI concepts in Adobe XD and After Effects, making complex geospatial data more intuitive for users.',
    ],
  },
];
