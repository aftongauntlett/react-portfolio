import { useState, type ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { TRANSITION_FAST } from '@/constants/styles';
import clsx from 'clsx';

interface ShowMoreProps {
  title: string;
  children: ReactNode;
  defaultShow?: boolean;
  maxHeight?: string;
}

export default function ShowMore({
  title,
  children,
  defaultShow = false,
  maxHeight = '200px',
}: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(defaultShow);

  return (
    <div className="space-y-4">
      <h3 className="subtitle text-[var(--color-text)]">{title}</h3>

      <div className="relative">
        <div
          className={clsx(
            'transition-all duration-500 ease-in-out overflow-hidden',
            isExpanded ? 'max-h-[2000px]' : `max-h-[${maxHeight}]`,
          )}
        >
          {children}
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={clsx(
          'flex items-center gap-2 text-sm',
          'text-[var(--color-primary)] hover:text-[var(--color-secondary)]',
          TRANSITION_FAST,
          'focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
          'group',
        )}
      >
        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
        <HiChevronDown
          className={clsx('transition-transform duration-300', isExpanded && 'rotate-180')}
          size={16}
        />
      </button>
    </div>
  );
}
