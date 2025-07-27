import { useState } from 'react';
import { jobs, type Job } from '@/data/jobs';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import NewJobEntry from './NewJobEntry';
import NextRoleSlot from './NextRoleSlot';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';

export default function ExperienceSection() {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const { setHovered, clearHovered, isHovered, isDimmed } = useHoverGroup();

  const entries = [
    currentJob
      ? {
          idx: 0,
          title: currentJob.title,
          company: currentJob.company,
          dates: currentJob.dates,
          isFirst: true,
          isActive: true,
          content: <NewJobEntry job={currentJob} />,
        }
      : {
          idx: 0,
          title: "What's my next role?",
          company: '',
          dates: 'TBD',
          isFirst: true,
          isActive: false,
          content: <NextRoleSlot onNewJob={setCurrentJob} />,
        },
    ...jobs.map((job, i) => ({
      idx: i + 1,
      title: job.title,
      company: job.company,
      dates: job.dates,
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
      />
      <div className="space-y-8 md:space-y-12">
        {entries.map(({ idx, title, company, dates, isFirst, isActive, content }) => (
          <TimelineItem
            key={`${title}-${idx}`}
            idx={idx}
            title={title}
            company={company}
            dates={dates}
            isFirst={isFirst}
            isActive={isActive}
            isHovered={isHovered(idx)}
            isDimmed={isDimmed(idx)}
            onHover={() => setHovered(idx)}
            onLeave={clearHovered}
          >
            {content}
          </TimelineItem>
        ))}
      </div>
    </div>
  );
}
