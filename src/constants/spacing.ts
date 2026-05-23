/**
 * Shared spacing conventions for page-level rhythm.
 *
 * Section separation is primarily controlled by per-section edge spacing
 * (not parent stack spacing).
 */
export const SECTION_SPACING = {
  // Shared top spacing for all non-critical sections in Home.
  TOP_PADDING: 'pt-10 sm:pt-12',

  // Shared bottom spacing applied to all sections to keep divider lines
  // from touching content.
  BOTTOM_PADDING: 'pb-10 sm:pb-12',

  // Shared title-to-content rhythm inside PageSection.
  CONTENT_STACK: 'space-y-6 sm:space-y-7',
} as const;

export const COMPONENT_SPACING = {
  // Shared card/container padding for section-level cards.
  CARD_PADDING: 'p-5',

  // Reusable vertical stack tiers for list/group rhythm.
  STACK_STANDARD: 'space-y-6',
  STACK_RELAXED: 'space-y-8 sm:space-y-10',

  // Shared top offset for expandable/reveal panels.
  EXPANDABLE_PANEL_TOP: 'mt-4',
} as const;
