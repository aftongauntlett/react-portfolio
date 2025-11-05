/**
 * Post-Mortem Content Helpers
 *
 * Utilities for formatting and validating post-mortem content structure.
 * Ensures consistent formatting and required sections across all post-mortems.
 */

import type { BlogPostSection } from '@/data/blog/types';

/**
 * Slugify heading text with duplicate handling and non-Latin character support.
 * Uses a Map to track seen slugs and appends -2, -3, etc. for duplicates.
 * Falls back to a simple hash for non-Latin characters.
 */
export function slugifyHeading(text: string, seen: Map<string, number>): string {
  // Basic slugification
  let slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-Latin chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

  // If slug is empty (e.g., non-Latin chars only), create a hash-based slug
  if (!slug) {
    const hash = Math.abs(
      text.split('').reduce((acc, char) => {
        return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
      }, 0),
    );
    slug = `heading-${hash}`;
  }

  // Handle duplicates
  const count = seen.get(slug);
  if (count !== undefined) {
    const newCount = count + 1;
    seen.set(slug, newCount);
    slug = `${slug}-${newCount}`;
  } else {
    seen.set(slug, 1);
  }

  return slug;
}

/**
 * Automatically inserts separators before level 2 headings.
 * Skips first heading and "Feedback" section.
 */
export function addSeparatorsToSections(sections: BlogPostSection[]): BlogPostSection[] {
  const result: BlogPostSection[] = [];
  let firstHeadingFound = false;

  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const previous = sections[i - 1];

    if (
      current.type === 'heading' &&
      current.level === 2 &&
      current.content !== 'Feedback' &&
      firstHeadingFound &&
      previous?.type !== 'separator'
    ) {
      result.push({ type: 'separator' });
    }

    result.push(current);

    if (current.type === 'heading' && current.level === 2) {
      firstHeadingFound = true;
    }
  }

  return result;
}

/**
 * Standard post-mortem structure for validation and documentation.
 */
export const POST_MORTEM_STRUCTURE = [
  'About',
  'Technical Overview',
  'Engineering Insights',
  'Design & UX Insights',
  'Key Takeaways',
  'Post-Mortem Reflections',
  'AI as a Creative Partner',
  'Feedback',
] as const;

type PostMortemSection = (typeof POST_MORTEM_STRUCTURE)[number];

export function validatePostMortemStructure(sections: BlogPostSection[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const headings = sections
    .filter((s) => s.type === 'heading' && s.level === 2)
    .map((s) => (s.type === 'heading' ? s.content : ''));

  POST_MORTEM_STRUCTURE.forEach((required) => {
    if (!headings.includes(required)) {
      errors.push(`Missing required section: "${required}"`);
    }
  });

  const filteredHeadings = headings.filter((h): h is PostMortemSection =>
    POST_MORTEM_STRUCTURE.includes(h as PostMortemSection),
  );
  filteredHeadings.forEach((heading, index) => {
    const expectedIndex = POST_MORTEM_STRUCTURE.indexOf(heading);
    if (expectedIndex !== -1 && expectedIndex !== index) {
      errors.push(
        `Section "${heading}" is out of order. Expected position ${expectedIndex + 1}, found at position ${index + 1}`,
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
