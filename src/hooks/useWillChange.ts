import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type WillChangeProperty = 'transform' | 'opacity' | 'filter';

function formatWillChange(properties: WillChangeProperty[]): string {
  return Array.from(new Set(properties)).join(', ');
}

/**
 * Dynamically applies `will-change` during an active animation window.
 * Keeps it off otherwise to avoid unnecessary memory/paint costs.
 */
export function useWillChange(
  properties: WillChangeProperty[],
  isAnimating: boolean,
): CSSProperties {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion || !isAnimating) {
      return { willChange: 'auto' };
    }

    return { willChange: formatWillChange(properties) };
  }, [prefersReducedMotion, isAnimating, properties]);
}
