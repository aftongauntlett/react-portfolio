import type Lenis from 'lenis';
import { smoothScrollTo } from '@/utils/domScroll';

export const SECTION_SCROLL_OFFSET = 80;

export function focusSectionHeading(targetId: string) {
  const heading = document.querySelector(`#${targetId}-heading`);

  if (heading instanceof HTMLElement && heading.tabIndex === -1) {
    heading.focus({ preventScroll: true });
  }
}

export function navigateToSection(targetId: string, lenis?: Lenis | null) {
  smoothScrollTo({ target: targetId, offset: SECTION_SCROLL_OFFSET }, lenis ?? null);
  focusSectionHeading(targetId);
  window.history.replaceState(null, '', `#${targetId}`);

  // Manual dispatch is needed because replaceState does not emit hashchange.
  window.dispatchEvent(new Event('hashchange'));
}
