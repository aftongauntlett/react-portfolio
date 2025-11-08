import React from 'react';
import { m } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonColor = 'primary' | 'secondary' | 'muted';
type TextColor = 'dark' | 'light';

interface BaseButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  textColor?: TextColor;
  hoverTextColor?: TextColor;
  disabled?: boolean;
  'aria-describedby'?: string;
}

// Button with children (text/content)
interface ButtonWithChildrenAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  'aria-label'?: string;
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonWithChildrenAsLink
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  'aria-label'?: string;
  href: string;
}

// Icon-only button (requires aria-label)
interface IconOnlyButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  children?: never;
  icon: React.ReactNode;
  'aria-label': string; // Required for icon-only
  href?: never;
  target?: never;
  rel?: never;
}

interface IconOnlyButtonAsLink
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  children?: never;
  icon: React.ReactNode;
  'aria-label': string; // Required for icon-only
  href: string;
}

export type ButtonProps =
  | ButtonWithChildrenAsButton
  | ButtonWithChildrenAsLink
  | IconOnlyButtonAsButton
  | IconOnlyButtonAsLink;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'solid',
    color = 'primary',
    textColor,
    hoverTextColor,
    icon,
    disabled = false,
    className,
    'aria-label': ariaLabel,
    ...restProps
  } = props;

  const prefersReducedMotion = usePrefersReducedMotion();

  // Enhanced accessibility for icon-only buttons
  const isIconOnly = icon && !children;

  // Require explicit aria-label for icon-only buttons
  if (isIconOnly && !ariaLabel) {
    const errorMessage =
      'Accessibility error: Icon-only Button requires an explicit aria-label prop describing its action.';

    if (process.env.NODE_ENV !== 'production') {
      // Throw in development and test to catch issues early
      throw new Error(errorMessage);
    } else {
      // Log error in production but don't throw to avoid runtime crashes
      console.error(errorMessage);
    }
  }

  const effectiveAriaLabel = ariaLabel;

  // Class generation includes variant, color, textColor, hoverTextColor, icon-only state, disabled state, and additional className
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${color}`,
    // Add text color class if specified
    textColor && `btn--text-${textColor}`,
    // Add hover text color class if specified
    hoverTextColor && `btn--hover-text-${hoverTextColor}`,
    // Add icon-only class when there's an icon but no children (text)
    isIconOnly && 'btn--icon-only',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Micro-interaction animations (respects prefers-reduced-motion)
  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 250, damping: 30 },
      };

  if ('href' in props && props.href && !disabled) {
    const { href, target, rel, ...linkProps } = restProps as
      | ButtonWithChildrenAsLink
      | IconOnlyButtonAsLink;

    // Enhanced security and accessibility for external links
    const isExternal = href.startsWith('http');
    const defaultTarget = isExternal ? '_blank' : undefined;
    const defaultRel = isExternal ? 'noopener noreferrer' : undefined;

    // Extract any conflicting drag props (unused but needed to exclude them)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onDrag, onDragStart, onDragEnd, ...safeProps } = linkProps as Record<string, unknown>;

    return (
      <m.a
        href={href}
        target={target || defaultTarget}
        rel={rel || defaultRel}
        className={buttonClasses}
        aria-label={effectiveAriaLabel}
        {...motionProps}
        {...safeProps}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </m.a>
    );
  }

  const buttonPropsRest = restProps as ButtonWithChildrenAsButton | IconOnlyButtonAsButton;
  // Extract any conflicting drag props (unused but needed to exclude them)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDrag, onDragStart, onDragEnd, ...safeButtonProps } =
    buttonPropsRest as unknown as Record<string, unknown>;

  return (
    <m.button
      className={buttonClasses}
      disabled={disabled}
      aria-label={effectiveAriaLabel}
      {...motionProps}
      {...safeButtonProps}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </m.button>
  );
};

export default Button;
