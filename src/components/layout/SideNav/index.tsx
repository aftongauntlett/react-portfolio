import clsx from 'clsx';
import { useTheme } from '@/hooks/useTheme';
import { navItems } from '../../../types/navItems';
import { useActiveSection } from '@/hooks/useActiveSection';
import { GithubIcon, LinkedinIcon, Sun, Moon } from 'lucide-react';
import Button from '@/components/shared/Button';

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      role="complementary"
      aria-labelledby="sidebar-title"
      className="lg:sticky top-0 lg:h-screen w-full lg:w-72 pt-16 px-6 py-10 flex flex-col justify-between"
    >
      <div>
        {/* Name */}
        <h1
          id="sidebar-title"
          className="text-2xl font-medium leading-[1.3] capitalize text-[var(--color-text)]"
        >
          Afton Gauntlett
        </h1>
        {/* Title */}
        <p className="mt-1 mb-3 text-lg leading-[1.3] capitalize text-[var(--color-muted)]">
          Frontend Engineer
        </p>

        <hr className="border-[var(--color-line)] mb-10" />

        {/* Nav */}
        <nav aria-label="Main navigation" className="space-y-5">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={clsx(
                  'relative group block pl-4 text-base transition-colors',
                  // ::before indicator
                  'before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-[var(--color-secondary)]',
                  'before:opacity-0 before:transition-opacity before:duration-300',
                  'hover:text-[var(--color-primary)] hover:before:opacity-100',
                  isActive && 'text-[var(--color-primary)] before:opacity-100 font-semibold',
                )}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col gap-6">
        <Button href="https://aftongauntlett.github.io/resume/">View Resume</Button>
        <hr className="border-[var(--color-line)]" />

        <div className="flex items-center justify-between">
          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="https://github.com/aftongauntlett"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-[var(--color-primary)]"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/afton-gauntlett/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[var(--color-primary)]"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>

          {/* Theme toggle */}
          <Button
            onClick={toggleTheme}
            icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            aria-label="Toggle dark mode"
            variant="link"
          />
        </div>
      </div>
    </aside>
  );
}
