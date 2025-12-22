/**
 * Development diagnostic hook for performance monitoring
 * Only active in DEV mode when enabled via localStorage flag 'perfMonitor=1'
 * Displays FPS, long tasks, and scroll events in a debug overlay
 */

import { useEffect, useMemo, useState } from 'react';

type PerfSnapshot = {
  fps: number;
  longTaskCount: number;
  scrollEventsPerSecond: number;
};

const PERF_FLAG_KEY = 'perfMonitor';

function isEnabled() {
  if (!import.meta.env.DEV) return false;
  try {
    return globalThis.localStorage?.getItem(PERF_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

export function usePerformanceMonitor() {
  const enabled = useMemo(() => isEnabled(), []);
  const [snapshot, setSnapshot] = useState<PerfSnapshot>({
    fps: 60,
    longTaskCount: 0,
    scrollEventsPerSecond: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;
    let frameCount = 0;
    let lastSecondMark = performance.now();

    let longTaskCount = 0;

    let scrollEvents = 0;
    const handleScroll = () => {
      scrollEvents += 1;
    };

    globalThis.addEventListener('scroll', handleScroll, { passive: true });

    const observer: PerformanceObserver | null =
      'PerformanceObserver' in globalThis
        ? new PerformanceObserver((list) => {
            // Long tasks are supported in Chromium-based browsers.
            longTaskCount += list.getEntries().length;
          })
        : null;

    try {
      observer?.observe({ entryTypes: ['longtask'] as const });
    } catch {
      // Ignore if unsupported.
    }

    const loop = (now: number) => {
      frameCount += 1;

      const delta = now - lastSecondMark;
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        const scrollEventsPerSecond = Math.round((scrollEvents * 1000) / delta);

        setSnapshot({
          fps,
          longTaskCount,
          scrollEventsPerSecond,
        });

        if (fps < 50) {
          console.warn(`[perf] FPS dropped: ${fps}`);
        }

        frameCount = 0;
        scrollEvents = 0;
        lastSecondMark = now;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return { enabled, ...snapshot };
}
