import type Lenis from 'lenis';

let programmaticRafId: number | null = null;
let programmaticStopTimeout: number | null = null;

function runLenisForProgrammaticScroll(lenis: Lenis, durationMs = 900) {
  if (programmaticRafId !== null) {
    cancelAnimationFrame(programmaticRafId);
    programmaticRafId = null;
  }
  if (programmaticStopTimeout !== null) {
    window.clearTimeout(programmaticStopTimeout);
    programmaticStopTimeout = null;
  }

  const startTime = performance.now();

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loop = (time: number) => {
    if (prefersReducedMotion()) {
      if (programmaticRafId !== null) {
        cancelAnimationFrame(programmaticRafId);
        programmaticRafId = null;
      }
      return;
    }

    lenis.raf(time);
    if (time - startTime < durationMs) {
      programmaticRafId = requestAnimationFrame(loop);
    } else {
      programmaticRafId = null;
    }
  };

  // Kick immediately, then keep ticking briefly so programmatic scroll can complete.
  lenis.raf(startTime);
  programmaticRafId = requestAnimationFrame(loop);

  programmaticStopTimeout = window.setTimeout(() => {
    if (programmaticRafId !== null) {
      cancelAnimationFrame(programmaticRafId);
      programmaticRafId = null;
    }
    programmaticStopTimeout = null;
  }, durationMs + 80);
}

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
      runLenisForProgrammaticScroll(lenis);
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
        runLenisForProgrammaticScroll(lenis);
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
