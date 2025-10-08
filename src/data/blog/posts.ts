import type { BlogPost } from './types';

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
      src: '/blog/nyx-felis.png',
      alt: 'Nyx Felis under a starry sky with glowing fireflies orbiting',
      caption: 'Nyx Felis & Lampyris - a small game about curiosity, timing, and fireflies',
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
      src: '/blog/orbital-order.png',
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

export const blogPosts = [nyxFelisPostMortem, orbitalOrderPostMortem];
