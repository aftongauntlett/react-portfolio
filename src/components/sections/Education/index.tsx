import MotionSection from '@/components/shared/MotionSection';
import Accordion from '@/components/shared/Accordion';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import clsx from 'clsx';

const education = [
  {
    title: 'Security+ Certification',
    institution: 'CompTIA',
    date: 'Nov 2022',
    status: 'Active',
    type: 'certification',
  },
  {
    title: 'User Experience Design Certificate',
    institution: 'General Assembly',
    date: 'Dec 2022',
    status: '',
    type: 'certificate',
  },
  {
    title: 'Web Development Certificate',
    institution: 'George Washington University',
    date: 'Aug 2020',
    status: '',
    type: 'certificate',
  },
];

const awards = [
  {
    title: 'Platinum Award',
    organization: 'Booz Allen Hamilton',
    date: '2024',
    description:
      'Led full redesign of flagship web application - improved user engagement and significantly reduced bugs.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2023',
    description:
      'Built an event registration platform used by 100+ users, delivering improved scheduling and agenda access.',
  },
  {
    title: 'Gold Award',
    organization: 'Booz Allen Hamilton',
    date: '2022',
    description:
      'Delivered interactive homepage prototype using advanced Figma techniques and animation.',
  },
];

export default function EducationSection() {
  const { setHovered, clearHovered, isHovered, isDimmed } = useHoverGroup();

  return (
    <MotionSection className="space-y-6">
      <Accordion title="Education & Certifications" defaultOpen={true}>
        <div className="space-y-3">
          {education.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'group p-3 rounded-lg transition-all duration-300',
                'hover:bg-[var(--color-bg-secondary)] cursor-pointer',
                isDimmed(index) && 'opacity-50',
                isHovered(index) && 'transform translate-x-1',
              )}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={clearHovered}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h4
                    className={clsx(
                      'subtitle transition-colors duration-300',
                      'text-[var(--color-text)] group-hover:text-[var(--color-primary)]',
                    )}
                  >
                    {item.title}
                    {item.status && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {item.status}
                      </span>
                    )}
                  </h4>
                  <p
                    className={clsx(
                      'text-sm transition-colors duration-300',
                      'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]',
                    )}
                  >
                    {item.institution}
                  </p>
                </div>
                <span
                  className={clsx(
                    'text-sm font-medium transition-colors duration-300',
                    'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]',
                  )}
                >
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion title="Awards & Recognition">
        <div className="space-y-3">
          {awards.map((award, index) => (
            <div
              key={index}
              className={clsx(
                'group p-3 rounded-lg transition-all duration-300',
                'hover:bg-[var(--color-bg-secondary)] cursor-pointer',
                isDimmed(index + education.length) && 'opacity-50',
                isHovered(index + education.length) && 'transform translate-x-1',
              )}
              onMouseEnter={() => setHovered(index + education.length)}
              onMouseLeave={clearHovered}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h4
                  className={clsx(
                    'subtitle transition-colors duration-300',
                    'text-[var(--color-text)] group-hover:text-[var(--color-primary)]',
                  )}
                >
                  {award.title}
                </h4>
                <span
                  className={clsx(
                    'text-sm font-medium transition-colors duration-300',
                    'text-[var(--color-muted)] group-hover:text-[var(--color-secondary)]',
                  )}
                >
                  {award.date}
                </span>
              </div>
              <p
                className={clsx(
                  'text-sm mb-2 transition-colors duration-300',
                  'text-[var(--color-primary)] group-hover:text-[var(--color-secondary)]',
                )}
              >
                {award.organization}
              </p>
              <p className="text-sm text-[var(--color-muted)]">{award.description}</p>
            </div>
          ))}
        </div>
      </Accordion>
    </MotionSection>
  );
}
