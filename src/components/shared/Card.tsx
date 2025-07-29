import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  CARD_BASE_CLASSES,
  TITLE_HOVER_CLASSES,
  DATE_CLASSES,
  TEXT_SM_CLASSES,
} from '@/constants/styles';

interface CardProps {
  title: string;
  subtitle: string;
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
  const CardComponent = link ? 'a' : 'div';
  const cardProps = link
    ? {
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View ${title} (opens in new tab)`,
        tabIndex: 0,
      }
    : {
        tabIndex: 0,
        role: 'article',
        'aria-label': `${title} - ${subtitle}`,
      };

  return (
    <CardComponent
      className={clsx(
        CARD_BASE_CLASSES,
        link && 'cursor-pointer',
        isDimmed && 'opacity-50',
        isHovered && 'z-10',
        // Add focus styles for keyboard navigation
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
        'focus-visible:shadow-lg focus-visible:shadow-[var(--color-primary)]/20',
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...cardProps}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className={TITLE_HOVER_CLASSES}>{title}</h4>
            <span className={DATE_CLASSES}>{date}</span>
          </div>

          {badge && (
            <span className="hidden sm:inline-block mb-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              {badge}
            </span>
          )}

          <p
            className={clsx(
              TEXT_SM_CLASSES,
              'mb-2',
              subtitleColor === 'primary'
                ? 'text-[var(--color-primary)] group-hover:text-[var(--color-text)]'
                : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]',
            )}
          >
            {subtitle}
          </p>

          {description && <p className="text-sm text-[var(--color-muted)]">{description}</p>}

          {children}
        </div>
        {badge && (
          <span className="inline-block sm:hidden px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full self-start">
            {badge}
          </span>
        )}
      </div>
    </CardComponent>
  );
}
