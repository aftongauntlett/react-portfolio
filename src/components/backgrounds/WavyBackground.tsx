import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Configuration for clean, simple waves
const WAVE_CONFIG = {
  opacity: 0.7, // More visible behind sidenav
  sparkleOpacity: 0.8, // Brighter sparkles
  sparkleCount: 35, // Good amount of particles
  waveSpeed: 25, // Slower, more elegant motion
  sparkleSpeed: 4, // Gentle sparkle animation
  sidenavWidth: 288,
};

// Elegant PS3/XMB colors
const WAVE_COLORS = {
  primary: '220, 65%, 75%', // Soft blue with PS3 vibe
  secondary: '190, 60%, 70%', // Soft teal
  tertiary: '245, 55%, 68%', // Soft purple
};

// Fine dust-like sparkles
const Sparkle = ({
  delay,
  x,
  y,
  size = 1,
}: {
  delay: number;
  x: number;
  y: number;
  size?: number;
}) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `rgba(255, 255, 255, ${WAVE_CONFIG.sparkleOpacity})`,
      boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, ${WAVE_CONFIG.sparkleOpacity * 0.5})`,
    }}
    animate={{
      opacity: [0, WAVE_CONFIG.sparkleOpacity, 0],
      scale: [0.3, 1.2, 0.3],
    }}
    transition={{
      duration: WAVE_CONFIG.sparkleSpeed,
      delay,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    }}
  />
);

export default function WavyBackground() {
  // Generate fine dust-like sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: WAVE_CONFIG.sparkleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * (WAVE_CONFIG.sidenavWidth - 20) + 10,
      y: Math.random() * 90 + 5,
      delay: Math.random() * WAVE_CONFIG.sparkleSpeed * 2,
      size: Math.random() * 1.5 + 0.5, // Very fine particles (0.5-2px)
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1, // Behind sidenav content but above background
        overflow: 'hidden',
      }}
    >
      {/* Simple flowing ribbons using CSS transforms */}

      {/* Left ribbon - wider and more centered */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, 
            hsla(${WAVE_COLORS.primary}, ${WAVE_CONFIG.opacity}) 0%,
            hsla(${WAVE_COLORS.primary}, ${WAVE_CONFIG.opacity * 0.3}) 50%, 
            transparent 100%)`,
          width: '120px', // Much wider
          left: '40px', // Start more to the right
          transformOrigin: 'left center',
        }}
        animate={{
          x: [0, 15, -10, 20, 0],
          scaleX: [1, 1.1, 0.9, 1.05, 1],
          rotateZ: [0, 2, -1, 1.5, 0],
        }}
        transition={{
          duration: WAVE_CONFIG.waveSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center ribbon - wider */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(60deg, 
            transparent 0%,
            hsla(${WAVE_COLORS.secondary}, ${WAVE_CONFIG.opacity}) 30%,
            hsla(${WAVE_COLORS.secondary}, ${WAVE_CONFIG.opacity * 0.8}) 70%, 
            transparent 100%)`,
          width: '140px', // Much wider
          left: '100px', // More centered
          transformOrigin: 'center center',
        }}
        animate={{
          x: [-5, 10, -15, 8, -5],
          scaleX: [1, 0.95, 1.1, 0.98, 1],
          rotateZ: [0, -1.5, 1, -0.8, 0],
        }}
        transition={{
          duration: WAVE_CONFIG.waveSpeed * 1.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Right ribbon - wider */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(-45deg, 
            transparent 0%,
            hsla(${WAVE_COLORS.tertiary}, ${WAVE_CONFIG.opacity * 0.7}) 40%,
            hsla(${WAVE_COLORS.tertiary}, ${WAVE_CONFIG.opacity}) 80%, 
            hsla(${WAVE_COLORS.tertiary}, ${WAVE_CONFIG.opacity * 0.4}) 100%)`,
          width: '130px', // Much wider
          right: '10px', // Closer to the right edge
          transformOrigin: 'right center',
        }}
        animate={{
          x: [0, -12, 8, -15, 0],
          scaleX: [1, 1.08, 0.92, 1.02, 1],
          rotateZ: [0, -2, 1.2, -1, 0],
        }}
        transition={{
          duration: WAVE_CONFIG.waveSpeed * 1.7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Fine dust sparkles */}
      <div className="absolute inset-0">
        {sparkles.map((sparkle) => (
          <Sparkle
            key={sparkle.id}
            x={sparkle.x}
            y={sparkle.y}
            delay={sparkle.delay}
            size={sparkle.size}
          />
        ))}
      </div>
    </div>
  );
}
