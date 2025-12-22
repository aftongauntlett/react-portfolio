import { useState, type ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { TRANSITION_FAST } from '@/constants/styles';
import clsx from 'clsx';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  subtitle?: string;
  badge?: string | number;
  variant?: 'default' | 'featured';
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  subtitle,
  badge,
  variant = 'default',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={clsx(
        variant === 'featured' && [
          'rounded-lg',
          'bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5',
          'border border-[var(--color-primary)]/20',
          'p-4',
        ],
      )}
    >
      <h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'w-full text-left py-4 flex items-center justify-between gap-4',
            'text-[var(--color-text)]',
            TRANSITION_FAST,
            'focus:outline-none focus:text-[var(--color-primary)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
          )}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="subtitle">{title}</span>
            {badge !== undefined && (
              <span
                className={clsx(
                  'inline-flex items-center justify-center',
                  'h-6 min-w-6 px-1.5',
                  'rounded-full text-xs font-medium leading-none',
                  'border border-[var(--color-line)]',
                  'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
                  'transition-colors duration-200',
                )}
              >
                {badge}
              </span>
            )}
          </div>
          <HiChevronDown
            className={clsx(
              'transition-transform duration-300 text-[var(--color-muted)]',
              'flex-shrink-0',
              isOpen && 'rotate-180',
            )}
            size={20}
          />
        </button>
        {subtitle && isOpen && (
          <p
            className={clsx(
              'text-sm text-[var(--color-muted)] mt-1 mb-2',
            )}
          >
            {subtitle}
          </p>
        )}
      </h3>

      <div
        className={clsx(
          'overflow-hidden transition-[max-height] duration-300 ease-in-out',
          isOpen ? 'max-h-[2000px]' : 'max-h-0',
        )}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}
