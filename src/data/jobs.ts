import type { ReactNode } from 'react';

export type Job = {
  title: string;
  company: string;
  dates: string;
  description: ReactNode;
  url?: string;
};

export const jobs: Job[] = [
  {
    title: 'Founder',
    company: 'Pretty Pretty Pretty Good',
    dates: '01/2025 – Present',
    url: 'https://www.prettyprettyprettygood.org/',
    description:
      'A solo freelance studio delivering accessible, production-ready sites for nonprofits and values-aligned clients on a sliding-scale pricing model. I run every project solo — from scope through deployment — using Astro, Vercel, Upstash Redis, and Cloudflare Turnstile.',
  },
  {
    title: 'Lead Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2023 – 05/2025',
    description:
      'Promoted to lead within a year, taking on full ownership of frontend architecture across a portfolio of production applications where reliability and security were non-negotiable. When the project lacked a designer, I filled the gap: took a Figma course, secured team licenses, and built the design practice from scratch — a prototype I designed as sole designer won a competitive stakeholder review and directly influenced a multi-year contract award. Also built and launched a convention registration platform on a compressed timeline that earned a Booz Allen Platinum Award.',
  },
  {
    title: 'Software Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 03/2023',
    description:
      'Modernized the frontend toolchain, led an Angular-to-React migration, owned Section 508 compliance, and contributed onboarding documentation and accessibility standards that reduced ramp-up time for new developers. A SageMaker interface redesign we shipped caught the attention of the Amazon team, who adopted elements of it for their own product. That work led to me being selected to represent the team at AWS re:Invent.',
  },
  {
    title: 'Founder',
    company: 'Gauntlet Designs',
    dates: '07/2020 – 01/2025',
    description:
      'Ran an independent web studio where I delivered accessible, production-ready sites for small businesses and larger clients, leading every project from scope through deployment. In 2025 I sunset the business and shifted to volunteer and sliding-scale work exclusively with nonprofits and underserved communities.',
  },
  {
    title: 'UI Developer',
    company: 'IronClad',
    dates: '12/2021 – 03/2022',
    description:
      'Working fully remote, I delivered wireframes and interaction specs that defined the React component architecture for Defense Intelligence Agency web applications. Authored accessibility and UI standards adopted as the shared reference across design and engineering.',
  },
  {
    title: 'Frontend Developer',
    company: 'Global Dimensions',
    dates: '08/2021 – 12/2021',
    description:
      'My first exposure to a fully structured design and accessibility practice - working alongside dedicated design teams and accessibility auditors on NGA analyst platforms. I built a scroll-driven animated timeline in Vue and GSAP that became the visual standard for the project, and spent significant time doing user research, observing real users, and learning JAWS, keyboard navigation, contrast requirements, and semantic structure.',
  },
];
