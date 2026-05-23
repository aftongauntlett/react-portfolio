import { motion } from 'framer-motion';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/shared/Button';
import PaintSplashText from '@/components/shared/PaintSplashEffect';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { LuLoaderCircle, LuSend } from 'react-icons/lu';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwldyrq';
const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const EMAIL = 'hello@aftongauntlett.com';
const MAX_TURNSTILE_ERRORS = 3;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

declare global {
  interface Window {
    handleTurnstileError?: (errorCode: string | number) => boolean;
    handleTurnstileSuccess?: (token: string) => void;
    handleTurnstileExpired?: () => void;
    handleTurnstileTimeout?: () => void;
  }
}

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ?? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

const fieldClasses =
  'w-full rounded-md border border-[var(--color-line)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20';

export default function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileErrorCountRef = useRef(0);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileFallbackEnabled, setTurnstileFallbackEnabled] = useState(false);
  const [turnstileCircuitOpen, setTurnstileCircuitOpen] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');

  const isSubmitting = formStatus === 'submitting';
  const requiresTurnstileToken =
    Boolean(TURNSTILE_SITE_KEY) && !turnstileFallbackEnabled && !turnstileCircuitOpen;
  const isSubmitDisabled =
    isSubmitting ||
    turnstileCircuitOpen ||
    (requiresTurnstileToken && turnstileToken.trim().length === 0);

  const validateEmailField = () => {
    const emailInput = formRef.current?.elements.namedItem('email');

    if (!(emailInput instanceof HTMLInputElement)) {
      return true;
    }

    if (emailInput.value.length === 0 || emailInput.validity.valid) {
      setEmailValidationMessage('');
      return true;
    }

    setEmailValidationMessage('Please enter a valid email address, for example name@company.com.');
    return false;
  };

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || turnstileFallbackEnabled || turnstileCircuitOpen) return;

    window.handleTurnstileSuccess = (token) => {
      setTurnstileToken(token);
      turnstileErrorCountRef.current = 0;
      setFormStatus('idle');
      setStatusMessage('');
    };

    window.handleTurnstileExpired = () => {
      setTurnstileToken('');
      setFormStatus('error');
      setStatusMessage('Security check expired. Please complete it again.');
    };

    window.handleTurnstileTimeout = () => {
      setTurnstileToken('');
      setFormStatus('error');
      setStatusMessage('Security check timed out. Please complete it again.');
    };

    window.handleTurnstileError = (errorCode) => {
      const code = String(errorCode);

      setTurnstileToken('');

      if (import.meta.env.DEV && code.startsWith('110200')) {
        setTurnstileFallbackEnabled(true);
        setFormStatus('idle');
        setStatusMessage(
          'Turnstile is unavailable on localhost for this site key. Dev fallback is enabled so you can keep testing.',
        );
        return true;
      }

      const nextErrorCount = turnstileErrorCountRef.current + 1;
      turnstileErrorCountRef.current = nextErrorCount;

      if (nextErrorCount >= MAX_TURNSTILE_ERRORS) {
        setTurnstileCircuitOpen(true);
        setFormStatus('error');
        setStatusMessage(
          'Security check failed repeatedly and has been paused. Please email me directly below.',
        );
        return true;
      }

      if (code.startsWith('110200')) {
        setFormStatus('error');
        setStatusMessage(
          'Turnstile domain is not authorized for this site key. Add localhost and 127.0.0.1 in Cloudflare Hostname Management.',
        );
      } else {
        setFormStatus('error');
        setStatusMessage(`Security check failed (${code}). Please refresh and try again.`);
      }

      return true;
    };

    if (document.getElementById(TURNSTILE_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.handleTurnstileError;
      delete window.handleTurnstileSuccess;
      delete window.handleTurnstileExpired;
      delete window.handleTurnstileTimeout;
    };
  }, [turnstileCircuitOpen, turnstileFallbackEnabled]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    if (!formRef.current.checkValidity()) {
      validateEmailField();
      formRef.current.reportValidity();
      return;
    }

    if (!validateEmailField()) {
      return;
    }

    if (turnstileCircuitOpen) {
      setFormStatus('error');
      setStatusMessage('Security check is paused. Please use direct email to get in touch.');
      return;
    }

    const formData = new FormData(formRef.current);
    if (turnstileToken) {
      formData.set('cf-turnstile-response', turnstileToken);
    }

    const turnstileResponse = formData.get('cf-turnstile-response');

    if (
      requiresTurnstileToken &&
      (!turnstileResponse || String(turnstileResponse).trim().length === 0)
    ) {
      setFormStatus('error');
      setStatusMessage('Please complete the security check before sending your message.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('Sending your message...');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Something went wrong while sending. Please try again.';

        try {
          const errorData = (await response.json()) as {
            errors?: Array<{ message?: string }>;
          };
          errorMessage = errorData.errors?.[0]?.message ?? errorMessage;
        } catch {
          // Keep default message when API error payload is not JSON.
        }

        setFormStatus('error');
        setStatusMessage(errorMessage);
        return;
      }

      formRef.current.reset();
      setTurnstileToken('');
      setEmailValidationMessage('');
      setFormStatus('success');
      setStatusMessage('Message sent. Thanks for reaching out - I will reply soon.');
    } catch {
      setFormStatus('error');
      setStatusMessage('Network issue detected. Please try again in a moment.');
    }
  };

  return (
    <motion.div
      className={clsx(
        'group block rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]',
        COMPONENT_SPACING.CARD_PADDING,
        'text-center transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)] dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]',
      )}
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: getMotionDuration(0.5, prefersReducedMotion), ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? undefined : 'hover'}
    >
      <div className="space-y-6">
        <PaintSplashText
          tag="h3"
          className="text-3xl leading-tight text-[var(--color-text)]"
          isActive={true}
          scrollProgress={1}
          prefersReducedMotion={prefersReducedMotion}
        >
          Get in Touch
        </PaintSplashText>

        <p className="text-description mx-auto max-w-lg transition-colors duration-300 group-hover:text-[var(--color-text)] group-focus-within:text-[var(--color-text)]">
          Have a role, a project, or a question in mind? Send me a message below and I will get back
          to you shortly.
        </p>

        <hr className="mx-auto w-32 border-t border-[var(--color-line)]" />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-xl space-y-4 text-left"
          noValidate
          aria-label="Contact form"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group/field space-y-1.5">
              <label
                htmlFor="contact-name"
                className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(var(--color-primary-rgb),0.74)] transition-colors duration-200 group-focus-within/field:text-[var(--color-primary)]"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClasses}
                placeholder="Your name"
              />
            </div>

            <div className="group/field space-y-1.5">
              <label
                htmlFor="contact-email"
                className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(var(--color-primary-rgb),0.74)] transition-colors duration-200 group-focus-within/field:text-[var(--color-primary)]"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClasses}
                placeholder="you@example.com"
                aria-invalid={emailValidationMessage ? true : undefined}
                aria-describedby={emailValidationMessage ? 'contact-email-validation' : undefined}
                onBlur={validateEmailField}
                onInput={() => {
                  if (emailValidationMessage) {
                    validateEmailField();
                  }
                }}
              />
              {emailValidationMessage ? (
                <p id="contact-email-validation" className="text-xs text-[var(--color-secondary)]">
                  {emailValidationMessage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="group/field space-y-1.5">
            <label
              htmlFor="contact-message"
              className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(var(--color-primary-rgb),0.74)] transition-colors duration-200 group-focus-within/field:text-[var(--color-primary)]"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className={`${fieldClasses} resize-y`}
              placeholder="Tell me about your project, role, or question."
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="outline"
                color="primary"
                disabled={isSubmitDisabled}
                className="order-1 self-start sm:order-2 sm:ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                    Sending...
                  </>
                ) : (
                  <>
                    <LuSend className="h-4 w-4" aria-hidden />
                    Send message
                  </>
                )}
              </Button>

              <p
                role={formStatus === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                className={`order-2 text-xs sm:order-1 ${
                  formStatus === 'error'
                    ? 'text-[var(--color-secondary)]'
                    : formStatus === 'success'
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-muted)]'
                }`}
              >
                {statusMessage}
              </p>
            </div>

            {TURNSTILE_SITE_KEY && !turnstileCircuitOpen ? (
              <div className="self-start sm:self-end">
                <div
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITE_KEY}
                  data-theme="auto"
                  data-callback="handleTurnstileSuccess"
                  data-expired-callback="handleTurnstileExpired"
                  data-timeout-callback="handleTurnstileTimeout"
                  data-error-callback="handleTurnstileError"
                  data-retry="never"
                />
              </div>
            ) : TURNSTILE_SITE_KEY && turnstileCircuitOpen ? (
              <div className="self-start sm:self-end rounded-md border border-[var(--color-line)] bg-[var(--color-background)] px-3 py-2 text-xs text-[var(--color-muted)]">
                <p>Security check has been paused after repeated failures.</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 inline-block font-semibold text-[var(--color-secondary)] underline underline-offset-2"
                >
                  Email me directly
                </a>
              </div>
            ) : (
              <p className="text-xs text-[var(--color-muted)]">
                Security challenge is not configured yet. Add the Turnstile site key to enable spam
                protection.
              </p>
            )}
            {requiresTurnstileToken ? (
              <p className="text-xs text-[var(--color-muted)] sm:text-right">
                Complete the security check to enable Send message.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
