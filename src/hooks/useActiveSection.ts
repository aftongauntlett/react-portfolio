import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    // Set initial active section based on scroll position
    const setInitialSection = () => {
      const sections = document.querySelectorAll('section[data-section]');
      const scrollPosition = window.scrollY + 100; // Add offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop <= scrollPosition) {
          const id = section.getAttribute('data-section');
          if (id) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Set initial section after a brief delay to ensure DOM is ready
    setTimeout(setInitialSection, 100);

    const sections = document.querySelectorAll('section[data-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Get the section with the highest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev,
          );

          const id = mostVisible.target.getAttribute('data-section');
          if (id) setActiveSection(id);
        }
      },
      {
        rootMargin: '-10% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75, 1.0],
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Add scroll listener as fallback
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = document.querySelectorAll('section[data-section]');

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop <= scrollPosition) {
          const id = section.getAttribute('data-section');
          if (id && id !== activeSection) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return activeSection;
}
