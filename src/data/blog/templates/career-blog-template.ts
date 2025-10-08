/**
 * Career Blog Template
 *
 * Standard structure for career reflections, advice, and professional growth.
 * Use this for posts about job searches, interviews, career transitions, etc.
 *
 * Suggested Sections:
 * 1. Introduction (context)
 * 2. The Situation/Challenge
 * 3. The Journey
 * 4. Key Insights
 * 5. Practical Advice
 * 6. Looking Forward
 */

import type { BlogPost } from '../types';

export interface CareerBlogMetadata {
  title: string;
  subtitle?: string;
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

/**
 * Helper to create a consistent career blog structure
 * TODO: Implement when first career blog is added
 */
export function createCareerBlog(
  metadata: CareerBlogMetadata,
  content: {
    introduction: string;
    // Add more structure as needed
  },
): BlogPost {
  return {
    metadata: {
      title: metadata.title,
      subtitle: metadata.subtitle,
      description: metadata.description,
      publishDate: metadata.publishDate,
      slug: metadata.slug,
      author: metadata.author,
      readTime: metadata.readTime,
      tags: metadata.tags,
      categories: ['Career', 'Personal Growth'],
      featured: metadata.featured || false,
    },
    sections: [
      { type: 'heading', level: 2, content: 'Introduction' },
      { type: 'paragraph', content: content.introduction },
      // TODO: Add more sections
    ],
  };
}
