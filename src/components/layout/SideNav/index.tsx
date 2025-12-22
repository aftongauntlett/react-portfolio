import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLenisContext } from '@/context/LenisContext';
import { navItems } from '../../../constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { smoothScrollTo } from '@/utils/domScroll';
import { FaLinkedin } from 'react-icons/fa';
import { LinkButton } from '@/components/shared/LinkButton';
import { Button } from '@/components/shared/Button';
import { TRANSITION_FAST } from '@/constants/styles';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { useWillChange } from '@/hooks/useWillChange';

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const { lenis } = useLenisContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isAnimating, setIsAnimating] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);
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
    <m.div
      className="flex flex-col justify-between h-full pt-16 px-6 py-10"
      initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: getMotionDuration(0.6, prefersReducedMotion),
          ease: 'easeOut',
          staggerChildren: getMotionDuration(0.1, prefersReducedMotion),
        },
      }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      style={willChangeStyle}
    >
      {/* Screen reader announcement for active section */}
      <div
        ref={announcementRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <m.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: getMotionDuration(0.5, prefersReducedMotion),
            delay: getMotionDuration(0.2, prefersReducedMotion),
          },
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

            // Helper function for navigation
            const navigateTo = (targetId: string) => {
              // Smooth scroll to target
              smoothScrollTo({ target: targetId, offset: 80 }, lenis);

              // Focus heading if it exists and is focusable
              const headingElement = document.querySelector(
                `#${targetId}-heading`,
              ) as HTMLElement | null;
              if (headingElement && headingElement.tabIndex === -1) {
                headingElement.focus({ preventScroll: true });
              }

              // Update URL without triggering jump
              window.history.replaceState(null, '', `#${targetId}`);
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
                    'relative group block pl-4 text-base',
                    TRANSITION_FAST,
                    // ::before indicator
                    'before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-[var(--color-secondary)]',
                    'before:opacity-0 before:transition-all before:duration-200',
                    isActive
                      ? 'text-[var(--color-primary)] before:opacity-100 font-semibold'
                      : 'text-[var(--color-text)] before:opacity-0',
                    'md:hover:text-[var(--color-primary)] md:hover:before:opacity-100',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                >
                  {label}
                </a>
              </div>
            );
          })}
        </nav>
      </m.div>

      <m.div
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
      </m.div>
    </m.div>
  );
}
