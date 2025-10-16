/**
 * Post-Mortems Index
 *
 * Centralized export for all game development and project post-mortems.
 * Each post-mortem is stored in the post-mortems/ directory.
 *
 * Directory Structure:
 * - post-mortems/  : All post-mortem content files
 * - templates/     : Post-mortem template for consistent structure
 */

import { nyxFelisPostMortem } from './post-mortems/nyx-felis';
import { orbitalOrderPostMortem } from './post-mortems/orbital-order';

/**
 * All post-mortems in reverse chronological order (newest first)
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
