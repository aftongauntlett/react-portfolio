import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'filled' | 'link';

interface BaseProps {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  asDiv?: boolean;
  onDivClick?: () => void;
  motionProps?: HTMLMotionProps<'div'>;
  href?: string;
  variant?: ButtonVariant;
}

type ButtonProps =
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    className,
    asDiv,
    onDivClick,
    motionProps,
    href,
    variant = 'primary',
    ...rest
  } = props;

  const base = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md px-3 sm:px-4 py-2',
    'font-medium text-sm sm:text-base transition-all duration-300 shrink-0',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  );

  const variants = {
    primary:
      'border border-[var(--color-primary)] text-[var(--color-primary)] ' +
      'hover:bg-[var(--color-primary)] hover:!text-white hover:shadow-[0_0_8px_var(--color-primary)]/30 ' +
      'focus-visible:bg-[var(--color-primary)] focus-visible:!text-white',
    secondary:
      'border border-[var(--color-secondary)] text-[var(--color-secondary)] ' +
      'hover:bg-[var(--color-secondary)] hover:!text-white hover:shadow-[0_0_8px_var(--color-secondary)]/30 ' +
      'focus-visible:bg-[var(--color-secondary)] focus-visible:!text-white',
    filled:
      'border border-[var(--color-primary)] bg-[var(--color-primary)] text-white ' +
      'hover:shadow-[0_0_12px_var(--color-primary)]/40 hover:scale-[1.02] ' +
      'focus-visible:shadow-[0_0_12px_var(--color-primary)]/40',
    link:
      'bg-transparent text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:underline ' +
      'focus-visible:text-[var(--color-primary)] focus-visible:underline focus-visible:outline-offset-4',
  };

  const rootClass = clsx(base, variants[variant], className);

  if (asDiv) {
    return (
      <motion.div
        className={rootClass}
        role="button"
        tabIndex={0}
        onClick={onDivClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onDivClick) {
            e.preventDefault();
            onDivClick();
          }
        }}
        {...motionProps}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </motion.div>
    );
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <a
        href={href}
        className={rootClass}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={rootClass} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
