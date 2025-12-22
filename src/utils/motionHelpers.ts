import { getMotionDuration } from '@/hooks/usePrefersReducedMotion';

/**
 * Helper to create motion-safe variants
 * Separated from constants to avoid hook dependencies in static files
 */
export const createMotionVariants = (prefersReducedMotion: boolean) => ({
  fadeInUp: {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getMotionDuration(0.5, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
  },
  projectCard: {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getMotionDuration(0.5, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
  },
});