import type { ReactNode } from 'react';
import SideNav from './SideNav/SideNav';
import Footer from '../shared/Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex justify-center px-4 sm:px-6 lg:px-8 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:gap-x-6 w-full max-w-6xl">
        <aside className="hidden lg:block lg:w-72">
          <SideNav />
        </aside>
        <div className="flex-1 pt-10 space-y-48">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}
