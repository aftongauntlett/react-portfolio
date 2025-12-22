import { useMemo } from 'react';
import MotionSection from '@/components/shared/MotionSection';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
import clsx from 'clsx';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const aboutParagraphs = [
  "I'm {Afton} - a frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and {Tailwind}. I've led frontend architecture at {Fortune 500} firms like {Booz Allen Hamilton} and built custom web platforms for clients through my business, {Gauntlet Designs}.",
  "I've shipped large React apps, migrated legacy Angular and Node.js systems, built reusable component libraries, and improved accessibility and performance across distributed teams. I'm known for simplifying complex UI problems and supporting teammates through clear communication and documentation.",
  'Before web development I worked in places that taught me how to learn fast. I spent time in law offices, a biohazard lab, and a vintage shop that ran on century-old machinery. I once had to figure out an old IBM AS/400 system from scratch, translating manuals line by line just to keep it running. That same curiosity and persistence still guide how I build today.',
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
  const prefersReducedMotion = usePrefersReducedMotion();

  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'text-description-strong', FOCUS_STYLES.PRIMARY)}
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
      {/* Hero Section - Responsive spacing */}
      <MotionSection
        disableAnimation={prefersReducedMotion}
        className="relative flex flex-col justify-center items-center w-full mb-8 sm:mb-10"
      >
        {/* Foreground Hello Text */}
        <div className="relative text-center px-4 py-8 sm:py-12 md:py-16">
          {/* Subtle backdrop for improved contrast */}
          <div
            className={clsx(
              'absolute inset-0 -m-4 rounded-2xl bg-transparent',
              'dark:bg-[var(--color-background)]/40 dark:backdrop-blur-sm',
            )}
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
        
        {/* Gradient border below Hello */}
        <div 
          className="hello-gradient h-1 rounded-full w-[min(60%,300px)]"
          aria-hidden="true"
        />
      </MotionSection>

      {/* About Section */}
      <MotionSection disableAnimation={prefersReducedMotion} delay={0.05} className="mx-auto">
        <div className="space-y-6">{renderedParagraphs}</div>
      </MotionSection>
    </div>
  );
}
