// Shared style constants to reduce repetition across components

// Animation & Transition Classes
export const TRANSITION_COLORS = 'transition-colors duration-300';
export const TRANSITION_ALL = 'transition-all duration-300';
export const TRANSITION_FAST = 'transition-colors duration-200';

// Text Style Classes
export const TITLE_CLASSES = 'subtitle transition-colors duration-300';
export const TEXT_SM_CLASSES = 'text-sm transition-colors duration-300';
export const TEXT_SM_MEDIUM_CLASSES = 'text-sm font-medium transition-colors duration-300';

// Common Color Patterns
export const TEXT_PRIMARY_HOVER =
  'text-[var(--color-text)] group-hover:text-[var(--color-primary)]';
export const TEXT_MUTED_HOVER =
  'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]';

// Card & Container Classes
export const CARD_BASE = 'group p-3 rounded-lg cursor-pointer';
export const CARD_HOVER_BG = 'hover:bg-[var(--color-bg-secondary)]';

// Pre-computed Card Classes for Performance
export const CARD_BASE_CLASSES =
  'block p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-background)] hover:border-[var(--color-primary)]/30 transition-all duration-300 group';
export const TITLE_HOVER_CLASSES =
  'subtitle transition-colors duration-300 text-[var(--color-text)] group-hover:text-[var(--color-primary)]';
export const DATE_CLASSES =
  'text-sm font-medium transition-colors duration-300 text-[var(--color-muted)] group-hover:text-[var(--color-secondary)] ml-2 shrink-0';

// Hover Effect Classes
export const HOVER_OPACITY = 'opacity-50';
export const HOVER_TRANSLATE = 'transform translate-x-1';

// Hover-only dimming (only applies on devices with hover capability)
export const DIMMED_ON_HOVER_DEVICES = 'hover:opacity-50 [@media(hover:none)]:!opacity-100';
