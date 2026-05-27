import { useEffect } from 'react';
import type Lenis from 'lenis';
import { smoothScrollTo } from '@/utils/domScroll';
import { SECTION_SCROLL_OFFSET } from '@/utils/sectionNavigation';

const HASH_SCROLL_RETRY_INTERVAL_MS = 50;
const HASH_SCROLL_MAX_ATTEMPTS = 20;
const LEGACY_SCROLL_DELAY_MS = 100;

type UseHashSectionNavigationParams = {
  lenis: Lenis | null;
  normalizeSectionId: (id: string) => string;
  markSectionsLoadedThrough: (id: string) => void;
  isLazySectionId: (id: string) => boolean;
};

export function useHashSectionNavigation({
  lenis,
  normalizeSectionId,
  markSectionsLoadedThrough,
  isLazySectionId,
}: UseHashSectionNavigationParams) {
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.slice(1);
      const hash = normalizeSectionId(rawHash);

      if (!hash) {
        return;
      }

      markSectionsLoadedThrough(hash);

      let attempts = 0;
      let hasFocused = false;
      const shouldKeepRetrying = isLazySectionId(hash);

      const tryScroll = () => {
        const headingElement = document.getElementById(`${hash}-heading`);
        const sectionElement = document.getElementById(hash);
        const element = headingElement || sectionElement;

        if (element) {
          smoothScrollTo({ target: hash, offset: SECTION_SCROLL_OFFSET }, lenis);

          if (rawHash !== hash) {
            window.history.replaceState(null, '', `#${hash}`);
          }

          if (!hasFocused) {
            hasFocused = true;

            if (headingElement && headingElement.tabIndex === -1) {
              headingElement.focus();
            } else {
              element.focus();
            }
          }

          if (shouldKeepRetrying && attempts < HASH_SCROLL_MAX_ATTEMPTS) {
            attempts++;
            setTimeout(tryScroll, HASH_SCROLL_RETRY_INTERVAL_MS);
          }
        } else if (attempts < HASH_SCROLL_MAX_ATTEMPTS) {
          attempts++;
          setTimeout(tryScroll, HASH_SCROLL_RETRY_INTERVAL_MS);
        }
      };

      tryScroll();
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLazySectionId, lenis, markSectionsLoadedThrough, normalizeSectionId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');
    const targetSection = scrollTo ? normalizeSectionId(scrollTo) : null;

    if (!targetSection) {
      return;
    }

    markSectionsLoadedThrough(targetSection);

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (!element) {
        return;
      }

      smoothScrollTo({ target: targetSection, offset: SECTION_SCROLL_OFFSET }, lenis);

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('scrollTo');
      window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
    }, LEGACY_SCROLL_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [lenis, markSectionsLoadedThrough, normalizeSectionId]);
}
