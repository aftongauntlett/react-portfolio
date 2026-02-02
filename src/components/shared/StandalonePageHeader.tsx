import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '@/components/shared/Button';
import { IconSun } from '@/components/shared/InlineIcons';
import { BsMoonFill } from 'react-icons/bs';
import { useTheme } from '@/context/ThemeContext';
import { FOCUS_STYLES } from '@/constants/styles';

type StandalonePageHeaderProps = {
  backTo?: string;
  backLabel?: string;
  className?: string;
};

export function StandalonePageHeader({
  backTo = '/#projects',
  backLabel = 'View Portfolio',
  className,
}: StandalonePageHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={clsx('flex items-center justify-between gap-4 mb-8', className)}>
      <Link
        to={backTo}
        className={clsx(
          'inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors',
          FOCUS_STYLES.COMPACT,
        )}
      >
        <FaArrowLeft />
        <span>{backLabel}</span>
      </Link>

      <Button
        onClick={toggleTheme}
        icon={theme === 'dark' ? <IconSun size={20} /> : <BsMoonFill size={20} />}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        variant="link"
        color="muted"
      />
    </div>
  );
}
