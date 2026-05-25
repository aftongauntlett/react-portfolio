import type Lenis from 'lenis';

/**
 * Smooth scroll to a specific position or element
 * Falls back to native scroll if Lenis is not available or reduced motion is preferred
 *
 * @param options - Scroll options
 * @param lenis - Optional Lenis instance for smooth scrolling
 */
export function smoothScrollTo(
  options: { target: string | number; offset?: number },
  lenis?: Lenis | null,
) {
  const { target, offset = 0 } = options;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof target === 'number') {
    // Scroll to specific position
    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(target, { offset: -offset });
    } else {
      window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  } else {
    // Scroll to element by selector or ID
    const selector = target.startsWith('#') || target.startsWith('.') ? target : `#${target}`;
    const element = document.querySelector(selector);

    if (element) {
      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(element as HTMLElement, { offset: -offset });
      } else {
        const elementPosition = (element as HTMLElement).offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  }
}

/**
 * Scroll to top of page
 *
 * @param lenis - Optional Lenis instance for smooth scrolling
 */
export function scrollToTop(lenis?: Lenis | null) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (lenis && !prefersReducedMotion) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}
