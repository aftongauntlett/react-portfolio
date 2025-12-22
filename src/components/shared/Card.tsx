import clsx from 'clsx';
import type { ReactNode, KeyboardEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWillChange } from '@/hooks/useWillChange';
import {
  CARD_BASE_CLASSES,
  TITLE_HOVER_CLASSES,
  DATE_CLASSES,
  TEXT_SM_CLASSES,
} from '@/constants/styles';
import { TYPOGRAPHY } from '@/constants/typography';
import { Text } from '@/components/shared/Text';

interface CardProps {
  title: string | ReactNode;
  subtitle: string | ReactNode;
  date: string;
  badge?: string;
  description?: string;
  link?: string;
  children?: ReactNode;
  className?: string;
  isDimmed?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  subtitleColor?: 'muted' | 'primary';
  disableMotion?: boolean;
}

export default function Card({
  title,
  subtitle,
  date,
  badge,
  description,
  link,
  children,
  className,
  isDimmed = false,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  subtitleColor = 'muted',
  disableMotion = false,
}: CardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInteractive = !!(link || className?.includes('cursor-pointer'));
  const [isHovering, setIsHovering] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const ref = useRef<HTMLElement | null>(null);
  const willChangeStyle = useWillChange(['transform'], isHovering);

  const setCardRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  // Handle keyboard interaction for clickable cards
  const handleKeyDown = (e: KeyboardEvent) => {
    if (link && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextInView = Boolean(entry?.isIntersecting);
        setIsInViewport(nextInView);
        if (!nextInView) setIsHovering(false);
      },
      { root: null, rootMargin: '100px 0px 100px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Micro-interaction animations (respects prefers-reduced-motion)
  const motionProps = useMemo(() => {
    if (disableMotion || prefersReducedMotion || !isInViewport) {
      return {};
    }

    return {
      whileHover: {
        y: -2,
        transition: { type: 'spring' as const, stiffness: 150, damping: 25 },
      },
      whileTap: isInteractive
        ? {
            scale: 0.98,
            transition: { type: 'spring' as const, stiffness: 250, damping: 30 },
          }
        : undefined,
      onHoverStart: () => setIsHovering(true),
      onHoverEnd: () => setIsHovering(false),
    };
  }, [disableMotion, prefersReducedMotion, isInViewport, isInteractive]);

  const CardComponent = link ? m.a : m.article;
  const cardProps = link
    ? {
        href: link,
        target: '_blank' as const,
        rel: 'noopener noreferrer',
        'aria-label':
          typeof title === 'string'
            ? `View ${title} (opens in new tab)`
            : 'View content (opens in new tab)',
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      }
    : {
        role: 'article' as const,
        ...(isInteractive
          ? {
              tabIndex: 0,
              'aria-label':
                typeof title === 'string' && typeof subtitle === 'string'
                  ? `${title} - ${subtitle}`
                  : typeof title === 'string'
                    ? title
                    : 'Card',
            }
          : {}),
      };

  return (
    <CardComponent
      ref={setCardRef}
      className={clsx(
        CARD_BASE_CLASSES,
        'gpu-accelerate',
        link && 'cursor-pointer',
        isDimmed && 'opacity-50',
        isHovered && 'z-10',
        // Add focus styles for keyboard navigation only when interactive
        isInteractive &&
          'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 focus-visible:shadow-lg focus-visible:shadow-[var(--color-primary)]/20',
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={willChangeStyle}
      layoutId={typeof title === 'string' ? `card-${title}` : undefined}
      {...motionProps}
      {...cardProps}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className={typeof title === 'string' ? TITLE_HOVER_CLASSES : 'subtitle'}>
              {title}
            </h4>
            <span className={DATE_CLASSES}>{date}</span>
          </div>

          {badge && (
            <span
              className={clsx(
                'inline-flex items-center gap-1 mb-2 px-2 py-1',
                TYPOGRAPHY.TEXT_XS,
                'font-semibold',
                'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
                'border border-[var(--color-primary)]/30',
                'rounded',
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              {badge}
            </span>
          )}

          <div
            className={clsx(
              TEXT_SM_CLASSES,
              'mb-2',
              typeof subtitle === 'string' &&
                (subtitleColor === 'primary'
                  ? 'text-[var(--color-muted)] group-hover:text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]'),
            )}
          >
            {subtitle}
          </div>

          {description && (
            <Text
              variant="description"
              className="transition-colors duration-300 group-hover:text-[var(--color-text)]"
            >
              {description}
            </Text>
          )}

          {children}
        </div>
      </div>
    </CardComponent>
  );
}
