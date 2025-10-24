import { useEffect, useState } from 'react';
import { useDetailView } from '@/context/DetailViewContext';

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
  const { detailView } = useDetailView();

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

  // Pause the observer when detail view is open, resume when closed
  useEffect(() => {
    if (detailView) {
      isPaused = true;
      // Keep the active section as 'projects' when detail view is open
      setActiveSection('projects');
      return;
    }

    // When closing detail view, wait for scroll animation to complete, then resume observer
    const resumeTimeout = setTimeout(() => {
      // Force the observer to re-evaluate all sections
      if (globalObserver) {
        // Disconnect all currently observed sections
        observedSections.forEach((section) => {
          globalObserver!.unobserve(section);
        });
        // Clear the set
        observedSections.clear();
        // Reconnect all sections - this forces immediate intersection callbacks
        observeSections();
      }

      // Resume the observer so it processes the intersection events
      isPaused = false;
    }, 500);

    return () => clearTimeout(resumeTimeout);
  }, [detailView]);

  return activeSection;
}
