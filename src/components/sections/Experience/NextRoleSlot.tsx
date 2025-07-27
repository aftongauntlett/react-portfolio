import Button from '@/components/shared/Button';
import { useState, type FC, type FormEvent } from 'react';
import type { Job } from '@/data/jobs';
import { BulletList, BulletItem } from '@/components/shared/BulletList';

interface NextRoleSlotProps {
  onNewJob: (job: Job) => void;
}

const NextRoleSlot: FC<NextRoleSlotProps> = ({ onNewJob }) => {
  const [stage, setStage] = useState<'teaser' | 'form'>('teaser');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');

  const handleNewJob = () => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    onNewJob({
      title,
      company,
      dates: `Available: ${formatted}`,
      description: [
        <>
          Imagine me as your next <span className="text-[var(--color-primary)]">{title}</span> at{' '}
          <span className="text-[var(--color-primary)]">{company}</span> - ready to sprinkle some
          magic on your UI!
        </>,
      ],
    });

    setCompany('');
    setTitle('');
    setStage('teaser');
  };

  return (
    <>
      {stage === 'teaser' ? (
        <div className="group">
          <BulletList>
            <BulletItem>
              I am seeking my next opportunity—what role at your company do you think I would bring
              value to?
            </BulletItem>
          </BulletList>
          <div className="py-3 flex justify-end">
            <Button asDiv onDivClick={() => setStage('form')}>
              Let me know
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-4 rounded-lg bg-[var(--color-line)]/10 p-4">
          <form
            className="space-y-4"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (company.trim() && title.trim()) handleNewJob();
            }}
          >
            <label className="block text-sm font-medium text-[var(--color-text)]">
              What's the name of your company?
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Inc"
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--color-text)]">
              And what would my job title be?
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={!company.trim() || !title.trim()}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NextRoleSlot;
