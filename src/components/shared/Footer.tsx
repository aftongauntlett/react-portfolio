import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 pt-10 border-t border-[var(--color-line)] text-sm text-[var(--color-muted)]">
      <div className="flex items-center justify-between gap-4">
        <div />
        <p className="text-center flex-1">
          © {new Date().getFullYear()} Afton Gauntlett. All rights reserved.
        </p>
        <a
          href="#about"
          className="hover:text-[var(--color-primary)] transition flex items-center gap-1"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} /> Top
        </a>
      </div>
    </footer>
  );
}
