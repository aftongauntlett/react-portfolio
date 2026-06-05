export type Project = {
  title: string;
  description: string;
  link?: string;
  demo?: string;
  playable?: boolean;
  imageLight?: string;
  imageDark?: string;
};

export const projects: Project[] = [
  {
    title: 'No Whiteboard Jobs Dashboard',
    description:
      'A frontend dashboard I built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. Includes full-text search, multi-filtering, card and list view modes, pagination, dark and light themes, and mobile-first navigation. Built with Astro and TypeScript, deployed on Vercel.',
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    imageLight: '/no-wb-light.png',
    imageDark: '/no-wb-dark.png',
  },
  {
    title: 'NPC Finder',
    description:
      'An invite-only media tracker and collaborative playlist app for Movies & TV, Books, Music, and Games. Combines a personal log with status history, notes, and ratings alongside mixed-media playlists that are private by default and shareable with invited users. Includes social profiles, friend tags, recommendations, and media import. Built with Supabase Auth and PostgreSQL RLS for role-safe, invite-only sharing workflows.',
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
    imageLight: '/npc-light.png',
    imageDark: '/npc-dark.png',
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    description:
      'A physics-based puzzle game where you guide electrons into atomic orbitals using electromagnetic attraction and repulsion, inspired by the Aufbau principle. Designed around emergent behavior, requiring players to balance charge interactions, timing, and spatial positioning to reach stable configurations. Built with vanilla JavaScript and Canvas 2D under JS13k-style constraints, with a focus on tight mechanics, readable visual feedback, and efficient simulation.',
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com/',
    playable: true,
    imageLight: '/orbital-order.png',
    imageDark: '/orbital-order.png',
  },
];
