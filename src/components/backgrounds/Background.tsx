import { useTheme } from '../../context/ThemeContext';
import StarryBackground from './StarryBackground';
import GeometricBackground from './GeometricBackground';

export default function Background() {
  const { theme } = useTheme();

  // Show stars in dark mode, geometric shapes in light mode
  if (theme === 'dark') {
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
        <StarryBackground color="rgba(255,255,255,0.48)" shadowColor="rgba(255,255,255,0.18)" />
      </>
    );
  }

  // Light mode - geometric shapes
  return (
    <>
      {/* Solid background for light mode */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -10,
          backgroundColor: 'var(--color-background)',
        }}
      />
      <GeometricBackground />
    </>
  );
}
