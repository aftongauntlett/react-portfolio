import { nyxFelisPostMortem, orbitalOrderPostMortem } from './posts';
import type { BlogPostRegistry } from './types';

export const blogRegistry: BlogPostRegistry = {
  [nyxFelisPostMortem.metadata.slug]: nyxFelisPostMortem,
  [orbitalOrderPostMortem.metadata.slug]: orbitalOrderPostMortem,
};

export function getBlogPost(slug: string) {
  return blogRegistry[slug] || null;
}

export function getAllBlogPosts() {
  return Object.values(blogRegistry);
}
