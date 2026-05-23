import { jobs } from '@/data/jobs';
import { motion } from 'framer-motion';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { awards } from '@/data/education';
import { useMemo, type CSSProperties } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';
import type { Job } from '@/data/jobs';

export default function ExperienceSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

  const listStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
        delayChildren: getMotionDuration(0.05, prefersReducedMotion),
      },
    },
  } as const;

  const listItemFade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getMotionDuration(0.5, prefersReducedMotion),
        ease: 'easeOut' as const,
      },
    },
  } as const;

  const isLeadEngineerAwardAnchor = (title: string, company: string) =>
    title === 'Lead Engineer' && company === 'Booz Allen Hamilton';

  const isSoftwareEngineerAwardAnchor = (title: string, company: string) =>
    title === 'Software Engineer' && company === 'Booz Allen Hamilton';

  const boozAllenAwards = useMemo(
    () => awards.filter((award) => award.organization === 'Booz Allen Hamilton'),
    [],
  );
  const leadEngineerAwards = useMemo(
    () => boozAllenAwards.filter((award) => award.date !== '2022'),
    [boozAllenAwards],
  );
  const softwareEngineerAwards = useMemo(
    () => boozAllenAwards.filter((award) => award.date === '2022'),
    [boozAllenAwards],
  );

  const getAwardsForRole = (title: string, company: string) => {
    if (isLeadEngineerAwardAnchor(title, company)) {
      return leadEngineerAwards;
    }

    if (isSoftwareEngineerAwardAnchor(title, company)) {
      return softwareEngineerAwards;
    }

    return [];
  };

  const getLocationChipProps = (
    location: NonNullable<Job['location']>,
  ): { className: string; style?: CSSProperties } => {
    if (location === 'Remote') {
      return {
        className: clsx(
          TYPOGRAPHY.TEXT_XS,
          'inline-flex items-center px-2 py-1 rounded border border-[var(--color-line)]',
          'transition-colors duration-200 group-hover:border-[var(--color-primary)]/30',
          'text-[var(--color-status-remote)]',
        ),
        style: { backgroundColor: 'var(--color-status-remote-bg)' },
      };
    }

    return {
      className: clsx(
        TYPOGRAPHY.TEXT_XS,
        'inline-flex items-center px-2 py-1 rounded border border-[var(--color-line)]',
        'transition-colors duration-200 group-hover:border-[var(--color-primary)]/30',
        'text-[var(--color-status-onsite)]',
      ),
      style: { backgroundColor: 'var(--color-status-onsite-bg)' },
    };
  };

  const renderJobContent = (job: Job) => {
    const awardsForRole = getAwardsForRole(job.title, job.company);

    return (
      <article className="space-y-3">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={clsx(
                TYPOGRAPHY.SUBTITLE,
                'text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]',
              )}
            >
              <span>{job.title}</span>
              <span className="block sm:inline">
                <span className="text-[var(--color-text)]"> @ </span>
                {job.company}
              </span>
            </h3>
            <time
              className={clsx(
                TYPOGRAPHY.TEXT_SMALL,
                'text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-secondary)]',
              )}
            >
              {job.dates}
            </time>
          </div>
          {job.location ? (
            <span {...getLocationChipProps(job.location)}>{job.location}</span>
          ) : null}
        </header>

        <p
          className={clsx(
            TYPOGRAPHY.TEXT_DESCRIPTION,
            'text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-text)]',
          )}
        >
          {job.description}
        </p>

        {awardsForRole.length > 0 ? (
          <div className="border-l-2 border-[var(--color-line)] pl-4 pt-1 transition-colors duration-200 group-hover:border-[var(--color-primary)]/35">
            <p
              className={clsx(
                TYPOGRAPHY.TEXT_XS,
                'font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-secondary)]',
              )}
            >
              Recognitions
            </p>
            <ul
              className={clsx(
                TYPOGRAPHY.TEXT_DESCRIPTION,
                'mt-2 space-y-2 pl-5 text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-text)]',
              )}
              aria-label={`Recognitions for ${job.title}`}
            >
              {awardsForRole.map((award) => (
                <li
                  className="list-disc marker:text-[var(--color-primary)]"
                  key={`${award.title}-${award.date}`}
                >
                  <span className="font-semibold text-[var(--color-text)]">
                    {award.date} {award.title}:
                  </span>{' '}
                  {award.description}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    );
  };

  if (prefersReducedMotion) {
    return (
      <div className="space-y-8">
        <ul className="space-y-8" aria-label="Professional experience">
          {jobs.map((job, i) => (
            <li
              className="group rounded-lg border-b border-[var(--color-line)] px-3 pb-8 pt-3 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[var(--color-primary)]/5 last:border-b-0 last:pb-0"
              key={`${job.title}-${i}`}
            >
              {renderJobContent(job)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT_CONFIG, amount: 0.05 }}
      variants={fadeInUp}
    >
      <motion.ul className="space-y-8" aria-label="Professional experience" variants={listStagger}>
        {jobs.map((job, i) => (
          <motion.li
            className="group rounded-lg border-b border-[var(--color-line)] px-3 pb-8 pt-3 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[var(--color-primary)]/5 last:border-b-0 last:pb-0"
            key={`${job.title}-${i}`}
            variants={listItemFade}
          >
            {renderJobContent(job)}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
