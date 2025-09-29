import type { BlogPost } from './types';

export const js13kPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025: Post-Mortem',
    description:
      'My first JS13k game jam: building Nyx Felis and Lampyris. What went well, what went wrong, and what I learned.',
    publishDate: '2025-09-17',
    slug: 'js13k-2025-post-mortem',
    author: 'Afton Gauntlett',
    readTime: '8 min read',
    tags: ['Game Development', 'JS13k', 'Post-Mortem', 'Web Development'],
    categories: ['Game Development'],
    featured: true,
  },
  sections: [
    {
      type: 'paragraph',
      content:
        'Nyx Felis and Lampyris was my entry for the 2025 JS13k competition. This was my first time joining the jam, and while my game ended up in the "Unfinished" category due to a timezone mistake, the real story happened after submission. What started as a flawed but visually polished tech demo became a proper game through a complete mechanical rebuild—and taught me more about game design than I expected.',
    },
    {
      type: 'blog-image',
      src: '/blog/cat-game-main.png',
      alt: 'Gameplay screenshot of Nyx Felis and Lampyris showing the night sky with glowing fireflies and Nyx Felis the cat',
      caption: 'Main gameplay - Nyx Felis collecting fireflies in the starry night sky',
    },
    {
      type: 'links',
      links: [
        {
          url: 'https://github.com/caoimhejyoti/js13k-nyx-felis-and-lampyris',
          text: 'View Source Code',
          type: 'github',
        },
        {
          url: 'https://js13k-nyx-felis.vercel.app/',
          text: 'Play Original Submission',
          type: 'demo',
        },
        {
          url: 'https://nyx-felis.aftongauntlett.com',
          text: 'Play Final Version',
          type: 'demo',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Tech Stack',
    },
    {
      type: 'list',
      items: [
        'Engine: Vanilla JavaScript with Canvas 2D',
        'Size: Optimized for js13k competition (<13KB zipped)',
        'Performance: 60fps gameplay with efficient rendering',
        'Audio: Dynamic sound effects and ambient background music',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'Project Goals',
    },
    {
      type: 'list',
      items: [
        'See if I could realistically complete a game within the 13kb constraint.',
        'Experiment with both visuals and audio inside tight limits.',
        'Practice writing cleaner code by cutting down on duplication.',
        'Learn how to balance scope vs. time in a high-pressure environment.',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'What Went Well',
    },
    {
      type: 'paragraph',
      content:
        "I was especially happy with the polish in the visuals. Small details—like the cat's eyes and whiskers moving, or the curve of its smile—took many iterations, but the result captured the atmosphere I wanted. I also managed to refactor out a lot of repeated code, which gave me cleaner structure than I usually manage under time pressure.",
    },
    {
      type: 'list',
      items: [
        'Visual polish and animation details turned out well.',
        'Improved habits around cleaning up redundant code.',
        'Bundling/minification (Rollup + Terser) taught me a lot about optimization.',
        'I built working audio/music in code despite limited sound options.',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'Challenges Faced',
    },
    {
      type: 'paragraph',
      content:
        'The most obvious mistake was the timezone confusion—I thought I was submitting early, but I missed the real CEST deadline by a few hours. I also lost some promising music when I went too long without committing. Gameplay itself was the biggest issue: at ~10 minutes it ran too long, was almost impossible to lose, and lacked the meaningful choices that make games engaging. The submitted version was more of an interactive art piece than a real game.',
    },
    {
      type: 'list',
      items: [
        'Deadline confusion (CEST vs CST) caused a late submission.',
        "Waiting too long to commit cost me some unique audio I couldn't reproduce.",
        "Gameplay loop is too easy and doesn't provide enough challenge.",
        'Spending too much time on polish before locking down core mechanics.',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'Post-Submission Rebuild',
    },
    {
      type: 'paragraph',
      content:
        "After submission, I couldn't let go of the concept. The visual polish was there, but the gameplay had fundamental issues: no real challenge, unclear mechanics, and a 10-minute experience that felt more like a tech demo than a game. So I decided to rebuild it properly.",
    },
    {
      type: 'list',
      items: [
        'Redesigned the entire system around mana (bioluminescence) as the central resource.',
        'Added exponential firefly evolution with genuine risk/reward decisions.',
        'Implemented precision timing mechanics for skill expression.',
        "Created urgency through Nyx's constantly decreasing curiosity meter.",
        'Transformed it from a passive experience into an intense resource management game.',
      ],
    },
    {
      type: 'paragraph',
      content:
        "The biggest changes focused on creating meaningful player choices. Every action now costs mana, fireflies evolve through risk/reward mechanics, and Nyx's curiosity creates constant urgency. Instead of a relaxing 10-minute collector, it became an intense resource management game where every decision matters.",
    },
    {
      type: 'list',
      items: [
        'Mana system: Every action costs resources, creating strategic tension.',
        'Evolution mechanics: Fireflies evolve through color stages with exponential point values.',
        'Perfect timing rewards: Precision shield timing gives bonus points and saves mana.',
        'Curiosity pressure: Constant timer forces risk/reward decisions on when to deliver fireflies.',
        'Real consequences: Evolved fireflies are permanently lost if caught unshielded.',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'The Final Version',
    },
    {
      type: 'paragraph',
      content:
        'After several development sessions, the game is now complete. At 21KB (well over the 13KB limit), it represents everything I wanted the original submission to be. The positive feedback from playtesters on even the flawed original submission has been incredibly encouraging—it confirmed the core concept was solid, just poorly executed.',
    },
    {
      type: 'list',
      items: [
        'Task-based tutorial system that actually teaches instead of overwhelming new players.',
        'Unified timing system where all visual effects sync to predictable 4-second cycles.',
        'Fixed critical bugs like the delivery system completely breaking after one minute.',
        'Transparent mana economy where costs and recovery are clear and consistent.',
        'Shield timing rewards that encourage skill development rather than just punishing mistakes.',
        'Infinite mode for players who want a relaxing firefly collection experience without pressure.',
        'Complete documentation so players can make informed strategic decisions.',
      ],
    },
    {
      type: 'paragraph',
      content:
        'The difference between "working code" and "player-ready game design" became crystal clear. The submission had the mechanics, but lacked the communication, consistency, and polish needed for players to actually enjoy those mechanics. Playing through other JS13K entries also reminded me why I love game development—seeing creative solutions to constraints and unique interpretations of themes.',
    },
    // TODO: Add GIFs showing tutorial system, UI improvements, and infinite mode
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'Lessons Learned',
    },
    {
      type: 'paragraph',
      content:
        'The biggest takeaway is to flesh out gameplay concepts much earlier—before going deep on polish. Scope planning matters a lot: having a clear list of must-haves vs. nice-to-haves would have saved time. Frequent commits are essential, and testing gameplay balance earlier would have caught issues before submission day.',
    },
    {
      type: 'list',
      items: [
        'Focus on core gameplay loop before polish - mechanics first, visuals second.',
        'Plan scope with clear must-haves vs. nice-to-haves to avoid feature creep.',
        'Commit frequently to avoid losing work, especially audio/music experiments.',
        'Test gameplay balance early with real playtesting, not just personal testing.',
        'The difference between "working code" and "player-ready design" is massive.',
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'The Practice Project',
    },
    {
      type: 'paragraph',
      content:
        'Before diving into the actual JS13K competition, I built Orbital Order as a practice project to test whether I could realistically work within the 13KB constraint. This educational physics game taught me invaluable lessons about code optimization, game design, and working within tight technical limitations.',
    },
    {
      type: 'links',
      links: [
        {
          url: '/blog/orbital-order-post-mortem',
          text: 'Read the Orbital Order Post-Mortem',
          type: 'external',
        },
      ],
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: "What's Next",
    },
    {
      type: 'paragraph',
      content:
        "Having rebuilt the core mechanics from scratch, I'm excited about game development in a way I wasn't before. The process taught me more about meaningful player choice and systems design than years of tutorials. My next step is diving into Unity—I want to see what's possible when I'm not fighting against size constraints and can focus purely on compelling gameplay.",
    },
    { type: 'separator' },
    {
      type: 'feedback-form',
      formTitle: 'Share Your Feedback',
      formDescription: "Played the game? I'd love to hear your thoughts!",
    },
  ],
};

export const orbitalOrderPostMortem: BlogPost = {
  metadata: {
    title: 'Orbital Order: Building an Educational Physics Game',
    description:
      'Creating a JS13K practice game that teaches atomic physics through interactive orbital mechanics and procedural audio.',
    publishDate: '2025-09-25',
    slug: 'orbital-order-post-mortem',
    author: 'Afton Gauntlett',
    readTime: '6 min read',
    tags: ['Game Development', 'JS13K', 'Physics', 'Educational Games', 'Procedural Audio'],
    categories: ['Game Development'],
    featured: false,
  },
  sections: [
    {
      type: 'paragraph',
      content:
        'Orbital Order was my JS13K practice project—a physics-based puzzle game that teaches real atomic structure through interactive gameplay. Players guide electrons into their proper orbitals using electromagnetic fields, learning chemistry while building atoms from Hydrogen to Nitrogen. The project pushed me into unfamiliar territory: physics simulation, educational game design, and procedural audio synthesis.',
    },
    {
      type: 'blog-image',
      src: '/blog/orbital-order-main.png',
      alt: 'Orbital Order gameplay showing electron orbitals and physics simulation',
      caption:
        'Orbital Order - Building authentic atomic structures through physics-based gameplay',
    },
    {
      type: 'links',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-demo',
          text: 'View Source Code',
          type: 'github',
        },
        {
          url: 'https://js13k-demo.vercel.app',
          text: 'Play Game',
          type: 'demo',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Educational Challenge',
    },
    {
      type: 'paragraph',
      content:
        'TBD - What inspired the educational approach? How did you balance teaching real chemistry concepts with engaging gameplay? What research went into ensuring the atomic physics were accurate?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Physics Simulation Architecture',
    },
    {
      type: 'paragraph',
      content:
        'The game simulates electromagnetic interactions between electrons and mouse cursor positioning. Blue electrons (s-orbitals) are attracted to the cursor while orange electrons (p-orbitals) are repelled, creating intuitive controls for complex quantum mechanical rules. The challenge was making realistic physics feel natural and responsive.',
    },
    {
      type: 'paragraph',
      content:
        'TBD - What were the biggest technical challenges in implementing the physics simulation? How did you handle electron collision detection and orbital validation?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Procedural Audio System',
    },
    {
      type: 'paragraph',
      content:
        'Rather than using audio files, Orbital Order generates all sound effects and background music through code. The system creates musical chord progressions and feedback sounds that respond to gameplay events, adding atmospheric depth while staying within JS13K size constraints.',
    },
    {
      type: 'paragraph',
      content:
        'TBD - How did you approach procedural audio generation? What were the challenges of creating musical content through code? How did the audio enhance the educational experience?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Code Golf and Optimization',
    },
    {
      type: 'paragraph',
      content:
        'The final build hit exactly 13.0KB—right at the JS13K budget limit. This required aggressive code golfing, with classes renamed to single letters (AudioSystemGolfed → Class A, OrbitalSystemGolfed → Class O) and every byte optimized. The technical architecture had to be rebuilt around size constraints.',
    },
    {
      type: 'paragraph',
      content:
        'TBD - What was your approach to code minification? Which optimizations had the biggest impact on file size? How did size constraints affect your development process?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Game Design Decisions',
    },
    {
      type: 'paragraph',
      content:
        'The two-hit knockout system for removing electrons emerged as a key interaction pattern—first click shakes the orbital with audio feedback, second click ejects the electron. This prevents accidental moves while providing clear visual and audio feedback for player actions.',
    },
    {
      type: 'paragraph',
      content:
        'TBD - How did you iterate on the game mechanics? What other interaction patterns did you try? How did you test the educational effectiveness?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'What Went Well',
    },
    {
      type: 'paragraph',
      content:
        'TBD - What aspects of the project are you most proud of? Did the educational goals succeed? How was the reception from players?',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Lessons Learned',
    },
    {
      type: 'paragraph',
      content:
        'TBD - What would you do differently if rebuilding this game? What did this project teach you about educational game design, physics simulation, or JS13K development?',
    },
    {
      type: 'feedback-form',
      formTitle: 'Played Orbital Order?',
      formDescription: 'Curious about your experience with the educational gameplay!',
    },
  ],
};

export const blogPosts = [js13kPostMortem, orbitalOrderPostMortem];
