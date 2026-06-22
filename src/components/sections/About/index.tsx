import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';
import Tag from '@/components/shared/Tag';

const HIGHLIGHTS = ['6 years experience', 'Design systems', 'Accessible UI', 'Federal & commercial'];

export default function AboutSection() {
  return (
    <div className="w-full">
      {/* Hero Section - Responsive spacing */}
      <div className="relative flex flex-col justify-center items-start w-full mb-4 sm:mb-6">
        <div className="relative w-full text-left pt-8 pb-4 sm:pt-12 sm:pb-6 md:pt-16 md:pb-8 lg:pt-4">
          {/* Subtle backdrop for improved contrast */}
          <div
            className={clsx(
              'absolute inset-0 -m-4 rounded-2xl bg-transparent',
              'dark:bg-[var(--color-background)]/40 dark:backdrop-blur-sm',
            )}
            aria-hidden="true"
          />
          <h1
            className={clsx(
              TYPOGRAPHY.TITLE,
              'hero-heading',
              'relative leading-tight pb-[0.15em]',
            )}
          >
            Afton Gauntlett
          </h1>
          <p
            className={clsx(
              TYPOGRAPHY.HEADING_3,
              'relative mt-1 text-[var(--color-secondary)]',
            )}
          >
            Frontend Engineer
          </p>
          <p
            className={clsx(
              TYPOGRAPHY.TEXT_DESCRIPTION,
              'relative mt-4 max-w-2xl text-[var(--color-text)]',
            )}
          >
            I&apos;ve led frontend migrations, built design systems from scratch, and mentored
            engineers on accessible component architecture. I bring both technical leadership and
            hands-on execution to a team.
          </p>
          <div
            className="relative mt-6 flex flex-wrap gap-2 sm:mt-7"
            aria-label="Career highlights"
          >
            {HIGHLIGHTS.map((highlight) => (
              <Tag key={highlight} variant="neutral" size="small">
                {highlight}
              </Tag>
            ))}
          </div>
        </div>

        {/* Gradient border below opener */}
        <div className="hello-gradient h-1 rounded-full w-[min(60%,300px)]" aria-hidden="true" />
      </div>
    </div>
  );
}
