import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { m } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import MotionSection from '@/components/shared/MotionSection';
import { FormField, TextAreaField } from '@/components/shared/FormComponents';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  _gotcha: string; // Formspree's built-in honeypot field
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Constants for retry/timeout configuration
const FORM_SUBMIT_TIMEOUT_MS = 8000;
const RETRY_BASE_DELAY_MS = 1000;

export default function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const abortControllerRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    _gotcha: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Simple email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form has minimum required fields (for button state)
  const isFormReady = (): boolean => {
    return (
      formData.email.trim().length > 0 &&
      isValidEmail(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  // Basic form validation (Formspree handles spam/security)
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name is optional - no validation needed

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 254) {
      newErrors.email = 'Email must be 254 characters or less';
    }

    // Phone is optional, but validate format if provided
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[\s\-()]*([0-9][\s\-()]*){10,14}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (formData.phone.length > 20) {
        newErrors.phone = 'Phone number must be 20 characters or less';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Please provide a more detailed message (at least 10 characters)';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be 2000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing (but not for honeypot)
    if (name !== '_gotcha' && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent double submit
    if (isLoading) {
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    const attemptSubmit = async (retryCount = 0): Promise<void> => {
      // Create new AbortController and timeout for each attempt
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const timeoutId = setTimeout(() => abortController.abort(), FORM_SUBMIT_TIMEOUT_MS);

      try {
        const response = await fetch('https://formspree.io/f/mpwldyrq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            _gotcha: formData._gotcha,
          }),
          signal: abortController.signal,
        });

        if (response.ok) {
          abortControllerRef.current = null;
          setStatus({
            type: 'success',
            message: "Message sent successfully! I'll get back to you soon.",
          });

          setFormData({ name: '', email: '', phone: '', message: '', _gotcha: '' });
        } else {
          // Don't retry 4xx errors (client errors)
          if (response.status >= 400 && response.status < 500) {
            const errorText = await response.text();
            if (import.meta.env.DEV) {
              console.error('Formspree error response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
              });
            }
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
          }

          // Retry 5xx errors (server errors)
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (error) {
        // Handle abort (timeout or user cancel)
        if (error instanceof Error && error.name === 'AbortError') {
          // Check if it was user-initiated cancel
          if (abortControllerRef.current === null) {
            setStatus({
              type: 'idle',
              message: '',
            });
            return;
          }
          if (import.meta.env.DEV) {
            console.error('Form submission timeout');
          }
          setStatus({
            type: 'error',
            message: 'Request timed out. Please try again or email me directly.',
          });
          abortControllerRef.current = null;
          return;
        }

        // Retry logic for network errors only (up to 2 retries)
        if (retryCount < 2) {
          const backoffDelay = Math.pow(2, retryCount) * RETRY_BASE_DELAY_MS; // Exponential backoff: 1s for first retry, 2s for second retry
          if (import.meta.env.DEV) {
            console.log(
              `Retrying submission (attempt ${retryCount + 2}/3) after ${backoffDelay}ms`,
            );
          }

          // Update status with retry message
          setStatus({
            type: 'loading',
            message: `Retrying (${retryCount + 2}/3)...`,
          });

          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return attemptSubmit(retryCount + 1);
        }

        // All retries exhausted
        if (import.meta.env.DEV) {
          console.error('Form submission error:', error);
        }
        abortControllerRef.current = null;
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or email me directly.',
        });
      } finally {
        // Always clear timeout after attempt completes
        clearTimeout(timeoutId);
      }
    };

    await attemptSubmit();
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus({ type: 'idle', message: '' });
  };

  const isLoading = status.type === 'loading';

  return (
    <m.div
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: getMotionDuration(0.2, prefersReducedMotion),
          },
        },
      }}
    >
      <MotionSection
        variants={{
          hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: getMotionDuration(0.5, prefersReducedMotion),
              ease: 'easeOut' as const,
            },
          },
        }}
      >
        <div className="space-y-4">
          <p className="text-[var(--color-muted)]">
            Whether you want to chat about a job opening, a project, collaboration, or just say hi -
            my inbox is always open. I'll try to respond as soon as I can!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-3">
            <div className="text-left">
              <Button
                variant="link"
                color="primary"
                href="mailto:hello@aftongauntlett.com"
                className="text-sm pb-0.5"
              >
                hello@aftongauntlett.com
              </Button>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        variants={{
          hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: getMotionDuration(0.5, prefersReducedMotion),
              ease: 'easeOut' as const,
            },
          },
        }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Formspree's built-in honeypot field */}
          <input
            type="text"
            name="_gotcha"
            value={formData._gotcha}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <FormField
            label="Name"
            name="name"
            optional
            placeholder="Your name"
            maxLength={100}
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            error={errors.name}
            spellCheck={false}
          />

          {/* Email and Phone in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              maxLength={254}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              error={errors.email}
              spellCheck={false}
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              optional
              placeholder="+1 (555) 123-4567"
              maxLength={20}
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
              error={errors.phone}
              spellCheck={false}
            />
          </div>

          <TextAreaField
            label="Message"
            name="message"
            required
            placeholder="How can I help?"
            maxLength={2000}
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isLoading}
            error={errors.message}
          />
          {status.message && (
            <div
              className={`p-4 rounded-lg text-sm border-2 ${
                status.type === 'success'
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              <div className="flex items-start">
                <span
                  className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-3 ${
                    status.type === 'success'
                      ? 'bg-[var(--color-primary)]'
                      : status.type === 'error'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                  }`}
                ></span>
                {status.message}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            {isLoading && (
              <Button type="button" onClick={handleCancel} variant="outline" color="muted">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading || !isFormReady()}
              variant="outline"
              color="primary"
              className={isLoading ? 'btn--loading' : ''}
              title={!isFormReady() && !isLoading ? 'Please fill in all required fields' : ''}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </MotionSection>
    </m.div>
  );
}
