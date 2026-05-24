import { jobs } from '@/data/jobs';
import { awards } from '@/data/credentials';
import { useMemo } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';
import SectionEntryList from '@/components/shared/SectionEntryList';
import type { Job } from '@/data/jobs';

export default function ExperienceSection() {
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

  const getLocationChipClassName = (location: NonNullable<Job['location']>) =>
    clsx(
      TYPOGRAPHY.TEXT_XS,
      'inline-flex items-center px-2 py-1 rounded border bg-transparent',
      location === 'Remote'
        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
        : 'border-[var(--color-secondary)] text-[var(--color-secondary)]',
    );

  const renderJobContent = (job: Job) => {
    const awardsForRole = getAwardsForRole(job.title, job.company);

    return (
      <article className="space-y-3">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={clsx(
                TYPOGRAPHY.SUBTITLE,
                'text-[1.15rem] sm:text-[1.25rem] text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]',
              )}
            >
              {job.title}
            </h3>
            <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'mt-0.5 text-[var(--color-secondary)]')}>
              {job.company}
            </p>
            <time className={clsx(TYPOGRAPHY.TEXT_SMALL, 'text-[var(--color-muted)]')}>
              {job.dates}
            </time>
          </div>
          {job.location ? (
            <span className={getLocationChipClassName(job.location)}>{job.location}</span>
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
          <div className="border-l-2 border-[var(--color-line)] pl-4 pt-1 transition-colors duration-200 group-hover:border-[var(--color-line)]">
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
                  className="list-disc marker:text-[var(--color-muted)]"
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

  return (
    <SectionEntryList
      items={jobs}
      ariaLabel="Professional experience"
      getItemKey={(job, idx) => `${job.title}-${idx}`}
      renderItem={(job) => renderJobContent(job)}
    />
  );
}
