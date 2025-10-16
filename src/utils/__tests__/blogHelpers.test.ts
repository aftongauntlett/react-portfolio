import { describe, it, expect } from 'vitest';
import {
  addSeparatorsToSections,
  validatePostMortemStructure,
  POST_MORTEM_STRUCTURE,
} from '../blogHelpers';
import type { BlogPostSection } from '@/data/blog/types';

describe('addSeparatorsToSections', () => {
  it('adds separator before level 2 headings (except first)', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'First Heading' },
      { type: 'paragraph', content: 'Some content' },
      { type: 'heading', level: 2, content: 'Second Heading' },
    ];

    const result = addSeparatorsToSections(sections);

    expect(result[2]).toEqual({ type: 'separator' });
    expect(result.length).toBe(4);
  });

  it('does not add separator before first heading', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'First Heading' },
      { type: 'paragraph', content: 'Content' },
    ];

    const result = addSeparatorsToSections(sections);

    expect(result[0].type).toBe('heading');
    expect(result.length).toBe(2);
  });

  it('skips separator for Feedback section', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'First Heading' },
      { type: 'heading', level: 2, content: 'Feedback' },
    ];

    const result = addSeparatorsToSections(sections);

    expect(result.find((s) => s.type === 'separator')).toBeUndefined();
  });

  it('does not add duplicate separators', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'First' },
      { type: 'separator' },
      { type: 'heading', level: 2, content: 'Second' },
    ];

    const result = addSeparatorsToSections(sections);

    const separatorCount = result.filter((s) => s.type === 'separator').length;
    expect(separatorCount).toBe(1);
  });
});

describe('validatePostMortemStructure', () => {
  it('validates correct post-mortem structure', () => {
    const sections: BlogPostSection[] = POST_MORTEM_STRUCTURE.map((title) => ({
      type: 'heading' as const,
      level: 2,
      content: title,
    }));

    const result = validatePostMortemStructure(sections);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects missing required sections', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'About' },
      { type: 'heading', level: 2, content: 'Technical Overview' },
      // Missing other required sections
    ];

    const result = validatePostMortemStructure(sections);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('Missing required section');
  });

  it('detects out-of-order sections', () => {
    const sections: BlogPostSection[] = [
      { type: 'heading', level: 2, content: 'Technical Overview' }, // Should be second
      { type: 'heading', level: 2, content: 'About' }, // Should be first
      { type: 'heading', level: 2, content: 'Engineering Insights' },
      { type: 'heading', level: 2, content: 'Design & UX Insights' },
      { type: 'heading', level: 2, content: 'Key Takeaways' },
      { type: 'heading', level: 2, content: 'Post-Mortem Reflections' },
      { type: 'heading', level: 2, content: 'AI as a Creative Partner' },
      { type: 'heading', level: 2, content: 'Feedback' },
    ];

    const result = validatePostMortemStructure(sections);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('out of order'))).toBe(true);
  });

  it('ignores non-level-2 headings', () => {
    const sections: BlogPostSection[] = [
      ...POST_MORTEM_STRUCTURE.map((title) => ({
        type: 'heading' as const,
        level: 2 as const,
        content: title,
      })),
      { type: 'heading', level: 3 as const, content: 'Subsection' },
    ];

    const result = validatePostMortemStructure(sections);

    expect(result.valid).toBe(true);
  });
});
