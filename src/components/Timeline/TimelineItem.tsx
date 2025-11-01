import type { ReactNode } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import Tag from '@/components/shared/Tag';

export interface TimelineItemProps {
  idx: number;
  title: string;
  company?: string;
  dates?: string;
  location?: 'Remote' | 'Hybrid' | 'On-site';
  isFirst?: boolean;
  isActive?: boolean;
  children?: ReactNode;
}

export default function TimelineItem({
  idx: _idx,
  title,
  company,
  dates,
  location,
  isFirst = false,
  isActive = false,
  children,
}: TimelineItemProps) {
  const isNextRoleItem = title.toLowerCase().includes('next role');

  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-label={`${title}${company ? ` at ${company}` : ''}${dates ? `, ${dates}` : ''}`}
      aria-current={isActive ? 'step' : undefined}
      className={clsx(
        'group transition-colors duration-300',
        // Desktop: timeline grid layout
        'md:grid md:grid-cols-[2.5rem_1fr] md:gap-x-4 md:items-start',
        // Mobile: simple stack layout without timeline
        'block space-y-2',
        !isFirst && 'mt-3',
        'rounded-lg p-2',
        isActive && 'bg-[var(--color-primary)]/10',
        // Hover effect - subtle highlight without shifting layout
        '[@media(hover:hover)]:hover:bg-[var(--color-surface)]',
        FOCUS_STYLES.BUTTON,
        // Add subtle touch feedback for mobile
        'active:bg-[var(--color-primary)]/5 [@media(hover:hover)]:active:bg-transparent',
      )}
    >
      {/* Timeline dot - only show on desktop */}
      <div className="relative hidden md:flex justify-center items-start pt-1 z-10">
        {isNextRoleItem ? (
          <div
            className="w-5 h-5 rounded-full bg-[var(--color-background)] flex items-center justify-center border-2 border-[var(--color-primary)] relative z-10"
            aria-hidden="true"
          >
            <HiQuestionMarkCircle className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
          </div>
        ) : (
          <span
            className={clsx(
              'block w-3 h-3 rounded-full transition-all duration-300 relative z-10',
              isActive
                ? 'bg-[var(--color-secondary)] border-2 border-[var(--color-background)] shadow-[0_0_8px_var(--color-secondary)] scale-125'
                : 'bg-[var(--color-line)] border-2 border-[var(--color-background)] group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_0_8px_var(--color-primary)]',
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content area */}
      <div className="md:px-2">
        <header>
          <h3
            className={clsx(
              TYPOGRAPHY.SUBTITLE,
              'flex flex-col sm:flex-row sm:items-baseline sm:gap-[5px]',
            )}
          >
            <span
              className={clsx(
                'transition-all duration-300',
                FOCUS_STYLES.COMPACT,
                isActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text)] group-hover:text-[var(--color-primary)]',
              )}
              tabIndex={0}
            >
              {title}
            </span>
            {company && (
              <span
                className={clsx(
                  'text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary)]',
                  FOCUS_STYLES.COMPACT,
                )}
                tabIndex={0}
              >
                <span className="text-[var(--color-muted)]" aria-hidden="true">
                  @{' '}
                </span>
                {company}
              </span>
            )}
          </h3>
          {dates && (
            <div className="flex items-center gap-2.5 mb-3 mt-1">
              <time
                className={clsx(
                  'transition-colors duration-300 group-hover:text-[var(--color-primary)]',
                  TYPOGRAPHY.TEXT_SMALL,
                  TYPOGRAPHY.TEXT_SECONDARY,
                  FOCUS_STYLES.COMPACT,
                )}
                dateTime={dates}
                tabIndex={0}
              >
                {dates}
              </time>
              {location && (
                <Tag variant="muted" size="xs">
                  {location}
                </Tag>
              )}
            </div>
          )}
        </header>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}
