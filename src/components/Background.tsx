import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const STAR_COUNT = 18;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Star = ({
  x,
  y,
  size,
  delay,
  duration,
  dx,
  dy,
  twinkleDelay,
  color = 'rgba(255,255,255,0.48)',
  shadowColor = 'rgba(255,255,255,0.18)',
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
  twinkleDelay: number;
  color?: string;
  shadowColor?: string;
}) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${size / 2}px ${shadowColor}`,
    }}
    animate={{
      opacity: [0.18, 0.7, 0.18, 0.7, 0.18],
      scale: [1, 1.2, 1, 1.1, 1],
      x: [0, dx],
      y: [0, dy],
    }}
    transition={{
      opacity: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: duration * 0.7,
        delay: twinkleDelay,
      },
      scale: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: duration * 0.7,
        delay: twinkleDelay,
      },
      x: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration,
        delay,
      },
      y: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration,
        delay,
      },
    }}
  />
);

export default function Background() {
  const { theme } = useTheme();

  // Only show stars in dark mode, no background in light mode
  if (theme !== 'dark') {
    return null;
  }

  const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
    const angle = random(0, 2 * Math.PI);
    const distance = random(30, 70); // percent of viewport
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    return (
      <Star
        key={i}
        x={random(0, 100)}
        y={random(0, 100)}
        size={random(1.5, 3.5)}
        delay={random(0, 6)}
        duration={random(12, 22)}
        dx={dx}
        dy={dy}
        twinkleDelay={random(0, 8)}
        color="rgba(255,255,255,0.48)"
        shadowColor="rgba(255,255,255,0.18)"
      />
    );
  });

  return (
    <>
      {/* Solid background for dark mode */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -10,
          backgroundColor: 'var(--color-background)',
        }}
      />
      {/* Starry animation */}
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
        {stars}
      </div>
    </>
  );
}
