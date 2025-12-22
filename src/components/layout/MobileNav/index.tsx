import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { navItems } from '@/constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenisContext } from '@/context/LenisContext';
import { useTheme } from '@/context/ThemeContext';
import { smoothScrollTo } from '@/utils/domScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import clsx from 'clsx';
import { HiXMark, HiSun, HiMoon } from 'react-icons/hi2';
import { Button } from '@/components/shared/Button';
import { useWillChange } from '@/hooks/useWillChange';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const activeSection = useActiveSection();
  const { lenis } = useLenisContext();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);

  // Focus trap: Focus close button when menu opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleNavClick = (targetId: string) => {
    smoothScrollTo({ target: targetId, offset: 80 }, lenis);
    window.history.replaceState(null, '', `#${targetId}`);

    // Focus heading for keyboard navigation
    const heading = document.querySelector(`#${targetId}-heading`);
    if (heading instanceof HTMLElement && heading.tabIndex === -1) {
      heading.focus({ preventScroll: true });
    }

    onClose();
  };

  // Focus trap within menu
  const handleMenuKeyDown = (e: globalThis.KeyboardEvent) => {
    if (!menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleMenuKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleMenuKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'none' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-over Menu */}
          <m.div
            ref={menuRef}
            initial={{ x: prefersReducedMotion ? 0 : 300 }}
            animate={{ x: 0 }}
            exit={{ x: prefersReducedMotion ? 0 : 300 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--color-background)] border-l border-[var(--color-line)] z-50 lg:hidden overflow-y-auto gpu-accelerate"
            style={{ ...willChangeStyle, contain: 'layout style paint' }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className={clsx(
                    'p-2 rounded-lg',
                    'text-[var(--color-muted)] hover:text-[var(--color-text)]',
                    'hover:bg-[var(--color-surface)]',
                    'transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                  aria-label="Close navigation menu"
                >
                  <HiXMark size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile navigation" className="flex-1">
                <ul className="space-y-1" role="list">
                  {navItems.map(({ id, label }) => {
                    const isActive = activeSection === id;

                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(id);
                          }}
                          className={clsx(
                            'block py-3 px-4 rounded-lg',
                            'text-base font-medium',
                            'transition-colors duration-200',
                            'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                            isActive
                              ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                              : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
                          )}
                          aria-current={isActive ? 'location' : undefined}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="border-t border-[var(--color-line)] pt-4 space-y-2">
                <Button
                  href="https://aftongauntlett.github.io/resume/"
                  variant="outline"
                  color="primary"
                  className="w-full"
                >
                  Resume
                </Button>
                <button
                  onClick={toggleTheme}
                  className={clsx(
                    'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg',
                    'text-base font-medium',
                    'text-[var(--color-muted)] hover:text-[var(--color-text)]',
                    'hover:bg-[var(--color-surface)]',
                    'transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
