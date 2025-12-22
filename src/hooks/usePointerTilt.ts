import { useMotionValue, useSpring } from 'framer-motion';
import { useCallback } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

export function usePointerTilt({ enabled, maxTiltDeg = 12 }: { enabled: boolean; maxTiltDeg?: number }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const rotateXSpring = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const dx = x - 0.5;
      const dy = y - 0.5;
      rotateY.set(dx * maxTiltDeg);
      rotateX.set(-dy * maxTiltDeg);
    },
    [enabled, maxTiltDeg, rotateX, rotateY],
  );

  const reset = useCallback(() => {
    if (!enabled) return;
    rotateX.set(0);
    rotateY.set(0);
  }, [enabled, rotateX, rotateY]);

  return {
    tiltStyle: { rotateX: rotateXSpring, rotateY: rotateYSpring },
    onPointerMove: handlePointerMove,
    onPointerLeave: reset,
  };
}