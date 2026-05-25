import { useEffect, useState } from 'react';

let globalObserver: IntersectionObserver | null = null;
let globalMutationObserver: MutationObserver | null = null;
let activeCallbacks = new Set<(id: string) => void>();
let observedSections = new Set<Element>();
let activeSectionId: string | null = null;
let mutationRafId: number | null = null;

function getObservedRoot() {
  return document.getElementById('main-content') ?? document.body;
}

function observeSections() {
  if (!globalObserver) return;

  const sections = getObservedRoot().querySelectorAll('section[data-section]');
  sections.forEach((section) => {
    if (!observedSections.has(section)) {
      globalObserver!.observe(section);
      observedSections.add(section);
    }
  });
}

function initializeGlobalObserver() {
  if (globalObserver) {
    // Re-scan for new sections if observer already exists
    observeSections();
    return globalObserver;
  }

  const visibleRatios = new Map<Element, number>();

  globalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleRatios.set(entry.target, entry.intersectionRatio);
        } else {
          visibleRatios.delete(entry.target);
        }
      });

      if (visibleRatios.size === 0) {
        return;
      }

      let mostVisibleId: string | null = null;
      let highestRatio = -1;

      visibleRatios.forEach((ratio, element) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          mostVisibleId = element.getAttribute('data-section');
        }
      });

      const nextActiveId = mostVisibleId;
      if (nextActiveId && nextActiveId !== activeSectionId) {
        activeSectionId = nextActiveId;
        activeCallbacks.forEach((callback) => callback(nextActiveId));
      }
    },
    {
      rootMargin: '-80px 0px -80px 0px',
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  );

  // Initial observation
  observeSections();

  // Observe DOM changes so lazily mounted sections get picked up without polling.
  if (!globalMutationObserver) {
    const scheduleObserveSections = () => {
      if (mutationRafId !== null) {
        return;
      }

      mutationRafId = window.requestAnimationFrame(() => {
        mutationRafId = null;
        observeSections();
      });
    };

    globalMutationObserver = new MutationObserver((mutations) => {
      if (
        mutations.some((mutation) => mutation.type === 'childList' && mutation.addedNodes.length)
      ) {
        scheduleObserveSections();
      }
    });
    globalMutationObserver.observe(getObservedRoot(), { childList: true, subtree: true });
  }

  return globalObserver;
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    initializeGlobalObserver();
    activeCallbacks.add(setActiveSection);

    return () => {
      activeCallbacks.delete(setActiveSection);
      if (activeCallbacks.size === 0 && globalObserver) {
        globalObserver.disconnect();
        globalObserver = null;
        observedSections.clear();
        activeSectionId = null;

        globalMutationObserver?.disconnect();
        globalMutationObserver = null;

        if (mutationRafId !== null) {
          window.cancelAnimationFrame(mutationRafId);
          mutationRafId = null;
        }
      }
    };
  }, []);

  return activeSection;
}
