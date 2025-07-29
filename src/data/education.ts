export type Education = {
  title: string;
  institution: string;
  date: string;
  status?: string;
  type: 'certification' | 'certificate';
  link?: string;
};

export type Award = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const education: Education[] = [
  {
    title: 'Security+',
    institution: 'CompTIA',
    date: 'Nov 2022',
    status: 'Active',
    type: 'certification',
    link: 'https://www.credly.com/badges/90402bb7-7fdf-4945-aea3-b20fd916f1b4',
  },
  {
    title: 'UX Design',
    institution: 'General Assembly',
    date: 'Dec 2022',
    type: 'certificate',
  },
  {
    title: 'Web Development',
    institution: 'George Washington University',
    date: 'Aug 2020',
    type: 'certificate',
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
