import { Suspense, lazy, useRef, useState } from 'react';
import { Button } from '@/components/shared/Button';
import { IconBars3 } from '@/components/shared/InlineIcons';

const MobileNav = lazy(() => import('../MobileNav'));

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header
        className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-line)]"
        role="banner"
      >
        <div className="text-xl font-medium text-[var(--color-text)]">Afton Gauntlett</div>
        <Button
          ref={openerRef}
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
          <MobileNav
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            openerRef={openerRef}
          />
        </Suspense>
      )}
    </>
  );
}
