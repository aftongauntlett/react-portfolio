import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { Button } from '@/components/shared/Button';
import MobileNav from '../MobileNav';

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
          icon={<HiBars3 size={20} />}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          variant="link"
          color="muted"
        />
      </header>

      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
