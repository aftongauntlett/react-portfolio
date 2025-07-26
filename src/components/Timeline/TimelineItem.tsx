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
        'group grid grid-cols-[2.5rem_1fr] gap-x-4 items-start transition-all duration-300',
        !isFirst && 'mt-4',
        shouldDim && '!opacity-50',
        isActive && 'bg-[var(--color-primary)]/10',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
      )}
    >
      <div className="relative flex justify-center pt-1">
        {title.toLowerCase().includes('next role') ? (
          <div className="absolute -inset-1 rounded-full bg-[var(--color-background)] flex items-center justify-center">
            <HiQuestionMarkCircle className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
          </div>
        ) : (
          <span
            className={clsx(
              'block w-3 h-3 rounded-full bg-[var(--color-line)] transition-colors',
              isActive || isHovered
                ? 'bg-[var(--color-secondary)] shadow-[0_0_6px_var(--color-secondary)]'
                : '',
            )}
          />
        )}
      </div>
      <div className="px-2">
        <h3 className="subtitle flex items-baseline gap-1">
          <span
            className={clsx(
              'transition-all',
              isActive || isHovered ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]',
            )}
          >
            {title}
          </span>
          {company && <span className="text-[var(--color-text)]">&nbsp;@ {company}</span>}
        </h3>
        {dates && (
          <time
            className="
          block text-sm mb-2 
          text-[var(--color-muted)]
          transition-colors
          group-hover:text-[var(--color-secondary)]
        "
          >
            {dates}
          </time>
        )}
        {children}
      </div>
    </MotionSection>
  );
}
