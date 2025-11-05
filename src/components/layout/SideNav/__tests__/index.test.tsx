import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import SideNav from '../index';
import * as ScrollUtils from '@/utils/scroll';
import * as LenisContext from '@/context/LenisContext';
import * as ThemeContext from '@/context/ThemeContext';
import * as DetailViewContext from '@/context/DetailViewContext';
import * as ActiveSectionHook from '@/hooks/useActiveSection';
import type Lenis from 'lenis';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('SideNav', () => {
  let mockLenis: Lenis;
  let smoothScrollToSpy: ReturnType<typeof vi.spyOn>;
  let historyReplaceStateSpy: ReturnType<typeof vi.spyOn>;
  let mockSetDetailView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock Lenis instance
    mockLenis = {
      scrollTo: vi.fn(),
    } as unknown as Lenis;

    // Spy on smoothScrollTo
    smoothScrollToSpy = vi.spyOn(ScrollUtils, 'smoothScrollTo').mockImplementation(() => {});

    // Spy on history.replaceState
    historyReplaceStateSpy = vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});

    // Mock setDetailView
    mockSetDetailView = vi.fn();

    // Mock context hooks
    vi.spyOn(LenisContext, 'useLenisContext').mockReturnValue({ lenis: mockLenis });
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });
    vi.spyOn(DetailViewContext, 'useDetailView').mockReturnValue({
      detailView: null,
      setDetailView: mockSetDetailView,
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders navigation items', () => {
    render(<SideNav />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('calls smoothScrollTo with correct target and offset on navigation click', () => {
    render(<SideNav />);

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(aboutLink!);

    expect(smoothScrollToSpy).toHaveBeenCalledWith({ target: 'about', offset: 80 }, mockLenis);
  });

  it('updates URL with history.replaceState on navigation', () => {
    render(<SideNav />);

    const projectsLink = screen.getByText('Projects').closest('a');
    fireEvent.click(projectsLink!);

    expect(historyReplaceStateSpy).toHaveBeenCalledWith(null, '', '#projects');
  });

  it('calls setDetailView(null) when navigating to close detail view', () => {
    // Mock with detail view open
    vi.spyOn(DetailViewContext, 'useDetailView').mockReturnValue({
      detailView: { type: 'post-mortem', slug: 'test-game', title: 'Test Game' },
      setDetailView: mockSetDetailView,
    });

    render(<SideNav />);

    const contactLink = screen.getByText('Contact').closest('a');
    fireEvent.click(contactLink!);

    expect(mockSetDetailView).toHaveBeenCalledWith(null);
  });

  it('focuses heading element when it exists with tabIndex -1', () => {
    const mockHeading = document.createElement('h2');
    mockHeading.id = 'skills-heading';
    mockHeading.tabIndex = -1;
    const focusSpy = vi.spyOn(mockHeading, 'focus');

    vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '#skills-heading') return mockHeading;
      return null;
    });

    render(<SideNav />);

    const skillsLink = screen.getByText('Skills').closest('a');
    fireEvent.click(skillsLink!);

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('does not focus heading if tabIndex is not -1', () => {
    const mockHeading = document.createElement('h2');
    mockHeading.id = 'experience-heading';
    mockHeading.tabIndex = 0;
    const focusSpy = vi.spyOn(mockHeading, 'focus');

    vi.spyOn(document, 'querySelector').mockReturnValue(mockHeading);

    render(<SideNav />);

    const experienceLink = screen.getByText('Experience').closest('a');
    fireEvent.click(experienceLink!);

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation with Enter key', () => {
    render(<SideNav />);

    const aboutLink = screen.getByText('About').closest('a');
    fireEvent.keyDown(aboutLink!, { key: 'Enter' });

    expect(smoothScrollToSpy).toHaveBeenCalledWith({ target: 'about', offset: 80 }, mockLenis);
    expect(historyReplaceStateSpy).toHaveBeenCalledWith(null, '', '#about');
  });

  it('handles keyboard navigation with Space key', () => {
    render(<SideNav />);

    const skillsLink = screen.getByText('Skills').closest('a');
    fireEvent.keyDown(skillsLink!, { key: ' ' });

    expect(smoothScrollToSpy).toHaveBeenCalledWith({ target: 'skills', offset: 80 }, mockLenis);
    expect(historyReplaceStateSpy).toHaveBeenCalledWith(null, '', '#skills');
  });

  it('marks active section with aria-current', () => {
    vi.spyOn(ActiveSectionHook, 'useActiveSection').mockReturnValue('projects');

    render(<SideNav />);

    const projectsLink = screen.getByText('Projects').closest('a');
    expect(projectsLink).toHaveAttribute('aria-current', 'location');

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });
});
