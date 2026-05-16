import { useMemo } from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';

const aboutParagraphs = [
  "I'm Afton — a software engineer and designer hybrid with six years of professional experience across Fortune 500 contracts, government clients, early-stage startups, and nonprofits. I specialize in building polished, user-friendly web applications with React and TypeScript, but I'm always eager to expand my skill set and take on new challenges.",
  "My work spans the full product lifecycle. I've done user research, wireframing, led platform migrations, and deployed to production in secure environments. I'm comfortable wherever the work takes me, but I lean towards the frontend. It's where I get to be both precise and creative.",
  'I care about two things in equal measure: interfaces that feel effortless to the people using them, and codebases that feel clear to the engineers who come after me. Before tech, I worked in medical and legal fields, where I developed a deep appreciation for clarity in communication. I bring that same mindset to my work as a software engineer.',
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
