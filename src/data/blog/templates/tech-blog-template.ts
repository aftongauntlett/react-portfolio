/**
 * Tech Blog Template
 *
 * Standard structure for technical articles and tutorials.
 * Use this for deep dives into specific technologies, techniques, or solutions.
 *
 * Suggested Sections:
 * 1. Introduction (problem statement)
 * 2. Background/Context
 * 3. Technical Implementation
 * 4. Code Examples
 * 5. Performance Considerations
 * 6. Lessons Learned
 * 7. Resources & References
 */

import type { BlogPost } from '../types';

export interface TechBlogMetadata {
  title: string;
  subtitle?: string;
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  readTime: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
}

/**
 * Helper to create a consistent tech blog structure
 * TODO: Implement when first tech blog is added
 */
export function createTechBlog(
  metadata: TechBlogMetadata,
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
      categories: ['Technical', 'Tutorial'],
      featured: metadata.featured || false,
    },
    sections: [
      { type: 'heading', level: 2, content: 'Introduction' },
      { type: 'paragraph', content: content.introduction },
      // TODO: Add more sections
    ],
  };
}
