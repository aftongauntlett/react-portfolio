import { useEffect, useState } from 'react';
import StarryBackground from './StarryBackground';

export default function Background() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {/* Solid background */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -10,
          backgroundColor: 'var(--color-background)',
        }}
      />
      {/* Starry animation - skip mounting if user prefers reduced motion */}
      {!prefersReducedMotion && <StarryBackground />}
    </>
  );
}
