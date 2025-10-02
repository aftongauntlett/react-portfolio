import type { ReactNode } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';

interface TagProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  className?: string;
}

export default function Tag({
  children,
  variant = 'secondary',
  size = 'small',
  className = '',
}: TagProps) {
  const baseClasses = 'px-3 py-1 rounded border transition-colors duration-300';

  const variantClasses = {
    primary:
      'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/15 group-hover:border-[var(--color-primary)]/30',
    secondary:
      'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/20 text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)]/15 group-hover:border-[var(--color-secondary)]/30',
  };

  const sizeClasses = {
    small: TYPOGRAPHY.TEXT_SMALL,
    medium: TYPOGRAPHY.TEXT_BODY,
  };

  return (
    <span className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </span>
  );
}
