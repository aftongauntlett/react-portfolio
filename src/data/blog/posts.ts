import type { BlogPost } from './types';

export const nyxFelisPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Official Submission',
    subtitle: 'Nyx Felis & Lampyris',
    description:
      'A post-mortem of my first JS13k entry, following the journey from an unfinished submission to a fully realized game. Built with vanilla JavaScript and procedural Web Audio, this piece explores creative limits, lessons learned, and how AI helped me experiment with tools I once found intimidating.',
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
      alt: 'Gameplay screenshot of Nyx Felis & Lampyris showing glowing fireflies and Nyx the cat under a starry sky',
      caption: 'Nyx Felis collecting fireflies beneath the night sky',
      content:
        'A small game about a curious night-cat and bioluminescent fireflies, built for the JS13k 2025 competition.',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-2025',
          text: 'View Source Code',
          type: 'github',
        },
        { url: 'https://nyx-felis.aftongauntlett.com', text: 'Play Game', type: 'demo' },
      ],
    },

    { type: 'heading', level: 2, content: 'About' },
    {
      type: 'paragraph',
      content:
        'My first JS13k entry ended up in the “Unfinished” category after a timezone mistake, but that didn’t feel like the ending. I spent the following weeks rebuilding the entire game, turning what was essentially a pretty tech demo into a playable, choice-driven experience. The theme, “Black Cat,” became Nyx Felis - a curious cat collecting fireflies to keep the night alive.',
    },
    {
      type: 'pull-quote',
      content: '“An animal’s eyes have the power to speak a great language.” — David Attenborough',
    },

    { type: 'heading', level: 2, content: 'Technical Overview' },
    {
      type: 'paragraph',
      content:
        'Canvas 2D was pushed much farther than I thought possible. Gradient layers and composite modes faked the kind of glow effects you’d normally need WebGL for, while hundreds of fireflies drifted around on their own simple motion logic. The procedural audio system generated ambient tones from basic math - something I didn’t even know was possible before building this.',
    },
    {
      type: 'list',
      items: [
        'Engine: Vanilla JavaScript + Canvas 2D (no frameworks or libraries)',
        'Audio: 100% procedural via Web Audio API',
        'Performance: ~60fps with hundreds of active particles',
        'Size: 13KB competition limit (final rebuild ~21KB)',
      ],
    },

    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'Once the visuals and audio were solid, I turned my attention to keeping performance consistent within the 13KB constraint. The limit forced different kinds of trade-offs than I’d make on a normal project - optimizing for byte size instead of readability, and finding ways to reuse logic without breaking clarity. It was a rare chance to think about efficiency at both the code and gameplay level at the same time.',
    },
    {
      type: 'list',
      items: [
        'Object pooling eliminated lag from garbage collection spikes.',
        'Rollup and Terser kept the code compact for jam limits.',
        'Web Audio timing synced naturally with the game loop.',
        'Canvas composite modes can convincingly mimic lighting shaders.',
      ],
    },

    { type: 'heading', level: 2, content: 'Design & UX Insights' },
    {
      type: 'paragraph',
      content:
        'The original build looked good but played like a screensaver. The post-jam version focused on readable feedback and resource tension: light equals life, and every firefly matters. Instead of endless collecting, I made every choice carry a small risk - an idea borrowed from real firefly behavior, where their glow is both communication and survival signal.',
    },
    {
      type: 'list',
      items: [
        'Bioluminescence (mana) as a finite resource adds natural tension.',
        'Evolution stages with increasing value create risk/reward.',
        'Curiosity timer introduces gentle time pressure.',
        'Shield timing adds rhythm and rewards precision.',
        'Task-based tutorials replace overwhelming instruction dumps.',
      ],
    },

    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'paragraph',
      content:
        'Finishing Nyx Felis reinforced how much small decisions shape the player experience. The constraints of JS13k made every feature earn its place, and that mindset carried into how I design larger projects now - focusing on clarity, feedback, and the moments that make interaction feel intentional.',
    },
    {
      type: 'list',
      items: [
        'Prototype the gameplay loop first, polish later.',
        'Scope discipline beats overbuilding every time.',
        'Commit often - audio bugs love bad timing.',
        'Clear player feedback is as important as good mechanics.',
      ],
    },

    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'Missing the submission deadline over a timezone mix-up was frustrating, but it also took the pressure off and let me rebuild the game the way I wanted. I learned how much difference clarity and constraint make - and how satisfying it feels when a project finally clicks into place. The final version captured the quiet, glowing mood I had in mind from the start, and finishing it on my own terms made the whole jam experience feel complete.',
    },
    {
      type: 'links',
      links: [
        {
          url: 'https://js13kgames.com/2025/games/nyx-felis-and-lampyris',
          text: 'View Original Submission',
          type: 'external',
        },
      ],
    },

    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'Looking back, I know all of this sounds impressive - but I didn’t come into it knowing physics, music theory, or procedural audio. AI gave me the room to explore those things safely, like a harness that let me climb without worrying about the fall. I used Copilot in a very technical way: prompting it to structure reusable components, create hooks, and respect accessibility rules like color contrast and keyboard focus. It didn’t always listen. Learning how to steer it - when to trust its instincts and when to push back - was its own kind of development skill.',
    },
    {
      type: 'paragraph',
      content:
        'ChatGPT helped with the less glamorous but equally painful stuff: build pipelines, Firebase, Vercel quirks, and version control headaches. Copilot wasn’t a magic fix - it was more like a strong teammate with bad short-term memory. It could suggest brilliant snippets and then forget the project context two lines later. Using it well meant managing its chaos. But that process made me more deliberate about architecture, naming, and accessibility than I’d been before.',
    },
    {
      type: 'paragraph',
      content:
        'AI didn’t write the game for me - it made me braver about trying things I used to find intimidating. It turned curiosity into progress. I got to ask “How did developers make music from math before?” and then watch those answers turn into sound and light. Every spark, hum, and glow in Nyx Felis came from that back-and-forth.',
    },

    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription: "Played it? I'd love to hear what you thought of Nyx Felis & Lampyris.",
    },
  ],
};

