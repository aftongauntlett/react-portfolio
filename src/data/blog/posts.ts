/**
 * Blog Posts Index
 *
 * Centralized export for all blog posts organized by category.
 * Each category has its own directory with individual post files.
 *
 * Directory Structure:
 * - post-mortems/  : Game development post-mortems
 * - tech/          : Technical articles and tutorials (future)
 * - career/        : Career reflections and advice (future)
 * - templates/     : Reusable post structures and patterns
 */

import { nyxFelisPostMortem } from './post-mortems/nyx-felis';
import { orbitalOrderPostMortem } from './post-mortems/orbital-order';

/**
 * All blog posts in reverse chronological order (newest first)
 */
export const blogPosts = [
  nyxFelisPostMortem, // 2025-09-17
  orbitalOrderPostMortem, // 2025-08-01
];

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.metadata.categories?.includes(category));
}

/**
 * Get featured posts
 */
export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.metadata.featured);
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.metadata.slug === slug);
}

// Re-export for backward compatibility
export { nyxFelisPostMortem, orbitalOrderPostMortem };
