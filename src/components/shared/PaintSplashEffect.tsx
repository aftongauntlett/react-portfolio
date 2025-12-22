import type { ElementType, JSX } from 'react';
import { m } from 'framer-motion';

type AllowedTags = keyof JSX.IntrinsicElements;

interface PaintSplashTextProps {
  children: string;
  tag?: AllowedTags;
  className?: string;
  id?: string;
  isActive?: boolean;
  scrollProgress?: number;
  prefersReducedMotion?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * PaintSplashText renders a styled heading/label.
 */
export default function PaintSplashText({
  children,
  tag = 'span',
  className = '',
  isActive = false,
  scrollProgress = 0,
  prefersReducedMotion = false,
  ...additionalProps
}: PaintSplashTextProps) {
  const Tag = tag as ElementType;

  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  const activeProgress = isActive ? (prefersReducedMotion ? 1 : clampedProgress) : 0;

  const underlineTransition = {
    duration: prefersReducedMotion ? 0 : 0.25,
    ease: 'easeOut',
  } as const;

  return (
    <Tag
      className={`font-heading text-4xl font-semibold leading-[1.3] ${className}`}
      tabIndex={-1}
      {...additionalProps}
    >
      <span className="relative inline-block">
        <span className="relative inline-block">{children}</span>

        {/* Active underline */}
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full rounded bg-[var(--color-primary)]"
          style={{ transformOrigin: 'left' }}
          animate={{ scaleX: activeProgress }}
          transition={underlineTransition}
        />
      </span>
    </Tag>
  );
}
