// src/components/shared/Button.tsx
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'link';

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
    variant = 'primary', // default to primary
    ...rest
  } = props;

  // common styles
  const base = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2',
    'font-medium text-base transition-all duration-300',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  );

  // flavor styles
  const flavor = {
    primary:
      'border border-[var(--color-primary)] text-[var(--color-primary)] ' +
      'hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_6px_var(--color-primary)]',
    secondary:
      'border border-[var(--color-secondary)] text-[var(--color-secondary)] ' +
      'hover:bg-[var(--color-secondary)] hover:text-white hover:shadow-[0_0_6px_var(--color-secondary)]',
    link: 'bg-transparent text-[var(--color-primary)] hover:underline focus:ring-0',
  }[variant];

  const rootClass = clsx(base, flavor, className);

  if (asDiv) {
    return (
      <motion.div
        className={rootClass}
        role="button"
        tabIndex={0}
        onClick={onDivClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onDivClick?.();
        }}
        {...motionProps}
      >
        {icon && <span>{icon}</span>}
        {children}
      </motion.div>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={rootClass}
        target="_blank"
        rel="noopener noreferrer"
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <span>{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={rootClass} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
