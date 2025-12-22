/**
 * Shared animation variants and constants for Framer Motion
 * Reduces code duplication across components
 */

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-80px 0px -80px 0px',
  amount: 0.2,
} as const;

// Base animation variants (without reduced motion)
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

// Timeline-specific animations
export const timelineItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

// Project card animations
export const projectVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

// Common easing curves
export const EASING = {
  easeOut: [0.25, 1, 0.5, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', stiffness: 100, damping: 20 },
} as const;

// Animation durations (in seconds)
export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

export const ANIMATION_PRESET_FAST = {
  duration: DURATION.fast,
  ease: EASING.easeOut,
  viewport: VIEWPORT_CONFIG,
} as const;

export const ANIMATION_PRESET_NORMAL = {
  duration: DURATION.normal,
  ease: EASING.easeOut,
  viewport: VIEWPORT_CONFIG,
} as const;

export const ANIMATION_PRESET_SLOW = {
  duration: DURATION.slow,
  ease: EASING.easeInOut,
  viewport: VIEWPORT_CONFIG,
} as const;
