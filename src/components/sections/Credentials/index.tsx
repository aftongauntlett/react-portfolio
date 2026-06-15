import { credentials, type Credential } from '@/data/credentials';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';
import SectionEntryList from '@/components/shared/SectionEntryList';

function CredentialsGrid({ items }: { items: readonly Credential[] }) {
  const renderCredentialContent = (item: Credential) => {
    return (
      <article className="space-y-2.5">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={clsx(
                TYPOGRAPHY.SUBTITLE,
                'font-bold',
                'text-[var(--color-text)]',
              )}
            >
              {item.title}
            </h3>
            <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'mt-1 text-[var(--color-muted)]')}>
              {item.institution}
            </p>
          </div>
          <time
            className={clsx(
              TYPOGRAPHY.TEXT_XS,
              'shrink-0',
              item.title === 'CompTIA Security+'
                ? 'text-[var(--color-text)]'
                : 'text-[var(--color-muted)]',
            )}
          >
            {item.date}
          </time>
        </header>

        {item.description ? (
          <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION)}>{item.description}</p>
        ) : null}
      </article>
    );
  };

  return (
    <SectionEntryList
      items={items}
      ariaLabel="Credentials"
      getItemKey={(item, idx) => `${item.title}-${idx}`}
      renderItem={(item) => renderCredentialContent(item)}
    />
  );
}

export default function CredentialsSection() {
  return <CredentialsGrid items={credentials} />;
}
