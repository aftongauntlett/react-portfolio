import { useMemo } from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';

const aboutParagraphs = [
  "I'm Afton, a senior frontend developer with 6+ years building clean, accessible interfaces. I've led frontend work at Booz Allen Hamilton across React and TypeScript codebases, delivered web redesigns for non-profits through Gauntlet Designs, and built for government clients across the DC area.",
  "I work primarily in React, Next.js, and TypeScript but move between frameworks depending on what a project needs. I've led platform migrations, built design systems, and worked accessibility and 508 compliance into projects across distributed teams.",
  "Before tech, I worked in medical environments where precision and accountability weren't optional. That stuck. Outside of work I build small games and UI prototypes, mostly to test interaction ideas I can't always try in production.",
];

export default function AboutSection() {
  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-slate-900 dark:text-white font-normal"
          tabIndex={0}
          aria-label={`About paragraph ${index + 1} of ${aboutParagraphs.length}`}
        >
          {paragraph}
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
