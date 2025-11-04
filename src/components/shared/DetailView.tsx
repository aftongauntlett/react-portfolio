import { useEffect, useRef, type ReactNode } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from './Button';
import { FOCUS_STYLES } from '@/constants/styles';
import { useLenisContext } from '@/context/LenisContext';
import { scrollToTop } from '@/utils/scroll';
import clsx from 'clsx';

interface DetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function DetailView({ isOpen, onClose, title, children }: DetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { lenis } = useLenisContext();

  // Store the element that was focused before opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the container when opening for screen readers
      setTimeout(() => containerRef.current?.focus(), 100);
    } else if (previousFocusRef.current) {
      // Return focus when closing
      setTimeout(() => previousFocusRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Scroll to top when opening
  useEffect(() => {
    if (isOpen) {
      scrollToTop(lenis);
    }
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full max-w-4xl mx-auto"
          role="region"
          aria-label={`Post-mortem: ${title}`}
          tabIndex={-1}
        >
          {/* Back Button - Prominent at top */}
          <div className="sticky top-0 z-10 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-line)] py-4 mb-8">
            <Button
              onClick={onClose}
              variant="link"
              color="primary"
              className={clsx('group', FOCUS_STYLES.COMPACT)}
              aria-label="Close post-mortem and return to projects"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Button>
          </div>

          {/* Content Area */}
          <div className="space-y-8">{children}</div>

          {/* Bottom Back Button */}
          <div className="mt-16 pt-8 border-t border-[var(--color-line)] text-center">
            <Button
              onClick={onClose}
              variant="link"
              color="primary"
              className={clsx('group', FOCUS_STYLES.COMPACT)}
              aria-label="Close post-mortem and return to projects"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
