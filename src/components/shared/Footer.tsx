import { HiArrowUp } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer className="section-content text-sm text-[var(--color-muted)] py-10 ">
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
          <HiArrowUp size={16} /> Top
        </a>
      </div>
    </footer>
  );
}
