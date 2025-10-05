/**
 * Typography and Focus Style Constants
 * Centralized classes for consistent styling across the application
 */

// Typography classes (defined in index.css)
export const TYPOGRAPHY = {
  // Headings
  TITLE: 'title',
  HEADING_1: 'heading-1',
  HEADING_2: 'heading-2',
  HEADING_3: 'heading-3',
  SUBTITLE: 'subtitle',

  // Body text
  TEXT_BODY: 'text-body',
  TEXT_LARGE: 'text-large',
  TEXT_SMALL: 'text-small',
  TEXT_XS: 'text-xs',
  TEXT_DESCRIPTION: 'text-description',

  // Text modifiers
  TEXT_MUTED: 'text-muted',
  TEXT_PRIMARY: 'text-primary',
  TEXT_SECONDARY: 'text-secondary',
  TEXT_RELAXED: 'text-relaxed',
} as const;

// Consistent focus styles
export const FOCUS_STYLES = {
  // Primary focus - for interactive elements
  PRIMARY:
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 focus-visible:bg-[var(--color-primary)]/5 rounded px-2 py-1',

  // Compact focus - for smaller elements
  COMPACT:
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1 focus-visible:bg-[var(--color-primary)]/10 rounded px-1',

  // Button focus - for button elements
  BUTTON:
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',

  // Card focus - for card-like containers
  CARD: 'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 focus-visible:shadow-lg focus-visible:shadow-[var(--color-primary)]/20',
} as const;

// Common text combinations
export const TEXT_COMBINATIONS = {
  // Body text with relaxed line height
  BODY_RELAXED: `${TYPOGRAPHY.TEXT_BODY} ${TYPOGRAPHY.TEXT_RELAXED}`,

  // Muted body text
  BODY_MUTED: `${TYPOGRAPHY.TEXT_BODY} ${TYPOGRAPHY.TEXT_MUTED}`,

  // Description text (already includes muted color)
  DESCRIPTION: TYPOGRAPHY.TEXT_DESCRIPTION,

  // Small muted text for meta info
  SMALL_MUTED: `${TYPOGRAPHY.TEXT_SMALL} ${TYPOGRAPHY.TEXT_MUTED}`,

  // Primary colored small text
  SMALL_PRIMARY: `${TYPOGRAPHY.TEXT_SMALL} ${TYPOGRAPHY.TEXT_PRIMARY}`,
} as const;
