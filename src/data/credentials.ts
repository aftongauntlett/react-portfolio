export type Credential = {
  title: string;
  institution: string;
  date: string;
  description?: string;
};

export type Award = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const credentials: Credential[] = [
  {
    title: 'Full-Stack Web Development',
    institution: 'George Washington University',
    date: '08/2020',
    description:
      'MERN stack bootcamp covering JavaScript, React, Node.js, and full-stack fundamentals. Built end-to-end applications with API integration, authentication, and database workflows. Collaborated in sprint-style projects to practice shipping production-ready features under tight timelines.',
  },
  {
    title: 'User Experience Design',
    institution: 'General Assembly',
    date: '12/2022',
    description:
      'Hands-on program covering research, information architecture, wireframing, and usability testing. Developed project flows from discovery through prototyping, with a strong emphasis on iterative feedback and accessibility. Conducted moderated testing sessions and translated findings into clearer interaction patterns and UI decisions.',
  },
  {
    title: 'CompTIA Security+',
    institution: 'CompTIA',
    date: '11/2022 - Active',
    description:
      'Foundation in security principles including access control, identity management, and network defense. Reinforced practical understanding of risk management, secure system design, and incident response fundamentals. Strengthened cross-functional communication around security requirements in product and engineering work.',
  },
];

export const awards: Award[] = [
  {
    title: 'Platinum Award',
    organization: 'Booz Allen Hamilton',
    date: '2024',
    description:
      'Built and launched a convention registration and scheduling platform on a compressed timeline while supporting other projects; user feedback consistently praised its ease and convenience.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2023',
    description:
      'Rapidly iterated a prototype through heavy stakeholder feedback as the sole designer, balancing speed and precision to deliver the direction that helped win the contract.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2022',
    description:
      'Led a full UI redesign during a complex Angular-to-React migration, translating approved wireframes into production workflows and supporting a broader platform modernization effort.',
  },
];
