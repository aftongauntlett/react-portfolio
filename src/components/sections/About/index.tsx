import { useMemo, useState, lazy, Suspense, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { TYPOGRAPHY, FOCUS_STYLES, TEXT_COMBINATIONS } from '@/constants/styles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import clsx from 'clsx';

// Lazy load the Lottie animation only when needed
const LottieHello = lazy(() => import('./LottieHello'));

const aboutParagraphs = [
  "I'm {Afton} - a frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and {Tailwind}. I've led frontend architecture at {Fortune 500} firms like {Booz Allen Hamilton} and built custom web platforms for clients through my business, {Gauntlet Designs}.",
  "I've shipped large {React} apps, migrated legacy {Angular} and {Node.js} systems, built reusable {component libraries}, and improved {accessibility} and {performance} across distributed teams. I'm known for simplifying complex UI problems and supporting teammates through clear {communication} and {documentation}.",
  'Before web development I worked in places that taught me how to learn fast. I spent time in law offices, a {biohazard lab}, and a vintage shop that ran on {century-old machinery}. I once had to figure out an old {IBM AS/400} system from scratch, translating manuals line by line just to keep it running. That same curiosity and persistence still guide how I build today.',
];

// Move outside component to prevent recreation on every render
const renderHighlightedText = (text: string) => {
  return text.split(/(\{[^}]+\})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span key={index} className={clsx('font-semibold', TYPOGRAPHY.TEXT_PRIMARY)}>
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function AboutSection() {
  const [planetColor] = useState<'secondary' | 'muted'>('secondary');
  const [shouldLoadLottie, setShouldLoadLottie] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Memoize sparkle positions to prevent recreation on every render
  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        key: i,
        left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
        top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 2}s`,
      })),
    [],
  );

  // Lazy load Lottie animation when hero section comes into view for better initial page load performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadLottie(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(TEXT_COMBINATIONS.BODY_RELAXED, FOCUS_STYLES.PRIMARY)}
          tabIndex={0}
          aria-label={`About paragraph ${index + 1} of ${aboutParagraphs.length}`}
        >
          {renderHighlightedText(paragraph)}
        </p>
      )),
    [],
  );

  return (
    <div className="w-full">
      {/* Hero Section with Lottie Animation - Responsive spacing */}
      <div
        ref={heroRef}
        className="relative flex justify-center items-center h-56 sm:h-64 md:h-80 lg:h-96 w-full mb-12 sm:mb-16 md:mb-20 lg:mb-24"
      >
        {theme === 'light' && !prefersReducedMotion && (
          <>
            {/* Twinkling Sparkles */}
            <div className="absolute inset-0 flex justify-center items-center" aria-hidden="true">
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.key}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                  style={{
                    left: sparkle.left,
                    top: sparkle.top,
                    animation: `twinkle ${sparkle.duration} ease-in-out infinite`,
                    animationDelay: sparkle.delay,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Background Lottie Animation - Only load when visible */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-full h-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg aspect-square mx-auto">
            {shouldLoadLottie ? (
              <Suspense fallback={<div className="w-full h-full" aria-hidden="true" />}>
                <LottieHello
                  opacity={0.15}
                  speed={0.3}
                  planetColor={planetColor}
                  className="w-full h-full"
                />
              </Suspense>
            ) : (
              <div className="w-full h-full" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Foreground Hello Text */}
        <div className="relative z-20 text-center px-4">
          {/* Subtle backdrop for improved contrast */}
          <div
            className="absolute inset-0 -m-4 bg-[var(--color-background)]/40 backdrop-blur-sm rounded-2xl"
            aria-hidden="true"
          />
          <h1
            className={clsx(TYPOGRAPHY.TITLE, 'hello-gradient', 'relative')}
            style={{
              textShadow:
                '0 2px 10px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
          >
            Hello
          </h1>
        </div>
      </div>

      {/* Story Content Section */}
      <div className="mx-auto">
        <h2 className="sr-only">About Me</h2>
        <div className="space-y-6">{renderedParagraphs}</div>
      </div>
    </div>
  );
}
