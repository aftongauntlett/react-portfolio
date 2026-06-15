import { jobs } from '@/data/jobs';
import { LuExternalLink } from 'react-icons/lu';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';
import SectionEntryList from '@/components/shared/SectionEntryList';
import type { Job } from '@/data/jobs';

export default function ExperienceSection() {
  const renderJobContent = (job: Job) => (
    <article className="space-y-3">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={clsx(
              TYPOGRAPHY.SUBTITLE,
              'text-[1.15rem] sm:text-[1.25rem] text-[var(--color-text)]',
            )}
          >
            {job.title}
          </h3>
          <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'mt-0.5 text-[var(--color-muted)]')}>
            {job.url ? (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {job.company}
                <LuExternalLink size={12} aria-hidden="true" />
              </a>
            ) : (
              job.company
            )}
          </p>
        </div>
        <time className={clsx(TYPOGRAPHY.TEXT_XS, 'shrink-0 text-[var(--color-muted)]')}>
          {job.dates}
        </time>
      </header>

      <ul
        className={clsx(
          TYPOGRAPHY.TEXT_DESCRIPTION,
          'space-y-2 pl-5 list-disc marker:text-[var(--color-primary)]',
        )}
      >
        {job.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );

  return (
    <SectionEntryList
      items={jobs}
      ariaLabel="Professional experience"
      getItemKey={(job, idx) => `${job.title}-${idx}`}
      renderItem={(job) => renderJobContent(job)}
    />
  );
}
