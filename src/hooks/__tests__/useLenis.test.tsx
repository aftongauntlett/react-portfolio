import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { useLenis } from '../useLenis';

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize Lenis when no reduced motion preference', () => {
    // Mock matchMedia to return false for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { getByText } = render(<TestComponent />);

    waitFor(() => {
      expect(getByText('Lenis initialized')).toBeInTheDocument();
    });
  });

  it('should not initialize Lenis when reduced motion is preferred', () => {
    // Mock matchMedia to return true for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { getByText } = render(<TestComponent />);

    expect(getByText('No Lenis')).toBeInTheDocument();
  });
});
