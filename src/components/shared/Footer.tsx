import { HiArrowUp } from 'react-icons/hi2';

interface FooterProps {
  scrollTarget?: string;
}

export default function Footer({ scrollTarget = '#about' }: FooterProps) {
  const handleScrollToTop = () => {
    if (scrollTarget === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="text-sm text-[var(--color-muted)] py-10 mt-8">
      {/* Footer Content */}
      <div className="flex items-center justify-between gap-4">
        <div />
        <p className="text-center flex-1">
          © {new Date().getFullYear()} Afton Gauntlett. All rights reserved.
        </p>
        <button
          onClick={handleScrollToTop}
          className="hover:text-[var(--color-primary)] transition flex items-center gap-1"
          aria-label="Scroll to top"
        >
          <HiArrowUp size={16} /> Top
        </button>
      </div>
    </footer>
  );
}
