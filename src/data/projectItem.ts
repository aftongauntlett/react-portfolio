export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'My Portfolio',
    description: 'TBD...',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'React Programming Tutorial',
    description: 'TBD...',
    tech: ['React', 'Vite', 'TailwindCSS'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'Guess-the-Glass',
    description:
      'Wine tasting game powered by a public dataset and custom scoring logic. Built with Next.js and TypeScript.',
    tech: ['Next.js', 'TypeScript', 'Public API'],
    image: 'https://placehold.co/480x270/333/eee?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'Bloop Museum',
    description: 'TBD...',
    tech: ['HTML', 'CSS', '11ty'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
];
