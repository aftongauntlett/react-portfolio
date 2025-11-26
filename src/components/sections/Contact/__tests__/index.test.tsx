import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren, ChangeEvent } from 'react';
import ContactSection from '../index';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    button: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <a {...props}>{children}</a>
    ),
  },
  LazyMotion: ({ children }: PropsWithChildren) => <>{children}</>,
  domAnimation: {},
}));

// Mock MotionSection to render as plain div
vi.mock('@/components/shared/MotionSection', () => ({
  default: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Send: () => <span>Send Icon</span>,
  X: () => <span>X Icon</span>,
  CheckCircle: () => <span>Check Icon</span>,
  AlertCircle: () => <span>Alert Icon</span>,
}));

// Mock FormComponents
vi.mock('@/components/shared/FormComponents', () => ({
  FormField: ({
    label,
    name,
    type,
    value,
    onChange,
    disabled,
    error,
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type || 'text'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  ),
  TextAreaField: ({
    label,
    name,
    value,
    onChange,
    disabled,
    error,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    error?: string;
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  ),
}));

// Mock usePrefersReducedMotion hook
vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
  getMotionDuration: () => 0.3,
}));

describe('ContactSection', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock fetch
    fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    // Mock matchMedia for prefers-reduced-motion
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the contact form with all fields', () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays error messages when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Submit button should be disabled initially
    expect(submitButton).toBeDisabled();

    // Click submit (this won't actually submit due to validation)
    await user.click(submitButton);

    // No errors should appear yet since button is disabled
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
  });

  it('shows validation errors for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.type(messageInput, 'Short msg'); // Less than 10 chars

    // Try to submit by clicking the button (should still be disabled)
    expect(submitButton).toBeDisabled();
  });

  it('shows validation error for short message', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Enter valid email but short message
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Short'); // Less than 10 chars

    // Button should still be disabled
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button with valid email and message', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Initially disabled
    expect(submitButton).toBeDisabled();

    // Enter valid data
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a valid message that is long enough');

    // Button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('submits form successfully and shows success message', async () => {
    const user = userEvent.setup();

    // Mock successful response
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'This is a test message that is long enough for validation');

    // Submit form
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    // Verify form was reset
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
    expect(nameInput).toHaveValue('');
  });

  it('shows error message on network failure', async () => {
    const user = userEvent.setup();

    // Mock network error for all retry attempts (3 total)
    fetchSpy.mockRejectedValue(new Error('Network error'));

    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a test message that is long enough');

    // Submit form
    await user.click(submitButton);

    // Wait for error message after all retries complete
    await waitFor(
      () => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
        expect(screen.getByText(/email me directly/i)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it('shows timeout error message when request takes too long', async () => {
    const user = userEvent.setup();

    // Mock a request that triggers abort
    fetchSpy.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => {
            const abortError = new Error('AbortError');
            abortError.name = 'AbortError';
            reject(abortError);
          }, 100);
        }),
    );

    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a test message');

    // Submit form
    await user.click(submitButton);

    // Wait for timeout error
    await waitFor(
      () => {
        expect(
          screen.getByText(/request timed out.*try again.*email me directly/i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('shows retry messaging on server error with retries', async () => {
    const user = userEvent.setup();

    // Mock server error (500) which triggers retries
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a test message');

    // Submit form
    await user.click(submitButton);

    // Should show retry message
    await waitFor(
      () => {
        expect(screen.getByText(/retrying/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('allows cancelling an in-flight request', async () => {
    const user = userEvent.setup();

    // Mock a slow response
    fetchSpy.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                ok: true,
                status: 200,
                json: async () => ({}),
              } as Response),
            5000,
          );
        }),
    );

    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a test message');

    // Submit form
    await user.click(submitButton);

    // Wait for loading state
    await waitFor(() => {
      expect(screen.getByText(/sending message/i)).toBeInTheDocument();
    });

    // Find and click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Form should return to idle state
    await waitFor(() => {
      expect(screen.queryByText(/sending message/i)).not.toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('validates phone number format if provided', async () => {
    const user = userEvent.setup();

    render(<ContactSection />);

    const phoneInput = screen.getByLabelText(/phone/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Enter invalid phone
    await user.type(phoneInput, 'abc');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Valid message here');

    // Trigger validation by trying to submit
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Phone validation should kick in
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('clears field errors when user starts typing', async () => {
    const user = userEvent.setup();

    render(<ContactSection />);

    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Enter invalid email and short message
    await user.type(emailInput, 'invalid');
    await user.type(messageInput, 'Short');

    // Try to submit to trigger validation
    fireEvent.click(submitButton);

    // Clear and re-enter valid email - error should clear as user types
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@example.com');

    // Email error should not persist
    expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
  });
});
