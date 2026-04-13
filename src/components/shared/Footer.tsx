import { TYPOGRAPHY } from '@/constants/typography';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo, scrollToTop } from '@/utils/domScroll';
import { IconArrowUp } from '@/components/shared/InlineIcons';

interface FooterProps {
  scrollTarget?: string;
  showStandaloneDivider?: boolean;
}

export default function Footer({
  scrollTarget = '#about',
  showStandaloneDivider = false,
}: FooterProps) {
  const { lenis } = useLenisContext();
  const portfolioRepoUrl = 'https://github.com/aftongauntlett/react-portfolio';

  const handleScrollToTop = () => {
    if (scrollTarget === 'top') {
      scrollToTop(lenis);
    } else {
      const element = document.querySelector(scrollTarget);
      if (element) {
        smoothScrollTo({ target: scrollTarget }, lenis);
      } else {
        scrollToTop(lenis);
      }
    }
  };

  return (
    <footer className={`${TYPOGRAPHY.TEXT_SMALL} text-[var(--color-muted)] py-10 mt-8`}>
      {showStandaloneDivider && (
        <div aria-hidden="true" className="max-w-2xl mx-auto">
          <div className="h-px bg-[var(--color-line)] opacity-60" />
        </div>
      )}
      {/* Footer Content */}
      <div
        className={`flex items-center justify-between gap-4${showStandaloneDivider ? ' mt-8' : ''}`}
      >
        <div />
        <p className="text-center flex-1">
          © {new Date().getFullYear()} Afton Gauntlett. All rights reserved.
        </p>
        <button
          onClick={handleScrollToTop}
          className="hover:text-[var(--color-secondary)] transition flex items-center gap-1"
          aria-label="Scroll to top"
        >
          <IconArrowUp size={16} /> Top
        </button>
      </div>
      <p className="text-center text-xs mt-3 opacity-70">
        Built with React, TypeScript, Vite, and Framer Motion.{' '}
        <a
          href={portfolioRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[var(--color-line)] underline-offset-2 hover:text-[var(--color-secondary)]"
        >
          View source
        </a>
      </p>
    </footer>
  );
}
