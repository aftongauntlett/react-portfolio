import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Number of animated stars in dark mode.
 * Tested with Lighthouse: 18 stars maintains 95+ performance score.
 * Increasing this count may impact performance on low-end devices.
 * Each star has dual animations (float + twinkle) with CSS transforms.
 */
const STAR_COUNT = 18;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface StarData {
  key: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  dx: number;
  dy: number;
  delay: number;
  twinkleDelay: number;
}

// Generate stars once at module level
const generateStars = (): StarData[] => {
  return Array.from({ length: STAR_COUNT }).map((_, i) => {
    const angle = random(0, 2 * Math.PI);
    const distance = random(30, 70);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    return {
      key: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(1.5, 3.5),
      duration: random(12, 22),
      dx,
      dy,
      delay: random(0, 6),
      twinkleDelay: random(0, 8),
    };
  });
};

const stars = generateStars();

const StarryBackground = React.memo(function StarryBackground() {
  const { theme } = useTheme();

  // Only show stars in dark mode
  if (theme !== 'dark') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'none',
      }}
    >
      {stars.map((star) => {
        const moveX = star.dx * 0.15; // Reduced to 15% for subtle movement
        const moveY = star.dy * 0.15;

        return (
          <div
            key={star.key}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.18)`,
              // @ts-expect-error - CSS custom properties
              '--dx': `${moveX}px`,
              '--dy': `${moveY}px`,
              animation: `
                starFloat ${star.duration}s ease-in-out ${star.delay}s infinite,
                starTwinkle ${star.duration * 0.8}s ease-in-out ${star.twinkleDelay}s infinite
              `,
            }}
          />
        );
      })}
    </div>
  );
});

export default StarryBackground;
