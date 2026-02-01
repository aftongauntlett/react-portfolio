import { Suspense, lazy, useState } from 'react';
import { Button } from '@/components/shared/Button';
import { IconBars3 } from '@/components/shared/InlineIcons';

const MobileNav = lazy(() => import('../MobileNav'));

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-line)]"
        role="banner"
      >
        <div className="text-xl font-medium text-[var(--color-text)]">Afton Gauntlett</div>
        <Button
          onClick={() => setIsMenuOpen(true)}
          icon={<IconBars3 size={20} />}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          variant="link"
          color="muted"
        />
      </header>

      {isMenuOpen && (
        <Suspense fallback={null}>
          <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
