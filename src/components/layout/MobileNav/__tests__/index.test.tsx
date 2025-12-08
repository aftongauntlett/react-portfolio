import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';
import MobileNav from '../index';
import * as ScrollUtils from '@/utils/scroll';
import * as LenisContext from '@/context/LenisContext';
import * as ThemeContext from '@/context/ThemeContext';
import * as ActiveSectionHook from '@/hooks/useActiveSection';
import type Lenis from 'lenis';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
}));

// Mock icons
vi.mock('react-icons/hi2', () => ({
  HiXMark: () => <span>Close Icon</span>,
  HiSun: () => <span>Sun Icon</span>,
  HiMoon: () => <span>Moon Icon</span>,
}));

// Mock Button component
vi.mock('@/components/shared/Button', () => ({
  Button: ({ children, href, ...props }: PropsWithChildren<Record<string, unknown>>) =>
    href ? (
      <a href={href as string} {...props}>
        {children}
      </a>
    ) : (
      <button {...props}>{children}</button>
    ),
}));

describe('MobileNav - Accessibility', () => {
  let mockLenis: Lenis;
  let onCloseMock: () => void;
  let smoothScrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock Lenis instance
    mockLenis = {
      scrollTo: vi.fn(),
    } as unknown as Lenis;

    onCloseMock = vi.fn();

    // Spy on smoothScrollTo
    smoothScrollToSpy = vi.spyOn(ScrollUtils, 'smoothScrollTo').mockImplementation(() => {});

    // Mock context hooks
    vi.spyOn(LenisContext, 'useLenisContext').mockReturnValue({ lenis: mockLenis });
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });
    vi.spyOn(ActiveSectionHook, 'useActiveSection').mockReturnValue('about');

    // Mock matchMedia for prefers-reduced-motion
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    // Mock document.querySelector for heading focus
    vi.spyOn(document, 'querySelector').mockReturnValue(null);

    // Mock history.replaceState
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore body overflow
    document.body.style.overflow = '';
  });

  it('focuses the close button when menu opens', async () => {
    const { rerender } = render(<MobileNav isOpen={false} onClose={onCloseMock} />);

    // Menu is closed, should not render anything
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open the menu
    rerender(<MobileNav isOpen={true} onClose={onCloseMock} />);

    // Wait for focus to be set
    await waitFor(() => {
      const closeButton = screen.getByLabelText(/close navigation menu/i);
      expect(closeButton).toHaveFocus();
    });
  });

  it('closes menu when ESC key is pressed', async () => {
    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const menuDialog = screen.getByRole('dialog');
    expect(menuDialog).toBeInTheDocument();

    // Press ESC key
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('prevents body scroll when menu is open', () => {
    const { unmount } = render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    expect(document.body.style.overflow).toBe('hidden');

    // Cleanup should restore overflow
    unmount();

    expect(document.body.style.overflow).toBe('');
  });

  it('restores body overflow when menu closes', () => {
    const { rerender } = render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    expect(document.body.style.overflow).toBe('hidden');

    // Close menu
    rerender(<MobileNav isOpen={false} onClose={onCloseMock} />);

    expect(document.body.style.overflow).toBe('');
  });

  it('implements simple focus trap keeping tab within menu', async () => {
    const user = userEvent.setup();

    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText(/close navigation menu/i);

    // Close button should be focused initially
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });

    // Get all focusable elements in the menu
    const menuDialog = screen.getByRole('dialog');
    const focusableElements = Array.from(
      menuDialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      ),
    );

    expect(focusableElements.length).toBeGreaterThan(1);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Verify focus trap: Tab from last element should cycle back to first
    lastElement.focus();
    expect(lastElement).toHaveFocus();

    // Tab forward from last element
    await user.tab();

    await waitFor(() => {
      expect(firstElement).toHaveFocus();
    });

    // Verify reverse: Shift+Tab from first element should cycle to last
    firstElement.focus();
    expect(firstElement).toHaveFocus();

    await user.tab({ shift: true });

    await waitFor(() => {
      expect(lastElement).toHaveFocus();
    });
  });

  it('calls smoothScrollTo with correct target and offset when nav link is clicked', () => {
    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    fireEvent.click(aboutLink);

    expect(smoothScrollToSpy).toHaveBeenCalledWith({ target: 'about', offset: 80 }, mockLenis);
  });

  it('closes menu after navigation link is clicked', () => {
    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const skillsLink = screen.getByRole('link', { name: /skills/i });
    fireEvent.click(skillsLink);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('marks active section with aria-current', () => {
    vi.spyOn(ActiveSectionHook, 'useActiveSection').mockReturnValue('experience');

    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const experienceLink = screen.getByRole('link', { name: /experience/i });
    expect(experienceLink).toHaveAttribute('aria-current', 'location');

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('has proper ARIA attributes for dialog', () => {
    render(<MobileNav isOpen={true} onClose={onCloseMock} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu');
  });

  it('does not render when closed', () => {
    render(<MobileNav isOpen={false} onClose={onCloseMock} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
