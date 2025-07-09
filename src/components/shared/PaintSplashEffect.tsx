import { useRef } from "react";
import type { MouseEvent, ElementType, JSX } from "react";

// Only allow valid HTML elements (not SVG)
type AllowedTags = keyof JSX.IntrinsicElements;

/**
 * PaintSplashText renders a hoverable text element with a radial splash effect.
 * On hover, the mouse position is tracked and passed as CSS variables to the pseudo-element.
 */
export default function PaintSplashText({
  children,
  tag = "span",
}: {
  children: string;
  tag?: AllowedTags;
}) {
  // Use a generic ref to target any HTML element
  const ref = useRef<HTMLElement>(null);

  /**
   * Handles mouse movement to update CSS variables (--mx, --my)
   * These control the position of the splash effect.
   */
  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  // Dynamically render the specified tag (e.g., h1, span, div)
  const Tag = tag as ElementType;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className="paint-splash font-heading text-4xl font-bold leading-tight tracking-tight"
      data-splash={children}
    >
      {children}
    </Tag>
  );
}
