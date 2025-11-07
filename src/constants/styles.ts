// Shared style constants to reduce repetition across components
import { TYPOGRAPHY, FOCUS_STYLES, TEXT_COMBINATIONS } from './typography';

// Animation & Transition Classes
export const TRANSITION_COLORS = 'transition-colors duration-300';
export const TRANSITION_FAST = 'transition-colors duration-200';
export const TRANSITION_OPACITY = 'transition-opacity duration-300';

// Common Color Patterns
export const TEXT_PRIMARY_HOVER =
  'text-[var(--color-text)] group-hover:text-[var(--color-primary)]';
export const TEXT_MUTED_HOVER =
  'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]';

// Card & Container Base Classes
export const CARD_BASE_CLASSES =
  'block p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-opacity duration-300 group';

// Typography Classes (using consistent system)
export const TITLE_HOVER_CLASSES = `${TYPOGRAPHY.SUBTITLE} transition-colors duration-300 text-[var(--color-text)] group-hover:text-[var(--color-primary)]`;
export const DATE_CLASSES = `${TYPOGRAPHY.TEXT_SMALL} transition-colors duration-300 text-[var(--color-muted)] group-hover:text-[var(--color-secondary)] ml-2 shrink-0`;
export const TEXT_SM_CLASSES = `${TYPOGRAPHY.TEXT_SMALL} transition-colors duration-300`;

// Re-export typography constants for easy access
export { TYPOGRAPHY, FOCUS_STYLES, TEXT_COMBINATIONS };
