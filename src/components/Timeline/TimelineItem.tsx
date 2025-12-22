import type { ReactNode } from 'react';
import type React from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
export interface TimelineItemProps {
  title: string;
  company?: string;
  dates?: string;
  location?: 'Remote' | 'Hybrid' | 'On-site';
  isFirst?: boolean;
  isActive?: boolean;
  href?: string;
  badge?: string;
  children?: ReactNode;
}

export default function TimelineItem({
  title,
  company,
  dates,
  location,
  isActive = false,
  href,
  badge,
  children,
}: TimelineItemProps) {
  const Wrapper = href ? 'a' : 'div';

  const getLocationChipProps = (
    locationValue: NonNullable<TimelineItemProps['location']>,
  ): { className: string; style?: React.CSSProperties } => {
    if (locationValue === 'Hybrid') {
      return {
        className: clsx(
          TYPOGRAPHY.TEXT_XS,
          'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
          'text-[var(--color-status-hybrid)]',
        ),
        style: { backgroundColor: 'var(--color-status-hybrid-bg)' },
      };
    }

    if (locationValue === 'Remote') {
      return {
        className: clsx(
          TYPOGRAPHY.TEXT_XS,
          'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
          'text-[var(--color-status-remote)]',
        ),
        style: { backgroundColor: 'var(--color-status-remote-bg)' },
      };
    }

    return {
      className: clsx(
        TYPOGRAPHY.TEXT_XS,
        'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
        'text-[var(--color-status-onsite)]',
      ),
      style: { backgroundColor: 'var(--color-status-onsite-bg)' },
    };
  };

  return (
    <Wrapper
      {...(href
        ? {
            href,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      tabIndex={0}
      aria-label={`${title}${company ? ` at ${company}` : ''}${dates ? `, ${dates}` : ''}${badge ? `, ${badge}` : ''}${href ? ' (opens in new tab)' : ''}`}
      aria-current={isActive ? 'step' : undefined}
      className={clsx(
        'group transition-colors duration-300',
        'md:grid md:grid-cols-[2.5rem_1fr] md:gap-x-4',
        'block space-y-2',
        FOCUS_STYLES.BUTTON,
          'hover:bg-[var(--color-primary)]/5',
        'active:bg-[var(--color-primary)]/5 [@media(hover:hover)]:active:bg-transparent',
      )}
    >
      {/* Timeline dot - only show on desktop */}
      <div className="relative hidden md:flex justify-center z-10 pt-3">
          <span
            className={clsx(
              'block rounded-full transition-all duration-300 relative z-10',
              'w-3 h-3',
              isActive
                ? 'bg-[var(--color-secondary)] border-2 border-[var(--color-background)] shadow-[0_0_8px_var(--color-secondary)] scale-125'
                : 'bg-[var(--color-muted)] border-2 border-[var(--color-background)] group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_0_8px_var(--color-primary)]',
            )}
            aria-hidden="true"
          />
      </div>

      {/* Content area */}
      <div>
        <header>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={clsx(
                  TYPOGRAPHY.SUBTITLE,
                  'transition-colors duration-300',
                  FOCUS_STYLES.COMPACT,
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text)]',
                )}
                tabIndex={0}
              >
                {company ? (
                  <>
                    <span className="transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                      {title}
                    </span>
                    <span className="text-[var(--color-text)]"> @ </span>
                    <span className="transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                      {company}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h3>
            </div>
            {(badge || location) && (
              badge ? (
                <span
                  className={clsx(
                    'inline-flex items-center font-medium transition-colors duration-300 flex-shrink-0',
                    'px-2 py-1 text-xs',
                    'rounded border',
                    'border text-[var(--color-muted)] bg-[var(--color-chip-muted-bg)] border-[var(--color-chip-muted-border)]',
                    'group-hover:border-[var(--color-secondary)]',
                  )}
                >
                  {badge}
                </span>
              ) : location ? (
                <span {...getLocationChipProps(location)}>{location}</span>
              ) : null
            )}
          </div>
          {dates && (
            <div className="flex mb-2">
              <time
                className={clsx(
                  'transition-colors duration-300',
                  TYPOGRAPHY.TEXT_SMALL,
                  'text-[var(--color-muted)]',
                  'group-hover:text-[var(--color-secondary)]',
                  FOCUS_STYLES.COMPACT,
                )}
                dateTime={dates}
                tabIndex={0}
              >
                {dates}
              </time>
            </div>
          )}
        </header>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </Wrapper>
  );
}
