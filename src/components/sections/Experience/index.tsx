import { jobs } from '@/data/jobs';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import { m } from 'framer-motion';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { awards } from '@/data/education';
import { useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import AwardsBranch from '@/components/shared/AwardsBranch';

export default function ExperienceSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);
  const [leadAwardsOpen, setLeadAwardsOpen] = useState(false);
  const [softwareAwardsOpen, setSoftwareAwardsOpen] = useState(false);

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

  const boozAllenAwards = useMemo(() => awards.filter((award) => award.organization === 'Booz Allen Hamilton'), []);
  const leadEngineerAwards = useMemo(() => boozAllenAwards.filter((award) => award.date !== '2022'), [boozAllenAwards]);
  const softwareEngineerAwards = useMemo(() => boozAllenAwards.filter((award) => award.date === '2022'), [boozAllenAwards]);

  const setLeadAwardsOpenCallback = useCallback(() => setLeadAwardsOpen((prev) => !prev), []);
  const setSoftwareAwardsOpenCallback = useCallback(() => setSoftwareAwardsOpen((prev) => !prev), []);

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
                      isLeadEngineerAwardAnchor(job.title, job.company) && leadAwardsOpen
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
                      prefersReducedMotion={prefersReducedMotion}
                      awardsForRole={leadEngineerAwards}
                      isOpen={leadAwardsOpen}
                      onToggle={setLeadAwardsOpenCallback}
                      controlsId={LEAD_AWARDS_REGION_ID}
                    />
                  ) : null}

                  {isSoftwareEngineerAwardAnchor(job.title, job.company) ? (
                    <AwardsBranch
                      prefersReducedMotion={prefersReducedMotion}
                      awardsForRole={softwareEngineerAwards}
                      isOpen={softwareAwardsOpen}
                      onToggle={setSoftwareAwardsOpenCallback}
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
                    isLeadEngineerAwardAnchor(job.title, job.company) && leadAwardsOpen
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
                    prefersReducedMotion={prefersReducedMotion}
                    awardsForRole={leadEngineerAwards}
                    isOpen={leadAwardsOpen}
                    onToggle={setLeadAwardsOpenCallback}
                    controlsId={LEAD_AWARDS_REGION_ID}
                  />
                ) : null}

                {isSoftwareEngineerAwardAnchor(job.title, job.company) ? (
                  <AwardsBranch
                    prefersReducedMotion={prefersReducedMotion}
                    awardsForRole={softwareEngineerAwards}
                    isOpen={softwareAwardsOpen}
                    onToggle={setSoftwareAwardsOpenCallback}
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
