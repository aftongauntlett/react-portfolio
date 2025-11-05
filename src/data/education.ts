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
    type: 'certification',
    link: 'https://www.credly.com/badges/90402bb7-7fdf-4945-aea3-b20fd916f1b4',
    description:
      'Foundation in security principles, access control, network defense, and risk management.',
  },
  {
    title: 'User Experience Design',
    institution: 'General Assembly',
    date: '12/2022',
    type: 'certificate',
    description:
      'Hands-on UX immersion covering research, information architecture, wireframing, prototyping, and usability testing.',
  },
];

export const awards: Award[] = [
  {
    title: 'Platinum Award',
    organization: 'Booz Allen Hamilton',
    date: '2024',
    description:
      'Redesigned and rebuilt a high-visibility enterprise app adopted across multiple client teams, earning recognition from Amazon Developers for design quality.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2023',
    description:
      'Multiple iterations of design won leadership buy-in over a competing proposal, directly influencing a multi-year contract.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2022',
    description:
      'Built a registration and scheduling platform for the annual convention, enabling 100+ attendees to coordinate sessions seamlessly.',
  },
];
