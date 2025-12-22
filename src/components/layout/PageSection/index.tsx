import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import PaintSplashText from '@/components/shared/PaintSplashEffect';
import { FOCUS_STYLES } from '@/constants/styles';
import { useActiveSection } from '@/hooks/useActiveSection';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Props = {
  id: string;
  title?: string;
  hideTitle?: boolean;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, hideTitle = false, children, className }: Props) {
  const headingId = `${id}-heading`;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const activeSection = useActiveSection();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isActive = activeSection === id;
  const isActiveRef = useRef(isActive);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isUnderlineFilled, setIsUnderlineFilled] = useState(false);

  const debugStateRef = useRef<{ lastBucket: number; wasActive: boolean }>({
    lastBucket: -1,
    wasActive: false,
  });

  const shouldDebugUnderline =
    import.meta.env.DEV &&
    // Opt-in toggle: set `window.__DEBUG_SECTION_UNDERLINE__ = true` in devtools.
    // We keep this Experience-only by default to reduce noise.
    Boolean((window as unknown as { __DEBUG_SECTION_UNDERLINE__?: boolean }).__DEBUG_SECTION_UNDERLINE__) &&
    id === 'experience';

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    if (!title) return;
    const el = sectionEl;
    if (!el) return;

    // Set fallback immediately if IntersectionObserver is not supported
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    if (!hasIntersectionObserver) {
      // Use setTimeout to avoid synchronous setState in effect
      const timerId = setTimeout(() => setIsInView(true), 0);
      return () => clearTimeout(timerId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextIsInView = entry?.isIntersecting ?? false;
        setIsInView(nextIsInView);
        if (!nextIsInView) {
          setIsUnderlineFilled(false);
          setScrollProgress(0);
        }
      },
      {
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [title, sectionEl]);

  const computeProgress = useMemo(() => {
    return () => {
      const el = sectionRef.current;
      if (!el) return 0;
      if (prefersReducedMotion) return 1;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      // Fill the underline over a consistent scroll distance (not section length)
      // so long sections don't feel "stuck".
      const fillDistance = Math.max(240, Math.min(480, viewportH * 0.5));
      const distanceIntoView = viewportH - rect.top;
      return Math.max(0, Math.min(1, distanceIntoView / fillDistance));
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!title) return;

    let rafId: number | null = null;

    const commit = () => {
      rafId = null;

      if (isUnderlineFilled) return;

      const nextProgress = computeProgress();

      if (nextProgress >= 1) {
        setScrollProgress(1);
        setIsUnderlineFilled(true);
      } else {
        setScrollProgress(nextProgress);
      }

      if (shouldDebugUnderline) {
        const bucketCount = 4;
        const bucket = Math.min(bucketCount, Math.max(0, Math.floor(nextProgress * bucketCount)));

        const prev = debugStateRef.current;

        const currentIsActive = isActiveRef.current;

        if (prev.wasActive !== currentIsActive) {
          prev.wasActive = currentIsActive;
          console.debug(`[underline] ${id} active=${currentIsActive}`);
        }

        if (bucket !== prev.lastBucket) {
          prev.lastBucket = bucket;
          const el = sectionRef.current;
          const rect = el?.getBoundingClientRect();
          console.debug(
            `[underline] ${id} progress=${nextProgress.toFixed(2)} bucket=${bucket}/${bucketCount} top=${rect?.top?.toFixed?.(1) ?? 'n/a'}`,
          );
        }
      }
    };

    const schedule = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(commit);
    };

    schedule();

    if (isInView && !prefersReducedMotion && !isUnderlineFilled) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [title, isInView, prefersReducedMotion, computeProgress, shouldDebugUnderline, id, isUnderlineFilled]);

  return (
    <section
      id={id}
      data-section={id}
      ref={(node) => {
        sectionRef.current = node;
        setSectionEl(node);
      }}
      className={clsx('section-content scroll-mt-20', className)}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="w-full space-y-5 sm:space-y-7">
        {title && (
          <PaintSplashText
            tag="h2"
            id={headingId}
            className={clsx(FOCUS_STYLES.COMPACT, 'px-0', hideTitle && 'sr-only')}
            isActive={isInView}
            scrollProgress={scrollProgress}
            prefersReducedMotion={prefersReducedMotion}
          >
            {title}
          </PaintSplashText>
        )}
        {children}
      </div>
    </section>
  );
}
