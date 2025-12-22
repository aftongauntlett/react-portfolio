import { useState } from 'react';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { LinkButton } from '@/components/shared/LinkButton';
import { getLinkIcon } from '@/components/shared/LinkIcons';
import Tag from '@/components/shared/Tag';
import { projects } from '@/data/projects';
import { HiChevronDown } from 'react-icons/hi2';
import {
  TRANSITION_COLORS,
  TRANSITION_FAST,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
  TYPOGRAPHY,
  FOCUS_STYLES,
} from '@/constants/styles';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { useWillChange } from '@/hooks/useWillChange';

export default function ProjectsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { projectCard: projectVariants } = createMotionVariants(prefersReducedMotion);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);

  type ProjectItem = (typeof projects)[number];
  const primaryProjects = projects.slice(0, 3);
  const additionalProjects = projects.slice(3);

  const renderProject = (
    { title, status, description, tech, link, demo, gameDemo, external, lastUpdated }: ProjectItem,
    idx: number,
  ) => (
    <m.li
      key={title}
      variants={projectVariants}
      exit="hidden"
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
        className={clsx(
          TYPOGRAPHY.TEXT_DESCRIPTION,
          'mt-3 mb-3',
          FOCUS_STYLES.COMPACT,
          'transition-colors duration-300 group-hover:text-[var(--color-text)]',
        )}
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
      <div className="flex flex-wrap gap-3 justify-end mt-4" role="group" aria-label="Project links">
        {link && link !== '#' ? (
          <LinkButton type="github" href={link} variant="outline" color="primary">
            View Repo
          </LinkButton>
        ) : link === '#' ? (
          <Button disabled variant="outline" color="muted" aria-label="Source code not publicly available">
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
    </m.li>
  );
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
            'bg-[var(--color-surface)]',
          )}
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
    <div className="space-y-6">
      <m.ul
        className="space-y-6 list-none"
        aria-label="Portfolio projects"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        onViewportEnter={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        style={willChangeStyle}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
            },
          },
        }}
      >
        {primaryProjects.map((project, idx) => renderProject(project, idx))}
      </m.ul>

      {additionalProjects.length > 0 ? (
        <div aria-hidden={false}>
          <div className="flex items-center">
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
            <m.button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              aria-controls="more-projects"
              aria-expanded={showAllProjects}
              className={clsx(
                'group mx-3 inline-flex items-center gap-2 rounded-md px-3 py-2',
                'text-sm font-semibold',
                showAllProjects ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]',
                'border border-transparent transition-[color,background-color,border-color] duration-200',
                'bg-transparent hover:bg-[var(--color-line)]/35',
                'hover:border-[var(--color-primary)]/35',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
              )}
            >
              <span className="transition-colors duration-200 font-heading">{showAllProjects ? 'See less' : 'See more'}</span>
              <m.span
                className="grid place-items-center"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotate: showAllProjects ? 180 : 0,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { type: 'spring', stiffness: 240, damping: 20 }
                }
              >
                <HiChevronDown className="h-4 w-4 transition-colors duration-200" />
              </m.span>
            </m.button>
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
          </div>

          <m.div
            id="more-projects"
            className="mt-6"
            initial={prefersReducedMotion ? undefined : 'closed'}
            animate={prefersReducedMotion ? undefined : (showAllProjects ? 'open' : 'closed')}
            style={{ overflow: 'hidden', transformOrigin: 'top' }}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    open: {
                      opacity: 1,
                      scaleY: 1,
                      height: 'auto',
                      transition: {
                        duration: 0.25,
                        ease: 'easeOut',
                        when: 'beforeChildren',
                        height: { duration: 0 },
                      },
                    },
                    closed: {
                      opacity: 0,
                      scaleY: 0,
                      height: 0,
                      transition: {
                        duration: 0.22,
                        ease: 'easeOut',
                        when: 'afterChildren',
                        height: { duration: 0 },
                      },
                    },
                  }
            }
          >
                <m.ul
                  className="space-y-6 list-none"
                  aria-label="Additional portfolio projects"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
                      },
                    },
                  }}
                >
                  {additionalProjects.map((project, idx) => renderProject(project, idx + 3))}
                </m.ul>
              </m.div>
        </div>
      ) : null}
    </div>
  );
}
