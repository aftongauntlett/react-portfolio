import { jobs } from '@/data/jobs';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import { Button } from '@/components/shared/Button';
import MotionSection from '@/components/shared/MotionSection';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo } from '@/utils/scroll';

export default function ExperienceSection() {
  const { lenis } = useLenisContext();

  const entries = [
    {
      idx: 0,
      title: 'Open to New Opportunities',
      company: '',
      dates: 'Available Now',
      location: undefined,
      isFirst: true,
      isActive: false,
      content: (
        <div>
          <BulletList>
            <BulletItem>
              Currently seeking frontend engineering roles where I can build scalable UIs, lead
              technical initiatives, and contribute to high-impact products.
            </BulletItem>
          </BulletList>
          <div className="py-3 flex justify-end">
            <Button
              onClick={() => smoothScrollTo({ target: 'contact' }, lenis)}
              variant="outline"
              color="primary"
            >
              Get in touch
            </Button>
          </div>
        </div>
      ),
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
        className="absolute left-[28px] top-7 bottom-0 w-px bg-[var(--color-line)] hidden md:block"
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
          >
            {content}
          </TimelineItem>
        ))}
      </MotionSection>
    </div>
  );
}
