import type { ReactNode } from 'react';
import clsx from 'clsx';

interface TagProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'muted' | 'neutral' | 'active';
  size?: 'xs' | 'small' | 'medium';
  className?: string;
  onClick?: () => void;
  'aria-pressed'?: boolean;
  'aria-label'?: string;
}

export default function Tag({
  children,
  variant = 'muted',
  size = 'small',
  className = '',
  onClick,
  'aria-pressed': ariaPressed,
  'aria-label': ariaLabel,
}: TagProps) {
  const baseClasses = clsx(
    'inline-flex items-center font-medium rounded transition-colors duration-300 leading-none whitespace-nowrap',
    onClick ? 'cursor-pointer' : 'cursor-default',
  );

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    small: 'px-3 py-1 text-sm',
    medium: 'px-3 py-2 text-sm',
  };

  const variantClasses = {
    primary:
      'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/30',
    secondary:
      'bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/15 hover:border-[var(--color-secondary)]/30',
    muted:
      'border text-[var(--color-muted)] bg-[var(--color-chip-muted-bg)] border-[var(--color-chip-muted-border)] hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)] dark:hover:border-[var(--color-primary)]/60 dark:hover:text-[var(--color-primary)] dark:hover:bg-transparent',
    neutral:
      'bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-secondary)]',
    active:
      'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/40 shadow-sm font-semibold',
  };

  const Element = onClick ? 'button' : 'span';

  return (
    <Element
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
    >
      {children}
    </Element>
  );
}
