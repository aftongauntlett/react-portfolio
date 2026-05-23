import { TYPOGRAPHY } from '@/constants/typography';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo, scrollToTop } from '@/utils/domScroll';
import { IconArrowUp } from '@/components/shared/InlineIcons';
import { Button } from '@/components/shared/Button';

interface FooterProps {
  scrollTarget?: string;
  showStandaloneDivider?: boolean;
}

export default function Footer({
  scrollTarget = '#about',
  showStandaloneDivider = false,
}: FooterProps) {
  const { lenis } = useLenisContext();

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
        <Button
          onClick={handleScrollToTop}
          variant="unstyled"
          icon={<IconArrowUp size={16} />}
          className="hover:text-[var(--color-secondary)] transition"
          aria-label="Scroll to top"
        >
          Top
        </Button>
      </div>
    </footer>
  );
}
