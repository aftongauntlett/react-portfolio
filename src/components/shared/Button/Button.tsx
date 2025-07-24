import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './Button.css';

// Supported variants
type ButtonVariant = 'primary' | 'secondary' | 'link';

// Shared props for all versions
type BaseProps = {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  asDiv?: boolean;
  onDivClick?: () => void;
  motionProps?: HTMLMotionProps<'div'>;
  variant?: ButtonVariant;
};

// Button variant (no href)
type ButtonOnly = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined;
  };

// Anchor variant (uses href)
type AnchorOnly = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'type'> & {
    href: string;
  };

// Union of both variants
type ButtonProps = ButtonOnly | AnchorOnly;

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    className = '',
    asDiv = false,
    onDivClick,
    motionProps,
    href,
    variant = 'primary',
    ...rest
  } = props;

  const rootClass = clsx(
    'btn-root',
    {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-link': variant === 'link',
    },
    className,
  );

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
        {...(motionProps ?? {})}
      >
        {icon && <span>{icon}</span>}
        {children}
      </motion.div>
    );
  }

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={rootClass} {...anchorProps}>
        {icon && <span>{icon}</span>}
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={rootClass} {...buttonProps}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
