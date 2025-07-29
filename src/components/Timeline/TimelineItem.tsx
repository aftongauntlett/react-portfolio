import type { ReactNode } from 'react';
import clsx from 'clsx';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import MotionSection from '@/components/shared/MotionSection';
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
  children?: ReactNode;
}

export default function TimelineItem({
  title,
  company,
  dates,
  isFirst = false,
  isActive = false,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
  children,
}: TimelineItemProps) {
  const shouldDim = !isActive && isDimmed;

  return (
    <MotionSection
      tabIndex={0}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={clsx(
        'group transition-all duration-300',
        // Desktop: timeline grid layout
        'md:grid md:grid-cols-[2.5rem_1fr] md:gap-x-4 md:items-start',
        // Mobile: simple stack layout without timeline
        'block space-y-2',
        !isFirst && 'mt-3',
        shouldDim && '!opacity-50',
        isActive && 'bg-[var(--color-primary)]/10',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
      )}
    >
      {/* Timeline dot - only show on desktop */}
      <div className="relative hidden md:flex justify-center items-start pt-1 z-10">
        {title.toLowerCase().includes('next role') ? (
          <div className="w-5 h-5 rounded-full bg-[var(--color-background)] flex items-center justify-center border-2 border-[var(--color-primary)] relative z-10">
            <HiQuestionMarkCircle className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
          </div>
        ) : (
          <span
            className={clsx(
              'block w-3 h-3 rounded-full transition-all duration-300 relative z-10',
              isActive || isHovered
                ? 'bg-[var(--color-secondary)] border-2 border-[var(--color-background)] shadow-[0_0_8px_var(--color-secondary)] scale-125'
                : 'bg-[var(--color-line)] border-2 border-[var(--color-background)]',
            )}
          />
        )}
      </div>
      {/* Content area */}
      <div className="md:px-2">
        <h3 className="subtitle flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
          <span
            className={clsx(
              'transition-all',
              isActive || isHovered ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]',
            )}
          >
            {title}
          </span>
          {company && (
            <span className="text-[var(--color-text)] text-base sm:text-lg">&nbsp;@ {company}</span>
          )}
        </h3>
        {dates && (
          <time className="block text-sm mb-3 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-secondary)]">
            {dates}
          </time>
        )}
        {children}
      </div>
    </MotionSection>
  );
}
