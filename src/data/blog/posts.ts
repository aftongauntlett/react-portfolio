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
        'I wanted to build a game, and when I came across the JS13k competition, I knew this would be a perfect project - small enough to make sure I would finish! When the theme landed on Black Cats, I was super happy - I love cats. I also love fireflies, so I immediately knew where I wanted to go with it. I wanted it to be calm, cozy, and a bit mysterious. And particles, lots of particles.',
    },
    {
      type: 'pull-quote',
      content: '"An animal\'s eyes have the power to speak a great language." - David Attenborough',
    },

    // 2) Technical Overview
    { type: 'heading', level: 2, content: 'Technical Overview' },
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
    {
      type: 'paragraph',
      content:
        'The visuals are minimal but purposeful: layered gradients, soft composites, and particle glints to sell bioluminescence without WebGL. The audio was generated in code; it came together, but I’d rework it with more experience - the constraint taught me a lot.',
    },

    // 3) Engineering Insights
    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'Most engineering effort went into keeping timing readable. The shield window needed to feel predictable while everything else shimmered. When players read the red warning flashes as “the attack itself,” I tightened copy, cues, and ordering so the third flash clearly signaled “now.”',
    },
    {
      type: 'list',
      items: [
        'Particle system tuned for low churn; pooled objects where it mattered.',
        'Canvas composite operations for glow instead of shader work.',
        'Shield timing aligned to a simple, repeatable flash cadence.',
        'Task-based tutorial replaced static instructions to teach timing and delivery.',
        'Small fixes to help/menu layout so UI stayed centered and readable.',
      ],
    },

    // 4) Design & UX Insights
    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'It started as a peaceful collector. Adding the curiosity bar introduced gentle pressure and turned it into an actual game. The cat’s face reacts to the cursor - whiskers, eyes, nose - because tiny, responsive touches carry a lot of feeling. The firefly evolution colors sell progress at a glance.',
    },
    {
      type: 'list',
      items: [
        'Curiosity bar added a clear goal without losing the night-walk vibe.',
        'Eyes/whiskers respond to proximity; small animation = big personality.',
        'Evolution colors (green → purple → gold → rainbow) communicate risk/reward.',
        'Tutorial and copy focused on clarifying the shield window.',
        'Made the drop-and-recollect loop explicit in the tutorial and copy so climbing to rainbow tier feels intentional.',
      ],
    },

    // 5) Key Takeaways
    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'Constraints helped me finish. Clear timing beats flashy effects, and tiny UX changes move the needle more than new features. The game found its shape when I accepted “calm with pockets of focus” instead of chasing every idea.',
    },

    // 6) Post-Mortem Reflections
    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'I missed the submission deadline due to a timezone mistake - annoying, but not the end. I finished the enhanced version anyway and ended up happier with it. Making two games back-to-back taught me discipline: keep scope tight, fix what confuses players, move on. Next I’ll explore Unity - maybe rebuild one of these ideas, revisit the lightning concept that started me down this path, or try something new. Stars, sparkles, particles and glows will most certainly be involved.',
    },

    // 7) AI as a Creative Partner
    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'I used Copilot for coding and ChatGPT for research and unblocking build/deployment questions. It’s a tool, not magic - useful when directed, messy when left alone. I had to keep it honest: prefer reusable bits, keep accessibility in mind, don’t repeat logic, respect keyboard focus and contrast.',
    },
    {
      type: 'paragraph',
      content:
        'A good example of “human in the loop”: centering the help menu. The AI declared it fixed several times while the screen still looked off. Adding visual debug markers exposed the issue - the container was centered, but the left-aligned text made it read wrong. We measured real text width, wrapped that, and centered the result. Same with Firebase leaderboard testing - I asked for a simple local UI harness so I could click through tests without juggling dashboards. The value wasn’t shortcuts; it was faster feedback.',
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
        'Before the official JS13k competition, I built Orbital Order as a warm-up challenge: a small, self-contained experiment in physics, color, and constraint. Guide electrons into orbitals, follow atomic rules, and learn how a few lines of code can feel alive. It was my first finished game, and it reminded me how satisfying it is to make something click.',
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
        'The idea first sparked while I was watching Neil deGrasse Tyson talk about lightning on StarTalk. I loved how he described the movement of energy - invisible, but powerful - and started wondering if that could be turned into gameplay. I tried lightning, but what I built looked more like atoms. That visual shift ended up changing everything. Stable orbitals, glowing electrons, and the Aufbau principle became the backbone of the game. Once I leaned into it, the whole thing just clicked.',
    },
    {
      type: 'pull-quote',
      content:
        '"The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff." - Carl Sagan',
    },

    // SECTION 2: Technical Overview
    { type: 'heading', level: 2, content: 'Technical Overview' },
    {
      type: 'list',
      items: [
        'Built with vanilla JavaScript and Canvas 2D.',
        'All audio generated procedurally using the Web Audio API.',
        'Optimized to fit under 13KB using Terser and code golfing.',
        'Features authentic atomic structure logic: 1s² → 2s² → 2p⁶.',
        'Runs at 60fps with real-time electron physics and collision checks.',
      ],
    },
    {
      type: 'paragraph',
      content:
        'The color palette came from equal parts science-class nostalgia and my love for Portal’s blue and orange energy. Those two colors just felt alive together - like charge and polarity. I wanted it to look quiet but energetic, like floating in space without the coldness. The sound design followed that same vibe: calm, minimal, slightly isolating in a way that felt focused, not lonely.',
    },

    // SECTION 3: Engineering Insights
    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'This project was my crash course in scope control. Working within a 13KB limit forced me to think about every single byte - no libraries, no waste. Every little choice mattered. I started to enjoy that kind of precision. Watching the code shrink through Terser and seeing how much still worked was surprisingly fun. Once I understood what “golfing” was doing, it made sense - like trimming distance between ideas and execution.',
    },
    {
      type: 'list',
      items: [
        'Reduced from 47KB to 8.2KB zipped using aggressive minification.',
        'Simplified the main render loop for smoother, predictable timing.',
        'Removed an infinite mode that created state-pollution bugs.',
        'Replaced static instructions with an interactive tutorial.',
        'Used save/restore blocks to keep Canvas state consistent.',
      ],
    },

    // SECTION 4: Design & UX Insights
    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'Most of my design choices came from curiosity. The push and pull forces were born out of lightning experiments that turned into orbit mechanics. Blue and orange became my stand-ins for attraction and repulsion - positive and negative. I’ve always loved glowy effects and smooth gradients, so that part came naturally. I added a light storm effect near the end to bring some tension without losing the calm tone.',
    },
    {
      type: 'list',
      items: [
        'Interactive tutorial helped players understand the mechanics by doing, not reading.',
        'Level transitions became seamless instead of pausing between rounds.',
        'Playtest feedback simplified UI flow - fewer interruptions, better pacing.',
        '“Two-hit knockout” stayed as a light penalty to reward precision without punishing mistakes.',
      ],
    },

    // SECTION 5: Key Takeaways
    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'Finishing something small changed how I think about projects. It proved that small ideas can carry weight if they feel complete. I learned that polish and clarity matter more than scale - that scope control is a skill, not a compromise. And that performance work isn’t just about tools or numbers; it’s about being thoughtful with what you build and why.',
    },

    // SECTION 6: Post-Mortem Reflections
    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'Looking back, Orbital Order gave me more than I expected. It built confidence, but also reminded me why I love learning - how science and design overlap, how visuals can feel like physics. I’d love to explore that intersection further, maybe in Unity, or maybe by revisiting the lightning idea that started it all. Either way, I know I’ll end up chasing that same glow - calm, focused, and a little bit curious.',
    },

    // SECTION 7: AI as a Creative Partner
    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'Copilot handled a lot of the repetitive code, while ChatGPT helped me reason through the physics and debug the build pipeline. It made things that used to feel intimidating - like procedural audio and compression - actually approachable. I still had to keep it honest, though. I caught it repeating logic or overcomplicating structure more than once. The trick was treating it like a junior partner: helpful, but only if you’re paying attention.',
    },
    {
      type: 'paragraph',
      content:
        'AI helped me stretch into new areas without removing the challenge. I learned how to prompt better, how to read its code critically, and how to balance curiosity with control. The best part wasn’t that it wrote things faster - it was that it made me braver about trying new ones.',
    },

    // SECTION 8: Feedback
    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription:
        'Played Orbital Order? I’d love to hear your thoughts on the pacing, visuals, and overall feel.',
    },
  ],
};

export const blogPosts = [nyxFelisPostMortem, orbitalOrderPostMortem];
