import type { MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useLenisContext } from '@/context/LenisContext';
import { navItems } from '@/constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { navigateToSection } from '@/utils/sectionNavigation';
import { Button } from '@/components/shared/Button';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { TRANSITION_FAST } from '@/constants/styles';
import { RESUME_URL } from '@/constants/socialLinks';
import { IconSun } from '@/components/shared/InlineIcons';
import { BsMoonFill } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi2';

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const { lenis } = useLenisContext();
  const announcementRef = useRef<HTMLDivElement | null>(null);

  // Announce section changes to screen readers
  useEffect(() => {
    const el = announcementRef.current;
    if (!el) return;

    if (!activeSection) {
      el.textContent = '';
      return;
    }

    const navItem = navItems.find((item) => item.id === activeSection);
    if (!navItem) return;

    el.textContent = `Navigated to ${navItem.label} section`;
    const clearTimeoutId = window.setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);

    return () => {
      window.clearTimeout(clearTimeoutId);
    };
  }, [activeSection]);

  return (
    <div className="flex flex-col justify-between h-full pt-16 px-6 py-10">
      {/* Screen reader announcement for active section */}
      <div
        ref={announcementRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div>
        <nav aria-label="Main navigation" className="space-y-5">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;

            // Helper function for navigation
            const navigateTo = (targetId: string) => {
              navigateToSection(targetId, lenis);
            };

            const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              navigateTo(id);
            };

            return (
              <div key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleClick}
                  aria-current={isActive ? 'location' : undefined}
                  className={clsx(
                    'group block text-base',
                    TRANSITION_FAST,
                    isActive
                      ? 'text-[var(--color-primary)] font-semibold'
                      : 'text-[var(--color-text)]',
                    'md:hover:text-[var(--color-primary)]',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                >
                  {label}
                </a>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <hr className="border-[var(--color-line)]" aria-hidden="true" />

        <div className="flex items-center gap-4" aria-label="Sidebar quick actions">
          <SocialLinks className="flex items-center gap-4" />
          <Button
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume (opens in new tab)"
            variant="link"
            color="muted"
            icon={<HiOutlineDocumentText size={20} />}
          />
          <Button
            onClick={toggleTheme}
            icon={theme === 'dark' ? <IconSun size={18} /> : <BsMoonFill size={15} />}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            variant="outline"
            color="muted"
            className="!h-8 !w-8 !p-0 !rounded-full !border-[var(--color-line)] !bg-[var(--color-surface)]/80 hover:!bg-[var(--color-surface)] hover:!text-[var(--color-theme-toggle-hover)] hover:!opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
