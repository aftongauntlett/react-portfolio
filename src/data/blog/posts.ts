import type { BlogPost } from './types';

export const js13kPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Official Submission',
    subtitle: 'Nyx Felis & Lampyrus',
    description:
      'A detailed post-mortem of my first JS13k competition entry, covering the technical challenges of building a resource management game in vanilla JavaScript. This deep dive explores advanced Canvas 2D techniques, procedural audio synthesis, game state management, and the lessons learned from pushing browser APIs to their limits within a 13KB constraint. Includes insights on what worked, what failed, and how the game evolved from an unfinished submission to a complete experience through post-jam iteration.',
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
      type: 'game-showcase',
      src: '/blog/nyx-felis.png',
      alt: 'Gameplay screenshot of Nyx Felis and Lampyris showing the night sky with glowing fireflies and Nyx Felis the cat',
      caption: 'Main gameplay - Nyx Felis collecting fireflies in the starry night sky',
      content:
        'Nyx Felis and Lampyris was my entry for the 2025 JS13k competition. This was my first time joining the jam, and while my game ended up in the "Unfinished" category due to a timezone mistake, the real story happened after submission. What started as a flawed but visually polished tech demo became a proper game through a complete mechanical rebuild—and taught me more about game design than I expected.',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-2025',
          text: 'View Source Code',
          type: 'github',
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
        'Audio: Fully procedural Web Audio API system with zero external sound files',
      ],
    },
    {
      type: 'paragraph',
      content:
        'A player commented that they were impressed I built this using Canvas 2D instead of WebGL. Canvas 2D has a reputation for being "simple," but I managed to pack in particle systems, gradient effects, and real-time visual effects that normally require game engines. Claude helped me understand why my particle physics looked like drunk fireflies at first, but the end result maintains 60fps with hundreds of particles running simultaneously—all in vanilla JavaScript with no libraries.',
    },
    { type: 'separator' },
    {
      type: 'heading',
      level: 2,
      content: 'Building Audio From Scratch',
    },
    {
      type: 'paragraph',
      content:
        'Creating all the audio procedurally through the Web Audio API was one of my favorite parts. No external sound files—everything from firefly collection sounds to the background music gets synthesized in real-time using oscillators and mathematical formulas. The firefly sound slides between frequencies with volume fading, while the music generates harmonic chord progressions that never repeat exactly. It sounds way more sophisticated than my actual understanding of music theory would suggest, but that\'s the magic of working with tools that can translate "I want ethereal space cat vibes" into actual audio code.',
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
      content: "What Worked and What Didn't",
    },
    {
      type: 'paragraph',
      content:
        "I was thrilled with the visual polish—all those little details like the cat's animated whiskers and glowing eyes really captured the atmosphere I wanted. The procedural audio turned out better than expected, and I learned a ton about code optimization through Rollup and Terser. But the biggest mistake was obvious: I completely botched the timezone conversion and submitted late to the competition. Even worse, I spent so much time on visual polish that the actual gameplay was broken—10 minutes long, nearly impossible to lose, and more like an interactive screensaver than a real game.",
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
      type: 'heading',
      level: 2,
      content: 'Share Your Feedback',
    },
    {
      type: 'feedback-form',
      formDescription: "Played the game? I'd love to hear your thoughts!",
    },
  ],
};

export const orbitalOrderPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Practice Demo',
    subtitle: 'Orbital Order',
    description:
      'A comprehensive post-mortem of my JS13k practice project that combined educational gameplay with complex physics simulations. This analysis covers the technical implementation of realistic orbital mechanics, the challenges of building an educational game that remains engaging, and the development of a procedural audio system that generates chemistry-themed soundscapes. Explores lessons learned about balancing scientific accuracy with intuitive gameplay, code optimization techniques, and the value of community feedback during development.',
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
      alt: 'Orbital Order gameplay showing electron orbitals and physics simulation',
      caption:
        'Orbital Order - Building authentic atomic structures through physics-based gameplay',
      content:
        'Orbital Order was my JS13K practice project—a physics-based puzzle game that teaches real atomic structure through interactive gameplay. Players guide electrons into their proper orbitals using electromagnetic fields, learning chemistry while building atoms from Hydrogen to Oxygen. As my very first completed game, this project pushed me into unfamiliar territory: physics simulation, educational game design, and procedural audio synthesis.',
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
      content: 'Making Physics Feel Fun',
    },
    {
      type: 'paragraph',
      content:
        'The game needed to simulate real electron behavior—blue s-electrons attracted to your cursor, orange p-electrons repelled by it—while still feeling responsive and fun to play. I had to Google what electron orbitals actually were before I could even start, but with some help from ChatGPT explaining quantum mechanics like I was five, I managed to build something that teaches real chemistry through gameplay. The electromagnetic storms in infinite mode were particularly satisfying to implement, creating chaotic fields that demonstrate how external forces affect atomic structure.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Audio That Actually Worked',
    },
    {
      type: 'paragraph',
      content:
        'All the audio gets generated procedurally through the Web Audio API—no sound files, just oscillators and mathematical formulas creating everything from electron collision sounds to the ambient background music. I got incredibly lucky here: I gave Claude a prompt about "ethereal cosmic chemistry sounds" and somehow got back beautiful chord progressions with bass drones and evolving melodies. The whole system became like a mini digital audio workstation in about 200 lines of code, generating infinite variations that never repeat exactly. When I tried to recreate this magic for my main JS13K entry, I learned that good procedural audio is much harder than I thought!',
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
      content: 'What Actually Worked',
    },
    {
      type: 'paragraph',
      content:
        "For my very first completed game, I'm pretty thrilled that it actually teaches real chemistry! Players learn electron configuration rules through gameplay rather than memorization, and the physics simulation accurately represents s-electrons vs p-electrons and how orbital energy levels work. The procedural audio exceeded my expectations, and several playtesters mentioned they genuinely learned chemistry concepts while playing. Plus, getting feedback from real players was incredibly fun—the game development community turned out to be wonderfully supportive.",
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
      type: 'heading',
      level: 2,
      content: 'Share Your Feedback',
    },
    {
      type: 'feedback-form',
      formDescription: 'Curious about your experience with the educational gameplay!',
    },
  ],
};

export const blogPosts = [js13kPostMortem, orbitalOrderPostMortem];
