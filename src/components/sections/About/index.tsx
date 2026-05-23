import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';

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
              'hello-gradient',
              'relative text-balance leading-tight pb-[0.15em]',
            )}
          >
            <span className="block">Engineering precision.</span>
            <span className="block">Design sensibility.</span>
          </h1>
          <p
            className={clsx(
              TYPOGRAPHY.TEXT_DESCRIPTION,
              'relative mt-6 sm:mt-7 w-full max-w-2xl text-[var(--color-text)]',
            )}
          >
            Frontend engineer with six years of experience in design systems, accessible UI, and
            component architecture. I have led migrations, built from scratch, and shipped at scale
            on federal and commercial contracts.
          </p>
        </div>

        {/* Gradient border below opener */}
        <div className="hello-gradient h-1 rounded-full w-[min(60%,300px)]" aria-hidden="true" />
      </div>
      <hr
        aria-hidden="true"
        className="w-full"
        style={{ border: 'none', borderTop: '1px solid var(--color-line)', opacity: 0.5 }}
      />
    </div>
  );
}
