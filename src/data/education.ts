export type Education = {
  title: string;
  institution: string;
  date: string;
  status?: string;
  type: 'certification' | 'certificate';
  link?: string;
  description?: string;
};

export type Award = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const education: Education[] = [
  {
    title: 'Full-Stack Web Development',
    institution: 'George Washington University',
    date: '08/2020',
    type: 'certificate',
    description:
      'Immersive program focused on modern JavaScript, React, Node.js, and full-stack fundamentals.',
  },
  {
    title: 'CompTIA Security+ Certification',
    institution: 'CompTIA',
    date: '11/2022',
    status: 'Active',
    type: 'certification',
    link: 'https://www.credly.com/badges/90402bb7-7fdf-4945-aea3-b20fd916f1b4',
    description:
      'Foundation in security principles including access control, identity management, network defense, and risk assessment.',
  },
  {
    title: 'User Experience Design',
    institution: 'General Assembly',
    date: '12/2022',
    type: 'certificate',
    description:
      'Hands-on UX immersion covering research, information architecture, wireframing, prototyping (including Figma), and usability testing.',
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
