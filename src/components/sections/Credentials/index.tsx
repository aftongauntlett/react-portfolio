import { education, awards } from '@/data/education';
import MotionSection from '@/components/shared/MotionSection';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
import clsx from 'clsx';

export default function CredentialsSection() {
  return (
    <div className="space-y-12">
      {/* Education & Certifications Section */}
      <section>
        <h3
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'mb-6 text-[var(--color-text)] font-semibold tracking-wider uppercase border-b border-[var(--color-line)] pb-3',
          )}
        >
          Education & Certifications
        </h3>
        <MotionSection
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-label="Education and certifications"
        >
          {education.map((cert) => {
            const ItemWrapper = cert.link ? 'a' : 'div';
            const wrapperProps = cert.link
              ? {
                  href: cert.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {
                  tabIndex: 0,
                };

            return (
              <ItemWrapper
                key={cert.title}
                {...wrapperProps}
                className={clsx(
                  'group flex flex-col',
                  'py-6 md:py-8 px-3 md:px-4',
                  'rounded-md',
                  'md:border-l-4 md:border-transparent',
                  'transition-colors duration-300 ease-in-out',
                  'md:hover:border-[var(--color-secondary)]',
                  'active:bg-[var(--color-secondary)]/5 [@media(hover:hover)]:active:bg-transparent',
                  cert.link ? 'no-underline' : '',
                  FOCUS_STYLES.BUTTON,
                )}
              >
                {/* Header with title, institution, and date */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={clsx(
                        TYPOGRAPHY.SUBTITLE,
                        'text-[var(--color-text)]',
                        'group-hover:text-[var(--color-secondary)]',
                        'transition-colors duration-300',
                      )}
                    >
                      {cert.title}
                    </h3>
                    <p
                      className={clsx(
                        TYPOGRAPHY.TEXT_SMALL,
                        'text-[var(--color-muted)]',
                        'group-hover:text-[var(--color-text)]',
                        'transition-colors duration-300',
                        'mt-1',
                      )}
                    >
                      {cert.institution}
                    </p>
                  </div>

                  {/* Date badge and Active status */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={clsx(
                        'inline-flex items-center',
                        'font-medium px-2 py-1',
                        TYPOGRAPHY.TEXT_XS,
                        'rounded border',
                        'border-[var(--color-line)]',
                        'text-[var(--color-secondary)]',
                        'bg-[var(--color-secondary)]/10',
                      )}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={clsx(
                    TYPOGRAPHY.TEXT_SMALL,
                    'text-[var(--color-text-muted)]',
                    'leading-relaxed',
                    'mt-3',
                  )}
                >
                  {cert.description}
                </p>

                {/* Credential link indicator */}
                {cert.link && (
                  <span
                    className={clsx(
                      'inline-flex items-center mt-2',
                      'text-sm font-medium',
                      'text-[var(--color-secondary)]',
                      'group-hover:underline',
                      'transition-colors duration-200',
                    )}
                  >
                    View Credential →
                  </span>
                )}
              </ItemWrapper>
            );
          })}
        </MotionSection>
      </section>

      {/* Awards & Recognition Section */}
      <section>
        <h3
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'mb-6 text-[var(--color-text)] font-semibold tracking-wider uppercase border-b border-[var(--color-line)] pb-3',
          )}
        >
          Awards & Recognition
        </h3>
        <MotionSection
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-label="Awards and recognition"
        >
          {awards.map((award) => (
            <div
              key={`${award.title}-${award.date}`}
              tabIndex={0}
              className={clsx(
                'group flex flex-col',
                'py-6 md:py-8 px-3 md:px-4',
                'rounded-md',
                'md:border-l-4 md:border-transparent',
                'transition-colors duration-300 ease-in-out',
                'md:hover:border-[var(--color-primary)]',
                'active:bg-[var(--color-primary)]/5 [@media(hover:hover)]:active:bg-transparent',
                FOCUS_STYLES.BUTTON,
              )}
            >
              {/* Header with title, organization, and date */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={clsx(
                      TYPOGRAPHY.SUBTITLE,
                      'text-[var(--color-text)]',
                      'group-hover:text-[var(--color-primary)]',
                      'transition-colors duration-300',
                    )}
                  >
                    {award.title}
                  </h3>
                  <p
                    className={clsx(
                      TYPOGRAPHY.TEXT_SMALL,
                      'text-[var(--color-muted)]',
                      'group-hover:text-[var(--color-text)]',
                      'transition-colors duration-300',
                      'mt-1',
                    )}
                  >
                    {award.organization}
                  </p>
                </div>

                {/* Date badge */}
                <span
                  className={clsx(
                    'inline-flex items-center',
                    'font-medium px-2 py-1',
                    TYPOGRAPHY.TEXT_XS,
                    'rounded border',
                    'border-[var(--color-line)]',
                    'flex-shrink-0',
                    'text-[var(--color-primary)]',
                    'bg-[var(--color-primary)]/10',
                  )}
                >
                  {award.date}
                </span>
              </div>

              {/* Description */}
              <p
                className={clsx(
                  TYPOGRAPHY.TEXT_SMALL,
                  'text-[var(--color-text-muted)]',
                  'leading-relaxed',
                  'mt-3',
                )}
              >
                {award.description}
              </p>
            </div>
          ))}
        </MotionSection>
      </section>
    </div>
  );
}
