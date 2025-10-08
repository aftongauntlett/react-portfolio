import { useMemo, useState, lazy, Suspense, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { TYPOGRAPHY, FOCUS_STYLES, TEXT_COMBINATIONS } from '@/constants/styles';
import clsx from 'clsx';

// Lazy load the Lottie animation only when needed
const LottieHello = lazy(() => import('./LottieHello'));

const aboutParagraphs = [
  "I'm {Afton} - a frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and {Tailwind}. I've led frontend architecture at {Fortune 500} firms like {Booz Allen Hamilton} and built custom web platforms for clients through my business, {Gauntlet Designs}.",
  "I've shipped large {React} apps, migrated legacy {Angular} and {Node.js} systems, built reusable {component libraries}, and improved {accessibility} and {performance} across distributed teams. I'm known for simplifying complex UI problems and supporting teammates through clear {communication} and {documentation}.",
  'Before web development I worked in places that taught me how to learn fast. I spent time in law offices, a {biohazard lab}, and a vintage shop that ran on {century-old machinery}. I once taught myself the {AS400} and translated manuals line by line just to keep things running. That same curiosity and persistence still guide how I build today.',
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
        className="relative flex justify-center items-center min-h-[50px] w-full my-16 md:my-32 lg:my-48"
      >
        {theme === 'light' && (
          <>
            {/* Twinkling Sparkles */}
            <div className="absolute inset-0 flex justify-center items-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                  style={{
                    left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
                    top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Background Lottie Animation - Only load when visible */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {shouldLoadLottie ? (
              <Suspense fallback={<div className="w-full h-full" />}>
                <LottieHello
                  opacity={0.15}
                  speed={0.3}
                  planetColor={planetColor}
                  className="w-full h-full"
                />
              </Suspense>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        </div>

        {/* Foreground Hello Text */}
        <div className="relative z-20 text-center">
          <h1 className={clsx(TYPOGRAPHY.TITLE, 'hello-gradient drop-shadow-2xl')}>Hello</h1>
        </div>
      </div>

      {/* Story Content Section */}
      <div className="mx-auto">
        <h2 className="sr-only">About Me</h2>
        <div className="space-y-6 mb-16">{renderedParagraphs}</div>
      </div>
    </div>
  );
}
