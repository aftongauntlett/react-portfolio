import clsx from 'clsx';
import { m } from 'framer-motion';
import MotionSection from '@/components/shared/MotionSection';
import { Button } from '@/components/shared/Button';
import { LinkButton } from '@/components/shared/LinkButton';
import { getLinkIcon } from '@/components/shared/LinkIcons';
import Tag from '@/components/shared/Tag';
import { projects } from '@/data/projects';
import {
  TRANSITION_COLORS,
  TRANSITION_FAST,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
  TYPOGRAPHY,
  FOCUS_STYLES,
} from '@/constants/styles';
import { createMotionVariants } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

export default function ProjectsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { projectCard: projectVariants } = createMotionVariants(prefersReducedMotion);
  const renderStatus = (status: string, lastUpdated?: string, external?: boolean) => {
    const isProduction = status === 'Production';
    const isCollection = status === 'Collection';

    // For external collections, show last updated instead of status
    if (isCollection && lastUpdated) {
      return (
        <span
          className={clsx(
            TYPOGRAPHY.TEXT_XS,
            'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
            TYPOGRAPHY.TEXT_MUTED,
            'flex items-center gap-1',
          )}
          style={{
            backgroundColor: 'var(--color-muted)/10',
          }}
        >
          {external && getLinkIcon('external')}
          Updated {lastUpdated}
        </span>
      );
    }

    return (
      <span
        className={clsx(
          TYPOGRAPHY.TEXT_XS,
          'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
          isProduction
            ? 'text-[var(--color-status-production)]'
            : 'text-[var(--color-status-development)]',
        )}
        style={{
          backgroundColor: isProduction
            ? 'var(--color-status-production-bg)'
            : 'var(--color-status-development-bg)',
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <m.ul
      className="space-y-6 list-none"
      aria-label="Portfolio projects"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px',
        amount: 0.1,
      }}
      style={{ willChange: 'auto' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
          },
        },
      }}
    >
      {/* All Projects */}
      {projects.map(
        (
          { title, status, description, tech, link, demo, gameDemo, external, lastUpdated },
          idx,
        ) => (
          <MotionSection
            key={title}
            as="li"
            variants={projectVariants}
            className={clsx(
              'group flex flex-col py-6 md:py-8 px-3 md:px-4 rounded-md ',
              // Left border only on desktop
              'md:border-l-4 md:border-transparent',
              TRANSITION_COLORS,
              'ease-in-out md:hover:border-[var(--color-primary)]',
              // Add subtle touch feedback for mobile
              'active:bg-[var(--color-primary)]/5 [@media(hover:hover)]:active:bg-transparent',
            )}
            aria-labelledby={`project-title-${idx}`}
          >
            <h3
              id={`project-title-${idx}`}
              tabIndex={0}
              className={clsx(
                TYPOGRAPHY.SUBTITLE,
                TEXT_PRIMARY_HOVER,
                FOCUS_STYLES.COMPACT,
                'flex items-center gap-3 flex-wrap',
              )}
            >
              {title}
              {renderStatus(status, lastUpdated, external)}
            </h3>
            <div
              tabIndex={0}
              aria-label={`Project description: ${description}`}
              role="text"
              className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'mt-3 mb-3', FOCUS_STYLES.COMPACT)}
            >
              {description}
            </div>
            <div
              className={clsx(
                'flex flex-wrap gap-2 mb-4',
                TYPOGRAPHY.TEXT_SMALL,
                TEXT_MUTED_HOVER,
                TRANSITION_FAST,
              )}
              role="group"
              aria-label={`Technologies used in ${title}`}
            >
              {tech.map((t) => (
                <Tag key={t} variant="muted" size="xs">
                  {t}
                </Tag>
              ))}
            </div>
            <div
              className="flex flex-wrap gap-3 justify-end mt-4"
              role="group"
              aria-label="Project links"
            >
              {link && link !== '#' ? (
                <LinkButton type="github" href={link} variant="outline" color="primary">
                  View Repo
                </LinkButton>
              ) : link === '#' ? (
                <Button
                  disabled
                  variant="outline"
                  color="muted"
                  aria-label="Source code not publicly available"
                >
                  Private Repo
                </Button>
              ) : null}

              {demo && demo !== '#' && (
                <LinkButton type="external" href={demo} variant="outline" color="secondary">
                  {external ? 'View Live' : 'View Live'}
                </LinkButton>
              )}

              {gameDemo && (
                <LinkButton type="external" href={gameDemo} variant="solid" color="primary">
                  Play Game
                </LinkButton>
              )}
            </div>
          </MotionSection>
        ),
      )}
    </m.ul>
  );
}
