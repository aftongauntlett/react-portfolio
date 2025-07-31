import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from '@/context/ThemeContext';

type LottieHelloProps = {
  className?: string;
  opacity?: number;
  speed?: number;
  planetColor?: 'secondary' | 'muted';
};

export default function LottieHello({
  className = '',
  opacity = 0.3,
  speed = 0.5,
  planetColor = 'secondary',
}: LottieHelloProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const { theme } = useTheme();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const createThemedAnimation = async () => {
      // Import the base animation
      const baseData = await import('../../../assets/galaxy.json');

      // Get current theme colors
      const root = document.documentElement;
      const primaryHsl = getComputedStyle(root).getPropertyValue('--color-primary').trim();
      const planetHsl =
        planetColor === 'secondary'
          ? getComputedStyle(root).getPropertyValue('--color-secondary').trim()
          : getComputedStyle(root).getPropertyValue('--color-muted').trim();

      // Convert HSL to RGB arrays for Lottie
      const primaryRgb = hslToRgbArray(primaryHsl);
      const planetRgb = hslToRgbArray(planetHsl);

      // Create themed animation data
      const themedData = JSON.parse(JSON.stringify(baseData.default));
      updateLottieColors(themedData, primaryRgb, planetRgb);

      setAnimationData(themedData);
    };

    createThemedAnimation();
  }, [theme, planetColor]);

  useEffect(() => {
    const lottie = lottieRef.current;
    if (lottie && animationData) {
      lottie.setSpeed(speed);
      lottie.play();
    }
  }, [speed, animationData]);

  const hslToRgbArray = (hsl: string): number[] => {
    // Extract HSL values from CSS hsl() format
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [0.4, 0.8, 0.7, 1]; // fallback

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3), 1];
  };

  const updateLottieColors = (data: unknown, primaryRgb: number[], planetRgb: number[]) => {
    // Recursively update colors in the animation data
    const updateColors = (obj: unknown): void => {
      if (Array.isArray(obj)) {
        obj.forEach(updateColors);
      } else if (obj && typeof obj === 'object') {
        const objRecord = obj as Record<string, unknown>;

        // Update stroke colors (orbital lines)
        if (objRecord.c && typeof objRecord.c === 'object') {
          const colorObj = objRecord.c as Record<string, unknown>;
          if (Array.isArray(colorObj.k) && colorObj.k.length === 4) {
            if (JSON.stringify(colorObj.k) === JSON.stringify([0, 0.8667, 0.702, 1])) {
              colorObj.k = primaryRgb;
            }
            // Update planet fills (white dots)
            if (JSON.stringify(colorObj.k) === JSON.stringify([1, 1, 1, 1])) {
              colorObj.k = planetRgb;
            }
          }
        }

        Object.values(objRecord).forEach(updateColors);
      }
    };

    updateColors(data);
  };

  if (!animationData) {
    return <div className={`${className} animate-pulse bg-[var(--color-line)] rounded`} />;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={true}
      autoplay={true}
      className={`lottie-smooth lottie-themed ${className}`}
      style={{
        width: '100%',
        height: '100%',
        opacity: opacity,
        pointerEvents: 'none',
        filter: 'blur(0.2px)',
      }}
    />
  );
}
