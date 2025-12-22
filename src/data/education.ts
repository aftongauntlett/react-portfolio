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
      'Hands-on UX immersion covering research, information architecture, wireframing, prototyping, and usability testing.',
  },
];

export const awards: Award[] = [
  {
    title: 'Platinum Award',
    organization: 'Booz Allen Hamilton',
    date: '2024',
    description:
      'Built and shipped a custom registration and scheduling platform for a large multi-day convention with 100+ attendees. The platform centralized session sign-ups, reduced manual coordination, and was actively used throughout the event.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2023',
    description:
      'Produced multiple design iterations for stakeholder review, incorporating leadership feedback at each stage. The final direction was selected over a competing proposal and directly influenced a multi-year contract decision.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2022',
    description:
      'Led the redesign and rebuild of a high-visibility enterprise application used across multiple client teams. The improved usability and visual clarity drove adoption and earned recognition from Amazon Developers for design quality.',
  },
];
