import { Component, type ErrorInfo, type ReactNode } from 'react';
import { TYPOGRAPHY } from '@/constants/typography';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Could integrate with error reporting (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-4">
              <h1
                className={`${TYPOGRAPHY.HEADING_2} font-heading font-bold text-[var(--color-primary)]`}
              >
                Oops! Something went wrong
              </h1>
              <p className="text-[var(--color-muted)]">
                I apologize for the inconvenience. Please try refreshing the page, or contact me
                directly if the problem persists.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                >
                  Refresh Page
                </button>
                <div className={TYPOGRAPHY.TEXT_SMALL}>
                  <a
                    href="mailto:hello@aftongauntlett.com"
                    className="text-[var(--color-secondary)] hover:underline"
                  >
                    Contact me directly
                  </a>
                </div>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details
                  className={`mt-4 p-4 bg-[var(--color-surface)] border border-[var(--color-line)] rounded text-left ${TYPOGRAPHY.TEXT_SMALL}`}
                >
                  <summary className="font-medium cursor-pointer text-[var(--color-text)]">
                    Error Details (Dev Mode)
                  </summary>
                  <pre
                    className={`mt-2 ${TYPOGRAPHY.TEXT_XS} overflow-auto text-[var(--color-muted)] bg-[var(--color-background)] p-2 rounded`}
                  >
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
