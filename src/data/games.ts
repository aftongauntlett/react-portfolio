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
  blogSlug: string; // Required - every game must have a post-mortem
  status: 'complete' | 'in-progress' | 'archived';
}

export const games: Game[] = [
  {
    id: 'nyx-felis',
    title: 'JS13k 2025 Official Submission - Nyx Felis & Lampyrus',
    description:
      'A strategic resource management game featuring a curious cat collecting bioluminescent fireflies in the starry night sky. Players must balance exploration, resource gathering, and strategic timing while navigating an atmospheric world filled with glowing creatures. Built entirely in vanilla JavaScript using HTML5 Canvas, this game demonstrates creative constraint-based development within the 13KB file size limit. The gameplay combines strategic planning with atmospheric storytelling, creating an engaging experience that showcases both technical skill and artistic vision.',
    image: '/blog/nyx-felis.png',
    imageAlt: 'Nyx Felis collecting fireflies in the starry night sky',
    tags: ['JS13k', 'JavaScript', 'Canvas', 'Resource Management', 'Atmospheric'],
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
    blogSlug: 'js13k-2025-post-mortem',
    status: 'complete',
  },
  {
    id: 'orbital-order',
    title: 'JS13k 2025 Practice Demo - Orbital Order',
    description:
      'A physics-based puzzle game where players arrange celestial bodies to create stable orbital patterns around central stars. Each level presents unique gravitational challenges requiring careful positioning and timing to achieve orbital harmony. The game features realistic physics simulations, procedural level generation, and intuitive drag-and-drop mechanics that make complex orbital mechanics accessible and engaging. Developed as a practice project for JS13k competitions, this demonstrates mastery of physics programming, mathematical concepts, and efficient code organization within strict size constraints.',
    image: '/blog/orbital-order.png',
    imageAlt: 'Orbital Order game showing planets in orbital patterns around a central star',
    tags: ['JS13k', 'JavaScript', 'Canvas', 'Physics', 'Puzzle', 'Orbital Mechanics'],
    links: [
      {
        url: 'https://orbital-order.aftongauntlett.com',
        text: 'Play Game',
        type: 'demo',
      },
      {
        url: 'https://github.com/caoimhejyoti/js13k-orbital-order',
        text: 'View Source',
        type: 'github',
      },
      {
        url: '/blog/orbital-order-post-mortem',
        text: 'Read Post-Mortem',
        type: 'blog',
      },
    ],
    featured: false,
    blogSlug: 'orbital-order-post-mortem',
    status: 'complete',
  },
];
