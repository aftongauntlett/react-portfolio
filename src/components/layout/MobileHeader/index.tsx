import { useTheme } from '@/context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { Button } from '@/components/shared/Button';

export default function MobileHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-line)]"
      role="banner"
    >
      <div className="text-xl font-medium text-[var(--color-text)]">Afton Gauntlett</div>
      <div className="flex gap-2">
        <Button
          onClick={toggleTheme}
          icon={theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          variant="link"
          color="muted"
        />
        <Button href="https://aftongauntlett.github.io/resume/" variant="outline" color="primary">
          Resume
        </Button>
      </div>
    </header>
  );
}
