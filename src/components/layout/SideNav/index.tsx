import type { MouseEvent } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/hooks/useTheme';
import { navItems } from '../../../constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Button from '@/components/shared/Button';

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col justify-between h-full pt-16 px-6 py-10">
      <div>
        <h1 className="text-2xl font-medium leading-[1.3] capitalize text-[var(--color-text)]">
          Afton Gauntlett
        </h1>
        <p className="mt-1 mb-3 text-lg leading-[1.3] capitalize text-[var(--color-muted)]">
          Frontend Engineer
        </p>

        <hr className="border-[var(--color-line)] mb-10" aria-hidden="true" />

        <nav aria-label="Main navigation" className="space-y-5">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;

            const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const element = document.getElementById(id);
              if (element) {
                const offset = 80; // Offset for better positioning
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth',
                });
              }
            };

            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleClick}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'relative group block pl-4 text-base transition-all duration-200',
                  // ::before indicator
                  'before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-[var(--color-secondary)]',
                  'before:opacity-0 before:transition-all before:duration-200',
                  'hover:text-[var(--color-primary)] hover:before:opacity-100',
                  'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  isActive
                    ? '!text-[var(--color-primary)] before:!opacity-100 font-semibold'
                    : 'text-[var(--color-text)]',
                )}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-6">
        <Button href="https://aftongauntlett.github.io/resume/">View Resume</Button>
        <hr className="border-[var(--color-line)]" aria-hidden="true" />

        <div className="flex items-center justify-between">
          <div className="flex gap-4" aria-label="Social media links">
            <a
              href="https://github.com/aftongauntlett"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile (opens in new tab)"
              className="text-[var(--color-muted)] hover:!text-[var(--color-primary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <FaGithub size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/afton-gauntlett/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile (opens in new tab)"
              className="text-[var(--color-muted)] hover:!text-[var(--color-primary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <FaLinkedin size={20} aria-hidden="true" />
            </a>
          </div>

          <Button
            onClick={toggleTheme}
            icon={theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            variant="link"
          />
        </div>
      </div>
    </div>
  );
}
