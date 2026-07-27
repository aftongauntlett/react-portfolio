import { Button } from './Button';
import { LinkButton } from './LinkButton';
import { IconLinkedIn } from './InlineIcons';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/constants/socialLinks';

interface SocialLinksProps {
  className?: string;
  /** 'icon' renders compact icon-only buttons (nav use); 'button' renders labeled buttons. */
  variant?: 'icon' | 'button';
  /** Include a Resume entry alongside GitHub/LinkedIn. Only meaningful for variant="button". */
  includeResume?: boolean;
}

export function SocialLinks({ className, variant = 'icon', includeResume = false }: SocialLinksProps) {
  const isLabeled = variant === 'button';
  const buttonVariant = isLabeled ? 'outline' : 'link';

  return (
    <div className={className} aria-label="Social links">
      <LinkButton
        type="github"
        href={GITHUB_URL}
        aria-label={isLabeled ? undefined : 'Visit GitHub profile'}
        variant={buttonVariant}
        color="muted"
      >
        {isLabeled ? 'GitHub' : undefined}
      </LinkButton>
      <Button
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isLabeled ? undefined : 'Visit LinkedIn profile (opens in new tab)'}
        variant={buttonVariant}
        color="muted"
        icon={<IconLinkedIn size={20} />}
      >
        {isLabeled ? 'LinkedIn' : undefined}
      </Button>
      {isLabeled && includeResume ? (
        <Button
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant={buttonVariant}
          color="muted"
          icon={<HiOutlineDocumentText size={20} />}
        >
          Resume
        </Button>
      ) : null}
    </div>
  );
}
