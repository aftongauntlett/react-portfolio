export type Job = {
  title: string;
  company: string;
  dates: string;
  description: string[];
};

export const jobs: Job[] = [
  {
    title: "Lead Engineer",
    company: "Booz Allen Hamilton",
    dates: "03/2022 – 05/2025",
    description: [
      "Led frontend rebuild of a large-scale intelligence platform, migrating from Angular to modular React with TypeScript and Hooks.",
      "Designed and implemented scalable UI architecture with reusable component patterns and accessibility from the start.",
      "Collaborated across teams to enforce frontend standards, improve developer experience, and support long-term maintainability.",
    ],
  },
  {
    title: "Founder & Developer",
    company: "Gauntlet Designs",
    dates: "07/2020 – 01/2025",
    description: [
      "Designed and built accessible, responsive frontends using Vue.js and Next.js, handling UX strategy, branding, and architecture.",
      "Created reusable UI systems and modern workflows with Vercel and Firebase CI/CD pipelines.",
      "Managed full project delivery — client comms, mockups, development, deployment, and ongoing support.",
    ],
  },
  {
    title: "UI Developer",
    company: "IronClad",
    dates: "01/2022 – 03/2022",
    description: [
      "Contributed to early development of a new intelligence platform, supporting stack evaluation and environment setup.",
      "Helped establish React front-end architecture and created foundational Figma wireframes.",
      "Developed reusable UI components with a focus on scale and consistency.",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Global Dimensions",
    dates: "08/2021 – 01/2022",
    description: [
      "Built accessible, interactive front-end interfaces for geospatial analysis apps using Vue.js and Vuetify.",
      "Developed responsive layouts, animations, and map-based components in collaboration with designers and engineers.",
      "Ensured compliance with Section 508 and WCAG standards across all front-end work.",
    ],
  },
];
