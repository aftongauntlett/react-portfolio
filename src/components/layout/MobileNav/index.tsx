import { useCallback, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { HiXMark } from 'react-icons/hi2';
import { BsMoonFill } from 'react-icons/bs';
import { navItems } from '@/constants/navigation';
import { DURATION, EASING } from '@/constants/animations';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenisContext } from '@/context/LenisContext';
import { useTheme } from '@/context/ThemeContext';
import { navigateToSection } from '@/utils/sectionNavigation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IconSun } from '@/components/shared/InlineIcons';
import { Button } from '@/components/shared/Button';
import { useWillChange } from '@/hooks/useWillChange';
import { useMobileNavA11y } from './useMobileNavA11y';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}

export default function MobileNav({ isOpen, onClose, openerRef }: MobileNavProps) {
  const activeSection = useActiveSection();
  const { lenis } = useLenisContext();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);

  const handleClose = useCallback(() => {
    onClose();
    openerRef.current?.focus();
  }, [onClose, openerRef]);

  useMobileNavA11y({ isOpen, handleClose, menuRef, closeButtonRef });

  const handleNavClick = (targetId: string) => {
    navigateToSection(targetId, lenis);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : DURATION.fast }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(var(--color-backdrop-rgb), 0.5)', backdropFilter: 'none' }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Slide-over Menu */}
          <motion.div
            ref={menuRef}
            id="mobile-nav-dialog"
            initial={{ x: prefersReducedMotion ? 0 : 300 }}
            animate={{ x: 0 }}
            exit={{ x: prefersReducedMotion ? 0 : 300 }}
            transition={{
              duration: prefersReducedMotion ? 0 : DURATION.normal,
              ease: EASING.easeInOut,
            }}
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
                <Button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  variant="unstyled"
                  icon={<HiXMark size={24} />}
                  className={clsx(
                    'rounded-lg',
                    'text-[var(--color-muted)] hover:text-[var(--color-text)]',
                    'hover:bg-[var(--color-surface)]',
                    'transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                  aria-label="Close navigation menu"
                />
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
                              : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]',
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
                  className="w-full rounded-full"
                >
                  Resume
                </Button>
                <Button
                  onClick={toggleTheme}
                  variant="unstyled"
                  icon={theme === 'dark' ? <IconSun size={18} /> : <BsMoonFill size={15} />}
                  className={clsx(
                    'w-full rounded-lg',
                    'text-base font-medium',
                    'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                    'hover:bg-[var(--color-surface)]',
                    'transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
                  )}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
