import { useState, useCallback } from 'react';

export interface HoverGroupState {
  hovered: number | null;
  setHovered: (idx: number) => void;
  clearHovered: () => void;
  isHovered: (idx: number) => boolean;
  isDimmed: (idx: number) => boolean;
}

/**
 * Manages a single "hovered index" for lists of items,
 * and tells you whether each item should be dimmed.
 */
export function useHoverGroup(): HoverGroupState {
  const [hovered, setHoveredState] = useState<number | null>(null);

  const setHovered = useCallback((idx: number) => setHoveredState(idx), []);
  const clearHovered = useCallback(() => setHoveredState(null), []);
  const isHovered = useCallback((idx: number) => hovered === idx, [hovered]);
  const isDimmed = useCallback((idx: number) => hovered !== null && hovered !== idx, [hovered]);

  return { hovered, setHovered, clearHovered, isHovered, isDimmed };
}
