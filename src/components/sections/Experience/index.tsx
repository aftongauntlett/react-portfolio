import { jobs } from '@/data/jobs';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import { AnimatePresence, m } from 'framer-motion';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { awards } from '@/data/education';
import { useState } from 'react';
import clsx from 'clsx';
import { HiChevronDown } from 'react-icons/hi2';
import { TYPOGRAPHY } from '@/constants/styles';

export default function ExperienceSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);
  const [areLeadAwardsOpen, setAreLeadAwardsOpen] = useState(false);
  const [areSoftwareAwardsOpen, setAreSoftwareAwardsOpen] = useState(false);

  const timelineListStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
        delayChildren: getMotionDuration(0.05, prefersReducedMotion),
      },
    },
  } as const;

  // Important for the timeline: avoid y-translation on reveal.
  // Translating list items causes the dots to temporarily misalign with the static rail.
  const timelineStaggerItem = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getMotionDuration(0.5, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
  } as const;

  const LEAD_AWARDS_REGION_ID = 'experience-awards-lead-engineer';
  const SOFTWARE_AWARDS_REGION_ID = 'experience-awards-software-engineer';

  const isLeadEngineerAwardAnchor = (title: string, company: string) =>
    title === 'Lead Engineer' && company === 'Booz Allen Hamilton';

  const isSoftwareEngineerAwardAnchor = (title: string, company: string) =>
    title === 'Software Engineer' && company === 'Booz Allen Hamilton';

  const boozAllenAwards = awards.filter((award) => award.organization === 'Booz Allen Hamilton');
  const leadEngineerAwards = boozAllenAwards.filter((award) => award.date !== '2022');
  const softwareEngineerAwards = boozAllenAwards.filter((award) => award.date === '2022');

  const AwardsBranch = ({
    awardsForRole,
    isOpen,
    onToggle,
    controlsId,
  }: {
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

    const awardsListVariants = {
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
    } as const;

    const awardItemVariants = {
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
    } as const;

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
              'text-[var(--color-primary)] font-semibold',
              'border border-transparent transition-[color,background-color,border-color] duration-200',
              'bg-transparent hover:bg-[var(--color-line)]/35 hover:border-[var(--color-primary)]/35',
              'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
            )}
          >
            <span className="transition-colors duration-200">{label}</span>
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

        <AnimatePresence initial={false}>
          {isOpen ? (
            <m.div
              id={controlsId}
              role="region"
              aria-label="Awards"
              initial={prefersReducedMotion ? false : 'closed'}
              animate={prefersReducedMotion ? undefined : 'open'}
              exit={prefersReducedMotion ? undefined : 'closed'}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              style={{ overflow: 'hidden' }}
              variants={
                prefersReducedMotion
                  ? undefined
                  : {
                      open: {
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                          when: 'beforeChildren',
                        },
                      },
                      closed: {
                        height: 0,
                        opacity: 0,
                        transition: {
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                          when: 'afterChildren',
                        },
                      },
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
                                  TYPOGRAPHY.TEXT_SMALL, TYPOGRAPHY.TEXT_PRIMARY, TYPOGRAPHY.TEXT_RELAXED,
                                  'transition-colors duration-200',
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
          ) : null}
        </AnimatePresence>
      </div>
    );
  };

  if (prefersReducedMotion) {
    return (
      <div className="space-y-8">
        <div className="relative">
          <div
            className="absolute left-[1.25rem] top-4 bottom-0 w-px bg-[var(--color-line)] hidden md:block"
            style={{ zIndex: 1 }}
            aria-hidden="true"
          />
          <ul className="space-y-6 md:space-y-8" aria-label="Professional experience timeline">
            {jobs.map((job, i) => (
              <li key={`${job.title}-${i}`}>
                <TimelineItem
                  title={job.title}
                  company={job.company}
                  dates={job.dates}
                  location={job.location}
                  isFirst={i === 0}
                  isActive={false}
                >
                  <BulletList
                    className={clsx(
                      isLeadEngineerAwardAnchor(job.title, job.company) && areLeadAwardsOpen
                        ? '!text-[var(--color-text)]'
                        : undefined,
                    )}
                  >
                    {job.description.map((line, idx) => (
                      <BulletItem key={idx}>{line}</BulletItem>
                    ))}
                  </BulletList>

                  {isLeadEngineerAwardAnchor(job.title, job.company) ? (
                    <AwardsBranch
                      awardsForRole={leadEngineerAwards}
                      isOpen={areLeadAwardsOpen}
                      onToggle={() => setAreLeadAwardsOpen((prev) => !prev)}
                      controlsId={LEAD_AWARDS_REGION_ID}
                    />
                  ) : null}

                  {isSoftwareEngineerAwardAnchor(job.title, job.company) ? (
                    <AwardsBranch
                      awardsForRole={softwareEngineerAwards}
                      isOpen={areSoftwareAwardsOpen}
                      onToggle={() => setAreSoftwareAwardsOpen((prev) => !prev)}
                      controlsId={SOFTWARE_AWARDS_REGION_ID}
                    />
                  ) : null}
                </TimelineItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <m.div
      className="space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT_CONFIG, amount: 0.05 }}
      variants={fadeInUp}
    >
      <div className="relative">
        <div
          className="absolute left-[1.25rem] top-4 bottom-0 w-px bg-[var(--color-line)] hidden md:block"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />
        <m.ul
          className="space-y-6 md:space-y-8"
          aria-label="Professional experience timeline"
          variants={timelineListStagger}
        >
          {jobs.map((job, i) => (
            <m.li key={`${job.title}-${i}`} variants={timelineStaggerItem}>
              <TimelineItem
                title={job.title}
                company={job.company}
                dates={job.dates}
                location={job.location}
                isFirst={i === 0}
                isActive={false}
              >
                <BulletList
                  className={clsx(
                    isLeadEngineerAwardAnchor(job.title, job.company) && areLeadAwardsOpen
                      ? '!text-[var(--color-text)]'
                      : undefined,
                  )}
                >
                  {job.description.map((line, idx) => (
                    <BulletItem key={idx}>{line}</BulletItem>
                  ))}
                </BulletList>

                {isLeadEngineerAwardAnchor(job.title, job.company) ? (
                  <AwardsBranch
                    awardsForRole={leadEngineerAwards}
                    isOpen={areLeadAwardsOpen}
                    onToggle={() => setAreLeadAwardsOpen((prev) => !prev)}
                    controlsId={LEAD_AWARDS_REGION_ID}
                  />
                ) : null}

                {isSoftwareEngineerAwardAnchor(job.title, job.company) ? (
                  <AwardsBranch
                    awardsForRole={softwareEngineerAwards}
                    isOpen={areSoftwareAwardsOpen}
                    onToggle={() => setAreSoftwareAwardsOpen((prev) => !prev)}
                    controlsId={SOFTWARE_AWARDS_REGION_ID}
                  />
                ) : null}
              </TimelineItem>
            </m.li>
          ))}
        </m.ul>
      </div>
    </m.div>
  );
}
