import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook to initialize and manage Lenis smooth scroll
 * Respects prefers-reduced-motion for accessibility compliance
 *
 * @returns Lenis instance for programmatic scroll control
 */
export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const reducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    // Guard against SSR - Lenis requires window/DOM
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const stopAndDestroy = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      setLenisInstance(null);
    };

    const initLenis = () => {
      if (reducedMotionRef.current) return;
      if (lenisRef.current) return;

      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

      const lenis = new Lenis({
        duration: 0.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: isTouchDevice ? 1 : 2,
        syncTouch: !isTouchDevice,
        infinite: false,
      });

      lenisRef.current = lenis;
      queueMicrotask(() => setLenisInstance(lenis));

      // Keep RAF running so programmatic scroll (SideNav/MobileNav) always works.
      const loop = (time: number) => {
        if (reducedMotionRef.current) {
          stopAndDestroy();
          return;
        }
        if (lenisRef.current !== lenis) {
          return;
        }

        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(loop);
      };

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const handleChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        stopAndDestroy();
      } else {
        initLenis();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    if (mediaQuery.matches) {
      stopAndDestroy();
    } else {
      initLenis();
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      stopAndDestroy();
    };
  }, []);

  return lenisInstance;
}
