import { useState, type ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { TRANSITION_FAST } from '@/constants/styles';
import clsx from 'clsx';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'w-full text-left py-4 flex items-center justify-between',
            'text-[var(--color-text)] hover:text-[var(--color-primary)]',
            TRANSITION_FAST,
            'focus:outline-none focus:text-[var(--color-primary)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
            'group',
          )}
          aria-expanded={isOpen}
        >
          <span className="subtitle">{title}</span>
          <HiChevronDown
            className={clsx(
              'transition-transform duration-300 text-[var(--color-muted)]',
              'group-hover:text-[var(--color-secondary)]',
              isOpen && 'rotate-180',
            )}
            size={20}
          />
        </button>
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
