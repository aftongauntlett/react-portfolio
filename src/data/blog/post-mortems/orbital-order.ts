import type { BlogPost } from '../types';

export const orbitalOrderPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Practice Project',
    subtitle: 'Orbital Order',
    description:
      'A post-mortem for Orbital Order, my first completed JS13k practice project - a small physics-based puzzle about guiding electrons into orbitals. Built in vanilla JavaScript with Canvas 2D and procedural audio, it became my first real lesson in finishing something simple, clean, and complete.',
    publishDate: '2025-08-01',
    slug: 'orbital-order-post-mortem',
    author: 'Afton Gauntlett',
    readTime: '6 min read',
    tags: ['JS13k', 'Post-Mortem', 'Canvas 2D'],
    categories: ['Game Development'],
    featured: false,
  },
  sections: [
    {
      type: 'game-showcase',
      src: '/games/orbital-order.png',
      alt: 'Gameplay showing orbiting electrons in blue and orange orbitals',
      caption: 'Orbital Order - a small physics game about balance, light, and motion',
      content:
        'Before the official JS13k competition, I built Orbital Order as a warm-up challenge. Guide electrons into orbitals, follow atomic rules, and see how a few lines of code can feel alive. It was my first finished game.',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-demo',
          text: 'View Source Code',
          type: 'github',
        },
        { url: 'https://orbital-order.aftongauntlett.com', text: 'Play Game', type: 'demo' },
      ],
    },

    // SECTION 1: About
    { type: 'heading', level: 2, content: 'About' },
    {
      type: 'paragraph',
      content:
        'The idea started while I was watching Neil deGrasse Tyson talk about lightning on StarTalk. I tried prototyping lightning mechanics, but the orbs and rings I drew felt like atoms. I switched the theme to orbitals and the game started to make sense. From there I leaned into stable shells, glowing electrons, and the Aufbau order.',
    },
    {
      type: 'pull-quote',
      content:
        '"The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff." - Carl Sagan',
    },

    // SECTION 2: Technical Overview
    { type: 'heading', level: 2, content: 'Technical Overview' },
    {
      type: 'paragraph',
      content:
        'The palette came from science class memories and Portal’s blue and orange. They read as charge and polarity, which fit the theme. The sound sits in the background as a low, calm bed so the focus stays on motion and light.',
    },
    {
      type: 'list',
      items: [
        'Built with vanilla JavaScript and Canvas 2D.',
        'All audio generated procedurally using the Web Audio API.',
        'Optimized to fit under 13KB using Terser and code golfing.',
        'Atomic configuration logic: 1s² → 2s² → 2p⁶.',
        'Runs at 60fps with real-time interactions and collisions.',
      ],
    },

    // SECTION 3: Engineering Insights
    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'The 13KB limit forced clear choices. No libraries. No waste. I watched allocations, reused what I could, and kept the update loop simple. Seeing Terser compress things was oddly satisfying. “Golfing” made sense once I saw it work in practice.',
    },
    {
      type: 'list',
      items: [
        'Cut from 47KB to 8.2KB zipped using aggressive minification.',
        'Simplified the render loop for steady timing.',
        'Removed an infinite mode that caused state pollution.',
        'Added an interactive tutorial to teach by doing.',
        'Used save and restore around Canvas state changes.',
      ],
    },

    // SECTION 4: Design & UX Insights
    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'Most choices came from curiosity. Push and pull started as lightning work, then became attraction and repulsion for electrons. Blue and orange carried that idea well. I like glow, particles, and smooth gradients, so the look arrived quickly. A light storm effect at the end adds a bit of tension without breaking the calm.',
    },
    {
      type: 'list',
      items: [
        'Interactive tutorial replaced static instructions and made the rules clear.',
        'Level transitions became seamless instead of pausing play with cards.',
        'Player feedback shaped the flow so there were fewer interruptions.',
        '“Two-hit knockout” stayed as a light penalty that rewards precision.',
      ],
    },

    // SECTION 5: Key Takeaways
    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'Finishing a small thing changed how I plan work. Small ideas can carry weight when they feel complete. Scope control is a skill. Performance work is not just tools and numbers; it is being careful about what you add and how you add it.',
    },

    // SECTION 6: Post-Mortem Reflections
    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'Player feedback pushed the UX in the right direction. I removed the level cards and made transitions flow in place. The tutorial moved from a menu into the game so you learn by doing. Those changes kept the rhythm smooth.',
    },
    {
      type: 'paragraph',
      content:
        'This project gave me confidence and made me want to learn more. I may add a few more levels and a leaderboard, similar to what I built for Nyx Felis. I am also curious about trying Unity, or circling back to the lightning idea that started this.',
    },

    // SECTION 7: AI as a Creative Partner
    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'Copilot helped with code integration and low-level logic. ChatGPT helped with research and deployment. It made procedural audio and compression feel approachable. I still had to steer it. I asked for reusable structures, accessibility, and clear naming. I watched for repeated logic and trimmed it out.',
    },
    {
      type: 'paragraph',
      content:
        'AI widened the set of things I was willing to try. It did not remove the challenge. It just shortened the path from idea to a working version so I could judge it faster.',
    },

    // SECTION 8: Feedback
    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription:
        'Played Orbital Order? I’d love your thoughts on pacing, visuals, and the feel of the interactions.',
    },
  ],
};
