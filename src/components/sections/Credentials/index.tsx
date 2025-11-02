import { education, awards } from '@/data/education';
import MotionSection from '@/components/shared/MotionSection';
import { TYPOGRAPHY, CARD_BASE_CLASSES } from '@/constants/styles';
import clsx from 'clsx';

interface CredentialCardProps {
  title: string;
  organization: string;
  date: string;
  description: string;
  status?: 'active' | null;
  link?: string;
}

function CredentialCard({
  title,
  organization,
  date,
  description,
  status,
  link,
}: CredentialCardProps) {
  const CardWrapper = link ? 'a' : 'div';
  const cardProps = link
    ? {
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View ${title} credential (opens in new tab)`,
      }
    : {
        role: 'article',
        'aria-label': `${title} - ${organization}`,
      };

  return (
    <CardWrapper
      {...cardProps}
      className={clsx(
        CARD_BASE_CLASSES,
        'group',
        'transition-colors duration-300',
        'hover:border-[var(--color-primary)]',
        link && 'cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
      )}
    >
      {/* Header: Title and Date */}
      <div className="flex justify-between items-start gap-4 mb-1">
        <h3
          className={clsx(
            TYPOGRAPHY.SUBTITLE,
            'text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary)]',
          )}
        >
          {title}
          {status === 'active' && (
            <span className={clsx('ml-2 text-xs font-normal text-[var(--color-primary)]')}>
              • Active
            </span>
          )}
        </h3>
        <span
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'text-[var(--color-muted)] flex-shrink-0 transition-colors duration-300 group-hover:text-[var(--color-secondary)]',
          )}
        >
          {date}
        </span>
      </div>

      {/* Organization */}
      <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'text-[var(--color-muted)] mb-4')}>
        {organization}
      </p>

      {/* Description */}
      <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'text-[var(--color-text-muted)] leading-relaxed')}>
        {description}
      </p>

      {/* Link indicator */}
      {link && (
        <div
          className={clsx(
            'mt-4 pt-4 border-t border-[var(--color-line)]',
            'text-sm font-medium text-[var(--color-primary)]',
          )}
        >
          View Credential →
        </div>
      )}
    </CardWrapper>
  );
}

export default function CredentialsSection() {
  return (
    <div className="space-y-10">
      {/* Awards & Recognition */}
      <section>
        <h3
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'mb-5 text-[var(--color-text)] font-semibold tracking-wide uppercase',
          )}
        >
          Awards & Recognition
        </h3>
        <MotionSection className="space-y-4">
          {awards.map((award) => (
            <CredentialCard
              key={award.title}
              title={award.title}
              date={award.date}
              organization={award.organization}
              description={award.description}
            />
          ))}
        </MotionSection>
      </section>

      {/* Education & Certifications */}
      <section>
        <h3
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'mb-5 text-[var(--color-text)] font-semibold tracking-wide uppercase',
          )}
        >
          Education & Certifications
        </h3>
        <MotionSection className="space-y-4">
          {education.map((cert) => (
            <CredentialCard
              key={cert.title}
              title={cert.title}
              date={cert.date}
              organization={cert.institution}
              description={cert.description || ''}
              link={cert.link}
              status={cert.status === 'active' ? 'active' : null}
            />
          ))}
        </MotionSection>
      </section>
    </div>
  );
}
