/**
 * Post-Mortem Template
 *
 * Standard structure for game development post-mortems.
 * This template ensures consistency across all game dev retrospectives.
 *
 * Required Sections:
 * 1. Game Showcase (with links)
 * 2. About (inspiration, motivation)
 * 3. Technical Overview (tech stack, performance)
 * 4. Engineering Insights (implementation details)
 * 5. Design & UX Insights (player experience)
 * 6. Key Takeaways (lessons learned)
 * 7. Post-Mortem Reflections (what's next)
 * 8. AI as Creative Partner (tooling & workflow)
 * 9. Feedback Form (community engagement)
 */

import type { BlogPost } from '../types';

export interface PostMortemMetadata {
  title: string;
  subtitle: string;
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  readTime: string;
  tags: string[];
  categories: string[];
  featured: boolean;
}

export interface PostMortemGame {
  src: string;
  alt: string;
  caption: string;
  content: string;
  links: {
    url: string;
    text: string;
    type: 'github' | 'demo';
  }[];
}

/**
 * Helper to create a consistent post-mortem structure
 */
export function createPostMortem(
  metadata: PostMortemMetadata,
  game: PostMortemGame,
  sections: {
    about: string;
    quote?: string;
    technicalOverview: {
      items: string[];
      description: string;
    };
    engineeringInsights: {
      description: string;
      items: string[];
    };
    designInsights: {
      description: string;
      items: string[];
    };
    keyTakeaways: string;
    reflections: string;
    aiPartnership: {
      overview: string;
      example: string;
    };
  },
): BlogPost {
  return {
    metadata: {
      ...metadata,
      categories: ['Game Development', ...metadata.categories],
    },
    sections: [
      // Game Showcase
      {
        type: 'game-showcase',
        src: game.src,
        alt: game.alt,
        caption: game.caption,
        content: game.content,
        links: game.links,
      },

      // About
      { type: 'heading', level: 2, content: 'About' },
      { type: 'paragraph', content: sections.about },
      ...(sections.quote ? [{ type: 'pull-quote' as const, content: sections.quote }] : []),

      // Technical Overview
      { type: 'heading', level: 2, content: 'Technical Overview' },
      { type: 'list', items: sections.technicalOverview.items },
      { type: 'paragraph', content: sections.technicalOverview.description },

      // Engineering Insights
      { type: 'heading', level: 2, content: 'Engineering Insights' },
      { type: 'paragraph', content: sections.engineeringInsights.description },
      { type: 'list', items: sections.engineeringInsights.items },

      // Design & UX Insights
      { type: 'heading', level: 2, content: 'Design & UX Insights' },
      { type: 'paragraph', content: sections.designInsights.description },
      { type: 'list', items: sections.designInsights.items },

      // Key Takeaways
      { type: 'heading', level: 2, content: 'Key Takeaways' },
      { type: 'paragraph', content: sections.keyTakeaways },

      // Post-Mortem Reflections
      { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
      { type: 'paragraph', content: sections.reflections },

      // AI as Creative Partner
      { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
      { type: 'paragraph', content: sections.aiPartnership.overview },
      { type: 'paragraph', content: sections.aiPartnership.example },

      // Feedback
      { type: 'heading', level: 2, content: 'Feedback' },
      {
        type: 'feedback-form',
        formDescription: `Tried ${metadata.subtitle}? I'd love to hear your thoughts on the gameplay, clarity, and overall experience.`,
      },
    ],
  };
}
