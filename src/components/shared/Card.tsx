import clsx from 'clsx';
import type { ReactNode, KeyboardEvent } from 'react';
import {
  CARD_BASE_CLASSES,
  TITLE_HOVER_CLASSES,
  DATE_CLASSES,
  TEXT_SM_CLASSES,
} from '@/constants/styles';
import { TYPOGRAPHY } from '@/constants/typography';

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
}: CardProps) {
  const isInteractive = !!(link || className?.includes('cursor-pointer'));

  // Handle keyboard interaction for clickable cards
  const handleKeyDown = (e: KeyboardEvent) => {
    if (link && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const CardComponent = link ? 'a' : 'article';
  const cardProps = link
    ? {
        href: link,
        target: '_blank' as const,
        rel: 'noopener noreferrer',
        'aria-label': typeof title === 'string' ? `View ${title}` : 'View content',
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
      className={clsx(
        CARD_BASE_CLASSES,
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
                  ? 'text-[var(--color-primary)] group-hover:text-[var(--color-text)]'
                  : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]'),
            )}
          >
            {subtitle}
          </div>

          {description && (
            <p className={`${TYPOGRAPHY.TEXT_SMALL} text-[var(--color-muted)]`}>{description}</p>
          )}

          {children}
        </div>
      </div>
    </CardComponent>
  );
}
