import clsx from 'clsx';
import { Button } from '@/components/shared/Button';
import { LinkButton } from '@/components/shared/LinkButton';
import { getLinkIcon } from '@/components/shared/LinkIcons';
import { projects } from '@/data/projects';
import { TYPOGRAPHY } from '@/constants/styles';
import { COMPONENT_SPACING } from '@/constants/spacing';
import SectionEntryList from '@/components/shared/SectionEntryList';

export default function ProjectsSection() {
  type ProjectItem = (typeof projects)[number];
  const projectLinkBaseClass = '!border-b-0 hover:!border-b-0 !text-[var(--color-muted)]';

  const renderProject = (
    { title, status, description, link, demo, playable }: ProjectItem,
    idx: number,
  ) => (
    <article
      aria-labelledby={`project-title-${idx}`}
      className="flex flex-col py-3 md:py-4 px-1 md:px-2"
    >
      <header className="flex items-start justify-between gap-3">
        <h3
          id={`project-title-${idx}`}
          className={clsx(
            TYPOGRAPHY.SUBTITLE,
            'text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]',
          )}
        >
          {title}
        </h3>
        <div className="shrink-0">{renderStatus(status)}</div>
      </header>
      <div
        aria-label={`Project description: ${description}`}
        className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'mt-3 mb-2')}
      >
        {description}
      </div>
      <div
        className="flex flex-wrap gap-3 justify-start mt-3"
        role="group"
        aria-label="Project links"
      >
        {link ? (
          <LinkButton
            type="github"
            href={link}
            variant="link"
            color="primary"
            className={clsx(projectLinkBaseClass, 'hover:!text-[var(--color-primary)]')}
          >
            View Repo
          </LinkButton>
        ) : (
          <Button
            disabled
            variant="link"
            color="muted"
            icon={getLinkIcon('github')}
            className={projectLinkBaseClass}
          >
            Private
          </Button>
        )}

        {demo ? (
          <LinkButton
            type="external"
            href={demo}
            variant="link"
            color="secondary"
            className={clsx(projectLinkBaseClass, 'hover:!text-[var(--color-secondary)]')}
          >
            {playable ? 'Play Game' : 'View Live'}
          </LinkButton>
        ) : (
          <Button disabled variant="link" color="muted" className={projectLinkBaseClass}>
            Coming Soon
          </Button>
        )}
      </div>
    </article>
  );
  const renderStatus = (status: ProjectItem['status']) => {
    const statusColorClass =
      status === 'Production'
        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
        : 'border-[var(--color-secondary)] text-[var(--color-secondary)]';

    return (
      <span
        className={clsx(
          TYPOGRAPHY.TEXT_XS,
          'font-medium px-2 py-1 rounded border bg-transparent',
          statusColorClass,
        )}
      >
        {status}
      </span>
    );
  };

  return (
    <div className={COMPONENT_SPACING.STACK_STANDARD}>
      <SectionEntryList
        items={projects}
        ariaLabel="Portfolio projects"
        listClassName="list-none"
        getItemKey={(project) => project.title}
        renderItem={(project, idx) => renderProject(project, idx)}
      />
    </div>
  );
}
