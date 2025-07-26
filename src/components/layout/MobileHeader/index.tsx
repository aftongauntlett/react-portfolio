import { useTheme } from '@/hooks/useTheme';
import { HiSun, HiMoon } from 'react-icons/hi2';
import Button from '@/components/shared/Button';

export default function MobileHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="lg:hidden flex items-center justify-between px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-line)]"
      role="banner"
    >
      {/* Name */}
      <h1 className="text-xl font-medium text-[var(--color-text)]">Afton Gauntlett</h1>

      {/* Theme toggle */}
      <Button
        onClick={toggleTheme}
        icon={theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        variant="link"
      />
    </header>
  );
}
