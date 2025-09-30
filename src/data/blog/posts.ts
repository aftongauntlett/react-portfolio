import type { BlogPost } from './types';

export const js13kPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Official Submission - Nyx Felis & Lampyrus',
    description:
      'My first JS13k game jam: building Nyx Felis and Lampyris with advanced Canvas 2D techniques. What went well, what went wrong, and what I learned about pushing vanilla JavaScript to its limits.',
    publishDate: '2025-09-17',
    slug: 'js13k-2025-post-mortem',
    author: 'Afton Gauntlett',
    readTime: '8 min read',
    tags: ['JS13k', 'Post-Mortem', 'Canvas 2D'],
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
      src: '/blog/nyx-felis.png',
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
          url: 'https://js13kgames.com/games/nyx-felis-and-lampyris',
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
      content: 'Tech Stack & Technical Achievements',
    },
    {
      type: 'list',
      items: [
        'Engine: Vanilla JavaScript with Canvas 2D (no WebGL, no libraries)',
        'Size: Optimized for js13k competition (<13KB zipped)',
        'Performance: 60fps gameplay with hundreds of particles and complex effects',
        'Audio: Dynamic sound effects and ambient background music',
      ],
    },
    {
      type: 'paragraph',
      content:
        'A player commented that they were impressed I built this using Canvas 2D instead of WebGL. Canvas 2D has a reputation for being "simple," but what I achieved here pushes it to its limits. This is pure vanilla Canvas 2D API with no frameworks or libraries—just mathematical precision and clever optimization.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Advanced Canvas 2D Techniques',
    },
    {
      type: 'paragraph',
      content:
        'The visual complexity achieved with Canvas 2D includes several sophisticated systems running simultaneously:',
    },
    {
      type: 'list',
      items: [
        'Multiple particle systems: atmospheric dust, capture effects, drop physics, rainbow trails',
        'Advanced gradient effects: radial gradients for glowing, linear gradients for UI depth',
        'Optimized shadow and glow systems with cached blur states for performance',
        'Complex curved drawing using quadraticCurveTo() for natural cat whiskers and smooth trajectories',
        'Real-time visual effects: screen shake, flash effects, dynamic alpha blending',
      ],
    },
    {
      type: 'paragraph',
      content:
        "The performance optimization is what makes this technically impressive. Canvas 2D isn't hardware-accelerated like WebGL, yet I maintain 60fps with hundreds of particles, multiple gradients, and complex effects. This required state caching to avoid redundant Canvas API calls, batch rendering to minimize context switches, and efficient particle culling and lifecycle management.",
    },
    {
      type: 'paragraph',
      content:
        "Most games with this visual richness use WebGL or game engines. Achieving particle effects and lighting that look almost GPU-accelerated, all within 21KB uncompressed vanilla JavaScript, demonstrates what's possible when you push Canvas 2D beyond simple drawing into real-time visual effects territory.",
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
      content: 'On AI Assistance and Mathematical Realities',
    },
    {
      type: 'paragraph',
      content:
        'Let me be transparent about something: those "mathematical precision" and "clever optimization" achievements I mentioned? Yeah, my math skills are approximately equivalent to a golden retriever trying to solve calculus. I can barely calculate a tip without my phone calculator.',
    },
    {
      type: 'paragraph',
      content:
        'The Canvas 2D magic happened through a combination of GitHub Copilot suggestions, Claude Sonnet explaining why my particle physics were behaving like drunk fireflies, and strategic googling when ChatGPT got too excited about theoretical solutions that would require a PhD in mathematics to implement.',
    },
    {
      type: 'paragraph',
      content:
        'Learning when to use which AI tool became its own skill: Copilot for "please autocomplete this obviously repetitive code pattern," Claude for "explain why my gradients look like someone spilled paint," ChatGPT for "what is trigonometry and why does my cat need to understand it," and good old Google/YouTube when I needed someone to slowly walk me through concepts like I was five.',
    },
    {
      type: 'paragraph',
      content:
        'The result is still my code—I wrote every line, debugged every particle system crash, and suffered through every performance optimization. But pretending I figured out quadratic curves and optimized shadow blur caching through pure human brilliance would be like claiming I built my house without tools. AI assistance is just a really sophisticated hammer.',
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
    title: 'JS13k 2025 Practice Demo - Orbital Order',
    description:
      'Creating a JS13K practice game that teaches atomic physics through interactive orbital mechanics and procedural audio.',
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
      type: 'paragraph',
      content:
        'Orbital Order was my JS13K practice project—a physics-based puzzle game that teaches real atomic structure through interactive gameplay. Players guide electrons into their proper orbitals using electromagnetic fields, learning chemistry while building atoms from Hydrogen to Oxygen. As my very first completed game, this project pushed me into unfamiliar territory: physics simulation, educational game design, and procedural audio synthesis.',
    },
    {
      type: 'blog-image',
      src: '/blog/orbital-order.png',
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
        'I wanted to create something that taught real science, not just abstract puzzles. The game follows authentic electron configuration rules—the Aufbau principle, Pauli exclusion, and actual orbital energy levels. Players learn that s-electrons and p-electrons behave differently, why 1s orbitals fill before 2s, and how real atomic structure works. The challenge was translating quantum mechanics into intuitive gameplay without losing scientific accuracy.',
    },
    {
      type: 'paragraph',
      content:
        "I did considerable research into electron configuration and atomic structure—I didn't know much about chemistry starting out, but I have this weird passion for educational games despite usually hating educational content. There's something about building games around interesting facts that lights up my brain. I love learning while building, and I've already started researching lightning physics for my next game idea (did you know lightning can strike upward from the ground?). If I ever wanted to sell an educational game commercially, I'd definitely reach out to academics and professionals for validation—I would absolutely hate to teach someone something incorrect!",
    },
    {
      type: 'heading',
      level: 2,
      content: 'Physics Simulation Architecture',
    },
    {
      type: 'paragraph',
      content:
        'The game simulates electromagnetic interactions between electrons and mouse cursor positioning. Blue s-electrons are attracted to the cursor while orange p-electrons are repelled, creating intuitive controls for complex quantum mechanical rules. Each electron has physics properties—position, velocity, electromagnetic influence zones, and collision detection with orbitals and boundaries.',
    },
    {
      type: 'paragraph',
      content:
        'The biggest technical challenge was making the physics feel responsive while remaining scientifically accurate. Electrons needed to bounce realistically off orbital barriers when violating electron configuration rules, but still feel smooth and controllable. I implemented electromagnetic storms in infinite mode that create chaotic fields affecting electron movement, adding gameplay variety while demonstrating how external forces affect atomic structure.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Procedural Audio System',
    },
    {
      type: 'paragraph',
      content:
        'Rather than using audio files, Orbital Order generates all sound effects and background music through the Web Audio API. The system creates chord progressions, electron collision sounds, orbital capture feedback, and atmospheric ambient music—all synthesized in real-time through JavaScript.',
    },
    {
      type: 'paragraph',
      content:
        'I was genuinely surprised by how much I loved the audio that came out of this project, and how little tweaking it needed. The procedural approach worked so well that I got cocky—when I started working on audio for my main JS13K entry, I was shocked to discover I\'d gotten incredibly lucky here. Apparently giving Claude a detailed prompt about "ethereal cosmic chemistry sounds" and getting beautiful chord progressions back was not going to be repeatable magic. This taught me to appreciate good audio when it happens and commit those wins early.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Code Golf and Optimization',
    },
    {
      type: 'paragraph',
      content:
        'The final build achieved a 47% compression ratio, reaching 8.2KB zipped—well under the 13KB limit with 4.8KB budget remaining. This required implementing Terser minification with aggressive optimization settings, renaming classes to single letters, and fixing critical HTML replacement bugs in the build system.',
    },
    {
      type: 'paragraph',
      content:
        'Learning what "code golfing" actually meant was a steep curve—suddenly I\'m working in single files with no reusable components, trying to understand what Terser and Rollup do, and discovering that every character counts. The constraint actually helped focus my development, though I was impressed with how well I managed scope creep. Having 4.8KB of budget remaining means I could add more features if I wanted, but I\'m ready to move on to my next game.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Game Design Decisions',
    },
    {
      type: 'paragraph',
      content:
        'The two-hit knockout system for removing electrons emerged as a key interaction pattern—first click shakes the orbital with audio feedback, second click ejects the electron and bounces it away. This prevents accidental moves while providing clear visual and audio feedback. The tutorial system uses contextual hints that appear when specific electron types spawn, teaching players organically rather than overwhelming them with instructions.',
    },
    {
      type: 'paragraph',
      content:
        "A friend's playtesting feedback proved invaluable: she suggested showing element information as persistent overlays instead of modal cards that interrupt gameplay flow. She also recommended making the tutorial more interactive with contextual hints rather than static instructions. Both suggestions dramatically improved the user experience and I carried these lessons into my main JS13K entry. Watching people play my game was genuinely fun—getting feedback is great and the community turned out to be incredibly supportive.",
    },
    {
      type: 'heading',
      level: 2,
      content: 'What Went Well',
    },
    {
      type: 'paragraph',
      content:
        "As my very first completed game, I'm incredibly proud that Orbital Order actually works as intended—players learn real chemistry while having fun with physics-based puzzles. The procedural audio system exceeded my expectations, creating an atmospheric experience that feels much larger than its tiny file size. The educational goals succeeded: players understand electron configuration rules through gameplay rather than memorization.",
    },
    {
      type: 'paragraph',
      content:
        "The scientific accuracy held up under scrutiny—the game correctly teaches s-electrons vs p-electrons, the Aufbau principle, and real atomic structure for elements from Hydrogen through Oxygen. Players reported actually learning chemistry concepts, which validated the educational approach. The whole experience has been fun from start to finish, and I'm happy I took the leap into game development.",
    },
    {
      type: 'heading',
      level: 2,
      content: 'On AI Tools and Creative Confidence',
    },
    {
      type: 'paragraph',
      content:
        "Full transparency: I'm a developer, but I'd never made a game before this project. AI assistance became my training wheels for venturing into unfamiliar territory—physics simulation, procedural audio, educational game design, and even dipping my toes into pixel art concepts.",
    },
    {
      type: 'paragraph',
      content:
        'Claude helped explain why my electron collision detection was behaving like a drunk physics simulation, GitHub Copilot autocompleted repetitive Canvas API patterns, and ChatGPT walked me through Web Audio API concepts when I needed someone to explain oscillators like I was five. The AI tools gave me the confidence to attempt something as ambitious as the JS13K competition.',
    },
    {
      type: 'paragraph',
      content:
        'But here\'s the thing: I still wrote every line of code, debugged every physics glitch, and made every design decision. AI assistance is like having really good documentation that can explain itself—it helped me learn faster, but the learning still had to happen in my brain. The tools have fueled my creativity by removing some of the "I don\'t know how to do that" barriers, letting me focus on "what do I want to create?" instead.',
    },
    {
      type: 'paragraph',
      content:
        'I\'m now exploring AI tools for music generation and pixel art because frankly, I was getting tired of trying to explain to Claude what "ethereal cosmic chemistry sounds" should actually sound like. These tools are expanding what I can attempt as a solo developer, which feels like the whole point.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Lessons Learned',
    },
    {
      type: 'paragraph',
      content:
        'This project taught me that educational games can be genuinely engaging without sacrificing scientific accuracy. The procedural audio approach proved more flexible and size-efficient than audio files, though I learned not to take audio success for granted. Most importantly, playtester feedback revealed UX issues I never would have caught on my own—external perspectives are invaluable.',
    },
    {
      type: 'paragraph',
      content:
        "The build optimization process showed me how modern JavaScript tooling can achieve incredible compression ratios while maintaining clean, readable source code. Starting with a practice project before the actual JS13K competition was absolutely the right call—it let me experiment with unfamiliar technologies without submission pressure. The supportive community made the whole experience enjoyable, and I'm genuinely excited to keep exploring game development.",
    },
    {
      type: 'feedback-form',
      formTitle: 'Played Orbital Order?',
      formDescription: 'Curious about your experience with the educational gameplay!',
    },
  ],
};

export const blogPosts = [js13kPostMortem, orbitalOrderPostMortem];
