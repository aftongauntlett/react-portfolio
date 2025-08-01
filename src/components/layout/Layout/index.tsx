import type { ReactNode } from 'react';
import SideNav from '../SideNav';
import MobileHeader from '../MobileHeader';
import Footer from '../../shared/Footer';
import Background from '../../Background';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="text-[var(--color-text)] min-h-screen">
      <Background />
      <MobileHeader />
      <div className="flex justify-center px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-x-6 w-full max-w-6xl lg:min-h-screen">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky-sidebar">
              <SideNav />
            </div>
          </div>
          <main
            id="main-content"
            className="flex-1 pt-4 lg:pt-10 space-y-32 sm:space-y-40 lg:space-y-48"
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
