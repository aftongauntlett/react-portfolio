import { useState, type ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import clsx from 'clsx';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-line)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-full text-left py-4 flex items-center justify-between',
          'text-[var(--color-text)] hover:text-[var(--color-primary)]',
          'transition-colors duration-200',
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

      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="pb-6">{children}</div>
      </div>
    </div>
  );
}
