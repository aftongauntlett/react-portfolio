import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ensureTurnstileScriptLoaded, registerTurnstileHandlers } from './contactTurnstile';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwldyrq';
export const CONTACT_EMAIL = 'hello@aftongauntlett.com';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ?? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

export function useContactForm() {
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

  const validateEmailField = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || turnstileFallbackEnabled || turnstileCircuitOpen) return;

    const unregisterTurnstileHandlers = registerTurnstileHandlers({
      setTurnstileToken,
      turnstileErrorCountRef,
      setFormStatus,
      setStatusMessage,
      setTurnstileFallbackEnabled,
      setTurnstileCircuitOpen,
    });

    ensureTurnstileScriptLoaded();

    return unregisterTurnstileHandlers;
  }, [turnstileCircuitOpen, turnstileFallbackEnabled]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
    },
    [requiresTurnstileToken, turnstileCircuitOpen, turnstileToken, validateEmailField],
  );

  return {
    formRef,
    formStatus,
    statusMessage,
    turnstileCircuitOpen,
    emailValidationMessage,
    isSubmitting,
    isSubmitDisabled,
    requiresTurnstileToken,
    validateEmailField,
    handleSubmit,
  };
}
