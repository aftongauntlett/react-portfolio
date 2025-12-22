import { useEffect, Suspense, lazy } from 'react';
import PageSection from '@/components/layout/PageSection';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo } from '@/utils/domScroll';

// Eager load About section - it's above the fold and critical for LCP
import AboutSection from '@/components/sections/About';

// Lazy load remaining sections for better code splitting
const ContactSection = lazy(() => import('@/components/sections/Contact'));
const ExperienceSection = lazy(() => import('@/components/sections/Experience'));
const ProjectsSection = lazy(() => import('@/components/sections/Projects'));
const SkillsSection = lazy(() => import('@/components/sections/Skills'));
const EducationSection = lazy(() => import('@/components/sections/Education'));

// Loading component for sections
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-4 w-4"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { lenis } = useLenisContext();

  // Parse hash to determine what section to scroll to
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #

      // Handle scrolling to section with retry
      if (hash) {
        let attempts = 0;
        const maxAttempts = 20; // 20 attempts * 50ms = 1 second

        const tryScroll = () => {
          // Try to find the heading first, fallback to section
          const headingElement = document.getElementById(`${hash}-heading`);
          const sectionElement = document.getElementById(hash);
          const element = headingElement || sectionElement;

          if (element) {
            smoothScrollTo({ target: hash, offset: 80 }, lenis);
            // Focus the heading if it exists and is focusable
            if (headingElement && headingElement.tabIndex === -1) {
              headingElement.focus();
            } else if (element) {
              element.focus();
            }
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryScroll, 50);
          }
        };

        tryScroll();
      }
    };

    // Run on mount and when hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lenis]);

  // Handle scrolling to section when page loads with query parameter (legacy support)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');

    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          smoothScrollTo({ target: scrollTo, offset: 80 }, lenis);

          // Clean up URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('scrollTo');
          window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
        }
      }, 100);
    }
  }, [lenis]);

  return (
    <>
      <PageSection id="about" title="About" hideTitle={true}>
        <AboutSection />
      </PageSection>
      <PageSection id="skills" title="Skills">
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>
      </PageSection>
      <PageSection id="experience" title="Experience">
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>
      </PageSection>
      <PageSection id="projects" title="Projects">
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
      </PageSection>
      <PageSection id="education" title="Education">
        <Suspense fallback={<SectionLoader />}>
          <EducationSection />
        </Suspense>
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </PageSection>
    </>
  );
}
