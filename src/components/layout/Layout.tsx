import type { ReactNode } from "react";
import SideNav from "./SideNav";
import Footer from "../shared/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <SideNav />
      <section className="flex-1 p-6 sm:p-8 space-y-32 snap-y snap-mandatory scroll-smooth">
        {children}
        <Footer />
      </section>
    </main>
  );
}
