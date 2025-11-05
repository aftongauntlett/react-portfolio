import { Button } from './Button';
import { getLinkIcon, type LinkIconType } from './LinkIcons';
import type { ReactNode } from 'react';

interface LinkButtonProps {
  type: LinkIconType;
  href: string;
  children?: ReactNode;
  variant?: 'solid' | 'outline' | 'link';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
  'aria-label'?: string;
}

/**
 * Factory component for link buttons with appropriate icons and security attributes.
 * Automatically adds target="_blank" and rel="noopener noreferrer" for external links.
 */
export function LinkButton({
  type,
  href,
  children,
  variant = 'outline',
  color = 'primary',
  className,
  'aria-label': ariaLabel,
}: LinkButtonProps) {
  const isExternal = href.startsWith('http');
  const icon = getLinkIcon(type);

  // Icon-only buttons require aria-label
  if (!children && !ariaLabel) {
    return (
      <Button
        href={href}
        variant={variant}
        color={color}
        icon={icon}
        className={className}
        aria-label={`View on ${type}`}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      />
    );
  }

  return (
    <Button
      href={href}
      variant={variant}
      color={color}
      icon={icon}
      className={className}
      aria-label={ariaLabel}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </Button>
  );
}
