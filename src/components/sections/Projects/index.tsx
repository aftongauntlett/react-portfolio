import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { LinkButton } from '@/components/shared/LinkButton';
import { getLinkIcon } from '@/components/shared/LinkIcons';
import TechTag from '@/components/shared/TechTag';
import { projects } from '@/data/projects';
import { sortTechLabels } from '@/constants/techChips';
import {
  TRANSITION_COLORS,
  TRANSITION_FAST,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
  TYPOGRAPHY,
} from '@/constants/styles';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { useWillChange } from '@/hooks/useWillChange';

export default function ProjectsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { projectCard: projectVariants } = createMotionVariants(prefersReducedMotion);
  const [isAnimating, setIsAnimating] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);

  type ProjectItem = (typeof projects)[number];

  const renderProject = (
    { title, status, description, tech, link, demo, playable }: ProjectItem,
    idx: number,
  ) => (
    <motion.li
      key={title}
      variants={projectVariants}
      exit="hidden"
      className={clsx(
        'group flex flex-col py-5 md:py-6 px-4 md:px-5 rounded-md ',
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
        className={clsx(
          TYPOGRAPHY.SUBTITLE,
          TEXT_PRIMARY_HOVER,
          'flex items-center gap-3 flex-wrap',
        )}
      >
        {title}
        {renderStatus(status)}
      </h3>
      <div
        aria-label={`Project description: ${description}`}
        className={clsx(
          TYPOGRAPHY.TEXT_DESCRIPTION,
          'mt-3 mb-2',
          'transition-colors duration-300 group-hover:text-[var(--color-text)]',
        )}
      >
        {description}
      </div>
      <div
        className={clsx(
          'flex flex-wrap gap-2 mb-3',
          TYPOGRAPHY.TEXT_SMALL,
          TEXT_MUTED_HOVER,
          TRANSITION_FAST,
        )}
        role="group"
        aria-label={`Technologies used in ${title}`}
      >
        {sortTechLabels(tech).map((t) => (
          <TechTag key={t} tech={t} size="xs" />
        ))}
      </div>
      <div
        className="flex flex-wrap gap-3 justify-end mt-3"
        role="group"
        aria-label="Project links"
      >
        {link ? (
          <LinkButton type="github" href={link} variant="link" color="primary">
            View Repo
          </LinkButton>
        ) : (
          <Button disabled variant="link" color="muted" icon={getLinkIcon('github')}>
            Private
          </Button>
        )}

        {demo ? (
          <LinkButton type="external" href={demo} variant="link" color="secondary">
            {playable ? 'Play Game' : 'View Live'}
          </LinkButton>
        ) : (
          <Button disabled variant="link" color="muted">
            Coming Soon
          </Button>
        )}
      </div>
    </motion.li>
  );
  const renderStatus = (status: ProjectItem['status']) => {
    const isProduction = status === 'Production';

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
    <div className={COMPONENT_SPACING.STACK_STANDARD}>
      <motion.ul
        className={clsx(COMPONENT_SPACING.STACK_STANDARD, 'list-none')}
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
        {projects.map((project, idx) => renderProject(project, idx))}
      </motion.ul>
    </div>
  );
}
