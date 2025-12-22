import { type ReactNode } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';

export const BulletList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <ul
    className={clsx(
      'list-none space-y-2 transition-colors duration-300',
      TYPOGRAPHY.TEXT_DESCRIPTION,
      'text-[var(--color-muted)] group-hover:text-[var(--color-text)]',
      className,
    )}
    aria-label="Job responsibilities and achievements"
  >
    {children}
  </ul>
);

export const BulletItem = ({ children }: { children: ReactNode }) => (
  <li
    className={clsx(
      'bullet-item relative pl-5 flex items-start rounded-sm',
      FOCUS_STYLES.PRIMARY,
    )}
    tabIndex={0}
  >
    <span
      className={clsx(
        'absolute left-0 transition-colors duration-300',
        'text-[var(--color-muted)]',
        'group-hover:text-[var(--color-primary)]',
      )}
    >
      –
    </span>
    <span>{children}</span>
  </li>
);
