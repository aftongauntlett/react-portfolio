import type { ReactNode } from 'react';
import SideNav from '../SideNav';
import MobileHeader from '../MobileHeader';
import Footer from '../../shared/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="text-[var(--color-text)] min-h-screen bg-[var(--color-background)]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-primary)]"
      >
        Skip to main content
      </a>

      <MobileHeader />
      <div className="flex justify-center px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-x-6 w-full max-w-7xl lg:min-h-screen">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky-sidebar">
              <SideNav />
            </div>
          </div>
          <main
            id="main-content"
            className="flex-1 pt-6 sm:pt-8 lg:pt-12 space-y-24 sm:space-y-32 lg:space-y-40"
            role="main"
            aria-label="Main content"
          >
            {children}
            <Footer />
            {/* Move analytics to end to reduce initial load impact */}
            <Analytics />
            <SpeedInsights />
          </main>
        </div>
      </div>
    </div>
  );
}
