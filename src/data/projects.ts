export type Project = {
  title: string;
  description: string;
  link?: string;
  demo?: string;
  playable?: boolean;
  tech: string[];
  imageLight?: string;
  imageDark?: string;
};

export const projects: Project[] = [
  {
    title: 'GAM[fest]',
    description:
      'A marketing site for a gaming event, built with Astro and React islands — static-first, with hydration limited to interactive pieces like the gallery, FAQ, and a hero mini-game. That hero banner hides a real Canvas2D/Matter.js platformer with gravity, collision, and sprite animation, plus a day/night scene that shifts in real time. Fully keyboard-navigable, with reduced-motion fallbacks, an accessible alternative to the canvas game, and axe-core/Playwright test coverage.',
    link: 'https://github.com/aftongauntlett/gamfest',
    demo: 'https://gamfest-demo.vercel.app/',
    tech: ['Astro', 'React', 'Matter.js'],
    imageLight: '/gamfest-light.png',
    imageDark: '/gamfest.png',
  },
  {
    title: 'No Whiteboard Jobs Dashboard',
    description:
      'A frontend dashboard I built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. Includes full-text search, multi-filtering, card and list view modes, pagination, dark and light themes, and mobile-first navigation.',
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    tech: ['Astro', 'TypeScript', 'Vercel'],
    imageLight: '/no-wb-light.png',
    imageDark: '/no-wb-dark.png',
  },
  {
    title: 'NPC Finder',
    description:
      'An invite-only media tracker and collaborative playlist app for Movies & TV, Books, Music, and Games. Combines a personal log with status history, notes, and ratings alongside mixed-media playlists that are private by default and shareable with invited users. Includes social profiles, friend tags, recommendations, media import, and role-safe sharing workflows.',
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
    tech: ['React', 'Supabase Auth', 'PostgreSQL RLS'],
    imageLight: '/npc-light.png',
    imageDark: '/npc-dark.png',
  },
  {
    title: 'Orbital Order (Aufbau) - JS13k Games Demo',
    description:
      'A physics-based puzzle game where you guide electrons into atomic orbitals using electromagnetic attraction and repulsion, inspired by the Aufbau principle. Designed around emergent behavior, requiring players to balance charge interactions, timing, and spatial positioning to reach stable configurations under JS13k-style constraints.',
    link: 'https://github.com/aftongauntlett/js13k-demo',
    demo: 'https://orbital-order.aftongauntlett.com/',
    playable: true,
    tech: ['Vanilla JavaScript', 'Canvas 2D'],
    imageLight: '/orbital-order.png',
    imageDark: '/orbital-order.png',
  },
];
