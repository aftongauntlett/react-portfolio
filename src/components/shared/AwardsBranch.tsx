import { memo, useMemo } from 'react';
import { m } from 'framer-motion';
import clsx from 'clsx';
import { HiChevronDown } from 'react-icons/hi2';
import { TYPOGRAPHY } from '@/constants/styles';
import { getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import type { awards } from '@/data/education';

const AwardsBranch = memo(({
  prefersReducedMotion,
  awardsForRole,
  isOpen,
  onToggle,
  controlsId,
}: {
  prefersReducedMotion: boolean;
  awardsForRole: typeof awards;
  isOpen: boolean;
  onToggle: () => void;
  controlsId: string;
}) => {
  const label = isOpen ? 'Hide awards' : 'See awards';

  const shouldStaggerAwards = awardsForRole.length >= 6;
  const staggerIn = shouldStaggerAwards
    ? getMotionDuration(0.06, prefersReducedMotion)
    : getMotionDuration(0.02, prefersReducedMotion);
  const delayIn = shouldStaggerAwards
    ? getMotionDuration(0.04, prefersReducedMotion)
    : getMotionDuration(0, prefersReducedMotion);
  const staggerOut = shouldStaggerAwards
    ? getMotionDuration(0.05, prefersReducedMotion)
    : getMotionDuration(0.02, prefersReducedMotion);

  const awardsListVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  }), [staggerIn, delayIn, staggerOut]);

  const awardItemVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getMotionDuration(0.28, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: getMotionDuration(0.18, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
  }), [prefersReducedMotion]);

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
        <m.button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={controlsId}
          className={clsx(
            'group mx-3 inline-flex items-center gap-2 rounded-md px-3 py-2',
            TYPOGRAPHY.TEXT_SMALL,
            isOpen ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]',
            'font-semibold',
            'border border-transparent transition-[color,background-color,border-color] duration-200',
            'bg-transparent hover:bg-[var(--color-line)]/35 hover:border-[var(--color-primary)]/35',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
          )}
        >
          <span className="transition-colors duration-200 font-heading">{label}</span>
          <m.span
            className="grid place-items-center"
            animate={prefersReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
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
        id={controlsId}
        role="region"
        initial={prefersReducedMotion ? undefined : "closed"}
        animate={isOpen ? "open" : "closed"}
        exit={prefersReducedMotion ? undefined : "closed"}
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
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
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
                    ease: [0.22, 1, 0.36, 1],
                    when: 'afterChildren',
                    height: { duration: 0 },
                  },
                }
              }
        }
      >
            <div>
              <div className="relative">
                {/* Nested timeline rail */}
                <div
                  className="absolute left-[0.625rem] top-[0.85rem] bottom-2 w-px bg-[var(--color-line)] hidden sm:block"
                  style={{ zIndex: 0 }}
                  aria-hidden="true"
                />
                <m.ul
                  className="space-y-3"
                  aria-label="Awards list"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={awardsListVariants}
                >
                  {awardsForRole.map((award) => (
                    <m.li
                      className="group/award sm:grid sm:grid-cols-[1.25rem_1fr] sm:gap-x-3"
                      key={`${award.title}-${award.date}`}
                      variants={awardItemVariants}
                    >
                      <div className="hidden sm:flex justify-center pt-[0.45rem]" aria-hidden="true">
                        <span
                          className={clsx(
                            'h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-200 z-10',
                            'bg-[var(--color-muted)]',
                            'ring-2 ring-[var(--color-background)]',
                            'group-hover/award:bg-[var(--color-primary)] group-hover/award:shadow-[0_0_10px_var(--color-primary)]',
                          )}
                        />
                      </div>
                      <div
                        className={clsx(
                          'min-w-0 rounded-md px-3',
                          'bg-[var(--color-surface)]/30',
                          'transition-colors duration-200',
                          'hover:bg-[var(--color-primary)]/5',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div
                              className={clsx(
                                TYPOGRAPHY.TEXT_LARGE, TYPOGRAPHY.TEXT_PRIMARY,
                                'font-heading transition-colors duration-200',
                              )}
                            >
                              {award.title}
                            </div>
                          </div>
                          <span
                            className={clsx(
                              TYPOGRAPHY.TEXT_XS,
                              'text-[var(--color-muted)] flex-shrink-0',
                              'group-hover/award:text-[var(--color-secondary)]',
                            )}
                          >
                            {award.date}
                          </span>
                        </div>
                        <div
                          className={clsx(
                            TYPOGRAPHY.TEXT_DESCRIPTION,
                            '!text-[var(--color-text)] mt-1 transition-colors duration-200',
                          )}
                        >
                          {award.description}
                        </div>
                      </div>
                    </m.li>
                  ))}
                </m.ul>
              </div>
            </div>
          </m.div>
    </div>
  );
});

AwardsBranch.displayName = 'AwardsBranch';

export default AwardsBranch;