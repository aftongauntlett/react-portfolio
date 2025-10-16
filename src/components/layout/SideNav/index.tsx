import type { MouseEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useDetailView } from '@/context/DetailViewContext';
import { navItems } from '../../../constants/navigation';
import { projects } from '@/data/projects';
import { games } from '@/data/games';
import { useActiveSection } from '@/hooks/useActiveSection';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/shared/Button';
import { TRANSITION_FAST } from '@/constants/styles';
import { HiSun, HiMoon } from 'react-icons/hi2';

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const { detailView, setDetailView } = useDetailView();

  return (
    <motion.div
      className="flex flex-col justify-between h-full pt-16 px-6 py-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.1,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.2 },
        }}
      >
        <div className="text-xl font-bold leading-[1.3] capitalize text-[var(--color-text)]">
          Afton Gauntlett
        </div>
        <div className="space-y-3">
          <p className="font-semibold leading-[1.3] capitalize text-[var(--color-secondary)]">
            Senior Frontend Engineer & UI Specialist
          </p>
          <hr className="border-[var(--color-line)]" aria-hidden="true" />
        </div>

        <nav aria-label="Main navigation" className="mt-8 space-y-5">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isProjectsSection = id === 'projects';
            const showNestedItem = isProjectsSection && detailView;

            // Get the nested item title based on detail view type
            let nestedItemTitle = '';
            if (showNestedItem && detailView) {
              if (detailView.type === 'case-study') {
                // Find project by slug
                const project = projects.find((p) => p.slug === detailView.slug);
                nestedItemTitle = project?.title || detailView.title;
              } else if (detailView.type === 'post-mortem') {
                // Find game by blogSlug
                const game = games.find((g) => g.blogSlug === detailView.slug);
                nestedItemTitle = game?.title || detailView.title;
              }
            }

            const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();

              // If clicking Projects while a detail view is open, close it first
              if (isProjectsSection && detailView) {
                setDetailView(null);
                window.location.hash = '';

                // Wait for detail view to close, then scroll to projects
                setTimeout(() => {
                  const element = document.getElementById(id);
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.offsetTop - offset;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth',
                    });
                    element.focus();
                  }
                }, 100);
                return;
              }

              // Normal navigation
              const element = document.getElementById(id);
              if (element) {
                const offset = 80; // Offset for better positioning
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth',
                });
                // Focus the section for screen readers
                element.focus();
              }
            };

            const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();

                // If clicking Projects while a detail view is open, close it first
                if (isProjectsSection && detailView) {
                  setDetailView(null);
                  window.location.hash = '';

                  // Wait for detail view to close, then scroll to projects
                  setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.offsetTop - offset;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth',
                      });
                      element.focus();
                    }
                  }, 100);
                  return;
                }

                // Normal navigation
                const element = document.getElementById(id);
                if (element) {
                  const offset = 80; // Offset for better positioning
                  const elementPosition = element.offsetTop - offset;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth',
                  });
                  // Focus the section for screen readers
                  element.focus();
                }
              }
            };

            return (
              <div key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  aria-current={isActive ? 'location' : undefined}
                  className={clsx(
                    'relative group block pl-4 text-base',
                    TRANSITION_FAST,
                    // ::before indicator
                    'before:content-["" ] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-[var(--color-secondary)]',
                    'before:opacity-0 before:transition-all before:duration-200',
                    isActive || showNestedItem
                      ? 'text-[var(--color-primary)] before:opacity-100 font-semibold'
                      : 'text-[var(--color-text)] before:opacity-0',
                    'md:hover:text-[var(--color-primary)] md:hover:before:opacity-100',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                >
                  {label}
                </a>

                {/* Show nested item when viewing a case study or post-mortem */}
                {showNestedItem && nestedItemTitle && (
                  <div className="ml-6 mt-2">
                    <span className="text-sm text-[var(--color-muted)] block pl-4 relative before:content-['→'] before:absolute before:left-0">
                      {nestedItemTitle}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </motion.div>

      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.4 },
        }}
      >
        <Button href="https://aftongauntlett.github.io/resume/" variant="outline" color="primary">
          View Resume
        </Button>
        <hr className="border-[var(--color-line)]" aria-hidden="true" />

        <div className="flex items-center justify-between">
          <div className="flex gap-4" aria-label="Social media links">
            <Button
              href="https://github.com/aftongauntlett"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile (opens in new tab)"
              variant="link"
              color="primary"
              icon={<FaGithub size={20} />}
            />
            <Button
              href="https://www.linkedin.com/in/afton-gauntlett/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile (opens in new tab)"
              variant="link"
              color="primary"
              icon={<FaLinkedin size={20} />}
            />
          </div>

          <Button
            onClick={toggleTheme}
            icon={theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={18} />}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            variant="link"
            color="muted"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
