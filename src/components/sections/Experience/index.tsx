import { useState } from 'react';
import { jobs, type Job } from '@/data/jobs';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import NewJobEntry from './NewJobEntry';
import NextRoleSlot from './NextRoleSlot';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import MotionSection from '@/components/shared/MotionSection';

export default function ExperienceSection() {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const { setHovered, clearHovered, isHovered, isDimmed } = useHoverGroup();

  const handleInteraction = (idx: number) => {
    // On touch devices, toggle the hover state instead of just setting it
    if ('ontouchstart' in window) {
      setHovered(idx);
      // Auto-clear after 3 seconds on touch devices
      setTimeout(() => clearHovered(), 3000);
    } else {
      setHovered(idx);
    }
  };

  const entries = [
    currentJob
      ? {
          idx: 0,
          title: currentJob.title,
          company: currentJob.company,
          dates: currentJob.dates,
          location: currentJob.location,
          isFirst: true,
          isActive: true,
          content: <NewJobEntry job={currentJob} />,
        }
      : {
          idx: 0,
          title: "What's my next role?",
          company: '',
          dates: 'TBD',
          location: undefined,
          isFirst: true,
          isActive: false,
          content: <NextRoleSlot onNewJob={setCurrentJob} />,
        },
    ...jobs.map((job, i) => ({
      idx: i + 1,
      title: job.title,
      company: job.company,
      dates: job.dates,
      location: job.location,
      isFirst: false,
      isActive: false,
      content: (
        <BulletList>
          {job.description.map((line, idx) => (
            <BulletItem key={idx}>{line}</BulletItem>
          ))}
        </BulletList>
      ),
    })),
  ];

  return (
    <div className="relative">
      {/* Timeline line - only show on desktop */}
      <div
        className="absolute left-5 top-7 bottom-0 w-px bg-[var(--color-line)] hidden md:block"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      <MotionSection
        className="space-y-6 md:space-y-8"
        role="list"
        aria-label="Professional experience timeline"
      >
        {entries.map(({ idx, title, company, dates, location, isFirst, isActive, content }) => (
          <TimelineItem
            key={`${title}-${idx}`}
            idx={idx}
            title={title}
            company={company}
            dates={dates}
            location={location}
            isFirst={isFirst}
            isActive={isActive}
            isHovered={isHovered(idx)}
            isDimmed={isDimmed(idx)}
            onHover={() => setHovered(idx)}
            onLeave={clearHovered}
            onInteraction={() => handleInteraction(idx)}
          >
            {content}
          </TimelineItem>
        ))}
      </MotionSection>
    </div>
  );
}
