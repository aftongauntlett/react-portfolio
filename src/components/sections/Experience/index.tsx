import { jobs } from '@/data/jobs';
import TimelineItem from '@/components/Timeline/TimelineItem';
import { BulletItem, BulletList } from '@/components/shared/BulletList';
import MotionSection from '@/components/shared/MotionSection';
import { HiCheckBadge, HiMinusCircle } from 'react-icons/hi2';

export default function ExperienceSection() {
  // Toggle this to change availability status
  const isAvailable = true;

  const availabilityConfig = {
    available: {
      icon: HiCheckBadge,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500/10',
      title: 'Open to New Opportunities',
      description:
        'Currently seeking frontend engineering roles where I can build scalable UIs, lead technical initiatives, and contribute to high-impact products.',
    },
    unavailable: {
      icon: HiMinusCircle,
      iconColor: 'text-[var(--color-muted)]',
      iconBg: 'bg-[var(--color-muted)]/10',
      title: 'Not Actively Looking',
      description:
        "Currently focused on my role, but I'm always happy to chat about interesting projects, collaboration opportunities, or just connect with fellow engineers.",
    },
  };

  const config = isAvailable ? availabilityConfig.available : availabilityConfig.unavailable;
  const StatusIcon = config.icon;

  return (
    <div className="space-y-8">
      {/* Availability Card - Above Timeline */}
      <MotionSection>
        <div className="group rounded-lg bg-[var(--color-background)]/40 backdrop-blur-sm p-6 transition-colors duration-300">
          <div className="flex items-start gap-4">
            {/* Icon with hover bounce animation */}
            <div
              className={`
                flex items-center justify-center
                w-10 h-10 rounded-lg
                ${config.iconBg}
                shrink-0
                transition-transform duration-200 ease-out
                group-hover:animate-[subtle-bounce_1.5s_ease-in-out_infinite]
              `}
            >
              <StatusIcon
                className={`w-5 h-5 ${config.iconColor} transition-colors duration-200`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-secondary)] dark:group-hover:text-[var(--color-primary)] transition-colors duration-200 mb-2">
                {config.title}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {config.description}
              </p>
            </div>
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
        <MotionSection className="space-y-6 md:space-y-8">
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
                  <BulletList>
                    {job.description.map((line, idx) => (
                      <BulletItem key={idx}>{line}</BulletItem>
                    ))}
                  </BulletList>
                </TimelineItem>
              </li>
            ))}
          </ul>
        </MotionSection>
      </div>
    </div>
  );
}
