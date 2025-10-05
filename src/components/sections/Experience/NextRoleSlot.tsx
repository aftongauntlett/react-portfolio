import { Button } from '@/components/shared/Button';
import { useState, type FormEvent } from 'react';
import type { Job } from '@/data/jobs';
import { BulletList, BulletItem } from '@/components/shared/BulletList';
import { useJobContact } from '@/context/JobContactContext';
import { TYPOGRAPHY } from '@/constants/typography';

interface NextRoleSlotProps {
  onNewJob: (job: Job) => void;
}

export default function NextRoleSlot({ onNewJob }: NextRoleSlotProps) {
  const [stage, setStage] = useState<'teaser' | 'form'>('teaser');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const { setJobData } = useJobContact();

  // Character limits
  const MAX_COMPANY_LENGTH = 50;
  const MAX_TITLE_LENGTH = 60;

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
          A <span className="text-[var(--color-primary)] capitalize font-semibold">{title}</span> at{' '}
          <span className="text-[var(--color-primary)] capitalize font-semibold">{company}</span>? -
          Now we're talking! I've spent years perfecting the art of building user experiences that
          actually work, and I'm curious what challenges your team is solving. Let's turn this spark
          of interest into something real.
        </>,
        <>
          Find my contact information below
          <Button
            variant="link"
            color="primary"
            onClick={() => {
              // Set job data for prefilling the contact form
              setJobData({
                jobTitle: title,
                company: company,
              });

              // Scroll to contact section
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {' '}
            (or jump there here)
          </Button>
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
              I am currently open to new opportunities - what role at your company do you think I
              could bring value to?
            </BulletItem>
          </BulletList>
          <div className="py-3 flex justify-end">
            <Button onClick={() => setStage('form')} variant="outline" color="primary">
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
            <label
              className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium text-[var(--color-text)]`}
            >
              What's the name of your company?
              <input
                type="text"
                value={company}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_COMPANY_LENGTH) {
                    setCompany(value);
                  }
                }}
                placeholder="e.g. Acme Inc"
                maxLength={MAX_COMPANY_LENGTH}
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <div className="flex justify-between mt-1">
                <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
                  Company name (required)
                </span>
                <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
                  {company.length}/{MAX_COMPANY_LENGTH}
                </span>
              </div>
            </label>

            <label
              className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium text-[var(--color-text)]`}
            >
              And what would my job title be?
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_TITLE_LENGTH) {
                    setTitle(value);
                  }
                }}
                placeholder="e.g. Frontend Engineer"
                maxLength={MAX_TITLE_LENGTH}
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <div className="flex justify-between mt-1">
                <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
                  Job title (required)
                </span>
                <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
                  {title.length}/{MAX_TITLE_LENGTH}
                </span>
              </div>
            </label>

            <div className="flex justify-end pt-3">
              <Button
                type="submit"
                variant="solid"
                color="primary"
                disabled={!company.trim() || !title.trim()}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
