import { jobs } from '@/data/jobs';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import { Button } from '@/components/shared/Button';
import MotionSection from '@/components/shared/MotionSection';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo } from '@/utils/scroll';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';

export default function ExperienceSection() {
  const { lenis } = useLenisContext();

  // Toggle this to change availability status
  const isAvailable = true;

  const availabilityConfig = {
    available: {
      icon: HiCheckCircle,
      iconColor: 'text-green-400',
      title: 'Open to New Opportunities',
      description:
        'Currently seeking frontend engineering roles where I can build scalable UIs, lead technical initiatives, and contribute to high-impact products.',
      buttonText: 'Get in touch',
    },
    unavailable: {
      icon: HiXCircle,
      iconColor: 'text-red-400',
      title: 'Not Actively Looking',
      description:
        "Currently focused on my role, but I'm always happy to chat about interesting projects, collaboration opportunities, or just connect with fellow engineers.",
      buttonText: "Let's connect",
    },
  };

  const config = isAvailable ? availabilityConfig.available : availabilityConfig.unavailable;
  const StatusIcon = config.icon;

  return (
    <div className="space-y-8">
      {/* Availability Card - Above Timeline */}
      <MotionSection>
        <div className="group rounded-lg bg-[var(--color-background)]/40 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-[var(--color-background)]/60 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-2">
                <StatusIcon className={`w-5 h-5 ${config.iconColor} shrink-0`} />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">{config.title}</h3>
              </div>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {config.description}
              </p>
            </div>
            <Button
              onClick={() => smoothScrollTo({ target: 'contact' }, lenis)}
              variant="outline"
              color="primary"
              className="shrink-0"
            >
              {config.buttonText}
            </Button>
          </div>
        </div>
      </MotionSection>

      {/* Timeline */}
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
          {jobs.map((job, i) => (
            <TimelineItem
              key={`${job.title}-${i}`}
              idx={i}
              title={job.title}
              company={job.company}
              dates={job.dates}
              location={job.location}
              isFirst={i === 0}
              isActive={false}
            >
              <BulletList>
                {job.description.map((line, idx) => (
                  <BulletItem key={idx}>{line}</BulletItem>
                ))}
              </BulletList>
            </TimelineItem>
          ))}
        </MotionSection>
      </div>
    </div>
  );
}
