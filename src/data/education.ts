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
    title: 'CompTIA Security+ Certification',
    institution: 'CompTIA',
    date: 'Nov 2022',
    status: 'Active',
    type: 'certification',
    link: 'https://www.credly.com/badges/90402bb7-7fdf-4945-aea3-b20fd916f1b4',
    description:
      'Foundation in security principles, access control, network defense, and risk management.',
  },
  {
    title: 'User Experience Design',
    institution: 'General Assembly',
    date: 'Dec 2022',
    type: 'certificate',
    description:
      'Hands-on UX immersion covering research, information architecture, wireframing, prototyping, and usability testing.',
  },
  {
    title: 'Full-Stack Web Development',
    institution: 'George Washington University',
    date: 'Aug 2020',
    type: 'certificate',
    description:
      'Immersive program focused on modern JavaScript, React, Node.js, and full-stack fundamentals.',
  },
];

export const awards: Award[] = [
  {
    title: 'Platinum Award',
    organization: 'Booz Allen Hamilton',
    date: '2024',
    description:
      'Led full redesign of flagship web application - improved user engagement and significantly reduced bugs.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2023',
    description:
      'Built an event registration platform used by 100+ users, delivering improved scheduling and agenda access.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2022',
    description:
      'Delivered interactive homepage prototype using advanced Figma techniques and animation.',
  },
];
