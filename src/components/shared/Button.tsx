import React from 'react';

type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonColor = 'primary' | 'secondary' | 'muted';
type TextColor = 'dark' | 'light';

interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  textColor?: TextColor;
  hoverTextColor?: TextColor;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

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
    ...restProps
  } = props;

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
    icon && !children && 'btn--icon-only',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href && !disabled) {
    const { href, target, rel, ...linkProps } = restProps as ButtonAsLink;
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={buttonClasses}
        {...linkProps}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </a>
    );
  }

  const buttonProps = restProps as ButtonAsButton;
  return (
    <button className={buttonClasses} disabled={disabled} {...buttonProps}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
