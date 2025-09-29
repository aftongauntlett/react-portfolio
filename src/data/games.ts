export interface GameLink {
  url: string;
  text: string;
  type: 'demo' | 'github' | 'blog';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  links: GameLink[];
  featured?: boolean;
  completionDate: string;
  status: 'complete' | 'in-progress' | 'archived';
}

export const games: Game[] = [
  {
    id: 'nyx-felis',
    title: 'Nyx Felis and Lampyris',
    description:
      'A resource management game about a curious cat collecting bioluminescent fireflies. Started as a JS13k entry, evolved into a complete game with strategic depth.',
    image: '/blog/cat-game-main.png',
    imageAlt: 'Nyx Felis collecting fireflies in the starry night sky',
    tags: ['JavaScript', 'Game Design', 'JS13k', 'Resource Management'],
    links: [
      {
        url: 'https://nyx-felis.aftongauntlett.com',
        text: 'Play Game',
        type: 'demo',
      },
      {
        url: 'https://github.com/caoimhejyoti/js13k-nyx-felis-and-lampyris',
        text: 'View Source',
        type: 'github',
      },
      {
        url: '/blog/js13k-2025-post-mortem',
        text: 'Read Post-Mortem',
        type: 'blog',
      },
    ],
    featured: true,
    completionDate: '2025-09-17',
    status: 'complete',
  },
  {
    id: 'orbital-order',
    title: 'Orbital Order',
    description:
      'A practice game built to understand JS13k constraints. Simple atomic collection mechanics in under 13KB.',
    image: '/blog/atom-game-main.png',
    imageAlt: 'Orbital Order gameplay showing particle effects',
    tags: ['JavaScript', 'JS13k', 'Code Golf', 'Minimal Design'],
    links: [
      {
        url: 'https://orbital-order.aftongauntlett.com',
        text: 'Play Game',
        type: 'demo',
      },
      {
        url: 'https://github.com/aftongauntlett/js13k-demo',
        text: 'View Source',
        type: 'github',
      },
    ],
    completionDate: '2025-08-15',
    status: 'complete',
  },
];
