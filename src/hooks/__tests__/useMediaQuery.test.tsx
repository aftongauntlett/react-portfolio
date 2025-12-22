import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useMediaQuery } from '@/test/useMediaQuery';

function TestComponent({ query }: { query: string }) {
  const matches = useMediaQuery(query);
  return <div data-testid="value">{matches ? 'true' : 'false'}</div>;
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the initial match value', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<TestComponent query="(min-width: 768px)" />);
    expect(screen.getByTestId('value')).toHaveTextContent('true');

    render(<TestComponent query="(prefers-reduced-motion: reduce)" />);
    expect(screen.getAllByTestId('value')[1]).toHaveTextContent('false');
  });

  it('updates when the media query match changes', () => {
    let listener: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        let matches = false;

        return {
          get matches() {
            return matches;
          },
          set matches(v: boolean) {
            matches = v;
          },
          media: query,
          onchange: null,
          addEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => {
            listener = cb;
          }),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    });

    render(<TestComponent query="(min-width: 768px)" />);
    expect(screen.getByTestId('value')).toHaveTextContent('false');

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(screen.getByTestId('value')).toHaveTextContent('true');
  });
});
