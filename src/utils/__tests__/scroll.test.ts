import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { smoothScrollTo, scrollToTop } from '../scroll';
import type Lenis from 'lenis';

describe('scroll utilities', () => {
  let mockLenis: Lenis;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;
  let matchMediaMock: Mock;

  beforeEach(() => {
    // Mock Lenis instance
    mockLenis = {
      scrollTo: vi.fn(),
    } as unknown as Lenis;

    // Mock window.scrollTo
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    // Mock matchMedia for prefers-reduced-motion
    matchMediaMock = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    window.matchMedia = matchMediaMock as typeof window.matchMedia;

    // Mock document.querySelector
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('smoothScrollTo', () => {
    it('calls lenis.scrollTo when lenis is provided and reduced motion is not preferred', () => {
      smoothScrollTo({ target: 100, offset: 80 }, mockLenis);

      expect(mockLenis.scrollTo).toHaveBeenCalledWith(100, { offset: -80 });
      expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('falls back to window.scrollTo with smooth behavior when lenis is not provided', () => {
      smoothScrollTo({ target: 100, offset: 80 });

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 100,
        behavior: 'smooth',
      });
      expect(mockLenis.scrollTo).not.toHaveBeenCalled();
    });

    it('uses auto behavior when user prefers reduced motion', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      smoothScrollTo({ target: 100, offset: 80 });

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 100,
        behavior: 'auto',
      });
    });

    it('scrolls to element by selector when lenis is provided', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'test-section';
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement);

      smoothScrollTo({ target: '#test-section', offset: 80 }, mockLenis);

      expect(mockLenis.scrollTo).toHaveBeenCalledWith(mockElement, { offset: -80 });
      expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('falls back to window.scrollTo for element when lenis is not provided', () => {
      const mockElement = document.createElement('div');
      Object.defineProperty(mockElement, 'offsetTop', { value: 500, writable: true });
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement);

      smoothScrollTo({ target: '#test-section', offset: 80 });

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 420, // 500 - 80
        behavior: 'smooth',
      });
    });

    it('handles selectors without # prefix', () => {
      const mockElement = document.createElement('div');
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement);

      smoothScrollTo({ target: 'test-section', offset: 80 }, mockLenis);

      expect(document.querySelector).toHaveBeenCalledWith('#test-section');
      expect(mockLenis.scrollTo).toHaveBeenCalledWith(mockElement, { offset: -80 });
    });

    it('does nothing when element is not found', () => {
      vi.spyOn(document, 'querySelector').mockReturnValue(null);

      smoothScrollTo({ target: '#non-existent', offset: 80 }, mockLenis);

      expect(mockLenis.scrollTo).not.toHaveBeenCalled();
      expect(scrollToSpy).not.toHaveBeenCalled();
    });
  });

  describe('scrollToTop', () => {
    it('calls lenis.scrollTo(0) when lenis is provided', () => {
      scrollToTop(mockLenis);

      expect(mockLenis.scrollTo).toHaveBeenCalledWith(0);
      expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('falls back to window.scrollTo with smooth behavior when lenis is not provided', () => {
      scrollToTop();

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('uses auto behavior when user prefers reduced motion', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      scrollToTop();

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'auto',
      });
    });
  });
});
