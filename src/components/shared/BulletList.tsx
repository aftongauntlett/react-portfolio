import { type ReactNode } from 'react';

export const BulletList = ({ children }: { children: ReactNode }) => (
  <ul className="group mt-2 list-none space-y-2 text-[var(--color-text-muted)]">{children}</ul>
);

export const BulletItem = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-5 flex items-start gap-2">
    <span className="absolute left-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-secondary)]">
      –
    </span>
    <span>{children}</span>
  </li>
);
