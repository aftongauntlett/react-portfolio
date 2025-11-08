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
      'Championed modern frontend practices as lead engineer across 7 React apps, standardizing shared components and themes for a unified user experience.',
      'Led the design and rollout of a guided, stepper-style data portal, facilitating stakeholder alignment and outperforming competing internal concepts.',
      'Automated onboarding and workflow with a custom, secure LLM-powered chatbot, improving developer ramp-up using air-gapped VSCode scripting.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 03/2023',
    location: 'Hybrid',
    description: [
      'Led the full revamp of a core government platform, driving the shift from Angular/Node to React with TypeScript for cleaner code and future-proof features.',
      'Introduced a suite of modern developer tools-Prettier, Husky, ESLint, and TanStack Query-to enforce code standards and optimize daily workflow.',
      'Authored comprehensive onboarding guides and accessibility docs, making it easier for new hires to get up to speed while embedding WCAG/508 compliance.',
    ],
  },
  {
    title: 'Founder & Developer',
    company: 'Gauntlet Designs',
    dates: '07/2020 – 01/2025',
    location: 'Hybrid',
    description: [
      'Delivered custom web platforms for clients ranging from small businesses to major restaurant groups, handling every phase from requirements through long-term support.',
      'Built and maintained a robust employee portal and fundraising scheduler for Potomac Dining, ensuring five years of smooth operation and seamless legacy data migration.',
      'Standardized modern frontends using React, Next.js, and Vue, launching fast, accessible sites on platforms like Firebase and Vercel.',
    ],
  },
  {
    title: 'UI Developer',
    company: 'IronClad Technology Services',
    dates: '12/2021 – 03/2022',
    location: 'Remote',
    description: [
      'Evaluated and recommended frontend frameworks to help shape the next generation of scalable web apps for DIA.',
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
      'Facilitated alignment between design and development, translating vision into practical, developer-friendly guidelines.',
      'Drove accessibility improvements by partnering with design and compliance experts, delivering interfaces ready for 508/WCAG audits.',
      'Prototyped motion-driven UI concepts in Adobe XD and After Effects, making complex geospatial data more intuitive for users.',
    ],
  },
];
