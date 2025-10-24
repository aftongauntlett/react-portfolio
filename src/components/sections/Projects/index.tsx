import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import MotionSection from '@/components/shared/MotionSection';
import { Button } from '@/components/shared/Button';
import Tag from '@/components/shared/Tag';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { projects } from '@/data/projects';
import {
  TRANSITION_COLORS,
  TRANSITION_OPACITY,
  TRANSITION_FAST,
  TEXT_PRIMARY_HOVER,
  TEXT_MUTED_HOVER,
  TYPOGRAPHY,
  FOCUS_STYLES,
} from '@/constants/styles';

export default function ProjectsSection() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  const handleInteraction = (idx: number) => {
    // On touch devices, toggle the hover state instead of just setting it
    // This prevents the "stuck dimmed" issue on mobile
    if ('ontouchstart' in window) {
      setHovered(idx);
      // Auto-clear after 3 seconds on touch devices
      setTimeout(() => clearHovered(), 3000);
    } else {
      setHovered(idx);
    }
  };

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
          {external && <FaExternalLinkAlt className="w-3 h-3" />}
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

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const, // Consistent with rest of app
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      role="list"
      aria-label="Portfolio projects"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px',
        amount: 0.1, // Performance optimization
      }}
      // Performance optimization
      style={{ willChange: 'auto' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08, // Slightly faster for better perceived performance
          },
        },
      }}
    >
      {/* All Projects */}
      {projects.map(
        (
          { title, status, description, tech, link, demo, external, lastUpdated, postMortem },
          idx,
        ) => (
          <MotionSection
            key={title}
            variants={projectVariants}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={clearHovered}
            onClick={() => 'ontouchstart' in window && handleInteraction(idx)}
            className={clsx(
              'group flex flex-col py-6 md:py-8 px-3 md:px-4 rounded-md ',
              // Left border only on desktop
              'md:border-l-4 md:border-transparent',
              TRANSITION_COLORS,
              TRANSITION_OPACITY,
              'ease-in-out md:hover:border-[var(--color-primary)]',
              // Only apply dimming on hover-capable devices - lighter on light mode
              isDimmed(idx) && 'dark:!opacity-50 !opacity-70',
              // Add subtle touch feedback for mobile
              'active:bg-[var(--color-primary)]/5 [@media(hover:hover)]:active:bg-transparent',
            )}
            role="listitem"
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
              {postMortem ? (
                // If project has a post-mortem, show repo and post-mortem buttons
                <>
                  {link && link !== '#' && (
                    <Button
                      href={link}
                      variant="outline"
                      color="primary"
                      aria-label={`View ${title} source code on GitHub`}
                    >
                      <FaGithub className="w-4 h-4" />
                      View Repo
                    </Button>
                  )}
                  <Button
                    href={postMortem}
                    variant="solid"
                    color="secondary"
                    aria-label={`Read ${title} post-mortem`}
                  >
                    Read Post-Mortem
                  </Button>
                </>
              ) : (
                // If no post-mortem, show standard repo and demo buttons
                <>
                  {link && link !== '#' ? (
                    <Button
                      href={link}
                      variant="outline"
                      color="primary"
                      aria-label={`View ${title} source code on GitHub`}
                    >
                      <FaGithub className="w-4 h-4" />
                      View Repo
                    </Button>
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
                    <Button
                      variant="solid"
                      color="secondary"
                      href={demo}
                      aria-label={`View live demo of ${title}`}
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      {external ? 'View Collection' : 'View Live'}
                    </Button>
                  )}
                </>
              )}
            </div>
          </MotionSection>
        ),
      )}
    </motion.div>
  );
}
