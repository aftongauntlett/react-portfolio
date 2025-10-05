import { useEffect, Suspense, lazy } from 'react';
import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';

// Lazy load sections for better code splitting
const AboutSection = lazy(() => import('@/components/sections/About'));
const ContactSection = lazy(() => import('@/components/sections/Contact'));
const ExperienceSection = lazy(() => import('@/components/sections/Experience'));
const ProjectsSection = lazy(() => import('@/components/sections/Projects'));
const SkillsSection = lazy(() => import('@/components/sections/Skills'));
const CredentialsSection = lazy(() => import('@/components/sections/Credentials'));

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
  // Handle scrolling to section when page loads with hash or query parameter
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the #
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');

    const targetId = hash || scrollTo;

    if (targetId) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80; // Offset for better positioning
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });

          // Only focus for hash-based navigation (accessibility)
          // Skip focus for query-based navigation to avoid unwanted highlighting
          if (hash) {
            element.focus();
          }

          // Clean up URL if using query parameter
          if (scrollTo) {
            // Remove the scrollTo parameter from URL without page reload
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('scrollTo');
            window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
          }
        }
      }, 100);
    }
  }, []);
  return (
    <Layout>
      <PageSection id="about">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </PageSection>
      <PageSection id="skills" title="Technical Skills">
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
      <PageSection id="credentials" title="Credentials">
        <Suspense fallback={<SectionLoader />}>
          <CredentialsSection />
        </Suspense>
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </PageSection>
    </Layout>
  );
}
