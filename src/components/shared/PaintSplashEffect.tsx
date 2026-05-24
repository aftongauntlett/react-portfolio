import type { ElementType, JSX } from 'react';

type AllowedTags = keyof JSX.IntrinsicElements;

interface PaintSplashTextProps {
  children: string;
  tag?: AllowedTags;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * PaintSplashText renders a styled heading/label.
 */
export default function PaintSplashText({
  children,
  tag = 'span',
  className = '',
  ...additionalProps
}: PaintSplashTextProps) {
  const Tag = tag as ElementType;

  return (
    <Tag
      className={`font-display text-4xl font-semibold leading-[1.3] ${className}`}
      tabIndex={-1}
      {...additionalProps}
    >
      <span className="relative inline-block">
        <span className="relative inline-block">{children}</span>

        {/* Active underline */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full rounded bg-[var(--color-primary)]"
        />
      </span>
    </Tag>
  );
}
