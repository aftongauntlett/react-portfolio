import { useEffect, useState } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * Returns true if the user has set prefers-reduced-motion: reduce
 * Can be used to disable or reduce animations for accessibility
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get motion-safe animation variants
 * Returns disabled variants if user prefers reduced motion
 */
export function getMotionVariants<T extends Record<string, unknown>>(
  variants: T,
  reducedMotion: boolean,
): T {
  if (reducedMotion) {
    // Return empty/static variants
    return Object.keys(variants).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {},
      }),
      {} as T,
    );
  }
  return variants;
}

/**
 * Get motion-safe duration
 * Returns 0 or very short duration if user prefers reduced motion
 */
export function getMotionDuration(duration: number, reducedMotion: boolean): number {
  return reducedMotion ? 0.01 : duration;
}
