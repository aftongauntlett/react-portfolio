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
      caption: 'Nyx Felis — a small game about curiosity, timing, and fireflies',
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
      'A post-mortem for Orbital Order, my first completed JS13k practice project - a physics-based puzzle game built in vanilla JavaScript that teaches atomic structure through interactive play. It explores minimalism, scientific accuracy, and creative confidence gained through AI-assisted development.',
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
      caption: 'Orbital Order - teaching atomic structure through interactive physics',
      content:
        'Before the official JS13k competition, I built Orbital Order as a warm-up challenge: a small, self-contained game about guiding electrons into orbitals using simple mouse interactions. It was my first completed game, and my first serious attempt to mix science, education, and game feel - all under 13KB.',
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
        'The idea started while watching Neil deGrasse Tyson explain lightning on StarTalk. I thought the physics behind lightning could make interesting mechanics, but after prototyping, the visuals of orbs and rings started feeling more like atoms. From there, the theme pivoted naturally to chemistry - stable orbitals, glowing electrons, and the Aufbau principle became the foundation of the game. It was the first project where everything seemed to fall into place.',
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
        'The visual palette came from a mix of science class nostalgia and Portal’s iconic blue-orange energy. Those colors instantly gave the atoms personality. The sound design leaned toward calm and minimal — ambient hums and gentle tones meant to feel like quiet isolation in space, but without loneliness. It’s the kind of solitude that feels focused.',
    },

    // SECTION 3: Engineering Insights
    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'The project was my crash course in scope control. The 13KB limit demanded discipline - no external libraries, no wasted bytes. Every small decision mattered. I learned to watch how often objects were created, how to reuse references, and how to structure updates cleanly. Golfing and minification were fascinating to watch in action. Once I understood what they were doing, the term “golfing” made sense - it’s all about precision and less distance between ideas and results.',
    },
    {
      type: 'list',
      items: [
        'Reduced from 47KB to 8.2KB zipped using aggressive minification.',
        'Simplified rendering loop for stability and performance.',
        'Removed a complex infinite mode after state-pollution bugs surfaced.',
        'Introduced an interactive tutorial for onboarding new players.',
        'Used save/restore patterns to manage Canvas state safely.',
      ],
    },

    // SECTION 4: Design & UX Insights
    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'Most of the early design decisions came from curiosity, not planning. Watching a Neil deGrasse Tyson segment about lightning sparked ideas about push and pull forces - that later became the electron interactions. I liked the way blue and orange felt opposite but harmonious, like positive and negative charges. I love glowy effects, particles, and calm color gradients, so building the visuals was the most natural part of the process. The lightning storm effect at the end added some gentle chaos and challenge without breaking the calm tone.',
    },
    {
      type: 'list',
      items: [
        'Interactive tutorial replaced static instructions to make learning intuitive.',
        'Level transitions redesigned to flow seamlessly instead of pausing gameplay.',
        'Player feedback influenced polish — fewer modals, smoother flow.',
        '“Two-hit knockout” kept as a light penalty to encourage precision.',
      ],
    },

    // SECTION 5: Key Takeaways
    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'This was the project that taught me the value of finishing. It reinforced that smaller, polished ideas have more impact than ambitious, half-finished ones. I learned that clarity in scope and UX feedback loops matter as much as clever mechanics. And I learned that compression and performance tuning are less about tools and more about how you think as a developer.',
    },

    // SECTION 6: Post-Mortem Reflections
    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'Looking back, this game gave me something bigger than technical skill - it gave me confidence. For a first finished project, it represented a shift from “I wonder if I could” to “I can.” It made me curious again about learning, science, and visual design. The next logical step is expanding what I learned into something larger, maybe in Unity, or even returning to the lightning idea that started this all. Wherever it leads, this project is the foundation.',
    },

    // SECTION 7: AI as a Creative Partner
    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'Copilot handled most of the code integration and low-level logic, while ChatGPT helped me explore scientific principles and troubleshoot deployment issues. This just made the whole idea of making a game more approachable. The biggest challenge was learning how to steer it. I had to remind Copilot to build reusable structures, respect accessibility, and avoid redundant logic. Using it well meant understanding what it misunderstood. Over time, I learned to prompt more like a technical partner than a user.',
    },
    {
      type: 'paragraph',
      content:
        'AI let me try things I used to avoid because they looked intimidating - like physics formulas, procedural audio, and build pipelines. Watching how it structured code helped me become more deliberate about architecture and naming. Overall, it expanded my creative possibilities without taking away the challenge.',
    },

    // SECTION 8: Feedback
    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription:
        'Played Orbital Order? I’d love to hear your thoughts on the mechanics and pacing.',
    },
  ],
};

export const blogPosts = [nyxFelisPostMortem, orbitalOrderPostMortem];
