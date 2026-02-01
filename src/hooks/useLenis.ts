import { useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';

/**
 * Custom hook to initialize and manage Lenis smooth scroll
 * Respects prefers-reduced-motion for accessibility compliance
 *
 * @returns Lenis instance for programmatic scroll control
 */
export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotionRef = useRef<boolean>(false);
  const idleCallbackIdRef = useRef<number | null>(null);
  const initTimeoutIdRef = useRef<number | null>(null);
  const initInFlightRef = useRef<boolean>(false);

  useEffect(() => {
    // Guard against SSR - Lenis requires window/DOM
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const stopAndDestroy = () => {
      if (idleCallbackIdRef.current !== null) {
        try {
          // requestIdleCallback is not in TS DOM libs by default.
          (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(
            idleCallbackIdRef.current,
          );
        } catch {
          // ignore
        }
        idleCallbackIdRef.current = null;
      }

      if (initTimeoutIdRef.current !== null) {
        window.clearTimeout(initTimeoutIdRef.current);
        initTimeoutIdRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      initInFlightRef.current = false;

      setLenisInstance(null);
    };

    const initLenis = async () => {
      if (reducedMotionRef.current) return;
      if (lenisRef.current) return;
      if (initInFlightRef.current) return;
      initInFlightRef.current = true;

      try {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const { default: LenisCtor } = await import('lenis');

        if (reducedMotionRef.current) return;
        if (lenisRef.current) return;

        const lenis = new LenisCtor({
          duration: 0.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: isTouchDevice ? 1 : 2,
          syncTouch: !isTouchDevice,
          infinite: false,
          autoRaf: true,
        });

        lenisRef.current = lenis;
        queueMicrotask(() => setLenisInstance(lenis));
      } finally {
        initInFlightRef.current = false;
      }
    };

    const scheduleIdleInit = () => {
      if (reducedMotionRef.current) return;
      if (lenisRef.current) return;
      if (idleCallbackIdRef.current !== null) return;
      if (initTimeoutIdRef.current !== null) return;

      const withIdleCallback = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
        }
      ).requestIdleCallback;

      if (typeof withIdleCallback === 'function') {
        idleCallbackIdRef.current = withIdleCallback(
          () => {
            idleCallbackIdRef.current = null;
            void initLenis();
          },
          { timeout: 2000 },
        );
      } else {
        initTimeoutIdRef.current = window.setTimeout(() => {
          initTimeoutIdRef.current = null;
          void initLenis();
        }, 1000);
      }
    };

    const setupOnDemandInit = () => {
      if (reducedMotionRef.current) return;
      if (lenisRef.current) return;

      const trigger = () => {
        cleanup();
        void initLenis();
      };

      const opts = { passive: true } as const;

      const cleanup = () => {
        window.removeEventListener('wheel', trigger);
        window.removeEventListener('touchstart', trigger);
        window.removeEventListener('pointerdown', trigger);
        window.removeEventListener('keydown', trigger);
      };

      window.addEventListener('wheel', trigger, opts);
      window.addEventListener('touchstart', trigger, opts);
      window.addEventListener('pointerdown', trigger, opts);
      window.addEventListener('keydown', trigger);

      return cleanup;
    };

    const handleChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        stopAndDestroy();
      } else {
        setupCleanupRef.current?.();
        setupCleanupRef.current = setupOnDemandInit() ?? null;
        setupLoadInit();
      }
    };

    const setupLoadInit = () => {
      if (document.readyState === 'complete') {
        scheduleIdleInit();
        return;
      }

      window.addEventListener(
        'load',
        () => {
          scheduleIdleInit();
        },
        { once: true },
      );
    };

    const setupCleanupRef = { current: null as null | (() => void) };

    mediaQuery.addEventListener('change', handleChange);

    if (mediaQuery.matches) {
      stopAndDestroy();
    } else {
      setupCleanupRef.current = setupOnDemandInit() ?? null;
      setupLoadInit();
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      setupCleanupRef.current?.();
      stopAndDestroy();
    };
  }, []);

  return lenisInstance;
}
