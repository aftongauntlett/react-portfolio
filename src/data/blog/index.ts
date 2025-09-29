import { js13kPostMortem, orbitalOrderPostMortem } from './posts';
import type { BlogPostRegistry } from './types';

export const blogRegistry: BlogPostRegistry = {
  [js13kPostMortem.metadata.slug]: js13kPostMortem,
  [orbitalOrderPostMortem.metadata.slug]: orbitalOrderPostMortem,
};

export function getBlogPost(slug: string) {
  return blogRegistry[slug] || null;
}

export function getAllBlogPosts() {
  return Object.values(blogRegistry);
}
