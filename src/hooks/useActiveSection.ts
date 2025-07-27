import { useEffect, useState } from 'react';

let globalObserver: IntersectionObserver | null = null;
let activeCallbacks = new Set<(id: string) => void>();

function initializeGlobalObserver() {
  if (globalObserver) return globalObserver;

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

  // Observe all sections once
  setTimeout(() => {
    const sections = document.querySelectorAll('section[data-section]');
    sections.forEach((section) => globalObserver!.observe(section));
  }, 100);

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
      }
    };
  }, []);

  return activeSection;
}
