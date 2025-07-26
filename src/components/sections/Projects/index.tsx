import clsx from 'clsx';
import MotionSection from '@/components/shared/MotionSection';
import Button from '@/components/shared/Button';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  return (
    <div className="space-y-6">
      {projects.map(({ title, description, tech, link, demo }, idx) => (
        <MotionSection
          key={title}
          tabIndex={0}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={clearHovered}
          className={clsx(
            'group flex flex-col py-8 px-4 rounded-md',
            'border-l-4 border-transparent transition-colors duration-300 ease-in-out',
            'hover:border-[var(--color-primary)]',
            isDimmed(idx) && '!opacity-50 transition-opacity duration-300 ease-in-out',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
          )}
        >
          <h3
            className={clsx(
              'subtitle text-[var(--color-text-muted)]',
              'group-hover:text-[var(--color-primary)] transition-colors',
            )}
          >
            {title}
          </h3>
          <div className="text-body text-[var(--color-muted)] mt-4 mb-2">{description}</div>
          <ul className="flex items-center space-x-2 text-[var(--color-muted)] group-hover:text-[var(--color-secondary)] transition-colors duration-200">
            {tech.map((t, i) => (
              <li key={t} className="flex items-center">
                {i > 0 && <span className="mx-1 select-none">·</span>}
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 justify-end mt-4">
            {/* Repository Link */}
            {link && link !== '#' ? (
              <Button href={link}>View Repo</Button>
            ) : link === '#' ? (
              <Button disabled variant="secondary">
                Private Repo
              </Button>
            ) : null}

            {/* Live Demo Link */}
            {demo && demo !== '#' && (
              <Button variant="secondary" href={demo}>
                View Live
              </Button>
            )}
          </div>
        </MotionSection>
      ))}
    </div>
  );
}
