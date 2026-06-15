export type Job = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
  url?: string;
};

export const jobs: Job[] = [
  {
    title: 'Founder',
    company: 'Pretty Pretty Pretty Good',
    dates: '01/2025 – Present',
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
    dates: '03/2023 – 05/2025',
    bullets: [
      'Promoted to lead within a year and owned frontend architecture across a portfolio of production applications where reliability and security were non-negotiable.',
      'Built the design practice from scratch when the project lacked a designer, including Figma training, team licenses, and production-ready design workflows.',
      'Designed a prototype as sole designer that won a competitive stakeholder review and directly influenced a multi-year contract award.',
      'Built and launched a convention registration platform on a compressed timeline that earned a Booz Allen Platinum Award.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Booz Allen Hamilton',
    dates: '03/2022 – 03/2023',
    bullets: [
      'Modernized the frontend toolchain, led an Angular-to-React migration, and owned Section 508 compliance across the application experience.',
      'Contributed onboarding documentation and accessibility standards that reduced ramp-up time for new developers.',
      'Shipped a SageMaker interface redesign that caught Amazon team attention, influenced their own product, and led to my selection to represent the team at AWS re:Invent.',
    ],
  },
  {
    title: 'Founder',
    company: 'Gauntlet Designs',
    dates: '07/2020 – 01/2025',
    bullets: [
      'Ran an independent web studio delivering accessible, production-ready sites for small businesses and larger clients.',
      'Designed and built a multi-state employee portal and fundraiser scheduler for a restaurant franchise, migrating disorganized legacy data onto a platform still running the original code five years later.',
      'Sunset the business in 2025 and shifted to volunteer and sliding-scale work exclusively with nonprofits and underserved communities.',
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
