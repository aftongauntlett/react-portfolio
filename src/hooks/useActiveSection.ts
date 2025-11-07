import { useEffect, useState } from 'react';

let globalObserver: IntersectionObserver | null = null;
let activeCallbacks = new Set<(id: string) => void>();
let observedSections = new Set<Element>();
let isPaused = false;

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

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev,
        );
        const id = mostVisible.target.getAttribute('data-section');
        if (id) {
          activeCallbacks.forEach((callback) => callback(id));
        }
      } else {
        // No entries intersecting - find the section closest to the top of the viewport
        const sections = Array.from(document.querySelectorAll('section[data-section]'));

        if (sections.length > 0) {
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

          const id = closestSection.getAttribute('data-section');
          if (id) {
            activeCallbacks.forEach((callback) => callback(id));
          }
        }
      }
    },
    {
      rootMargin: '-10% 0px -50% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  );

  // Initial observation
  observeSections();

  // Re-scan periodically for lazy-loaded sections (first 2 seconds)
  const intervals = [100, 300, 500, 1000, 2000];
  intervals.forEach((delay) => {
    setTimeout(observeSections, delay);
  });

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
      }
    };
  }, []);

  return activeSection;
}
