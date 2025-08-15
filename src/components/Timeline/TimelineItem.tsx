import type { ReactNode, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

export interface TimelineItemProps {
  idx: number;
  title: string;
  company?: string;
  dates?: string;
  isFirst?: boolean;
  isActive?: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onInteraction?: () => void;
  children?: ReactNode;
}

export default function TimelineItem({
  idx: _idx,
  title,
  company,
  dates,
  isFirst = false,
  isActive = false,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
  onInteraction,
  children,
}: TimelineItemProps) {
  const shouldDim = !isActive && isDimmed;
  const isNextRoleItem = title.toLowerCase().includes('next role');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onInteraction?.();
    }
  };

  const handleClick = () => {
    if ('ontouchstart' in window) {
      onInteraction?.();
    }
  };

  const handleMouseEvents = {
    onMouseEnter: () => !('ontouchstart' in window) && onHover(),
    onMouseLeave: () => !('ontouchstart' in window) && onLeave(),
  };

  return (
    <div
      role="listitem"
      tabIndex={0}
      {...handleMouseEvents}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${title}${company ? ` at ${company}` : ''}${dates ? `, ${dates}` : ''}`}
      aria-current={isActive ? 'step' : undefined}
      className={clsx(
        'group transition-opacity duration-300',
        // Desktop: timeline grid layout
        'md:grid md:grid-cols-[2.5rem_1fr] md:gap-x-4 md:items-start',
        // Mobile: simple stack layout without timeline
        'block space-y-2',
        !isFirst && 'mt-3',
        // Only apply dimming on hover-capable devices
        shouldDim && 'opacity-50 [@media(hover:none)]:!opacity-100',
        isActive && 'bg-[var(--color-primary)]/10 rounded-lg p-2',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
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
              'block w-3 h-3 rounded-full transition-[transform,box-shadow,background-color] duration-300 relative z-10',
              isActive || isHovered
                ? 'bg-[var(--color-secondary)] border-2 border-[var(--color-background)] shadow-[0_0_8px_var(--color-secondary)] scale-125'
                : 'bg-[var(--color-line)] border-2 border-[var(--color-background)]',
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content area */}
      <div className="md:px-2">
        <header>
          <h3 className="subtitle flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
            <span
              className={clsx(
                'transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1 focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
                isActive || isHovered ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]',
              )}
              tabIndex={0}
            >
              {title}
            </span>
            {company && (
              <span
                className="text-[var(--color-text)] text-base sm:text-lg focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1 focus-visible:bg-[var(--color-primary)]/10 rounded px-1"
                tabIndex={0}
              >
                &nbsp;@ {company}
              </span>
            )}
          </h3>
          {dates && (
            <time
              className={clsx(
                'block text-sm mb-3 text-[var(--color-secondary)] transition-colors md:group-hover:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1 focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
              )}
              dateTime={dates}
              tabIndex={0}
            >
              {dates}
            </time>
          )}
        </header>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}
