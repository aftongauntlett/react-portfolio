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
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error in, fugit fuga blanditiis, soluta ipsum quasi porro suscipit sunt sit voluptatem qui iusto commodi maxime, saepe rerum eaque harum necessitatibus?',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'React Programming Tutorial',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error in, fugit fuga blanditiis, soluta ipsum quasi porro suscipit sunt sit voluptatem qui iusto commodi maxime, saepe rerum eaque harum necessitatibus?',
    tech: ['React', 'Vite', 'TailwindCSS'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'Guess-the-Glass',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error in, fugit fuga blanditiis, soluta ipsum quasi porro suscipit sunt sit voluptatem qui iusto commodi maxime, saepe rerum eaque harum necessitatibus?',
    tech: ['Next.js', 'TypeScript', 'Public API'],
    image: 'https://placehold.co/480x270/333/eee?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
  {
    title: 'Bloop Museum',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error in, fugit fuga blanditiis, soluta ipsum quasi porro suscipit sunt sit voluptatem qui iusto commodi maxime, saepe rerum eaque harum necessitatibus?',
    tech: ['HTML', 'CSS', '11ty'],
    image: 'https://placehold.co/480x270/222/fff?text=Project+Screenshot',
    link: '#',
    demo: '#',
  },
];
