import { useEffect, useState } from 'react';

let globalObserver: IntersectionObserver | null = null;
let activeCallbacks = new Set<(id: string) => void>();
let observedSections = new Set<Element>();

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
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev,
        );
        const id = mostVisible.target.getAttribute('data-section');
        if (id) {
          activeCallbacks.forEach((callback) => callback(id));
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
