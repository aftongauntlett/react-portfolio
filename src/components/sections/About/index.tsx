import { useMemo } from 'react';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
import clsx from 'clsx';

const aboutParagraphs = [
  "I'm {Afton}, a frontend engineer with {6+ years} of experience building clean, accessible interfaces with {React}, {TypeScript}, and {Tailwind}. I've led frontend work at {Booz Allen Hamilton}, shipped production apps at startups, and delivered web redesigns for non-profits through {Gauntlet Designs}.",
  "Most of my time goes into {React}, {Next.js}, {TypeScript}, and {Supabase}, building full production apps where performance and structure matter. I've led migrations off legacy systems, built shared design systems, and improved accessibility standards across distributed teams. More recently I've been working with {AI workflows and agents} as part of how I build and ship.",
  'Outside of work I spend time on animation and interaction design through small game projects and UI prototypes. Before web development I worked in places that taught me how to learn fast, from a biohazard lab to a vintage shop running century-old machinery. That same curiosity still guides how I build today.',
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
  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(
            TYPOGRAPHY.TEXT_DESCRIPTION,
            'text-description-strong',
            FOCUS_STYLES.PRIMARY,
          )}
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
      <div className="relative flex flex-col justify-center items-center w-full mb-8 sm:mb-10">
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
        <div className="hello-gradient h-1 rounded-full w-[min(60%,300px)]" aria-hidden="true" />
      </div>

      {/* About Section */}
      <div className="mx-auto">
        <div className="space-y-6">{renderedParagraphs}</div>
      </div>
    </div>
  );
}
