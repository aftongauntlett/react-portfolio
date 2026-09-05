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
    title: 'Meowdrate',
    description:
      'A hydration app for Android (in closed testing on Google Play) that starts full instead of empty: a flood scene recedes as you log drinks, slowly rescuing a trapped cat, with a sky that shifts with the real time of day and a sarcastic narrator along for the ride. No streaks, no locked content, no accounts — everything is stored locally with no backend, ads, or tracking.',
    link: 'https://github.com/aftongauntlett/Meowdrate',
    demo: 'https://meowdrate.com/',
    tech: ['Flutter', 'Dart', 'Riverpod', 'flutter_local_notifications'],
    imageLight: '/meowdrate-light.png',
    imageDark: '/meowdrate-dark.png',
  },
  {
    title: 'No Whiteboard Jobs Dashboard',
    description:
      'A frontend dashboard I built on the open-source Hiring Without Whiteboards dataset, turning a large markdown company list into a fast, searchable web experience. A weekly GitHub Actions workflow syncs the upstream data, detecting additions, removals, and field-level changes, then runs test/build validation gates before auto-committing. Includes full-text search, multi-filtering, card and list views, pagination, and dark/light themes.',
    link: 'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    demo: 'https://no-wb.org',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS'],
    imageLight: '/no-wb-light.png',
    imageDark: '/no-wb-dark.png',
  },
  {
    title: 'NPC Finder',
    description:
      'An invite-only media tracker and collaborative playlist app for Movies & TV, Books, Music, and Games. Combines a personal log with status history, notes, and ratings alongside mixed-media playlists that are private by default and shareable with invited users. Includes social profiles, friend tags, recommendations, media import, and role-safe sharing workflows.',
    link: 'https://github.com/aftongauntlett/npcfinder',
    demo: 'https://npcfinder.com',
    tech: ['React', 'Tailwind CSS', 'Supabase Auth', 'PostgreSQL RLS'],
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
    tech: ['Vanilla JavaScript', 'Canvas 2D', 'Procedural Audio'],
    imageLight: '/orbital-order.png',
    imageDark: '/orbital-order.png',
  },
];
