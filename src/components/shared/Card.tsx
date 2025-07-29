import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  TITLE_CLASSES,
  TEXT_SM_MEDIUM_CLASSES,
  TEXT_SM_CLASSES,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
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
      }
    : {};

  return (
    <CardComponent
      className={clsx(
        'block p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-background)]',
        'hover:border-[var(--color-primary)]/30 transition-all duration-300',
        'group',
        link && 'cursor-pointer', // Only show pointer cursor when there's a link
        isDimmed && 'opacity-50',
        isHovered && 'z-10',
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...cardProps}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className={clsx(TITLE_CLASSES, TEXT_PRIMARY_HOVER)}>{title}</h4>
            <span className={clsx(TEXT_SM_MEDIUM_CLASSES, TEXT_MUTED_HOVER, 'ml-2 shrink-0')}>
              {date}
            </span>
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
                ? 'text-[var(--color-primary)] group-hover:text-[var(--color-body)]'
                : 'text-[var(--color-muted)] group-hover:text-[var(--color-body)]',
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
