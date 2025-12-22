import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { useLenis } from '../useLenis';
import Lenis from 'lenis';

// Mock Lenis
vi.mock('lenis', () => {
  return {
    default: vi.fn(function () {
      return {
        raf: vi.fn(),
        destroy: vi.fn(),
        scrollTo: vi.fn(),
      };
    }),
  };
});

// Test component that uses the hook
function TestComponent() {
  const lenis = useLenis();
  return <div>{lenis ? 'Lenis initialized' : 'No Lenis'}</div>;
}

describe('useLenis', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    vi.clearAllMocks();
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should initialize Lenis when no reduced motion preference', async () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') listeners.push(cb);
      }),
      removeEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event !== 'change') return;
        const index = listeners.indexOf(cb);
        if (index >= 0) listeners.splice(index, 1);
      }),
      dispatchEvent: vi.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        if (query === '(prefers-reduced-motion: reduce)') return mql;
        return { ...mql, media: query };
      }),
    });

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Lenis initialized')).toBeInTheDocument();
    });
  });

  it('should not initialize Lenis when reduced motion is preferred', () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql = {
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') listeners.push(cb);
      }),
      removeEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event !== 'change') return;
        const index = listeners.indexOf(cb);
        if (index >= 0) listeners.splice(index, 1);
      }),
      dispatchEvent: vi.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        if (query === '(prefers-reduced-motion: reduce)') return mql;
        return { ...mql, matches: false, media: query };
      }),
    });

    const { getByText } = render(<TestComponent />);

    expect(getByText('No Lenis')).toBeInTheDocument();
  });

  it('should destroy Lenis and set null when reduced motion is enabled after load, and re-init when disabled', async () => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') listeners.push(cb);
      }),
      removeEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event !== 'change') return;
        const index = listeners.indexOf(cb);
        if (index >= 0) listeners.splice(index, 1);
      }),
      dispatchEvent: vi.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        if (query === '(prefers-reduced-motion: reduce)') return mql;
        return { ...mql, matches: false, media: query };
      }),
    });

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Lenis initialized')).toBeInTheDocument();
    });

    const LenisMock = Lenis as unknown as { mock: { instances: Array<{ destroy: () => void }> } };
    expect(LenisMock.mock.instances.length).toBe(1);
    const firstInstance = LenisMock.mock.instances[0];

    mql.matches = true;
    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });

    await waitFor(() => {
      expect(getByText('No Lenis')).toBeInTheDocument();
    });
    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);

    mql.matches = false;
    act(() => {
      listeners.forEach((cb) => cb({ matches: false } as MediaQueryListEvent));
    });

    await waitFor(() => {
      expect(getByText('Lenis initialized')).toBeInTheDocument();
    });
    expect(LenisMock.mock.instances.length).toBe(2);
  });
});
