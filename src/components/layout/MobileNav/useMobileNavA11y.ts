import { useCallback, useEffect, type RefObject } from 'react';

type UseMobileNavA11yParams = {
  isOpen: boolean;
  handleClose: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export function useMobileNavA11y({
  isOpen,
  handleClose,
  menuRef,
  closeButtonRef,
}: UseMobileNavA11yParams) {
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen, closeButtonRef]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleMenuKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (!menuRef.current || event.key !== 'Tab') return;

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    },
    [menuRef],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleMenuKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleMenuKeyDown);
    };
  }, [isOpen, handleMenuKeyDown]);
}