export const orbitalOrderPostMortem: BlogPost = {
  metadata: {
    title: 'JS13k 2025 Practice Demo',
    subtitle: 'Orbital Order',
    description:
      'A post-mortem of my JS13k practice project - a physics-based puzzle that teaches atomic structure through play. Built under 13KB, it explores scientific accuracy, procedural sound, and how curiosity turned a technical experiment into a real learning experience.',
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
      alt: 'Gameplay screenshot of Orbital Order showing electron orbitals and atomic structures forming',
      caption: 'Orbital Order - building atoms through interactive physics',
      content:
        'A JS13k practice project where players guide electrons into orbitals using magnetic fields, learning atomic structure through gameplay.',
      links: [
        {
          url: 'https://github.com/aftongauntlett/js13k-demo',
          text: 'View Source Code',
          type: 'github',
        },
        { url: 'https://js13k-demo.vercel.app', text: 'Play Game', type: 'demo' },
      ],
    },

    { type: 'heading', level: 2, content: 'About' },
    {
      type: 'paragraph',
      content:
        'Before entering the official jam, I built Orbital Order as a test to see if I could make something educational and fun under 13KB. The goal was simple: make electrons behave like electrons, but without needing a physics degree. It quickly became my favorite kind of project - part science experiment, part puzzle game.',
    },
    {
      type: 'pull-quote',
      content:
        '“The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff.” — Carl Sagan',
    },

    { type: 'heading', level: 2, content: 'Technical Overview' },
    {
      type: 'paragraph',
      content:
        'It uses real rules from electron configuration - the Aufbau principle and Pauli exclusion - but simplified enough to stay playable. I wanted accuracy without making it feel like homework. The visuals and audio are generated entirely in code, which saved space and gave everything an organic feel.',
    },
    {
      type: 'list',
      items: [
        'Engine: Vanilla JavaScript + Canvas 2D',
        'Size: 8.2KB zipped (47% compression)',
        'Audio: Procedural using Web Audio API',
        'Physics: Simplified attraction/repulsion forces',
      ],
    },

    { type: 'heading', level: 2, content: 'Engineering Insights' },
    {
      type: 'paragraph',
      content:
        'Most of the real work in Orbital Order came down to making the physics feel stable inside tight constraints. Balancing accuracy, performance, and clarity in one file forced a kind of discipline that carried through the rest of the jam. These were the patterns that kept everything predictable and smooth.',
    },
    {
      type: 'list',
      items: [
        'Simplified orbital physics made gameplay readable and reactive.',
        'Rollup + Terser compression cut file size nearly in half.',
        'Single-file architecture improved focus and iteration speed.',
        'Infinite mode added replayability through chaos events.',
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Design & UX Insights',
    },
    {
      type: 'paragraph',
      content:
        'Orbital Order started as a small experiment with lightning and particle physics after watching a Neil deGrasse Tyson video about electrical charge. That curiosity spiraled into learning how electrons actually move and interact, and the game slowly shifted from storms to orbitals. The design direction came naturally—I was already working with blue and orange energy effects, circular motion, and glow layers, so the science theme fit. The goal wasn’t realism, just something calm, bright, and satisfying to watch. The storm mechanic was added near the end to give players a bit of chaos to balance the calm.',
    },
    {
      type: 'list',
      items: [
        'Two-hit knockout added risk and improved feedback.',
        'Persistent overlays replaced interruptive modals based on player feedback.',
        'Contextual tutorials introduced mechanics organically as they appeared.',
      ],
    },

    { type: 'heading', level: 2, content: 'Key Takeaways' },
    {
      type: 'list',
      items: [
        'Educational games can be accurate and fun at once.',
        'Procedural audio can feel alive without assets.',
        'Tight limits inspire smarter design decisions.',
        'Small playtests are worth more than perfect code.',
      ],
    },

    { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
    {
      type: 'paragraph',
      content:
        'This was the perfect warm-up. It gave me confidence, patterns, and a few scars I could bring into my main entry. Every constraint forced focus, and that clarity carried over into everything I built after. I learned more about atoms, physics, and audio than I ever expected from 13KB of JavaScript.',
    },

    { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
    {
      type: 'paragraph',
      content:
        'AI played a real, practical role in this project. Copilot handled the small but constant decisions-refactoring loops, suggesting cleaner functions, and helping me maintain consistent structure as the file grew. It wasn’t hands-off work. I had to guide it carefully, remind it to use reusable logic, and make sure it respected accessibility and readability. The results depended entirely on the quality of my prompts and my willingness to edit what it produced.',
    },
    {
      type: 'paragraph',
      content:
        'ChatGPT filled in the gaps that documentation couldn’t. It explained physics concepts like the Aufbau principle in plain English, helped me debug strange particle behaviors, and clarified math I only half remembered. The goal was never to let AI “do the thinking,” but to use it as a fast feedback loop-something between a reference manual and a sounding board.',
    },
    {
      type: 'paragraph',
      content:
        'I’m aware this section makes the project sound deeply technical, but truthfully, I was learning most of it as I went. AI made that possible. It didn’t replace my work; it expanded the range of what I could try. That’s what makes it powerful-it compresses the time between curiosity and execution. In the end, the game exists because I could ask the right questions and see how far I could push the answers.',
    },

    { type: 'heading', level: 2, content: 'Feedback' },
    {
      type: 'feedback-form',
      formDescription: 'Played Orbital Order? Share what you learned or what confused you.',
    },
  ],
};

export const blogPosts = [nyxFelisPostMortem, orbitalOrderPostMortem];
