import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
  getMotionDuration: () => 0.3,
}));

describe('ContactSection', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();

    vi.stubGlobal('fetch', fetchMock);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('renders contact form fields and submit button', () => {
    render(<ContactSection />);

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows inline validation messaging for invalid email', () => {
    render(<ContactSection />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits the form to Formspree and shows a success message', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<ContactSection />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Afton' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'hello@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Hello from tests.' },
    });

    const sendButton = screen.getByRole('button', { name: /send message/i });
    const win = window as Window & {
      handleTurnstileSuccess?: (token: string) => void;
    };
    if (win.handleTurnstileSuccess) {
      expect(sendButton).toBeDisabled();
      await act(async () => {
        win.handleTurnstileSuccess?.('test-token');
      });
      await waitFor(() => {
        expect(sendButton).toBeEnabled();
      });
    }

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://formspree.io/f/mpwldyrq',
        expect.objectContaining({
          method: 'POST',
          headers: { Accept: 'application/json' },
        }),
      );
    });

    expect(screen.getByRole('status')).toHaveTextContent(/message sent/i);
  });

  it('does not render contact details links', () => {
    render(<ContactSection />);

    expect(screen.queryByRole('link', { name: /visit linkedin profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /visit github profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /download resume/i })).not.toBeInTheDocument();
  });

  it('uses honeypot protection by default', () => {
    render(<ContactSection />);

    expect(screen.getByText(/non-interactive honeypot filter/i)).toBeInTheDocument();

    const honeypotInput = document.querySelector('input[name="_gotcha"]');
    expect(honeypotInput).toBeInTheDocument();
  });

  it('suppresses bot-like honeypot submissions', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<ContactSection />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Afton' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'hello@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Hello from tests.' },
    });

    const honeypotInput = document.querySelector('input[name="_gotcha"]');
    expect(honeypotInput).toBeInstanceOf(HTMLInputElement);

    fireEvent.change(honeypotInput as HTMLInputElement, {
      target: { value: 'https://spam.invalid' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });

    expect(screen.getByRole('status')).toHaveTextContent(/message sent/i);
  });
});
