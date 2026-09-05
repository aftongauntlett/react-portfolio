export type Job = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
  url?: string;
};

export const jobs: Job[] = [
  {
    title: 'Mid-Level Everything Engineer',
    company: 'Redhorse Corporation',
    dates: '08/2026 – Present',
    bullets: [
      'Joined as an "Everything Engineer" modernizing a mission-critical legacy system managing billions of dollars in U.S. international security cooperation, working primarily on the frontend within an Agentic AI SDLC alongside tools like Cursor and Codex.',
      'Own the user experience for complex, policy-laden workflows, building and maintaining a React/TypeScript component library with Section 508/WCAG accessibility and plain-language labeling built in by default.',
      'Build vertical slices of capability spanning React frontends, Node services, and Prisma schemas, holding a high bar for production software through TDD, automated CI, and Playwright end-to-end testing.',
      'Ship small, reviewable changes in an always-green main branch environment while replacing a decades-old fat-client system with a modern, humane web platform.',
    ],
  },
  {
    title: 'Founder',
    company: 'Pretty Pretty Pretty Good',
    dates: '07/2020 – Present',
    url: 'https://www.prettyprettyprettygood.org/',
    bullets: [
      'Founded a sliding-scale web studio for nonprofits and small businesses, serving as sole point of contact from scope through deployment.',
      "Select the stack to fit each project's needs, using Astro for static-first sites and React or Next.js with Supabase, optimizing for speed and low overhead.",
      'Support clients beyond the build, helping nonprofits set up tools like Google for Nonprofits and steering them toward sustainable, low-cost stacks.',
      'Hold every build to a WCAG-compliant standard, screen-reader and keyboard-nav tested, mobile-first, with 100 Lighthouse scores across the board.',
    ],
  },
  {
    title: 'Lead Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 05/2025',
    bullets: [
      'Modernized the frontend toolchain, led an Angular-to-React migration, and owned Section 508 compliance across the application experience.',
      'Promoted to lead within a year and owned frontend architecture across a portfolio of production applications where reliability and security were non-negotiable.',
      'Built the design practice from scratch when the project lacked a designer, including Figma training, team licenses, and production-ready design workflows.',
      'Designed a prototype as sole designer that won a competitive stakeholder review and directly influenced a multi-year contract award.',
      'Earned three Booz Allen awards over my tenure and was selected to represent the team at AWS re:Invent.',
    ],
  },
  {
    title: 'UI Developer',
    company: 'IronClad',
    dates: '12/2021 – 03/2022',
    bullets: [
      'Joined as a contract UI developer on a government web platform, helping the team settle on React for the new stack and producing Figma wireframes and documentation to guide the build.',
      'Worked with engineers and stakeholders to define requirements around accessibility, scalability, and component-based design, delivering baseline UI documentation that handed off a clear foundation for the next project phase.',
      'Mentored junior developers on component patterns and contributed to onboarding documentation, helping the team ramp up on the new frontend architecture.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Global Dimensions',
    dates: '08/2021 – 12/2021',
    bullets: [
      'Worked alongside dedicated design teams and accessibility auditors on NGA analyst platforms, gaining hands-on exposure to structured design and accessibility practice.',
      'Built a scroll-driven animated timeline using Vue, Vuetify, and GSAP that helped analysts explore complex geospatial data through clearer visual patterns — set as the visual standard for the project.',
      'Supported user research by observing real users and deepening practical knowledge of JAWS, keyboard navigation, contrast requirements, and semantic structure.',
    ],
  },
];
