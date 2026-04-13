import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import ContactSection from '../index';

vi.mock('framer-motion', async () => {
  const { createMotionProxy } = await import('@/test/framerMotionTestUtils');

  return {
    motion: createMotionProxy(['div', 'section', 'button', 'a', 'label', 'ul', 'li', 'span']),
    m: createMotionProxy(['div', 'section', 'button', 'a']),
    LazyMotion: ({ children }: PropsWithChildren) => <>{children}</>,
    domAnimation: {},
  };
});

vi.mock('@/components/shared/MotionSection', async () => {
  const { stripMotionProps } = await import('@/test/framerMotionTestUtils');

  return {
    default: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...stripMotionProps(props)}>{children}</div>
    ),
  };
});

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
  getMotionDuration: () => 0.3,
}));

vi.mock('@/hooks/usePointerTilt', () => ({
  usePointerTilt: () => ({
    tiltStyle: {},
    onPointerMove: () => {},
    onPointerLeave: () => {},
  }),
}));

describe('ContactSection', () => {
  it('renders direct email contact link', () => {
    render(<ContactSection />);

    const emailLink = screen.getByRole('link', { name: /hello@aftongauntlett.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@aftongauntlett.com');
  });

  it('renders GitHub profile button link', () => {
    render(<ContactSection />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aftongauntlett');
  });

  it('renders LinkedIn profile button link', () => {
    render(<ContactSection />);

    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/afton-gauntlett/');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('does not render the old contact form controls', () => {
    render(<ContactSection />);

    expect(screen.queryByRole('textbox', { name: /name/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /message/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument();
  });
});
