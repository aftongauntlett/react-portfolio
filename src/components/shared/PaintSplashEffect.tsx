import { useRef, useCallback } from 'react';
import type { MouseEvent, ElementType, JSX } from 'react';

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
 * PaintSplashText renders a hoverable text element with a radial splash effect.
 * On hover, the mouse position is tracked and passed as CSS variables to the pseudo-element.
 */
export default function PaintSplashText({
  children,
  tag = 'span',
  className = '',
  ...additionalProps
}: PaintSplashTextProps) {
  const ref = useRef<HTMLElement>(null);

  /**
   * Handles mouse movement to update CSS variables (--mx, --my)
   * These control the position of the splash effect.
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  }, []);

  /**
   * Resets the CSS variables on mouse leave
   * Prevents the last splash position from persisting.
   */
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }, []);

  const Tag = tag as ElementType;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`paint-splash font-heading text-4xl font-bold leading-tight tracking-tight ${className}`}
      data-splash={children}
      {...additionalProps}
    >
      {children}
    </Tag>
  );
}
