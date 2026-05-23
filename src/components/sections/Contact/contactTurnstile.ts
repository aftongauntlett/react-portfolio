import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const MAX_TURNSTILE_ERRORS = 3;

declare global {
  interface Window {
    handleTurnstileError?: (errorCode: string | number) => boolean;
    handleTurnstileSuccess?: (token: string) => void;
    handleTurnstileExpired?: () => void;
    handleTurnstileTimeout?: () => void;
  }
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type RegisterTurnstileHandlersArgs = {
  setTurnstileToken: Dispatch<SetStateAction<string>>;
  turnstileErrorCountRef: MutableRefObject<number>;
  setFormStatus: Dispatch<SetStateAction<FormStatus>>;
  setStatusMessage: Dispatch<SetStateAction<string>>;
  setTurnstileFallbackEnabled: Dispatch<SetStateAction<boolean>>;
  setTurnstileCircuitOpen: Dispatch<SetStateAction<boolean>>;
};

export function registerTurnstileHandlers({
  setTurnstileToken,
  turnstileErrorCountRef,
  setFormStatus,
  setStatusMessage,
  setTurnstileFallbackEnabled,
  setTurnstileCircuitOpen,
}: RegisterTurnstileHandlersArgs) {
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

  return () => {
    delete window.handleTurnstileError;
    delete window.handleTurnstileSuccess;
    delete window.handleTurnstileExpired;
    delete window.handleTurnstileTimeout;
  };
}

export function ensureTurnstileScriptLoaded() {
  if (document.getElementById(TURNSTILE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = TURNSTILE_SCRIPT_ID;
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
