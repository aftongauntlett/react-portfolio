import { Button } from './Button';
import { LinkButton } from './LinkButton';
import { IconLinkedIn } from './InlineIcons';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className} aria-label="Social links">
      <LinkButton
        type="github"
        href="https://github.com/aftongauntlett"
        aria-label="Visit GitHub profile"
        variant="link"
        color="muted"
      />
      <Button
        href="https://www.linkedin.com/in/afton-gauntlett/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit LinkedIn profile (opens in new tab)"
        variant="link"
        color="muted"
        icon={<IconLinkedIn size={20} />}
      />
    </div>
  );
}
