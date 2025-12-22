import { useEffect, useState } from 'react';

let globalObserver: IntersectionObserver | null = null;
let globalMutationObserver: MutationObserver | null = null;
let activeCallbacks = new Set<(id: string) => void>();
let observedSections = new Set<Element>();
let isPaused = false;
let debounceTimeout: number | null = null;

function observeSections() {
  if (!globalObserver) return;

  const sections = document.querySelectorAll('section[data-section]');
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

  globalObserver = new IntersectionObserver(
    (entries) => {
      // Don't update if paused (detail view is open)
      if (isPaused) return;

      if (debounceTimeout !== null) {
        window.clearTimeout(debounceTimeout);
        debounceTimeout = null;
      }

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      const computeNextActive = () => {
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev,
          );
          return mostVisible.target.getAttribute('data-section');
        }

        const sections = Array.from(document.querySelectorAll('section[data-section]'));
        if (sections.length === 0) return null;

        let closestSection = sections[0];
        let smallestDistance = Math.abs(sections[0].getBoundingClientRect().top);

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < smallestDistance) {
            closestSection = section;
            smallestDistance = distance;
          }
        });

        return closestSection.getAttribute('data-section');
      };

      debounceTimeout = window.setTimeout(() => {
        const id = computeNextActive();
        if (id) {
          activeCallbacks.forEach((callback) => callback(id));
        }
      }, 50);
    },
    {
      rootMargin: '-80px 0px -80px 0px',
      threshold: [0.2],
    },
  );

  // Initial observation
  observeSections();

  // Observe DOM changes so lazily mounted sections get picked up without polling.
  if (!globalMutationObserver) {
    globalMutationObserver = new MutationObserver(() => observeSections());
    globalMutationObserver.observe(document.body, { childList: true, subtree: true });
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

        globalMutationObserver?.disconnect();
        globalMutationObserver = null;

        if (debounceTimeout !== null) {
          window.clearTimeout(debounceTimeout);
          debounceTimeout = null;
        }
      }
    };
  }, []);

  return activeSection;
}
