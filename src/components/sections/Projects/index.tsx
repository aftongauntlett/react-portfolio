import clsx from 'clsx';
import MotionSection from '@/components/shared/MotionSection';
import Button from '@/components/shared/Button';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { projects } from '@/data/projects';
import {
  TRANSITION_COLORS,
  TRANSITION_FAST,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
} from '@/constants/styles';

export default function ProjectsSection() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  return (
    <div className="space-y-6" role="list" aria-label="Portfolio projects">
      {projects.map(({ title, description, tech, link, demo }, idx) => (
        <MotionSection
          key={title}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={clearHovered}
          className={clsx(
            'group flex flex-col py-6 md:py-8 px-3 md:px-4 rounded-md',
            'border-l-4 border-transparent',
            TRANSITION_COLORS,
            'ease-in-out hover:border-[var(--color-primary)]',
            isDimmed(idx) && '!opacity-50 transition-opacity duration-300 ease-in-out',
          )}
          role="listitem"
          aria-labelledby={`project-title-${idx}`}
        >
          <h3
            id={`project-title-${idx}`}
            tabIndex={0}
            className={clsx(
              'text-lg font-semibold',
              TEXT_PRIMARY_HOVER,
              'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1',
              'focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
            )}
          >
            {title}
          </h3>
          <div
            tabIndex={0}
            aria-label={`Project description: ${description}`}
            role="text"
            className={clsx(
              'text-body text-[var(--color-muted)] mt-3 mb-3',
              'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1',
              'focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
            )}
          >
            {description}
          </div>
          <div
            className={clsx(
              'flex flex-wrap gap-2 text-sm',
              TEXT_MUTED_HOVER,
              TRANSITION_FAST,
              'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1',
              'focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
            )}
            role="group"
            aria-label={`Technologies used in ${title}`}
            tabIndex={0}
          >
            {tech.map((t, i) => (
              <span key={t} className="shrink-0 break-words">
                {i > 0 && <span className="mx-1 text-[var(--color-muted)]">·</span>}
                {t}
              </span>
            ))}
          </div>
          <div
            className="flex flex-wrap gap-3 justify-end mt-4"
            role="group"
            aria-label="Project links"
          >
            {link && link !== '#' ? (
              <Button href={link} aria-label={`View ${title} source code on GitHub`}>
                View Repo
              </Button>
            ) : link === '#' ? (
              <Button disabled variant="secondary" aria-label="Source code not publicly available">
                Private Repo
              </Button>
            ) : null}

            {demo && demo !== '#' && (
              <Button variant="secondary" href={demo} aria-label={`View live demo of ${title}`}>
                View Live
              </Button>
            )}
          </div>
        </MotionSection>
      ))}
    </div>
  );
}
