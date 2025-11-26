import { type ReactNode } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';

export const BulletList = ({ children }: { children: ReactNode }) => (
  <ul
    className={clsx(
      'group mt-2 list-none space-y-2',
      TYPOGRAPHY.TEXT_BODY,
      'text-[var(--color-text-muted)]',
    )}
    aria-label="Job responsibilities and achievements"
  >
    {children}
  </ul>
);

export const BulletItem = ({ children }: { children: ReactNode }) => (
  <li
    className={clsx(
      'bullet-item relative pl-5 flex items-start gap-2 rounded-sm',
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
