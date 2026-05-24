/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly VITE_SPAM_PROTECTION_PROVIDER?: 'honeypot' | 'turnstile';
  readonly PUBLIC_SPAM_PROTECTION_PROVIDER?: 'honeypot' | 'turnstile';
  readonly VITE_TURNSTILE_LOCAL_MODE?: 'fallback' | 'widget';
  readonly PUBLIC_TURNSTILE_LOCAL_MODE?: 'fallback' | 'widget';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
