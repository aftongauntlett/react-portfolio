import type { BlogPost } from '../types';

export const nyxFelisPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Official Submission',
    subtitle: 'Nyx Felis & Lampyris',
    description:
      'A post-mortem for Nyx Felis & Lampyris, my JS13k 2025 entry about collecting and evolving fireflies for a celestial cat. Built in vanilla JavaScript with Canvas 2D and procedural Web Audio, this reflection covers the design shift from “cozy screensaver” to a compact, readable game loop.',
    publishDate: '2025-09-17',
    slug: 'js13k-2025-post-mortem',
    author: 'Afton Gauntlett',
    readTime: '7 min read',
    tags: ['JS13k', 'Post-Mortem', 'Canvas 2D'],
    categories: ['Game Development'],
    featured: true,
  },
  sections: [
    {
      type: 'game-showcase',
      src: '/games/nyx-felis.png',
      alt: 'Nyx Felis under a starry sky with glowing fireflies orbiting',
      caption: 'Nyx Felis & Lampyrus - a small game about curiosity, timing, and fireflies',
      content:
        'A calm, atmospheric collector with a timing layer: guide fireflies, evolve them with well-timed shields, and keep Nyx Felis curious long enough to survive the night.',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-2025',
          text: 'View Source Code',
          type: 'github',
        },
        {
          url: 'https://nyx-felis.aftongauntlett.com',
          text: 'Play Enhanced Version',
          type: 'demo',
        },
        {
          url: 'https://js13kgames.com/2025/games/nyx-felis-and-lampyris',
          text: 'JS13k Entry',
          type: 'external',
        },
      ],
    },

    // 1) About
    { type: 'heading', level: 2, content: 'About' },
    {
      type: 'paragraph',
      content:
        'I wanted to build a small game and finish it. JS13k felt like the right constraint. The theme was Black Cats, which made me happy because I love cats. Fireflies were already on my mind from evening walks, so the pairing came naturally. The goal was calm, cozy, a little mysterious. And particles... lots of particles!',
    },
    {
      type: 'pull-quote',
      content: '"An animal\'s eyes have the power to speak a great language." - David Attenborough',
    },

    // 2) Technical Overview
    { type: 'heading', level: 2, content: 'Technical Overview' },
    {
      type: 'paragraph',
      content:
        'Visuals stayed minimal on purpose. Layered gradients, soft blends, and small glints sell the glow without WebGL. The audio is code-driven. It works, but I would shape it differently with more experience. The constraint taught me a lot.',
    },
    {
      type: 'list',
      items: [
        'Engine: Vanilla JavaScript + Canvas 2D (no frameworks).',
        'Audio: Procedural Web Audio API (no external files).',
        'Performance: ~60fps with hundreds of particles on screen.',
        'Size: 12.5KB competition build; 22KB enhanced post-jam build.',
        'Loop: Summon → Collect → Shield → Evolve → Deliver.',
      ],
    },

    // 3) Engineering Insights
    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'Timing had to read clearly. The shield window should feel predictable while the rest of the scene shimmers. Some players read the red warning flashes as the attack itself. I changed copy, cues, and ordering so the third flash signals when to act.',
    },
    {
      type: 'list',
      items: [
        'Particle system kept churn low; pooled when it helped.',
        'Canvas composite operations created glow without shaders.',
        'Shield timing matched a simple, repeatable flash cadence.',
        'Task-based tutorial replaced static instructions for timing and delivery.',
        'Help/menu layout tweaks kept the UI centered and readable.',
      ],
    },

    // 4) Design & UX Insights
    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'It started as a calm collector. Adding the curiosity bar gave it a bit of structure and pressure so there was something to learn and improve at. The cat reacts to the cursor so it feels a little alive. I hope the evolution colors made progress clear enough to follow, from green to purple to gold to rainbow.',
    },
    {
      type: 'list',
      items: [
        'Curiosity bar set a clear goal while keeping the night-walk feel.',
        'Eyes and whiskers react to proximity to give the cat personality.',
        'Evolution colors (green → purple → gold → rainbow) show risk and reward.',
        'Tutorial and copy focused on clarifying the shield window.',
        'The drop and recollect loop is called out so climbing to rainbow feels intentional.',
      ],
    },

    // 5) Key Takeaways
    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'Constraints make things possible to finish. They force choices and keep ideas from drifting too far. I learned that clear timing and simple rules feel better than flashy effects. Small UX fixes can change how a game plays more than new features do. The game finally felt right when I stopped overthinking and just aimed for calm moments with short bursts of focus.',
    },

    // 6) Post-Mortem Reflections
    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'I missed the submission deadline because I mixed up CST and CT. It stung, but I finished the enhanced version anyway and felt better about it. Making two games in a row taught me to keep scope tight, fix what confuses players, and move on.',
    },
    {
      type: 'paragraph',
      content:
        'Next I want to try Unity. I might rebuild one of these ideas or return to the lightning concept that started this. Or pick something new. Stars and sparkles will probably show up.',
    },

    // 7) AI as a Creative Partner
    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'Copilot helped with repetitive logic and timing work. ChatGPT filled gaps when I needed just enough procedural audio, math, or physics to keep moving. That support kept me from stalling.',
    },
    {
      type: 'paragraph',
      content:
        'It also helped me wire up Firebase and the leaderboard. I still had to steer it, clean up what it wrote, and make sure it respected accessibility and clarity. A nice surprise was how far Canvas 2D can go. More than a few people thought the visuals were WebGL, which told me the glow and layering tricks did their job.',
    },

    // 8) Feedback
    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription:
        'Tried Nyx Felis? I’d love thoughts on the shield window, clarity, and overall feel.',
    },
  ],
};
