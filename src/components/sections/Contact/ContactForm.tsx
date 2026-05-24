import type { FormEvent, RefObject } from 'react';
import { Button } from '@/components/shared/Button';
import { LuLoaderCircle, LuSend } from 'react-icons/lu';
import {
  CONTACT_EMAIL,
  TURNSTILE_SITE_KEY,
  type FormStatus,
} from '@/components/sections/Contact/useContactForm';

const fieldClasses =
  'w-full rounded-md border border-[var(--color-line)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20';

const labelClasses =
  'font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors duration-200 group-focus-within/field:text-[var(--color-primary)]';

type ContactFormProps = {
  formRef: RefObject<HTMLFormElement | null>;
  formStatus: FormStatus;
  statusMessage: string;
  turnstileCircuitOpen: boolean;
  isTurnstileEnabled: boolean;
  emailValidationMessage: string;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
  requiresTurnstileToken: boolean;
  validateEmailField: () => boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function ContactForm({
  formRef,
  formStatus,
  statusMessage,
  turnstileCircuitOpen,
  isTurnstileEnabled,
  emailValidationMessage,
  isSubmitting,
  isSubmitDisabled,
  requiresTurnstileToken,
  validateEmailField,
  handleSubmit,
}: ContactFormProps) {
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full space-y-4 text-left"
      noValidate
      aria-label="Contact form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group/field space-y-1.5">
          <label htmlFor="contact-name" className={labelClasses}>
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
          <label htmlFor="contact-email" className={labelClasses}>
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
        <label htmlFor="contact-message" className={labelClasses}>
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
            className="order-1 self-end sm:order-2 sm:ml-auto"
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

        {isTurnstileEnabled && TURNSTILE_SITE_KEY && !turnstileCircuitOpen ? (
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
        ) : isTurnstileEnabled && TURNSTILE_SITE_KEY && turnstileCircuitOpen ? (
          <div className="self-start sm:self-end rounded-md border border-[var(--color-line)] bg-[var(--color-background)] px-3 py-2 text-xs text-[var(--color-muted)]">
            <p>Security check has been paused after repeated failures.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 inline-block font-semibold text-[var(--color-secondary)] underline underline-offset-2"
            >
              Email me directly
            </a>
          </div>
        ) : (
          <p className="text-xs text-[var(--color-muted)]">
            Spam protection is enabled with a non-interactive honeypot filter.
          </p>
        )}

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-company">Company website</label>
          <input
            id="contact-company"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {requiresTurnstileToken ? (
          <p className="text-xs text-[var(--color-muted)] sm:text-right">
            Complete the security check to enable Send message.
          </p>
        ) : null}
      </div>
    </form>
  );
}
