import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwldyrq';
export const CONTACT_EMAIL = 'hello@aftongauntlett.com';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ?? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

const DEFAULT_SPAM_PROTECTION_PROVIDER = TURNSTILE_SITE_KEY ? 'turnstile' : 'honeypot';

const SPAM_PROTECTION_PROVIDER =
  import.meta.env.VITE_SPAM_PROTECTION_PROVIDER ??
  import.meta.env.PUBLIC_SPAM_PROTECTION_PROVIDER ??
  DEFAULT_SPAM_PROTECTION_PROVIDER;

const TURNSTILE_LOCAL_MODE =
  import.meta.env.VITE_TURNSTILE_LOCAL_MODE ??
  import.meta.env.PUBLIC_TURNSTILE_LOCAL_MODE ??
  'fallback';

const TURNSTILE_ENABLED =
  SPAM_PROTECTION_PROVIDER.toLowerCase() === 'turnstile' && Boolean(TURNSTILE_SITE_KEY);
const TURNSTILE_RESPONSE_FIELD_SELECTOR = 'input[name="cf-turnstile-response"]';

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileErrorCountRef = useRef(0);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileFallbackEnabled, setTurnstileFallbackEnabled] = useState(false);
  const [turnstileCircuitOpen, setTurnstileCircuitOpen] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');

  const isLocalHost =
    typeof window !== 'undefined' &&
    ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);

  const shouldForceLocalFallback =
    import.meta.env.DEV &&
    isLocalHost &&
    TURNSTILE_ENABLED &&
    TURNSTILE_LOCAL_MODE.toLowerCase() !== 'widget';

  const showTurnstileWidget =
    TURNSTILE_ENABLED && !shouldForceLocalFallback && !turnstileFallbackEnabled;

  const isSubmitting = formStatus === 'submitting';
  const requiresTurnstileToken = showTurnstileWidget && !turnstileCircuitOpen;
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
    if (shouldForceLocalFallback) {
      setTurnstileFallbackEnabled(true);
      setFormStatus('idle');
      setStatusMessage(
        'Localhost mode: Turnstile is bypassed with honeypot fallback. Set VITE_TURNSTILE_LOCAL_MODE=widget to test the real challenge locally.',
      );
      return;
    }

    if (!TURNSTILE_ENABLED || turnstileFallbackEnabled || turnstileCircuitOpen) return;

    let cancelled = false;
    let unregisterTurnstileHandlers: undefined | (() => void);

    const setupTurnstile = async () => {
      const { ensureTurnstileScriptLoaded, registerTurnstileHandlers } =
        await import('./contactTurnstile');

      if (cancelled) return;

      unregisterTurnstileHandlers = registerTurnstileHandlers({
        setTurnstileToken,
        turnstileErrorCountRef,
        setFormStatus,
        setStatusMessage,
        setTurnstileFallbackEnabled,
        setTurnstileCircuitOpen,
      });

      ensureTurnstileScriptLoaded();
    };

    void setupTurnstile();

    return () => {
      cancelled = true;
      unregisterTurnstileHandlers?.();
    };
  }, [shouldForceLocalFallback, turnstileCircuitOpen, turnstileFallbackEnabled]);

  useEffect(() => {
    if (!showTurnstileWidget || turnstileCircuitOpen) {
      return;
    }

    const form = formRef.current;
    if (!form) {
      return;
    }

    const syncTokenFromResponseField = () => {
      const responseField = form.querySelector<HTMLInputElement>(TURNSTILE_RESPONSE_FIELD_SELECTOR);
      const tokenFromField = responseField?.value.trim() ?? '';

      if (tokenFromField.length > 0 && tokenFromField !== turnstileToken) {
        setTurnstileToken(tokenFromField);
      }
    };

    syncTokenFromResponseField();

    const observer = new MutationObserver(syncTokenFromResponseField);
    observer.observe(form, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['value'],
    });

    const pollId = window.setInterval(syncTokenFromResponseField, 250);

    return () => {
      observer.disconnect();
      window.clearInterval(pollId);
    };
  }, [showTurnstileWidget, turnstileCircuitOpen, turnstileToken]);

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

      const honeypotValue = formData.get('_gotcha');
      if (honeypotValue && String(honeypotValue).trim().length > 0) {
        formRef.current.reset();
        setTurnstileToken('');
        setEmailValidationMessage('');
        setFormStatus('success');
        setStatusMessage('Message sent. Thanks for reaching out - I will reply soon.');
        return;
      }

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
    isTurnstileEnabled: showTurnstileWidget,
    validateEmailField,
    handleSubmit,
  };
}
